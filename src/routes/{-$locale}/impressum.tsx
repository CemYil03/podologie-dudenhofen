import { createFileRoute } from '@tanstack/react-router';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { ImpressumPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { localeFromParam } from '../../web/utils/locale';

export const Route = createFileRoute('/{-$locale}/impressum')({
    loader: () => routeLoaderGraphqlClient(ImpressumPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: { de: 'Impressum', en: 'Imprint' }[locale],
            description: {
                de: 'Anbieterkennzeichnung gemäß § 5 TMG für die Praxis Podologie Dudenhofen — Inhaberin Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen.',
                en: 'Provider identification under § 5 TMG for Podologie Dudenhofen — Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen, Germany.',
            }[locale],
            path: '/impressum',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home' }[locale], path: '/' },
                { name: { de: 'Impressum', en: 'Imprint' }[locale], path: '/impressum' },
            ],
        });
    },
    component: ImpressumPage,
});

function ImpressumPage() {
    const locale = useLocale();

    return (
        <main>
            {/* Hero — cream */}
            <section id="hero" className="mx-auto max-w-3xl scroll-mt-20 px-6 pt-16 pb-12">
                <SectionEyebrow>{{ de: 'Rechtliches', en: 'Legal' }[locale]}</SectionEyebrow>
                <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {{ de: 'Impressum', en: 'Imprint' }[locale]}
                </h1>
                <p className="mt-6 text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Anbieterkennzeichnung gemäß § 5 TMG und § 18 MStV.',
                            en: 'Provider identification under § 5 TMG and § 18 MStV (German broadcasting state treaty).',
                        }[locale]
                    }
                </p>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="space-y-12 leading-relaxed text-(--color-brand-charcoal-2)">
                    <Block id="block-tmg" heading={{ de: 'Angaben gemäß § 5 TMG', en: 'Information under § 5 TMG' }[locale]}>
                        <address className="not-italic">
                            {PRACTICE.person}
                            <br />
                            {PRACTICE.name}
                            <br />
                            {PRACTICE.address.street}
                            <br />
                            {PRACTICE.address.postcode} {PRACTICE.address.city}
                            <br />
                            {{ de: 'Deutschland', en: 'Germany' }[locale]}
                        </address>
                    </Block>

                    <Block id="block-steuer" heading={{ de: 'Steuerliche Angaben', en: 'Tax details' }[locale]}>
                        <dl className="grid grid-cols-[10rem_1fr] gap-y-1">
                            <dt className="font-medium text-aubergine-dark">{{ de: 'Steuernummer', en: 'Tax number' }[locale]}</dt>
                            <dd>41/196/711/00</dd>
                            <dt className="font-medium text-aubergine-dark">
                                {{ de: 'Institutionskennzeichen', en: 'Institution code (IK)' }[locale]}
                            </dt>
                            <dd>390700267</dd>
                        </dl>
                    </Block>

                    <Block id="block-kontakt" heading={{ de: 'Kontakt', en: 'Contact' }[locale]}>
                        <dl className="grid grid-cols-[10rem_1fr] gap-y-1">
                            <dt className="font-medium text-aubergine-dark">{{ de: 'Telefon', en: 'Phone' }[locale]}</dt>
                            <dd>
                                <a href={`tel:${PRACTICE.phone}`} className="text-aubergine hover:underline">
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                            </dd>
                            <dt className="font-medium text-aubergine-dark">{{ de: 'E-Mail', en: 'Email' }[locale]}</dt>
                            <dd>
                                <a href={`mailto:${PRACTICE.email}`} className="text-aubergine hover:underline">
                                    {PRACTICE.email}
                                </a>
                            </dd>
                        </dl>
                    </Block>

                    <Block
                        id="block-berufsbezeichnung"
                        heading={
                            {
                                de: 'Berufsbezeichnung und berufsrechtliche Regelungen',
                                en: 'Professional title and regulatory framework',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Podologin (staatlich anerkannt), verliehen in der Bundesrepublik Deutschland.',
                                    en: 'State-recognised Podologin (medical foot-care professional), licence issued in the Federal Republic of Germany.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-2">
                            {
                                {
                                    de: 'Heilpraktikerin (sektoral, beschränkt auf das Gebiet der Podologie), Erlaubnis nach dem Heilpraktikergesetz.',
                                    en: 'Heilpraktikerin (sectoral, limited to podiatry) under the German Heilpraktikergesetz.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-4">
                            <span className="font-medium text-aubergine-dark">
                                {{ de: 'Berufsrechtliche Regelungen', en: 'Applicable regulations' }[locale]}:
                            </span>{' '}
                            {
                                {
                                    de: 'Podologengesetz (PodG), Ausbildungs- und Prüfungsverordnung für Podologinnen und Podologen (PodAPrV), Heilpraktikergesetz (HeilprG) — einsehbar unter ',
                                    en: 'German Podologists Act (PodG), Training and Examination Regulations for Podologists (PodAPrV), Heilpraktiker Act (HeilprG) — available at ',
                                }[locale]
                            }
                            <a
                                href="https://www.gesetze-im-internet.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aubergine hover:underline"
                            >
                                www.gesetze-im-internet.de
                            </a>
                            .
                        </p>
                    </Block>

                    <Block id="block-aufsicht" heading={{ de: 'Zuständige Aufsichtsbehörde', en: 'Supervisory authority' }[locale]}>
                        <address className="not-italic">
                            Gesundheitsamt Rhein-Pfalz-Kreis
                            <br />
                            Dörrhorststraße 36
                            <br />
                            67059 Ludwigshafen am Rhein
                        </address>
                        <p className="mt-2">
                            <a
                                href="https://www.rheinpfalz-kreis.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aubergine hover:underline"
                            >
                                www.rheinpfalz-kreis.de
                            </a>
                        </p>
                    </Block>

                    <Block
                        id="block-haftpflicht"
                        heading={{ de: 'Berufshaftpflichtversicherung', en: 'Professional liability insurance' }[locale]}
                    >
                        <p className="mb-2 font-medium text-aubergine-dark">
                            {{ de: 'Name und Sitz des Versicherers', en: 'Insurer' }[locale]}
                        </p>
                        <address className="not-italic">
                            Versicherungskammer Bayern
                            <br />
                            Maximilianstraße 53
                            <br />
                            80530 {{ de: 'München', en: 'Munich' }[locale]}
                        </address>
                        <p className="mt-3">
                            <span className="font-medium text-aubergine-dark">{{ de: 'Geltungsraum', en: 'Coverage area' }[locale]}:</span>{' '}
                            {{ de: 'Deutschland', en: 'Germany' }[locale]}
                        </p>
                    </Block>

                    <Block id="block-streit" heading={{ de: 'Streitschlichtung', en: 'Online dispute resolution' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ',
                                    en: 'The European Commission provides a platform for online dispute resolution (ODR): ',
                                }[locale]
                            }
                            <a
                                href="https://ec.europa.eu/consumers/odr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aubergine hover:underline"
                            >
                                ec.europa.eu/consumers/odr
                            </a>
                            .
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Unsere E-Mail-Adresse finden Sie oben in diesem Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
                                    en: 'Our email address is listed above. We are neither willing nor obligated to participate in dispute-resolution proceedings before a consumer arbitration board.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-haftung-inhalte" heading={{ de: 'Haftung für Inhalte', en: 'Liability for content' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
                                    en: 'As a service provider, we are responsible for our own content on these pages under § 7 (1) TMG and the applicable general laws. Under §§ 8–10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate unlawful activity.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
                                    en: 'Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard, however, is only possible from the point at which we become aware of a specific legal violation. Upon becoming aware of such violations, we will remove the content immediately.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-haftung-links" heading={{ de: 'Haftung für Links', en: 'Liability for links' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
                                    en: 'Our website contains links to external third-party websites whose content we cannot influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of those linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Unlawful content was not recognisable at that time.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
                                    en: 'A permanent content review of linked pages is, however, not reasonable without concrete indications of a legal violation. Upon becoming aware of any such violations, we will remove the links immediately.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-urheberrecht" heading={{ de: 'Urheberrecht', en: 'Copyright' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der Verfasserin. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
                                    en: 'Content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, and any form of exploitation outside the limits of copyright require the written consent of the respective author. Downloads and copies of this site are permitted only for private, non-commercial use.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Soweit die Inhalte auf dieser Seite nicht von der Betreiberin erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
                                    en: 'Insofar as content on this site was not created by the operator, the copyrights of third parties are observed. In particular, third-party content is identified as such. Should you nevertheless notice a copyright violation, please let us know. Upon becoming aware of such violations, we will remove the content immediately.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-bildnachweise" heading={{ de: 'Bildnachweise', en: 'Image credits' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Fotografien der Praxisräume und der Therapeutin: © Podologie Dudenhofen.',
                                    en: 'Photographs of the practice rooms and the practitioner: © Podologie Dudenhofen.',
                                }[locale]
                            }
                        </p>
                    </Block>
                </div>
            </section>
        </main>
    );
}

function Block({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
    return (
        <section id={id} className="scroll-mt-20">
            <h2 className="font-serif text-2xl font-semibold text-aubergine-dark">{heading}</h2>
            <div className="mt-4">{children}</div>
        </section>
    );
}
