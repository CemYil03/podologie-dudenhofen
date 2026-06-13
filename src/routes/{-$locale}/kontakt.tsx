import { createFileRoute } from '@tanstack/react-router';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { PRACTICE_PHONE_HUMAN, PRACTICE_PHONE_TEL } from '../../web/components/SiteHeader';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

const PRACTICE_EMAIL = 'podologie.annette@gmail.com';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/dir/53.5542316,9.9152351/Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen';
const APPLE_MAPS_URL =
    'https://maps.apple.com/directions?destination=Podologie+Annette+Yilmaz%2C+Speyerer+Stra%C3%9Fe+60+67373+Dudenhofen+Deutschland&destination-place-id=IE4D6102C9A687DCD&mode=driving';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=Podologie+Annette+Yilmaz,+Speyerer+Str.+60,+67373+Dudenhofen&output=embed';

export const Route = createFileRoute('/{-$locale}/kontakt')({
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Kontakt', en: 'Contact' }[locale],
            description: {
                de: `Kontakt zur Podologie Dudenhofen — Telefon ${PRACTICE_PHONE_HUMAN}, Speyerer Straße 60, 67373 Dudenhofen. Öffnungszeiten Mo–Do 08:00–18:00, Fr 08:00–14:00. Anfahrt aus Speyer, Schifferstadt und Römerberg, Parkplätze direkt vor der Praxis.`,
                en: `Contact Podologie Dudenhofen — phone ${PRACTICE_PHONE_HUMAN}, Speyerer Straße 60, 67373 Dudenhofen. Opening hours Mon–Thu 08:00–18:00, Fri 08:00–14:00. Easily reached from Speyer, Schifferstadt and Römerberg with parking right outside the practice.`,
            }[locale],
            path: '/kontakt',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: KontaktPage,
});

function KontaktPage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero — cream */}
            <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                <SectionEyebrow>{{ de: 'Kontakt', en: 'Contact' }[locale]}</SectionEyebrow>
                <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {{ de: 'So erreichen Sie uns.', en: 'How to reach us.' }[locale]}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Rufen Sie uns an oder schreiben Sie eine kurze Nachricht — wir melden uns zeitnah zurück und finden gemeinsam einen passenden Termin.',
                            en: 'Give us a call or send a short message — we will get back to you promptly and find a time that works.',
                        }[locale]
                    }
                </p>
            </section>

            {/* Kontaktdaten — cream */}
            <section id="kontaktdaten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Kontaktdaten', en: 'Contact details' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Auf einen Blick.', en: 'At a glance.' }[locale]}
                    </h2>

                    <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                        {/* Telefon */}
                        <div className="flex gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                <PhoneIcon className="size-5 text-aubergine" aria-hidden />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                    {{ de: 'Telefon', en: 'Phone' }[locale]}
                                </span>
                                <a
                                    href={`tel:${PRACTICE_PHONE_TEL}`}
                                    className="mt-1 font-serif text-2xl text-aubergine transition-colors hover:text-aubergine-dark"
                                >
                                    {PRACTICE_PHONE_HUMAN}
                                </a>
                                <span className="mt-1 text-sm text-(--color-brand-charcoal-3)">
                                    {
                                        {
                                            de: 'Mo–Fr während der Öffnungszeiten',
                                            en: 'Mon–Fri during opening hours',
                                        }[locale]
                                    }
                                </span>
                            </div>
                        </div>

                        {/* E-Mail */}
                        <div className="flex gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                <MailIcon className="size-5 text-aubergine" aria-hidden />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                    {{ de: 'E-Mail', en: 'Email' }[locale]}
                                </span>
                                <a
                                    href={`mailto:${PRACTICE_EMAIL}`}
                                    className="mt-1 font-serif text-2xl text-aubergine transition-colors hover:text-aubergine-dark"
                                >
                                    {PRACTICE_EMAIL}
                                </a>
                                <span className="mt-1 text-sm text-(--color-brand-charcoal-3)">
                                    {
                                        {
                                            de: 'Wir antworten in der Regel innerhalb eines Werktags.',
                                            en: 'We usually reply within one business day.',
                                        }[locale]
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Anschrift */}
                        <div className="flex gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                <MapPinIcon className="size-5 text-aubergine" aria-hidden />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                    {{ de: 'Anschrift', en: 'Address' }[locale]}
                                </span>
                                <address className="mt-1 font-serif text-xl text-aubergine-dark not-italic">
                                    Podologie Dudenhofen
                                    <br />
                                    Annette Yilmaz
                                    <br />
                                    Speyerer Straße 60
                                    <br />
                                    67373 Dudenhofen
                                </address>
                            </div>
                        </div>

                        {/* Öffnungszeiten */}
                        <div className="flex gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blush">
                                <ClockIcon className="size-5 text-aubergine" aria-hidden />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium tracking-wide text-sage uppercase">
                                    {{ de: 'Öffnungszeiten', en: 'Opening hours' }[locale]}
                                </span>
                                <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-charcoal">
                                    <dt className="font-serif text-base text-aubergine-dark">{{ de: 'Mo–Do', en: 'Mon–Thu' }[locale]}</dt>
                                    <dd>08:00 – 18:00</dd>
                                    <dt className="font-serif text-base text-aubergine-dark">{{ de: 'Fr', en: 'Fri' }[locale]}</dt>
                                    <dd>08:00 – 14:00</dd>
                                    <dt className="font-serif text-base text-aubergine-dark">
                                        {{ de: 'Sa & So', en: 'Sat & Sun' }[locale]}
                                    </dt>
                                    <dd className="text-(--color-brand-charcoal-3)">{{ de: 'geschlossen', en: 'closed' }[locale]}</dd>
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
                    </div>
                </div>
            </section>

            {/* Anfahrt — blush */}
            <section id="anfahrt" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
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
                            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                                {{ de: 'Google Maps öffnen', en: 'Open Google Maps' }[locale]}
                            </a>
                        </Button>
                        <Button variant="brand-outline" asChild>
                            <a href={APPLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                                {{ de: 'Apple Maps öffnen', en: 'Open Apple Maps' }[locale]}
                            </a>
                        </Button>
                    </div>

                    {/* Embedded map */}
                    <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-aubergine/10">
                        <iframe
                            src={MAP_EMBED_URL}
                            title={{ de: 'Karte: Podologie Dudenhofen', en: 'Map: Podologie Dudenhofen' }[locale]}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-full w-full border-0"
                        />
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="font-serif text-xl text-aubergine-dark">{{ de: 'ÖPNV', en: 'Public transport' }[locale]}</h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Die Bushaltestelle „Dudenhofen Mitte" liegt wenige Minuten zu Fuß entfernt; aus Speyer fährt regelmäßig die Linie X.',
                                        en: 'The "Dudenhofen Mitte" bus stop is a few minutes\' walk away; line X runs regularly from Speyer.',
                                    }[locale]
                                }
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl text-aubergine-dark">{{ de: 'Parkmöglichkeiten', en: 'Parking' }[locale]}</h3>
                            <p className="mt-3 text-(--color-brand-charcoal-2)">
                                {
                                    {
                                        de: 'Direkt vor der Praxis stehen kostenlose Straßenparkplätze zur Verfügung. Der Zugang zur Praxis ist barrierefrei.',
                                        en: 'Free street parking is available right outside the practice. Access to the practice is step-free.',
                                    }[locale]
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Anfrage — cream */}
            <section id="anfrage" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Terminanfrage', en: 'Appointment request' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {{ de: 'Termin vereinbaren.', en: 'Book an appointment.' }[locale]}
                    </h2>

                    <div className="mt-10 rounded-2xl border border-aubergine/10 bg-blush/40 p-8 sm:p-10">
                        <p className="max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Bitte rufen Sie uns für Terminvereinbarungen direkt an oder schreiben Sie eine kurze E-Mail. Ein Online-Formular folgt in Kürze.',
                                    en: 'For appointments, please call us directly or send a short email. An online form will follow soon.',
                                }[locale]
                            }
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" size="lg" asChild>
                                <a href={`tel:${PRACTICE_PHONE_TEL}`}>{{ de: 'Jetzt anrufen', en: 'Call now' }[locale]}</a>
                            </Button>
                            <Button variant="brand-outline" size="lg" asChild>
                                <a href={`mailto:${PRACTICE_EMAIL}`}>{{ de: 'E-Mail schreiben', en: 'Send email' }[locale]}</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
