import { createFileRoute, Link } from '@tanstack/react-router';
import {
    CalendarIcon,
    ClipboardCheckIcon,
    CreditCardIcon,
    EuroIcon,
    HomeIcon,
    PercentIcon,
    PhoneIcon,
    ShieldCheckIcon,
} from 'lucide-react';
import { useState } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import {
    LEISTUNGEN_BRING_LIST_KASSE,
    LEISTUNGEN_BRING_LIST_PRIVAT,
    LEISTUNGEN_CHECKLIST,
    LEISTUNGEN_SERVICE_GROUPS,
} from '../../web/content/leistungenContent';
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

    const bringList = patientType === 'kasse' ? LEISTUNGEN_BRING_LIST_KASSE : LEISTUNGEN_BRING_LIST_PRIVAT;

    return (
        <main>
            {/* Hero */}
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
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
                </Reveal>
            </section>

            {/* Brauche ich eine podologische Behandlung? */}
            <section id="brauche-ich-eine-behandlung" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
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
                    </Reveal>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {LEISTUNGEN_CHECKLIST.map((item, index) => {
                            const Icon = item.icon!;
                            return (
                                <Reveal key={item.id} delayMs={index * 80}>
                                    <div
                                        id={item.id}
                                        className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                            <Icon
                                                className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">
                                            {item.heading[locale]}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal>
                        <p className="mt-10 max-w-3xl text-sm text-(--color-brand-charcoal-4)">
                            {
                                {
                                    de: 'Im Zweifel: rufen Sie an — wir sagen ehrlich, ob ein Termin sinnvoll ist. ',
                                    en: "When in doubt: call us — we'll tell you honestly whether an appointment makes sense. ",
                                }[locale]
                            }
                            <a
                                href={`tel:${PRACTICE.phone}`}
                                className="inline-flex items-center gap-1.5 font-medium text-aubergine underline-offset-4 transition-transform duration-150 ease-out hover:underline active:scale-[0.98]"
                            >
                                <PhoneIcon className="size-3.5" aria-hidden />
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Unser Leistungsangebot */}
            <section id="leistungen" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
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
                    </Reveal>

                    <div className="mt-12 space-y-14">
                        {LEISTUNGEN_SERVICE_GROUPS.map((group) => (
                            <div key={group.id}>
                                <Reveal>
                                    <h3 className="font-serif text-2xl font-semibold text-aubergine-dark">{group.heading[locale]}</h3>
                                    <p className="mt-2 max-w-2xl text-sm text-(--color-brand-charcoal-2)">{group.body[locale]}</p>
                                </Reveal>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((service, index) => {
                                        const Icon = service.icon!;
                                        return (
                                            <Reveal key={service.id} delayMs={index * 80}>
                                                <article
                                                    id={service.id}
                                                    className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                                >
                                                    <div className="flex size-11 items-center justify-center rounded-lg bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                                        <Icon
                                                            className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                            aria-hidden
                                                        />
                                                    </div>
                                                    <h4 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">
                                                        {service.heading[locale]}
                                                    </h4>
                                                    <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                                        {service.body[locale]}
                                                    </p>
                                                </article>
                                            </Reveal>
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
                    <Reveal>
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
                    </Reveal>

                    <div
                        key={patientType}
                        role="tabpanel"
                        id={`patient-panel-${patientType}`}
                        aria-labelledby={`patient-tab-${patientType}`}
                    >
                        <Reveal>
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
                        </Reveal>

                        <ol className="mt-8 grid max-w-3xl gap-5">
                            {bringList.map((item, index) => (
                                <Reveal key={item.id} as="li" delayMs={index * 80} className="flex gap-4">
                                    <span
                                        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-aubergine font-serif text-sm font-semibold text-cream"
                                        aria-hidden
                                    >
                                        {index + 1}
                                    </span>
                                    <div id={item.id} className="search-target scroll-mt-20">
                                        <h3 className="font-serif text-lg font-semibold text-aubergine-dark">{item.heading[locale]}</h3>
                                        <p className="mt-1 text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Kosten */}
            <section id="kosten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Kosten', en: 'Costs' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Kosten und Krankenkasse', en: 'Costs and insurance' }[locale]}
                        </h2>
                    </Reveal>

                    <div key={patientType} className="mt-10 grid max-w-3xl gap-8">
                        {patientType === 'kasse' ? (
                            <>
                                <Reveal>
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
                                </Reveal>

                                <Reveal>
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
                                            {(
                                                [
                                                    {
                                                        Icon: EuroIcon,
                                                        heading: { de: '10 € pro Verordnung', en: '€10 per prescription' },
                                                        body: {
                                                            de: 'Einmalige Rezeptgebühr je Verordnungsblatt — unabhängig davon, wie viele Behandlungen darauf stehen.',
                                                            en: 'A one-off prescription fee per prescription form — regardless of how many treatments are on it.',
                                                        },
                                                    },
                                                    {
                                                        Icon: PercentIcon,
                                                        heading: {
                                                            de: '10 % Eigenanteil je Behandlung',
                                                            en: '10% co-payment per treatment',
                                                        },
                                                        body: {
                                                            de: 'Gesetzliche Zuzahlung von 10 % der Behandlungskosten — diese rechnen wir direkt mit Ihnen ab.',
                                                            en: 'A statutory co-payment of 10% of the treatment cost — billed directly to you.',
                                                        },
                                                    },
                                                    {
                                                        Icon: HomeIcon,
                                                        heading: {
                                                            de: 'Hausbesuch: Eigenanteil auch auf Hauspauschale & Wegegeld',
                                                            en: 'Home visit: co-payment applies to flat fee & travel costs',
                                                        },
                                                        body: {
                                                            de: 'Die 10 % gelten nicht nur für die Behandlung, sondern auch für Hauspauschale und Wegegeld.',
                                                            en: 'The 10% applies not only to the treatment itself, but also to the home-visit flat fee and travel costs.',
                                                        },
                                                    },
                                                    {
                                                        Icon: ShieldCheckIcon,
                                                        heading: {
                                                            de: 'Von Zuzahlungen befreit?',
                                                            en: 'Exempt from co-payments?',
                                                        },
                                                        body: {
                                                            de: 'Wenn Ihre Krankenkasse Sie für das laufende Jahr von Zuzahlungen befreit hat, bringen Sie bitte den Befreiungsausweis mit.',
                                                            en: 'If your health-insurance fund has granted you a co-payment exemption for this year, please bring the exemption certificate.',
                                                        },
                                                    },
                                                ] as const
                                            ).map((row, index) => (
                                                <Reveal key={row.heading.de} as="li" delayMs={index * 80} className="flex gap-3">
                                                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                        <row.Icon className="size-4" aria-hidden />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-aubergine-dark">{row.heading[locale]}</h4>
                                                        <p className="text-sm text-(--color-brand-charcoal-2)">{row.body[locale]}</p>
                                                    </div>
                                                </Reveal>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>

                                <Reveal>
                                    <button
                                        type="button"
                                        onClick={() => setPatientType('privat')}
                                        className="group inline-flex items-center gap-1 text-sm text-aubergine underline-offset-4 hover:underline"
                                    >
                                        {
                                            {
                                                de: 'Privat ohne Verordnung? Hier wechseln',
                                                en: 'Private without prescription? Switch here',
                                            }[locale]
                                        }
                                        <span
                                            aria-hidden
                                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </button>
                                </Reveal>
                            </>
                        ) : (
                            <Reveal>
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
                                            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-aubergine underline-offset-4 transition-transform duration-150 ease-out hover:underline active:scale-[0.98]"
                                        >
                                            <PhoneIcon className="size-4" aria-hidden />
                                            {formatPhoneNumber(PRACTICE.phone)}
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setPatientType('kasse')}
                                            className="group mt-3 inline-flex items-center gap-1 text-sm text-aubergine underline-offset-4 hover:underline"
                                        >
                                            {
                                                {
                                                    de: 'Mit ärztlicher Verordnung? Hier wechseln',
                                                    en: 'With a medical prescription? Switch here',
                                                }[locale]
                                            }
                                            <span
                                                aria-hidden
                                                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="termin" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-4 pb-24 text-center">
                    <Reveal>
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
                                className="inline-flex items-center gap-2 rounded-full border border-aubergine/20 px-5 py-2.5 text-sm font-medium text-aubergine transition-[color,background-color,transform] duration-150 ease-out hover:bg-aubergine hover:text-cream active:scale-[0.98]"
                            >
                                <a href={`tel:${PRACTICE.phone}`}>
                                    <PhoneIcon className="size-4" aria-hidden />
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
