import { ClockIcon, GraduationCapIcon, HandshakeIcon, ShieldCheckIcon } from 'lucide-react';
import { PRACTICE } from '../practice';
import type { ContentLeaf } from './contentLeaf';

export const KARRIERE_VALUE_CARDS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'value-zeit',
        icon: ClockIcon,
        heading: { de: 'Zeit pro Behandlung', en: 'Time per treatment' },
        body: {
            de: 'Keine 20-Minuten-Termine. Wir nehmen uns die Zeit, die der Fuß braucht.',
            en: 'No 20-minute slots. We take the time each foot actually needs.',
        },
        keywords: { de: ['zeit', 'behandlungsdauer'], en: ['time', 'treatment duration'] },
    },
    {
        id: 'value-hygiene',
        icon: ShieldCheckIcon,
        heading: { de: 'Hygiene auf Praxisniveau', en: 'Hygiene at practice level' },
        body: {
            de: 'Thermische Desinfektion und Sterilisation der Instrumente nach RKI-Empfehlung.',
            en: 'Thermal disinfection and sterilisation of instruments following RKI guidelines.',
        },
        keywords: { de: ['hygiene', 'rki', 'sterilisation'], en: ['hygiene', 'rki', 'sterilisation'] },
    },
    {
        id: 'value-fortbildung',
        icon: GraduationCapIcon,
        heading: { de: 'Fortbildungen', en: 'Continuing education' },
        body: {
            de: 'Wir unterstützen Weiterbildungen aktiv, fachlich und finanziell.',
            en: 'We actively support further training — both professionally and financially.',
        },
        keywords: { de: ['fortbildung', 'weiterbildung', 'schulung'], en: ['continuing education', 'training', 'courses'] },
    },
    {
        id: 'value-kollegial',
        icon: HandshakeIcon,
        heading: { de: 'Kollegiales Miteinander', en: 'Collegial atmosphere' },
        body: {
            de: 'Kleine Praxis, kurze Wege, ehrliche Absprachen.',
            en: 'Small practice, short paths, honest agreements.',
        },
        keywords: { de: ['kollegial', 'team', 'miteinander'], en: ['collegial', 'team', 'atmosphere'] },
    },
];

export const KARRIERE_REQUIREMENTS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'req-staatlich',
        heading: {
            de: 'Staatliche Anerkennung als Podologin / Podologe',
            en: 'State-recognised qualification as a podiatrist',
        },
        body: {
            de: 'Abgeschlossene Ausbildung mit Staatsexamen — die rechtliche Grundlage für Kassenabrechnung.',
            en: 'Completed training with the state examination — the legal basis for statutory billing.',
        },
        keywords: { de: ['staatlich', 'anerkennung', 'staatsexamen'], en: ['state', 'recognised', 'state exam'] },
    },
    {
        id: 'req-dfs',
        heading: {
            de: 'Sicheres Arbeiten beim diabetischen Fußsyndrom (DFS)',
            en: 'Confident treatment of patients with diabetic foot syndrome (DFS)',
        },
        body: {
            de: 'Sie kennen Befund, Risiken und Grenzen einer podologischen Behandlung bei Diabetes.',
            en: 'You know the findings, risks and limits of podiatric treatment in diabetes.',
        },
        keywords: { de: ['diabetes', 'dfs', 'diabetisches fußsyndrom'], en: ['diabetes', 'dfs', 'diabetic foot syndrome'] },
    },
    {
        id: 'req-spangen',
        heading: {
            de: 'Idealerweise Erfahrung mit Nagelkorrektur-Spangen',
            en: 'Ideally experience with nail-correction braces',
        },
        body: {
            de: 'Erfahrung mit Orthonyxie-Systemen ist ein Plus — wir bilden hier auch weiter.',
            en: 'Experience with orthonyxia systems is a plus — we also support further training here.',
        },
        keywords: { de: ['spange', 'spangen', 'orthonyxie'], en: ['brace', 'braces', 'orthonyxia'] },
    },
    {
        id: 'req-empathie',
        heading: {
            de: 'Empathischer Umgang mit älteren Patientinnen und Patienten',
            en: 'Empathetic manner with elderly patients',
        },
        body: {
            de: 'Ein Großteil unserer Stammkundschaft ist über 70 — Geduld und ein freundlicher Ton sind wichtig.',
            en: 'A large share of our regulars is over 70 — patience and a friendly tone matter.',
        },
        keywords: { de: ['empathie', 'umgang', 'patienten'], en: ['empathy', 'patient care'] },
    },
    {
        id: 'req-deutsch',
        heading: { de: 'Deutschkenntnisse auf Konversationsniveau', en: 'Conversational German' },
        body: {
            de: 'Die Behandlung läuft auf Deutsch — Anamnese, Beratung, Aufklärung.',
            en: 'Treatment runs in German — history, advice, explanations.',
        },
        keywords: { de: ['deutsch', 'sprache'], en: ['german', 'language'] },
    },
];

export const KARRIERE_OFFERINGS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'offer-anstellung',
        heading: { de: 'Anstellung', en: 'Employment' },
        body: { de: 'Voll- oder Teilzeit, nach Absprache.', en: 'Full-time or part-time, by arrangement.' },
        keywords: { de: ['anstellung', 'vollzeit', 'teilzeit'], en: ['employment', 'full-time', 'part-time'] },
    },
    {
        id: 'offer-verguetung',
        heading: { de: 'Vergütung', en: 'Compensation' },
        body: {
            de: 'Fair, leistungsgerecht, im Gespräch klärbar.',
            en: 'Fair, performance-based, settled in conversation.',
        },
        keywords: { de: ['vergütung', 'gehalt', 'lohn', 'bezahlung'], en: ['compensation', 'salary', 'pay'] },
    },
    {
        id: 'offer-fortbildungsbudget',
        heading: { de: 'Fortbildungsbudget', en: 'Training budget' },
        body: { de: 'Jährlich, schriftlich vereinbart.', en: 'Annual, agreed in writing.' },
        keywords: { de: ['fortbildung', 'budget', 'weiterbildung'], en: ['training', 'budget', 'continuing education'] },
    },
    {
        id: 'offer-ausstattung',
        heading: { de: 'Ausstattung', en: 'Equipment' },
        body: {
            de: 'Moderne Behandlungseinheiten, ergonomisches Arbeiten.',
            en: 'Modern treatment units, ergonomic working environment.',
        },
        keywords: { de: ['ausstattung', 'geräte', 'ergonomie'], en: ['equipment', 'units', 'ergonomic'] },
    },
    {
        id: 'offer-standort',
        heading: { de: 'Praxisstandort', en: 'Location' },
        body: { de: 'Dudenhofen bei Speyer, gute Anbindung.', en: 'Dudenhofen near Speyer, well connected.' },
        keywords: { de: ['standort', 'dudenhofen', 'speyer'], en: ['location', 'dudenhofen', 'speyer'] },
    },
    {
        id: 'offer-stammkundschaft',
        heading: { de: 'Stammkundschaft', en: 'Patient base' },
        body: {
            de: 'Gewachsene Stammkundschaft, Hausbesuche im Umkreis.',
            en: 'Established, many regulars, house calls in the surrounding area.',
        },
        keywords: { de: ['stammkundschaft', 'patienten', 'hausbesuche'], en: ['regulars', 'patients', 'house calls'] },
    },
];

export const KARRIERE_STEPS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'step-schreiben',
        heading: { de: 'Schreiben Sie uns', en: 'Get in touch' },
        body: {
            de: `Eine kurze Mail oder ein Anruf reicht. Adresse: ${PRACTICE.email}.`,
            en: `A short email or phone call is enough. Address: ${PRACTICE.email}.`,
        },
        keywords: { de: ['kontakt', 'mail', 'anruf', 'bewerbung'], en: ['contact', 'email', 'call', 'apply'] },
    },
    {
        id: 'step-kennenlernen',
        heading: { de: 'Kennenlernen', en: 'Meet in person' },
        body: {
            de: 'Wir vereinbaren ein lockeres Gespräch in der Praxis.',
            en: 'We arrange a relaxed conversation at the practice.',
        },
        keywords: { de: ['kennenlernen', 'gespräch'], en: ['meeting', 'conversation', 'meet'] },
    },
    {
        id: 'step-probetag',
        heading: { de: 'Probetag', en: 'Trial day' },
        body: {
            de: 'Ein bezahlter Probetag — bevor irgendjemand etwas unterschreibt.',
            en: 'A paid trial day — before anyone signs anything.',
        },
        keywords: { de: ['probetag', 'probearbeit', 'schnuppertag'], en: ['trial day', 'paid trial'] },
    },
];
