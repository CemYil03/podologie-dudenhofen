import { and, eq } from 'drizzle-orm';
import { chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSAdminVisitorChatArgs, GqlSChat, GqlSSession } from '../graphql/generated';
import { toGqlChat } from '../mappers/toGqlChat';
import { chatMessageRowsLoad } from './chatMessageRowsLoad';

// Single visitor-chat transcript for admin review. Backs
// `Admin.visitorChat(chatId)`.
//
// Why this exists separately from `chatFindOne`: the public surface's
// `chatFindOne` runs `guardChatRead`, which for visitor chats refuses any
// session that doesn't own the row. That predicate is correct for the public
// path (an anonymous visitor can only ever see their own chat), but it's
// exactly what the admin needs to bypass — admins legitimately read across
// sessions. Authorization here is the parent `guardAdmin`; we still bound
// the surface by asserting `kind = 'visitorAssistant'` so this resolver can
// never reach into an admin chat owned by another user.
export async function visitorChatFindOne(
    { chatId }: GqlSAdminVisitorChatArgs,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSChat> {
    try {
        const [chat] = await serverRuntime.db
            .select()
            .from(chats)
            .where(and(eq(chats.chatId, chatId), eq(chats.kind, 'visitorAssistant')));
        if (!chat) {
            throw new Error(`visitorChatFindOne: visitor chat ${chatId} not found`);
        }
        const rows = await chatMessageRowsLoad(serverRuntime.db, chatId);
        return toGqlChat(chat, rows);
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
