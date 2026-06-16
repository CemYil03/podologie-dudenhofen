import { createFileRoute, Link } from '@tanstack/react-router';
import {
    CalendarIcon,
    ClipboardCheckIcon,
    CreditCardIcon,
    EuroIcon,
    HomeIcon,
    PercentIcon,
    PhoneIcon,
    ShieldCheckIcon,
} from 'lucide-react';
import { useState } from 'react';
import { formatPhoneNumber } from '../../shared/formatters/formatPhoneNumber';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import {
    LEISTUNGEN_BRING_LIST_KASSE,
    LEISTUNGEN_BRING_LIST_PRIVAT,
    LEISTUNGEN_CHECKLIST,
    LEISTUNGEN_SERVICE_GROUPS,
} from '../../web/content/leistungenContent';
import { LeistungenPageDocument } from '../../web/graphql/generated';
import { routeLoaderGraphqlClient } from '../../web/graphql/routeLoaderGraphqlClient';
import { useLocale } from '../../web/hooks/useLocale';
import { PRACTICE } from '../../web/practice';
import { seoMeta } from '../../web/seo/seoMeta';
import { webPageUrlGet } from '../../web/seo/webPageUrlGet';
import { cn } from '../../web/utils/cn';
import { localeFromParam } from '../../web/utils/locale';

type PatientType = 'kasse' | 'privat';

export const Route = createFileRoute('/{-$locale}/leistungen')({
    loader: () => routeLoaderGraphqlClient(LeistungenPageDocument)(),
    staleTime: 0,
    head: ({ params }) => {
        const locale = localeFromParam(params);
        return seoMeta({
            title: {
                de: 'Medizinische Fußpflege & Nagelkorrektur — Leistungen',
                en: 'Medical foot care & nail correction — services',
                ru: 'Медицинский педикюр и коррекция ногтей — услуги',
                ar: 'العناية الطبية بالقدم وتصحيح الأظافر — الخدمات',
            }[locale],
            description: {
                de: 'Medizinische Fußpflege, Nagelkorrektur-Spangen, Behandlung des diabetischen Fußsyndroms, Pilzinfektionen, Hühneraugen und Hausbesuche — Podologie Dudenhofen mit Krankenkassenzulassung.',
                en: 'Medical foot care, nail-correction braces, diabetic foot syndrome, fungal infections, corns and home visits — Podologie Dudenhofen, accredited with statutory health insurance.',
                ru: 'Медицинский педикюр, ортониксические скобы, лечение диабетической стопы, грибковых инфекций, натоптышей и выезды на дом — Podologie Dudenhofen с допуском к работе с больничными кассами.',
                ar: 'العناية الطبية بالقدم، أقواس تصحيح الأظافر، علاج متلازمة القدم السكرية، الالتهابات الفطرية، الكالو والزيارات المنزلية — Podologie Dudenhofen معتمدة لدى التأمين الصحي القانوني.',
            }[locale],
            path: '/leistungen',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Leistungen', en: 'Services', ru: 'Услуги', ar: 'الخدمات' }[locale], path: '/leistungen' },
            ],
            // Mirrors the on-page "Brauche ich eine podologische Behandlung?"
            // checklist plus the cost questions — these are exactly the
            // long-tail informational queries the page should win.
            faq: [
                {
                    question: {
                        de: 'Brauche ich eine podologische Behandlung?',
                        en: 'Do I need a podiatry appointment?',
                        ru: 'Нужна ли мне подологическая процедура?',
                        ar: 'هل أحتاج إلى علاج تقويم القدم؟',
                    }[locale],
                    answer: {
                        de: 'Ein Termin lohnt sich bei anhaltenden Fußschmerzen, Diabetes mit auffälligen Hautstellen, eingewachsenen oder verformten Nägeln, Hornhaut, Hühneraugen, Pilzinfektionen oder einer ärztlichen Verordnung über „podologische Behandlung".',
                        en: 'An appointment is worth considering if you have persistent foot pain, diabetes with skin changes, ingrown or deformed nails, calluses, corns, fungal infections, or a medical prescription for "podiatric treatment".',
                        ru: 'Запись на приём имеет смысл при стойких болях в стопе, диабете с изменениями кожи, вросших или деформированных ногтях, мозолях, натоптышах, грибковых инфекциях или при наличии врачебного назначения на «подологическое лечение».',
                        ar: 'يُنصح بحجز موعد في حالات ألم القدم المستمر، أو السكري مع تغيرات جلدية، أو الأظافر الناشبة أو المشوهة، أو الجلد المتيبس، أو الكالو، أو الالتهابات الفطرية، أو وجود وصفة طبية لـ«علاج تقويم القدم».',
                    }[locale],
                },
                {
                    question: {
                        de: 'Was kostet eine podologische Behandlung?',
                        en: 'What does a podiatry treatment cost?',
                        ru: 'Сколько стоит подологическая процедура?',
                        ar: 'ما تكلفة علاج تقويم القدم؟',
                    }[locale],
                    answer: {
                        de: 'Bei Kassenzulassung mit Verordnung übernimmt die gesetzliche Krankenkasse die Kosten — Sie zahlen 10 € Rezeptgebühr je Verordnung und 10 % gesetzlichen Eigenanteil pro Behandlung. Privat- und Selbstzahler*innen rechnen wir nach Leistung ab.',
                        en: 'With a prescription and statutory accreditation, statutory insurance covers the cost — you pay a €10 prescription fee per prescription plus a 10% co-payment per treatment. Private patients and self-payers are billed by service.',
                        ru: 'При наличии допуска к работе с кассами и врачебного назначения расходы покрывает государственная больничная касса — вы оплачиваете 10 € рецептурного сбора за каждое назначение и 10 % обязательной доплаты за каждую процедуру. Частные и самоплатящие пациенты оплачивают по объёму услуги.',
                        ar: 'مع الاعتماد لدى التأمين القانوني ووجود وصفة طبية، يغطي التأمين الصحي القانوني التكلفة — تدفعون رسم وصفة قدره 10 يورو لكل وصفة بالإضافة إلى 10٪ مساهمة قانونية لكل جلسة. أما المرضى من القطاع الخاص والذين يدفعون من جيبهم فتُحسب التكلفة بحسب الخدمة.',
                    }[locale],
                },
                {
                    question: {
                        de: 'Bieten Sie Hausbesuche an?',
                        en: 'Do you offer home visits?',
                        ru: 'Делаете ли вы выезды на дом?',
                        ar: 'هل تقدمون زيارات منزلية؟',
                    }[locale],
                    answer: {
                        de: 'Ja, Hausbesuche sind nach Absprache möglich. Bei Kassenleistungen gilt der 10-%-Eigenanteil auch für Hauspauschale und Wegegeld.',
                        en: 'Yes, home visits are available by arrangement. For statutory-insurance treatments the 10% co-payment also applies to the home-visit flat fee and travel costs.',
                        ru: 'Да, выезды на дом возможны по предварительной договорённости. При услугах по линии больничной кассы 10 % доплата распространяется также на фиксированный сбор за выезд и транспортные расходы.',
                        ar: 'نعم، الزيارات المنزلية متاحة بالتنسيق المسبق. في خدمات التأمين القانوني، تنطبق نسبة المساهمة 10٪ أيضاً على الرسم الثابت للزيارة المنزلية وأجرة التنقل.',
                    }[locale],
                },
            ],
        });
    },
    component: LeistungenPage,
});

function LeistungenPage() {
    const locale = useLocale();
    const [patientType, setPatientType] = useState<PatientType>('kasse');

    const bringList = patientType === 'kasse' ? LEISTUNGEN_BRING_LIST_KASSE : LEISTUNGEN_BRING_LIST_PRIVAT;

    return (
        <main>
            {/* Hero */}
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Leistungen', en: 'Services', ru: 'Услуги', ar: 'الخدمات' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Was wir behandeln — und wann ein Termin sinnvoll ist',
                                en: 'What we treat — and when an appointment makes sense',
                                ru: 'Что мы лечим — и когда стоит записаться на приём',
                                ar: 'ما نعالجه — ومتى يكون حجز الموعد منطقياً',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Medizinische Fußpflege mit Kassenzulassung — von Hornhaut und Hühneraugen bis zum diabetischen Fußsyndrom und Nagelkorrektur-Spangen.',
                                en: 'Medical foot care with statutory health-insurance accreditation — from calluses and corns to diabetic foot syndrome and nail-correction braces.',
                                ru: 'Медицинский педикюр с допуском к больничным кассам — от мозолей и натоптышей до диабетической стопы и ортониксических скоб.',
                                ar: 'العناية الطبية بالقدم باعتماد التأمين الصحي القانوني — من الجلد المتيبس والكالو إلى متلازمة القدم السكرية وأقواس تصحيح الأظافر.',
                            }[locale]
                        }
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3 *:flex-1 sm:*:flex-none">
                        <Button variant="brand" size="lg" asChild>
                            <Link to="/{-$locale}/kontakt">
                                {{ de: 'Termin anfragen', en: 'Request appointment', ru: 'Запросить приём', ar: 'طلب موعد' }[locale]}
                            </Link>
                        </Button>
                        <Button variant="brand-outline" size="lg" asChild>
                            <Link to="/{-$locale}/praxis">
                                {
                                    { de: 'Praxis ansehen', en: 'View the practice', ru: 'Посмотреть практику', ar: 'تعرّفوا على العيادة' }[
                                        locale
                                    ]
                                }
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </section>

            {/* Brauche ich eine podologische Behandlung? */}
            <section id="brauche-ich-eine-behandlung" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Orientierung', en: 'Orientation', ru: 'Ориентир', ar: 'إرشاد' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Brauche ich eine podologische Behandlung?',
                                    en: 'Do I need a podiatry appointment?',
                                    ru: 'Нужна ли мне подологическая процедура?',
                                    ar: 'هل أحتاج إلى علاج تقويم القدم؟',
                                }[locale]
                            }
                        </h2>
                        <p className="mt-4 max-w-2xl text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Wenn einer der folgenden Punkte auf Sie zutrifft, lohnt sich ein Termin in der podologischen Praxis.',
                                    en: 'If any of the points below apply to you, a podiatry appointment is worth considering.',
                                    ru: 'Если хотя бы один из приведённых ниже пунктов касается вас, имеет смысл записаться на приём в подологическую практику.',
                                    ar: 'إذا كانت إحدى النقاط التالية تنطبق عليكم، فإن حجز موعد في عيادة تقويم القدم يستحق التفكير.',
                                }[locale]
                            }
                        </p>
                    </Reveal>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {LEISTUNGEN_CHECKLIST.map((item, index) => {
                            const Icon = item.icon!;
                            return (
                                <Reveal key={item.id} delayMs={index * 80}>
                                    <div
                                        id={item.id}
                                        className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                            <Icon
                                                className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                aria-hidden
                                            />
                                        </div>
                                        <h3 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">
                                            {item.heading[locale]}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal>
                        <p className="mt-10 max-w-3xl text-sm text-(--color-brand-charcoal-4)">
                            {
                                {
                                    de: 'Im Zweifel: rufen Sie an — wir sagen ehrlich, ob ein Termin sinnvoll ist. ',
                                    en: "When in doubt: call us — we'll tell you honestly whether an appointment makes sense. ",
                                    ru: 'В случае сомнений — позвоните: мы честно скажем, имеет ли смысл записываться. ',
                                    ar: 'عند الشك: اتصلوا بنا — سنخبركم بصراحة إن كان حجز الموعد مناسباً. ',
                                }[locale]
                            }
                            <a
                                href={`tel:${PRACTICE.phone}`}
                                className="inline-flex items-center gap-1.5 font-medium text-aubergine underline-offset-4 transition-transform duration-150 ease-out hover:underline active:scale-[0.98]"
                            >
                                <PhoneIcon className="size-3.5" aria-hidden />
                                {formatPhoneNumber(PRACTICE.phone)}
                            </a>
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Unsere Behandlungen */}
            <section id="leistungen" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Behandlungen', en: 'Treatments', ru: 'Процедуры', ar: 'العلاجات' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {{ de: 'Unsere Behandlungen', en: 'Our treatments', ru: 'Наши процедуры', ar: 'علاجاتنا' }[locale]}
                        </h2>
                        <p className="mt-4 max-w-2xl text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Jede Behandlung beginnt mit einem Gespräch — wir schauen, was Ihre Füße brauchen, und nehmen uns die Zeit dafür.',
                                    en: 'Every treatment starts with a conversation — we look at what your feet need and take the time it takes.',
                                    ru: 'Каждая процедура начинается с беседы — мы смотрим, что нужно вашим стопам, и не торопимся.',
                                    ar: 'يبدأ كل علاج بحديث — ننظر إلى ما تحتاجه أقدامكم ونأخذ الوقت اللازم لذلك.',
                                }[locale]
                            }
                        </p>
                    </Reveal>

                    <div className="mt-12 space-y-14">
                        {LEISTUNGEN_SERVICE_GROUPS.map((group) => (
                            <div key={group.id}>
                                <Reveal>
                                    <h3 className="font-serif text-2xl font-semibold text-aubergine-dark">{group.heading[locale]}</h3>
                                    <p className="mt-2 max-w-2xl text-sm text-(--color-brand-charcoal-2)">{group.body[locale]}</p>
                                </Reveal>
                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((service, index) => {
                                        const Icon = service.icon!;
                                        return (
                                            <Reveal key={service.id} delayMs={index * 80}>
                                                <article
                                                    id={service.id}
                                                    className="search-target group h-full scroll-mt-20 rounded-xl border border-aubergine/10 bg-cream p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
                                                >
                                                    <div className="flex size-11 items-center justify-center rounded-lg bg-blush p-2 transition-colors duration-300 ease-out group-hover:bg-aubergine">
                                                        <Icon
                                                            className="size-5 text-aubergine transition-colors duration-300 ease-out group-hover:text-cream"
                                                            aria-hidden
                                                        />
                                                    </div>
                                                    <h4 className="mt-4 font-serif text-lg font-semibold text-aubergine-dark">
                                                        {service.heading[locale]}
                                                    </h4>
                                                    <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                                        {service.body[locale]}
                                                    </p>
                                                </article>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Was bringe ich mit? */}
            <section id="was-bringe-ich-mit" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>
                            {{ de: 'Erster Termin', en: 'First appointment', ru: 'Первый приём', ar: 'الموعد الأول' }[locale]}
                        </SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Was bringe ich zum ersten Termin mit?',
                                    en: 'What to bring to your first appointment',
                                    ru: 'Что взять с собой на первый приём?',
                                    ar: 'ماذا أحضر معي إلى الموعد الأول؟',
                                }[locale]
                            }
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm font-medium text-aubergine">
                            {
                                {
                                    de: 'Das hängt davon ab, ob Sie Kassen- oder Privatpatient*in sind:',
                                    en: 'It depends on whether you have statutory insurance or pay privately:',
                                    ru: 'Это зависит от того, являетесь ли вы пациентом по линии больничной кассы или частным:',
                                    ar: 'يعتمد ذلك على ما إذا كنتم مؤمَّنين عبر التأمين القانوني أم تدفعون من القطاع الخاص:',
                                }[locale]
                            }
                        </p>
                        <div
                            role="tablist"
                            aria-label={{ de: 'Patientenart', en: 'Patient type', ru: 'Тип пациента', ar: 'نوع المريض' }[locale]}
                            className="mt-3 inline-flex rounded-full border border-aubergine/20 bg-cream p-1"
                        >
                            {(
                                [
                                    {
                                        value: 'kasse',
                                        label: {
                                            de: 'Kassenpatient*in',
                                            en: 'Statutory insurance',
                                            ru: 'Пациент больничной кассы',
                                            ar: 'مريض التأمين القانوني',
                                        },
                                    },
                                    {
                                        value: 'privat',
                                        label: {
                                            de: 'Privatpatient*in / Selbstzahler*in',
                                            en: 'Private / self-payer',
                                            ru: 'Частный пациент / самоплательщик',
                                            ar: 'القطاع الخاص / الدفع الذاتي',
                                        },
                                    },
                                ] as const
                            ).map((option) => {
                                const active = patientType === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="tab"
                                        id={`patient-tab-${option.value}`}
                                        aria-selected={active}
                                        aria-controls={`patient-panel-${option.value}`}
                                        onClick={() => setPatientType(option.value)}
                                        className={cn(
                                            'rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 cursor-pointer',
                                            active ? 'bg-aubergine text-cream' : 'text-aubergine/70 hover:text-aubergine',
                                        )}
                                    >
                                        {option.label[locale]}
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>

                    <div
                        key={patientType}
                        role="tabpanel"
                        id={`patient-panel-${patientType}`}
                        aria-labelledby={`patient-tab-${patientType}`}
                    >
                        <Reveal>
                            <p className="mt-6 max-w-2xl text-(--color-brand-charcoal-2)">
                                {patientType === 'kasse'
                                    ? {
                                          de: 'Für Kassenpatient*innen — damit wir Ihre Verordnung sauber abrechnen können.',
                                          en: 'For statutory-insurance patients — so we can bill your prescription cleanly.',
                                          ru: 'Для пациентов больничной кассы — чтобы мы могли корректно оформить расчёт по вашему назначению.',
                                          ar: 'لمرضى التأمين القانوني — لكي نتمكن من تسوية فاتورة وصفتكم بشكل سليم.',
                                      }[locale]
                                    : {
                                          de: 'Für Privatpatient*innen — damit der Termin entspannt verläuft.',
                                          en: 'For private patients — so your visit stays relaxed.',
                                          ru: 'Для частных пациентов — чтобы приём прошёл спокойно.',
                                          ar: 'لمرضى القطاع الخاص — لكي يسير الموعد بسلاسة.',
                                      }[locale]}
                            </p>
                        </Reveal>

                        <ol className="mt-8 grid max-w-3xl gap-5">
                            {bringList.map((item, index) => (
                                <Reveal key={item.id} as="li" delayMs={index * 80} className="flex gap-4">
                                    <span
                                        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-aubergine font-serif text-sm font-semibold text-cream"
                                        aria-hidden
                                    >
                                        {index + 1}
                                    </span>
                                    <div id={item.id} className="search-target scroll-mt-20">
                                        <h3 className="font-serif text-lg font-semibold text-aubergine-dark">{item.heading[locale]}</h3>
                                        <p className="mt-1 text-(--color-brand-charcoal-2)">{item.body[locale]}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Kosten */}
            <section id="kosten" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Kosten', en: 'Costs', ru: 'Стоимость', ar: 'التكاليف' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Kosten und Krankenkasse',
                                    en: 'Costs and insurance',
                                    ru: 'Стоимость и больничная касса',
                                    ar: 'التكاليف والتأمين الصحي',
                                }[locale]
                            }
                        </h2>
                    </Reveal>

                    <div key={patientType} className="mt-10 grid max-w-3xl gap-8">
                        {patientType === 'kasse' ? (
                            <>
                                <Reveal>
                                    <div className="flex gap-4">
                                        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                            <ClipboardCheckIcon className="size-5" aria-hidden />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                                {
                                                    {
                                                        de: 'Kassenleistung',
                                                        en: 'Statutory insurance',
                                                        ru: 'Услуга по линии больничной кассы',
                                                        ar: 'خدمة التأمين القانوني',
                                                    }[locale]
                                                }
                                            </h3>
                                            <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                                {
                                                    {
                                                        de: 'Bei diabetischem Fußsyndrom oder vergleichbaren Erkrankungen mit ärztlicher Verordnung übernehmen die gesetzlichen Krankenkassen die Kosten — wir rechnen direkt ab.',
                                                        en: 'For diabetic foot syndrome or comparable conditions with a medical prescription, statutory health insurance covers the costs — we bill directly.',
                                                        ru: 'При диабетической стопе или сопоставимых заболеваниях с врачебным назначением расходы покрывают государственные больничные кассы — мы рассчитываемся напрямую.',
                                                        ar: 'في حالة متلازمة القدم السكرية أو الحالات المماثلة مع وصفة طبية، يغطي التأمين الصحي القانوني التكاليف — ونقوم بالتسوية مباشرة.',
                                                    }[locale]
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal>
                                    <div className="rounded-xl border border-aubergine/10 bg-cream p-6">
                                        <h3 className="font-serif text-lg font-semibold text-aubergine-dark">
                                            {
                                                {
                                                    de: 'Was Sie als Kassenpatient*in selbst zahlen',
                                                    en: 'What you pay yourself as a statutory patient',
                                                    ru: 'Что вы оплачиваете самостоятельно как пациент больничной кассы',
                                                    ar: 'ما تدفعونه بأنفسكم بصفتكم مرضى التأمين القانوني',
                                                }[locale]
                                            }
                                        </h3>
                                        <ul className="mt-4 grid gap-4">
                                            {(
                                                [
                                                    {
                                                        Icon: EuroIcon,
                                                        heading: {
                                                            de: '10 € pro Verordnung',
                                                            en: '€10 per prescription',
                                                            ru: '10 € за рецепт',
                                                            ar: '10 يورو لكل وصفة',
                                                        },
                                                        body: {
                                                            de: 'Einmalige Rezeptgebühr je Verordnungsblatt — unabhängig davon, wie viele Behandlungen darauf stehen.',
                                                            en: 'A one-off prescription fee per prescription form — regardless of how many treatments are on it.',
                                                            ru: 'Единоразовый рецептурный сбор за каждый бланк назначения — независимо от количества указанных в нём процедур.',
                                                            ar: 'رسم وصفة لمرة واحدة لكل ورقة وصفة — بصرف النظر عن عدد الجلسات المدرجة عليها.',
                                                        },
                                                    },
                                                    {
                                                        Icon: PercentIcon,
                                                        heading: {
                                                            de: '10 % Eigenanteil je Behandlung',
                                                            en: '10% co-payment per treatment',
                                                            ru: '10 % доплата за каждую процедуру',
                                                            ar: '10٪ مساهمة لكل جلسة',
                                                        },
                                                        body: {
                                                            de: 'Gesetzliche Zuzahlung von 10 % der Behandlungskosten — diese rechnen wir direkt mit Ihnen ab.',
                                                            en: 'A statutory co-payment of 10% of the treatment cost — billed directly to you.',
                                                            ru: 'Обязательная доплата в размере 10 % от стоимости процедуры — рассчитывается напрямую с вами.',
                                                            ar: 'مساهمة قانونية بنسبة 10٪ من تكلفة الجلسة — تُحسب مباشرة معكم.',
                                                        },
                                                    },
                                                    {
                                                        Icon: HomeIcon,
                                                        heading: {
                                                            de: 'Hausbesuch: Eigenanteil auch auf Hauspauschale & Wegegeld',
                                                            en: 'Home visit: co-payment applies to flat fee & travel costs',
                                                            ru: 'Выезд на дом: доплата также на фиксированный сбор и транспортные расходы',
                                                            ar: 'الزيارة المنزلية: المساهمة تنطبق على الرسم الثابت وأجرة التنقل',
                                                        },
                                                        body: {
                                                            de: 'Die 10 % gelten nicht nur für die Behandlung, sondern auch für Hauspauschale und Wegegeld.',
                                                            en: 'The 10% applies not only to the treatment itself, but also to the home-visit flat fee and travel costs.',
                                                            ru: '10 % распространяются не только на саму процедуру, но и на фиксированный сбор за выезд и транспортные расходы.',
                                                            ar: 'تنطبق نسبة 10٪ ليس فقط على الجلسة نفسها، بل أيضاً على الرسم الثابت للزيارة المنزلية وأجرة التنقل.',
                                                        },
                                                    },
                                                    {
                                                        Icon: ShieldCheckIcon,
                                                        heading: {
                                                            de: 'Von Zuzahlungen befreit?',
                                                            en: 'Exempt from co-payments?',
                                                            ru: 'Освобождены от доплат?',
                                                            ar: 'هل أنتم معفون من المساهمات؟',
                                                        },
                                                        body: {
                                                            de: 'Wenn Ihre Krankenkasse Sie für das laufende Jahr von Zuzahlungen befreit hat, bringen Sie bitte den Befreiungsausweis mit.',
                                                            en: 'If your health-insurance fund has granted you a co-payment exemption for this year, please bring the exemption certificate.',
                                                            ru: 'Если ваша больничная касса освободила вас от доплат на текущий год, пожалуйста, принесите удостоверение об освобождении.',
                                                            ar: 'إذا منحتكم جهة التأمين الصحي إعفاءً من المساهمات لهذا العام، يُرجى إحضار شهادة الإعفاء.',
                                                        },
                                                    },
                                                ] as const
                                            ).map((row, index) => (
                                                <Reveal key={row.heading.de} as="li" delayMs={index * 80} className="flex gap-3">
                                                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                                        <row.Icon className="size-4" aria-hidden />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-aubergine-dark">{row.heading[locale]}</h4>
                                                        <p className="text-sm text-(--color-brand-charcoal-2)">{row.body[locale]}</p>
                                                    </div>
                                                </Reveal>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>

                                <Reveal>
                                    <button
                                        type="button"
                                        onClick={() => setPatientType('privat')}
                                        className="group inline-flex items-center gap-1 text-sm text-aubergine underline-offset-4 hover:underline"
                                    >
                                        {
                                            {
                                                de: 'Privat ohne Verordnung? Hier wechseln',
                                                en: 'Private without prescription? Switch here',
                                                ru: 'Частный без назначения? Переключиться здесь',
                                                ar: 'القطاع الخاص بدون وصفة؟ التبديل هنا',
                                            }[locale]
                                        }
                                        <span
                                            aria-hidden
                                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                        >
                                            →
                                        </span>
                                    </button>
                                </Reveal>
                            </>
                        ) : (
                            <Reveal>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blush text-aubergine">
                                        <CreditCardIcon className="size-5" aria-hidden />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-aubergine-dark">
                                            {{ de: 'Selbstzahler', en: 'Self-payers', ru: 'Самоплательщики', ar: 'الدفع الذاتي' }[locale]}
                                        </h3>
                                        <p className="mt-2 leading-relaxed text-(--color-brand-charcoal-2)">
                                            {
                                                {
                                                    de: 'Privat und ohne Verordnung gerne nach Leistung — konkrete Preise nennen wir Ihnen am Telefon.',
                                                    en: 'Private and without a prescription, billed by service — we share specific prices over the phone.',
                                                    ru: 'Частно и без назначения — расчёт по услуге; конкретные цены сообщаем по телефону.',
                                                    ar: 'القطاع الخاص وبدون وصفة، تُحسب التكلفة بحسب الخدمة — نخبركم بالأسعار المحددة عبر الهاتف.',
                                                }[locale]
                                            }
                                        </p>
                                        <a
                                            href={`tel:${PRACTICE.phone}`}
                                            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-aubergine underline-offset-4 transition-transform duration-150 ease-out hover:underline active:scale-[0.98]"
                                        >
                                            <PhoneIcon className="size-4" aria-hidden />
                                            {formatPhoneNumber(PRACTICE.phone)}
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => setPatientType('kasse')}
                                            className="group mt-3 inline-flex items-center gap-1 text-sm text-aubergine underline-offset-4 hover:underline"
                                        >
                                            {
                                                {
                                                    de: 'Mit ärztlicher Verordnung? Hier wechseln',
                                                    en: 'With a medical prescription? Switch here',
                                                    ru: 'С врачебным назначением? Переключиться здесь',
                                                    ar: 'مع وصفة طبية؟ التبديل هنا',
                                                }[locale]
                                            }
                                            <span
                                                aria-hidden
                                                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                                            >
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="termin" className="scroll-mt-20">
                <div className="mx-auto max-w-5xl px-6 pt-4 pb-24 text-center">
                    <Reveal>
                        <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Bereit für den nächsten Schritt?',
                                    en: 'Ready for the next step?',
                                    ru: 'Готовы к следующему шагу?',
                                    ar: 'هل أنتم مستعدون للخطوة التالية؟',
                                }[locale]
                            }
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-(--color-brand-charcoal-2)">
                            {
                                {
                                    de: 'Schreiben Sie uns über das Kontaktformular — oder rufen Sie kurz an, wenn es schneller gehen soll.',
                                    en: "Send us a message via the contact form — or call us briefly if you'd rather sort it out by phone.",
                                    ru: 'Напишите нам через контактную форму — или позвоните, если нужно быстрее.',
                                    ar: 'راسلونا عبر نموذج التواصل — أو اتصلوا بنا باختصار إن كنتم تفضلون إنجاز الأمر هاتفياً.',
                                }[locale]
                            }
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 *:flex-1 sm:*:flex-none">
                            <Button variant="brand" size="lg" asChild>
                                <Link to="/{-$locale}/kontakt">
                                    <CalendarIcon className="size-4" aria-hidden />
                                    {{ de: 'Termin anfragen', en: 'Request appointment', ru: 'Запросить приём', ar: 'طلب موعد' }[locale]}
                                </Link>
                            </Button>
                            <Button
                                variant="link"
                                asChild
                                className="inline-flex items-center gap-2 rounded-full border border-aubergine/20 px-5 py-2.5 text-sm font-medium text-aubergine transition-[color,background-color,transform] duration-150 ease-out hover:bg-aubergine hover:text-cream active:scale-[0.98]"
                            >
                                <a href={`tel:${PRACTICE.phone}`}>
                                    <PhoneIcon className="size-4" aria-hidden />
                                    {formatPhoneNumber(PRACTICE.phone)}
                                </a>
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
