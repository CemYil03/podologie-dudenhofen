import { PackageIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const PRAXIS_HYGIENE_PILLARS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'hygiene-aufbereitung',
        icon: ShieldCheckIcon,
        heading: { de: 'Aufbereitung der Instrumente', en: 'Instrument reprocessing' },
        body: {
            de: 'Thermische Desinfektion und anschließende Sterilisation nach den Empfehlungen des Robert Koch-Instituts. Jedes Instrument verlässt die Aufbereitung verpackt und gekennzeichnet.',
            en: 'Thermal disinfection followed by sterilisation in line with the Robert Koch Institute recommendations. Every instrument leaves reprocessing sealed and labelled.',
        },
        keywords: {
            de: ['aufbereitung', 'instrumente', 'sterilisation', 'desinfektion', 'rki'],
            en: ['reprocessing', 'instruments', 'sterilisation', 'disinfection', 'rki'],
        },
    },
    {
        id: 'hygiene-flaechendesinfektion',
        icon: SparklesIcon,
        heading: { de: 'Flächendesinfektion', en: 'Surface disinfection' },
        body: {
            de: 'Behandlungseinheit, Liege und Kontaktflächen werden zwischen jeder Behandlung mit VAH-gelisteten Mitteln desinfiziert — mit ausreichender Einwirkzeit.',
            en: 'The treatment unit, couch and contact surfaces are disinfected between every patient with VAH-listed agents — with the proper contact time.',
        },
        keywords: {
            de: ['flächendesinfektion', 'desinfektion', 'vah'],
            en: ['surface disinfection', 'disinfection', 'vah'],
        },
    },
    {
        id: 'hygiene-einmalmaterial',
        icon: PackageIcon,
        heading: { de: 'Einmal-Materialien', en: 'Single-use materials' },
        body: {
            de: 'Schleifkörper, Skalpellklingen, Tupfer und Handschuhe sind Einmal-Material und werden nach jeder Behandlung verworfen — überall dort, wo es medizinisch sinnvoll ist.',
            en: 'Burrs, scalpel blades, swabs and gloves are single-use and discarded after every treatment — wherever this is medically appropriate.',
        },
        keywords: {
            de: ['einmal', 'einmalmaterial', 'einwegmaterial', 'skalpell', 'tupfer'],
            en: ['single-use', 'disposable', 'scalpel', 'swab'],
        },
    },
];

export type ReprocessingStep = ContentLeaf & {
    image: { src: string; alt: LocaleString };
};

export const PRAXIS_REPROCESSING_STEPS: ReadonlyArray<ReprocessingStep> = [
    {
        id: 'aufbereitung-thermodesinfektor',
        heading: { de: 'Thermodesinfektor', en: 'Thermal disinfector' },
        body: {
            de: 'Reinigung und thermische Desinfektion der Instrumente. Jeder Vorgang wird automatisch dokumentiert.',
            en: 'Instruments are cleaned and thermally disinfected. Every cycle is automatically logged.',
        },
        keywords: {
            de: ['thermodesinfektor', 'thermische desinfektion'],
            en: ['thermal disinfector', 'thermal disinfection'],
        },
        image: {
            src: '/instrumentenaufbereitung/thermodesinfektor.jpg',
            alt: {
                de: 'Thermodesinfektor zur Reinigung und Desinfektion der Instrumente.',
                en: 'Thermal disinfector for cleaning and disinfecting instruments.',
            },
        },
    },
    {
        id: 'aufbereitung-folienschweissgeraet',
        heading: { de: 'Folienschweißgerät', en: 'Pouch sealer' },
        body: {
            de: 'Die getrockneten Instrumente werden in Sterilisationsfolie verpackt und eingeschweißt.',
            en: 'Once dried, the instruments are packed into sterilisation pouches and sealed.',
        },
        keywords: {
            de: ['folienschweißgerät', 'sterilisationsfolie', 'verpackung'],
            en: ['pouch sealer', 'sterilisation pouch'],
        },
        image: {
            src: '/instrumentenaufbereitung/folienschweissgeraet.jpg',
            alt: {
                de: 'Folienschweißgerät zum Verpacken der Instrumente in Sterilisationsfolie.',
                en: 'Pouch sealer used to package instruments in sterilisation film.',
            },
        },
    },
    {
        id: 'aufbereitung-autoklav',
        heading: { de: 'Autoklav', en: 'Autoclave' },
        body: {
            de: 'Die verpackten Instrumente werden sterilisiert und mit Datum und Chargennummer beschriftet.',
            en: 'The sealed instruments are sterilised and labelled with date and batch number.',
        },
        keywords: {
            de: ['autoklav', 'sterilisation', 'chargennummer'],
            en: ['autoclave', 'sterilisation', 'batch number'],
        },
        image: {
            src: '/instrumentenaufbereitung/autoclave.jpg',
            alt: {
                de: 'Autoklav zur Sterilisation der verpackten Instrumente.',
                en: 'Autoclave used to sterilise the sealed instruments.',
            },
        },
    },
];
