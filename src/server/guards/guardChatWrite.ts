import { eq } from 'drizzle-orm';
import type { Chat } from '../db/schema';
import { chats } from '../db/schema';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSSession } from '../graphql/generated';

// Loads the chat row and asserts the requesting session is allowed to act on
// it. Two surfaces, two predicates:
//
// - Visitor chats (`kind = 'visitorAssistant'`): authorized iff
//   `chat.sessionId === requestingSession.sessionId`. The session cookie IS
//   the capability — anonymous visitors have no `User` row, so there's no
//   stable identity beyond their session.
// - Admin chats (`kind = 'adminAssistant'`): authorized iff
//   `chat.ownerUserId === requestingSession.userId`. Today the OTP sign-in
//   flow hasn't landed; the column may be null, in which case no session
//   passes the check (intentional — the admin surface is reachable but
//   unauthenticated only from the Annette-only context until OTP ships).
//
// `guardChatRead` and `guardChatWrite` share the same body today; they're
// separate functions so they can diverge later without thrashing call sites
// (e.g. read-only chat-list endpoints, or write-rate limits scoped to one).
//
// Throws on miss / unauthorized so the resolver-level try/catch logs and
// returns null. Callers receive the chat row so they don't re-load it.

async function guardChat(
    chatId: string,
    requestingSession: GqlSSession,
    serverRuntime: ServerRuntime,
    op: 'read' | 'write',
): Promise<Chat> {
    const [chat] = await serverRuntime.db.select().from(chats).where(eq(chats.chatId, chatId));
    if (!chat) {
        throw new Error(`guardChat${op === 'read' ? 'Read' : 'Write'}: chat ${chatId} not found`);
    }

    if (chat.kind === 'visitorAssistant') {
        if (!chat.sessionId || chat.sessionId !== requestingSession.sessionId) {
            throw new Error(
                `guardChat${op === 'read' ? 'Read' : 'Write'}: visitor chat ${chatId} not owned by session ${requestingSession.sessionId}`,
            );
        }
        return chat;
    }

    // adminAssistant
    if (!chat.ownerUserId || chat.ownerUserId !== requestingSession.userId) {
        throw new Error(`guardChat${op === 'read' ? 'Read' : 'Write'}: admin chat ${chatId} not owned by user ${requestingSession.userId}`);
    }
    return chat;
}

export function guardChatRead(chatId: string, requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<Chat> {
    return guardChat(chatId, requestingSession, serverRuntime, 'read');
}

export function guardChatWrite(chatId: string, requestingSession: GqlSSession, serverRuntime: ServerRuntime): Promise<Chat> {
    return guardChat(chatId, requestingSession, serverRuntime, 'write');
}
