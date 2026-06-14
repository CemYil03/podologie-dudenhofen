import { and, desc, eq } from 'drizzle-orm';
import { chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSChat, GqlSSession } from '../graphql/generated';
import { toGqlChat } from '../mappers/toGqlChat';

// Lists the requesting session's visitor-assistant chats, most-recent first.
// Backs `Session.visitorChats` — the empty-state surface in the visitor sheet
// uses this to offer a returning visitor their previous conversations.
//
// `messages` is intentionally returned empty here. The list view never
// renders message bodies; clients fetch a single transcript through
// `Query.chat(chatId)` (which goes through `chatFindOne` and the per-chat
// guard) when the user picks one to resume. Returning `messages: []` keeps
// the type contract on `GqlSChat` intact without paying for the join — the
// visitor `VisitorPreviousChats` operation simply doesn't select the field.
//
// Authorization is structural: the filter is keyed by
// `requestingSession.sessionId`, so a session can only ever list its own
// visitor chats. No `guardChatRead` per row — that guard is for "I have a
// chatId, am I allowed to read it?" and is correctly handled by `chatFindOne`
// when the user actually picks a chat from this list.
//
// `Chats_sessionId_lastModifiedAt_idx` covers the `WHERE … ORDER BY`. The
// hard cap is a defensive bound: visitor sessions don't accumulate hundreds
// of chats in practice, but the field is non-paginated today, so a runaway
// session shouldn't be able to drag the whole list across the wire.
const VISITOR_CHATS_HARD_LIMIT = 50;

export async function chatsFindBySession(requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<GqlSChat[]> {
    try {
        const rows = await serverRuntime.db
            .select()
            .from(chats)
            .where(and(eq(chats.sessionId, requestingSession.sessionId), eq(chats.kind, 'visitorAssistant')))
            .orderBy(desc(chats.lastModifiedAt))
            .limit(VISITOR_CHATS_HARD_LIMIT);
        return rows.map((chat) => toGqlChat(chat, []));
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
