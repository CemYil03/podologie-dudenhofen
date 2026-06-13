import { HeadContent, Outlet, Scripts, createRootRoute, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Provider as GraphQLClientProvider } from 'urql';
import sourceSans3LatinWoff2 from '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2?url';
import frauncesLatinWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2?url';
import jetbrainsMonoLatinWoff2 from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url';
import appCss from '../styles.css?url';
import { Toaster } from '../web/components/base/sonner';
import { TooltipProvider } from '../web/components/base/tooltip';
import { NavigationProgress } from '../web/components/NavigationProgress';
import { urqlClient } from '../web/graphql/client';
import { useLocale } from '../web/hooks/useLocale';

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                // `viewport-fit=cover` lets the page extend behind iOS Safari's
                // notch / home indicator, which is also what makes the
                // `env(safe-area-inset-*)` CSS variables resolve to non-zero
                // values. Without it, fixed full-screen elements (e.g. the
                // mobile nav sheet) leave a strip of body background visible
                // behind the dynamic toolbar.
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, viewport-fit=cover',
            },
        ],
        links: [
            {
                rel: 'preload',
                as: 'font',
                type: 'font/woff2',
                href: sourceSans3LatinWoff2,
                crossOrigin: 'anonymous',
            },
            {
                rel: 'preload',
                as: 'font',
                type: 'font/woff2',
                href: frauncesLatinWoff2,
                crossOrigin: 'anonymous',
            },
            {
                rel: 'preload',
                as: 'font',
                type: 'font/woff2',
                href: jetbrainsMonoLatinWoff2,
                crossOrigin: 'anonymous',
            },
            {
                rel: 'stylesheet',
                href: appCss,
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                href: '/favicon/favicon-96x96.png',
            },
            {
                rel: 'icon',
                type: 'image/svg+xml',
                href: '/favicon/favicon.svg',
            },
            {
                rel: 'shortcut icon',
                href: '/favicon/favicon.ico',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/favicon/apple-touch-icon.png',
            },
            {
                rel: 'manifest',
                href: '/manifest.json',
            },
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
    shellComponent: RootDocument,
});

function RootComponent() {
    return <Outlet />;
}

function NotFound() {
    const location = useLocation();

    useEffect(() => {
        console.warn(`[404] Not found: ${location.pathname}`);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-muted-foreground mt-2">Page not found</p>
            </div>
        </div>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    const locale = useLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="font-sans antialiased wrap-anywhere bg-cream text-charcoal selection:bg-aubergine/25 selection:text-aubergine-dark">
                <NavigationProgress />
                <TooltipProvider>
                    <GraphQLClientProvider value={urqlClient}>{children}</GraphQLClientProvider>
                </TooltipProvider>
                <Toaster position="bottom-center" richColors />
                <Scripts />
            </body>
        </html>
    );
}
