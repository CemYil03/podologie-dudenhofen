import {
    ActivityIcon,
    AlertCircleIcon,
    BandageIcon,
    BugIcon,
    CompassIcon,
    DropletIcon,
    FileTextIcon,
    FootprintsIcon,
    HandHeartIcon,
    HandIcon,
    HeartPulseIcon,
    MessageCircleIcon,
    PillIcon,
    ScissorsIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StethoscopeIcon,
    TargetIcon,
    WrenchIcon,
} from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const LEISTUNGEN_CHECKLIST: ReadonlyArray<ContentLeaf> = [
    {
        id: 'check-schmerzen',
        icon: AlertCircleIcon,
        heading: {
            de: 'Anhaltende Schmerzen am Fuß',
            en: 'Persistent foot pain',
            ru: 'Постоянные боли в стопе',
            ar: 'آلام مستمرة في القدم',
        },
        body: {
            de: 'Beschwerden, die sich beim Gehen oder Stehen nicht von selbst beruhigen.',
            en: "Discomfort while walking or standing that doesn't settle on its own.",
            ru: 'Дискомфорт при ходьбе или стоянии, который не проходит самостоятельно.',
            ar: 'انزعاج أثناء المشي أو الوقوف لا يزول من تلقاء نفسه.',
        },
        keywords: {
            de: ['schmerz', 'schmerzen', 'fußschmerzen', 'beschwerden'],
            en: ['pain', 'foot pain', 'discomfort'],
            ru: ['боль', 'боли', 'боль в стопе', 'дискомфорт'],
            ar: ['ألم', 'آلام', 'ألم القدم', 'انزعاج'],
        },
    },
    {
        id: 'check-diabetes',
        icon: ActivityIcon,
        heading: {
            de: 'Diabetes mit auffälligen Stellen',
            en: 'Diabetes with noticeable changes',
            ru: 'Диабет с заметными изменениями на стопе',
            ar: 'مرض السكري مع تغيرات ملحوظة',
        },
        body: {
            de: 'Druckstellen, Risse oder Verfärbungen am Fuß, wenn Sie Diabetes haben.',
            en: 'Pressure points, fissures or discoloration if you have diabetes.',
            ru: 'Участки давления, трещины или изменение цвета кожи стопы при диабете.',
            ar: 'مناطق ضغط أو تشققات أو تغير في لون القدم لدى مرضى السكري.',
        },
        keywords: {
            de: ['diabetes', 'diabetisch', 'dfs', 'diabetisches fußsyndrom', 'druckstelle', 'risse'],
            en: ['diabetes', 'diabetic', 'diabetic foot syndrome', 'pressure', 'fissure'],
            ru: ['диабет', 'диабетический', 'dfs', 'диабетическая стопа', 'давление', 'трещины'],
            ar: ['السكري', 'السكر', 'dfs', 'متلازمة القدم السكرية', 'ضغط', 'تشققات'],
        },
    },
    {
        id: 'check-durchblutung',
        icon: HeartPulseIcon,
        heading: {
            de: 'Durchblutungs- oder Nervenstörungen',
            en: 'Circulation or nerve disorders',
            ru: 'Нарушения кровообращения или нервной чувствительности',
            ar: 'اضطرابات الدورة الدموية أو الأعصاب',
        },
        body: {
            de: 'Bei pAVK, Polyneuropathie oder Rheuma sollten Füße fachlich mitbehandelt werden — auch ohne sichtbare Beschwerden.',
            en: 'With PAD, polyneuropathy or rheumatic conditions, your feet should be cared for professionally — even without visible symptoms.',
            ru: 'При облитерирующем атеросклерозе, полинейропатии или ревматических заболеваниях стопам нужен профессиональный уход — даже без видимых жалоб.',
            ar: 'في حالات قصور الشرايين المحيطية أو الاعتلال العصبي أو الروماتيزم، تحتاج القدم إلى عناية متخصصة — حتى دون شكاوى ظاهرة.',
        },
        keywords: {
            de: [
                'durchblutung',
                'durchblutungsstörung',
                'pavk',
                'arteriell',
                'neuropathie',
                'polyneuropathie',
                'nerven',
                'rheuma',
                'rheumatisch',
                'gefühlsstörung',
                'taubheit',
            ],
            en: [
                'circulation',
                'pad',
                'peripheral arterial disease',
                'neuropathy',
                'polyneuropathy',
                'nerves',
                'rheuma',
                'rheumatic',
                'numbness',
            ],
            ru: [
                'кровообращение',
                'нарушение кровообращения',
                'облитерирующий атеросклероз',
                'нейропатия',
                'полинейропатия',
                'нервы',
                'ревматизм',
                'ревматический',
                'онемение',
            ],
            ar: ['الدورة الدموية', 'قصور الشرايين', 'الاعتلال العصبي', 'اعتلال الأعصاب', 'الأعصاب', 'الروماتيزم', 'تنميل'],
        },
    },
    {
        id: 'check-blutverduenner',
        icon: DropletIcon,
        heading: {
            de: 'Blutverdünner oder Marcumar',
            en: 'Blood thinners or anticoagulants',
            ru: 'Антикоагулянты или варфарин',
            ar: 'مميعات الدم أو الوارفارين',
        },
        body: {
            de: 'Selber schneiden ist riskant — kleine Verletzungen bluten lange. Podologisch geht es sicher und steril.',
            en: 'Cutting yourself is risky — small injuries bleed for a long time. Podiatry handles it safely and sterilely.',
            ru: 'Стричь самостоятельно рискованно — мелкие порезы долго кровоточат. У подолога это безопасно и стерильно.',
            ar: 'القص الذاتي خطِر — الجروح الصغيرة تنزف طويلاً. لدى أخصائي تقويم القدم يتم ذلك بأمان وتعقيم.',
        },
        keywords: {
            de: ['blutverdünner', 'marcumar', 'ass', 'aspirin', 'antikoagulanz', 'gerinnungshemmer', 'eliquis', 'xarelto'],
            en: ['blood thinner', 'anticoagulant', 'warfarin', 'aspirin', 'eliquis', 'xarelto'],
            ru: ['антикоагулянт', 'варфарин', 'аспирин', 'разжижитель крови', 'эликвис', 'ксарелто'],
            ar: ['مميعات الدم', 'مضاد التخثر', 'وارفارين', 'أسبرين'],
        },
    },
    {
        id: 'check-selbstpflege',
        icon: HandHeartIcon,
        heading: {
            de: 'Selbstpflege fällt schwer',
            en: 'Self-care is getting harder',
            ru: 'Ухаживать самостоятельно становится трудно',
            ar: 'العناية الذاتية أصبحت صعبة',
        },
        body: {
            de: 'Eingeschränkte Sehkraft, Beweglichkeit oder Kraft machen das Schneiden zu Hause unsicher — wir übernehmen das gerne.',
            en: 'Limited eyesight, mobility or strength make cutting at home unsafe — we are glad to take it over.',
            ru: 'Ослабленное зрение, ограниченная подвижность или нехватка сил делают самостоятельную стрижку небезопасной — мы охотно возьмём это на себя.',
            ar: 'ضعف البصر أو محدودية الحركة أو القوة تجعل القص في المنزل غير آمن — يسعدنا تولّي ذلك.',
        },
        keywords: {
            de: [
                'selbstpflege',
                'sehkraft',
                'sehen',
                'augen',
                'beweglichkeit',
                'arthrose',
                'rücken',
                'senior',
                'senioren',
                'alter',
                'kraft',
            ],
            en: ['self-care', 'eyesight', 'vision', 'mobility', 'arthritis', 'seniors', 'elderly', 'strength'],
            ru: ['самостоятельный уход', 'зрение', 'подвижность', 'артроз', 'пожилые', 'возраст', 'силы'],
            ar: ['العناية الذاتية', 'البصر', 'الحركة', 'التهاب المفاصل', 'كبار السن', 'القوة'],
        },
    },
    {
        id: 'check-verordnung',
        icon: FileTextIcon,
        heading: {
            de: 'Ärztliche Verordnung erhalten',
            en: 'You have a medical prescription',
            ru: 'У вас есть медицинское направление',
            ar: 'لديكم وصفة طبية',
        },
        body: {
            de: 'Sie sind unsicher, was eine Verordnung „podologische Behandlung" bedeutet.',
            en: "You're unsure what a prescription for 'podiatric treatment' means.",
            ru: 'Вы не уверены, что означает направление на «подологическое лечение».',
            ar: 'لستم متأكدين من معنى وصفة "العلاج بالعناية بالقدم" (Podologie).',
        },
        keywords: {
            de: ['verordnung', 'rezept', 'arzt', 'überweisung'],
            en: ['prescription', 'referral', 'doctor'],
            ru: ['направление', 'рецепт', 'врач', 'выписка'],
            ar: ['وصفة', 'إحالة', 'طبيب', 'تحويل'],
        },
    },
];

export type ServiceGroup = {
    id: string;
    heading: LocaleString;
    body: LocaleString;
    items: ReadonlyArray<ContentLeaf>;
};

export const LEISTUNGEN_SERVICE_GROUPS: ReadonlyArray<ServiceGroup> = [
    {
        id: 'group-untersuchung',
        heading: {
            de: 'Untersuchung & Beratung',
            en: 'Examination & advice',
            ru: 'Осмотр и консультация',
            ar: 'الفحص والاستشارة',
        },
        body: {
            de: 'Wir schauen erst — und entscheiden dann gemeinsam, was sinnvoll ist.',
            en: 'We look first — and decide together what makes sense.',
            ru: 'Сначала мы осматриваем — а затем вместе решаем, что целесообразно.',
            ar: 'نقوم بالفحص أولاً — ثم نقرر معاً ما هو الأنسب.',
        },
        items: [
            {
                id: 'service-untersuchung-fussuntersuchung',
                icon: StethoscopeIcon,
                heading: {
                    de: 'Fußuntersuchung',
                    en: 'Foot examination',
                    ru: 'Осмотр стопы',
                    ar: 'فحص القدم',
                },
                body: {
                    de: 'Befund von Haut, Nägeln und Druckstellen — als Grundlage für jede weitere Behandlung.',
                    en: 'Assessment of skin, nails and pressure points — the basis for every further treatment.',
                    ru: 'Оценка состояния кожи, ногтей и участков давления — основа для любого дальнейшего лечения.',
                    ar: 'تقييم حالة الجلد والأظافر ومناطق الضغط — أساس لكل علاج لاحق.',
                },
                keywords: {
                    de: ['fußuntersuchung', 'untersuchung', 'befund', 'inspektion'],
                    en: ['foot examination', 'examination', 'assessment'],
                    ru: ['осмотр стопы', 'осмотр', 'обследование', 'диагностика'],
                    ar: ['فحص القدم', 'فحص', 'تقييم', 'تشخيص'],
                },
            },
            {
                id: 'service-untersuchung-beratung',
                icon: MessageCircleIcon,
                heading: {
                    de: 'Beratung bei Fußproblemen',
                    en: 'Advice on foot problems',
                    ru: 'Консультация при проблемах со стопой',
                    ar: 'استشارة في مشاكل القدم',
                },
                body: {
                    de: 'Wir hören zu und ordnen ein — was selbst zu pflegen ist und wann eine ärztliche Abklärung sinnvoll ist.',
                    en: 'We listen and put things in context — what to care for yourself and when to see a doctor.',
                    ru: 'Мы внимательно слушаем и помогаем разобраться — за чем вы можете ухаживать сами, а когда стоит обратиться к врачу.',
                    ar: 'نستمع إليكم ونضع الأمور في سياقها — ما يمكنكم العناية به بأنفسكم ومتى يلزم استشارة الطبيب.',
                },
                keywords: {
                    de: ['beratung', 'fußprobleme', 'rat'],
                    en: ['advice', 'consultation', 'guidance'],
                    ru: ['консультация', 'проблемы со стопой', 'совет'],
                    ar: ['استشارة', 'مشاكل القدم', 'نصيحة'],
                },
            },
            {
                id: 'service-untersuchung-sensibilitaetstests',
                icon: HandIcon,
                heading: {
                    de: 'Sensibilitätstests',
                    en: 'Sensitivity tests',
                    ru: 'Тесты чувствительности',
                    ar: 'اختبارات الحساسية',
                },
                body: {
                    de: 'Prüfung des Berührungs- und Druckempfindens — wichtig bei Diabetes oder Neuropathie.',
                    en: 'Testing of touch and pressure perception — important with diabetes or neuropathy.',
                    ru: 'Проверка тактильной и барической чувствительности — особенно важно при диабете или нейропатии.',
                    ar: 'اختبار الإحساس باللمس والضغط — مهم في حالات السكري أو الاعتلال العصبي.',
                },
                keywords: {
                    de: ['sensibilität', 'sensibilitätstest', 'sensibilitätstests', 'monofilament', 'neuropathie'],
                    en: ['sensitivity', 'sensitivity test', 'monofilament', 'neuropathy'],
                    ru: ['чувствительность', 'тест чувствительности', 'монофиламент', 'нейропатия'],
                    ar: ['الحساسية', 'اختبار الحساسية', 'monofilament', 'اعتلال عصبي'],
                },
            },
            {
                id: 'service-untersuchung-ganganalyse',
                icon: CompassIcon,
                heading: {
                    de: 'Ganganalysen',
                    en: 'Gait analysis',
                    ru: 'Анализ походки',
                    ar: 'تحليل المشية',
                },
                body: {
                    de: 'Ein Blick auf Ihren Gang zeigt, wo Belastung entsteht — und worauf eine Behandlung achten sollte.',
                    en: 'A look at your gait reveals where load builds up — and what a treatment should account for.',
                    ru: 'Анализ вашей походки показывает, где возникает нагрузка — и на что должно быть направлено лечение.',
                    ar: 'يكشف فحص مشيتكم عن مواضع تركز الحِمل — وما ينبغي مراعاته في العلاج.',
                },
                keywords: {
                    de: ['ganganalyse', 'ganganalysen', 'gangbild'],
                    en: ['gait', 'gait analysis'],
                    ru: ['анализ походки', 'походка'],
                    ar: ['تحليل المشية', 'المشية'],
                },
            },
            {
                id: 'service-untersuchung-einlagenberatung',
                icon: FootprintsIcon,
                heading: {
                    de: 'Einlagenberatung',
                    en: 'Insole advice',
                    ru: 'Консультация по ортопедическим стелькам',
                    ar: 'استشارة النعال الطبية',
                },
                body: {
                    de: 'Wir schauen mit Ihnen, ob Einlagen sinnvoll sind, und arbeiten dafür mit Orthopädieschuhtechnikern zusammen.',
                    en: 'We look at whether insoles make sense and work with orthopedic shoe technicians for the fitting.',
                    ru: 'Мы вместе с вами оцениваем целесообразность стелек и для их подбора сотрудничаем с ортопедами-обувщиками.',
                    ar: 'ننظر معكم فيما إذا كانت النعال الطبية مناسبة، ونتعاون مع تقنيي الأحذية التقويمية لتركيبها.',
                },
                keywords: {
                    de: ['einlagen', 'einlagenberatung', 'orthopädie', 'schuhtechnik'],
                    en: ['insoles', 'orthotics', 'orthopedic'],
                    ru: ['стельки', 'консультация по стелькам', 'ортопедия', 'ортопедическая обувь'],
                    ar: ['نعال طبية', 'استشارة النعال', 'تقويم العظام', 'الأحذية التقويمية'],
                },
            },
        ],
    },
    {
        id: 'group-naegel',
        heading: {
            de: 'Nägel',
            en: 'Nails',
            ru: 'Ногти',
            ar: 'الأظافر',
        },
        body: {
            de: 'Schneiden, korrigieren, wiederaufbauen — was die Nägel gerade brauchen.',
            en: 'Cutting, correcting, rebuilding — whatever the nails need right now.',
            ru: 'Подстригание, коррекция, восстановление — то, в чём ногти нуждаются сейчас.',
            ar: 'تقليم وتصحيح وإعادة بناء — ما تحتاجه الأظافر في كل حالة.',
        },
        items: [
            {
                id: 'service-naegel-nagelbearbeitung',
                icon: ScissorsIcon,
                heading: {
                    de: 'Nagelbearbeitung',
                    en: 'Nail care',
                    ru: 'Обработка ногтей',
                    ar: 'العناية بالأظافر',
                },
                body: {
                    de: 'Fachgerechtes Kürzen und Formen der Nägel — auch bei verdickten oder schwer zu schneidenden Nägeln.',
                    en: 'Professional trimming and shaping of nails — including thickened or hard-to-cut nails.',
                    ru: 'Профессиональное подстригание и формирование ногтей — в том числе утолщённых или трудно поддающихся стрижке.',
                    ar: 'تقليم وتشكيل الأظافر باحترافية — بما في ذلك الأظافر السميكة أو التي يصعب قصها.',
                },
                keywords: {
                    de: ['nagelbearbeitung', 'nagelpflege', 'nägel schneiden', 'kürzen'],
                    en: ['nail care', 'trimming', 'nail shaping'],
                    ru: ['обработка ногтей', 'уход за ногтями', 'стрижка ногтей', 'подстригание'],
                    ar: ['العناية بالأظافر', 'تقليم الأظافر', 'تشكيل الأظافر'],
                },
            },
            {
                id: 'service-naegel-nagelkorrektur',
                icon: BandageIcon,
                heading: {
                    de: 'Nagelkorrekturen',
                    en: 'Nail corrections',
                    ru: 'Коррекция ногтей',
                    ar: 'تصحيح الأظافر',
                },
                body: {
                    de: 'Spangen bei eingewachsenen oder verformten Nägeln — individuell angepasst und regelmäßig kontrolliert.',
                    en: 'Braces for ingrown or deformed nails — fitted individually and reviewed at follow-ups.',
                    ru: 'Скобы при вросших или деформированных ногтях — индивидуально подобранные и регулярно проверяемые.',
                    ar: 'مشابك لتصحيح الأظافر الغارزة أو المشوهة — تُركّب بشكل فردي وتُراجع بانتظام.',
                },
                keywords: {
                    de: ['nagelkorrektur', 'spange', 'spangen', 'orthonyxie', 'eingewachsen'],
                    en: ['nail correction', 'brace', 'braces', 'orthonyxia', 'ingrown'],
                    ru: ['коррекция ногтя', 'скоба', 'скобы', 'ортониксия', 'вросший'],
                    ar: ['تصحيح الظفر', 'مشبك', 'مشابك', 'orthonyxia', 'غارز'],
                },
            },
            {
                id: 'service-naegel-nagelprothetik',
                icon: WrenchIcon,
                heading: {
                    de: 'Nagelprothetik',
                    en: 'Nail prosthetics',
                    ru: 'Протезирование ногтей',
                    ar: 'تركيب الأظافر الاصطناعية',
                },
                body: {
                    de: 'Künstlicher Nagelaufbau bei beschädigten oder fehlenden Nägeln — als Schutz und für ein gepflegtes Aussehen.',
                    en: 'Artificial nail reconstruction for damaged or missing nails — for protection and a tidy appearance.',
                    ru: 'Искусственное восстановление повреждённых или отсутствующих ногтей — для защиты и ухоженного внешнего вида.',
                    ar: 'إعادة بناء الأظافر التالفة أو المفقودة بشكل اصطناعي — للحماية ولمظهر مرتب.',
                },
                keywords: {
                    de: ['nagelprothetik', 'nagelersatz', 'nagelaufbau', 'kunstnagel'],
                    en: ['nail prosthetics', 'nail prosthesis', 'nail reconstruction'],
                    ru: ['протезирование ногтя', 'замена ногтя', 'восстановление ногтя', 'искусственный ноготь'],
                    ar: ['تركيب الأظافر', 'بدلة الظفر', 'إعادة بناء الظفر', 'ظفر اصطناعي'],
                },
            },
        ],
    },
    {
        id: 'group-haut',
        heading: {
            de: 'Haut',
            en: 'Skin',
            ru: 'Кожа',
            ar: 'الجلد',
        },
        body: {
            de: 'Hornhaut, Hühneraugen, Warzen, Pilz — gezielte Behandlung der Stellen, die drücken oder stören.',
            en: 'Calluses, corns, warts, fungus — targeted treatment of the spots that press or bother you.',
            ru: 'Натоптыши, мозоли, бородавки, грибок — целенаправленное лечение участков, которые давят или беспокоят.',
            ar: 'تقرنات وعين السمكة وثآليل وفطريات — علاج موجه للمواضع التي تضغط أو تزعجكم.',
        },
        items: [
            {
                id: 'service-haut-hornhaut',
                icon: SparklesIcon,
                heading: {
                    de: 'Hornhautabtragung',
                    en: 'Callus removal',
                    ru: 'Удаление ороговевшей кожи',
                    ar: 'إزالة التقرنات',
                },
                body: {
                    de: 'Schonendes Abtragen verdickter Hautstellen — gezielt dort, wo es drückt oder schmerzt.',
                    en: 'Gentle removal of thickened skin — targeted at the spots that press or hurt.',
                    ru: 'Бережное удаление утолщённых участков кожи — точечно там, где давит или болит.',
                    ar: 'إزالة لطيفة للجلد السميك — في المواضع التي تضغط أو تؤلم تحديداً.',
                },
                keywords: {
                    de: ['hornhaut', 'hornhautabtragung', 'schwiele'],
                    en: ['callus', 'callus removal', 'hardened skin'],
                    ru: ['ороговевшая кожа', 'удаление ороговевшей кожи', 'натоптыш'],
                    ar: ['تقرن', 'إزالة التقرنات', 'جلد متصلب'],
                },
            },
            {
                id: 'service-haut-huehneraugen',
                icon: TargetIcon,
                heading: {
                    de: 'Entfernen von Hühneraugen',
                    en: 'Corn removal',
                    ru: 'Удаление мозолей',
                    ar: 'إزالة عين السمكة',
                },
                body: {
                    de: 'Schmerzhafte Hornhautkegel werden vorsichtig ausgelöst — und die Ursache mitbedacht.',
                    en: 'Painful corns are carefully removed — and the underlying cause is taken into account.',
                    ru: 'Болезненные ороговевшие конусы аккуратно удаляются — с учётом причины их появления.',
                    ar: 'تُزال مسامير اللحم المؤلمة بعناية — مع مراعاة السبب الكامن وراءها.',
                },
                keywords: {
                    de: ['hühnerauge', 'hühneraugen', 'clavus'],
                    en: ['corn', 'corns', 'clavus'],
                    ru: ['мозоль', 'мозоли', 'clavus'],
                    ar: ['عين السمكة', 'مسمار اللحم', 'clavus'],
                },
            },
            {
                id: 'service-haut-druckschutz',
                icon: ShieldCheckIcon,
                heading: {
                    de: 'Druck- und Reibungsschutz',
                    en: 'Pressure and friction protection',
                    ru: 'Защита от давления и трения',
                    ar: 'الحماية من الضغط والاحتكاك',
                },
                body: {
                    de: 'Polster und Schutzverbände entlasten gereizte Stellen, bis sie abgeheilt sind.',
                    en: 'Pads and protective dressings relieve irritated areas until they have healed.',
                    ru: 'Подушечки и защитные повязки снимают нагрузку с раздражённых участков до их полного заживления.',
                    ar: 'تخفف الوسائد والضمادات الواقية عن المناطق المتهيجة حتى تلتئم تماماً.',
                },
                keywords: {
                    de: ['druckschutz', 'reibung', 'polster', 'schutzverband'],
                    en: ['pressure protection', 'friction', 'padding', 'dressing'],
                    ru: ['защита от давления', 'трение', 'подушечка', 'защитная повязка'],
                    ar: ['الحماية من الضغط', 'الاحتكاك', 'وسادة', 'ضمادة واقية'],
                },
            },
            {
                id: 'service-haut-warzen',
                icon: BugIcon,
                heading: {
                    de: 'Warzenbehandlungen',
                    en: 'Wart treatments',
                    ru: 'Лечение бородавок',
                    ar: 'علاج الثآليل',
                },
                body: {
                    de: 'Behandlung von Dornwarzen am Fuß — geduldig und konsequent über mehrere Termine.',
                    en: 'Treatment of plantar warts on the foot — patient and consistent over several visits.',
                    ru: 'Лечение подошвенных бородавок на стопе — терпеливо и последовательно в течение нескольких визитов.',
                    ar: 'علاج الثآليل الأخمصية في القدم — بصبر واتساق عبر عدة جلسات.',
                },
                keywords: {
                    de: ['warze', 'warzen', 'dornwarze', 'dornwarzen', 'verruca'],
                    en: ['wart', 'warts', 'plantar wart', 'verruca'],
                    ru: ['бородавка', 'бородавки', 'подошвенная бородавка', 'verruca'],
                    ar: ['ثؤلول', 'ثآليل', 'ثؤلول أخمصي', 'verruca'],
                },
            },
            {
                id: 'service-haut-pilzbehandlung',
                icon: PillIcon,
                heading: {
                    de: 'Pilzbehandlung',
                    en: 'Fungal treatment',
                    ru: 'Лечение грибковых инфекций',
                    ar: 'علاج الفطريات',
                },
                body: {
                    de: 'Behandlung von Nagel- und Hautmykosen — mit klarer Anleitung für die Pflege zu Hause.',
                    en: 'Treatment of nail and skin mycoses — with clear guidance for at-home care.',
                    ru: 'Лечение микозов ногтей и кожи — с понятными рекомендациями по домашнему уходу.',
                    ar: 'علاج الفطريات في الأظافر والجلد — مع إرشادات واضحة للعناية المنزلية.',
                },
                keywords: {
                    de: ['pilz', 'pilzbehandlung', 'mykose', 'mykosen', 'nagelpilz', 'fußpilz', 'pilzinfektion', 'pilzinfektionen'],
                    en: ['fungus', 'fungal', 'mycosis', 'nail fungus', "athlete's foot"],
                    ru: ['грибок', 'лечение грибка', 'микоз', 'микозы', 'онихомикоз', 'грибок стопы', 'грибковая инфекция'],
                    ar: ['فطر', 'علاج الفطريات', 'فطار', 'فطار الأظافر', 'فطار القدم', 'عدوى فطرية'],
                },
            },
        ],
    },
];

const LEISTUNGEN_BRING_LIST_SHARED: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-medikamente',
        heading: {
            de: 'Liste der aktuellen Medikamente',
            en: 'Current medication list',
            ru: 'Список принимаемых препаратов',
            ar: 'قائمة الأدوية الحالية',
        },
        body: {
            de: 'Besonders wichtig bei Diabetes oder Blutverdünnern.',
            en: 'Especially important for diabetes or blood-thinning medication.',
            ru: 'Особенно важно при диабете или приёме антикоагулянтов.',
            ar: 'مهمة بشكل خاص في حالات السكري أو تناول مميعات الدم.',
        },
        keywords: {
            de: ['medikamente', 'medikamentenliste', 'blutverdünner'],
            en: ['medication', 'medication list', 'blood thinner'],
            ru: ['препараты', 'список препаратов', 'антикоагулянт'],
            ar: ['أدوية', 'قائمة الأدوية', 'مميعات الدم'],
        },
    },
    {
        id: 'bring-schuhe',
        heading: {
            de: 'Bequeme Schuhe',
            en: 'Comfortable shoes',
            ru: 'Удобная обувь',
            ar: 'حذاء مريح',
        },
        body: {
            de: 'Sie laufen direkt nach der Behandlung wieder los — eng anliegende Schuhe sind ungünstig.',
            en: "You'll walk out right after the treatment — tight shoes are unhelpful.",
            ru: 'Сразу после процедуры вы отправитесь в путь — узкая обувь нежелательна.',
            ar: 'ستغادرون مباشرة بعد العلاج — الأحذية الضيقة غير مناسبة.',
        },
        keywords: {
            de: ['schuhe'],
            en: ['shoes'],
            ru: ['обувь'],
            ar: ['حذاء', 'أحذية'],
        },
    },
    {
        id: 'bring-zeit',
        heading: {
            de: 'Etwas Zeit',
            en: 'A little time',
            ru: 'Немного времени',
            ar: 'بعض الوقت',
        },
        body: {
            de: 'Der erste Termin dauert ca. 60 Minuten — Anamnese, Untersuchung und Behandlung.',
            en: 'The first appointment takes about 60 minutes — history, examination and treatment.',
            ru: 'Первый приём длится около 60 минут — анамнез, осмотр и лечение.',
            ar: 'تستغرق الزيارة الأولى نحو 60 دقيقة — التاريخ المرضي والفحص والعلاج.',
        },
        keywords: {
            de: ['zeit', 'dauer', 'erster termin'],
            en: ['time', 'duration', 'first appointment'],
            ru: ['время', 'продолжительность', 'первый приём'],
            ar: ['وقت', 'مدة', 'الزيارة الأولى'],
        },
    },
];

export const LEISTUNGEN_BRING_LIST_KASSE: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-versichertenkarte',
        heading: {
            de: 'Versichertenkarte',
            en: 'Insurance card',
            ru: 'Карта медицинского страхования',
            ar: 'بطاقة التأمين الصحي',
        },
        body: {
            de: 'Wir lesen sie beim ersten Termin ein und rechnen direkt mit Ihrer Krankenkasse ab.',
            en: 'We scan it at your first visit and bill directly with your statutory insurance.',
            ru: 'Мы считываем её на первом приёме и выставляем счёт напрямую вашей больничной кассе.',
            ar: 'نقوم بقراءتها في الزيارة الأولى ونحاسب مباشرة مع صندوق التأمين الصحي الخاص بكم.',
        },
        keywords: {
            de: ['versichertenkarte', 'kassenkarte', 'krankenkasse'],
            en: ['insurance card', 'health card'],
            ru: ['страховая карта', 'карта кассы', 'больничная касса'],
            ar: ['بطاقة التأمين', 'البطاقة الصحية', 'صندوق التأمين'],
        },
    },
    {
        id: 'bring-verordnung',
        heading: {
            de: 'Ärztliche Verordnung',
            en: 'Medical prescription',
            ru: 'Медицинское направление',
            ar: 'وصفة طبية',
        },
        body: {
            de: 'Bei Diabetes oder vergleichbaren Diagnosen wird sie meist von der Hausarztpraxis ausgestellt.',
            en: 'For diabetes or comparable diagnoses it is usually issued by your GP practice.',
            ru: 'При диабете или сопоставимых диагнозах его обычно выписывает терапевт.',
            ar: 'في حالات السكري أو التشخيصات المماثلة تُصدر عادة من عيادة طبيب الأسرة.',
        },
        keywords: {
            de: ['verordnung', 'rezept', 'überweisung'],
            en: ['prescription', 'referral'],
            ru: ['направление', 'рецепт', 'выписка'],
            ar: ['وصفة', 'إحالة', 'تحويل'],
        },
    },
    ...LEISTUNGEN_BRING_LIST_SHARED,
];

export const LEISTUNGEN_BRING_LIST_PRIVAT: ReadonlyArray<ContentLeaf> = [
    {
        id: 'bring-keine-verordnung',
        heading: {
            de: 'Keine Verordnung nötig',
            en: 'No prescription needed',
            ru: 'Направление не требуется',
            ar: 'لا حاجة لوصفة طبية',
        },
        body: {
            de: 'Sie können direkt einen Termin vereinbaren — wir rechnen privat nach Leistung ab.',
            en: 'You can book directly — we bill privately, by service.',
            ru: 'Вы можете записаться напрямую — мы выставляем счёт в частном порядке, по фактически оказанной услуге.',
            ar: 'يمكنكم حجز موعد مباشرة — نحاسب بشكل خاص حسب الخدمة المقدمة.',
        },
        keywords: {
            de: ['privat', 'selbstzahler', 'ohne verordnung'],
            en: ['private', 'self-payer', 'without prescription'],
            ru: ['частный', 'самостоятельная оплата', 'без направления'],
            ar: ['خاص', 'الدفع الذاتي', 'بدون وصفة'],
        },
    },
    ...LEISTUNGEN_BRING_LIST_SHARED,
];
