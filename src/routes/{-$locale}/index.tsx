import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../../web/components/base/button';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
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
                de: 'Podologie Dudenhofen — Praxis für medizinische Fußpflege mit Krankenkassenzulassung in Dudenhofen.',
                en: 'Podologie Dudenhofen — medical foot-care practice with statutory health-insurance accreditation in Dudenhofen.',
            }[locale],
            path: '/',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component() {
        const locale = useLocale();

        return (
            <main>
                <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                    <SectionEyebrow>{{ de: 'Werdegang', en: 'About' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Podologin mit Krankenkassenzulassung und Heilpraktikerin für Podologie',
                                en: 'Podiatrist with statutory health-insurance accreditation and licensed Heilpraktiker for podiatry',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-brand-charcoal-2)]">
                        {
                            {
                                de: 'Eine kleine, ruhige Praxis in Dudenhofen — für medizinische Fußpflege, Nagelkorrekturen und alles, was geübte Hände und Zeit braucht.',
                                en: 'A small, calm practice in Dudenhofen — for medical foot-care, nail-correction and anything that needs trained hands and time.',
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
                </section>

                <section className="bg-blush">
                    <div className="mx-auto max-w-5xl px-6 py-20">
                        <SectionEyebrow>{{ de: 'Geschichte', en: 'Story' }[locale]}</SectionEyebrow>
                        <p className="mt-6 max-w-3xl font-serif text-2xl leading-relaxed font-light text-aubergine-dark italic sm:text-3xl">
                            {
                                {
                                    de: '„Im Jahr 2008 habe ich meine erste Ausbildung im Bereich der kosmetischen Fußpflege gemacht — und seitdem ist daraus eine Berufung geworden."',
                                    en: '"I trained in cosmetic foot-care in 2008 — and what started as a craft has grown into a calling."',
                                }[locale]
                            }
                        </p>
                        <div className="mt-10 grid gap-4 max-w-2xl text-[var(--color-brand-charcoal-2)]">
                            <p>
                                {
                                    {
                                        de: 'Mit der ersten Ausbildung durfte ich nur kosmetisch arbeiten. Liebgewonnene Kunden konnte ich nicht weiter behandeln, sobald sie an Diabetes erkrankten oder Nägel einwuchsen.',
                                        en: 'With that first training I was only allowed to work cosmetically. Patients I had come to know could no longer be treated once diabetes set in or a nail began to ingrow.',
                                    }[locale]
                                }
                            </p>
                            <p>
                                {
                                    {
                                        de: 'Aus diesem Grund habe ich mich an einer Podologie-Schule angemeldet und die dreijährige Ausbildung mit abschließendem Staatsexamen absolviert.',
                                        en: 'So I enrolled at a podiatry school and completed the three-year programme with the German state examination.',
                                    }[locale]
                                }
                            </p>
                            <p>
                                {
                                    {
                                        de: 'Am 02.09.2017 habe ich die Prüfung zum sektoralen Heilpraktiker für Podologie bestanden, anerkannt am 22.03.2022 in Rheinland-Pfalz.',
                                        en: 'On 02.09.2017 I passed the examination for the sectoral Heilpraktiker for podiatry, recognised on 22.03.2022 in Rhineland-Palatinate.',
                                    }[locale]
                                }
                            </p>
                            <p className="text-sm text-[var(--color-brand-charcoal-4)]">
                                {
                                    {
                                        de: 'Als Podologin mit Kassenzulassung besuche ich regelmäßig Fortbildungen, um meine Patientinnen und Patienten auf dem aktuellen Stand zu behandeln.',
                                        en: 'As an accredited podiatrist I attend continuing-education courses regularly so that my patients are treated to current standards.',
                                    }[locale]
                                }
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        );
    },
});
