import { formatDistanceToNow, parseISO } from 'date-fns';
import { ArrowDownIcon, InfoIcon, Maximize2Icon, Minimize2Icon } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { toFlatAnswerInput } from './chatAssistantInputKinds';
import { formatChatDateSeparatorLabel } from './chatDateSeparatorLabel';
import type { TranscriptMessage } from './chatTranscript';
import { findLatestCollectionId, findUserInputByCollectionId, groupMessagesByDate, mergeTranscriptMessages } from './chatTranscript';
import { useVisitorChat } from './VisitorChatProvider';
import { VisitorChatComposer } from './VisitorChatComposer';
import { AssistantMarkdown } from '../components/AssistantMarkdown';
import { Popover, PopoverContent, PopoverTrigger } from '../components/base/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/base/sheet';
import { Spinner } from '../components/base/spinner';
import { ChatMessage } from '../components/chat-message';
import type {
    GqlCChatAssistantInputValue,
    GqlCVisitorChatListItemFragment,
    GqlCVisitorChatQuotaFieldsFragment,
} from '../graphql/generated';
import { VisitorChatInputCollectionRespondDocument, VisitorPreviousChatsDocument } from '../graphql/generated';
import { useIsMobile } from '../hooks/use-mobile';
import { useLocale } from '../hooks/useLocale';
import { useVisualViewport } from '../hooks/useVisualViewport';
import { DATE_FNS_LOCALE } from '../utils/dateFnsLocale';

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

    // Mobile keyboard fit. The sheet is portal-mounted with `inset-y-0 h-full`,
    // which sizes against the layout viewport — that does not shrink when
    // iOS Safari's soft keyboard appears, so the browser auto-scrolls the
    // focused textarea into view and drags the header off the top. Driving
    // the sheet's height + top from `window.visualViewport` while open keeps
    // the header pinned at the top of the visible area, lets the transcript
    // shrink in the middle, and parks the composer just above the keyboard.
    // Desktop keeps the original `h-full` layout — the expand toggle still
    // needs the sheet to fill the layout viewport.
    const isMobile = useIsMobile();
    const visualViewport = useVisualViewport();
    const mobileViewportStyle =
        isMobile && isOpen && visualViewport ? { height: visualViewport.height, top: visualViewport.offsetTop } : undefined;

    // Visitor's own previous chats — surfaced in the empty state. Pause
    // while the sheet is closed so we don't run the query on every page-load
    // for visitors who never open the widget; refetch on each open with
    // `cache-and-network` so a freshly-titled chat shows up after its first
    // turn finishes. The same query also pulls `visitorChatQuota` so the
    // status row above the composer renders without a second round-trip.
    const [previousChatsResult, refetchPreviousChats] = useQuery({
        query: VisitorPreviousChatsDocument,
        pause: !isOpen,
        requestPolicy: 'cache-and-network',
    });
    const previousChats = previousChatsResult.data?.currentSession.visitorChats ?? [];
    const visitorChatQuota = previousChatsResult.data?.currentSession.visitorChatQuota ?? null;

    // Refetch the quota whenever a new live message lands — every successful
    // send appends a user-message row, so this fires once per send and keeps
    // the "X / 10 today" row in sync without a manual click. Doing it off
    // `appendedMessages.length` rather than a hand-rolled callback in the
    // provider avoids leaking rate-limit concerns into `sendMessage`.
    const liveMessagesCount = live.appendedMessages.length;
    useEffect(() => {
        if (!isOpen) return;
        refetchPreviousChats({ requestPolicy: 'network-only' });
    }, [isOpen, liveMessagesCount, refetchPreviousChats]);

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
                locale,
            });
        },
        [respondToCollection, live, locale],
    );

    // Limit only bites once we have a live quota snapshot — pre-snapshot we
    // render optimistically (the server enforces the cap, so the worst case
    // is one refused mutation) rather than locking the composer on slow
    // networks.
    const isAtRateLimit = visitorChatQuota !== null && visitorChatQuota.used >= visitorChatQuota.limit;

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetContent
                side="right"
                className={
                    isExpanded
                        ? 'flex w-full flex-col gap-0 border-l border-aubergine/15 bg-cream p-0 sm:max-w-none'
                        : 'flex w-full flex-col gap-0 border-l border-aubergine/15 bg-cream p-0 sm:max-w-md'
                }
                style={mobileViewportStyle}
                aria-describedby="visitor-chat-disclaimer"
            >
                <button
                    type="button"
                    onClick={() => setIsExpanded((value) => !value)}
                    aria-label={
                        isExpanded
                            ? { de: 'Chat verkleinern', en: 'Collapse chat', ru: 'Свернуть чат', ar: 'تصغير الدردشة' }[locale]
                            : { de: 'Chat vergrößern', en: 'Expand chat', ru: 'Развернуть чат', ar: 'توسيع الدردشة' }[locale]
                    }
                    aria-pressed={isExpanded}
                    className="absolute top-4 inset-e-12 z-10 hidden rounded-xs text-aubergine-dark/70 ring-offset-background transition-opacity hover:text-aubergine-dark hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden sm:block cursor-pointer"
                >
                    {isExpanded ? <Minimize2Icon className="size-4" /> : <Maximize2Icon className="size-4" />}
                </button>
                {/* When expanded, cap the inner column so prose stays at a comfortable
                    reading width (~75ch) while the sheet itself — header border, background,
                    composer surface — still spans the viewport. The header keeps its full-width
                    border-b; only the title/disclaimer line is capped so it lines up with the
                    transcript and composer columns below. */}
                <SheetHeader className="border-b border-aubergine/15 bg-cream">
                    <div className={isExpanded ? 'mx-auto flex w-full max-w-3xl flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
                        <div className="flex items-center gap-2">
                            <SheetTitle className="font-serif text-lg text-aubergine-dark">
                                {
                                    {
                                        de: 'Fragen an unseren Assistenten',
                                        en: 'Ask our assistant',
                                        ru: 'Вопросы нашему ассистенту',
                                        ar: 'اسأل مساعدنا',
                                    }[locale]
                                }
                            </SheetTitle>
                            {/* Mobile-only info popover — surfaces the disclaimer
                                that the visible-text version below hides under `sm`
                                so the chat header stays compact when the soft
                                keyboard is up. The close button (`top-end-4`) and
                                expand toggle (`top-end-12`, sm+ only) live above on
                                the absolute layer; this trigger sits inline with
                                the title and stays clear of both. */}
                            <Popover>
                                <PopoverTrigger
                                    aria-label={
                                        {
                                            de: 'Hinweis anzeigen',
                                            en: 'Show disclaimer',
                                            ru: 'Показать примечание',
                                            ar: 'إظهار التنبيه',
                                        }[locale]
                                    }
                                    className="rounded-xs text-aubergine-dark/70 ring-offset-background transition-opacity hover:text-aubergine-dark hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden sm:hidden"
                                >
                                    <InfoIcon className="size-4" />
                                </PopoverTrigger>
                                <PopoverContent side="bottom" align="start" className="w-72 text-xs text-(--color-brand-charcoal-3)">
                                    {
                                        {
                                            de: 'Keine medizinische Beratung. Bei akuten Beschwerden bitte direkt anrufen.',
                                            en: 'Not medical advice. For acute concerns, please call us directly.',
                                            ru: 'Это не медицинская консультация. При острых жалобах, пожалуйста, позвоните нам напрямую.',
                                            ar: 'هذه ليست استشارة طبية. في الحالات العاجلة، يُرجى الاتصال بنا مباشرة.',
                                        }[locale]
                                    }
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* Visible only on `sm` and up — on phones we keep the
                            description mounted as `sr-only` so `aria-describedby`
                            on the SheetContent still resolves, and the visual
                            disclaimer moves into the InfoIcon popover above. */}
                        <SheetDescription id="visitor-chat-disclaimer" className="text-xs text-(--color-brand-charcoal-3) max-sm:sr-only">
                            {
                                {
                                    de: 'Keine medizinische Beratung. Bei akuten Beschwerden bitte direkt anrufen.',
                                    en: 'Not medical advice. For acute concerns, please call us directly.',
                                    ru: 'Это не медицинская консультация. При острых жалобах, пожалуйста, позвоните нам напрямую.',
                                    ar: 'هذه ليست استشارة طبية. في الحالات العاجلة، يُرجى الاتصال بنا مباشرة.',
                                }[locale]
                            }
                        </SheetDescription>
                    </div>
                </SheetHeader>

                <div
                    className={
                        isExpanded
                            ? 'mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-4 p-4'
                            : 'flex min-h-0 flex-1 flex-col gap-4 p-4'
                    }
                >
                    {allMessages.length === 0 && !live.isGenerating ? (
                        <EmptyState previousChats={previousChats} onResume={(id) => void loadChat(id)} />
                    ) : (
                        <ChatTranscript
                            messages={allMessages}
                            streamingTexts={live.streamingTexts}
                            onCollectionSubmit={onCollectionSubmit}
                        />
                    )}
                    <VisitorChatQuotaStatus quota={visitorChatQuota} />
                    <VisitorChatComposer
                        placeholder={{ de: 'Frage eingeben…', en: 'Type your question…', ru: 'Введите вопрос…', ar: 'اكتب سؤالك…' }[locale]}
                        disabled={isAtRateLimit}
                    />
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
                  ru: 'Задайте любой вопрос о процедурах, направлениях или вашем первом приёме.',
                  ar: 'اسأل عن العلاجات أو الوصفات الطبية أو زيارتك الأولى.',
              }[locale]
            : {
                  de: 'Oder stellen Sie eine neue Frage.',
                  en: 'Or ask a new question.',
                  ru: 'Или задайте новый вопрос.',
                  ar: 'أو اطرح سؤالًا جديدًا.',
              }[locale];

    return (
        <div className="flex flex-1 flex-col gap-4 text-sm text-(--color-brand-charcoal-2)">
            {previousChats.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wide text-sage">
                        {{ de: 'Frühere Chats', en: 'Previous chats', ru: 'Прошлые чаты', ar: 'محادثات سابقة' }[locale]}
                    </p>
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
    const fallbackTitle = { de: 'Ohne Titel', en: 'Untitled chat', ru: 'Без названия', ar: 'بدون عنوان' }[locale];
    // `formatDistanceToNow` is locale-aware — feed it the matching date-fns
    // locale so output reads naturally in every supported language.
    const relative = formatDistanceToNow(parseISO(chat.lastModifiedAt), {
        addSuffix: true,
        locale: DATE_FNS_LOCALE[locale],
    });
    return (
        <button
            type="button"
            onClick={() => onResume(chat.chatId)}
            className="flex w-full flex-col gap-1 rounded-md border border-aubergine/20 px-4 py-3 text-start transition-colors duration-200 ease-out hover:bg-aubergine/5 cursor-pointer"
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
    const locale = useLocale();
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
            <div ref={scrollRef} onScroll={onScroll} className="flex h-full min-w-0 flex-col gap-4 overflow-y-auto overflow-x-hidden pe-1">
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
                    aria-label={
                        { de: 'Zum neuesten Beitrag', en: 'Jump to latest', ru: 'Перейти к последнему', ar: 'الانتقال إلى الأحدث' }[locale]
                    }
                    className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-aubergine/15 bg-cream px-3 py-1.5 text-xs font-medium text-aubergine-dark shadow-md transition-colors hover:bg-aubergine/10"
                >
                    <ArrowDownIcon className="size-3.5" />
                    {{ de: 'Zum neuesten Beitrag', en: 'Jump to latest', ru: 'К последнему', ar: 'الأحدث' }[locale]}
                </button>
            ) : null}
        </div>
    );
}

function DateSeparator({ iso }: { iso: string }) {
    const locale = useLocale();
    return (
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-wide text-sage">
            <span className="h-px flex-1 bg-aubergine/15" />
            <time dateTime={iso}>{formatChatDateSeparatorLabel(iso, locale)}</time>
            <span className="h-px flex-1 bg-aubergine/15" />
        </div>
    );
}

// Surfaces the rolling-24h cap right above the composer. Hidden when the
// visitor hasn't sent anything yet (`used = 0` → `resetsAt = null`) so
// first-time openers don't see a "0 / 10" message that explains nothing.
// At the limit the row switches copy to "Tageslimit erreicht" — the
// composer is disabled in parallel by the parent. See
// `docs/features/chat-visitor.md#rate-limiting`.
function VisitorChatQuotaStatus({ quota }: { quota: GqlCVisitorChatQuotaFieldsFragment | null }) {
    const locale = useLocale();
    if (!quota || quota.used === 0) return null;
    const isAtLimit = quota.used >= quota.limit;
    const resetsIn = quota.resetsAt
        ? formatDistanceToNow(parseISO(quota.resetsAt), { addSuffix: false, locale: DATE_FNS_LOCALE[locale] })
        : null;
    const usageText = `${quota.used} / ${quota.limit}`;
    if (isAtLimit) {
        const limitReached = {
            de: `Tageslimit erreicht (${usageText}). Neue Nachricht in ${resetsIn ?? '24 h'} möglich.`,
            en: `Daily limit reached (${usageText}). You can send again in ${resetsIn ?? '24 h'}.`,
            ru: `Достигнут дневной лимит (${usageText}). Снова через ${resetsIn ?? '24 ч'}.`,
            ar: `تم بلوغ الحد اليومي (${usageText}). يمكنك الإرسال بعد ${resetsIn ?? '٢٤ ساعة'}.`,
        }[locale];
        return (
            <p role="status" className="text-xs text-(--color-brand-charcoal-3)">
                {limitReached}
            </p>
        );
    }
    const usage = {
        de: `${usageText} Nachrichten heute · zurückgesetzt in ${resetsIn ?? '–'}`,
        en: `${usageText} messages today · resets in ${resetsIn ?? '–'}`,
        ru: `${usageText} сообщений сегодня · сбрасывается через ${resetsIn ?? '–'}`,
        ar: `${usageText} رسائل اليوم · تُعاد بعد ${resetsIn ?? '–'}`,
    }[locale];
    return <p className="text-xs text-(--color-brand-charcoal-3)">{usage}</p>;
}
