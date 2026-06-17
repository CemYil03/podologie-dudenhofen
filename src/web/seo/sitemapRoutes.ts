// Indexable paths for the dynamic `/sitemap.xml`. Each entry is the canonical
// path WITHOUT a locale prefix and starting with `/`. The sitemap route
// emits one URL per locale per entry, with `xhtml:link rel="alternate"
// hreflang="…"` cross-links.
//
// **Add a new entry whenever you add a public, indexable page.** Skip:
//
//   - `/api/*`, `/server/*` and any other handler-only route
//   - parameterized paths whose values aren't enumerable here (e.g.
//     `/chat/$chatId`) — generate a per-row sitemap from the DB instead
//   - logged-in / transactional / noindex pages (see `seoMeta`'s
//     `noindex: true` option) — these stay out of both the sitemap and
//     search engines
//
// Optional `changefreq` and `priority` follow the sitemaps.org spec; both
// are advisory and most engines now ignore them, so keep them simple.
//
// Optional `locales` restricts a path to a subset of the configured
// locales — use this for transactional / locale-specific pages
// (`/karriere`, `/impressum`, `/datenschutz`) where the English variant
// has no real audience. Defaults to all locales when omitted.

import type { Locale } from '../utils/locale';

export interface SitemapPath {
    path: string;
    changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority?: number;
    locales?: ReadonlyArray<Locale>;
}

export const SITEMAP_PATHS: ReadonlyArray<SitemapPath> = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/praxis', changefreq: 'monthly', priority: 0.8 },
    { path: '/leistungen', changefreq: 'monthly', priority: 0.9 },
    { path: '/qualifikation', changefreq: 'monthly', priority: 0.7 },
    // Career, imprint and privacy pages exist primarily in German — the
    // English variant is kept around for accessibility but doesn't need
    // its own sitemap entry. The `hreflang` annotation on the German URL
    // still advertises the English alternate to crawlers.
    { path: '/karriere', changefreq: 'monthly', priority: 0.5, locales: ['de'] },
    { path: '/kontakt', changefreq: 'monthly', priority: 0.9 },
    { path: '/impressum', changefreq: 'yearly', priority: 0.3, locales: ['de'] },
    { path: '/datenschutz', changefreq: 'yearly', priority: 0.3, locales: ['de'] },
    { path: '/barrierefreiheit', changefreq: 'yearly', priority: 0.3, locales: ['de'] },
];
