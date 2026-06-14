import type { JSX } from 'react';
import { DEFAULT_LOCALE, LOCALES } from '../utils/locale';
import type { Locale } from '../utils/locale';
import {
    DEFAULT_SHARE_IMAGE,
    DEFAULT_SHARE_IMAGE_ALT,
    DEFAULT_SHARE_IMAGE_DIMENSIONS,
    GEO_COORDINATES,
    OG_LOCALE,
    REGION_CODE,
    SITE_NAME,
} from './seoConstants';
import type { BreadcrumbItem, FaqItem } from './structuredData';
import { breadcrumbJsonLd, faqJsonLd, practiceJsonLd } from './structuredData';

export interface SeoInput {
    // The page-specific title — `seoMeta` appends ` — ${SITE_NAME}` for the
    // browser tab title and Open Graph card. Aim for ≤ 60 characters before
    // the suffix is added.
    title: string;
    // Plain-text description used for the meta description, OG, and Twitter
    // card. Aim for 50–160 characters.
    description: string;
    // Canonical path WITHOUT any locale prefix and starting with `/` (e.g.
    // `/`, `/terms`). The locale prefix is added per-locale internally.
    path: string;
    // The locale this page is currently rendering in.
    locale: Locale;
    // Absolute origin (no trailing slash). Comes from
    // `EnvironmentVariables.webPageUrl` plumbed through the root route's
    // context — pass it in rather than reading it as a global to keep the
    // helper pure and isomorphic.
    webPageUrl: string;
    // Optional override for the Open Graph / Twitter share image. May be a
    // root-relative path (turned into an absolute URL) or an absolute URL.
    image?: string;
    // Pixel dimensions of `image` (or the default share image if omitted).
    // Default values describe `DEFAULT_SHARE_IMAGE`; pass these whenever you
    // override `image`.
    imageWidth?: number;
    imageHeight?: number;
    // `og:image:alt` — used by screen readers for social previews and by
    // Twitter when the image cannot load.
    imageAlt?: string;
    // Open Graph object type. Defaults to `'website'`.
    type?: 'website' | 'article';
    // When true, emits `<meta name="robots" content="noindex,nofollow">`.
    // Use for auth-gated, transactional, or otherwise non-indexable pages.
    noindex?: boolean;
    // When true, emits `title` and `og:title` without the ` — ${SITE_NAME}`
    // suffix. Use on pages whose own title already names the site (the
    // homepage) so social cards don't read "Podologie & Fußpflege in
    // Dudenhofen — Podologie Dudenhofen".
    noBrandSuffix?: boolean;
    // `BreadcrumbList` JSON-LD. The first item should be the home page; the
    // last should be the current page. Skipped on the home route — there is
    // nothing to break down.
    breadcrumb?: ReadonlyArray<BreadcrumbItem>;
    // `FAQPage` JSON-LD. Use for pages with a literal Q&A surface (the
    // homepage's suggested questions, the services page's "do I need a
    // podiatrist?" checklist).
    faq?: ReadonlyArray<FaqItem>;
}

// TanStack Router's `head()` accepts a `meta` array of mixed entries. A
// regular `{name, content}` / `{property, content}` pair becomes a
// `<meta>` tag; a `{title}` entry becomes the `<title>`; an entry with a
// `script:ld+json` key is rendered as `<script type="application/ld+json">`
// with the value JSON-stringified and HTML-escaped by the framework
// itself (see `@tanstack/react-router` headContentUtils). We funnel JSON-LD
// through `script:ld+json` rather than the separate `scripts:` array so a
// single `meta:` payload covers everything in head.
//
// React Router's runtime accepts `{title}` and `{script:ld+json}` entries
// but its public type narrows the array to React's `<meta>` intrinsic. We
// match that public type at the boundary so route files can spread the
// result without per-call casts; the two non-meta variants are coerced
// through `unknown` where they're produced — narrow, documented, and the
// runtime-vs-type mismatch lives in one place.
type RouterMetaTag = JSX.IntrinsicElements['meta'];
type RouterLinkTag = JSX.IntrinsicElements['link'];

export interface SeoOutput {
    meta: Array<RouterMetaTag | undefined>;
    links: Array<RouterLinkTag | undefined>;
}

export function seoMeta(input: SeoInput): SeoOutput {
    const fullTitle = input.noBrandSuffix ? input.title : `${input.title} — ${SITE_NAME}`;
    const canonical = canonicalUrlBuild(input.webPageUrl, input.locale, input.path);
    const imageUrl = imageUrlAbsolute(input.webPageUrl, input.image ?? DEFAULT_SHARE_IMAGE);
    const imageWidth = input.imageWidth ?? (input.image ? undefined : DEFAULT_SHARE_IMAGE_DIMENSIONS.width);
    const imageHeight = input.imageHeight ?? (input.image ? undefined : DEFAULT_SHARE_IMAGE_DIMENSIONS.height);
    const imageAlt = input.imageAlt ?? (input.image ? input.title : DEFAULT_SHARE_IMAGE_ALT[input.locale]);
    const ogType = input.type ?? 'website';

    const meta: Array<RouterMetaTag | undefined> = [
        // The framework runtime treats `{title: '…'}` as a `<title>` tag —
        // the public `<meta>` type doesn't allow `title`, but the
        // headContentUtils branch on `m.title` accepts it.
        asRouterMeta({ title: fullTitle }),
        { name: 'description', content: input.description },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: input.description },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: ogType },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: OG_LOCALE[input.locale] },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:secure_url', content: imageUrl },
        { property: 'og:image:alt', content: imageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: input.description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: imageAlt },
        // Geo signals — small but free for local search and German
        // directory crawlers (Gelbe Seiten and friends still parse them).
        { name: 'geo.region', content: REGION_CODE },
        { name: 'geo.placename', content: 'Dudenhofen' },
        { name: 'geo.position', content: `${GEO_COORDINATES.latitude};${GEO_COORDINATES.longitude}` },
        { name: 'ICBM', content: `${GEO_COORDINATES.latitude}, ${GEO_COORDINATES.longitude}` },
    ];

    if (imageWidth !== undefined) {
        meta.push({ property: 'og:image:width', content: String(imageWidth) });
    }
    if (imageHeight !== undefined) {
        meta.push({ property: 'og:image:height', content: String(imageHeight) });
    }

    for (const otherLocale of LOCALES) {
        if (otherLocale === input.locale) continue;
        meta.push({
            property: 'og:locale:alternate',
            content: OG_LOCALE[otherLocale],
        });
    }

    if (input.noindex) {
        meta.push({ name: 'robots', content: 'noindex,nofollow' });
    }

    // JSON-LD: one site-wide `MedicalBusiness` per indexable page (so every
    // URL independently declares the practice entity), plus optional
    // `BreadcrumbList` and `FAQPage` per the page's own structure. `noindex`
    // pages stay quiet — there is no point describing an entity on a URL
    // that won't enter the index.
    if (!input.noindex) {
        meta.push(jsonLdMeta(practiceJsonLd({ webPageUrl: input.webPageUrl, locale: input.locale })));
        if (input.breadcrumb && input.breadcrumb.length > 0) {
            meta.push(jsonLdMeta(breadcrumbJsonLd({ items: input.breadcrumb, webPageUrl: input.webPageUrl, locale: input.locale })));
        }
        if (input.faq && input.faq.length > 0) {
            meta.push(jsonLdMeta(faqJsonLd({ items: input.faq })));
        }
    }

    const links: Array<RouterLinkTag | undefined> = [{ rel: 'canonical', href: canonical }];
    for (const otherLocale of LOCALES) {
        links.push({
            rel: 'alternate',
            hrefLang: otherLocale,
            href: canonicalUrlBuild(input.webPageUrl, otherLocale, input.path),
        });
    }
    links.push({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: canonicalUrlBuild(input.webPageUrl, DEFAULT_LOCALE, input.path),
    });

    return { meta, links };
}

// Coerce a non-`<meta>`-shaped entry into the framework's typed slot. The
// runtime branches on the actual key, so a `{title}` or `{script:ld+json}`
// entry is rendered correctly even though the public type only describes
// the regular meta-tag shape.
function asRouterMeta(value: object): RouterMetaTag {
    return value as unknown as RouterMetaTag;
}

function jsonLdMeta(data: object): RouterMetaTag {
    return asRouterMeta({ 'script:ld+json': data });
}

function canonicalUrlBuild(webPageUrl: string, locale: Locale, path: string): string {
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    // path === '/' must collapse to no trailing slash on the prefix-only URL
    // (e.g. `https://example.com/en` not `https://example.com/en/`).
    const suffix = path === '/' ? '' : path;
    return `${webPageUrl}${prefix}${suffix}` || webPageUrl;
}

function imageUrlAbsolute(webPageUrl: string, image: string): string {
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `${webPageUrl}${image.startsWith('/') ? '' : '/'}${image}`;
}
