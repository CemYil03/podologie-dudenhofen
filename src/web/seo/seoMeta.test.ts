import { describe, it, expect } from 'vitest';

import { seoMeta } from './seoMeta';
import { SITE_NAME } from './seoConstants';

const baseInput = {
    title: 'Welcome',
    description: 'A friendly hello.',
    webPageUrl: 'https://example.com',
} as const;

// `seoMeta()` returns the framework's narrow `<meta>` array shape — the
// runtime accepts `{title}` and `{script:ld+json}` entries as well, but the
// type does not. Cast through `unknown` at the assertion sites here so the
// tests can inspect both shapes without polluting the public type.
type AnyMeta = Record<string, unknown> | undefined;
type AnyLink = Record<string, unknown> | undefined;
const asMeta = (value: unknown): AnyMeta => value as AnyMeta;
const asLink = (value: unknown): AnyLink => value as AnyLink;

describe('seoMeta', () => {
    it('appends the site name to the title', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de' });

        // Assert
        const titleEntry = output.meta.map(asMeta).find((entry) => entry && 'title' in entry);
        expect(titleEntry?.title).toBe('Welcome — ' + SITE_NAME);
    });

    it('omits the brand suffix when noBrandSuffix is set', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de', noBrandSuffix: true });

        // Assert
        const titleEntry = output.meta.map(asMeta).find((entry) => entry && 'title' in entry);
        const ogTitle = output.meta.map(asMeta).find((entry) => entry && entry.property === 'og:title');
        expect(titleEntry?.title).toBe('Welcome');
        expect(ogTitle).toMatchObject({ property: 'og:title', content: 'Welcome' });
    });

    it('emits a bare-path canonical for the default locale and a /en prefix for english', () => {
        // Arrange — nothing
        // Act
        const de = seoMeta({ ...baseInput, path: '/terms', locale: 'de' });
        const en = seoMeta({ ...baseInput, path: '/terms', locale: 'en' });

        // Assert
        expect(asLink(de.links.find((link) => asLink(link)?.rel === 'canonical'))?.href).toBe('https://example.com/terms');
        expect(asLink(en.links.find((link) => asLink(link)?.rel === 'canonical'))?.href).toBe('https://example.com/en/terms');
    });

    it('collapses the canonical for the home page to the bare origin', () => {
        // Arrange — nothing
        // Act
        const de = seoMeta({ ...baseInput, path: '/', locale: 'de' });
        const en = seoMeta({ ...baseInput, path: '/', locale: 'en' });

        // Assert
        expect(asLink(de.links.find((link) => asLink(link)?.rel === 'canonical'))?.href).toBe('https://example.com');
        expect(asLink(en.links.find((link) => asLink(link)?.rel === 'canonical'))?.href).toBe('https://example.com/en');
    });

    it('emits hreflang alternates for every locale plus x-default pointing at the default locale', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/terms', locale: 'en' });

        // Assert
        const alternates = output.links.map(asLink).filter((link) => link?.rel === 'alternate');
        expect(alternates).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ rel: 'alternate', hrefLang: 'de', href: 'https://example.com/terms' }),
                expect.objectContaining({ rel: 'alternate', hrefLang: 'en', href: 'https://example.com/en/terms' }),
                expect.objectContaining({ rel: 'alternate', hrefLang: 'ru', href: 'https://example.com/ru/terms' }),
                expect.objectContaining({ rel: 'alternate', hrefLang: 'ar', href: 'https://example.com/ar/terms' }),
                expect.objectContaining({ rel: 'alternate', hrefLang: 'x-default', href: 'https://example.com/terms' }),
            ]),
        );
    });

    it('omits robots tag by default and emits noindex,nofollow when requested', () => {
        // Arrange — nothing
        // Act
        const indexable = seoMeta({ ...baseInput, path: '/', locale: 'de' });
        const hidden = seoMeta({ ...baseInput, path: '/', locale: 'de', noindex: true });

        // Assert
        expect(indexable.meta.map(asMeta).some((entry) => entry?.name === 'robots')).toBe(false);
        expect(hidden.meta.map(asMeta)).toContainEqual(expect.objectContaining({ name: 'robots', content: 'noindex,nofollow' }));
    });

    it('emits absolute Open Graph and Twitter image URLs', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de' });

        // Assert
        const ogImage = output.meta.map(asMeta).find((entry) => entry?.property === 'og:image');
        const twitterImage = output.meta.map(asMeta).find((entry) => entry?.name === 'twitter:image');
        expect(ogImage).toMatchObject({ property: 'og:image', content: 'https://example.com/podologie-dudenhofen-logo.png' });
        expect(twitterImage).toMatchObject({ name: 'twitter:image', content: 'https://example.com/podologie-dudenhofen-logo.png' });
    });

    it('emits og:image:width and og:image:height for the default share image', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de' });

        // Assert — defaults match `DEFAULT_SHARE_IMAGE_DIMENSIONS`
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ property: 'og:image:width', content: '1200' }));
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ property: 'og:image:height', content: '630' }));
    });

    it('emits og:image:alt and twitter:image:alt with the localized default', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de' });

        // Assert
        expect(output.meta.map(asMeta)).toContainEqual(
            expect.objectContaining({ property: 'og:image:alt', content: 'Podologie Dudenhofen — Praxis von Annette Yilmaz' }),
        );
        expect(output.meta.map(asMeta)).toContainEqual(
            expect.objectContaining({ name: 'twitter:image:alt', content: 'Podologie Dudenhofen — Praxis von Annette Yilmaz' }),
        );
    });

    it('passes through an absolute image URL unchanged and skips default dimensions', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({
            ...baseInput,
            path: '/',
            locale: 'de',
            image: 'https://cdn.example.com/share.png',
        });

        // Assert
        const ogImage = output.meta.map(asMeta).find((entry) => entry?.property === 'og:image');
        expect(ogImage).toMatchObject({ property: 'og:image', content: 'https://cdn.example.com/share.png' });
        expect(output.meta.map(asMeta).some((entry) => entry?.property === 'og:image:width')).toBe(false);
    });

    it('emits explicit dimensions and alt when an override image is given with them', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({
            ...baseInput,
            path: '/',
            locale: 'de',
            image: 'https://cdn.example.com/share.png',
            imageWidth: 800,
            imageHeight: 418,
            imageAlt: 'A custom card.',
        });

        // Assert
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ property: 'og:image:width', content: '800' }));
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ property: 'og:image:height', content: '418' }));
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ property: 'og:image:alt', content: 'A custom card.' }));
    });

    it('uses og:url that matches the canonical link', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/terms', locale: 'en' });

        // Assert
        const ogUrl = asMeta(output.meta.map(asMeta).find((entry) => entry?.property === 'og:url'));
        const canonical = asLink(output.links.find((link) => asLink(link)?.rel === 'canonical'));
        expect(ogUrl?.content).toBe(canonical?.href);
    });

    it('emits the geo meta tags with the configured coordinates', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de' });

        // Assert
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ name: 'geo.region', content: 'DE-RP' }));
        expect(output.meta.map(asMeta)).toContainEqual(expect.objectContaining({ name: 'geo.placename', content: 'Dudenhofen' }));
        expect(output.meta.map(asMeta).some((entry) => entry?.name === 'geo.position')).toBe(true);
        expect(output.meta.map(asMeta).some((entry) => entry?.name === 'ICBM')).toBe(true);
    });

    it('emits MedicalBusiness JSON-LD on every indexable page', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/leistungen', locale: 'de' });

        // Assert
        const ldEntries = output.meta
            .map(asMeta)
            .filter((entry): entry is AnyMeta & { 'script:ld+json': { '@type': string } } => Boolean(entry && 'script:ld+json' in entry));
        expect(ldEntries.length).toBeGreaterThanOrEqual(1);
        const business = ldEntries.find((entry) => entry['script:ld+json']['@type'] === 'MedicalBusiness');
        expect(business).toBeDefined();
    });

    it('omits all JSON-LD when noindex is true', () => {
        // Arrange — nothing
        // Act
        const output = seoMeta({ ...baseInput, path: '/chat', locale: 'de', noindex: true });

        // Assert
        const ldEntries = output.meta.map(asMeta).filter((entry) => entry && 'script:ld+json' in entry);
        expect(ldEntries).toHaveLength(0);
    });

    it('emits BreadcrumbList JSON-LD when breadcrumb items are provided', () => {
        // Arrange
        const breadcrumb = [
            { name: 'Start', path: '/' },
            { name: 'Leistungen', path: '/leistungen' },
        ];

        // Act
        const output = seoMeta({ ...baseInput, path: '/leistungen', locale: 'de', breadcrumb });

        // Assert
        const ldEntries = output.meta.map(asMeta).filter(
            (
                entry,
            ): entry is AnyMeta & {
                'script:ld+json': { '@type': string; itemListElement: ReadonlyArray<{ position: number; name: string; item: string }> };
            } => Boolean(entry && 'script:ld+json' in entry),
        );
        const crumbs = ldEntries.find((entry) => entry['script:ld+json']['@type'] === 'BreadcrumbList');
        expect(crumbs).toBeDefined();
        const items = crumbs!['script:ld+json'].itemListElement;
        expect(items[0]).toEqual({ '@type': 'ListItem', position: 1, name: 'Start', item: 'https://example.com' });
        expect(items[1]).toEqual({ '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://example.com/leistungen' });
    });

    it('emits FAQPage JSON-LD when faq items are provided', () => {
        // Arrange
        const faq = [{ question: 'Why?', answer: 'Because.' }];

        // Act
        const output = seoMeta({ ...baseInput, path: '/', locale: 'de', faq });

        // Assert
        const ldEntries = output.meta
            .map(asMeta)
            .filter((entry): entry is AnyMeta & { 'script:ld+json': { '@type': string } } => Boolean(entry && 'script:ld+json' in entry));
        const faqEntry = ldEntries.find((entry) => entry['script:ld+json']['@type'] === 'FAQPage');
        expect(faqEntry).toBeDefined();
    });
});
