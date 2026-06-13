import { createFileRoute, Link } from '@tanstack/react-router';
import {
    ActivityIcon,
    AlertCircleIcon,
    BandageIcon,
    BugIcon,
    CalendarIcon,
    ClipboardCheckIcon,
    CreditCardIcon,
    FileTextIcon,
    HomeIcon,
    PhoneIcon,
    PillIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StethoscopeIcon,
} from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { SessionBootstrapDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/leistungen')({
    loader: () => routeLoaderGraphqlClient(SessionBootstrapDocument)(),
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

    const services = [
        {
            icon: StethoscopeIcon,
            heading: { de: 'Medizinische Fußpflege', en: 'Medical foot care' },
            body: {
                de: 'Hornhautabtrag, Nagelpflege und gezielte Behandlung von Druckstellen — fachlich und in Ruhe.',
                en: 'Callus removal, nail care and targeted treatment of pressure points — careful and unhurried.',
            },
        },
        {
            icon: ShieldCheckIcon,
            heading: { de: 'Diabetisches Fußsyndrom', en: 'Diabetic foot syndrome' },
            body: {
                de: 'Schonende Behandlung nach ärztlicher Verordnung. Direkte Abrechnung mit der gesetzlichen Krankenkasse.',
                en: 'Gentle treatment with a medical prescription. Direct billing with statutory health insurance.',
            },
        },
        {
            icon: BandageIcon,
            heading: { de: 'Nagelkorrektur-Spangen', en: 'Nail-correction braces' },
            body: {
                de: 'Bei eingewachsenen oder verformten Nägeln. Die Spange wird individuell angepasst und regelmäßig kontrolliert.',
                en: 'For ingrown or deformed nails. Each brace is fitted individually and reviewed at follow-up visits.',
            },
        },
        {
            icon: PillIcon,
            heading: { de: 'Pilzinfektionen', en: 'Fungal infections' },
            body: {
                de: 'Behandlung von Nagel- und Hautmykosen — mit klarer Anleitung für die Pflege zu Hause.',
                en: 'Treatment of nail and skin mycoses — with clear guidance for at-home care.',
            },
        },
        {
            icon: SparklesIcon,
            heading: { de: 'Hühneraugen, Schwielen, Druckstellen', en: 'Corns, calluses, pressure points' },
            body: {
                de: 'Gezielte Entlastung schmerzhafter Stellen, damit Sie wieder beschwerdefrei laufen können.',
                en: 'Targeted relief of painful spots so you can walk comfortably again.',
            },
        },
        {
            icon: HomeIcon,
            heading: { de: 'Hausbesuche', en: 'Home visits' },
            body: {
                de: 'Auf Anfrage, im Umkreis Dudenhofen, Speyer und Schifferstadt — wenn der Weg in die Praxis nicht möglich ist.',
                en: "On request, around Dudenhofen, Speyer and Schifferstadt — when getting to the practice isn't possible.",
            },
        },
    ] as const;

    const bringList = [
        {
            heading: { de: 'Versichertenkarte', en: 'Insurance card' },
            body: {
                de: 'Bei gesetzlich Versicherten — wir lesen sie beim ersten Termin ein.',
                en: 'For patients with statutory insurance — we scan it at your first visit.',
            },
        },
        {
            heading: { de: 'Ärztliche Verordnung', en: 'Medical prescription' },
            body: {
                de: 'Falls vorhanden. Bei Diabetes wird sie meist von der Hausarztpraxis ausgestellt.',
                en: 'If you have one. With diabetes it is usually issued by your GP practice.',
            },
        },
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
                            href={`tel:${PRACTICE.phone.tel}`}
                            className="inline-flex items-center gap-1.5 font-medium text-aubergine underline-offset-4 hover:underline"
                        >
                            <PhoneIcon className="size-3.5" aria-hidden />
                            {PRACTICE.phone.human}
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

                    <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        {services.map((service) => {
                            const Icon = service.icon;
                            return (
                                <article
                                    key={service.heading.de}
                                    className="rounded-xl border border-aubergine/10 bg-cream p-6 transition hover:-translate-y-0.5 hover:border-gold"
                                >
                                    <div className="flex size-11 items-center justify-center rounded-lg bg-blush text-aubergine">
                                        <Icon className="size-5" aria-hidden />
                                    </div>
                                    <h3 className="mt-4 font-serif text-xl font-semibold text-aubergine-dark">{service.heading[locale]}</h3>
                                    <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">{service.body[locale]}</p>
                                </article>
                            );
                        })}
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
                    <p className="mt-4 max-w-2xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Damit wir gut vorbereitet sind und der Termin entspannt verläuft.',
                                en: 'So we can prepare well and your visit stays relaxed.',
                            }[locale]
                        }
                    </p>

                    <ol className="mt-10 grid max-w-3xl gap-5">
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
            </section>

            {/* Kosten */}
            <section id="kosten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Kosten', en: 'Costs' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Kosten und Krankenkasse', en: 'Costs and insurance' }[locale]}
                    </h2>

                    <div className="mt-10 grid max-w-3xl gap-8">
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
                                    href={`tel:${PRACTICE.phone.tel}`}
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-aubergine underline-offset-4 hover:underline"
                                >
                                    <PhoneIcon className="size-4" aria-hidden />
                                    {PRACTICE.phone.human}
                                </a>
                            </div>
                        </div>
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
                            <a href={`tel:${PRACTICE.phone.tel}`}>
                                <PhoneIcon className="size-4" aria-hidden />
                                {PRACTICE.phone.human}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
