import { createFileRoute } from '@tanstack/react-router';
import { environmentVariables } from '../server/env/environmentVariablesCreate';
import { DEFAULT_LOCALE, LOCALES } from '../web/utils/locale';
import type { Locale } from '../web/utils/locale';
import { SITEMAP_PATHS } from '../web/seo/sitemapRoutes';
import type { SitemapPath } from '../web/seo/sitemapRoutes';

// Dynamic XML sitemap — emits one `<url>` per (path × locale) with
// `xhtml:link rel="alternate" hreflang="…"` alternates plus `x-default`,
// and a `<lastmod>` from `BUILD_TIME` so crawlers see a fresh date on
// every deploy. Source paths come from `src/web/seo/sitemapRoutes.ts` so
// adding a new indexable page is a single-line edit.

export const Route = createFileRoute('/sitemap.xml')({
    server: {
        handlers: {
            GET: () =>
                new Response(sitemapXmlBuild(environmentVariables.webPageUrl, environmentVariables.buildTime), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/xml; charset=utf-8',
                        // Cache for an hour at the edge — the content only
                        // changes when the deployed code changes, but a long
                        // TTL means stale-while-revalidate after a deploy.
                        'Cache-Control': 'public, max-age=3600',
                    },
                }),
        },
    },
});

function sitemapXmlBuild(webPageUrl: string, buildTime: string): string {
    // ISO 8601 → `YYYY-MM-DD` (W3C Datetime, the form Google's sitemap
    // protocol prefers for `lastmod`). Drops the time portion so a same-day
    // re-deploy doesn't churn the date in the index.
    const lastmod = buildTime.slice(0, 10);
    const urls = SITEMAP_PATHS.flatMap((entry) => {
        const enabledLocales = entry.locales ?? LOCALES;
        return enabledLocales.map((locale) => sitemapUrlEntry(webPageUrl, entry, locale, lastmod, enabledLocales));
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function sitemapUrlEntry(
    webPageUrl: string,
    entry: SitemapPath,
    locale: Locale,
    lastmod: string,
    enabledLocales: ReadonlyArray<Locale>,
): string {
    const loc = sitemapUrl(webPageUrl, locale, entry.path);
    const alternates = enabledLocales
        .map(
            (otherLocale) =>
                `    <xhtml:link rel="alternate" hreflang="${otherLocale}" href="${sitemapUrl(webPageUrl, otherLocale, entry.path)}" />`,
        )
        .join('\n');
    // `x-default` always points at the default locale, even when the entry
    // is locale-restricted — the default locale is always part of the set
    // by construction (we never publish a non-default-only page).
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${sitemapUrl(webPageUrl, DEFAULT_LOCALE, entry.path)}" />`;
    const lastmodTag = `\n    <lastmod>${lastmod}</lastmod>`;
    const changefreq = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : '';
    const priority = entry.priority !== undefined ? `\n    <priority>${entry.priority.toFixed(1)}</priority>` : '';
    return `  <url>
    <loc>${loc}</loc>${lastmodTag}
${alternates}
${xDefault}${changefreq}${priority}
  </url>`;
}

function sitemapUrl(webPageUrl: string, locale: Locale, path: string): string {
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const suffix = path === '/' ? '' : path;
    return `${webPageUrl}${prefix}${suffix}` || webPageUrl;
}
