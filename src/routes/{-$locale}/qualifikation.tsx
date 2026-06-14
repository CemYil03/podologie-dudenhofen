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
            title: {
                de: 'Heilpraktikerin für Podologie — Qualifikation',
                en: 'Heilpraktiker for podiatry — credentials',
                ru: 'Heilpraktiker по подологии — квалификация',
                ar: 'Heilpraktiker في علاج القدم — المؤهلات',
            }[locale],
            description: {
                de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie — die Qualifikationen hinter der Praxis in Dudenhofen, mit Urkunden zur Einsicht.',
                en: 'State-licensed podiatrist and Heilpraktiker for podiatry — the qualifications behind the practice in Dudenhofen, with the official certificates on file.',
                ru: 'Государственно признанный подолог и Heilpraktiker по подологии — квалификации, стоящие за практикой в Dudenhofen, с официальными документами для ознакомления.',
                ar: 'أخصائية علاج القدم المعتمدة من الدولة وHeilpraktiker في علاج القدم — المؤهلات التي تستند إليها العيادة في Dudenhofen، مع الشهادات الرسمية المتاحة للاطلاع.',
            }[locale],
            path: '/qualifikation',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' }[locale], path: '/qualifikation' },
            ],
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
                    <SectionEyebrow>
                        {{ de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' }[locale]}
                    </SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Staatlich anerkannte Podologin & Heilpraktikerin für Podologie',
                                en: 'State-licensed podiatrist and Heilpraktiker for podiatry',
                                ru: 'Государственно признанный подолог и Heilpraktiker по подологии',
                                ar: 'أخصائية علاج القدم المعتمدة من الدولة وHeilpraktiker في علاج القدم',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Zwei Qualifikationen — eine staatlich geregelte Ausbildung und eine zusätzliche Heilkunde-Erlaubnis — bedeuten für Sie: schonend, fundiert und im rechtlich vollen Umfang behandelt.',
                                en: 'Two qualifications — a state-regulated training and an additional licence to practise healing — mean for you: gentle, well-founded care within the full legal scope.',
                                ru: 'Две квалификации — государственно регулируемое образование и дополнительное разрешение на врачевание — означают для вас: бережный, обоснованный уход в полном правовом объёме.',
                                ar: 'مؤهلان اثنان — تدريب منظم من الدولة وترخيص إضافي لممارسة العلاج — يعنيان لكم: رعاية لطيفة ومدروسة وضمن النطاق القانوني الكامل.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/leistungen">
                                {{ de: 'Leistungen ansehen', en: 'View services', ru: 'Посмотреть услуги', ar: 'عرض الخدمات' }[locale]}
                            </Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">
                                {{ de: 'Termin anfragen', en: 'Request appointment', ru: 'Записаться на приём', ar: 'طلب موعد' }[locale]}
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </section>

            {/* 2. Podologie — cream */}
            <section id="podologie" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <div className="grid gap-12 md:grid-cols-[1fr_20rem]">
                        <Reveal>
                            <SectionEyebrow>
                                {{ de: 'Podologie', en: 'Podiatry', ru: 'Подология', ar: 'علاج القدم' }[locale]}
                            </SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Was ist Podologie?',
                                        en: 'What is podiatry?',
                                        ru: 'Что такое подология?',
                                        ar: 'ما هو علاج القدم؟',
                                    }[locale]
                                }
                            </h2>
                            <div className="mt-8 grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Podologie ist die nicht-ärztliche Heilkunde am Fuß. Im Unterschied zur kosmetischen Fußpflege darf eine staatlich anerkannte Podologin auch krankhafte Veränderungen behandeln — bei Diabetes, Durchblutungsstörungen oder neurologischen Erkrankungen.',
                                            en: 'Podiatry is non-medical foot healthcare. Unlike cosmetic foot-care, a state-licensed podiatrist is also permitted to treat pathological conditions — in cases of diabetes, circulatory disorders or neurological disease.',
                                            ru: 'Подология — это неврачебная медицинская помощь стопам. В отличие от косметического ухода за стопами, государственно признанный подолог имеет право лечить также патологические изменения — при диабете, нарушениях кровообращения или неврологических заболеваниях.',
                                            ar: 'علاج القدم هو رعاية صحية غير طبية للقدم. وعلى خلاف العناية التجميلية بالقدم، يحق لأخصائية علاج القدم المعتمدة من الدولة معالجة الحالات المرضية أيضاً — في حالات السكري واضطرابات الدورة الدموية أو الأمراض العصبية.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Die Ausbildung ist im Podologengesetz (PodG) geregelt: dreijährige Vollzeitausbildung mit Staatsexamen.',
                                            en: 'The training is governed by the German Podiatrists Act (PodG): a three-year full-time programme concluding with the state examination.',
                                            ru: 'Обучение регулируется немецким Законом о подологах (Podologengesetz, PodG): трёхлетняя очная программа, завершающаяся государственным экзаменом (Staatsexamen).',
                                            ar: 'يخضع التدريب لقانون أخصائيي علاج القدم الألماني (Podologengesetz, PodG): برنامج بدوام كامل لمدة ثلاث سنوات يُختتم بالامتحان الحكومي (Staatsexamen).',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Damit zählt die Podologie zu den Gesundheitsfachberufen — auf einer Stufe mit Physio- und Ergotherapie.',
                                            en: 'This places podiatry among the recognised health-care professions — on a par with physiotherapy and occupational therapy.',
                                            ru: 'Тем самым подология относится к признанным медицинским профессиям — наравне с физиотерапией и эрготерапией.',
                                            ar: 'وبذلك يُصنَّف علاج القدم ضمن المهن الصحية المعترف بها — على قدم المساواة مع العلاج الطبيعي والعلاج الوظيفي.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <aside className="bg-blush rounded-xl border border-aubergine/10 p-6 self-start">
                                <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                    {{ de: 'Auf einen Blick', en: 'At a glance', ru: 'Кратко', ar: 'لمحة سريعة' }[locale]}
                                </h3>
                                <ul className="mt-4 grid gap-3 text-sm text-(--color-brand-charcoal-2)">
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Gesundheitsfachberuf nach PodG',
                                                    en: 'Recognised health-care profession (PodG)',
                                                    ru: 'Признанная медицинская профессия (PodG)',
                                                    ar: 'مهنة صحية معترف بها وفقاً لـ PodG',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Geregelt nach Podologengesetz',
                                                    en: 'Governed by the Podiatrists Act',
                                                    ru: 'Регулируется Законом о подологах',
                                                    ar: 'منظم بموجب قانون أخصائيي علاج القدم',
                                                }[locale]
                                            }
                                        </span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: '3-jährige Ausbildung mit Staatsexamen',
                                                    en: '3-year training with state examination',
                                                    ru: '3-летнее обучение с государственным экзаменом (Staatsexamen)',
                                                    ar: 'تدريب لمدة 3 سنوات مع الامتحان الحكومي (Staatsexamen)',
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
                                                    ru: 'Возможен расчёт через государственную медицинскую страховку (по назначению врача)',
                                                    ar: 'إمكانية الفوترة عبر التأمين الصحي القانوني (بوصفة طبية)',
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
                            <SectionEyebrow>
                                {{ de: 'Heilpraktiker', en: 'Heilpraktiker', ru: 'Heilpraktiker', ar: 'Heilpraktiker' }[locale]}
                            </SectionEyebrow>
                            <h2 className="mt-6 font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                                {
                                    {
                                        de: 'Heilpraktikerin für Podologie',
                                        en: 'Heilpraktiker for podiatry',
                                        ru: 'Heilpraktiker по подологии',
                                        ar: 'Heilpraktiker في علاج القدم',
                                    }[locale]
                                }
                            </h2>
                            <div className="mt-8 grid gap-4 text-(--color-brand-charcoal-2)">
                                <p>
                                    {
                                        {
                                            de: 'Die sektorale Heilpraktiker-Erlaubnis erweitert den rechtlichen Rahmen über die reine Podologie hinaus: Behandlungen, die sonst nur ärztlich oder von vollumfänglichen Heilpraktikerinnen und Heilpraktikern durchgeführt werden dürfen, sind im Bereich der Podologie eigenständig möglich.',
                                            en: 'The sectoral Heilpraktiker licence extends the legal scope beyond podiatry alone: treatments otherwise reserved for physicians or full Heilpraktiker may be carried out independently within the podiatric field.',
                                            ru: 'Секторальное разрешение Heilpraktiker (Sektorale Heilpraktiker-Erlaubnis) расширяет правовые рамки за пределы собственно подологии: процедуры, которые в иных случаях разрешены только врачам или Heilpraktiker с полным объёмом полномочий, в области подологии могут проводиться самостоятельно.',
                                            ar: 'يوسّع ترخيص Heilpraktiker القطاعي (Sektorale Heilpraktiker-Erlaubnis) النطاقَ القانوني إلى ما يتجاوز علاج القدم وحده: فالعلاجات التي تقتصر عادةً على الأطباء أو على Heilpraktiker بالصلاحيات الكاملة، يمكن إجراؤها باستقلالية ضمن مجال علاج القدم.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Konkret: ich darf u.a. eine eigenständige Befunderhebung machen, lokale Anästhetika anwenden und Wunden behandeln — alles streng innerhalb des Fachgebiets.',
                                            en: 'Concretely: I am permitted to make my own clinical assessments, apply local anaesthetics and treat wounds — all strictly within the specialist field.',
                                            ru: 'Конкретно: мне разрешено в том числе самостоятельно проводить клиническую диагностику, применять местные анестетики и лечить раны — всё это строго в рамках специализации.',
                                            ar: 'وبشكل ملموس: يحق لي القيام بتقييم سريري مستقل واستخدام التخدير الموضعي ومعالجة الجروح — وكل ذلك ضمن نطاق التخصص بدقة.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Für eine Behandlung im Rahmen der sektoralen Heilpraktiker-Erlaubnis ist keine ärztliche Überweisung nötig. Rechnungen können bei privaten Krankenversicherungen eingereicht werden; gesetzliche Kassen übernehmen die Kosten nur in Einzelfällen anteilig.',
                                            en: 'No medical referral is required for treatments under the sectoral Heilpraktiker licence. Invoices can be submitted to private health insurers; statutory insurers only occasionally cover part of the cost on a case-by-case basis.',
                                            ru: 'Для лечения в рамках секторального разрешения Heilpraktiker направление от врача не требуется. Счета можно подавать в частные медицинские страховые компании; государственные кассы покрывают расходы лишь частично и только в отдельных случаях.',
                                            ar: 'لا يلزم وجود إحالة طبية للعلاج في إطار ترخيص Heilpraktiker القطاعي. ويمكن تقديم الفواتير إلى شركات التأمين الصحي الخاصة؛ أما صناديق التأمين الصحي القانوني فلا تتحمل التكاليف إلا جزئياً وفي حالات فردية فقط.',
                                        }[locale]
                                    }
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delayMs={120}>
                            <aside className="bg-cream rounded-xl border border-aubergine/10 p-6 self-start">
                                <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                    {{ de: 'Auf einen Blick', en: 'At a glance', ru: 'Кратко', ar: 'لمحة سريعة' }[locale]}
                                </h3>
                                <ul className="mt-4 grid gap-3 text-sm text-(--color-brand-charcoal-2)">
                                    <li className="flex gap-3">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aubergine" />
                                        <span>
                                            {
                                                {
                                                    de: 'Sektorale Heilpraktiker-Erlaubnis',
                                                    en: 'Sectoral Heilpraktiker licence',
                                                    ru: 'Секторальное разрешение Heilpraktiker',
                                                    ar: 'ترخيص Heilpraktiker القطاعي',
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
                                                    ru: 'Признано в земле Rheinland-Pfalz',
                                                    ar: 'معترف به في ولاية Rheinland-Pfalz',
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
                                                    ru: 'Расширенный объём процедур на стопе',
                                                    ar: 'نطاق علاجي موسَّع للقدم',
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
                        <SectionEyebrow className="text-gold">
                            {{ de: 'Urkunden', en: 'Certificates', ru: 'Документы', ar: 'الشهادات' }[locale]}
                        </SectionEyebrow>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <BadgeCheckIcon className="h-7 w-7 text-gold" strokeWidth={1.75} />
                            <h2 className="font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                                {
                                    {
                                        de: 'Mit Brief und Siegel',
                                        en: 'Signed and sealed',
                                        ru: 'С печатью и подписью',
                                        ar: 'موثَّق بالختم والتوقيع',
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
                                        ru: 'Государственное свидетельство подолога — Annette Yilmaz',
                                        ar: 'الشهادة الحكومية كأخصائية علاج القدم — Annette Yilmaz',
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
                                        ru: 'Свидетельство о государственном признании в качестве подолога.',
                                        ar: 'شهادة الاعتراف الحكومي كأخصائية في علاج القدم.',
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
                                        ru: 'Свидетельство Heilpraktiker по подологии — Annette Yilmaz',
                                        ar: 'شهادة Heilpraktiker في علاج القدم — Annette Yilmaz',
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
                                        ru: 'Свидетельство о разрешении на занятие врачеванием, ограниченное областью подологии.',
                                        ar: 'شهادة الترخيص بممارسة العلاج، مقصورة على مجال علاج القدم.',
                                    }[locale]
                                }
                            </figcaption>
                        </figure>
                    </div>

                    <div className="mx-auto mt-12 max-w-2xl text-left">
                        <h3 className="font-serif text-xl font-semibold text-cream">
                            {{ de: 'Zertifikate', en: 'Certificates', ru: 'Сертификаты', ar: 'الشهادات' }[locale]}
                        </h3>
                        <dl className="mt-6 grid gap-5 border-t border-gold/20 pt-6">
                            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6">
                                <dt className="font-medium text-cream">
                                    {
                                        {
                                            de: 'Podologin (staatlich anerkannt)',
                                            en: 'Podiatrist (state-licensed)',
                                            ru: 'Подолог (государственно признанный)',
                                            ar: 'أخصائية علاج القدم (معتمدة من الدولة)',
                                        }[locale]
                                    }
                                </dt>
                                <dd className="text-sm text-cream/80">
                                    {
                                        {
                                            de: 'Bundesweit gültig',
                                            en: 'Valid nationwide',
                                            ru: 'Действительно по всей Германии',
                                            ar: 'صالح في جميع أنحاء ألمانيا',
                                        }[locale]
                                    }
                                </dd>
                            </div>
                            <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6 border-t border-gold/10 pt-5">
                                <dt className="font-medium text-cream">
                                    {
                                        {
                                            de: 'Heilpraktikerin für Podologie',
                                            en: 'Heilpraktiker for podiatry',
                                            ru: 'Heilpraktiker по подологии',
                                            ar: 'Heilpraktiker في علاج القدم',
                                        }[locale]
                                    }
                                </dt>
                                <dd className="text-sm text-cream/80">
                                    {
                                        {
                                            de: 'Anerkannt in Rheinland-Pfalz, 22.03.2022',
                                            en: 'Recognised in Rhineland-Palatinate, 22.03.2022',
                                            ru: 'Признано в земле Rheinland-Pfalz, 22.03.2022',
                                            ar: 'معترف به في ولاية Rheinland-Pfalz، 22.03.2022',
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
                                            ru: 'Дата экзамена HP по подологии',
                                            ar: 'تاريخ امتحان HP في علاج القدم',
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
                                ru: 'Познакомьтесь с практикой',
                                ar: 'تعرَّفوا على العيادة',
                            }[locale]
                        }
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Vereinbaren Sie einen Termin oder werfen Sie zuerst einen Blick in die Räume und die Ausstattung.',
                                en: 'Request an appointment, or take a look at the rooms and equipment first.',
                                ru: 'Запишитесь на приём или сначала ознакомьтесь с помещениями и оснащением.',
                                ar: 'احجزوا موعداً أو ألقوا أولاً نظرة على الغرف والتجهيزات.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">
                                {{ de: 'Termin anfragen', en: 'Request appointment', ru: 'Записаться на приём', ar: 'طلب موعد' }[locale]}
                            </Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/praxis">
                                {
                                    {
                                        de: 'Mehr zur Praxis',
                                        en: 'More about the practice',
                                        ru: 'Подробнее о практике',
                                        ar: 'مزيد عن العيادة',
                                    }[locale]
                                }
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
