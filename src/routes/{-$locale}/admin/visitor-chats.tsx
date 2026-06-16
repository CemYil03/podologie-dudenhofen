import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useQuery } from 'urql';
import { formatChatDateSeparatorLabel } from '../../../web/chat/chatDateSeparatorLabel';
import { findUserInputByCollectionId, groupMessagesByDate } from '../../../web/chat/chatTranscript';
import { Spinner } from '../../../web/components/base/spinner';
import { ChatMessage } from '../../../web/components/chat-message';
import { VisitorChatAdminPageDocument, VisitorChatsAdminPageDocument } from '../../../web/graphql/generated';
import type { GqlCVisitorChatAdminPageQuery, GqlCVisitorChatsAdminPageQuery } from '../../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../../web/hooks/useLocale';
import { seoMeta } from '../../../web/seo/seoMeta';
import { webPageUrlGet } from '../../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../../web/utils/locale';

// Read-only review surface for visitor-assistant chats — see
// `docs/features/admin-visitor-chats.md`. Authorization is the parent
// `guardAdmin` on `Admin.visitorChats` / `Admin.visitorChat`; cross-session
// reads are intentional here (the public visitor path uses `guardChatRead`
// for its session-scoped check).
//
// `?chatId` toggles between list and detail in the same route — keeps the
// URL shareable and matches the admin chat page's shape.

export const Route = createFileRoute('/{-$locale}/admin/visitor-chats')({
    validateSearch: (search: Record<string, unknown>) => ({
        chatId: typeof search.chatId === 'string' ? search.chatId : undefined,
    }),
    loader: () => routeLoaderGraphqlClient(VisitorChatsAdminPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Besucher-Chats', en: 'Visitor chats', ru: 'Чаты посетителей', ar: 'محادثات الزوار' }[locale],
            description: {
                de: 'Besucher-Chats einsehen.',
                en: 'Review visitor chats.',
                ru: 'Просмотр чатов посетителей.',
                ar: 'مراجعة محادثات الزوار.',
            }[locale],
            path: '/admin/visitor-chats',
            locale,
            webPageUrl: webPageUrlGet(),
            // Admin-only surface — keep it out of the index and the sitemap.
            noindex: true,
        });
    },
    component() {
        const { chatId } = Route.useSearch();
        return chatId ? <VisitorChatDetail chatId={chatId} /> : <VisitorChatsList />;
    },
});

type VisitorChatListItem = GqlCVisitorChatsAdminPageQuery['currentSession']['admin']['visitorChats'][number];

function VisitorChatsList() {
    const [{ data, fetching, error }] = useQuery({
        query: VisitorChatsAdminPageDocument,
        requestPolicy: 'cache-and-network',
    });

    const visitorChats = data?.currentSession.admin.visitorChats ?? [];

    return (
        <main className="mx-auto w-full max-w-3xl p-6">
            <header className="mb-8">
                <h1 className="font-serif text-3xl text-aubergine">Besucher-Chats</h1>
                <p className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                    Alle Unterhaltungen, die Besucher mit dem Assistenten geführt haben — sortiert nach letzter Aktivität.
                </p>
            </header>

            {error ? (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error.message}</p>
            ) : null}

            {fetching && visitorChats.length === 0 ? (
                <p className="text-sm text-(--color-brand-charcoal-3)">Lade…</p>
            ) : visitorChats.length === 0 ? (
                <p className="text-sm text-(--color-brand-charcoal-3)">Bisher keine Besucher-Chats.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {visitorChats.map((chat) => (
                        <li key={chat.chatId}>
                            <VisitorChatRow chat={chat} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

function VisitorChatRow({ chat }: { chat: VisitorChatListItem }) {
    return (
        <Link
            to="/{-$locale}/admin/visitor-chats"
            search={{ chatId: chat.chatId }}
            className="flex items-baseline justify-between gap-4 rounded-md border border-(--color-brand-charcoal-1)/30 px-4 py-3 transition-colors hover:border-aubergine/40 hover:bg-aubergine/5"
        >
            <span className="min-w-0 flex-1 truncate text-aubergine">{chat.title || 'Ohne Titel'}</span>
            <span className="shrink-0 text-xs text-(--color-brand-charcoal-3)">{formatGermanDateTime(chat.lastModifiedAt)}</span>
        </Link>
    );
}

function VisitorChatDetail({ chatId }: { chatId: string }) {
    const [{ data, fetching, error }] = useQuery({
        query: VisitorChatAdminPageDocument,
        variables: { chatId },
        requestPolicy: 'cache-and-network',
    });

    const chat = data?.currentSession.admin.visitorChat;

    if (error) {
        return (
            <main className="mx-auto w-full max-w-2xl p-6">
                <BackToList />
                <p className="mt-6 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {error.message}
                </p>
            </main>
        );
    }
    if (!chat) {
        return (
            <main className="mx-auto grid h-dvh w-full max-w-2xl place-items-center p-6">
                <Spinner />
            </main>
        );
    }

    return (
        <main className="mx-auto grid h-dvh w-full min-w-0 max-w-2xl grid-rows-[auto_auto_1fr] gap-4 p-6">
            <BackToList />
            <header className="flex items-baseline justify-between border-b border-aubergine/10 pb-3">
                <h1 className="min-w-0 truncate font-serif text-xl text-aubergine-dark">{chat.title || 'Ohne Titel'}</h1>
                {fetching ? <Spinner className="size-3 text-(--color-brand-charcoal-3)" /> : null}
            </header>
            <ReadOnlyTranscript chat={chat} />
        </main>
    );
}

function BackToList() {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            onClick={() => navigate({ to: '/{-$locale}/admin/visitor-chats', search: { chatId: undefined } })}
            className="flex items-center gap-1.5 text-sm text-(--color-brand-charcoal-3) transition-colors hover:text-aubergine"
        >
            <ArrowLeftIcon className="size-4" />
            Zur Liste
        </button>
    );
}

// Read-only viewer — no composer, no live updates, no interactive collection
// or approval handlers. The visitor's chat is closed from the admin's
// perspective; we just want to see what happened. `isInteractiveCollection`
// is left at its default (false) on every row so a still-open collection
// never renders as fillable in the admin viewer.
function ReadOnlyTranscript({ chat }: { chat: NonNullable<GqlCVisitorChatAdminPageQuery['currentSession']['admin']['visitorChat']> }) {
    const userInputByCollection = findUserInputByCollectionId(chat.messages);
    const groupedMessages = groupMessagesByDate(chat.messages);

    if (chat.messages.length === 0) {
        return <p className="text-sm text-(--color-brand-charcoal-3)">Keine Nachrichten.</p>;
    }

    return (
        <div className="flex h-full min-w-0 flex-col gap-4 overflow-y-auto overflow-x-hidden pe-2">
            {groupedMessages.map((group) => (
                <section key={group.date} className="flex min-w-0 flex-col gap-4">
                    <DateSeparator iso={group.date} />
                    {group.messages.map((message) => {
                        const collectionUserInput =
                            message.__typename === 'ChatMessageAssistantInputCollection'
                                ? userInputByCollection.get(message.chatMessageId)
                                : undefined;
                        return <ChatMessage key={message.chatMessageId} message={message} collectionUserInput={collectionUserInput} />;
                    })}
                </section>
            ))}
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

function formatGermanDateTime(iso: string): string {
    return new Intl.DateTimeFormat('de-DE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(iso));
}
