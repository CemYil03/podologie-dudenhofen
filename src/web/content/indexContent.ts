import { ActivityIcon, AwardIcon, BadgeCheckIcon, ShieldCheckIcon, StethoscopeIcon } from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const INDEX_SERVICES: ReadonlyArray<ContentLeaf> = [
    {
        id: 'service-fusspflege',
        icon: StethoscopeIcon,
        heading: { de: 'Medizinische Fußpflege', en: 'Medical foot-care' },
        body: { de: 'Hornhaut, Nagelpflege, Druckstellen.', en: 'Calluses, nail care, pressure points.' },
        keywords: {
            de: ['fußpflege', 'medizinische fußpflege', 'hornhaut', 'nagelpflege'],
            en: ['foot-care', 'medical foot care', 'callus', 'nail care'],
        },
    },
    {
        id: 'service-dfs',
        icon: ShieldCheckIcon,
        heading: { de: 'Diabetisches Fußsyndrom', en: 'Diabetic foot syndrome' },
        body: {
            de: 'Behandlung mit Kassenabrechnung nach Verordnung.',
            en: 'Treatment billed via statutory insurance with a prescription.',
        },
        keywords: {
            de: ['dfs', 'diabetes', 'diabetisches fußsyndrom'],
            en: ['dfs', 'diabetes', 'diabetic foot syndrome'],
        },
    },
    {
        id: 'service-spangen',
        icon: ActivityIcon,
        heading: { de: 'Nagelkorrektur-Spangen', en: 'Nail-correction braces' },
        body: { de: 'Bei eingewachsenen oder verformten Nägeln.', en: 'For ingrown or deformed nails.' },
        keywords: {
            de: ['spange', 'spangen', 'nagelkorrektur', 'orthonyxie', 'eingewachsen'],
            en: ['brace', 'braces', 'nail correction', 'orthonyxia', 'ingrown'],
        },
    },
];

export const INDEX_SUGGESTED_QUESTIONS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'frage-verordnung',
        heading: { de: 'Brauche ich eine Verordnung?', en: 'Do I need a prescription?' },
        body: {
            de: 'Wann eine ärztliche Verordnung notwendig ist und wann nicht.',
            en: 'When a medical prescription is required and when it is not.',
        },
        keywords: { de: ['verordnung', 'rezept'], en: ['prescription', 'referral'] },
    },
    {
        id: 'frage-mitbringen',
        heading: { de: 'Was bringe ich zum ersten Termin mit?', en: 'What should I bring to the first appointment?' },
        body: {
            de: 'Versichertenkarte, Verordnung, Medikamentenliste — die Checkliste fürs Erstgespräch.',
            en: 'Insurance card, prescription, medication list — the checklist for your first visit.',
        },
        keywords: { de: ['mitbringen', 'erster termin', 'checkliste'], en: ['bring', 'first appointment', 'checklist'] },
    },
    {
        id: 'frage-kasse',
        heading: { de: 'Übernimmt meine Krankenkasse das?', en: 'Will my health insurance cover this?' },
        body: {
            de: 'Wann gesetzliche Krankenkassen die Kosten übernehmen.',
            en: 'When statutory health insurance covers the costs.',
        },
        keywords: { de: ['krankenkasse', 'kassenleistung', 'übernahme'], en: ['insurance', 'coverage', 'covered'] },
    },
    {
        id: 'frage-eigenanteil',
        heading: { de: 'Was zahle ich als Kassenpatient*in?', en: 'What will I pay as a statutory patient?' },
        body: {
            de: 'Eigenanteil, Rezeptgebühr und Zuzahlungsbefreiung — was Kassenpatientinnen selbst tragen.',
            en: 'Co-payment, prescription fee and exemption — what statutory patients pay themselves.',
        },
        keywords: { de: ['eigenanteil', 'zuzahlung', 'kosten'], en: ['co-payment', 'cost', 'fee'] },
    },
];

export const INDEX_CREDENTIALS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'cred-staatlich',
        icon: AwardIcon,
        heading: { de: 'Staatliche Urkunde Podologie', en: 'State certificate in podiatry' },
        body: {
            de: 'Abgeschlossen mit Staatsexamen nach dreijähriger Ausbildung.',
            en: 'Completed with the state examination after a three-year programme.',
        },
        keywords: { de: ['staatlich', 'urkunde', 'staatsexamen', 'podologie'], en: ['state', 'certificate', 'state exam', 'podiatry'] },
    },
    {
        id: 'cred-heilpraktiker',
        icon: BadgeCheckIcon,
        heading: { de: 'Heilpraktikerin für Podologie (RLP)', en: 'Heilpraktiker for podiatry (RLP)' },
        body: {
            de: 'Sektorale Heilpraktiker-Erlaubnis, anerkannt in Rheinland-Pfalz.',
            en: 'Sectoral Heilpraktiker permit, recognised in Rhineland-Palatinate.',
        },
        keywords: {
            de: ['heilpraktiker', 'heilpraktikerin', 'rlp', 'rheinland-pfalz'],
            en: ['heilpraktiker', 'rlp', 'rhineland-palatinate'],
        },
    },
    {
        id: 'cred-rki',
        icon: ShieldCheckIcon,
        heading: { de: 'Hygiene nach RKI-Empfehlung', en: 'Hygiene per RKI recommendations' },
        body: {
            de: 'Aufbereitung von Instrumenten und Flächen nach Robert-Koch-Institut.',
            en: 'Reprocessing of instruments and surfaces per the Robert Koch Institute.',
        },
        keywords: { de: ['hygiene', 'rki', 'robert koch'], en: ['hygiene', 'rki', 'robert koch'] },
    },
];

/**
 * Visitor-experience testimonials. The cards on the home page render these
 * verbatim — the link below them sends visitors to the live Google reviews.
 *
 * Non-negotiable rule — see docs/features/testimonials.md:
 *
 * Quotes describe the *visit experience* only (atmosphere, time taken,
 * explanation, friendliness). They MUST NOT describe medical outcomes
 * (pain relief, healing, cure) — HWG §11 restricts patient testimonials
 * in healthcare advertising and outcome claims are the part it bites on.
 */
export type IndexTestimonial = {
    id: string;
    quote: LocaleString;
    attribution: LocaleString;
};

export const INDEX_TESTIMONIALS: ReadonlyArray<IndexTestimonial> = [
    {
        id: 'testimonial-1',
        quote: {
            de: 'Sehr ruhige Atmosphäre. Es wurde mir alles in Ruhe erklärt, und die Praxis ist auch für ältere Menschen gut zu erreichen.',
            en: 'A very calm atmosphere. Everything was explained to me without rush, and the practice is easy to reach for older people too.',
        },
        attribution: { de: 'Patientenstimme', en: 'Patient comment' },
    },
    {
        id: 'testimonial-2',
        quote: {
            de: 'Frau Yilmaz nimmt sich Zeit und arbeitet sehr sorgfältig. Termine waren immer pünktlich.',
            en: 'Ms Yilmaz takes time and works very carefully. Appointments were always on schedule.',
        },
        attribution: { de: 'Patientenstimme', en: 'Patient comment' },
    },
    {
        id: 'testimonial-3',
        quote: {
            de: 'Freundlicher Empfang, saubere Räume, persönliche Betreuung. Genau das, was man sich von einer kleinen Praxis wünscht.',
            en: 'Warm welcome, clean rooms, personal care. Exactly what you would hope for from a small practice.',
        },
        attribution: { de: 'Patientenstimme', en: 'Patient comment' },
    },
];
