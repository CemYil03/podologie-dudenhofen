import { createFileRoute, Link } from '@tanstack/react-router';
import { PackageIcon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { PraxisPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/praxis')({
    loader: () => routeLoaderGraphqlClient(PraxisPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Praxis', en: 'Practice' }[locale],
            description: {
                de: 'Podologie Dudenhofen — barrierefreie Räume, Therapeutin Annette Yilmaz und Hygiene nach RKI-Empfehlung.',
                en: 'Podologie Dudenhofen — barrier-free rooms, podiatrist Annette Yilmaz and hygiene to RKI standard.',
            }[locale],
            path: '/praxis',
            locale,
            webPageUrl: webPageUrlGet(),
        });
    },
    component: PraxisPage,
});

function PraxisPage() {
    const locale = useLocale();

    return (
        <main>
            <section className="mx-auto max-w-5xl px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Praxis', en: 'Practice' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Eine ruhige Praxis in Dudenhofen — Räume, Therapeutin, Hygiene.',
                                en: 'A calm practice in Dudenhofen — rooms, therapist, hygiene.',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Bei mir wird immer nur eine Patientin oder ein Patient behandelt — mit Zeit, geübten Händen und sauber aufbereitetem Instrumentarium.',
                                en: 'Only one patient is treated at a time — with time, trained hands and properly reprocessed instruments.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">{{ de: 'Termin anfragen', en: 'Request appointment' }[locale]}</Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/leistungen">{{ de: 'Leistungen ansehen', en: 'View services' }[locale]}</Link>
                        </Button>
                    </div>
                </Reveal>
            </section>

            <section id="raeume" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Räume', en: 'Rooms' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Barrierefrei, ruhig, klimatisiert.',
                                    en: 'Barrier-free, calm and air-conditioned.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
                        <Reveal>
                            <img
                                src="/podologie-dudenhofen-praxis.jpg"
                                alt={
                                    {
                                        de: 'Behandlungsraum der Podologie-Praxis Dudenhofen mit Behandlungsstuhl und Lampe.',
                                        en: 'Treatment room of the Dudenhofen podiatry practice with treatment chair and lamp.',
                                    }[locale]
                                }
                                loading="lazy"
                                className="w-full rounded-xl border border-aubergine/10 object-cover shadow-sm"
                            />
                        </Reveal>
                        <Reveal delayMs={120}>
                            <div className="grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Die Praxis ist ebenerdig und barrierefrei zugänglich — auch mit Rollator oder Rollstuhl. Behandelt wird im Liegen oder Sitzen, je nachdem, was Ihnen angenehmer ist.',
                                            en: 'The practice is on ground level and barrier-free — accessible with a walker or wheelchair. Treatment takes place lying down or seated, whichever is more comfortable for you.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Es ist immer nur eine Patientin oder ein Patient zur Zeit im Raum. Kein Wartezimmer-Trubel, keine parallelen Behandlungen — die Zeit gehört Ihnen.',
                                            en: 'Only one patient is in the room at a time. No busy waiting room, no parallel treatments — the time is yours.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Der Raum ist klimatisiert und gut belüftet und mit medizinischer Behandlungseinheit, Lupenleuchte und Absaugung ausgestattet. Alles, was für eine saubere podologische Behandlung gebraucht wird — nicht mehr, nicht weniger.',
                                            en: 'The room is air-conditioned and well-ventilated, equipped with a medical treatment unit, magnifying lamp and suction. Everything a clean podiatric treatment requires — no more, no less.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section id="therapeutin" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Therapeutin', en: 'Therapist' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Annette Yilmaz — Podologin und sektorale Heilpraktikerin.',
                                    en: 'Annette Yilmaz — podiatrist and sectoral Heilpraktiker.',
                                }[locale]
                            }
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
                        <Reveal>
                            <img
                                src="/podologie-dudenhofen-annette-yilmaz.jpg"
                                alt={
                                    {
                                        de: 'Annette Yilmaz, Podologin in Dudenhofen.',
                                        en: 'Annette Yilmaz, podiatrist in Dudenhofen.',
                                    }[locale]
                                }
                                loading="lazy"
                                className="w-full rounded-xl border border-aubergine/10 object-cover shadow-sm"
                            />
                        </Reveal>
                        <Reveal delayMs={120}>
                            <div className="grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Im Jahr 2008 habe ich meine erste Ausbildung im Bereich der kosmetischen Fußpflege gemacht. Schnell wurde klar, dass mir der medizinische Teil — Diabetes, eingewachsene Nägel, Druckstellen — fehlt, um meine Patientinnen und Patienten vollständig betreuen zu können.',
                                            en: 'I trained in cosmetic foot-care in 2008. It quickly became clear that the medical side — diabetes, ingrown nails, pressure points — was what I needed in order to look after my patients fully.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Daraufhin habe ich die dreijährige Ausbildung an einer Podologie-Schule absolviert und mit dem Staatsexamen abgeschlossen. Am 02.09.2017 habe ich die Prüfung zum sektoralen Heilpraktiker für Podologie bestanden, anerkannt am 22.03.2022 in Rheinland-Pfalz.',
                                            en: 'I then completed the three-year programme at a podiatry school with the German state examination. On 02.09.2017 I passed the examination for the sectoral Heilpraktiker for podiatry, recognised on 22.03.2022 in Rhineland-Palatinate.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Als Podologin mit Kassenzulassung besuche ich regelmäßig Fortbildungen — zu Diabetischem Fußsyndrom, Nagelkorrektur-Spangen und neuen Materialien. So bleiben Behandlungen auf dem aktuellen Stand.',
                                            en: 'As an accredited podiatrist I attend continuing-education courses regularly — on diabetic foot syndrome, nail-correction braces and new materials. This keeps treatments up to current standards.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section id="hygiene" className="scroll-mt-20 bg-aubergine-dark">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                            {{ de: 'Hygiene', en: 'Hygiene' }[locale]}
                        </span>
                        <span aria-hidden className="h-px flex-1 bg-gold/40" />
                    </div>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                        {
                            {
                                de: 'Sauberes Arbeiten — sichtbar und nachvollziehbar.',
                                en: 'Clean work — visible and verifiable.',
                            }[locale]
                        }
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
                        {
                            {
                                de: 'Hygiene ist in einer podologischen Praxis kein Marketing-Punkt, sondern Grundlage. Drei Bereiche, die bei mir verbindlich geregelt sind:',
                                en: 'Hygiene in a podiatry practice is not a marketing point — it is the baseline. Three areas that are firmly set in my practice:',
                            }[locale]
                        }
                    </p>
                    <div className="mt-12 grid gap-8 sm:grid-cols-3">
                        <div>
                            <ShieldCheckIcon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                            <h3 className="mt-4 font-serif text-xl font-semibold text-cream">
                                {
                                    {
                                        de: 'Aufbereitung der Instrumente',
                                        en: 'Instrument reprocessing',
                                    }[locale]
                                }
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-cream/80">
                                {
                                    {
                                        de: 'Thermische Desinfektion und anschließende Sterilisation nach den Empfehlungen des Robert Koch-Instituts. Jedes Instrument verlässt die Aufbereitung verpackt und gekennzeichnet.',
                                        en: 'Thermal disinfection followed by sterilisation in line with the Robert Koch Institute recommendations. Every instrument leaves reprocessing sealed and labelled.',
                                    }[locale]
                                }
                            </p>
                        </div>
                        <div>
                            <SparklesIcon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                            <h3 className="mt-4 font-serif text-xl font-semibold text-cream">
                                {
                                    {
                                        de: 'Flächendesinfektion',
                                        en: 'Surface disinfection',
                                    }[locale]
                                }
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-cream/80">
                                {
                                    {
                                        de: 'Behandlungseinheit, Liege und Kontaktflächen werden zwischen jeder Behandlung mit VAH-gelisteten Mitteln desinfiziert — mit ausreichender Einwirkzeit.',
                                        en: 'The treatment unit, couch and contact surfaces are disinfected between every patient with VAH-listed agents — with the proper contact time.',
                                    }[locale]
                                }
                            </p>
                        </div>
                        <div>
                            <PackageIcon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                            <h3 className="mt-4 font-serif text-xl font-semibold text-cream">
                                {
                                    {
                                        de: 'Einmal-Materialien',
                                        en: 'Single-use materials',
                                    }[locale]
                                }
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-cream/80">
                                {
                                    {
                                        de: 'Schleifkörper, Skalpellklingen, Tupfer und Handschuhe sind Einmal-Material und werden nach jeder Behandlung verworfen — überall dort, wo es medizinisch sinnvoll ist.',
                                        en: 'Burrs, scalpel blades, swabs and gloves are single-use and discarded after every treatment — wherever this is medically appropriate.',
                                    }[locale]
                                }
                            </p>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h3 className="max-w-3xl font-serif text-2xl leading-tight font-semibold text-cream sm:text-3xl">
                            {
                                {
                                    de: 'Instrumentenaufbereitung — Schritt für Schritt.',
                                    en: 'Instrument reprocessing — step by step.',
                                }[locale]
                            }
                        </h3>
                        <p className="mt-4 max-w-2xl leading-relaxed text-cream/80">
                            {
                                {
                                    de: 'Jedes Instrument durchläuft denselben dreistufigen Prozess. Die Geräte stehen direkt in der Praxis — nichts wird ausgelagert.',
                                    en: 'Every instrument goes through the same three-stage process. The equipment lives in the practice itself — nothing is outsourced.',
                                }[locale]
                            }
                        </p>
                        <ol className="mt-10 grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    src: '/instrumentenaufbereitung/thermodesinfektor.jpg',
                                    title: { de: 'Thermodesinfektor', en: 'Thermal disinfector' },
                                    alt: {
                                        de: 'Thermodesinfektor zur Reinigung und Desinfektion der Instrumente.',
                                        en: 'Thermal disinfector for cleaning and disinfecting instruments.',
                                    },
                                    body: {
                                        de: 'Reinigung und thermische Desinfektion der Instrumente. Jeder Vorgang wird automatisch dokumentiert.',
                                        en: 'Instruments are cleaned and thermally disinfected. Every cycle is automatically logged.',
                                    },
                                },
                                {
                                    src: '/instrumentenaufbereitung/folienschweissgeraet.jpg',
                                    title: { de: 'Folienschweißgerät', en: 'Pouch sealer' },
                                    alt: {
                                        de: 'Folienschweißgerät zum Verpacken der Instrumente in Sterilisationsfolie.',
                                        en: 'Pouch sealer used to package instruments in sterilisation film.',
                                    },
                                    body: {
                                        de: 'Die getrockneten Instrumente werden in Sterilisationsfolie verpackt und eingeschweißt.',
                                        en: 'Once dried, the instruments are packed into sterilisation pouches and sealed.',
                                    },
                                },
                                {
                                    src: '/instrumentenaufbereitung/autoclave.jpg',
                                    title: { de: 'Autoklav', en: 'Autoclave' },
                                    alt: {
                                        de: 'Autoklav zur Sterilisation der verpackten Instrumente.',
                                        en: 'Autoclave used to sterilise the sealed instruments.',
                                    },
                                    body: {
                                        de: 'Die verpackten Instrumente werden sterilisiert und mit Datum und Chargennummer beschriftet.',
                                        en: 'The sealed instruments are sterilised and labelled with date and batch number.',
                                    },
                                },
                            ].map((step, index) => (
                                <li key={step.src}>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span aria-hidden className="h-px flex-1 bg-gold/30" />
                                    </div>
                                    <img
                                        src={step.src}
                                        alt={step.alt[locale]}
                                        loading="lazy"
                                        className="mt-4 aspect-[4/3] w-full rounded-xl border border-cream/15 object-cover shadow-sm"
                                    />
                                    <h4 className="mt-5 font-serif text-lg font-semibold text-cream">{step.title[locale]}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-cream/80">{step.body[locale]}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </main>
    );
}
