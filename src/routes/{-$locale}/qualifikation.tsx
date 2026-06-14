import { createFileRoute, Link } from '@tanstack/react-router';
import { BadgeCheckIcon } from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { QualifikationPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/qualifikation')({
    loader: () => routeLoaderGraphqlClient(QualifikationPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Qualifikation', en: 'Credentials' }[locale],
            description: {
                de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie — die Qualifikationen hinter der Praxis in Dudenhofen, mit Urkunden zur Einsicht.',
                en: 'State-licensed podiatrist and Heilpraktiker for podiatry — the qualifications behind the practice in Dudenhofen, with the official certificates on file.',
            }[locale],
            path: '/qualifikation',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: QualifikationPage,
});

function QualifikationPage() {
    const locale = useLocale();

    return (
        <main>
            {/* 1. Hero — cream */}
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Qualifikation', en: 'Credentials' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Staatlich anerkannte Podologin & Heilpraktikerin für Podologie',
                                en: 'State-licensed podiatrist and Heilpraktiker for podiatry',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Zwei Qualifikationen — eine staatlich geregelte Ausbildung und eine zusätzliche Heilkunde-Erlaubnis — bedeuten für Sie: schonend, fundiert und im rechtlich vollen Umfang behandelt.',
                                en: 'Two qualifications — a state-regulated training and an additional licence to practise healing — mean for you: gentle, well-founded care within the full legal scope.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/leistungen">{{ de: 'Leistungen ansehen', en: 'View services' }[locale]}</Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                        </Button>
                    </div>
                </Reveal>
            </section>

            {/* 2. Podologie — cream */}
            <section id="podologie" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="grid gap-12 md:grid-cols-[1fr_20rem]">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Podologie', en: 'Podiatry' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {{ de: 'Was ist Podologie?', en: 'What is podiatry?' }[locale]}
                            </h2>
                            <div className="mt-8 grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Podologie ist die nicht-ärztliche Heilkunde am Fuß. Im Unterschied zur kosmetischen Fußpflege darf eine staatlich anerkannte Podologin auch krankhafte Veränderungen behandeln — bei Diabetes, Durchblutungsstörungen oder neurologischen Erkrankungen.',
                                            en: 'Podiatry is non-medical foot healthcare. Unlike cosmetic foot-care, a state-licensed podiatrist is also permitted to treat pathological conditions — in cases of diabetes, circulatory disorders or neurological disease.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Die Ausbildung ist im Podologengesetz (PodG) geregelt: dreijährige Vollzeitausbildung mit Staatsexamen.',
                                            en: 'The training is governed by the German Podiatrists Act (PodG): a three-year full-time programme concluding with the state examination.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <aside className="bg-blush rounded-xl border border-aubergine/10 p-6 self-start">
                                <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                    {{ de: 'Auf einen Blick', en: 'At a glance' }[locale]}
                                </h3>
                                <ul className="mt-4 grid gap-3 text-sm text-(--color-brand-charcoal-2)">
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {{ de: 'Geregelt nach Podologengesetz', en: 'Governed by the Podiatrists Act' }[locale]}
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: '3-jährige Ausbildung mit Staatsexamen',
                                                    en: '3-year training with state examination',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Kassenabrechnung möglich (mit Verordnung)',
                                                    en: 'Statutory health-insurance billing available (with prescription)',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </aside>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 3. Heilpraktiker — blush */}
            <section id="heilpraktiker" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="grid gap-12 md:grid-cols-[1fr_20rem]">
                        <Reveal>
                            <SectionEyebrow>{{ de: 'Heilpraktiker', en: 'Heilpraktiker' }[locale]}</SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Heilpraktikerin für Podologie',
                                        en: 'Heilpraktiker for podiatry',
                                    }[locale]
                                }
                            </h2>
                            <div className="mt-8 grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Die sektorale Heilpraktiker-Erlaubnis erweitert den rechtlichen Rahmen über die reine Podologie hinaus: Behandlungen, die sonst nur ärztlich oder von vollumfänglichen Heilpraktikerinnen und Heilpraktikern durchgeführt werden dürfen, sind im Bereich der Podologie eigenständig möglich.',
                                            en: 'The sectoral Heilpraktiker licence extends the legal scope beyond podiatry alone: treatments otherwise reserved for physicians or full Heilpraktiker may be carried out independently within the podiatric field.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Konkret: ich darf u.a. eine eigenständige Befunderhebung machen, lokale Anästhetika anwenden und Wunden behandeln — alles streng innerhalb des Fachgebiets.',
                                            en: 'Concretely: I am permitted to make my own clinical assessments, apply local anaesthetics and treat wounds — all strictly within the specialist field.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <aside className="bg-cream rounded-xl border border-aubergine/10 p-6 self-start">
                                <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                    {{ de: 'Auf einen Blick', en: 'At a glance' }[locale]}
                                </h3>
                                <ul className="mt-4 grid gap-3 text-sm text-(--color-brand-charcoal-2)">
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Sektorale Heilpraktiker-Erlaubnis',
                                                    en: 'Sectoral Heilpraktiker licence',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Anerkannt in Rheinland-Pfalz',
                                                    en: 'Recognised in Rhineland-Palatinate',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Erweiterter Behandlungsumfang am Fuß',
                                                    en: 'Extended treatment scope on the foot',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                </ul>
                            </aside>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* 4. Urkunden — dark aubergine */}
            <section id="urkunden" className="scroll-mt-20 bg-aubergine-dark text-cream">
                <div className="mx-auto max-w-5xl px-6 py-20 text-center">
                    <div className="mx-auto max-w-2xl">
                        <SectionEyebrow className="text-gold">{{ de: 'Urkunden', en: 'Certificates' }[locale]}</SectionEyebrow>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <BadgeCheckIcon className="h-7 w-7 text-gold" strokeWidth={1.75} />
                            <h2 className="font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                                {
                                    {
                                        de: 'Mit Brief und Siegel',
                                        en: 'Signed and sealed',
                                    }[locale]
                                }
                            </h2>
                        </div>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
                        <figure>
                            <img
                                src="/urkunden/annette-yilmaz-podologin.png"
                                alt={
                                    {
                                        de: 'Staatliche Urkunde Podologin — Annette Yilmaz',
                                        en: 'State certificate as podiatrist — Annette Yilmaz',
                                    }[locale]
                                }
                                loading="lazy"
                                className="mx-auto h-auto w-full rounded-lg border border-gold/30 shadow-lg"
                            />
                            <figcaption className="mx-auto mt-4 text-sm text-cream/80">
                                {
                                    {
                                        de: 'Urkunde über die staatliche Anerkennung als Podologin.',
                                        en: 'Certificate of state recognition as a podiatrist.',
                                    }[locale]
                                }
                            </figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/urkunden/annette-yilmaz-heilpraktikerin.png"
                                alt={
                                    {
                                        de: 'Urkunde Heilpraktikerin für Podologie — Annette Yilmaz',
                                        en: 'Certificate as Heilpraktiker for podiatry — Annette Yilmaz',
                                    }[locale]
                                }
                                loading="lazy"
                                className="mx-auto h-auto w-full rounded-lg border border-gold/30 shadow-lg"
                            />
                            <figcaption className="mx-auto mt-4 text-sm text-cream/80">
                                {
                                    {
                                        de: 'Urkunde über die Erlaubnis zur Ausübung der Heilkunde, beschränkt auf das Gebiet der Podologie.',
                                        en: 'Certificate of licence to practise healing, restricted to the field of podiatry.',
                                    }[locale]
                                }
                            </figcaption>
                        </figure>
                    </div>

                    <div className="mx-auto mt-12 max-w-2xl text-left">
                        <h3 className="font-serif text-xl font-semibold text-cream">{{ de: 'Zertifikate', en: 'Certificates' }[locale]}</h3>
                        <dl className="mt-6 grid gap-5 border-t border-gold/20 pt-6">
                            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6">
                                <dt className="font-medium text-cream">
                                    {
                                        {
                                            de: 'Podologin (staatlich anerkannt)',
                                            en: 'Podiatrist (state-licensed)',
                                        }[locale]
                                    }
                                </dt>
                                <dd className="text-sm text-cream/80">{{ de: 'Bundesweit gültig', en: 'Valid nationwide' }[locale]}</dd>
                            </div>
                            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6 border-t border-gold/10 pt-5">
                                <dt className="font-medium text-cream">
                                    {
                                        {
                                            de: 'Heilpraktikerin für Podologie',
                                            en: 'Heilpraktiker for podiatry',
                                        }[locale]
                                    }
                                </dt>
                                <dd className="text-sm text-cream/80">
                                    {
                                        {
                                            de: 'Anerkannt in Rheinland-Pfalz, 22.03.2022',
                                            en: 'Recognised in Rhineland-Palatinate, 22.03.2022',
                                        }[locale]
                                    }
                                </dd>
                            </div>
                            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6 border-t border-gold/10 pt-5">
                                <dt className="font-medium text-cream">
                                    {
                                        {
                                            de: 'Prüfungsdatum HP für Podologie',
                                            en: 'Examination date — HP for podiatry',
                                        }[locale]
                                    }
                                </dt>
                                <dd className="text-sm text-cream/80">02.09.2017</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>

            {/* 5. Final CTA — cream */}
            <section id="termin" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20 text-center">
                <Reveal>
                    <h2 className="font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                        {
                            {
                                de: 'Lernen Sie die Praxis kennen',
                                en: 'Get to know the practice',
                            }[locale]
                        }
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Vereinbaren Sie einen Termin oder werfen Sie zuerst einen Blick in die Räume und die Ausstattung.',
                                en: 'Request an appointment, or take a look at the rooms and equipment first.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/praxis">{{ de: 'Mehr zur Praxis', en: 'More about the practice' }[locale]}</Link>
                        </Button>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
