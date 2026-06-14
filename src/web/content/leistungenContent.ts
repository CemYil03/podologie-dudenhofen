import {
    ActivityIcon,
    AlertCircleIcon,
    BandageIcon,
    BugIcon,
    CompassIcon,
    FileTextIcon,
    FootprintsIcon,
    HandIcon,
    MessageCircleIcon,
    PillIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StethoscopeIcon,
    TargetIcon,
    WrenchIcon,
} from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const LEISTUNGEN_CHECKLIST: ReadonlyArray<ContentLeaf> = [
    {
        id: 'check-schmerzen',
        icon: AlertCircleIcon,
        heading: { de: 'Anhaltende Schmerzen am Fuß', en: 'Persistent foot pain' },
        body: {
            de: 'Beschwerden, die sich beim Gehen oder Stehen nicht von selbst beruhigen.',
            en: "Discomfort while walking or standing that doesn't settle on its own.",
        },
        keywords: {
            de: ['schmerz', 'schmerzen', 'fußschmerzen', 'beschwerden'],
            en: ['pain', 'foot pain', 'discomfort'],
        },
    },
    {
        id: 'check-diabetes',
        icon: ActivityIcon,
        heading: { de: 'Diabetes mit auffälligen Stellen', en: 'Diabetes with noticeable changes' },
        body: {
            de: 'Druckstellen, Risse oder Verfärbungen am Fuß, wenn Sie Diabetes haben.',
            en: 'Pressure points, fissures or discoloration if you have diabetes.',
        },
        keywords: {
            de: ['diabetes', 'diabetisch', 'dfs', 'diabetisches fußsyndrom', 'druckstelle', 'risse'],
            en: ['diabetes', 'diabetic', 'diabetic foot syndrome', 'pressure', 'fissure'],
        },
    },
    {
        id: 'check-eingewachsen',
        icon: ScissorsIcon,
        heading: { de: 'Eingewachsene oder verformte Nägel', en: 'Ingrown or deformed nails' },
        body: {
            de: 'Nägel, die in die Haut wachsen oder ihre Form verloren haben.',
            en: 'Nails that grow into the skin or have lost their shape.',
        },
        keywords: {
            de: ['eingewachsen', 'nagel', 'nägel', 'unguis incarnatus', 'verformt'],
            en: ['ingrown', 'nail', 'nails', 'deformed'],
        },
    },
    {
        id: 'check-huehneraugen',
        icon: SparklesIcon,
        heading: { de: 'Hornhaut, Hühneraugen, Schwielen', en: 'Calluses, corns, hardened skin' },
        body: {
            de: 'Verdickte Hautstellen, die drücken oder Schmerzen verursachen.',
            en: 'Thickened skin areas that press or cause pain.',
        },
        keywords: {
            de: ['hornhaut', 'hühnerauge', 'hühneraugen', 'clavus', 'schwiele', 'schwielen'],
            en: ['callus', 'calluses', 'corn', 'corns', 'clavus', 'hardened skin'],
        },
    },
    {
        id: 'check-pilzinfektionen',
        icon: BugIcon,
        heading: { de: 'Pilzinfektionen an Nagel oder Haut', en: 'Fungal nail or skin infections' },
        body: {
            de: 'Verfärbte, brüchige Nägel oder juckende Hautstellen am Fuß.',
            en: 'Discolored, brittle nails or itchy skin patches on the foot.',
        },
        keywords: {
            de: ['pilz', 'pilze', 'pilzinfektion', 'pilzinfektionen', 'mykose', 'mykosen', 'nagelpilz', 'fußpilz'],
            en: ['fungus', 'fungal', 'mycosis', 'nail fungus', "athlete's foot"],
        },
    },
    {
        id: 'check-verordnung',
        icon: FileTextIcon,
        heading: { de: 'Ärztliche Verordnung erhalten', en: 'You have a medical prescription' },
        body: {
            de: 'Sie sind unsicher, was eine Verordnung „podologische Behandlung" bedeutet.',
            en: "You're unsure what a prescription for 'podiatric treatment' means.",
        },
        keywords: {
            de: ['verordnung', 'rezept', 'arzt', 'überweisung'],
            en: ['prescription', 'referral', 'doctor'],
        },
    },
];

export type ServiceGroup = {
    id: string;
    heading: LocaleString;
    body: LocaleString;
    items: ReadonlyArray<ContentLeaf>;
};

export const LEISTUNGEN_SERVICE_GROUPS: ReadonlyArray<ServiceGroup> = [
    {
        id: 'group-untersuchung',
        heading: { de: 'Untersuchung & Beratung', en: 'Examination & advice' },
        body: {
            de: 'Wir schauen erst — und entscheiden dann gemeinsam, was sinnvoll ist.',
            en: 'We look first — and decide together what makes sense.',
        },
        items: [
            {
                id: 'service-untersuchung-fussuntersuchung',
                icon: StethoscopeIcon,
                heading: { de: 'Fußuntersuchung', en: 'Foot examination' },
                body: {
                    de: 'Befund von Haut, Nägeln und Druckstellen — als Grundlage für jede weitere Behandlung.',
                    en: 'Assessment of skin, nails and pressure points — the basis for every further treatment.',
                },
                keywords: {
                    de: ['fußuntersuchung', 'untersuchung', 'befund', 'inspektion'],
                    en: ['foot examination', 'examination', 'assessment'],
                },
            },
            {
                id: 'service-untersuchung-beratung',
                icon: MessageCircleIcon,
                heading: { de: 'Beratung bei Fußproblemen', en: 'Advice on foot problems' },
                body: {
                    de: 'Wir hören zu und ordnen ein — was selbst zu pflegen ist und wann eine ärztliche Abklärung sinnvoll ist.',
                    en: 'We listen and put things in context — what to care for yourself and when to see a doctor.',
                },
                keywords: {
                    de: ['beratung', 'fußprobleme', 'rat'],
                    en: ['advice', 'consultation', 'guidance'],
                },
            },
            {
                id: 'service-untersuchung-sensibilitaetstests',
                icon: HandIcon,
                heading: { de: 'Sensibilitätstests', en: 'Sensitivity tests' },
                body: {
                    de: 'Prüfung des Berührungs- und Druckempfindens — wichtig bei Diabetes oder Neuropathie.',
                    en: 'Testing of touch and pressure perception — important with diabetes or neuropathy.',
                },
                keywords: {
                    de: ['sensibilität', 'sensibilitätstest', 'sensibilitätstests', 'monofilament', 'neuropathie'],
                    en: ['sensitivity', 'sensitivity test', 'monofilament', 'neuropathy'],
                },
            },
            {
                id: 'service-untersuchung-ganganalyse',
                icon: CompassIcon,
                heading: { de: 'Ganganalysen', en: 'Gait analysis' },
                body: {
                    de: 'Ein Blick auf Ihren Gang zeigt, wo Belastung entsteht — und worauf eine Behandlung achten sollte.',
                    en: 'A look at your gait reveals where load builds up — and what a treatment should account for.',
                },
                keywords: {
                    de: ['ganganalyse', 'ganganalysen', 'gangbild'],
                    en: ['gait', 'gait analysis'],
                },
            },
            {
                id: 'service-untersuchung-einlagenberatung',
                icon: FootprintsIcon,
                heading: { de: 'Einlagenberatung', en: 'Insole advice' },
                body: {
                    de: 'Wir schauen mit Ihnen, ob Einlagen sinnvoll sind, und arbeiten dafür mit Orthopädieschuhtechnikern zusammen.',
                    en: 'We look at whether insoles make sense and work with orthopedic shoe technicians for the fitting.',
                },
                keywords: {
                    de: ['einlagen', 'einlagenberatung', 'orthopädie', 'schuhtechnik'],
                    en: ['insoles', 'orthotics', 'orthopedic'],
                },
            },
        ],
    },
    {
        id: 'group-naegel',
        heading: { de: 'Nägel', en: 'Nails' },
        body: {
            de: 'Schneiden, korrigieren, wiederaufbauen — was die Nägel gerade brauchen.',
            en: 'Cutting, correcting, rebuilding — whatever the nails need right now.',
        },
        items: [
            {
                id: 'service-naegel-nagelbearbeitung',
                icon: ScissorsIcon,
                heading: { de: 'Nagelbearbeitung', en: 'Nail care' },
                body: {
                    de: 'Fachgerechtes Kürzen und Formen der Nägel — auch bei verdickten oder schwer zu schneidenden Nägeln.',
                    en: 'Professional trimming and shaping of nails — including thickened or hard-to-cut nails.',
                },
                keywords: {
                    de: ['nagelbearbeitung', 'nagelpflege', 'nägel schneiden', 'kürzen'],
                    en: ['nail care', 'trimming', 'nail shaping'],
                },
            },
            {
                id: 'service-naegel-nagelkorrektur',
                icon: BandageIcon,
                heading: { de: 'Nagelkorrekturen', en: 'Nail corrections' },
                body: {
                    de: 'Spangen bei eingewachsenen oder verformten Nägeln — individuell angepasst und regelmäßig kontrolliert.',
                    en: 'Braces for ingrown or deformed nails — fitted individually and reviewed at follow-ups.',
                },
                keywords: {
                    de: ['nagelkorrektur', 'spange', 'spangen', 'orthonyxie', 'eingewachsen'],
                    en: ['nail correction', 'brace', 'braces', 'orthonyxia', 'ingrown'],
                },
            },
            {
                id: 'service-naegel-nagelprothetik',
                icon: WrenchIcon,
                heading: { de: 'Nagelprothetik', en: 'Nail prosthetics' },
                body: {
                    de: 'Künstlicher Nagelaufbau bei beschädigten oder fehlenden Nägeln — als Schutz und für ein gepflegtes Aussehen.',
                    en: 'Artificial nail reconstruction for damaged or missing nails — for protection and a tidy appearance.',
                },
                keywords: {
                    de: ['nagelprothetik', 'nagelersatz', 'nagelaufbau', 'kunstnagel'],
                    en: ['nail prosthetics', 'nail prosthesis', 'nail reconstruction'],
                },
            },
        ],
    },
    {
        id: 'group-haut',
        heading: { de: 'Haut', en: 'Skin' },
        body: {
            de: 'Hornhaut, Hühneraugen, Warzen, Pilz — gezielte Behandlung der Stellen, die drücken oder stören.',
            en: 'Calluses, corns, warts, fungus — targeted treatment of the spots that press or bother you.',
        },
        items: [
            {
                id: 'service-haut-hornhaut',
                icon: SparklesIcon,
                heading: { de: 'Hornhautabtragung', en: 'Callus removal' },
                body: {
                    de: 'Schonendes Abtragen verdickter Hautstellen — gezielt dort, wo es drückt oder schmerzt.',
                    en: 'Gentle removal of thickened skin — targeted at the spots that press or hurt.',
                },
                keywords: {
                    de: ['hornhaut', 'hornhautabtragung', 'schwiele'],
                    en: ['callus', 'callus removal', 'hardened skin'],
                },
            },
            {
                id: 'service-haut-huehneraugen',
                icon: TargetIcon,
                heading: { de: 'Entfernen von Hühneraugen', en: 'Corn removal' },
                body: {
                    de: 'Schmerzhafte Hornhautkegel werden vorsichtig ausgelöst — und die Ursache mitbedacht.',
                    en: 'Painful corns are carefully removed — and the underlying cause is taken into account.',
                },
                keywords: {
                    de: ['hühnerauge', 'hühneraugen', 'clavus'],
                    en: ['corn', 'corns', 'clavus'],
                },
            },
            {
                id: 'service-haut-druckschutz',
                icon: ShieldCheckIcon,
                heading: { de: 'Druck- und Reibungsschutz', en: 'Pressure and friction protection' },
                body: {
                    de: 'Polster und Schutzverbände entlasten gereizte Stellen, bis sie abgeheilt sind.',
                    en: 'Pads and protective dressings relieve irritated areas until they have healed.',
                },
                keywords: {
                    de: ['druckschutz', 'reibung', 'polster', 'schutzverband'],
                    en: ['pressure protection', 'friction', 'padding', 'dressing'],
                },
            },
            {
                id: 'service-haut-warzen',
                icon: BugIcon,
                heading: { de: 'Warzenbehandlungen', en: 'Wart treatments' },
                body: {
                    de: 'Behandlung von Dornwarzen am Fuß — geduldig und konsequent über mehrere Termine.',
                    en: 'Treatment of plantar warts on the foot — patient and consistent over several visits.',
                },
                keywords: {
                    de: ['warze', 'warzen', 'dornwarze', 'dornwarzen', 'verruca'],
                    en: ['wart', 'warts', 'plantar wart', 'verruca'],
                },
            },
            {
                id: 'service-haut-pilzbehandlung',
                icon: PillIcon,
                heading: { de: 'Pilzbehandlung', en: 'Fungal treatment' },
                body: {
                    de: 'Behandlung von Nagel- und Hautmykosen — mit klarer Anleitung für die Pflege zu Hause.',
                    en: 'Treatment of nail and skin mycoses — with clear guidance for at-home care.',
                },
                keywords: {
                    de: ['pilz', 'pilzbehandlung', 'mykose', 'mykosen', 'nagelpilz', 'fußpilz', 'pilzinfektion', 'pilzinfektionen'],
                    en: ['fungus', 'fungal', 'mycosis', 'nail fungus', "athlete's foot"],
                },
            },
        ],
    },
];

const LEISTUNGEN_BRING_LIST_SHARED: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-medikamente',
        heading: { de: 'Liste der aktuellen Medikamente', en: 'Current medication list' },
        body: {
            de: 'Besonders wichtig bei Diabetes oder Blutverdünnern.',
            en: 'Especially important for diabetes or blood-thinning medication.',
        },
        keywords: {
            de: ['medikamente', 'medikamentenliste', 'blutverdünner'],
            en: ['medication', 'medication list', 'blood thinner'],
        },
    },
    {
        id: 'bring-schuhe',
        heading: { de: 'Bequeme Schuhe', en: 'Comfortable shoes' },
        body: {
            de: 'Sie laufen direkt nach der Behandlung wieder los — eng anliegende Schuhe sind ungünstig.',
            en: "You'll walk out right after the treatment — tight shoes are unhelpful.",
        },
        keywords: { de: ['schuhe'], en: ['shoes'] },
    },
    {
        id: 'bring-zeit',
        heading: { de: 'Etwas Zeit', en: 'A little time' },
        body: {
            de: 'Der erste Termin dauert ca. 60 Minuten — Anamnese, Untersuchung und Behandlung.',
            en: 'The first appointment takes about 60 minutes — history, examination and treatment.',
        },
        keywords: { de: ['zeit', 'dauer', 'erster termin'], en: ['time', 'duration', 'first appointment'] },
    },
];

export const LEISTUNGEN_BRING_LIST_KASSE: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-versichertenkarte',
        heading: { de: 'Versichertenkarte', en: 'Insurance card' },
        body: {
            de: 'Wir lesen sie beim ersten Termin ein und rechnen direkt mit Ihrer Krankenkasse ab.',
            en: 'We scan it at your first visit and bill directly with your statutory insurance.',
        },
        keywords: {
            de: ['versichertenkarte', 'kassenkarte', 'krankenkasse'],
            en: ['insurance card', 'health card'],
        },
    },
    {
        id: 'bring-verordnung',
        heading: { de: 'Ärztliche Verordnung', en: 'Medical prescription' },
        body: {
            de: 'Bei Diabetes oder vergleichbaren Diagnosen wird sie meist von der Hausarztpraxis ausgestellt.',
            en: 'For diabetes or comparable diagnoses it is usually issued by your GP practice.',
        },
        keywords: {
            de: ['verordnung', 'rezept', 'überweisung'],
            en: ['prescription', 'referral'],
        },
    },
    ...LEISTUNGEN_BRING_LIST_SHARED,
];

export const LEISTUNGEN_BRING_LIST_PRIVAT: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-keine-verordnung',
        heading: { de: 'Keine Verordnung nötig', en: 'No prescription needed' },
        body: {
            de: 'Sie können direkt einen Termin vereinbaren — wir rechnen privat nach Leistung ab.',
            en: 'You can book directly — we bill privately, by service.',
        },
        keywords: {
            de: ['privat', 'selbstzahler', 'ohne verordnung'],
            en: ['private', 'self-payer', 'without prescription'],
        },
    },
    ...LEISTUNGEN_BRING_LIST_SHARED,
];
