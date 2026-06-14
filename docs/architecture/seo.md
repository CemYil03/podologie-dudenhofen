# SEO

## Context

Public-facing pages need consistent, correct metadata so search engines and social platforms can discover, index, and link them. Without a
shared building block every new page silently inherits poor defaults: a placeholder `<title>`, no description, no canonical, no Open
Graph/Twitter cards, and — critically for a bilingual site — no `hreflang` alternates. Drift across pages becomes a maintenance burden once
there are more than a few of them.

## Decision

A single `seoMeta()` helper produces the full set of meta and link tags from a small per-page input. Each page route calls it from TanStack
Router's `head()` callback. Sitemap and robots are served dynamically so the absolute URLs reflect the deployed environment.

The pieces:

| Concern             | Where                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Per-page meta+links | `src/web/seo/seoMeta.ts` — pure helper; tests in `seoMeta.test.ts`                                       |
| Site-wide constants | `src/web/seo/seoConstants.ts` — `SITE_NAME`, share image + dimensions, OG locale map, geo coordinates    |
| Structured data     | `src/web/seo/structuredData.ts` — JSON-LD builders (`MedicalBusiness`, `BreadcrumbList`, `FAQPage`)      |
| Absolute origin     | `WEB_PAGE_URL` env var → `EnvironmentVariables.webPageUrl`; resolved on the client via `webPageUrlGet()` |
| Sitemap             | Dynamic route `src/routes/sitemap[.]xml.ts`; entries in `src/web/seo/sitemapRoutes.ts`                   |
| Robots              | Dynamic route `src/routes/robots[.]txt.ts`                                                               |

## Alternatives considered

1. **Static `public/sitemap.xml` and `public/robots.txt`.** The starting point. Rejected: every new page requires editing two files, sitemap
   URLs are brittle across environments (one file can't carry both prod and preview origins), and per-locale `hreflang` markup is tedious to
   maintain by hand.
2. **Walk the generated `routeTree` to build the sitemap.** Rejected: `routeTree.gen.ts` is `@ts-nocheck` and its runtime shape isn't part
   of the router's public contract — coupling to it is fragile. An explicit `SITEMAP_PATHS` list is one extra line per page and makes
   "what's indexable?" obvious.
3. **Read the request `Host` header for the absolute origin.** Rejected per the project decision: the env var is the single source of truth
   and survives prerender, tests, and proxy variation.
4. **Force an explicit `/de` prefix for the default locale.** Rejected: would require either adding `/de` as a router alias or breaking
   existing routing. The chosen scheme — bare path for `de`, `/en` prefix for English — matches how `src/routes/{-$locale}.tsx` already
   redirects.
5. **Use a separate `scripts:` array on the `head()` return for JSON-LD.** Rejected: TanStack Router has a native `script:ld+json` meta key
   that handles HTML escaping at the framework layer. Funnelling JSON-LD through `meta:` keeps the helper's output a single, ordered array
   that the head renderer treats uniformly.

## Consequences

- One mandatory env var (`WEB_PAGE_URL`) — see `docs/infrastructure.md`.
- One optional env var (`BUILD_TIME`) — emitted as `<lastmod>` so crawlers see a fresh sitemap date on every deploy. Falls back to the
  container boot time when unset.
- Adding a new public page is two lines: a `head:` block in the route file and an entry in `src/web/seo/sitemapRoutes.ts`.
- Localized pages get `hreflang` alternates and an `x-default` automatically — no per-page bookkeeping.
- Logged-in / transactional pages set `noindex: true` on `seoMeta()` and are omitted from `SITEMAP_PATHS`. The chat route is the canonical
  example.
- Every indexable page automatically emits `MedicalBusiness` JSON-LD; pages can opt into `BreadcrumbList` and `FAQPage` by passing
  `breadcrumb` / `faq` to `seoMeta()`.
- The helper is pure and isomorphic; client-side navigation updates the head correctly via TanStack Router's standard mechanism.

## Canonical URL strategy

Per-locale canonicals follow the routing setup:

| Locale         | Path on the site     | Canonical                                                                          |
| -------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `de` (default) | `/`, `/impressum`    | `https://podologie-dudenhofen.de`, `https://podologie-dudenhofen.de/impressum`     |
| `en`           | `/en`, `/en/imprint` | `https://podologie-dudenhofen.de/en`, `https://podologie-dudenhofen.de/en/imprint` |

For each page `seoMeta()` emits one `<link rel="canonical">` and one `<link rel="alternate" hreflang="…">` per configured locale plus
`hreflang="x-default"` pointing at the default-locale URL.

## Structured data (JSON-LD)

Every indexable page emits one or more JSON-LD blocks via the framework's `script:ld+json` meta entry, which TanStack Router renders as
`<script type="application/ld+json">` in the head with HTML escaping handled at the framework layer.

| Schema            | Where                                                 | Purpose                                                                                                                                     |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `MedicalBusiness` | Every indexable page (built from `practiceJsonLd()`)  | Powers Google's local pack, knowledge panel, and sitelinks. Schema.org has no `Podiatrist` type; `medicalSpecialty: "Podiatric"` narrows it |
| `BreadcrumbList`  | Every non-home page (`breadcrumb` input on `seoMeta`) | Improves SERP appearance and helps Google build sitelinks                                                                                   |
| `FAQPage`         | Home and `/leistungen` (`faq` input on `seoMeta`)     | Occasional rich result on long-tail informational queries — keep answers short and plain-text                                               |

`noindex` pages emit no JSON-LD — there is no point describing an entity on a URL that won't enter the index.

The site-wide `MedicalBusiness` is built once per page from `PRACTICE` (`src/web/practice.ts`) plus the configured `GEO_COORDINATES` and
locale. Updating `PRACTICE.address` / `PRACTICE.hours` / `PRACTICE.phone` automatically flows into the structured data.

## Sitemap `<lastmod>`

The sitemap emits `<lastmod>` per URL, sourced from `EnvironmentVariables.buildTime` and truncated to `YYYY-MM-DD`. Set `BUILD_TIME` in CI
or the Docker build (`ENV BUILD_TIME=$BUILD_TIME` in the Dockerfile, populated from a build arg). Without it the value falls back to the
container boot time, which is fine for local dev but means `lastmod` will tick forward whenever the dev server restarts.

`changefreq` and `priority` remain on entries but are advisory — most engines ignore them. Keep them as documentation for humans.

## English-locale sitemap policy

Transactional and locale-specific pages (`/karriere`, `/impressum`, `/datenschutz`) ship with `locales: ['de']` in `SITEMAP_PATHS` so only
the German variant appears in the sitemap. The English variant is still reachable, still gets correct `<head>` tags via `seoMeta()`, and
still appears as an `hreflang` alternate on the German URL — but it doesn't waste crawl budget on a page no one searches for in English.

## How to add SEO to a new page

1. Pick a `title` (≤ 60 chars before the ` — Podologie Dudenhofen` suffix) and a `description` (50–160 chars). Localize both via the
   standard `{ de: '…', en: '…' }[locale]` pattern. Pack the title with the actual query the page should win — a brand-only title (e.g.
   `Start`) leaks keyword real estate.
2. In your route file, import `seoMeta`, `webPageUrlGet`, and `localeFromParam`, then add a `head:` callback to the route options:

   ```tsx
   import { seoMeta } from '../../web/seo/seoMeta';
   import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
   import { localeFromParam } from '../../web/utils/locale';

   export const Route = createFileRoute('/{-$locale}/about')({
     head: ({ params }) => {
       const locale = localeFromParam(params);
       return seoMeta({
         title: { de: 'Über uns', en: 'About us' }[locale],
         description: {
           de: 'Wer wir sind und was wir tun.',
           en: 'Who we are and what we do.',
         }[locale],
         path: '/about',
         locale,
         webPageUrl: webPageUrlGet(),
         breadcrumb: [
           { name: { de: 'Start', en: 'Home' }[locale], path: '/' },
           { name: { de: 'Über uns', en: 'About us' }[locale], path: '/about' },
         ],
       });
     },
     component: AboutPage,
   });
   ```

3. If the page has a literal Q&A surface, pass an `faq:` array — each item `{ question, answer }`. Keep answers short and plain-text.
4. If the page is logged-in, transactional, or otherwise non-indexable, pass `noindex: true` to `seoMeta()` and skip step 5. JSON-LD is
   automatically suppressed.
5. Add an entry to `SITEMAP_PATHS` in `src/web/seo/sitemapRoutes.ts`:

   ```ts
   { path: '/about', changefreq: 'monthly', priority: 0.5 },
   ```

   For locale-restricted pages (transactional / German-only), add `locales: ['de']`.

6. Run `npm run check` and `npm test`. Visit `/sitemap.xml` locally to confirm the new path is present and has both locale variants.

### Homepage title — the `noBrandSuffix` exception

The homepage's title already contains the practice name, so `seoMeta()` accepts a `noBrandSuffix: true` flag that skips the
` — ${SITE_NAME}` suffix. Use this only on the home route — every other page benefits from the brand suffix.

### Parameterized routes (`/foo/$id`)

Don't add parameterized paths to `SITEMAP_PATHS` — the sitemap can't enumerate their values at build time. If those pages should be indexed,
generate a per-row sitemap from the database in a separate route (e.g. `src/routes/sitemap-posts[.]xml.ts`) and reference it from
`robots.txt`. Until that exists, parameterized pages still get correct `<head>` tags via their own `head:` callback; they just don't appear
in the sitemap.

## Open Graph image

The default share image is `/podologie-dudenhofen-logo.png`. Its dimensions live in `DEFAULT_SHARE_IMAGE_DIMENSIONS` in `seoConstants.ts`
and are emitted as `og:image:width` / `og:image:height` so Facebook, WhatsApp, and LinkedIn can compose link previews without a pre-fetch
round trip. Update the constants in lockstep when you swap the image — a wrong size is worse than no size at all.

When a page ships its own share asset, pass `image`, `imageWidth`, `imageHeight`, and `imageAlt` together. `imageAlt` defaults to the
locale-aware `DEFAULT_SHARE_IMAGE_ALT` for the default image, and the page title for an override.

## Geo signals

`seoMeta()` emits a small set of geo meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) on every page. They are fixed
constants — the practice is at one address — sourced from `GEO_COORDINATES` and `REGION_CODE` in `seoConstants.ts`. These are marginal for
Google but still parsed by some German directory crawlers. Keep them in sync with `PRACTICE.address` if the practice ever moves.

## Implementation notes

- `seoMeta()` takes `webPageUrl` as an argument (rather than reading a global). This keeps it pure and trivially testable. The route layer
  plumbs the value via `webPageUrlGet()`, an isomorphic helper that returns `EnvironmentVariables.webPageUrl` server-side and
  `window.location.origin` client-side. The client fallback only matters during client-side navigation; SSR (the version crawlers see)
  always uses the configured value.
- The OG locale tag uses BCP-47–style underscored codes (`de_DE`, `en_US`) which is what Facebook and most consumers accept. Update
  `OG_LOCALE` in `src/web/seo/seoConstants.ts` whenever a locale is added.
- The dynamic sitemap lives at `/sitemap.xml` and the robots file at `/robots.txt` — both are real route handlers
  (`src/routes/sitemap[.]xml.ts` and `src/routes/robots[.]txt.ts`) and the corresponding files in `public/` were removed so there's no
  precedence conflict.
- `Cache-Control: public, max-age=3600` on both endpoints — long enough to amortize cost, short enough that a deploy propagates new pages
  within an hour.
- `robots.txt` opts in major AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`) to the public surface — they're a real discovery channel
  for ChatGPT search, Perplexity, and Claude Web. They still respect the same `/api/`, `/server/`, `/chat` exclusions.
