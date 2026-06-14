import { DateResolver, DateTimeResolver, JSONResolver } from 'graphql-scalars';
import { chatInputCollectionRespond } from '../commands/chatInputCollectionRespond';
import { chatMessageCreate } from '../commands/chatMessageCreate';
import { chatToolApprovalRespond } from '../commands/chatToolApprovalRespond';
import { userSessionTerminateMany } from '../commands/userSessionTerminateMany';
import { userUpdate } from '../commands/userUpdate';
import type { ServerRuntime } from '../domain/ServerRuntime';
import { guardAdmin, guardAdminMutation } from '../guards/guardAdmin';
import { guardUserMutation } from '../guards/guardUserMutation';
import { guardUserSubscription } from '../guards/guardUserSubscription';
import { chatFindOne } from '../queries/chatFindOne';
import { chatsFindBySession } from '../queries/chatsFindBySession';
import { sessionUserFindOne } from '../queries/sessionUserFindOne';
import type {
    GqlSAdminChatArgs,
    GqlSAdminMutationChatInputCollectionRespondArgs,
    GqlSAdminMutationChatMessageCreateArgs,
    GqlSAdminMutationChatToolApprovalRespondArgs,
    GqlSChatAssistantInput,
    GqlSChatAssistantInputValue,
    GqlSChatMessage,
    GqlSChatUpdate,
    GqlSMutationChatInputCollectionRespondArgs,
    GqlSMutationChatMessageCreateArgs,
    GqlSMutationChatToolApprovalRespondArgs,
    GqlSQueryChatArgs,
    GqlSResolvers,
    GqlSSession,
    GqlSSubscriptionChatUpdatesArgs,
    GqlSUser,
    GqlSUserMutation,
    GqlSUserMutationTerminateSessionsArgs,
    GqlSUserMutationUserUpdateArgs,
} from './generated';

export function resolversCreate(serverRuntime: ServerRuntime): GqlSResolvers {
    return {
        DateTime: DateTimeResolver,
        Date: DateResolver,
        JSON: JSONResolver,
        ChatMessage: {
            __resolveType(obj: GqlSChatMessage) {
                return obj.gqlTypeName;
            },
        },
        ChatAssistantInput: {
            __resolveType(obj: GqlSChatAssistantInput) {
                return obj.gqlTypeName;
            },
        },
        ChatAssistantInputValue: {
            __resolveType(obj: GqlSChatAssistantInputValue) {
                return obj.gqlTypeName;
            },
        },
        ChatUpdate: {
            __resolveType(obj: GqlSChatUpdate) {
                return obj.gqlTypeName;
            },
        },
        Session: {
            user(_session: GqlSSession, __: any, requestingSession: GqlSSession) {
                return sessionUserFindOne(requestingSession, serverRuntime);
            },
            // `Session.admin` is gated by `guardAdmin`. Today the guard
            // throws — there is no admin sign-in yet, so the whole `Admin`
            // subgraph is unreachable. Once OTP lands the guard returns the
            // parent shape iff the session carries an admin claim.
            admin(_session: GqlSSession, __: any, requestingSession: GqlSSession) {
                return guardAdmin(requestingSession);
            },
            // Visitor chat list. Filtered structurally by
            // `requestingSession.sessionId` inside `chatsFindBySession`, so a
            // session can only ever list its own visitor chats — no extra
            // guard. Empty for sessions that have never started a visitor
            // chat.
            visitorChats(_session: GqlSSession, __: any, requestingSession: GqlSSession) {
                return chatsFindBySession(requestingSession, serverRuntime);
            },
        },
        Admin: {
            // The admin chat read. Per-chat ownership is enforced inside
            // `chatFindOne` via `guardChatRead`, so a stray admin can't reach
            // into another admin's chats.
            chat(_admin: unknown, args: GqlSAdminChatArgs, requestingSession: GqlSSession) {
                return chatFindOne(args, requestingSession, serverRuntime);
            },
        },
        UserMutation: {
            userUpdate({ userId }: GqlSUserMutation, args: GqlSUserMutationUserUpdateArgs, requestingSession: GqlSSession) {
                return userUpdate(userId, args, requestingSession, serverRuntime);
            },
            terminateSessions({ userId }: GqlSUserMutation, args: GqlSUserMutationTerminateSessionsArgs, requestingSession: GqlSSession) {
                return userSessionTerminateMany(userId, args, requestingSession, serverRuntime);
            },
        },
        AdminMutation: {
            // Admin chat writes. The `chatKind` is implicit in the access
            // path — admin reaches this through `Mutation.admin`, so every
            // brand-new chat created here is an admin chat.
            chatMessageCreate(_parent: unknown, args: GqlSAdminMutationChatMessageCreateArgs, requestingSession: GqlSSession) {
                return chatMessageCreate(args, 'adminAssistant', requestingSession, serverRuntime);
            },
            chatInputCollectionRespond(
                _parent: unknown,
                args: GqlSAdminMutationChatInputCollectionRespondArgs,
                requestingSession: GqlSSession,
            ) {
                return chatInputCollectionRespond(args, requestingSession, serverRuntime);
            },
            chatToolApprovalRespond(_parent: unknown, args: GqlSAdminMutationChatToolApprovalRespondArgs, requestingSession: GqlSSession) {
                return chatToolApprovalRespond(args, requestingSession, serverRuntime);
            },
        },
        Query: {
            currentSession(_: any, __: any, requestingSession: GqlSSession) {
                return requestingSession;
            },
            // Single-chat read shared by both surfaces. Visitor chats reach
            // this through `Query.chat`; admin chats also resolve through
            // `Session.admin.chat`. Per-chat ownership is enforced inside
            // `chatFindOne` via `guardChatRead` — visitor chats key on
            // `sessionId`, admin chats on `ownerUserId`.
            chat(_: any, args: GqlSQueryChatArgs, requestingSession: GqlSSession) {
                return chatFindOne(args, requestingSession, serverRuntime);
            },
        },
        Mutation: {
            userCreate(_parent: unknown, __: any, _requestingSession: GqlSSession) {
                return { success: false, referenceId: null }; // todo
            },
            user(_parent: unknown, __: any, requestingSession: GqlSSession) {
                return guardUserMutation(requestingSession);
            },
            admin(_parent: unknown, __: any, requestingSession: GqlSSession) {
                return guardAdminMutation(requestingSession);
            },
            // Public visitor-chat writes. No parent guard — anonymous
            // visitors reach the assistant from a session cookie. Per-chat
            // ownership is enforced inside the command via `guardChatWrite`.
            // The `chatKind` is fixed to `visitorAssistant` because the
            // surface is implicit in the access path.
            chatMessageCreate(_parent: unknown, args: GqlSMutationChatMessageCreateArgs, requestingSession: GqlSSession) {
                return chatMessageCreate(args, 'visitorAssistant', requestingSession, serverRuntime);
            },
            chatInputCollectionRespond(_parent: unknown, args: GqlSMutationChatInputCollectionRespondArgs, requestingSession: GqlSSession) {
                return chatInputCollectionRespond(args, requestingSession, serverRuntime);
            },
            chatToolApprovalRespond(_parent: unknown, args: GqlSMutationChatToolApprovalRespondArgs, requestingSession: GqlSSession) {
                return chatToolApprovalRespond(args, requestingSession, serverRuntime);
            },
        },
        Subscription: {
            userUpdates: {
                subscribe(_: any, __: any, requestingSession: GqlSSession) {
                    return guardUserSubscription(requestingSession, serverRuntime);
                },
                resolve(_: any, __: any, requestingSession: GqlSSession) {
                    return sessionUserFindOne(requestingSession, serverRuntime) as Promise<GqlSUser>; // todo
                },
            },
            chatUpdates: {
                // Auth is the unguessable `generationId`: only the sender (who
                // generated the UUID locally) can subscribe meaningfully.
                // Once chats grow chat-level subscriptions (vs. the per-turn
                // generationId-keyed shape today), this will additionally
                // call `guardChatRead` against the chat's `sessionId` /
                // `ownerUserId`.
                subscribe(_: any, { generationId }: GqlSSubscriptionChatUpdatesArgs) {
                    return serverRuntime.subscribe.to(`chat-updates:${generationId}`);
                },
                resolve(payload: GqlSChatUpdate) {
                    return payload;
                },
            },
        },
    };
}
