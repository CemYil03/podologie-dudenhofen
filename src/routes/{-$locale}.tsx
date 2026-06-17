import { Outlet, createFileRoute, notFound, redirect, useLocation } from '@tanstack/react-router';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server';
import { VisitorChatLauncher } from '../web/chat/VisitorChatLauncher';
import { VisitorChatProvider } from '../web/chat/VisitorChatProvider';
import { VisitorChatSheet } from '../web/chat/VisitorChatSheet';
import { AdminHeader } from '../web/components/AdminHeader';
import { SiteFooter } from '../web/components/SiteFooter';
import { SiteHeader } from '../web/components/SiteHeader';
import { SkipLink } from '../web/components/SkipLink';
import { useSearchTargetHighlight } from '../web/hooks/useSearchTargetHighlight';
import { DEFAULT_LOCALE, LOCALES, localeFromAcceptLanguage } from '../web/utils/locale';
import type { Locale } from '../web/utils/locale';

const LOCALE_COOKIE = 'locale';

const detectLocale = createIsomorphicFn()
    .server(() => {
        const cookie = getRequestHeader('cookie');
        const match = cookie?.match(/(?:^|;\s*)locale=([^;]+)/);
        if (match && LOCALES.includes(match[1] as Locale)) return match[1] as Locale;
        const detected = localeFromAcceptLanguage(getRequestHeader('accept-language'));
        setResponseHeader('Set-Cookie', `${LOCALE_COOKIE}=${detected}; Path=/; Max-Age=31536000; SameSite=Lax`);
        return detected;
    })
    .client(() => {
        const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
        if (match && LOCALES.includes(match[1] as Locale)) return match[1] as Locale;
        return DEFAULT_LOCALE;
    });

export const Route = createFileRoute('/{-$locale}')({
    beforeLoad: ({ params, location }) => {
        if (params.locale && !LOCALES.includes(params.locale as Locale)) {
            throw notFound();
        }
        if (!params.locale) {
            const detected = detectLocale();
            if (detected !== DEFAULT_LOCALE) {
                throw redirect({ href: `/${detected}${location.pathname === '/' ? '' : location.pathname}` });
            }
        }
    },
    component: LocaleLayout,
});

function LocaleLayout() {
    useSearchTargetHighlight();
    const pathname = useLocation({ select: (l) => l.pathname });
    // `/admin/*` runs under its own minimal chrome: a custom `AdminHeader`,
    // no public footer, and no visitor-chat surfaces (the visitor widget is
    // a public conversion affordance — it has no place in a staff
    // workflow). Public routes get the full site chrome.
    const isAdmin = /(^|\/)admin(\/|$)/.test(pathname);
    if (isAdmin) {
        return (
            <div className="flex min-h-screen flex-col">
                <AdminHeader />
                <Outlet />
            </div>
        );
    }
    return (
        <VisitorChatProvider>
            <div className="flex min-h-screen flex-col">
                <SkipLink />
                <SiteHeader />
                <Outlet />
                <SiteFooter />
            </div>
            <VisitorChatLauncher />
            <VisitorChatSheet />
        </VisitorChatProvider>
    );
}
