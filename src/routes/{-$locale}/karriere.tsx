import { createFileRoute, Link } from '@tanstack/react-router';
import { ClockIcon, GraduationCapIcon, HandshakeIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
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
            title: { de: 'Karriere', en: 'Careers' }[locale],
            description: {
                de: 'Stellenangebot und Initiativbewerbung — Podologie Dudenhofen sucht Podologinnen und Podologen mit Anspruch an Qualität und Hygiene.',
                en: 'Open roles and unsolicited applications — Podologie Dudenhofen is looking for podiatrists who care about quality and hygiene.',
            }[locale],
            path: '/karriere',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: KarrierePage,
});

function KarrierePage() {
    const locale = useLocale();

    const valueCards = [
        {
            icon: ClockIcon,
            title: { de: 'Zeit pro Behandlung', en: 'Time per treatment' },
            body: {
                de: 'Keine 20-Minuten-Termine. Wir nehmen uns die Zeit, die der Fuß braucht.',
                en: 'No 20-minute slots. We take the time each foot actually needs.',
            },
        },
        {
            icon: ShieldCheckIcon,
            title: { de: 'Hygiene auf Praxisniveau', en: 'Hygiene at practice level' },
            body: {
                de: 'Thermische Desinfektion und Sterilisation der Instrumente nach RKI-Empfehlung.',
                en: 'Thermal disinfection and sterilisation of instruments following RKI guidelines.',
            },
        },
        {
            icon: GraduationCapIcon,
            title: { de: 'Fortbildungen', en: 'Continuing education' },
            body: {
                de: 'Wir unterstützen Weiterbildungen aktiv, fachlich und finanziell.',
                en: 'We actively support further training — both professionally and financially.',
            },
        },
        {
            icon: HandshakeIcon,
            title: { de: 'Kollegiales Miteinander', en: 'Collegial atmosphere' },
            body: {
                de: 'Kleine Praxis, kurze Wege, ehrliche Absprachen.',
                en: 'Small practice, short paths, honest agreements.',
            },
        },
    ];

    const requirements: ReadonlyArray<{ de: string; en: string }> = [
        {
            de: 'Staatliche Anerkennung als Podologin / Podologe',
            en: 'State-recognised qualification as a podiatrist',
        },
        {
            de: 'Sicheres Arbeiten beim diabetischen Fußsyndrom (DFS)',
            en: 'Confident treatment of patients with diabetic foot syndrome (DFS)',
        },
        {
            de: 'Idealerweise Erfahrung mit Nagelkorrektur-Spangen',
            en: 'Ideally experience with nail-correction braces',
        },
        {
            de: 'Empathischer Umgang mit älteren Patientinnen und Patienten',
            en: 'Empathetic manner with elderly patients',
        },
        {
            de: 'Deutschkenntnisse auf Konversationsniveau',
            en: 'Conversational German',
        },
    ];

    const offerings: ReadonlyArray<{ key: { de: string; en: string }; value: { de: string; en: string } }> = [
        {
            key: { de: 'Anstellung', en: 'Employment' },
            value: { de: 'Voll- oder Teilzeit, nach Absprache', en: 'Full-time or part-time, by arrangement' },
        },
        {
            key: { de: 'Vergütung', en: 'Compensation' },
            value: {
                de: 'Fair, leistungsgerecht, im Gespräch klärbar',
                en: 'Fair, performance-based, settled in conversation',
            },
        },
        {
            key: { de: 'Fortbildungsbudget', en: 'Training budget' },
            value: { de: 'Jährlich, schriftlich vereinbart', en: 'Annual, agreed in writing' },
        },
        {
            key: { de: 'Ausstattung', en: 'Equipment' },
            value: {
                de: 'Moderne Behandlungseinheiten, ergonomisches Arbeiten',
                en: 'Modern treatment units, ergonomic working environment',
            },
        },
        {
            key: { de: 'Praxisstandort', en: 'Location' },
            value: {
                de: 'Dudenhofen bei Speyer, gute Anbindung',
                en: 'Dudenhofen near Speyer, well connected',
            },
        },
        {
            key: { de: 'Stammkundschaft', en: 'Patient base' },
            value: {
                de: 'Gewachsene Stammkundschaft, Hausbesuche im Umkreis',
                en: 'Established, many regulars, house calls in the surrounding area',
            },
        },
    ];

    const steps = [
        {
            title: { de: 'Schreiben Sie uns', en: 'Get in touch' },
            body: {
                de: `Eine kurze Mail oder ein Anruf reicht. Adresse: ${PRACTICE.email}.`,
                en: `A short email or phone call is enough. Address: ${PRACTICE.email}.`,
            },
        },
        {
            title: { de: 'Kennenlernen', en: 'Meet in person' },
            body: {
                de: 'Wir vereinbaren ein lockeres Gespräch in der Praxis.',
                en: 'We arrange a relaxed conversation at the practice.',
            },
        },
        {
            title: { de: 'Probetag', en: 'Trial day' },
            body: {
                de: 'Ein bezahlter Probetag — bevor irgendjemand etwas unterschreibt.',
                en: 'A paid trial day — before anyone signs anything.',
            },
        },
    ];

    return (
        <main>
            {/* Hero */}
            <section id="hero" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
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
                </div>
            </section>

            {/* Was uns ausmacht */}
            <section id="was-uns-ausmacht" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Was uns ausmacht', en: 'What sets us apart' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Wofür wir stehen — und wofür wir nicht stehen.',
                                en: 'What we stand for — and what we do not.',
                            }[locale]
                        }
                    </h2>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2">
                        {valueCards.map(({ icon: Icon, title, body }) => (
                            <div key={title.de} className="rounded-xl border border-aubergine/10 bg-cream p-6">
                                <div className="flex size-12 items-center justify-center rounded-lg bg-blush">
                                    <Icon className="size-6 text-aubergine" aria-hidden />
                                </div>
                                <h3 className="mt-5 font-serif text-xl font-semibold text-aubergine-dark">{title[locale]}</h3>
                                <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">{body[locale]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wen wir suchen */}
            <section id="wen-wir-suchen" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Wen wir suchen', en: "Who we're looking for" }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Zwei Wege in unsere Praxis.',
                                en: 'Two ways into our practice.',
                            }[locale]
                        }
                    </h2>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-aubergine/10 bg-cream p-6">
                            <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                {{ de: 'Podologin / Podologe (m/w/d)', en: 'Podiatrist (m/f/d)' }[locale]}
                            </h3>
                            <p className="mt-2 text-sm tracking-wide text-(--color-brand-charcoal-3) uppercase">
                                {{ de: 'Voraussetzungen', en: 'Requirements' }[locale]}
                            </p>
                            <ul className="mt-4 space-y-2 text-(--color-brand-charcoal-2)">
                                {requirements.map((req) => (
                                    <li key={req.de} className="flex gap-3">
                                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-aubergine/60" />
                                        <span className="leading-relaxed">{req[locale]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-xl border border-aubergine/10 bg-cream p-6">
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
                    </div>
                </div>
            </section>

            {/* Was wir bieten */}
            <section id="was-wir-bieten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <SectionEyebrow>{{ de: 'Was wir bieten', en: 'What we offer' }[locale]}</SectionEyebrow>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Konditionen und Rahmen.',
                                en: 'Conditions and framework.',
                            }[locale]
                        }
                    </h2>
                    <dl className="mt-10 divide-y divide-aubergine/10 border-y border-aubergine/10">
                        {offerings.map((entry) => (
                            <div key={entry.key.de} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                                <dt className="font-serif text-lg font-semibold text-aubergine-dark">{entry.key[locale]}</dt>
                                <dd className="leading-relaxed text-(--color-brand-charcoal-2)">{entry.value[locale]}</dd>
                            </div>
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
                        {steps.map((step, index) => (
                            <li key={step.title.de} className="rounded-xl border border-gold/30 bg-aubergine-dark p-6">
                                <div className="flex size-10 items-center justify-center rounded-full border border-gold/50 font-mono text-sm text-gold">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <h3 className="mt-5 font-serif text-xl font-semibold text-cream">{step.title[locale]}</h3>
                                <p className="mt-2 leading-relaxed text-cream/80">{step.body[locale]}</p>
                                {index === 0 ? (
                                    <p className="mt-3 text-sm text-cream/70">
                                        {{ de: 'Telefon', en: 'Phone' }[locale]}:{' '}
                                        <a href={`tel:${PRACTICE.phone.tel}`} className="text-gold hover:underline">
                                            {PRACTICE.phone.human}
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
                            <a href={`tel:${PRACTICE.phone.tel}`}>
                                {{ de: 'oder anrufen', en: 'or call' }[locale]}: {PRACTICE.phone.human}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
