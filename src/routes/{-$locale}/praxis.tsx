import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../../web/components/base/button';
import { Reveal } from '../../web/components/Reveal';
import { SectionEyebrow } from '../../web/components/SectionEyebrow';
import { PRAXIS_HYGIENE_PILLARS, PRAXIS_REPROCESSING_STEPS } from '../../web/content/praxisContent';
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
            title: {
                de: 'Podologische Praxis Dudenhofen — Annette Yilmaz',
                en: 'Podiatry practice Dudenhofen — Annette Yilmaz',
                ru: 'Подологическая практика Dudenhofen — Annette Yilmaz',
                ar: 'عيادة العناية بالقدم في Dudenhofen — Annette Yilmaz',
            }[locale],
            description: {
                de: 'Podologie Dudenhofen — barrierefreie Räume, Therapeutin Annette Yilmaz und Hygiene nach RKI-Empfehlung.',
                en: 'Podologie Dudenhofen — accessible rooms, podiatrist Annette Yilmaz and hygiene to RKI standard.',
                ru: 'Podologie Dudenhofen — доступные помещения, терапевт Annette Yilmaz и гигиена по рекомендациям RKI.',
                ar: 'Podologie Dudenhofen — غرف سهلة الوصول، المعالجة Annette Yilmaz ونظافة وفق توصيات RKI.',
            }[locale],
            path: '/praxis',
            locale,
            webPageUrl: webPageUrlGet(),
            breadcrumb: [
                { name: { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' }[locale], path: '/' },
                { name: { de: 'Praxis', en: 'Practice', ru: 'Практика', ar: 'العيادة' }[locale], path: '/praxis' },
            ],
        });
    },
    component: PraxisPage,
});

function PraxisPage() {
    const locale = useLocale();

    return (
        <main>
            <section id="hero" className="mx-auto max-w-5xl scroll-mt-20 px-6 pt-16 pb-20">
                <Reveal>
                    <SectionEyebrow>{{ de: 'Praxis', en: 'Practice', ru: 'Практика', ar: 'العيادة' }[locale]}</SectionEyebrow>
                    <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight font-semibold text-aubergine-dark sm:text-5xl">
                        {
                            {
                                de: 'Eine ruhige Praxis in Dudenhofen — Räume, Therapeutin, Hygiene.',
                                en: 'A calm practice in Dudenhofen — rooms, therapist, hygiene.',
                                ru: 'Спокойная практика в Dudenhofen — помещения, терапевт, гигиена.',
                                ar: 'عيادة هادئة في Dudenhofen — الغرف، المعالجة، النظافة.',
                            }[locale]
                        }
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-brand-charcoal-2)">
                        {
                            {
                                de: 'Bei mir wird immer nur eine Patientin oder ein Patient behandelt — mit Zeit, geübten Händen und sauber aufbereitetem Instrumentarium.',
                                en: 'Only one patient is treated at a time — with time, trained hands and properly reprocessed instruments.',
                                ru: 'У меня всегда обслуживается только один пациент — с уделением времени, опытными руками и тщательно обработанными инструментами.',
                                ar: 'يتم علاج مريض واحد فقط في كل مرة — بالوقت الكافي وأيدٍ متمرسة وأدوات تمت معالجتها بعناية.',
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
                            <Link to="/{-$locale}/leistungen">
                                {{ de: 'Leistungen ansehen', en: 'View services', ru: 'Посмотреть услуги', ar: 'عرض الخدمات' }[locale]}
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </section>

            <section id="raeume" className="scroll-mt-20 bg-blush">
                <div className="mx-auto max-w-5xl px-6 py-20">
                    <Reveal>
                        <SectionEyebrow>{{ de: 'Räume', en: 'Rooms', ru: 'Помещения', ar: 'الغرف' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Barrierefrei, ruhig, klimatisiert.',
                                    en: 'Accessible, calm and air-conditioned.',
                                    ru: 'Доступно, спокойно и с кондиционированием.',
                                    ar: 'سهلة الوصول، هادئة ومكيّفة.',
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
                                        ru: 'Кабинет подологической практики Dudenhofen с креслом для процедур и лампой.',
                                        ar: 'غرفة العلاج في عيادة Podologie Dudenhofen مع كرسي العلاج والمصباح.',
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
                                            en: 'The practice is on ground level and step-free — accessible with a walker or wheelchair. Treatment takes place lying down or seated, whichever is more comfortable for you.',
                                            ru: 'Практика находится на первом этаже, доступ без ступеней — в том числе с ходунками или инвалидной коляской. Процедуры проводятся лёжа или сидя — в зависимости от того, как Вам удобнее.',
                                            ar: 'العيادة في الطابق الأرضي ويمكن الوصول إليها بدون درج — حتى باستخدام المشّاية أو الكرسي المتحرك. يتم العلاج بوضعية الاستلقاء أو الجلوس، بحسب ما هو أكثر راحة لكم.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Es ist immer nur eine Patientin oder ein Patient zur Zeit im Raum. Kein Wartezimmer-Trubel, keine parallelen Behandlungen — die Zeit gehört Ihnen.',
                                            en: 'Only one patient is in the room at a time. No busy waiting room, no parallel treatments — the time is yours.',
                                            ru: 'В помещении всегда находится только один пациент. Никакой суеты в зале ожидания, никаких параллельных процедур — это время принадлежит Вам.',
                                            ar: 'يوجد مريض واحد فقط في الغرفة في كل مرة. لا ازدحام في غرفة الانتظار ولا علاجات متوازية — الوقت لكم وحدكم.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Der Raum ist klimatisiert und gut belüftet und mit medizinischer Behandlungseinheit, Lupenleuchte und Absaugung ausgestattet. Alles, was für eine saubere podologische Behandlung gebraucht wird — nicht mehr, nicht weniger.',
                                            en: 'The room is air-conditioned and well-ventilated, equipped with a medical treatment unit, magnifying lamp and suction. Everything a clean podiatric treatment requires — no more, no less.',
                                            ru: 'Помещение оборудовано кондиционером и хорошо проветривается, оснащено медицинским модулем, лупой-светильником и системой отсоса. Всё, что необходимо для чистой подологической процедуры — не больше и не меньше.',
                                            ar: 'الغرفة مكيّفة وجيدة التهوية ومجهزة بوحدة علاج طبية ومصباح مكبر وشفط. كل ما يلزم لعلاج نظيف للقدمين — لا أكثر ولا أقل.',
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
                        <SectionEyebrow>{{ de: 'Therapeutin', en: 'Therapist', ru: 'Терапевт', ar: 'المعالجة' }[locale]}</SectionEyebrow>
                        <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-aubergine-dark sm:text-4xl">
                            {
                                {
                                    de: 'Annette Yilmaz — Podologin und sektorale Heilpraktikerin.',
                                    en: 'Annette Yilmaz — podiatrist and sectoral Heilpraktiker.',
                                    ru: 'Annette Yilmaz — подолог и секторальный Heilpraktiker.',
                                    ar: 'Annette Yilmaz — أخصائية عناية بالقدم وHeilpraktiker قطاعية.',
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
                                        ru: 'Annette Yilmaz, подолог в Dudenhofen.',
                                        ar: 'Annette Yilmaz، أخصائية العناية بالقدم في Dudenhofen.',
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
                                            ru: 'В 2008 году я получила своё первое образование в области косметического ухода за стопами. Быстро стало ясно, что мне не хватает медицинской части — диабет, вросшие ногти, точки давления, — чтобы полноценно заботиться о моих пациентах.',
                                            ar: 'في عام 2008، أكملت تدريبي الأول في مجال العناية التجميلية بالقدم. وسرعان ما اتضح أن الجانب الطبي — السكري والأظافر الغارزة ونقاط الضغط — هو ما أحتاج إليه لرعاية المرضى رعاية كاملة.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Daraufhin habe ich die dreijährige Ausbildung an einer Podologie-Schule absolviert und mit dem Staatsexamen abgeschlossen. Am 02.09.2017 habe ich die Prüfung zum sektoralen Heilpraktiker für Podologie bestanden, anerkannt am 22.03.2022 in Rheinland-Pfalz.',
                                            en: 'I then completed the three-year programme at a podiatry school with the German state examination. On 02.09.2017 I passed the examination for the sectoral Heilpraktiker for podiatry, recognised on 22.03.2022 in Rhineland-Palatinate.',
                                            ru: 'Затем я прошла трёхлетнее обучение в школе подологии и завершила его государственным экзаменом. 02.09.2017 я сдала экзамен на секторального Heilpraktiker по подологии, признанный 22.03.2022 в земле Рейнланд-Пфальц.',
                                            ar: 'بعد ذلك أكملت برنامجًا مدته ثلاث سنوات في مدرسة للعناية بالقدم وحصلت على الامتحان الحكومي. وفي 02.09.2017 اجتزت امتحان Heilpraktiker القطاعي في العناية بالقدم، الذي تم الاعتراف به في 22.03.2022 في ولاية راينلاند بالاتينات.',
                                        }[locale]
                                    }
                                </p>
                                <p>
                                    {
                                        {
                                            de: 'Als Podologin mit Kassenzulassung besuche ich regelmäßig Fortbildungen — zu Diabetischem Fußsyndrom, Nagelkorrektur-Spangen und neuen Materialien. So bleiben Behandlungen auf dem aktuellen Stand.',
                                            en: 'As an accredited podiatrist I attend continuing-education courses regularly — on diabetic foot syndrome, nail-correction braces and new materials. This keeps treatments up to current standards.',
                                            ru: 'Как подолог с допуском больничных касс, я регулярно посещаю курсы повышения квалификации — по диабетической стопе, корригирующим ногтевым скобам и новым материалам. Это позволяет поддерживать процедуры на актуальном уровне.',
                                            ar: 'بصفتي أخصائية عناية بالقدم معتمدة لدى صناديق التأمين الصحي، أحضر دورات التعليم المستمر بانتظام — حول متلازمة القدم السكرية وأقواس تصحيح الأظافر والمواد الجديدة. وبذلك تبقى المعالجات وفق أحدث المعايير.',
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
                            {{ de: 'Hygiene', en: 'Hygiene', ru: 'Гигиена', ar: 'النظافة' }[locale]}
                        </span>
                        <span aria-hidden className="h-px flex-1 bg-gold/40" />
                    </div>
                    <h2 className="mt-6 max-w-3xl font-serif text-3xl leading-tight font-semibold text-cream sm:text-4xl">
                        {
                            {
                                de: 'Sauberes Arbeiten — sichtbar und nachvollziehbar.',
                                en: 'Clean work — visible and verifiable.',
                                ru: 'Чистая работа — видимая и прослеживаемая.',
                                ar: 'عمل نظيف — مرئي وقابل للتحقق.',
                            }[locale]
                        }
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
                        {
                            {
                                de: 'Hygiene ist in einer podologischen Praxis kein Marketing-Punkt, sondern Grundlage. Drei Bereiche, die bei mir verbindlich geregelt sind:',
                                en: 'Hygiene in a podiatry practice is not a marketing point — it is the baseline. Three areas that are firmly set in my practice:',
                                ru: 'Гигиена в подологической практике — это не маркетинговый пункт, а основа. Три области, которые в моей практике строго регламентированы:',
                                ar: 'النظافة في عيادة العناية بالقدم ليست نقطة تسويقية، بل هي الأساس. ثلاثة مجالات منظمة بشكل ملزم في عيادتي:',
                            }[locale]
                        }
                    </p>
                    <div className="mt-12 grid gap-8 sm:grid-cols-3">
                        {PRAXIS_HYGIENE_PILLARS.map((pillar) => {
                            const Icon = pillar.icon!;
                            return (
                                <div key={pillar.id} id={pillar.id} className="search-target scroll-mt-20">
                                    <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                                    <h3 className="mt-4 font-serif text-xl font-semibold text-cream">{pillar.heading[locale]}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-cream/80">{pillar.body[locale]}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-20">
                        <h3 className="max-w-3xl font-serif text-2xl leading-tight font-semibold text-cream sm:text-3xl">
                            {
                                {
                                    de: 'Instrumentenaufbereitung — Schritt für Schritt.',
                                    en: 'Instrument reprocessing — step by step.',
                                    ru: 'Обработка инструментов — шаг за шагом.',
                                    ar: 'إعادة معالجة الأدوات — خطوة بخطوة.',
                                }[locale]
                            }
                        </h3>
                        <p className="mt-4 max-w-2xl leading-relaxed text-cream/80">
                            {
                                {
                                    de: 'Jedes Instrument durchläuft denselben dreistufigen Prozess. Die Geräte stehen direkt in der Praxis — nichts wird ausgelagert.',
                                    en: 'Every instrument goes through the same three-stage process. The equipment lives in the practice itself — nothing is outsourced.',
                                    ru: 'Каждый инструмент проходит один и тот же трёхэтапный процесс. Оборудование находится непосредственно в практике — ничего не передаётся на сторону.',
                                    ar: 'تمر كل أداة بنفس العملية المكوّنة من ثلاث مراحل. والأجهزة موجودة في العيادة نفسها — لا يتم الاستعانة بأي جهة خارجية.',
                                }[locale]
                            }
                        </p>
                        <ol className="mt-10 grid gap-8 md:grid-cols-3">
                            {PRAXIS_REPROCESSING_STEPS.map((step, index) => (
                                <li key={step.id} id={step.id} className="search-target scroll-mt-20">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-gold">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span aria-hidden className="h-px flex-1 bg-gold/30" />
                                    </div>
                                    <img
                                        src={step.image.src}
                                        alt={step.image.alt[locale]}
                                        loading="lazy"
                                        className="mt-4 aspect-[4/3] w-full rounded-xl border border-cream/15 object-cover shadow-sm"
                                    />
                                    <h4 className="mt-5 font-serif text-lg font-semibold text-cream">{step.heading[locale]}</h4>
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
