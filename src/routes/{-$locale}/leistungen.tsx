import { createFileRoute, Link } from '@tanstack/react-router';
import {
    ActivityIcon,
    AlertCircleIcon,
    BandageIcon,
    BugIcon,
    CalendarIcon,
    ClipboardCheckIcon,
    CompassIcon,
    CreditCardIcon,
    EuroIcon,
    FileTextIcon,
    FootprintsIcon,
    HandIcon,
    HomeIcon,
    MessageCircleIcon,
    PercentIcon,
    PhoneIcon,
    PillIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StethoscopeIcon,
    TargetIcon,
    WrenchIcon,
} from 'lucide-react';
import { useState } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { LeistungenPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { cn } from '../../web/utils/cn';
import { localeFromParam } from '../../web/utils/locale';

type PatientType = 'kasse' | 'privat';

export const Route = createFileRoute('/{-$locale}/leistungen')({
    loader: () => routeLoaderGraphqlClient(LeistungenPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Leistungen', en: 'Services' }[locale],
            description: {
                de: 'Medizinische Fußpflege, Nagelkorrektur-Spangen, Behandlung des diabetischen Fußsyndroms, Pilzinfektionen, Hühneraugen und Hausbesuche — Podologie Dudenhofen mit Krankenkassenzulassung.',
                en: 'Medical foot care, nail-correction braces, diabetic foot syndrome, fungal infections, corns and home visits — Podologie Dudenhofen, accredited with statutory health insurance.',
            }[locale],
            path: '/leistungen',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: LeistungenPage,
});

function LeistungenPage() {
    const locale = useLocale();
    const [patientType, setPatientType] = useState<PatientType>('kasse');

    const checklist = [
        {
            icon: AlertCircleIcon,
            heading: { de: 'Anhaltende Schmerzen am Fuß', en: 'Persistent foot pain' },
            body: {
                de: 'Beschwerden, die sich beim Gehen oder Stehen nicht von selbst beruhigen.',
                en: "Discomfort while walking or standing that doesn't settle on its own.",
            },
        },
        {
            icon: ActivityIcon,
            heading: { de: 'Diabetes mit auffälligen Stellen', en: 'Diabetes with noticeable changes' },
            body: {
                de: 'Druckstellen, Risse oder Verfärbungen am Fuß, wenn Sie Diabetes haben.',
                en: 'Pressure points, fissures or discoloration if you have diabetes.',
            },
        },
        {
            icon: ScissorsIcon,
            heading: { de: 'Eingewachsene oder verformte Nägel', en: 'Ingrown or deformed nails' },
            body: {
                de: 'Nägel, die in die Haut wachsen oder ihre Form verloren haben.',
                en: 'Nails that grow into the skin or have lost their shape.',
            },
        },
        {
            icon: SparklesIcon,
            heading: { de: 'Hornhaut, Hühneraugen, Schwielen', en: 'Calluses, corns, hardened skin' },
            body: {
                de: 'Verdickte Hautstellen, die drücken oder Schmerzen verursachen.',
                en: 'Thickened skin areas that press or cause pain.',
            },
        },
        {
            icon: BugIcon,
            heading: { de: 'Pilzinfektionen an Nagel oder Haut', en: 'Fungal nail or skin infections' },
            body: {
                de: 'Verfärbte, brüchige Nägel oder juckende Hautstellen am Fuß.',
                en: 'Discolored, brittle nails or itchy skin patches on the foot.',
            },
        },
        {
            icon: FileTextIcon,
            heading: { de: 'Ärztliche Verordnung erhalten', en: 'You have a medical prescription' },
            body: {
                de: 'Sie sind unsicher, was eine Verordnung „podologische Behandlung" bedeutet.',
                en: "You're unsure what a prescription for 'podiatric treatment' means.",
            },
        },
    ] as const;

    const serviceGroups = [
        {
            heading: { de: 'Untersuchung & Beratung', en: 'Examination & advice' },
            body: {
                de: 'Wir schauen erst — und entscheiden dann gemeinsam, was sinnvoll ist.',
                en: 'We look first — and decide together what makes sense.',
            },
            items: [
                {
                    icon: StethoscopeIcon,
                    heading: { de: 'Fußuntersuchung', en: 'Foot examination' },
                    body: {
                        de: 'Befund von Haut, Nägeln und Druckstellen — als Grundlage für jede weitere Behandlung.',
                        en: 'Assessment of skin, nails and pressure points — the basis for every further treatment.',
                    },
                },
                {
                    icon: MessageCircleIcon,
                    heading: { de: 'Beratung bei Fußproblemen', en: 'Advice on foot problems' },
                    body: {
                        de: 'Wir hören zu und ordnen ein — was selbst zu pflegen ist und wann eine ärztliche Abklärung sinnvoll ist.',
                        en: 'We listen and put things in context — what to care for yourself and when to see a doctor.',
                    },
                },
                {
                    icon: HandIcon,
                    heading: { de: 'Sensibilitätstests', en: 'Sensitivity tests' },
                    body: {
                        de: 'Prüfung des Berührungs- und Druckempfindens — wichtig bei Diabetes oder Neuropathie.',
                        en: 'Testing of touch and pressure perception — important with diabetes or neuropathy.',
                    },
                },
                {
                    icon: CompassIcon,
                    heading: { de: 'Ganganalysen', en: 'Gait analysis' },
                    body: {
                        de: 'Ein Blick auf Ihren Gang zeigt, wo Belastung entsteht — und worauf eine Behandlung achten sollte.',
                        en: 'A look at your gait reveals where load builds up — and what a treatment should account for.',
                    },
                },
                {
                    icon: FootprintsIcon,
                    heading: { de: 'Einlagenberatung', en: 'Insole advice' },
                    body: {
                        de: 'Wir schauen mit Ihnen, ob Einlagen sinnvoll sind, und arbeiten dafür mit Orthopädieschuhtechnikern zusammen.',
                        en: 'We look at whether insoles make sense and work with orthopedic shoe technicians for the fitting.',
                    },
                },
            ],
        },
        {
            heading: { de: 'Nägel', en: 'Nails' },
            body: {
                de: 'Schneiden, korrigieren, wiederaufbauen — was die Nägel gerade brauchen.',
                en: 'Cutting, correcting, rebuilding — whatever the nails need right now.',
            },
            items: [
                {
                    icon: ScissorsIcon,
                    heading: { de: 'Nagelbearbeitung', en: 'Nail care' },
                    body: {
                        de: 'Fachgerechtes Kürzen und Formen der Nägel — auch bei verdickten oder schwer zu schneidenden Nägeln.',
                        en: 'Professional trimming and shaping of nails — including thickened or hard-to-cut nails.',
                    },
                },
                {
                    icon: BandageIcon,
                    heading: { de: 'Nagelkorrekturen', en: 'Nail corrections' },
                    body: {
                        de: 'Spangen bei eingewachsenen oder verformten Nägeln — individuell angepasst und regelmäßig kontrolliert.',
                        en: 'Braces for ingrown or deformed nails — fitted individually and reviewed at follow-ups.',
                    },
                },
                {
                    icon: WrenchIcon,
                    heading: { de: 'Nagelprothetik', en: 'Nail prosthetics' },
                    body: {
                        de: 'Künstlicher Nagelaufbau bei beschädigten oder fehlenden Nägeln — als Schutz und für ein gepflegtes Aussehen.',
                        en: 'Artificial nail reconstruction for damaged or missing nails — for protection and a tidy appearance.',
                    },
                },
            ],
        },
        {
            heading: { de: 'Haut', en: 'Skin' },
            body: {
                de: 'Hornhaut, Hühneraugen, Warzen, Pilz — gezielte Behandlung der Stellen, die drücken oder stören.',
                en: 'Calluses, corns, warts, fungus — targeted treatment of the spots that press or bother you.',
            },
            items: [
                {
                    icon: SparklesIcon,
                    heading: { de: 'Hornhautabtragung', en: 'Callus removal' },
                    body: {
                        de: 'Schonendes Abtragen verdickter Hautstellen — gezielt dort, wo es drückt oder schmerzt.',
                        en: 'Gentle removal of thickened skin — targeted at the spots that press or hurt.',
                    },
                },
                {
                    icon: TargetIcon,
                    heading: { de: 'Entfernen von Hühneraugen', en: 'Corn removal' },
                    body: {
                        de: 'Schmerzhafte Hornhautkegel werden vorsichtig ausgelöst — und die Ursache mitbedacht.',
                        en: 'Painful corns are carefully removed — and the underlying cause is taken into account.',
                    },
                },
                {
                    icon: ShieldCheckIcon,
                    heading: { de: 'Druck- und Reibungsschutz', en: 'Pressure and friction protection' },
                    body: {
                        de: 'Polster und Schutzverbände entlasten gereizte Stellen, bis sie abgeheilt sind.',
                        en: 'Pads and protective dressings relieve irritated areas until they have healed.',
                    },
                },
                {
                    icon: BugIcon,
                    heading: { de: 'Warzenbehandlungen', en: 'Wart treatments' },
                    body: {
                        de: 'Behandlung von Dornwarzen am Fuß — geduldig und konsequent über mehrere Termine.',
                        en: 'Treatment of plantar warts on the foot — patient and consistent over several visits.',
                    },
                },
                {
                    icon: PillIcon,
                    heading: { de: 'Pilzbehandlung', en: 'Fungal treatment' },
                    body: {
                        de: 'Behandlung von Nagel- und Hautmykosen — mit klarer Anleitung für die Pflege zu Hause.',
                        en: 'Treatment of nail and skin mycoses — with clear guidance for at-home care.',
                    },
                },
            ],
        },
    ] as const;

    const bringListShared = [
        {
            heading: { de: 'Liste der aktuellen Medikamente', en: 'Current medication list' },
            body: {
                de: 'Besonders wichtig bei Diabetes oder Blutverdünnern.',
                en: 'Especially important for diabetes or blood-thinning medication.',
            },
        },
        {
            heading: { de: 'Bequeme Schuhe', en: 'Comfortable shoes' },
            body: {
                de: 'Sie laufen direkt nach der Behandlung wieder los — eng anliegende Schuhe sind ungünstig.',
                en: "You'll walk out right after the treatment — tight shoes are unhelpful.",
            },
        },
        {
            heading: { de: 'Etwas Zeit', en: 'A little time' },
            body: {
                de: 'Der erste Termin dauert ca. 60 Minuten — Anamnese, Untersuchung und Behandlung.',
                en: 'The first appointment takes about 60 minutes — history, examination and treatment.',
            },
        },
    ] as const;

    const bringListKasse = [
        {
            heading: { de: 'Versichertenkarte', en: 'Insurance card' },
            body: {
                de: 'Wir lesen sie beim ersten Termin ein und rechnen direkt mit Ihrer Krankenkasse ab.',
                en: 'We scan it at your first visit and bill directly with your statutory insurance.',
            },
        },
        {
            heading: { de: 'Ärztliche Verordnung', en: 'Medical prescription' },
            body: {
                de: 'Bei Diabetes oder vergleichbaren Diagnosen wird sie meist von der Hausarztpraxis ausgestellt.',
                en: 'For diabetes or comparable diagnoses it is usually issued by your GP practice.',
            },
        },
        ...bringListShared,
    ] as const;

    const bringListPrivat = [
        {
            heading: { de: 'Keine Verordnung nötig', en: 'No prescription needed' },
            body: {
                de: 'Sie können direkt einen Termin vereinbaren — wir rechnen privat nach Leistung ab.',
                en: 'You can book directly — we bill privately, by service.',
            },
        },
        ...bringListShared,
    ] as const;

    const bringList = patientType === 'kasse' ? bringListKasse : bringListPrivat;

    return (
        <main>
            {/* Hero */}
            <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                <SectionEyebrow>{{ de: 'Leistungen', en: 'Services' }[locale]}</SectionEyebrow>
                <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {
                        {
                            de: 'Was wir behandeln — und wann ein Termin sinnvoll ist',
                            en: 'What we treat — and when an appointment makes sense',
                        }[locale]
                    }
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Medizinische Fußpflege mit Kassenzulassung — von Hornhaut und Hühneraugen bis zum diabetischen Fußsyndrom und Nagelkorrektur-Spangen.',
                            en: 'Medical foot care with statutory health-insurance accreditation — from calluses and corns to diabetic foot syndrome and nail-correction braces.',
                        }[locale]
                    }
                </p>
                <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                    <Button variant="brand" size="lg" asChild>
                        <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                    </Button>
                    <Button variant="brand-outline" size="lg" asChild>
                        <Link to="/{-$locale}/praxis">{{ de: 'Praxis ansehen', en: 'View the practice' }[locale]}</Link>
                    </Button>
                </div>
            </section>

            {/* Brauche ich eine podologische Behandlung? */}
            <section id="brauche-ich-eine-behandlung" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Orientierung', en: 'Orientation' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Brauche ich eine podologische Behandlung?', en: 'Do I need a podiatry appointment?' }[locale]}
                    </h2>
                    <p className="mt-4 max-w-2xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Wenn einer der folgenden Punkte auf Sie zutrifft, lohnt sich ein Termin in der podologischen Praxis.',
                                en: 'If any of the points below apply to you, a podiatry appointment is worth considering.',
                            }[locale]
                        }
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {checklist.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.heading.de}
                                    className="rounded-xl border border-aubergine/10 bg-cream p-6 transition hover:-translate-y-0.5 hover:border-gold"
                                >
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-blush text-aubergine">
                                        <Icon className="size-5" aria-hidden />
                                    </div>
                                    <h3 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">{item.heading[locale]}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-10 max-w-3xl text-sm text-(--color-brand-charcoal-4)">
                        {
                            {
                                de: 'Im Zweifel: rufen Sie an — wir sagen ehrlich, ob ein Termin sinnvoll ist. ',
                                en: "When in doubt: call us — we'll tell you honestly whether an appointment makes sense. ",
                            }[locale]
                        }
                        <a
                            href={`tel:${PRACTICE.phone}`}
                            className="inline-flex items-center gap-1.5 font-medium text-aubergine underline-offset-4 hover:underline"
                        >
                            <PhoneIcon className="size-3.5" aria-hidden />
                            {formatPhoneNumber(PRACTICE.phone)}
                        </a>
                    </p>
                </div>
            </section>

            {/* Unser Leistungsangebot */}
            <section id="leistungen" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Leistungen', en: 'Services' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Unser Leistungsangebot', en: 'What we offer' }[locale]}
                    </h2>
                    <p className="mt-4 max-w-2xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Jede Behandlung beginnt mit einem Gespräch — wir schauen, was Ihre Füße brauchen, und nehmen uns die Zeit dafür.',
                                en: 'Every treatment starts with a conversation — we look at what your feet need and take the time it takes.',
                            }[locale]
                        }
                    </p>

                    <div className="mt-12 space-y-14">
                        {serviceGroups.map((group) => (
                            <div key={group.heading.de}>
                                <h3 className="font-serif text-2xl font-semibold text-aubergine-dark">{group.heading[locale]}</h3>
                                <p className="mt-2 max-w-2xl text-sm text-(--color-brand-charcoal-2)">{group.body[locale]}</p>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((service) => {
                                        const Icon = service.icon;
                                        return (
                                            <article
                                                key={service.heading.de}
                                                className="rounded-xl border border-aubergine/10 bg-cream p-6 transition hover:-translate-y-0.5 hover:border-gold"
                                            >
                                                <div className="flex size-11 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                    <Icon className="size-5" aria-hidden />
                                                </div>
                                                <h4 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">
                                                    {service.heading[locale]}
                                                </h4>
                                                <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                                    {service.body[locale]}
                                                </p>
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Was bringe ich mit? */}
            <section id="was-bringe-ich-mit" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Erster Termin', en: 'First appointment' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Was bringe ich zum ersten Termin mit?',
                                en: 'What to bring to your first appointment',
                            }[locale]
                        }
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm font-medium text-aubergine">
                        {
                            {
                                de: 'Das hängt davon ab, ob Sie Kassen- oder Privatpatient*in sind:',
                                en: 'It depends on whether you have statutory insurance or pay privately:',
                            }[locale]
                        }
                    </p>
                    <div
                        role="tablist"
                        aria-label={{ de: 'Patientenart', en: 'Patient type' }[locale]}
                        className="mt-3 inline-flex rounded-full border border-aubergine/20 bg-cream p-1"
                    >
                        {(
                            [
                                { value: 'kasse', label: { de: 'Kassenpatient*in', en: 'Statutory insurance' } },
                                { value: 'privat', label: { de: 'Privatpatient*in / Selbstzahler*in', en: 'Private / self-payer' } },
                            ] as const
                        ).map((option) => {
                            const active = patientType === option.value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="tab"
                                    id={`patient-tab-${option.value}`}
                                    aria-selected={active}
                                    aria-controls={`patient-panel-${option.value}`}
                                    onClick={() => setPatientType(option.value)}
                                    className={cn(
                                        'rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5',
                                        active ? 'bg-aubergine text-cream' : 'text-aubergine/70 hover:text-aubergine',
                                    )}
                                >
                                    {option.label[locale]}
                                </button>
                            );
                        })}
                    </div>

                    <div
                        key={patientType}
                        role="tabpanel"
                        id={`patient-panel-${patientType}`}
                        aria-labelledby={`patient-tab-${patientType}`}
                    >
                        <p className="mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                            {patientType === 'kasse'
                                ? {
                                      de: 'Für Kassenpatient*innen — damit wir Ihre Verordnung sauber abrechnen können.',
                                      en: 'For statutory-insurance patients — so we can bill your prescription cleanly.',
                                  }[locale]
                                : {
                                      de: 'Für Privatpatient*innen — damit der Termin entspannt verläuft.',
                                      en: 'For private patients — so your visit stays relaxed.',
                                  }[locale]}
                        </p>

                        <ol className="mt-8 grid max-w-3xl gap-5">
                            {bringList.map((item, index) => (
                                <li key={item.heading.de} className="flex gap-4">
                                    <span
                                        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-aubergine font-serif text-sm font-semibold text-cream"
                                        aria-hidden
                                    >
                                        {index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-serif text-lg font-semibold text-aubergine-dark">{item.heading[locale]}</h3>
                                        <p className="mt-1 text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Kosten */}
            <section id="kosten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Kosten', en: 'Costs' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Kosten und Krankenkasse', en: 'Costs and insurance' }[locale]}
                    </h2>

                    <div key={patientType} className="mt-10 grid max-w-3xl gap-8">
                        {patientType === 'kasse' ? (
                            <>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                        <ClipboardCheckIcon className="size-5" aria-hidden />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                            {{ de: 'Kassenleistung', en: 'Statutory insurance' }[locale]}
                                        </h3>
                                        <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                            {
                                                {
                                                    de: 'Bei diabetischem Fußsyndrom oder vergleichbaren Erkrankungen mit ärztlicher Verordnung übernehmen die gesetzlichen Krankenkassen die Kosten — wir rechnen direkt ab.',
                                                    en: 'For diabetic foot syndrome or comparable conditions with a medical prescription, statutory health insurance covers the costs — we bill directly.',
                                                }[locale]
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-aubergine/10 bg-cream p-6">
                                    <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                        {
                                            {
                                                de: 'Was Sie als Kassenpatient*in selbst zahlen',
                                                en: 'What you pay yourself as a statutory patient',
                                            }[locale]
                                        }
                                    </h3>
                                    <ul className="mt-4 grid gap-4">
                                        <li className="flex gap-3">
                                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                <EuroIcon className="size-4" aria-hidden />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-aubergine-dark">
                                                    {
                                                        {
                                                            de: '10 € pro Verordnung',
                                                            en: '€10 per prescription',
                                                        }[locale]
                                                    }
                                                </h4>
                                                <p className="text-sm text-(--color-brand-charcoal-2)">
                                                    {
                                                        {
                                                            de: 'Einmalige Rezeptgebühr je Verordnungsblatt — unabhängig davon, wie viele Behandlungen darauf stehen.',
                                                            en: 'A one-off prescription fee per prescription form — regardless of how many treatments are on it.',
                                                        }[locale]
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                <PercentIcon className="size-4" aria-hidden />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-aubergine-dark">
                                                    {
                                                        {
                                                            de: '10 % Eigenanteil je Behandlung',
                                                            en: '10% co-payment per treatment',
                                                        }[locale]
                                                    }
                                                </h4>
                                                <p className="text-sm text-(--color-brand-charcoal-2)">
                                                    {
                                                        {
                                                            de: 'Gesetzliche Zuzahlung von 10 % der Behandlungskosten — diese rechnen wir direkt mit Ihnen ab.',
                                                            en: 'A statutory co-payment of 10% of the treatment cost — billed directly to you.',
                                                        }[locale]
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                <HomeIcon className="size-4" aria-hidden />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-aubergine-dark">
                                                    {
                                                        {
                                                            de: 'Hausbesuch: Eigenanteil auch auf Hauspauschale & Wegegeld',
                                                            en: 'Home visit: co-payment applies to flat fee & travel costs',
                                                        }[locale]
                                                    }
                                                </h4>
                                                <p className="text-sm text-(--color-brand-charcoal-2)">
                                                    {
                                                        {
                                                            de: 'Die 10 % gelten nicht nur für die Behandlung, sondern auch für Hauspauschale und Wegegeld.',
                                                            en: 'The 10% applies not only to the treatment itself, but also to the home-visit flat fee and travel costs.',
                                                        }[locale]
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                <ShieldCheckIcon className="size-4" aria-hidden />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-aubergine-dark">
                                                    {
                                                        {
                                                            de: 'Von Zuzahlungen befreit?',
                                                            en: 'Exempt from co-payments?',
                                                        }[locale]
                                                    }
                                                </h4>
                                                <p className="text-sm text-(--color-brand-charcoal-2)">
                                                    {
                                                        {
                                                            de: 'Wenn Ihre Krankenkasse Sie für das laufende Jahr von Zuzahlungen befreit hat, bringen Sie bitte den Befreiungsausweis mit.',
                                                            en: 'If your health-insurance fund has granted you a co-payment exemption for this year, please bring the exemption certificate.',
                                                        }[locale]
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPatientType('privat')}
                                    className="text-sm text-aubergine underline-offset-4 hover:underline"
                                >
                                    {
                                        {
                                            de: 'Privat ohne Verordnung? Hier wechseln →',
                                            en: 'Private without prescription? Switch here →',
                                        }[locale]
                                    }
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                    <CreditCardIcon className="size-5" aria-hidden />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                        {{ de: 'Selbstzahler', en: 'Self-payers' }[locale]}
                                    </h3>
                                    <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                        {
                                            {
                                                de: 'Privat und ohne Verordnung gerne nach Leistung — konkrete Preise nennen wir Ihnen am Telefon.',
                                                en: 'Private and without a prescription, billed by service — we share specific prices over the phone.',
                                            }[locale]
                                        }
                                    </p>
                                    <a
                                        href={`tel:${PRACTICE.phone}`}
                                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-aubergine underline-offset-4 hover:underline"
                                    >
                                        <PhoneIcon className="size-4" aria-hidden />
                                        {formatPhoneNumber(PRACTICE.phone)}
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => setPatientType('kasse')}
                                        className="mt-3 block text-sm text-aubergine underline-offset-4 hover:underline"
                                    >
                                        {
                                            {
                                                de: 'Mit ärztlicher Verordnung? Hier wechseln →',
                                                en: 'With a medical prescription? Switch here →',
                                            }[locale]
                                        }
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-4 pb-24 text-center">
                    <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Bereit für den nächsten Schritt?',
                                en: 'Ready for the next step?',
                            }[locale]
                        }
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Schreiben Sie uns über das Kontaktformular — oder rufen Sie kurz an, wenn es schneller gehen soll.',
                                en: "Send us a message via the contact form — or call us briefly if you'd rather sort it out by phone.",
                            }[locale]
                        }
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">
                                <CalendarIcon className="size-4" aria-hidden />
                                {{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}
                            </Link>
                        </Button>
                        <Button
                            variant="link"
                            asChild
                            className="inline-flex items-center gap-2 rounded-full border border-aubergine/20 px-5 py-2.5 text-sm font-medium text-aubergine transition-colors hover:bg-aubergine hover:text-cream"
                        >
                            <a href={`tel:${PRACTICE.phone}`}>
                                <PhoneIcon className="size-4" aria-hidden />
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
