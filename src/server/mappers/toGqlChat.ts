import type { Chat, ChatKind } from '../db/schema';
import type { GqlSChat, GqlSChatKind } from '../graphql/generated';
import { toGqlChatMessage } from './toGqlChatMessage';
import type { ChatMessageRowJoined } from './toGqlChatMessage';

export function toGqlChat(chat: Chat, rows: ChatMessageRowJoined[]): GqlSChat {
    return {
        chatId: chat.chatId,
        kind: toGqlChatKind(chat.kind),
        title: chat.title,
        lastModifiedAt: chat.lastModifiedAt,

        // resolved fields
        // Insertion-ordered (rows arrive sorted by `chatMessageRowsLoad`); the
        // client groups by date at render time so the subscription's raw
        // appended messages can land in the right group without a refetch.
        messages: rows.map(toGqlChatMessage),
    };
}

// DB-side `chatKinds` is camelCase to match the JS convention; the GraphQL
// enum is PascalCase per SDL norms. One small switch keeps the surface
// translation in one place — adding a third surface is a single line here.
function toGqlChatKind(kind: ChatKind): GqlSChatKind {
    switch (kind) {
        case 'visitorAssistant':
            return 'VisitorAssistant';
        case 'adminAssistant':
            return 'AdminAssistant';
    }
}
