import { and, asc, eq, gte, isNotNull, or, sql } from 'drizzle-orm';
import { chatMessages, chats, sessions } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSSession, GqlSVisitorChatQuota } from '../graphql/generated';
import { toGqlVisitorChatQuota } from '../mappers/toGqlVisitorChatQuota';
import { VISITOR_CHAT_DAILY_LIMIT, VISITOR_CHAT_WINDOW_MS } from '../chat/visitorChatLimits';

// Counts in-window visitor user messages attributable to the requesting
// session — through its session id AND through every other session sharing
// its `ipHash`. This is the union of the two buckets, so a row that
// satisfies both predicates only counts once. See
// `docs/features/chat-visitor.md#rate-limiting` for the threat model and
// `docs/architecture/chat.md` for the visitor-foundation context.
//
// Backs `Session.visitorChatQuota` and is consulted from `chatMessageCreate`
// before the visitor branch writes the user message.
//
// Bounded read: the query caps at `VISITOR_CHAT_DAILY_LIMIT + 1` rows so an
// over-limit session does not pull an unbounded list across the wire just
// to be told `used > limit`. The +1 is a probe — its presence tells the
// enforcement path that `used` is *at least* over the limit; the count
// surfaced to the UI saturates at the same number, which is what the
// "X / limit" rendering expects anyway.
export async function visitorChatQuotaFindOne(requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<GqlSVisitorChatQuota> {
    try {
        const windowStart = new Date(Date.now() - VISITOR_CHAT_WINDOW_MS);

        // Resolve this session's `ipHash` once. Falling back to `null`
        // collapses the IP bucket to nothing — the OR'd predicate below
        // still includes the session bucket because the `sessionId` arm
        // never depends on `ipHash`.
        const [sessionRow] = await serverRuntime.db
            .select({ ipHash: sessions.ipHash })
            .from(sessions)
            .where(eq(sessions.sessionId, requestingSession.sessionId));
        const ipHash = sessionRow?.ipHash ?? null;

        const ipBucketPredicate = ipHash !== null ? and(isNotNull(sessions.ipHash), eq(sessions.ipHash, ipHash)) : sql`false`;

        const rows = await serverRuntime.db
            .select({ createdAt: chatMessages.createdAt })
            .from(chatMessages)
            .innerJoin(chats, eq(chats.chatId, chatMessages.chatId))
            .innerJoin(sessions, eq(sessions.sessionId, chats.sessionId))
            .where(
                and(
                    eq(chats.kind, 'visitorAssistant'),
                    eq(chatMessages.kind, 'user'),
                    gte(chatMessages.createdAt, windowStart),
                    or(eq(sessions.sessionId, requestingSession.sessionId), ipBucketPredicate),
                ),
            )
            .orderBy(asc(chatMessages.createdAt))
            .limit(VISITOR_CHAT_DAILY_LIMIT + 1);

        return toGqlVisitorChatQuota(rows.map((row) => row.createdAt));
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
