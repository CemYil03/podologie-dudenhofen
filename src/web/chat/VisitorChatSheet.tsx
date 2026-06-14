import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { de as deLocale } from 'date-fns/locale';
import { ArrowDownIcon, Maximize2Icon, Minimize2Icon } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { toFlatAnswerInput } from './chatAssistantInputKinds';
import type { TranscriptMessage } from './chatTranscript';
import { findLatestCollectionId, findUserInputByCollectionId, groupMessagesByDate, mergeTranscriptMessages } from './chatTranscript';
import { useVisitorChat } from './VisitorChatProvider';
import { VisitorChatComposer } from './VisitorChatComposer';
import { AssistantMarkdown } from '../components/AssistantMarkdown';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/base/sheet';
import { Spinner } from '../components/base/spinner';
import { ChatMessage } from '../components/chat-message';
import type { GqlCChatAssistantInputValue, GqlCVisitorChatListItemFragment } from '../graphql/generated';
import { VisitorChatInputCollectionRespondDocument, VisitorPreviousChatsDocument } from '../graphql/generated';
import { useLocale } from '../hooks/useLocale';

// The visitor chat overlay — see `docs/features/chat-visitor.md`.
//
// Rendered once at the LocaleLayout level. Open/close state lives in the
// `VisitorChatProvider` so the floating launcher and the suggested-question
// buttons on `/` can both drive it. The transcript is the live-updates
// subscription buffer (visitor chats have no page-query — the chat is born
// in this session, so the subscription has delivered every row).
//
// `ChatTranscript` here mirrors the admin route's transcript view in
// `src/routes/{-$locale}/admin/chat.tsx` — same stick-to-bottom + jump-to-
// latest behaviour. Pulling them into a single shared component is a
// follow-up; the surfaces differ in their chrome (headers, composer wiring)
// but the transcript algorithm is identical.

export function VisitorChatSheet() {
    const locale = useLocale();
    const { isOpen, setOpen, loadedMessages, live, loadChat } = useVisitorChat();
    const [, respondToCollection] = useMutation(VisitorChatInputCollectionRespondDocument);
    // Desktop-only expand toggle. Small viewports already get the full-width
    // sheet via the default `w-full`, so the toggle is hidden under `sm`.
    // Reset to the default size each time the sheet closes — opening fresh
    // shouldn't surprise the visitor with a previously-expanded layout.
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        if (!isOpen) setIsExpanded(false);
    }, [isOpen]);

    // Visitor's own previous chats — surfaced in the empty state. Pause
    // while the sheet is closed so we don't run the query on every page-load
    // for visitors who never open the widget; refetch on each open with
    // `cache-and-network` so a freshly-titled chat shows up after its first
    // turn finishes.
    const [previousChatsResult] = useQuery({
        query: VisitorPreviousChatsDocument,
        pause: !isOpen,
        requestPolicy: 'cache-and-network',
    });
    const previousChats = previousChatsResult.data?.currentSession.visitorChats ?? [];

    // Merge the page-query rows (only populated when the visitor resumed a
    // previous chat) with the live subscription buffer. For a fresh chat
    // `loadedMessages` is empty and the merge is a no-op — the subscription
    // remains the only source of truth, exactly as before.
    const allMessages = mergeTranscriptMessages(loadedMessages, live.appendedMessages as ReadonlyArray<TranscriptMessage>);

    const onCollectionSubmit = useCallback(
        async (collectionMessageId: string, answers: ReadonlyArray<{ inputId: string; value: GqlCChatAssistantInputValue }>) => {
            const generationId = live.beginTurn();
            const flatAnswers = answers.map((answer) => toFlatAnswerInput(answer.inputId, answer.value));
            await respondToCollection({
                collectionMessageId,
                answers: flatAnswers,
                generationId,
                requireToolCallApprovals: false,
            });
        },
        [respondToCollection, live],
    );

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetContent
                side="right"
                className={
                    isExpanded
                        ? 'flex w-full flex-col gap-0 border-l border-aubergine/15 bg-cream p-0 sm:max-w-none'
                        : 'flex w-full flex-col gap-0 border-l border-aubergine/15 bg-cream p-0 sm:max-w-md'
                }
                aria-describedby="visitor-chat-disclaimer"
            >
                <button
                    type="button"
                    onClick={() => setIsExpanded((value) => !value)}
                    aria-label={
                        isExpanded
                            ? { de: 'Chat verkleinern', en: 'Collapse chat' }[locale]
                            : { de: 'Chat vergrößern', en: 'Expand chat' }[locale]
                    }
                    aria-pressed={isExpanded}
                    className="absolute top-4 right-12 z-10 hidden rounded-xs text-aubergine-dark/70 ring-offset-background transition-opacity hover:text-aubergine-dark hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden sm:block"
                >
                    {isExpanded ? <Minimize2Icon className="size-4" /> : <Maximize2Icon className="size-4" />}
                </button>
                <SheetHeader className="border-b border-aubergine/15 bg-cream">
                    <SheetTitle className="font-serif text-lg text-aubergine-dark">
                        {{ de: 'Fragen an unseren Assistenten', en: 'Ask our assistant' }[locale]}
                    </SheetTitle>
                    <SheetDescription id="visitor-chat-disclaimer" className="text-xs text-(--color-brand-charcoal-3)">
                        {
                            {
                                de: 'Keine medizinische Beratung. Bei akuten Beschwerden bitte direkt anrufen.',
                                en: 'Not medical advice. For acute concerns, please call us directly.',
                            }[locale]
                        }
                    </SheetDescription>
                </SheetHeader>

                <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
                    {allMessages.length === 0 && !live.isGenerating ? (
                        <EmptyState previousChats={previousChats} onResume={(id) => void loadChat(id)} />
                    ) : (
                        <ChatTranscript
                            messages={allMessages}
                            streamingTexts={live.streamingTexts}
                            onCollectionSubmit={onCollectionSubmit}
                        />
                    )}
                    <VisitorChatComposer placeholder={{ de: 'Frage eingeben…', en: 'Type your question…' }[locale]} />
                </div>
            </SheetContent>
        </Sheet>
    );
}

function EmptyState({
    previousChats,
    onResume,
}: {
    previousChats: ReadonlyArray<GqlCVisitorChatListItemFragment>;
    onResume: (chatId: string) => void;
}) {
    const locale = useLocale();
    const intro =
        previousChats.length === 0
            ? {
                  de: 'Stellen Sie eine Frage rund um Behandlungen, Verordnungen oder Ihren ersten Termin.',
                  en: 'Ask anything about treatments, prescriptions, or your first visit.',
              }[locale]
            : { de: 'Oder stellen Sie eine neue Frage.', en: 'Or ask a new question.' }[locale];

    return (
        <div className="flex flex-1 flex-col gap-4 text-sm text-(--color-brand-charcoal-2)">
            {previousChats.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wide text-sage">{{ de: 'Frühere Chats', en: 'Previous chats' }[locale]}</p>
                    <ul className="flex flex-col gap-2">
                        {previousChats.map((chat) => (
                            <li key={chat.chatId}>
                                <PreviousChatButton chat={chat} onResume={onResume} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            <p className="max-w-xs">{intro}</p>
        </div>
    );
}

function PreviousChatButton({ chat, onResume }: { chat: GqlCVisitorChatListItemFragment; onResume: (chatId: string) => void }) {
    const locale = useLocale();
    const fallbackTitle = { de: 'Ohne Titel', en: 'Untitled chat' }[locale];
    // `formatDistanceToNow` is locale-aware; pass the German locale only when
    // we're rendering DE — `en` is the date-fns default. `addSuffix` produces
    // "vor 5 Minuten" / "5 minutes ago" which reads naturally next to the title.
    const relative = formatDistanceToNow(parseISO(chat.lastModifiedAt), {
        addSuffix: true,
        locale: locale === 'de' ? deLocale : undefined,
    });
    return (
        <button
            type="button"
            onClick={() => onResume(chat.chatId)}
            className="flex w-full flex-col gap-1 rounded-md border border-aubergine/20 px-4 py-3 text-left transition-colors duration-200 ease-out hover:bg-aubergine/5"
        >
            <span className="line-clamp-2 text-sm font-medium text-aubergine">{chat.title || fallbackTitle}</span>
            <span className="text-xs text-(--color-brand-charcoal-3)">{relative}</span>
        </button>
    );
}

// Shared with the admin route's `ChatTranscript` in spirit — both routes
// implement the same stick-to-bottom + jump-to-latest behaviour. Extracting
// a single `<ChatTranscript />` is a follow-up once the two surfaces have
// proven they really converge.
function ChatTranscript({
    messages,
    streamingTexts,
    onCollectionSubmit,
}: {
    messages: ReadonlyArray<TranscriptMessage>;
    streamingTexts: Readonly<Record<string, string>>;
    onCollectionSubmit: (
        collectionMessageId: string,
        answers: ReadonlyArray<{ inputId: string; value: GqlCChatAssistantInputValue }>,
    ) => void;
}) {
    const latestCollectionId = findLatestCollectionId(messages);
    const userInputByCollection = findUserInputByCollectionId(messages);
    const groupedMessages = groupMessagesByDate(messages);
    const streamingEntries = Object.entries(streamingTexts);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const isAtBottomRef = useRef(true);
    const lastContentSignature = `${messages.length}|${streamingEntries.map(([id, text]) => `${id}:${text.length}`).join(',')}`;

    useLayoutEffect(() => {
        if (!isAtBottomRef.current) return;
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [lastContentSignature]);

    const onScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        const next = distanceFromBottom < 64;
        if (next !== isAtBottomRef.current) {
            isAtBottomRef.current = next;
            setIsAtBottom(next);
        }
    }, []);

    const jumpToLatest = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, []);

    return (
        <div className="relative min-h-0 flex-1">
            <div ref={scrollRef} onScroll={onScroll} className="flex h-full min-w-0 flex-col gap-4 overflow-y-auto overflow-x-hidden pr-1">
                {groupedMessages.map((group) => (
                    <section key={group.date} className="flex min-w-0 flex-col gap-4">
                        <DateSeparator iso={group.date} />
                        {group.messages.map((message) => {
                            const collectionUserInput =
                                message.__typename === 'ChatMessageAssistantInputCollection'
                                    ? userInputByCollection.get(message.chatMessageId)
                                    : undefined;
                            return (
                                <ChatMessage
                                    key={message.chatMessageId}
                                    message={message}
                                    isInteractiveCollection={
                                        message.__typename === 'ChatMessageAssistantInputCollection' &&
                                        message.chatMessageId === latestCollectionId
                                    }
                                    collectionUserInput={collectionUserInput}
                                    onCollectionSubmit={onCollectionSubmit}
                                />
                            );
                        })}
                    </section>
                ))}
                {streamingEntries.length > 0 ? (
                    <section className="flex min-w-0 flex-col gap-4">
                        {streamingEntries.map(([streamingId, text]) => (
                            <AssistantMarkdown key={streamingId} text={text} streaming />
                        ))}
                    </section>
                ) : null}
                {messages.length === 0 && streamingEntries.length === 0 ? (
                    <Spinner className="size-4 text-(--color-brand-charcoal-3)" />
                ) : null}
            </div>
            {!isAtBottom ? (
                <button
                    type="button"
                    onClick={jumpToLatest}
                    aria-label="Jump to latest"
                    className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-aubergine/15 bg-cream px-3 py-1.5 text-xs font-medium text-aubergine-dark shadow-md transition-colors hover:bg-aubergine/10"
                >
                    <ArrowDownIcon className="size-3.5" />
                    Jump to latest
                </button>
            ) : null}
        </div>
    );
}

function DateSeparator({ iso }: { iso: string }) {
    return (
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-wide text-sage">
            <span className="h-px flex-1 bg-aubergine/15" />
            <time dateTime={iso}>{format(parseISO(iso), 'PP')}</time>
            <span className="h-px flex-1 bg-aubergine/15" />
        </div>
    );
}
