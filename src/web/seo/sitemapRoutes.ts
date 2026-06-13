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

export interface SitemapPath {
    path: string;
    changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority?: number;
}

export const SITEMAP_PATHS: ReadonlyArray<SitemapPath> = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/praxis', changefreq: 'monthly', priority: 0.8 },
    { path: '/leistungen', changefreq: 'monthly', priority: 0.9 },
    { path: '/qualifikation', changefreq: 'monthly', priority: 0.7 },
    { path: '/karriere', changefreq: 'monthly', priority: 0.5 },
    { path: '/kontakt', changefreq: 'monthly', priority: 0.9 },
    { path: '/impressum', changefreq: 'yearly', priority: 0.3 },
    { path: '/datenschutz', changefreq: 'yearly', priority: 0.3 },
];
