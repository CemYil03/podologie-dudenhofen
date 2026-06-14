import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSAdminChatArgs, GqlSChat, GqlSSession } from '../graphql/generated';
import { guardChatRead } from '../guards/guardChatWrite';
import { toGqlChat } from '../mappers/toGqlChat';
import { chatMessageRowsLoad } from './chatMessageRowsLoad';

export async function chatFindOne(
    { chatId }: GqlSAdminChatArgs,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
): Promise<GqlSChat> {
    try {
        // Single load + ownership check. `guardChatRead` returns the row so
        // we don't re-select it; cross-session reads throw before we hit
        // `chatMessageRowsLoad`.
        const chat = await guardChatRead(chatId, requestingSession, serverRuntime);
        const rows = await chatMessageRowsLoad(serverRuntime.db, chatId);
        return toGqlChat(chat, rows);
    } catch (error) {
        serverRuntime.log.error(error, requestingSession);
        throw error;
    }
}
