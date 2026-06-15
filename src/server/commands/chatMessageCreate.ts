import { and, eq, inArray } from 'drizzle-orm';
import { chatAssistantTurnRunDetached } from './chatAssistantTurnRun';
import { chatMessageAppend } from './chatMessageAppend';
import type {
    ChatCreate,
    ChatKind,
    ChatMessage,
    ChatMessageCreate as ChatMessageRowCreate,
    ChatMessageUserAttachmentCreate,
    ChatMessageUserCreate,
    ChatMessageUserInput,
    ChatMessageUserInputCreate,
} from '../db/schema';
import { fileUploads, chatMessageUserAttachments, chatMessagesUser, chatMessagesUserInput, chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSChatMessageCreateResult, GqlSMutationChatMessageCreateArgs, GqlSSession } from '../graphql/generated';
import { guardChatWrite } from '../guards/guardChatWrite';
import type { ChatMessageRowJoined } from '../mappers/toGqlChatMessage';
import { chatMessageRowsLoad } from '../queries/chatMessageRowsLoad';
import { visitorChatQuotaFindOne } from '../queries/visitorChatQuotaFindOne';

// Persists the user's message and runs the next assistant turn.
//
// The chat surface (visitor vs admin) is implicit in the access path:
// `Mutation.chatMessageCreate` calls in with `chatKind = 'visitorAssistant'`,
// `Mutation.admin.chatMessageCreate` with `'adminAssistant'`. Each branch
// populates exactly one of the two ownership FKs on the new chat row.
//
// Each message commits in its own short transaction; after commit the
// runner publishes a `ChatUpdateMessageAppended` so subscribers see the user
// message, every intermediate tool call / approval / input collection, and
// the final assistant text as soon as each is durable.
//
// Tradeoff vs. a single end-to-end transaction: a mid-turn crash leaves the
// user row + any persisted intermediate steps committed instead of rolling
// the whole thing back. That matches the append-only nature of the chat log
// (a partial trail is more honest than silently dropping the user's
// message) and matches what `toModelMessages` already does on the next send:
// replay whatever's persisted.

export async function chatMessageCreate(
    { chatId: attemptedChatId, message, fileUploadIds, assistantOptions }: GqlSMutationChatMessageCreateArgs,
    chatKind: ChatKind,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSChatMessageCreateResult | null> {
    try {
        // Phase 0 — Visitor rate limit. The public assistant has no sign-in,
        // so unbounded LLM spend is a real risk; cap user messages to a
        // rolling 24h bucket keyed on (sessionId OR ipHash) so clearing
        // cookies does not reset it. Admin chats are out of scope — they go
        // through `Mutation.admin` and the bucket would require a different
        // key anyway. See `docs/features/chat-visitor.md#rate-limiting`.
        if (chatKind === 'visitorAssistant') {
            const quota = await visitorChatQuotaFindOne(requestingSession, serverRuntime);
            if (quota.used >= quota.limit) {
                serverRuntime.log.error(
                    new Error(
                        `visitor chat rate limit exceeded: sessionId=${requestingSession.sessionId} used=${quota.used}/${quota.limit}`,
                    ),
                    requestingSession,
                );
                return null;
            }
        }

        // Phase 1 — Payload construction (pure, no DB calls).
        const isNewChat = !attemptedChatId;
        const chatId = attemptedChatId ?? crypto.randomUUID();
        const userMessageId = crypto.randomUUID();
        const now = new Date();
        const { generationId } = assistantOptions;
        const sessionUserId = requestingSession.userId ?? null;
        // Treat null/undefined the same as an empty list — the GraphQL field
        // is `[ID!]` (nullable list) so URQL emits `null` when the client
        // didn't pass it. Dedupe to keep the join row's unique index happy
        // (and to stop a duplicated id silently shifting the `position`).
        const requestedFileUploadIds = Array.from(new Set(fileUploadIds ?? []));

        const userSpineInsert: ChatMessageRowCreate = {
            chatMessageId: userMessageId,
            chatId,
            kind: 'user',
            authorUserId: sessionUserId,
            createdAt: now,
        };

        const userVariantInsert: ChatMessageUserCreate = {
            chatMessageId: userMessageId,
            body: message,
        };

        // Visitors have no `User` row, so they have no `fileUploads.userId`
        // to match against. Until visitor attachments are designed (a
        // session-keyed alternative to the user FK), reject any visitor
        // attachment payload outright instead of half-persisting.
        if (requestedFileUploadIds.length > 0 && !sessionUserId) {
            throw new Error('chatMessageCreate: visitor sessions cannot attach files (not implemented)');
        }

        // Validate file-upload ownership BEFORE any writes — a foreign-user id
        // (or a non-existent one) becomes a hard error so the user sees a
        // clear failure instead of a half-persisted message that silently
        // dropped a file.
        if (requestedFileUploadIds.length > 0 && sessionUserId) {
            const owned = await serverRuntime.db
                .select({ fileUploadId: fileUploads.fileUploadId })
                .from(fileUploads)
                .where(and(eq(fileUploads.userId, sessionUserId), inArray(fileUploads.fileUploadId, requestedFileUploadIds)));
            if (owned.length !== requestedFileUploadIds.length) {
                throw new Error(
                    `chatMessageCreate: ${requestedFileUploadIds.length - owned.length} of ${requestedFileUploadIds.length} fileUploadId(s) are not owned by user ${sessionUserId}`,
                );
            }
        }

        const attachmentJoinInserts: ChatMessageUserAttachmentCreate[] = requestedFileUploadIds.map((fileUploadId, position) => ({
            chatMessageId: userMessageId,
            fileUploadId,
            position,
        }));

        // Phase 2 — Authorize: existing chat needs a guard match; new chat
        // seeds the ownership FK from the surface + session.
        if (!isNewChat) {
            await guardChatWrite(chatId, requestingSession, serverRuntime);
        } else {
            const chatInsert: ChatCreate = {
                chatId,
                kind: chatKind,
                // Visitor chats are session-scoped; admin chats are owned
                // by a `User`. Each surface populates exactly one of the
                // two FKs — the other stays null. (See `docs/architecture/
                // chat-persistence.md` for the application-level invariant.)
                sessionId: chatKind === 'visitorAssistant' ? requestingSession.sessionId : null,
                ownerUserId: chatKind === 'adminAssistant' ? sessionUserId : null,
                title: '',
                lastModifiedAt: now,
                createdAt: now,
            };
            // Subscribers don't observe this commit (no row goes through
            // `chatMessageAppend`), but the FK from `chatMessages.chatId →
            // chats.chatId` needs the row present before the user message
            // inserts.
            await serverRuntime.db.insert(chats).values(chatInsert);
        }

        // Phase 3 — Pivoting away from an open collection. If the previous
        // assistant turn was an input collection the user never answered, the
        // LLM transcript still has an open `promptUserForInput` tool-call.
        // Sending another user message in that state would produce a
        // malformed transcript (the AI SDK throws `MissingToolResultsError`
        // on the next replay). We close the open collection with a synthetic
        // `skipped` row so the protocol stays well-formed. See "Pivoting away
        // from an open collection" in `docs/architecture/chat.md`.
        const priorRows = isNewChat ? [] : await chatMessageRowsLoad(serverRuntime.db, chatId);
        const openCollectionId = findOpenCollectionId(priorRows);
        if (openCollectionId) {
            const skipMessageId = crypto.randomUUID();
            // One millisecond before `now` so replay sees
            // `collection → skipped userInput → user message`.
            const skipCreatedAt = new Date(now.getTime() - 1);
            const skipSpine: ChatMessage = {
                chatMessageId: skipMessageId,
                chatId,
                kind: 'userInput',
                authorUserId: sessionUserId,
                createdAt: skipCreatedAt,
            };
            const skipVariant: ChatMessageUserInput = {
                chatMessageId: skipMessageId,
                collectionMessageId: openCollectionId,
                // Empty answers IS the skipped signal — `toModelMessages`
                // emits `status: 'skipped'` on the LLM-facing tool-result
                // when this list is empty.
                answers: [],
            };
            await chatMessageAppend(
                serverRuntime.db,
                serverRuntime,
                generationId,
                skipSpine satisfies ChatMessageRowCreate,
                async (transaction) => {
                    await transaction.insert(chatMessagesUserInput).values(skipVariant satisfies ChatMessageUserInputCreate);
                },
            );
        }

        // Phase 4 — Append the user message. Publishes `MessageAppended`
        // after commit so the sender's subscription delivers the user row
        // immediately. Attachment join rows write inside the same transaction
        // so the published payload's `userAttachments` is consistent with
        // what `chatFindOne` would later return.
        await chatMessageAppend(serverRuntime.db, serverRuntime, generationId, userSpineInsert, async (transaction) => {
            await transaction.insert(chatMessagesUser).values(userVariantInsert);
            if (attachmentJoinInserts.length > 0) {
                await transaction.insert(chatMessageUserAttachments).values(attachmentJoinInserts);
            }
        });

        // Phase 5 — Run the assistant turn DETACHED. The mutation returns
        // as soon as the user-side row is committed so the client gets its
        // navigate immediately; the helper re-loads the rows itself (so the
        // synthetic skip row above and the user message we just wrote both
        // make it into the transcript), runs the agent, publishes on
        // `chatUpdates`, and ends with a `TurnEnded` event that lets the
        // client tear down its per-turn state.
        chatAssistantTurnRunDetached({
            chatId,
            requestingSession,
            assistantOptions,
            serverRuntime,
        });

        return {
            chatId,
            chatMessageId: userMessageId,
        };
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        return null;
    }
}

// Returns the id of the most recent assistant input collection that has not
// yet been answered or skipped. Single backward pass: a userInput row's
// `collectionMessageId` marks its collection as responded; the first
// not-yet-responded collection we hit is the open one.
function findOpenCollectionId(rows: ReadonlyArray<ChatMessageRowJoined>): string | null {
    const respondedTo = new Set<string>();
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i]!;
        if (row.spine.kind === 'userInput' && row.userInput) {
            respondedTo.add(row.userInput.collectionMessageId);
            continue;
        }
        if (row.spine.kind === 'assistantInputCollection' && !respondedTo.has(row.spine.chatMessageId)) {
            return row.spine.chatMessageId;
        }
    }
    return null;
}
