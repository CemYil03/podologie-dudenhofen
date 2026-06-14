import { createFileRoute } from '@tanstack/react-router';
import { environmentVariables } from '../server/env/environmentVariablesCreate';

// Dynamic robots.txt — emits an absolute `Sitemap:` URL using
// `WEB_PAGE_URL` so crawlers don't need to resolve relative URLs and so the
// served file matches the deployed environment exactly. Excludes the API
// surface, the authenticated `/server/*` render targets, and the chat
// route (which is `noindex` per `seoMeta` but worth keeping out of crawl
// budget altogether).

export const Route = createFileRoute('/robots.txt')({
    server: {
        handlers: {
            GET: () =>
                new Response(robotsTxtBuild(environmentVariables.webPageUrl), {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Cache-Control': 'public, max-age=3600',
                    },
                }),
        },
    },
});

function robotsTxtBuild(webPageUrl: string): string {
    // The default `User-agent: *` block stays restrictive — crawlers stay
    // out of `/api/`, `/server/` and the per-session `/chat` surface.
    // Allow rules for the public surface are the implicit default; the
    // explicit `Allow: /` is defensive against quirky crawlers that
    // require an allow line before disallows take effect.
    //
    // We then opt the major AI training crawlers in to the public surface
    // — they're a real discovery channel now (ChatGPT search, Perplexity,
    // Claude Web) and excluding them would lose practice referrals. They
    // still respect the same `/api/`, `/server/`, `/chat` exclusions.
    return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /server/
Disallow: /chat
Disallow: /en/chat

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /server/
Disallow: /chat
Disallow: /en/chat

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /server/
Disallow: /chat
Disallow: /en/chat

User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /server/
Disallow: /chat
Disallow: /en/chat

Sitemap: ${webPageUrl}/sitemap.xml
`;
}
