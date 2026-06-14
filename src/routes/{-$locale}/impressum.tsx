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
            title: { de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' }[locale],
            description: {
                de: 'Anbieterkennzeichnung gemäß § 5 TMG für die Praxis Podologie Dudenhofen — Inhaberin Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen.',
                en: 'Provider identification under § 5 TMG for Podologie Dudenhofen — Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen, Germany.',
                ru: 'Идентификация поставщика услуг согласно § 5 TMG для практики Podologie Dudenhofen — владелица Annette Yilmaz, Speyerer Straße 60, 67373 Dudenhofen.',
                ar: 'تعريف مقدّم الخدمة وفقًا للمادة 5 من قانون TMG لعيادة Podologie Dudenhofen — المالكة Annette Yilmaz، Speyerer Straße 60، 67373 Dudenhofen، ألمانيا.',
            }[locale],
            path: '/impressum',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' }[locale], path: '/impressum' },
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
                <SectionEyebrow>{{ de: 'Rechtliches', en: 'Legal', ru: 'Правовая информация', ar: 'الشؤون القانونية' }[locale]}</SectionEyebrow>
                <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                    {{ de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' }[locale]}
                </h1>
                <p className="mt-6 text-(--color-brand-charcoal-2)">
                    {
                        {
                            de: 'Anbieterkennzeichnung gemäß § 5 TMG und § 18 MStV.',
                            en: 'Provider identification under § 5 TMG and § 18 MStV (German broadcasting state treaty).',
                            ru: 'Идентификация поставщика услуг согласно § 5 TMG и § 18 MStV.',
                            ar: 'تعريف مقدّم الخدمة وفقًا للمادة 5 من قانون TMG والمادة 18 من قانون MStV.',
                        }[locale]
                    }
                </p>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="space-y-12 leading-relaxed text-(--color-brand-charcoal-2)">
                    <Block id="block-tmg" heading={{ de: 'Angaben gemäß § 5 TMG', en: 'Information under § 5 TMG', ru: 'Сведения согласно § 5 TMG', ar: 'بيانات وفقًا للمادة 5 من قانون TMG' }[locale]}>
                        <address className="not-italic">
                            {PRACTICE.person}
                            <br />
                            {PRACTICE.name}
                            <br />
                            {PRACTICE.address.street}
                            <br />
                            {PRACTICE.address.postcode} {PRACTICE.address.city}
                            <br />
                            {{ de: 'Deutschland', en: 'Germany', ru: 'Германия', ar: 'ألمانيا' }[locale]}
                        </address>
                    </Block>

                    <Block id="block-steuer" heading={{ de: 'Steuerliche Angaben', en: 'Tax details', ru: 'Налоговые сведения', ar: 'البيانات الضريبية' }[locale]}>
                        <dl className="grid grid-cols-[10rem_1fr] gap-y-1">
                            <dt className="font-medium text-aubergine-dark">{{ de: 'Steuernummer', en: 'Tax number', ru: 'Налоговый номер', ar: 'الرقم الضريبي' }[locale]}</dt>
                            <dd>41/196/711/00</dd>
                            <dt className="font-medium text-aubergine-dark">
                                {{ de: 'Institutionskennzeichen', en: 'Institution code (IK)', ru: 'Institutionskennzeichen (код учреждения IK)', ar: 'رمز المؤسسة Institutionskennzeichen (IK)' }[locale]}
                            </dt>
                            <dd>390700267</dd>
                        </dl>
                    </Block>

                    <Block id="block-kontakt" heading={{ de: 'Kontakt', en: 'Contact', ru: 'Контакты', ar: 'التواصل' }[locale]}>
                        <dl className="grid grid-cols-[10rem_1fr] gap-y-1">
                            <dt className="font-medium text-aubergine-dark">{{ de: 'Telefon', en: 'Phone', ru: 'Телефон', ar: 'الهاتف' }[locale]}</dt>
                            <dd>
                                <a href={`tel:${PRACTICE.phone}`} className="text-aubergine hover:underline">
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                            </dd>
                            <dt className="font-medium text-aubergine-dark">{{ de: 'E-Mail', en: 'Email', ru: 'Эл. почта', ar: 'البريد الإلكتروني' }[locale]}</dt>
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
                                ru: 'Профессиональное наименование и нормативная база',
                                ar: 'المسمّى المهني والإطار التنظيمي',
                            }[locale]
                        }
                    >
                        <p>
                            {
                                {
                                    de: 'Podologin (staatlich anerkannt), verliehen in der Bundesrepublik Deutschland.',
                                    en: 'State-recognised Podologin (medical foot-care professional), licence issued in the Federal Republic of Germany.',
                                    ru: 'Podologin (специалист по медицинскому уходу за стопами с государственным признанием); квалификация присвоена в Федеративной Республике Германия.',
                                    ar: 'Podologin (أخصائية معتمدة من الدولة في الرعاية الطبية للقدمين)، صدر الترخيص في جمهورية ألمانيا الاتحادية.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-2">
                            {
                                {
                                    de: 'Heilpraktikerin (sektoral, beschränkt auf das Gebiet der Podologie), Erlaubnis nach dem Heilpraktikergesetz.',
                                    en: 'Heilpraktikerin (sectoral, limited to podiatry) under the German Heilpraktikergesetz.',
                                    ru: 'Heilpraktikerin (секторальное разрешение, ограниченное областью подологии), Erlaubnis согласно Heilpraktikergesetz.',
                                    ar: 'Heilpraktikerin (ترخيص قطاعي مقتصر على مجال البودولوجيا)، Erlaubnis وفقًا لقانون Heilpraktikergesetz.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-4">
                            <span className="font-medium text-aubergine-dark">
                                {{ de: 'Berufsrechtliche Regelungen', en: 'Applicable regulations', ru: 'Применимые нормативные акты', ar: 'اللوائح المعمول بها' }[locale]}:
                            </span>{' '}
                            {
                                {
                                    de: 'Podologengesetz (PodG), Ausbildungs- und Prüfungsverordnung für Podologinnen und Podologen (PodAPrV), Heilpraktikergesetz (HeilprG) — einsehbar unter ',
                                    en: 'German Podologists Act (PodG), Training and Examination Regulations for Podologists (PodAPrV), Heilpraktiker Act (HeilprG) — available at ',
                                    ru: 'Podologengesetz (PodG), Ausbildungs- und Prüfungsverordnung für Podologinnen und Podologen (PodAPrV), Heilpraktikergesetz (HeilprG) — доступны по адресу ',
                                    ar: 'قانون Podologengesetz (PodG)، ولائحة التدريب والامتحانات للبودولوجيين Ausbildungs- und Prüfungsverordnung für Podologinnen und Podologen (PodAPrV)، وقانون Heilpraktikergesetz (HeilprG) — متاحة على ',
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

                    <Block id="block-aufsicht" heading={{ de: 'Zuständige Aufsichtsbehörde', en: 'Supervisory authority', ru: 'Компетентный надзорный орган', ar: 'الجهة الرقابية المختصة' }[locale]}>
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
                        heading={{ de: 'Berufshaftpflichtversicherung', en: 'Professional liability insurance', ru: 'Профессиональное страхование ответственности', ar: 'تأمين المسؤولية المهنية' }[locale]}
                    >
                        <p className="mb-2 font-medium text-aubergine-dark">
                            {{ de: 'Name und Sitz des Versicherers', en: 'Insurer', ru: 'Наименование и местонахождение страховщика', ar: 'اسم شركة التأمين ومقرّها' }[locale]}
                        </p>
                        <address className="not-italic">
                            Versicherungskammer Bayern
                            <br />
                            Maximilianstraße 53
                            <br />
                            80530 {{ de: 'München', en: 'Munich', ru: 'Мюнхен', ar: 'ميونخ' }[locale]}
                        </address>
                        <p className="mt-3">
                            <span className="font-medium text-aubergine-dark">{{ de: 'Geltungsraum', en: 'Coverage area', ru: 'Территория действия', ar: 'نطاق التغطية' }[locale]}:</span>{' '}
                            {{ de: 'Deutschland', en: 'Germany', ru: 'Германия', ar: 'ألمانيا' }[locale]}
                        </p>
                    </Block>

                    <Block id="block-streit" heading={{ de: 'Streitschlichtung', en: 'Online dispute resolution', ru: 'Разрешение споров', ar: 'تسوية النزاعات عبر الإنترنت' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ',
                                    en: 'The European Commission provides a platform for online dispute resolution (ODR): ',
                                    ru: 'Европейская комиссия предоставляет платформу для онлайн-разрешения споров (OS): ',
                                    ar: 'توفّر المفوضية الأوروبية منصة لتسوية النزاعات عبر الإنترنت (OS): ',
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
                                    ru: 'Наш адрес электронной почты указан выше в данном Impressum. Мы не готовы и не обязаны участвовать в Streitbeilegungsverfahren перед органом по разрешению потребительских споров.',
                                    ar: 'عنوان بريدنا الإلكتروني مذكور أعلاه في هذه البيانات. لسنا على استعداد للمشاركة في Streitbeilegungsverfahren أمام هيئة تحكيم المستهلكين، ولسنا ملزمين بذلك.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-haftung-inhalte" heading={{ de: 'Haftung für Inhalte', en: 'Liability for content', ru: 'Ответственность за содержание', ar: 'المسؤولية عن المحتوى' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
                                    en: 'As a service provider, we are responsible for our own content on these pages under § 7 (1) TMG and the applicable general laws. Under §§ 8–10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate unlawful activity.',
                                    ru: 'Как поставщик услуг, мы несём ответственность за собственное содержание этих страниц согласно § 7 абз. 1 TMG и общим нормам законодательства. Однако согласно §§ 8–10 TMG как поставщик услуг мы не обязаны контролировать переданную или сохранённую информацию третьих лиц либо исследовать обстоятельства, указывающие на противоправную деятельность.',
                                    ar: 'بصفتنا مقدّم خدمة، نتحمّل المسؤولية عن المحتوى الخاص بنا في هذه الصفحات وفقًا للفقرة 1 من المادة 7 من قانون TMG والقوانين العامة المعمول بها. غير أننا، وفقًا للمواد 8 إلى 10 من قانون TMG، غير ملزمين بمراقبة المعلومات المنقولة أو المخزّنة من قِبل الغير، ولا بالتحرّي عن ظروف تشير إلى نشاط غير مشروع.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
                                    en: 'Obligations to remove or block the use of information under general laws remain unaffected. Liability in this regard, however, is only possible from the point at which we become aware of a specific legal violation. Upon becoming aware of such violations, we will remove the content immediately.',
                                    ru: 'Обязанности по удалению или блокировке использования информации в соответствии с общими нормами законодательства остаются в силе. Однако соответствующая ответственность возможна лишь с момента, когда нам становится известно о конкретном правонарушении. При получении сведений о подобных нарушениях мы незамедлительно удалим такие материалы.',
                                    ar: 'تظل الالتزامات بإزالة المعلومات أو حجب استخدامها وفقًا للقوانين العامة قائمةً دون تأثير. غير أنّ المسؤولية في هذا الشأن لا تنشأ إلا من اللحظة التي نعلم فيها بانتهاكٍ قانونيّ محدّد. وفور اطّلاعنا على مثل هذه الانتهاكات، سنُزيل المحتوى المعنيّ على الفور.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-haftung-links" heading={{ de: 'Haftung für Links', en: 'Liability for links', ru: 'Ответственность за ссылки', ar: 'المسؤولية عن الروابط' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
                                    en: 'Our website contains links to external third-party websites whose content we cannot influence. We therefore cannot accept any liability for this third-party content. The respective provider or operator of those linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. Unlawful content was not recognisable at that time.',
                                    ru: 'Наш сайт содержит ссылки на внешние сайты третьих лиц, на содержание которых мы не имеем влияния. По этой причине мы не можем нести ответственность за это стороннее содержание. За содержание сайтов, на которые ведут ссылки, всегда отвечает соответствующий поставщик или оператор. На момент размещения ссылок указанные страницы были проверены на возможные правонарушения. Противоправное содержание на момент размещения ссылок выявлено не было.',
                                    ar: 'يحتوي موقعنا على روابط إلى مواقع خارجية لأطراف ثالثة لا نملك تأثيرًا على محتواها. ولذلك لا يمكننا تحمّل أي مسؤولية عن محتوى الغير هذا. ويتحمّل مقدّم الخدمة أو مشغّل تلك الصفحات المرتبطة دائمًا المسؤولية عن محتواها. وقد جرى فحص الصفحات المرتبطة عند إدراج الروابط للتحقّق من احتمال وجود مخالفات قانونية، ولم يكن أيّ محتوى غير مشروع ظاهرًا حينئذٍ.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
                                    en: 'A permanent content review of linked pages is, however, not reasonable without concrete indications of a legal violation. Upon becoming aware of any such violations, we will remove the links immediately.',
                                    ru: 'Однако постоянный контроль содержания связанных страниц без конкретных признаков правонарушения не является разумно осуществимым. При получении сведений о правонарушениях мы незамедлительно удалим такие ссылки.',
                                    ar: 'غير أنّ المراجعة الدائمة لمحتوى الصفحات المرتبطة دون وجود مؤشّرات ملموسة على انتهاك قانوني أمرٌ غير معقول. وعند علمنا بأيّ انتهاكات من هذا القبيل، سنُزيل تلك الروابط على الفور.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-urheberrecht" heading={{ de: 'Urheberrecht', en: 'Copyright', ru: 'Авторское право', ar: 'حقوق المؤلف' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der Verfasserin. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
                                    en: 'Content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, and any form of exploitation outside the limits of copyright require the written consent of the respective author. Downloads and copies of this site are permitted only for private, non-commercial use.',
                                    ru: 'Содержание и произведения, созданные оператором сайта на этих страницах, подпадают под действие немецкого авторского права. Воспроизведение, переработка, распространение и любое использование за пределами авторско-правовых ограничений требуют письменного согласия автора. Загрузка и копирование этой страницы разрешены только в личных, некоммерческих целях.',
                                    ar: 'يخضع المحتوى والأعمال التي أنشأتها مشغّلة الموقع على هذه الصفحات لقانون حقوق المؤلف الألماني. ويستلزم نسخها أو معالجتها أو توزيعها أو أيّ شكلٍ من أشكال استغلالها خارج حدود حقوق المؤلف الحصول على موافقة خطّيّة من صاحبة الحقّ. ولا يُسمح بتنزيل هذه الصفحة ونسخها إلا للاستخدام الشخصيّ غير التجاريّ.',
                                }[locale]
                            }
                        </p>
                        <p className="mt-3">
                            {
                                {
                                    de: 'Soweit die Inhalte auf dieser Seite nicht von der Betreiberin erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
                                    en: 'Insofar as content on this site was not created by the operator, the copyrights of third parties are observed. In particular, third-party content is identified as such. Should you nevertheless notice a copyright violation, please let us know. Upon becoming aware of such violations, we will remove the content immediately.',
                                    ru: 'В той части, в которой содержание этого сайта не создано оператором, авторские права третьих лиц соблюдаются. В частности, содержание третьих лиц обозначается как таковое. Если вы всё же заметите нарушение авторских прав, просим сообщить нам об этом. При получении сведений о таких нарушениях мы незамедлительно удалим соответствующее содержание.',
                                    ar: 'في الحالات التي لم تُنشئ فيها مشغّلة الموقع المحتوى المعروض، تُحترم حقوق المؤلفين من الغير. وعلى وجه الخصوص، يُشار إلى محتوى الغير بوصفه كذلك. وإن لاحظتم رغم ذلك أيّ انتهاكٍ لحقوق المؤلف، فيُرجى إبلاغنا. وفور علمنا بمثل هذه الانتهاكات، سنُزيل المحتوى المعنيّ على الفور.',
                                }[locale]
                            }
                        </p>
                    </Block>

                    <Block id="block-bildnachweise" heading={{ de: 'Bildnachweise', en: 'Image credits', ru: 'Источники изображений', ar: 'مصادر الصور' }[locale]}>
                        <p>
                            {
                                {
                                    de: 'Fotografien der Praxisräume und der Therapeutin: © Podologie Dudenhofen.',
                                    en: 'Photographs of the practice rooms and the practitioner: © Podologie Dudenhofen.',
                                    ru: 'Фотографии помещений практики и специалиста: © Podologie Dudenhofen.',
                                    ar: 'صور غرف العيادة والأخصائية: © Podologie Dudenhofen.',
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
