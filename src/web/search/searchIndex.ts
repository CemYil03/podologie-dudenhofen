import type { ContentLeaf } from '../content/contentLeaf';
import {
    LEISTUNGEN_BRING_LIST_KASSE,
    LEISTUNGEN_BRING_LIST_PRIVAT,
    LEISTUNGEN_CHECKLIST,
    LEISTUNGEN_SERVICE_GROUPS,
} from '../content/leistungenContent';
import { KARRIERE_OFFERINGS, KARRIERE_REQUIREMENTS, KARRIERE_STEPS, KARRIERE_VALUE_CARDS } from '../content/karriereContent';
import { INDEX_CREDENTIALS, INDEX_SERVICES, INDEX_SUGGESTED_QUESTIONS } from '../content/indexContent';
import { PRAXIS_HYGIENE_PILLARS, PRAXIS_REPROCESSING_STEPS } from '../content/praxisContent';
import type { Locale } from '../utils/locale';

export type SearchEntryPath = '/' | '/praxis' | '/leistungen' | '/kontakt' | '/qualifikation' | '/karriere' | '/datenschutz' | '/impressum';

export type SearchEntry = {
    path: SearchEntryPath;
    sectionId: string | null;
    title: { de: string; en: string };
    description: { de: string; en: string };
    keywords?: { de: ReadonlyArray<string>; en: ReadonlyArray<string> };
};

export const SEARCH_PAGE_LABELS: Record<SearchEntryPath, { de: string; en: string }> = {
    '/': { de: 'Start', en: 'Home' },
    '/praxis': { de: 'Praxis', en: 'Practice' },
    '/leistungen': { de: 'Leistungen', en: 'Services' },
    '/kontakt': { de: 'Kontakt', en: 'Contact' },
    '/qualifikation': { de: 'Qualifikation', en: 'Credentials' },
    '/karriere': { de: 'Karriere', en: 'Careers' },
    '/datenschutz': { de: 'Datenschutz', en: 'Privacy policy' },
    '/impressum': { de: 'Impressum', en: 'Imprint' },
};

// Curated section-level entries — written for editorial value (the section
// title in the dialog may differ from the on-page heading). Leaf-level entries
// are auto-derived from the page-content modules below.
const SEARCH_INDEX_SECTIONS: ReadonlyArray<SearchEntry> = [
    // ─── Home ────────────────────────────────────────────────────────────
    {
        path: '/',
        sectionId: 'hero',
        title: {
            de: 'Podologische Praxis in Dudenhofen',
            en: 'Podiatry practice in Dudenhofen',
        },
        description: {
            de: 'Eine kleine, ruhige Praxis für Podologie — mit Kassenzulassung. Termine nach Vereinbarung.',
            en: 'A small, calm podiatry practice covered by statutory health insurance. By appointment.',
        },
        keywords: {
            de: ['start', 'startseite', 'home', 'praxis', 'podologie', 'dudenhofen'],
            en: ['home', 'start', 'practice', 'podiatry', 'dudenhofen'],
        },
    },
    {
        path: '/',
        sectionId: 'leistungen-uebersicht',
        title: { de: 'Leistungen — Übersicht', en: 'Services — overview' },
        description: {
            de: 'Medizinische Fußpflege, Diabetisches Fußsyndrom und Nagelkorrektur-Spangen.',
            en: 'Medical foot-care, diabetic foot syndrome and nail-correction braces.',
        },
        keywords: {
            de: ['leistungen', 'übersicht', 'fußpflege', 'hornhaut', 'nagelpflege', 'druckstellen'],
            en: ['services', 'overview', 'foot-care', 'callus', 'nail care', 'pressure points'],
        },
    },
    {
        path: '/',
        sectionId: 'fragen',
        title: { de: 'Fragen an den Assistenten', en: 'Ask the assistant' },
        description: {
            de: 'Brauche ich überhaupt eine podologische Behandlung? Häufige Fragen zu Verordnung, erstem Termin und Krankenkasse.',
            en: 'Do I really need a podiatrist? Common questions about prescriptions, first appointment and insurance.',
        },
        keywords: {
            de: ['chat', 'assistent', 'fragen', 'verordnung', 'krankenkasse', 'erste behandlung'],
            en: ['chat', 'assistant', 'questions', 'prescription', 'insurance', 'first appointment'],
        },
    },
    {
        path: '/',
        sectionId: 'oeffnungszeiten',
        title: { de: 'Öffnungszeiten und Adresse', en: 'Opening hours and address' },
        description: {
            de: 'Mo–Do 08:00–18:00, Fr 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
            en: 'Mon–Thu 08:00–18:00, Fri 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
        },
        keywords: {
            de: ['öffnungszeiten', 'adresse', 'anfahrt', 'speyerer', 'sprechzeiten', 'wann offen'],
            en: ['opening hours', 'address', 'directions', 'speyerer', 'when open'],
        },
    },
    {
        path: '/',
        sectionId: 'qualifikation',
        title: { de: 'Qualifikation auf einen Blick', en: 'Credentials at a glance' },
        description: {
            de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie. Hygiene nach RKI-Empfehlung.',
            en: 'State-accredited podiatrist and Heilpraktiker for podiatry. Hygiene to RKI standard.',
        },
        keywords: {
            de: ['qualifikation', 'staatlich', 'urkunde', 'heilpraktiker', 'rki'],
            en: ['credentials', 'state certificate', 'heilpraktiker', 'rki'],
        },
    },
    {
        path: '/',
        sectionId: 'termin',
        title: { de: 'Termin vereinbaren? Rufen Sie an.', en: 'Want an appointment? Give us a call.' },
        description: {
            de: 'Am besten während unserer Anrufzeiten Mo–Fr 08:00 – 16:00.',
            en: 'Best reached during our call hours, Mon–Fri 08:00 – 16:00.',
        },
        keywords: {
            de: ['termin', 'anrufen', 'kontaktaufnahme', 'anfrage'],
            en: ['appointment', 'call', 'request'],
        },
    },

    // ─── Praxis ──────────────────────────────────────────────────────────
    {
        path: '/praxis',
        sectionId: 'hero',
        title: { de: 'Praxis — Räume, Therapeutin, Hygiene', en: 'Practice — rooms, therapist, hygiene' },
        description: {
            de: 'Eine ruhige Praxis in Dudenhofen — immer nur eine Patientin oder ein Patient zur Zeit.',
            en: 'A calm practice in Dudenhofen — only one patient at a time.',
        },
        keywords: { de: ['praxis', 'übersicht'], en: ['practice', 'overview'] },
    },
    {
        path: '/praxis',
        sectionId: 'raeume',
        title: { de: 'Räume — barrierefrei und ruhig', en: 'Rooms — barrier-free and calm' },
        description: {
            de: 'Ebenerdig, barrierefrei, klimatisiert. Behandlung im Liegen oder Sitzen.',
            en: 'Ground-level, barrier-free, air-conditioned. Treatment lying down or seated.',
        },
        keywords: {
            de: ['räume', 'barrierefrei', 'rollstuhl', 'rollator', 'klimatisiert'],
            en: ['rooms', 'barrier-free', 'wheelchair', 'walker', 'air-conditioned'],
        },
    },
    {
        path: '/praxis',
        sectionId: 'therapeutin',
        title: { de: 'Therapeutin — Annette Yilmaz', en: 'Therapist — Annette Yilmaz' },
        description: {
            de: 'Podologin und sektorale Heilpraktikerin für Podologie, mit Kassenzulassung.',
            en: 'Podiatrist and sectoral Heilpraktiker for podiatry, accredited by statutory insurers.',
        },
        keywords: {
            de: ['annette yilmaz', 'podologin', 'heilpraktikerin', 'ausbildung'],
            en: ['annette yilmaz', 'podiatrist', 'heilpraktiker', 'training'],
        },
    },
    {
        path: '/praxis',
        sectionId: 'hygiene',
        title: { de: 'Hygiene und Instrumentenaufbereitung', en: 'Hygiene and instrument reprocessing' },
        description: {
            de: 'Thermodesinfektion, Sterilisation, Flächendesinfektion und Einmal-Materialien — nach RKI-Empfehlung.',
            en: 'Thermal disinfection, sterilisation, surface disinfection and single-use materials per RKI recommendations.',
        },
        keywords: {
            de: ['hygiene', 'aufbereitung', 'sterilisation', 'autoklav', 'thermodesinfektor', 'rki', 'desinfektion'],
            en: ['hygiene', 'reprocessing', 'sterilisation', 'autoclave', 'thermal disinfector', 'rki', 'disinfection'],
        },
    },

    // ─── Leistungen ──────────────────────────────────────────────────────
    {
        path: '/leistungen',
        sectionId: 'hero',
        title: { de: 'Leistungen — was wir behandeln', en: 'Services — what we treat' },
        description: {
            de: 'Was wir behandeln und wann ein Termin sinnvoll ist.',
            en: 'What we treat and when an appointment makes sense.',
        },
        keywords: { de: ['leistungen', 'behandlung'], en: ['services', 'treatment'] },
    },
    {
        path: '/leistungen',
        sectionId: 'brauche-ich-eine-behandlung',
        title: { de: 'Brauche ich eine podologische Behandlung?', en: 'Do I need a podiatry appointment?' },
        description: {
            de: 'Anzeichen, bei denen ein Termin sinnvoll ist — Schmerzen, eingewachsene Nägel, Druckstellen.',
            en: 'Signs that an appointment makes sense — pain, ingrown nails, pressure points.',
        },
        keywords: {
            de: ['brauche ich', 'wann zum podologen', 'eingewachsen', 'druckstellen', 'schmerzen'],
            en: ['do i need', 'when to see a podiatrist', 'ingrown', 'pressure points', 'pain'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'leistungen',
        title: { de: 'Leistungsangebot im Detail', en: 'Full service catalogue' },
        description: {
            de: 'Medizinische Fußpflege, Behandlung des Diabetischen Fußsyndroms und Nagelkorrektur-Spangen.',
            en: 'Medical foot-care, diabetic foot syndrome treatment and nail-correction braces.',
        },
        keywords: {
            de: ['fußpflege', 'diabetisches fußsyndrom', 'nagelspange', 'orthonyxie', 'hornhaut'],
            en: ['foot-care', 'diabetic foot syndrome', 'nail brace', 'orthonyxia', 'callus'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'was-bringe-ich-mit',
        title: { de: 'Was bringe ich zum ersten Termin mit?', en: 'What to bring to the first appointment' },
        description: {
            de: 'Verordnung, Versichertenkarte, eigene Schuhe — Checkliste für Kassen- und Privatpatientinnen.',
            en: 'Prescription, insurance card, your own shoes — checklist for statutory and private patients.',
        },
        keywords: {
            de: ['was mitbringen', 'erster termin', 'verordnung', 'versichertenkarte', 'checkliste'],
            en: ['what to bring', 'first appointment', 'prescription', 'insurance card', 'checklist'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'kosten',
        title: { de: 'Kosten und Krankenkasse', en: 'Costs and health insurance' },
        description: {
            de: 'Was Kassen- und Privatpatientinnen zahlen, wann eine Verordnung erforderlich ist.',
            en: 'What statutory and private patients pay, and when a prescription is required.',
        },
        keywords: {
            de: ['kosten', 'preis', 'krankenkasse', 'verordnung', 'kassenzulassung', 'privat'],
            en: ['costs', 'price', 'insurance', 'prescription', 'covered', 'private'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'termin',
        title: { de: 'Termin anfragen', en: 'Request an appointment' },
        description: {
            de: 'Schreiben Sie uns — wir melden uns zurück.',
            en: 'Send us a message — we will get back to you.',
        },
        keywords: { de: ['termin'], en: ['appointment'] },
    },

    // ─── Kontakt ─────────────────────────────────────────────────────────
    {
        path: '/kontakt',
        sectionId: 'hero',
        title: { de: 'Kontakt', en: 'Contact' },
        description: { de: 'So erreichen Sie uns.', en: 'How to reach us.' },
        keywords: { de: ['kontakt', 'erreichen'], en: ['contact', 'reach'] },
    },
    {
        path: '/kontakt',
        sectionId: 'kontaktdaten',
        title: { de: 'Kontaktdaten', en: 'Contact details' },
        description: {
            de: 'Telefon, Adresse und Öffnungszeiten auf einen Blick.',
            en: 'Phone, address and opening hours at a glance.',
        },
        keywords: {
            de: ['telefon', 'adresse', 'öffnungszeiten', 'sprechzeiten'],
            en: ['phone', 'address', 'opening hours'],
        },
    },
    {
        path: '/kontakt',
        sectionId: 'anfahrt',
        title: { de: 'Anfahrt', en: 'How to find us' },
        description: {
            de: 'Mitten in Dudenhofen, gut zu erreichen — Karte, Bushaltestelle und Parkmöglichkeiten.',
            en: 'Right in Dudenhofen — map, bus stops and parking.',
        },
        keywords: {
            de: ['anfahrt', 'parken', 'bus', 'karte', 'maps', 'route'],
            en: ['directions', 'parking', 'bus', 'map', 'maps', 'route'],
        },
    },
    {
        path: '/kontakt',
        sectionId: 'anfrage',
        title: { de: 'Terminanfrage', en: 'Appointment request' },
        description: {
            de: 'Termine vereinbaren wir am Telefon — Anrufzeiten Mo–Fr 08:00 – 16:00.',
            en: 'Appointments are arranged by phone — call hours Mon–Fri 08:00 – 16:00.',
        },
        keywords: {
            de: ['terminanfrage', 'anrufen', 'telefon', 'anfrage'],
            en: ['appointment request', 'call', 'phone', 'enquiry'],
        },
    },

    // ─── Qualifikation ───────────────────────────────────────────────────
    {
        path: '/qualifikation',
        sectionId: 'hero',
        title: { de: 'Qualifikation', en: 'Credentials' },
        description: {
            de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie.',
            en: 'State-accredited podiatrist and Heilpraktiker for podiatry.',
        },
        keywords: { de: ['qualifikation'], en: ['credentials'] },
    },
    {
        path: '/qualifikation',
        sectionId: 'podologie',
        title: { de: 'Was ist Podologie?', en: 'What is podiatry?' },
        description: {
            de: 'Podologie ist die nicht-ärztliche Heilkunde am Fuß — staatlich geregelt nach dem Podologengesetz.',
            en: 'Podiatry is the non-medical foot-care discipline — state-regulated under the Podologengesetz.',
        },
        keywords: {
            de: ['podologie', 'definition', 'podologengesetz', 'staatlich'],
            en: ['podiatry', 'definition', 'podologengesetz', 'state'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'heilpraktiker',
        title: { de: 'Heilpraktikerin für Podologie', en: 'Heilpraktiker for podiatry' },
        description: {
            de: 'Sektorale Heilpraktiker-Erlaubnis für Podologie, anerkannt in Rheinland-Pfalz.',
            en: 'Sectoral Heilpraktiker permit for podiatry, recognised in Rhineland-Palatinate.',
        },
        keywords: {
            de: ['heilpraktiker', 'sektoral', 'rheinland-pfalz', 'erlaubnis', 'überweisung', 'privatversicherung', 'rechnung'],
            en: ['heilpraktiker', 'sectoral', 'rhineland-palatinate', 'permit', 'referral', 'private insurance', 'invoice'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'urkunden',
        title: { de: 'Urkunden und Bescheinigungen', en: 'Certificates and documents' },
        description: {
            de: 'Staatsexamen, Heilpraktiker-Erlaubnis und Fortbildungen — mit Brief und Siegel.',
            en: 'State exam, Heilpraktiker permit and continuing education — with seals and signatures.',
        },
        keywords: {
            de: ['urkunde', 'staatsexamen', 'bescheinigung', 'fortbildung'],
            en: ['certificate', 'state exam', 'document', 'continuing education'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'termin',
        title: { de: 'Lernen Sie die Praxis kennen', en: 'Get to know the practice' },
        description: {
            de: 'Termin vereinbaren — wir freuen uns auf Sie.',
            en: 'Make an appointment — we look forward to meeting you.',
        },
        keywords: { de: ['termin'], en: ['appointment'] },
    },

    // ─── Karriere ────────────────────────────────────────────────────────
    {
        path: '/karriere',
        sectionId: 'hero',
        title: { de: 'Karriere', en: 'Careers' },
        description: {
            de: 'Mitarbeiten in einer kleinen Praxis mit großem Anspruch.',
            en: 'Work in a small practice with high standards.',
        },
        keywords: {
            de: ['karriere', 'jobs', 'stelle', 'mitarbeiten', 'arbeiten'],
            en: ['careers', 'jobs', 'position', 'work'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'was-uns-ausmacht',
        title: { de: 'Was uns ausmacht', en: 'What sets us apart' },
        description: {
            de: 'Wofür wir stehen — und wofür wir nicht stehen.',
            en: 'What we stand for — and what we do not.',
        },
        keywords: { de: ['werte', 'arbeitsweise'], en: ['values', 'culture'] },
    },
    {
        path: '/karriere',
        sectionId: 'wen-wir-suchen',
        title: { de: 'Wen wir suchen', en: 'Who we are looking for' },
        description: {
            de: 'Zwei Wege in unsere Praxis — als ausgebildete Podologin oder als Auszubildende.',
            en: 'Two ways into the practice — as a qualified podiatrist or as a trainee.',
        },
        keywords: {
            de: ['stellenausschreibung', 'ausbildung', 'podologin', 'azubi'],
            en: ['job posting', 'training', 'podiatrist', 'apprentice'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'was-wir-bieten',
        title: { de: 'Was wir bieten', en: 'What we offer' },
        description: {
            de: 'Konditionen und Rahmen — Vergütung, Fortbildung, Arbeitszeiten.',
            en: 'Terms and conditions — pay, training, working hours.',
        },
        keywords: {
            de: ['vergütung', 'gehalt', 'fortbildung', 'arbeitszeit'],
            en: ['compensation', 'salary', 'training', 'working hours'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'bewerbung',
        title: { de: 'Bewerbung', en: 'How to apply' },
        description: {
            de: 'In drei Schritten zum Probetag — kurze Nachricht reicht.',
            en: 'Three steps to a trial day — a short message is enough.',
        },
        keywords: {
            de: ['bewerbung', 'bewerben', 'probetag'],
            en: ['apply', 'application', 'trial day'],
        },
    },

    // ─── Datenschutz ─────────────────────────────────────────────────────
    {
        path: '/datenschutz',
        sectionId: 'hero',
        title: { de: 'Datenschutzerklärung', en: 'Privacy policy' },
        description: {
            de: 'Welche Daten wir verarbeiten und auf welcher Rechtsgrundlage.',
            en: 'Which data we process and on what legal basis.',
        },
        keywords: { de: ['datenschutz', 'dsgvo'], en: ['privacy', 'gdpr'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-1-verantwortlicher',
        title: { de: '1. Verantwortlicher', en: '1. Controller' },
        description: {
            de: 'Verantwortliche im Sinne der DSGVO — Name, Adresse und Kontakt.',
            en: 'Controller within the meaning of the GDPR — name, address and contact.',
        },
        keywords: { de: ['verantwortlicher'], en: ['controller'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-2-allgemeines',
        title: { de: '2. Allgemeines zur Datenverarbeitung', en: '2. General principles' },
        description: {
            de: 'Rechtsgrundlagen, Zwecke und Speicherdauer der Verarbeitung.',
            en: 'Legal bases, purposes and storage duration of processing.',
        },
        keywords: { de: ['rechtsgrundlage', 'zwecke'], en: ['legal basis', 'purpose'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-3-server-logs',
        title: { de: '3. Server-Logs', en: '3. Server logs' },
        description: {
            de: 'Welche Daten beim Aufruf der Webseite anfallen — IP-Adresse, Zeitpunkt, Browser.',
            en: 'Which data is collected when you visit the site — IP address, time, browser.',
        },
        keywords: { de: ['server', 'logs', 'ip'], en: ['server', 'logs', 'ip'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-4-cookies',
        title: { de: '4. Cookies', en: '4. Cookies' },
        description: {
            de: 'Welche Cookies wir setzen, wofür sie genutzt werden und wie Sie sie verwalten.',
            en: 'Which cookies we set, what they are used for and how to manage them.',
        },
        keywords: { de: ['cookies'], en: ['cookies'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-5-kontakt',
        title: { de: '5. Kontaktaufnahme per Telefon und E-Mail', en: '5. Contact by phone and email' },
        description: {
            de: 'Wie wir mit Ihren Anfragen umgehen und wie lange wir sie speichern.',
            en: 'How we handle your enquiries and how long we keep them.',
        },
        keywords: { de: ['kontakt', 'anfrage', 'e-mail', 'telefon'], en: ['contact', 'enquiry', 'email', 'phone'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-6-google-maps',
        title: { de: '6. Eingebettete Karte (Google Maps)', en: '6. Embedded map (Google Maps)' },
        description: {
            de: 'Wie die eingebettete Google-Maps-Karte technisch funktioniert.',
            en: 'How the embedded Google Maps card works technically.',
        },
        keywords: { de: ['google maps', 'karte'], en: ['google maps', 'map'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-7-ai-chat',
        title: { de: '7. AI-Assistent (Chat)', en: '7. AI assistant (chat)' },
        description: {
            de: 'Welche Daten der Chat-Assistent verarbeitet und an wen sie weitergegeben werden.',
            en: 'Which data the chat assistant processes and to whom it is passed.',
        },
        keywords: { de: ['ki', 'ai', 'chat', 'assistent'], en: ['ai', 'chat', 'assistant'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-8-externe-verweise',
        title: { de: '8. Externe Verweise', en: '8. External links' },
        description: {
            de: 'Telefon-, Mailto- und Apple-Maps-Links und ihre Datenschutzfolgen.',
            en: 'Phone, mailto and Apple Maps links and their privacy implications.',
        },
        keywords: { de: ['links', 'extern'], en: ['links', 'external'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-9-empfaenger',
        title: { de: '9. Empfänger und Auftragsverarbeiter', en: '9. Recipients and processors' },
        description: {
            de: 'Wer außer uns auf welcher Grundlage Zugriff auf Daten hat.',
            en: 'Who else has access to data and on what basis.',
        },
        keywords: { de: ['empfänger', 'auftragsverarbeiter'], en: ['recipients', 'processors'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-10-rechte',
        title: { de: '10. Ihre Rechte', en: '10. Your rights' },
        description: {
            de: 'Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch.',
            en: 'Access, rectification, erasure, restriction, portability and objection.',
        },
        keywords: {
            de: ['auskunft', 'löschung', 'widerspruch', 'rechte'],
            en: ['access', 'erasure', 'objection', 'rights'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-11-beschwerderecht',
        title: { de: '11. Beschwerderecht', en: '11. Right to lodge a complaint' },
        description: {
            de: 'Beschwerde bei der zuständigen Aufsichtsbehörde — Landesbeauftragte für den Datenschutz Rheinland-Pfalz.',
            en: 'Complaint to the supervisory authority — Rhineland-Palatinate data protection commissioner.',
        },
        keywords: { de: ['beschwerde', 'aufsichtsbehörde'], en: ['complaint', 'supervisory authority'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-12-keine-automatisierung',
        title: { de: '12. Keine automatisierte Entscheidungsfindung', en: '12. No automated decision-making' },
        description: {
            de: 'Keine automatisierten Entscheidungen oder Profiling.',
            en: 'No automated decisions or profiling.',
        },
        keywords: { de: ['profiling', 'automatisiert'], en: ['profiling', 'automated'] },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-13-aktualisierungen',
        title: { de: '13. Aktualisierungen dieser Erklärung', en: '13. Updates to this statement' },
        description: {
            de: 'Wann wir die Datenschutzerklärung aktualisieren.',
            en: 'When we update the privacy statement.',
        },
        keywords: { de: ['aktualisierung', 'stand'], en: ['updates', 'last updated'] },
    },

    // ─── Impressum ───────────────────────────────────────────────────────
    {
        path: '/impressum',
        sectionId: 'hero',
        title: { de: 'Impressum', en: 'Imprint' },
        description: {
            de: 'Anbieterkennzeichnung gemäß § 5 TMG und § 18 MStV.',
            en: 'Provider identification under § 5 TMG and § 18 MStV.',
        },
        keywords: { de: ['impressum'], en: ['imprint'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-tmg',
        title: { de: 'Angaben gemäß § 5 TMG', en: 'Information under § 5 TMG' },
        description: {
            de: 'Name, Anschrift und Sitz der Praxis.',
            en: 'Name, address and seat of the practice.',
        },
        keywords: { de: ['tmg', 'anbieter'], en: ['tmg', 'provider'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-steuer',
        title: { de: 'Steuerliche Angaben', en: 'Tax details' },
        description: {
            de: 'Steuernummer und Institutionskennzeichen.',
            en: 'Tax number and institution code (IK).',
        },
        keywords: { de: ['steuernummer', 'ik'], en: ['tax number', 'institution code'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-kontakt',
        title: { de: 'Kontakt', en: 'Contact' },
        description: {
            de: 'Telefon und E-Mail für rechtliche Anfragen.',
            en: 'Phone and email for legal enquiries.',
        },
        keywords: { de: ['kontakt'], en: ['contact'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-berufsbezeichnung',
        title: { de: 'Berufsbezeichnung und berufsrechtliche Regelungen', en: 'Professional title and regulatory framework' },
        description: {
            de: 'Podologin und Heilpraktikerin — verliehene Titel und maßgebliche Regelungen.',
            en: 'Podiatrist and Heilpraktiker — conferred titles and relevant regulations.',
        },
        keywords: { de: ['berufsbezeichnung', 'titel'], en: ['professional title', 'regulation'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-aufsicht',
        title: { de: 'Zuständige Aufsichtsbehörde', en: 'Supervisory authority' },
        description: {
            de: 'Welches Gesundheitsamt für die Praxis zuständig ist.',
            en: 'Which health authority is responsible for the practice.',
        },
        keywords: { de: ['gesundheitsamt', 'aufsicht'], en: ['health authority', 'supervisory'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftpflicht',
        title: { de: 'Berufshaftpflichtversicherung', en: 'Professional liability insurance' },
        description: {
            de: 'Versicherer und räumlicher Geltungsbereich der Berufshaftpflicht.',
            en: 'Insurer and geographic scope of professional liability cover.',
        },
        keywords: { de: ['haftpflicht', 'versicherung'], en: ['liability', 'insurance'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-streit',
        title: { de: 'Streitschlichtung', en: 'Online dispute resolution' },
        description: {
            de: 'Hinweis zur Online-Streitbeilegung der EU.',
            en: 'Notice about EU online dispute resolution.',
        },
        keywords: { de: ['streit', 'schlichtung', 'os-plattform'], en: ['dispute', 'resolution', 'os platform'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftung-inhalte',
        title: { de: 'Haftung für Inhalte', en: 'Liability for content' },
        description: {
            de: 'Haftungsregelung nach § 7 TMG.',
            en: 'Liability rules under § 7 TMG.',
        },
        keywords: { de: ['haftung', 'inhalte'], en: ['liability', 'content'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftung-links',
        title: { de: 'Haftung für Links', en: 'Liability for links' },
        description: {
            de: 'Haftung für externe Links.',
            en: 'Liability for external links.',
        },
        keywords: { de: ['haftung', 'links'], en: ['liability', 'links'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-urheberrecht',
        title: { de: 'Urheberrecht', en: 'Copyright' },
        description: {
            de: 'Urheberrechtshinweise zu Inhalten dieser Webseite.',
            en: 'Copyright notices for content on this site.',
        },
        keywords: { de: ['urheberrecht'], en: ['copyright'] },
    },
    {
        path: '/impressum',
        sectionId: 'block-bildnachweise',
        title: { de: 'Bildnachweise', en: 'Image credits' },
        description: {
            de: 'Quellen und Lizenzen der verwendeten Bilder.',
            en: 'Sources and licences of images used.',
        },
        keywords: { de: ['bildnachweise', 'fotos'], en: ['image credits', 'photos'] },
    },
];

function leafToEntry(path: SearchEntryPath, leaf: ContentLeaf): SearchEntry {
    return {
        path,
        sectionId: leaf.id,
        title: leaf.heading,
        description: leaf.body,
        keywords: leaf.keywords,
    };
}

function searchIndexBuild(): ReadonlyArray<SearchEntry> {
    const leafEntries: SearchEntry[] = [];

    // Order matters: when two entries score identically (e.g. "Hühnerauge"
    // matches an exact keyword on both a checklist card and a treatment card),
    // cmdk breaks the tie by registration order. Push the actionable service
    // cards first so they win those ties.
    for (const group of LEISTUNGEN_SERVICE_GROUPS) for (const leaf of group.items) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_CHECKLIST) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_BRING_LIST_KASSE) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_BRING_LIST_PRIVAT) leafEntries.push(leafToEntry('/leistungen', leaf));

    for (const leaf of KARRIERE_VALUE_CARDS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_REQUIREMENTS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_OFFERINGS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_STEPS) leafEntries.push(leafToEntry('/karriere', leaf));

    for (const leaf of INDEX_SERVICES) leafEntries.push(leafToEntry('/', leaf));
    for (const leaf of INDEX_SUGGESTED_QUESTIONS) leafEntries.push(leafToEntry('/', leaf));
    for (const leaf of INDEX_CREDENTIALS) leafEntries.push(leafToEntry('/', leaf));

    for (const leaf of PRAXIS_HYGIENE_PILLARS) leafEntries.push(leafToEntry('/praxis', leaf));
    for (const leaf of PRAXIS_REPROCESSING_STEPS) leafEntries.push(leafToEntry('/praxis', leaf));

    // Curated entries take precedence over auto-derived leaves so that an
    // editorial title is never silently overwritten by a colliding leaf id.
    const seen = new Set<string>();
    const all: SearchEntry[] = [];
    for (const entry of [...SEARCH_INDEX_SECTIONS, ...leafEntries]) {
        const key = `${entry.path}#${entry.sectionId ?? ''}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(entry);
    }
    return all;
}

export const SEARCH_INDEX: ReadonlyArray<SearchEntry> = searchIndexBuild();

export function searchEntryHaystack(entry: SearchEntry, locale: Locale): string {
    const parts = [entry.title[locale], entry.description[locale], ...(entry.keywords?.[locale] ?? [])];
    return parts.join(' ').toLowerCase();
}
