import { desc, eq } from 'drizzle-orm';
import { chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSChat, GqlSSession } from '../graphql/generated';
import { toGqlChat } from '../mappers/toGqlChat';

// All visitor-assistant chats across every session, most-recent first. Backs
// `Admin.visitorChats` — the admin uses this to review what visitors actually
// ask the assistant so the system prompt and tool surface can evolve with
// real demand.
//
// `messages` is intentionally returned empty here, mirroring
// `chatsFindBySession` — the list view never renders message bodies; clients
// fetch a single transcript through `Admin.visitorChat(chatId)` when the
// admin picks one to review.
//
// Authorization is the parent `guardAdmin` on `Session.admin` — there is no
// per-session predicate here because the admin's read crosses sessions by
// definition. `Chats_kind_idx` covers the WHERE; the hard cap is a defensive
// bound. Pagination lands when the practice accumulates more visitor traffic
// than fits comfortably on one page.
const VISITOR_CHATS_HARD_LIMIT = 200;

export async function visitorChatsFindAll(requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<GqlSChat[]> {
    try {
        const rows = await serverRuntime.db
            .select()
            .from(chats)
            .where(eq(chats.kind, 'visitorAssistant'))
            .orderBy(desc(chats.lastModifiedAt))
            .limit(VISITOR_CHATS_HARD_LIMIT);
        return rows.map((chat) => toGqlChat(chat, []));
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
