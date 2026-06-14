// JSON-LD builders. Emit schema.org structured data so Google, Bing and
// social previews can pick up the practice as a `MedicalBusiness`, render
// breadcrumbs, and expand the home/services FAQs as a rich result.
//
// The functions here return plain `object`s that the SEO layer stringifies
// into `<script type="application/ld+json">` blocks. Keep them pure — they
// receive everything they need (origin, locale, content) as arguments.

import { PRACTICE } from '../practice';
import type { Locale } from '../utils/locale';
import { DEFAULT_LOCALE } from '../utils/locale';
import { GEO_COORDINATES } from './seoConstants';

// `@id` for the practice. Stable across pages so multiple emissions
// reference one canonical entity rather than competing siblings — the
// homepage version wins on weight, secondary pages reinforce it.
const PRACTICE_ID_FRAGMENT = '#practice';

interface PracticeJsonLdInput {
    webPageUrl: string;
    locale: Locale;
}

// Site-wide `MedicalBusiness`. Schema.org has no first-class `Podiatrist`
// type — `MedicalBusiness` plus `medicalSpecialty: "Podiatric"` is the
// recommended fit. `hasOfferCatalog` lists the practice's services as
// `MedicalProcedure`s so they surface in service-specific local results.
export function practiceJsonLd(input: PracticeJsonLdInput): object {
    const homeCanonical = canonicalForHome(input.webPageUrl, input.locale);
    const localeBcp47 = input.locale === 'de' ? 'de-DE' : 'en-US';
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        '@id': `${input.webPageUrl}${PRACTICE_ID_FRAGMENT}`,
        name: PRACTICE.name,
        legalName: `${PRACTICE.person} — ${PRACTICE.name}`,
        url: homeCanonical,
        logo: `${input.webPageUrl}/podologie-dudenhofen-logo.png`,
        image: `${input.webPageUrl}/podologie-dudenhofen-praxis.jpg`,
        telephone: PRACTICE.phone,
        email: PRACTICE.email,
        priceRange: '€',
        currenciesAccepted: 'EUR',
        inLanguage: localeBcp47,
        description: practiceDescription(input.locale),
        address: {
            '@type': 'PostalAddress',
            streetAddress: PRACTICE.address.street,
            postalCode: PRACTICE.address.postcode,
            addressLocality: PRACTICE.address.city,
            addressRegion: 'RP',
            addressCountry: 'DE',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: GEO_COORDINATES.latitude,
            longitude: GEO_COORDINATES.longitude,
        },
        // Schema.org wants 24h `HH:MM`. We collapse weekdays into a single
        // `OpeningHoursSpecification` because they share the same window.
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '08:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Friday',
                opens: '08:00',
                closes: '14:00',
            },
        ],
        areaServed: ['Dudenhofen', 'Speyer', 'Schifferstadt', 'Römerberg'].map((city) => ({
            '@type': 'City',
            name: city,
            containedInPlace: {
                '@type': 'AdministrativeArea',
                name: 'Rheinland-Pfalz',
            },
        })),
        medicalSpecialty: 'Podiatric',
        founder: {
            '@type': 'Person',
            name: PRACTICE.person,
            jobTitle: input.locale === 'de' ? 'Podologin · Heilpraktikerin für Podologie' : 'Podiatrist · Heilpraktiker for podiatry',
        },
        employee: {
            '@type': 'Person',
            name: PRACTICE.person,
        },
        hasMap: PRACTICE.maps.google,
        sameAs: [PRACTICE.maps.google],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: input.locale === 'de' ? 'Leistungen' : 'Services',
            itemListElement: practiceServices(input.locale).map((service) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'MedicalProcedure',
                    name: service.name,
                    description: service.description,
                },
            })),
        },
    };
}

function practiceDescription(locale: Locale): string {
    return locale === 'de'
        ? 'Podologische Praxis in Dudenhofen bei Speyer mit Kassenzulassung — medizinische Fußpflege, Nagelkorrektur-Spangen, Behandlung des diabetischen Fußsyndroms, Hornhaut, Hühneraugen, Nagelpilz und Hausbesuche. Heilpraktikerin für Podologie.'
        : 'Podiatry practice in Dudenhofen near Speyer, accredited with statutory health insurance — medical foot care, nail-correction braces, diabetic foot syndrome treatment, calluses, corns, nail fungus and home visits. Heilpraktiker for podiatry.';
}

function practiceServices(locale: Locale): ReadonlyArray<{ name: string; description: string }> {
    if (locale === 'de') {
        return [
            { name: 'Medizinische Fußpflege', description: 'Hornhaut, Nagelpflege, Druckstellen — sorgfältig behandelt.' },
            {
                name: 'Diabetisches Fußsyndrom',
                description: 'Behandlung mit Kassenabrechnung nach ärztlicher Verordnung.',
            },
            { name: 'Nagelkorrektur-Spangen', description: 'Bei eingewachsenen oder verformten Nägeln.' },
            { name: 'Nagelprothetik', description: 'Künstlicher Nagelaufbau bei beschädigten Nägeln.' },
            { name: 'Pilzbehandlung', description: 'Behandlung von Nagel- und Hautmykosen am Fuß.' },
            { name: 'Hühneraugen entfernen', description: 'Schmerzhafte Hornhautkegel werden gezielt ausgelöst.' },
            { name: 'Warzenbehandlung', description: 'Geduldige Behandlung von Dornwarzen am Fuß.' },
            { name: 'Hausbesuch', description: 'Podologische Behandlung bei Ihnen zu Hause auf Wunsch.' },
        ];
    }
    return [
        { name: 'Medical foot care', description: 'Calluses, nail care, pressure points — treated with care.' },
        {
            name: 'Diabetic foot syndrome',
            description: 'Treatment billed via statutory insurance with a prescription.',
        },
        { name: 'Nail-correction braces', description: 'For ingrown or deformed nails.' },
        { name: 'Nail prosthetics', description: 'Artificial nail reconstruction for damaged nails.' },
        { name: 'Fungal treatment', description: 'Treatment of nail and skin mycoses on the foot.' },
        { name: 'Corn removal', description: 'Painful corns are carefully removed.' },
        { name: 'Wart treatment', description: 'Patient treatment of plantar warts on the foot.' },
        { name: 'Home visit', description: 'Podiatry treatment at your home on request.' },
    ];
}

export interface BreadcrumbItem {
    // Display label for this breadcrumb step.
    name: string;
    // Path WITHOUT a locale prefix (e.g. `/leistungen`); the helper builds
    // the absolute URL with the per-locale prefix.
    path: string;
}

// `BreadcrumbList` for non-home pages. The first item should always be the
// home page; the last item should be the current page. Build from each
// route's `head:` callback so the labels stay localized.
export function breadcrumbJsonLd(input: { items: ReadonlyArray<BreadcrumbItem>; webPageUrl: string; locale: Locale }): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: input.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: canonicalForPath(input.webPageUrl, input.locale, item.path),
        })),
    };
}

export interface FaqItem {
    question: string;
    answer: string;
}

// `FAQPage` — used on the home page and `/leistungen`. Google occasionally
// shows these as inline rich results on long-tail informational queries
// (e.g. "brauche ich eine podologische behandlung"). The answers should be
// short, plain text — Google strips HTML in most contexts.
export function faqJsonLd(input: { items: ReadonlyArray<FaqItem> }): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: input.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

function canonicalForHome(webPageUrl: string, locale: Locale): string {
    return locale === DEFAULT_LOCALE ? webPageUrl : `${webPageUrl}/${locale}`;
}

function canonicalForPath(webPageUrl: string, locale: Locale, path: string): string {
    const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
    const suffix = path === '/' ? '' : path;
    return `${webPageUrl}${prefix}${suffix}` || webPageUrl;
}
