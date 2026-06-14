import { createFileRoute, Link } from '@tanstack/react-router';
import { ClockIcon, MapPinIcon, PhoneCallIcon, PhoneIcon } from 'lucide-react';
import { Fragment } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { KontaktPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/kontakt')({
    loader: () => routeLoaderGraphqlClient(KontaktPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        const addressLine = `${PRACTICE.address.street}, ${PRACTICE.address.postcode} ${PRACTICE.address.city}`;
        const weekdayHours = PRACTICE.hours[0].time[locale];
        const fridayHours = PRACTICE.hours[1].time[locale];
        return seoMeta({
            title: {
                de: 'Kontakt & Anfahrt — Speyerer Str. 60, Dudenhofen',
                en: 'Contact & directions — Speyerer Str. 60, Dudenhofen',
            }[locale],
            description: {
                de: `Kontakt zur ${PRACTICE.name} — Telefon ${formatPhoneNumber(PRACTICE.phone)}, ${addressLine}. Öffnungszeiten Mo–Do ${weekdayHours}, Fr ${fridayHours}. Anfahrt aus Speyer, Schifferstadt und Römerberg, Parkplätze direkt vor der Praxis.`,
                en: `Contact ${PRACTICE.name} — phone ${formatPhoneNumber(PRACTICE.phone)}, ${addressLine}. Opening hours Mon–Thu ${weekdayHours}, Fri ${fridayHours}. Easily reached from Speyer, Schifferstadt and Römerberg with parking right outside the practice.`,
            }[locale],
            path: '/kontakt',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home' }[locale], path: '/' },
                { name: { de: 'Kontakt', en: 'Contact' }[locale], path: '/kontakt' },
            ],
        });
    },
    component: KontaktPage,
});

function KontaktPage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero — cream */}
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Kontakt', en: 'Contact' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {{ de: 'So erreichen Sie uns.', en: 'How to reach us.' }[locale]}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Rufen Sie uns während unserer Anrufzeiten an — wir finden gemeinsam einen passenden Termin.',
                                en: 'Give us a call during our call hours — we will find a time that works together.',
                            }[locale]
                        }
                    </p>
                </Reveal>
            </section>

            {/* Kontaktdaten — cream */}
            <section id="kontaktdaten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Kontaktdaten', en: 'Contact details' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Auf einen Blick.', en: 'At a glance.' }[locale]}
                        </h2>
                    </Reveal>

                    <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                        {/* Telefon */}
                        <Reveal delayMs={0}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <PhoneIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Telefon', en: 'Phone' }[locale]}
                                    </span>
                                    <a
                                        href={`tel:${PRACTICE.phone}`}
                                        className="mt-1 inline-flex w-fit font-serif text-2xl text-aubergine transition-[color,transform] duration-150 ease-out hover:text-aubergine-dark active:scale-[0.98]"
                                    >
                                        {formatPhoneNumber(PRACTICE.phone)}
                                    </a>
                                    <span className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Am besten erreichbar während unserer Anrufzeiten.',
                                                en: 'Best reached during our call hours.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Anrufzeiten */}
                        <Reveal delayMs={80}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <PhoneCallIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Anrufzeiten', en: 'Call hours' }[locale]}
                                    </span>
                                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-charcoal">
                                        {PRACTICE.callHours.map((row) => (
                                            <Fragment key={row.days.de}>
                                                <dt className="font-serif text-base text-aubergine-dark">{row.days[locale]}</dt>
                                                <dd className={row.closed ? 'text-(--color-brand-charcoal-3)' : undefined}>
                                                    {row.time[locale]}
                                                </dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                    <span className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Wenn niemand abnimmt, sind wir gerade in Behandlung — bitte versuchen Sie es nach etwa 30 Minuten noch einmal.',
                                                en: 'If no one picks up we are with a patient — please try again in about 30 minutes.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Anschrift */}
                        <Reveal delayMs={160}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <MapPinIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Anschrift', en: 'Address' }[locale]}
                                    </span>
                                    <address className="mt-1 font-serif text-xl text-aubergine-dark not-italic">
                                        {PRACTICE.name}
                                        <br />
                                        {PRACTICE.person}
                                        <br />
                                        {PRACTICE.address.street}
                                        <br />
                                        {PRACTICE.address.postcode} {PRACTICE.address.city}
                                    </address>
                                    <span className="mt-2 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Eingang in der Ernst-Reuter-Straße (Eckhaus).',
                                                en: 'Entrance on Ernst-Reuter-Straße (corner building).',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>

                        {/* Öffnungszeiten */}
                        <Reveal delayMs={240}>
                            <div className="flex gap-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                    <ClockIcon className="size-5 text-aubergine" aria-hidden />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                        {{ de: 'Öffnungszeiten', en: 'Opening hours' }[locale]}
                                    </span>
                                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-charcoal">
                                        {PRACTICE.hours.map((row) => (
                                            <Fragment key={row.days.de}>
                                                <dt className="font-serif text-base text-aubergine-dark">{row.days[locale]}</dt>
                                                <dd className={row.closed ? 'text-(--color-brand-charcoal-3)' : undefined}>
                                                    {row.time[locale]}
                                                </dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                    <span className="mt-3 text-sm text-(--color-brand-charcoal-3)">
                                        {
                                            {
                                                de: 'Termine nach Vereinbarung.',
                                                en: 'By appointment.',
                                            }[locale]
                                        }
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Anfahrt — blush */}
            <section id="anfahrt" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Anfahrt', en: 'How to find us' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Mitten in Dudenhofen, gut zu erreichen.', en: 'In the heart of Dudenhofen, easy to reach.' }[locale]}
                        </h2>
                        <p className="mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Die Praxis liegt in Dudenhofen bei Speyer und ist gut erreichbar aus Speyer, Schifferstadt und Römerberg — mit dem Auto, dem Bus oder zu Fuß.',
                                    en: 'The practice sits in Dudenhofen near Speyer and is easily reached from Speyer, Schifferstadt and Römerberg — by car, bus or on foot.',
                                }[locale]
                            }
                        </p>

                        {/* Maps deep-links */}
                        <div className="mt-8 flex flex-row flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" asChild>
                                <a href={PRACTICE.maps.google} target="_blank" rel="noopener noreferrer">
                                    {{ de: 'Google Maps öffnen', en: 'Open Google Maps' }[locale]}
                                </a>
                            </Button>
                            <Button variant="brand-outline" asChild>
                                <a href={PRACTICE.maps.apple} target="_blank" rel="noopener noreferrer">
                                    {{ de: 'Apple Maps öffnen', en: 'Open Apple Maps' }[locale]}
                                </a>
                            </Button>
                        </div>
                    </Reveal>

                    {/* Embedded map */}
                    <Reveal delayMs={120}>
                        <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-aubergine/10">
                            <iframe
                                src={PRACTICE.maps.embed}
                                title={{ de: 'Karte: Podologie Dudenhofen', en: 'Map: Podologie Dudenhofen' }[locale]}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full border-0"
                            />
                        </div>
                        <p className="mt-3 text-xs text-(--color-brand-charcoal-3)">
                            {
                                {
                                    de: 'Die eingebettete Karte lädt Inhalte von Google. Wenn Sie das vermeiden möchten, nutzen Sie die Schaltflächen oben — Details in der ',
                                    en: 'The embedded map loads content from Google. If you would rather avoid that, use the buttons above — details in our ',
                                }[locale]
                            }
                            <Link to="/{-$locale}/datenschutz" className="text-aubergine hover:underline">
                                {{ de: 'Datenschutzerklärung', en: 'privacy policy' }[locale]}
                            </Link>
                            .
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <Reveal>
                            <h3 className="font-serif text-xl text-aubergine-dark">{{ de: 'Parkmöglichkeiten', en: 'Parking' }[locale]}</h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Kostenlose Straßenparkplätze gibt es in der Ernst-Reuter-Straße direkt vor dem Praxiseingang sowie auf der gegenüberliegenden Straßenseite. Der Zugang ist barrierefrei — auch mit Gehhilfe oder Rollstuhl.',
                                        en: 'Free street parking is available on Ernst-Reuter-Straße directly outside the entrance and on the opposite side of the street. Access is step-free, including with a walking aid or wheelchair.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <h3 className="font-serif text-xl text-aubergine-dark">{{ de: 'ÖPNV', en: 'Public transport' }[locale]}</h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Zwei Bushaltestellen liegen wenige Minuten zu Fuß entfernt: „Speyerer Straße" und „Boligweg" in Dudenhofen. Aus Speyer fahren regelmäßig die Linien 591 und 507.',
                                        en: 'Two bus stops are a few minutes\' walk away: "Speyerer Straße" and "Boligweg" in Dudenhofen. From Speyer, lines 591 and 507 run regularly.',
                                    }[locale]
                                }
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Anfrage — cream */}
            <section id="anfrage" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Terminanfrage', en: 'Appointment request' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Termin vereinbaren.', en: 'Book an appointment.' }[locale]}
                        </h2>

                        <div className="mt-10 rounded-2xl border border-aubergine/10 bg-blush/40 p-8 sm:p-10">
                            <p className="max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Bitte rufen Sie uns für Terminvereinbarungen direkt an. Ein Online-Formular folgt in Kürze.',
                                        en: 'For appointments, please call us directly. An online form will follow soon.',
                                    }[locale]
                                }
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                                <Button variant="brand" size="lg" asChild>
                                    <a href={`tel:${PRACTICE.phone}`}>{{ de: 'Jetzt anrufen', en: 'Call now' }[locale]}</a>
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
