import { createFileRoute, Link } from '@tanstack/react-router';
import { ActivityIcon, AwardIcon, BadgeCheckIcon, PhoneIcon, ShieldCheckIcon, StethoscopeIcon } from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { PRACTICE_PHONE_HUMAN, PRACTICE_PHONE_TEL } from '../../web/components/SiteHeader';
import { HomePageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/')({
    loader: () => routeLoaderGraphqlClient(HomePageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Start', en: 'Home' }[locale],
            description: {
                de: 'Podologie Dudenhofen — kleine podologische Praxis, auch für medizinische Fußpflege, Diabetisches Fußsyndrom und Nagelkorrekturen. Mit Kassenzulassung. Termine nach Vereinbarung.',
                en: 'Podologie Dudenhofen — a small podiatry practice, also offering medical foot-care, diabetic foot syndrome treatment and nail-correction. Statutory health-insurance accredited. By appointment.',
            }[locale],
            path: '/',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component() {
        const locale = useLocale();

        const services = [
            {
                icon: StethoscopeIcon,
                title: { de: 'Medizinische Fußpflege', en: 'Medical foot-care' },
                body: { de: 'Hornhaut, Nagelpflege, Druckstellen.', en: 'Calluses, nail care, pressure points.' },
            },
            {
                icon: ShieldCheckIcon,
                title: { de: 'Diabetisches Fußsyndrom', en: 'Diabetic foot syndrome' },
                body: {
                    de: 'Behandlung mit Kassenabrechnung nach Verordnung.',
                    en: 'Treatment billed via statutory insurance with a prescription.',
                },
            },
            {
                icon: ActivityIcon,
                title: { de: 'Nagelkorrektur-Spangen', en: 'Nail-correction braces' },
                body: {
                    de: 'Bei eingewachsenen oder verformten Nägeln.',
                    en: 'For ingrown or deformed nails.',
                },
            },
        ] as const;

        const suggestedQuestions = [
            { de: 'Brauche ich eine Verordnung?', en: 'Do I need a prescription?' },
            { de: 'Was bringe ich zum ersten Termin mit?', en: 'What should I bring to the first appointment?' },
            { de: 'Übernimmt meine Krankenkasse das?', en: 'Will my health insurance cover this?' },
        ] as const;

        const credentials = [
            { icon: AwardIcon, label: { de: 'Staatliche Urkunde Podologie', en: 'State certificate in podiatry' } },
            { icon: BadgeCheckIcon, label: { de: 'Heilpraktikerin für Podologie (RLP)', en: 'Heilpraktiker for podiatry (RLP)' } },
            { icon: ShieldCheckIcon, label: { de: 'Hygiene nach RKI-Empfehlung', en: 'Hygiene per RKI recommendations' } },
        ] as const;

        return (
            <main>
                {/* 1. Hero */}
                <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <div>
                            <SectionEyebrow>{{ de: 'Praxis für Podologie', en: 'Practice for podiatry' }[locale]}</SectionEyebrow>
                            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                                {
                                    {
                                        de: 'Podologische Praxis in Dudenhofen — mit Kassenzulassung.',
                                        en: 'Podiatry practice in Dudenhofen — covered by statutory health insurance.',
                                    }[locale]
                                }
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Eine kleine, ruhige Praxis für Podologie und alles, was geübte Hände und Zeit braucht. Diabetisches Fußsyndrom, Nagelkorrekturen, Hornhautprobleme — schonend, fachlich fundiert, im rechtlich vollen Umfang.',
                                        en: 'A small, calm practice for podiatry and anything that needs trained hands and time. Diabetic foot syndrome, nail-correction, calluses — gentle, expert, within the full legal scope.',
                                    }[locale]
                                }
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Button variant="brand" size="lg" asChild>
                                    <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                                </Button>
                                <Button variant="brand-outline" size="lg" asChild>
                                    <Link to="/{-$locale}/leistungen">{{ de: 'Leistungen ansehen', en: 'View services' }[locale]}</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-aubergine/10 shadow-sm">
                                <img
                                    src="/podologie-dudenhofen-praxis.jpg"
                                    alt={
                                        {
                                            de: 'Innenansicht der Praxis Podologie Dudenhofen',
                                            en: 'Interior view of the Podologie Dudenhofen practice',
                                        }[locale]
                                    }
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Services overview */}
                <section className="bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <SectionEyebrow>{{ de: 'Leistungen', en: 'Services' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Wofür Sie kommen.', en: 'What we do.' }[locale]}
                        </h2>
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={service.title.de}
                                        className="rounded-xl border border-aubergine/10 bg-cream p-6 transition hover:-translate-y-0.5 hover:border-gold"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-md bg-blush p-2">
                                            <Icon className="size-5 text-aubergine" aria-hidden />
                                        </div>
                                        <h3 className="mt-4 font-serif text-xl font-semibold text-aubergine-dark">
                                            {service.title[locale]}
                                        </h3>
                                        <p className="mt-2 text-(--color-brand-charcoal-2)">{service.body[locale]}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-10 text-center">
                            <Link to="/{-$locale}/leistungen" className="font-medium text-aubergine hover:underline">
                                {{ de: 'Alle Leistungen ansehen →', en: 'View all services →' }[locale]}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 3. Inline AI chat entry card */}
                <section className="bg-blush">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <SectionEyebrow>{{ de: 'Fragen?', en: 'Questions?' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Brauche ich überhaupt einen Podologen?',
                                    en: 'Do I really need a podiatrist?',
                                }[locale]
                            }
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Bevor Sie anrufen — fragen Sie unseren Assistenten. Er hilft bei den häufigsten Fragen rund um Behandlungen, Verordnungen und den ersten Termin.',
                                    en: 'Before you call — ask our assistant. It helps with the most common questions on treatments, prescriptions, and the first visit.',
                                }[locale]
                            }
                        </p>
                        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-aubergine/10 bg-cream p-6">
                            <div className="flex flex-col gap-2">
                                {suggestedQuestions.map((q) => (
                                    <Link
                                        key={q.de}
                                        to="/{-$locale}/chat"
                                        search={{ chatId: undefined }}
                                        className="rounded-md border border-aubergine/20 px-4 py-3 text-left text-sm text-aubergine hover:bg-aubergine/5"
                                    >
                                        {q[locale]}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <p className="mt-4 text-center text-xs text-(--color-brand-charcoal-4)">
                            {
                                {
                                    de: 'Der Assistent gibt keine medizinische Beratung. Bei akuten Beschwerden bitte direkt anrufen.',
                                    en: 'The assistant does not provide medical advice. For acute concerns, please call us directly.',
                                }[locale]
                            }
                        </p>
                    </div>
                </section>

                {/* 4. Opening hours + map preview + address */}
                <section className="bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <div className="grid gap-12 md:grid-cols-2 md:items-start">
                            <div>
                                <SectionEyebrow>{{ de: 'Öffnungszeiten', en: 'Opening hours' }[locale]}</SectionEyebrow>
                                <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                    {{ de: 'Wir sind für Sie da.', en: 'We are here for you.' }[locale]}
                                </h2>
                                <dl className="mt-8 space-y-2 text-(--color-brand-charcoal-2)">
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">{{ de: 'Mo–Do', en: 'Mon–Thu' }[locale]}</dt>
                                        <dd>08:00 – 18:00</dd>
                                    </div>
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">{{ de: 'Fr', en: 'Fri' }[locale]}</dt>
                                        <dd>08:00 – 14:00</dd>
                                    </div>
                                    <div className="flex justify-between gap-6 border-b border-aubergine/10 py-2">
                                        <dt className="font-medium text-charcoal">{{ de: 'Sa & So', en: 'Sat & Sun' }[locale]}</dt>
                                        <dd>{{ de: 'geschlossen', en: 'closed' }[locale]}</dd>
                                    </div>
                                </dl>
                                <address className="mt-8 not-italic text-(--color-brand-charcoal-2)">
                                    <div className="font-medium text-charcoal">Annette Yilmaz</div>
                                    <div>Speyerer Straße 60</div>
                                    <div>67373 Dudenhofen</div>
                                </address>
                                <a
                                    href={`tel:${PRACTICE_PHONE_TEL}`}
                                    className="mt-6 inline-flex items-center gap-2 font-serif text-2xl text-aubergine hover:underline"
                                    aria-label={{ de: 'Praxis anrufen', en: 'Call the practice' }[locale]}
                                >
                                    <PhoneIcon className="size-5" aria-hidden />
                                    {PRACTICE_PHONE_HUMAN}
                                </a>
                            </div>
                            <div>
                                <div className="aspect-square overflow-hidden rounded-xl border border-aubergine/10">
                                    <iframe
                                        src="https://www.google.com/maps?q=Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen&output=embed"
                                        title={{ de: 'Karte: Podologie Dudenhofen', en: 'Map: Podologie Dudenhofen' }[locale]}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="h-full w-full border-0"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <Link to="/{-$locale}/kontakt" className="font-medium text-aubergine hover:underline">
                                        {{ de: 'Anfahrt & Kontakt →', en: 'Directions & contact →' }[locale]}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Credential strip */}
                <section className="bg-aubergine-dark text-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                                {{ de: 'Qualifikation', en: 'Credentials' }[locale]}
                            </span>
                            <span aria-hidden className="h-px flex-1 bg-gold/40" />
                        </div>
                        <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                            {
                                {
                                    de: 'Staatlich anerkannt. Heilpraktikerin für Podologie.',
                                    en: 'State-accredited. Heilpraktiker for podiatry.',
                                }[locale]
                            }
                        </h2>
                        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                            {credentials.map((credential) => {
                                const Icon = credential.icon;
                                return (
                                    <li key={credential.label.de} className="flex items-center gap-3 text-cream/80">
                                        <Icon className="size-5 text-gold" aria-hidden />
                                        <span>{credential.label[locale]}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-10">
                            <Link to="/{-$locale}/qualifikation" className="inline-flex items-center font-medium text-gold hover:underline">
                                {{ de: 'Mehr zur Qualifikation →', en: 'More on credentials →' }[locale]}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 6. Final CTA */}
                <section className="bg-cream">
                    <div className="mx-auto max-w-5xl px-6 py-20 text-center">
                        <h2 className="font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Termin? Wir rufen zurück.', en: 'Appointment? We will call you back.' }[locale]}
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Schreiben Sie eine kurze Nachricht — wir melden uns innerhalb eines Werktages.',
                                    en: 'Send a short message — we will get back to you within one working day.',
                                }[locale]
                            }
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <Button variant="brand" size="lg" asChild>
                                <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                            </Button>
                            <a
                                href={`tel:${PRACTICE_PHONE_TEL}`}
                                className="inline-flex items-center gap-2 text-sm text-(--color-brand-charcoal-2) hover:text-aubergine"
                            >
                                <PhoneIcon className="size-4" aria-hidden />
                                {PRACTICE_PHONE_HUMAN}
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        );
    },
});
