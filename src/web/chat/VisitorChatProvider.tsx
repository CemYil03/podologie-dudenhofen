import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useClient, useMutation } from 'urql';
import { VisitorChatLoadDocument, VisitorChatMessageCreateDocument } from '../graphql/generated';
import type { TranscriptMessage } from './chatTranscript';
import { useChatLiveUpdates } from './useChatLiveUpdates';
import type { ChatLiveUpdates } from './useChatLiveUpdates';

// Visitor-chat coordination — see `docs/features/chat-visitor.md`.
//
// The provider owns the visitor's chat state above the overlay so closing and
// reopening the sheet doesn't lose the conversation. State that survives the
// sheet's open/close cycle:
//
// - `chatId` — populated after the first send returns, or after `loadChat`
//   resumes a previous chat from the empty-state list. Reused on subsequent
//   sends so they append to the same `chats` row.
// - `loadedMessages` — page-query rows for a resumed chat. Empty for a fresh
//   chat (the subscription buffer in `live.appendedMessages` is the only
//   source of truth there). The sheet renders the merged list:
//   `mergeTranscriptMessages(loadedMessages, live.appendedMessages)`.
// - `live` — the `useChatLiveUpdates` handle keyed by `chatId`. Mounted at
//   the provider root so the SSE subscription stays alive even when the
//   sheet is closed.
//
// Every mutation surface goes through `sendMessage` so the "click suggested
// question" path on the landing page and the "type and press Enter" path in
// the sheet share one funnel.

interface VisitorChatContextValue {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    chatId: string | undefined;
    /** Page-query rows for a resumed chat. Empty when the visitor is on a
     *  fresh chat — the subscription buffer is the source of truth there. */
    loadedMessages: ReadonlyArray<TranscriptMessage>;
    live: ChatLiveUpdates;
    /** Sends a free-text message. Awaits the mutation; on success captures
     *  `chatId` for subsequent sends. */
    sendMessage: (message: string) => Promise<void>;
    /** Open the sheet AND immediately fire `message` as the first user
     *  turn. Used by the suggested-question buttons on the landing page. */
    openWithMessage: (message: string) => Promise<void>;
    /** Drop the current chat without leaving the sheet. The next send starts
     *  a fresh `chats` row; the previous chat reappears in the empty-state
     *  list (it's still owned by this session). */
    resetChat: () => void;
    /** Resume a previous chat by id — fetches its transcript and seeds
     *  `loadedMessages` + `chatId`. The empty-state list calls this when the
     *  user picks a row. */
    loadChat: (chatId: string) => Promise<void>;
}

const VisitorChatContext = createContext<VisitorChatContextValue | null>(null);

export function useVisitorChat(): VisitorChatContextValue {
    const value = useContext(VisitorChatContext);
    if (!value) throw new Error('useVisitorChat must be used inside <VisitorChatProvider />');
    return value;
}

export function VisitorChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const [chatId, setChatId] = useState<string | undefined>(undefined);
    const [loadedMessages, setLoadedMessages] = useState<ReadonlyArray<TranscriptMessage>>([]);
    const live = useChatLiveUpdates(chatId);
    const [, sendMutation] = useMutation(VisitorChatMessageCreateDocument);
    const urqlClient = useClient();

    // The mutation's `chatId` argument has to follow the freshly-allocated id
    // even when state hasn't re-rendered yet — two `sendMessage` calls fired
    // back-to-back (suggested question opens the sheet, immediately sends)
    // would otherwise both run with `chatId: undefined` and create two chats.
    // Mirror the state into a ref so each call reads the latest value.
    const chatIdRef = useRef<string | undefined>(undefined);

    const sendMessage = useCallback(
        async (message: string) => {
            const trimmed = message.trim();
            if (!trimmed) return;
            const generationId = live.beginTurn();
            const result = await sendMutation({
                chatId: chatIdRef.current,
                message: trimmed,
                generationId,
                // Visitor agent has no approval-gated tools today, but the
                // mutation requires the flag — auto is the only sensible value.
                requireToolCallApprovals: false,
            });
            if (result.error || !result.data?.chatMessageCreate) {
                live.endTurn();
                return;
            }
            const next = result.data.chatMessageCreate.chatId;
            if (chatIdRef.current !== next) {
                chatIdRef.current = next;
                setChatId(next);
            }
        },
        [live, sendMutation],
    );

    const openWithMessage = useCallback(
        async (message: string) => {
            setOpen(true);
            await sendMessage(message);
        },
        [sendMessage],
    );

    const resetChat = useCallback(() => {
        // Drop chatId + page-query rows. The chatId-change effect inside
        // `useChatLiveUpdates` clears `appendedMessages` for us on the
        // loaded-→empty transition. Don't touch `isOpen` — the user stayed
        // in the sheet on purpose, and the empty state is what they want to
        // see next.
        chatIdRef.current = undefined;
        setChatId(undefined);
        setLoadedMessages([]);
    }, []);

    const loadChat = useCallback(
        async (id: string) => {
            // Use URQL imperatively rather than `useQuery` because the call
            // site is a click handler — `useQuery` would fire on every
            // render of whatever subscribed to it, and the empty-state list
            // wouldn't have re-rendered between rows. `cache-and-network`
            // keeps a snappy cached read for repeat loads while still
            // catching server-side updates from a new turn.
            const result = await urqlClient
                .query(VisitorChatLoadDocument, { chatId: id }, { requestPolicy: 'cache-and-network' })
                .toPromise();
            if (result.error || !result.data?.chat) {
                live.endTurn();
                return;
            }
            const chat = result.data.chat;
            chatIdRef.current = chat.chatId;
            setChatId(chat.chatId);
            // Cast at the boundary: the subscription's `MessageAppended.message`
            // type and the page-query's per-message type are structurally
            // identical (both inline `ChatMessageFields`), but they originate
            // from different generated types. `TranscriptMessage` is the
            // shared shape `mergeTranscriptMessages` operates on.
            setLoadedMessages(chat.messages as ReadonlyArray<TranscriptMessage>);
        },
        [live, urqlClient],
    );

    const value = useMemo<VisitorChatContextValue>(
        () => ({ isOpen, setOpen, chatId, loadedMessages, live, sendMessage, openWithMessage, resetChat, loadChat }),
        [isOpen, chatId, loadedMessages, live, sendMessage, openWithMessage, resetChat, loadChat],
    );

    return (
        <VisitorChatContext.Provider value={value}>
            {children}
            {/* The live-updates listener is rendered HERE — above the sheet —
             *  so the SSE subscription survives `Sheet` mount/unmount cycles.
             *  Without this, closing the sheet during a streaming turn would
             *  drop the subscription and we'd lose the rest of the response. */}
            {live.listener}
        </VisitorChatContext.Provider>
    );
}
