import { createFileRoute, Link } from '@tanstack/react-router';
import { CalendarDaysIcon, MessageCircleIcon, MessagesSquareIcon } from 'lucide-react';
import { seoMeta } from '../../../web/seo/seoMeta';
import { webPageUrlGet } from '../../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../../web/utils/locale';

// Admin landing page — a flat list of links into the individual admin
// surfaces. Authorization for the surfaces themselves runs server-side at
// each `Admin.*` field via `guardAdmin`; this page is a static index and
// makes no GraphQL call, so it renders without throwing even while the
// admin guard hardcodes deny.

export const Route = createFileRoute('/{-$locale}/admin/')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Administration', en: 'Administration', ru: 'Администрирование', ar: 'الإدارة' }[locale],
            description: {
                de: 'Verwaltungsbereich.',
                en: 'Administration area.',
                ru: 'Раздел администрирования.',
                ar: 'منطقة الإدارة.',
            }[locale],
            path: '/admin',
            locale,
            webPageUrl: webPageUrlGet(),
            // Admin-only surface — keep it out of the index and the sitemap.
            noindex: true,
        });
    },
    component: AdminIndex,
});

function AdminIndex() {
    return (
        <main className="mx-auto w-full max-w-3xl p-6">
            <header className="mb-8">
                <h1 className="font-serif text-3xl text-aubergine">Administration</h1>
                <p className="mt-2 text-sm text-(--color-brand-charcoal-3)">Verwaltungsbereich der Praxis. Wähle einen Bereich aus.</p>
            </header>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminLink
                    to="/{-$locale}/admin/chat"
                    icon={<MessageCircleIcon className="size-5 text-aubergine" />}
                    title="Admin-Chat"
                    description="Persönliche Unterhaltung mit dem Assistenten."
                />
                <AdminLink
                    to="/{-$locale}/admin/visitor-chats"
                    icon={<MessagesSquareIcon className="size-5 text-aubergine" />}
                    title="Besucher-Chats"
                    description="Alle Unterhaltungen, die Besucher mit dem Assistenten geführt haben — zum Verstehen, wonach gefragt wird."
                />
                <AdminLink
                    to="/{-$locale}/admin/vacations"
                    icon={<CalendarDaysIcon className="size-5 text-aubergine" />}
                    title="Urlaub"
                    description="Geplante Praxisurlaube anlegen und bearbeiten."
                />
            </ul>
        </main>
    );
}

function AdminLink({
    to,
    icon,
    title,
    description,
}: {
    to: '/{-$locale}/admin/chat' | '/{-$locale}/admin/visitor-chats' | '/{-$locale}/admin/vacations';
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <li>
            <Link
                to={to}
                className="flex h-full items-start gap-3 rounded-md border border-(--color-brand-charcoal-1)/30 p-4 transition-colors hover:border-aubergine/40 hover:bg-aubergine/5"
            >
                <span className="mt-0.5 shrink-0">{icon}</span>
                <span className="min-w-0">
                    <span className="block font-medium text-aubergine">{title}</span>
                    <span className="mt-1 block text-sm text-(--color-brand-charcoal-3)">{description}</span>
                </span>
            </Link>
        </li>
    );
}
