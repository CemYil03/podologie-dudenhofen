import { createFileRoute, Link } from '@tanstack/react-router';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { KARRIERE_OFFERINGS, KARRIERE_REQUIREMENTS, KARRIERE_STEPS, KARRIERE_VALUE_CARDS } from '../../web/content/karriereContent';
import { KarrierePageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/karriere')({
    loader: () => routeLoaderGraphqlClient(KarrierePageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: {
                de: 'Karriere — Podologie-Praxis in Dudenhofen',
                en: 'Careers — podiatry practice in Dudenhofen',
            }[locale],
            description: {
                de: 'Stellenangebot und Initiativbewerbung — Podologie Dudenhofen sucht Podologinnen und Podologen mit Anspruch an Qualität und Hygiene.',
                en: 'Open roles and unsolicited applications — Podologie Dudenhofen is looking for podiatrists who care about quality and hygiene.',
            }[locale],
            path: '/karriere',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home' }[locale], path: '/' },
                { name: { de: 'Karriere', en: 'Careers' }[locale], path: '/karriere' },
            ],
        });
    },
    component: KarrierePage,
});

function KarrierePage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero */}
            <section id="hero" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Karriere', en: 'Careers' }[locale]}</SectionEyebrow>
                        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                            {
                                {
                                    de: 'Mitarbeiten in einer kleinen Praxis mit großem Anspruch.',
                                    en: 'Work with us in a small practice with high standards.',
                                }[locale]
                            }
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Wir suchen erfahrene oder gerade ausgebildete Podologinnen und Podologen, die Wert auf saubere Arbeit, gute Hygiene und Zeit für die Patientinnen und Patienten legen.',
                                    en: 'We are looking for experienced or newly qualified podiatrists who care about clean work, good hygiene and time for the patient.',
                                }[locale]
                            }
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" size="lg" asChild>
                                <Link to="/{-$locale}/kontakt">
                                    {{ de: 'Initiativbewerbung senden', en: 'Send unsolicited application' }[locale]}
                                </Link>
                            </Button>
                            <Button variant="brand-outline" size="lg" asChild>
                                <Link to="/{-$locale}/praxis">{{ de: 'Mehr über die Praxis', en: 'More about the practice' }[locale]}</Link>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Was uns ausmacht */}
            <section id="was-uns-ausmacht" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Was uns ausmacht', en: 'What sets us apart' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Wofür wir stehen — und wofür wir nicht stehen.',
                                    en: 'What we stand for — and what we do not.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {KARRIERE_VALUE_CARDS.map((card, index) => {
                            const Icon = card.icon!;
                            return (
                                <Reveal key={card.id} delayMs={index * 80}>
                                    <div
                                        id={card.id}
                                        className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                    >
                                        <div className="flex size-12 items-center justify-center rounded-lg bg-blush transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                            <Icon
                                                className="size-6 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="mt-5 font-serif text-xl font-semibold text-aubergine-dark">
                                            {card.heading[locale]}
                                        </h3>
                                        <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">{card.body[locale]}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Wen wir suchen */}
            <section id="wen-wir-suchen" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Wen wir suchen', en: "Who we're looking for" }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Zwei Wege in unsere Praxis.',
                                    en: 'Two ways into our practice.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <Reveal>
                            <div className="h-full rounded-xl border border-aubergine/10 bg-cream p-6">
                                <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                    {{ de: 'Podologin / Podologe (m/w/d)', en: 'Podiatrist (m/f/d)' }[locale]}
                                </h3>
                                <p className="mt-2 text-sm tracking-wide text-(--color-brand-charcoal-3) uppercase">
                                    {{ de: 'Voraussetzungen', en: 'Requirements' }[locale]}
                                </p>
                                <ul className="mt-4 space-y-2 text-(--color-brand-charcoal-2)">
                                    {KARRIERE_REQUIREMENTS.map((req) => (
                                        <li key={req.id} id={req.id} className="search-target flex scroll-mt-20 gap-3">
                                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                            <span className="leading-relaxed">{req.heading[locale]}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal delayMs={80}>
                            <div className="h-full rounded-xl border border-aubergine/10 bg-cream p-6">
                                <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                    {{ de: 'Auszubildende (m/w/d)', en: 'Trainees (m/f/d)' }[locale]}
                                </h3>
                                <p className="mt-4 leading-relaxed text-(--color-brand-charcoal-2)">
                                    {
                                        {
                                            de: 'Wir bieten gelegentlich Praktikumsplätze für Auszubildende der Podologie an. Schreiben Sie uns gern.',
                                            en: 'We occasionally offer internships for podiatry trainees. Feel free to get in touch.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Was wir bieten */}
            <section id="was-wir-bieten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Was wir bieten', en: 'What we offer' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Konditionen und Rahmen.',
                                    en: 'Conditions and framework.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <dl className="mt-10 divide-y divide-aubergine/10 border-y border-aubergine/10">
                        {KARRIERE_OFFERINGS.map((entry, index) => (
                            <Reveal key={entry.id} delayMs={index * 80}>
                                <div id={entry.id} className="search-target grid scroll-mt-20 gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                                    <dt className="font-serif text-lg font-semibold text-aubergine-dark">{entry.heading[locale]}</dt>
                                    <dd className="leading-relaxed text-(--color-brand-charcoal-2)">{entry.body[locale]}</dd>
                                </div>
                            </Reveal>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Bewerbung — dark aubergine */}
            <section id="bewerbung" className="scroll-mt-20 bg-aubergine-dark">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">
                        {{ de: 'Bewerbung', en: 'How to apply' }[locale]}
                    </p>
                    <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                        {
                            {
                                de: 'In drei Schritten zum Probetag.',
                                en: 'Three steps to a trial day.',
                            }[locale]
                        }
                    </h2>
                    <ol className="mt-10 grid gap-6 md:grid-cols-3">
                        {KARRIERE_STEPS.map((step, index) => (
                            <li
                                key={step.id}
                                id={step.id}
                                className="search-target scroll-mt-20 rounded-xl border border-gold/30 bg-aubergine-dark p-6"
                            >
                                <div className="flex size-10 items-center justify-center rounded-full border border-gold/50 font-mono text-sm text-gold">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-5 font-serif text-xl font-semibold text-cream">{step.heading[locale]}</h3>
                                <p className="mt-2 leading-relaxed text-cream/80">{step.body[locale]}</p>
                                {index === 0 ? (
                                    <p className="mt-3 text-sm text-cream/70">
                                        {{ de: 'Telefon', en: 'Phone' }[locale]}:{' '}
                                        <a href={`tel:${PRACTICE.phone}`} className="text-gold hover:underline">
                                            {formatPhoneNumber(PRACTICE.phone)}
                                        </a>
                                    </p>
                                ) : null}
                            </li>
                        ))}
                    </ol>
                    <div className="mt-12 flex flex-wrap items-center gap-3 *:flex-1 sm:*:flex-none">
                        <Button size="lg" asChild className="rounded-full bg-cream px-6 text-aubergine-dark hover:bg-cream/90">
                            <Link to="/{-$locale}/kontakt">
                                {{ de: 'Initiativbewerbung senden', en: 'Send unsolicited application' }[locale]}
                            </Link>
                        </Button>
                        <Button variant="link" asChild className="text-cream/80 hover:text-cream">
                            <a href={`tel:${PRACTICE.phone}`}>
                                {{ de: 'oder anrufen', en: 'or call' }[locale]}: {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
