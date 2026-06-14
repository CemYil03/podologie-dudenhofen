import { ActivityIcon, AwardIcon, BadgeCheckIcon, ShieldCheckIcon, StethoscopeIcon } from 'lucide-react';
import type { ContentLeaf, LocaleString } from './contentLeaf';

export const INDEX_SERVICES: ReadonlyArray<ContentLeaf> = [
    {
        id: 'service-fusspflege',
        icon: StethoscopeIcon,
        heading: {
            de: 'Medizinische Fußpflege',
            en: 'Medical foot-care',
            ru: 'Медицинский педикюр',
            ar: 'العناية الطبية بالقدمين',
        },
        body: {
            de: 'Hornhaut, Nagelpflege, Druckstellen.',
            en: 'Calluses, nail care, pressure points.',
            ru: 'Мозоли, уход за ногтями, точки давления.',
            ar: 'الجلد المتيبس، العناية بالأظافر، نقاط الضغط.',
        },
        keywords: {
            de: ['fußpflege', 'medizinische fußpflege', 'hornhaut', 'nagelpflege'],
            en: ['foot-care', 'medical foot care', 'callus', 'nail care'],
            ru: ['педикюр', 'медицинский педикюр', 'мозоли', 'уход за ногтями'],
            ar: ['العناية بالقدمين', 'العناية الطبية بالقدمين', 'جلد متيبس', 'العناية بالأظافر'],
        },
    },
    {
        id: 'service-dfs',
        icon: ShieldCheckIcon,
        heading: {
            de: 'Diabetisches Fußsyndrom',
            en: 'Diabetic foot syndrome',
            ru: 'Синдром диабетической стопы',
            ar: 'متلازمة القدم السكرية',
        },
        body: {
            de: 'Behandlung mit Kassenabrechnung nach Verordnung.',
            en: 'Treatment billed via statutory insurance with a prescription.',
            ru: 'Лечение оплачивается страховкой по направлению врача.',
            ar: 'علاج مغطى بالتأمين القانوني بناءً على وصفة طبية.',
        },
        keywords: {
            de: ['dfs', 'diabetes', 'diabetisches fußsyndrom'],
            en: ['dfs', 'diabetes', 'diabetic foot syndrome'],
            ru: ['dfs', 'диабет', 'синдром диабетической стопы'],
            ar: ['dfs', 'سكري', 'متلازمة القدم السكرية'],
        },
    },
    {
        id: 'service-spangen',
        icon: ActivityIcon,
        heading: {
            de: 'Nagelkorrektur-Spangen',
            en: 'Nail-correction braces',
            ru: 'Ортонихические скобы',
            ar: 'أقواس تصحيح الأظافر',
        },
        body: {
            de: 'Bei eingewachsenen oder verformten Nägeln.',
            en: 'For ingrown or deformed nails.',
            ru: 'При вросших или деформированных ногтях.',
            ar: 'للأظافر الغارزة أو المشوّهة.',
        },
        keywords: {
            de: ['spange', 'spangen', 'nagelkorrektur', 'orthonyxie', 'eingewachsen'],
            en: ['brace', 'braces', 'nail correction', 'orthonyxia', 'ingrown'],
            ru: ['скоба', 'скобы', 'коррекция ногтей', 'ортонихия', 'вросший'],
            ar: ['قوس', 'أقواس', 'تصحيح الأظافر', 'أوثونيكسيا', 'غارز'],
        },
    },
];

export const INDEX_SUGGESTED_QUESTIONS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'frage-verordnung',
        heading: {
            de: 'Brauche ich eine Verordnung?',
            en: 'Do I need a prescription?',
            ru: 'Нужно ли мне направление?',
            ar: 'هل أحتاج إلى وصفة طبية؟',
        },
        body: {
            de: 'Wann eine ärztliche Verordnung notwendig ist und wann nicht.',
            en: 'When a medical prescription is required and when it is not.',
            ru: 'Когда требуется медицинское направление, а когда — нет.',
            ar: 'متى تكون الوصفة الطبية ضرورية ومتى لا تكون.',
        },
        keywords: {
            de: ['verordnung', 'rezept'],
            en: ['prescription', 'referral'],
            ru: ['направление', 'рецепт'],
            ar: ['وصفة', 'إحالة'],
        },
    },
    {
        id: 'frage-mitbringen',
        heading: {
            de: 'Was bringe ich zum ersten Termin mit?',
            en: 'What should I bring to the first appointment?',
            ru: 'Что взять на первый приём?',
            ar: 'ماذا أُحضر إلى الموعد الأول؟',
        },
        body: {
            de: 'Versichertenkarte, Verordnung, Medikamentenliste — die Checkliste fürs Erstgespräch.',
            en: 'Insurance card, prescription, medication list — the checklist for your first visit.',
            ru: 'Полис, направление, список препаратов — чек-лист для первой консультации.',
            ar: 'بطاقة التأمين، الوصفة، قائمة الأدوية — قائمة التحقق للزيارة الأولى.',
        },
        keywords: {
            de: ['mitbringen', 'erster termin', 'checkliste'],
            en: ['bring', 'first appointment', 'checklist'],
            ru: ['взять', 'первый приём', 'чек-лист'],
            ar: ['إحضار', 'الموعد الأول', 'قائمة التحقق'],
        },
    },
    {
        id: 'frage-kasse',
        heading: {
            de: 'Übernimmt meine Krankenkasse das?',
            en: 'Will my health insurance cover this?',
            ru: 'Покроет ли это моя медицинская страховка?',
            ar: 'هل يغطي هذا تأميني الصحي؟',
        },
        body: {
            de: 'Wann gesetzliche Krankenkassen die Kosten übernehmen.',
            en: 'When statutory health insurance covers the costs.',
            ru: 'Когда государственная страховка покрывает расходы.',
            ar: 'متى يغطي التأمين الصحي القانوني التكاليف.',
        },
        keywords: {
            de: ['krankenkasse', 'kassenleistung', 'übernahme'],
            en: ['insurance', 'coverage', 'covered'],
            ru: ['страховка', 'покрытие', 'возмещение'],
            ar: ['تأمين صحي', 'تغطية', 'مشمول'],
        },
    },
    {
        id: 'frage-eigenanteil',
        heading: {
            de: 'Was zahle ich als Kassenpatient*in?',
            en: 'What will I pay as a statutory patient?',
            ru: 'Что я плачу как застрахованный пациент?',
            ar: 'ماذا أدفع كمريض ضمن التأمين القانوني؟',
        },
        body: {
            de: 'Eigenanteil, Rezeptgebühr und Zuzahlungsbefreiung — was Kassenpatientinnen selbst tragen.',
            en: 'Co-payment, prescription fee and exemption — what statutory patients pay themselves.',
            ru: 'Доплата, сбор за рецепт и освобождение — что платят застрахованные пациенты сами.',
            ar: 'المساهمة الذاتية، رسوم الوصفة، والإعفاء — ما يدفعه المؤمَّن عليهم بأنفسهم.',
        },
        keywords: {
            de: ['eigenanteil', 'zuzahlung', 'kosten'],
            en: ['co-payment', 'cost', 'fee'],
            ru: ['доплата', 'участие', 'стоимость'],
            ar: ['مساهمة ذاتية', 'دفع إضافي', 'تكلفة'],
        },
    },
];

export const INDEX_CREDENTIALS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'cred-staatlich',
        icon: AwardIcon,
        heading: {
            de: 'Staatliche Urkunde Podologie',
            en: 'State certificate in podiatry',
            ru: 'Государственный диплом по подологии',
            ar: 'الشهادة الحكومية في طب الأقدام',
        },
        body: {
            de: 'Abgeschlossen mit Staatsexamen nach dreijähriger Ausbildung.',
            en: 'Completed with the state examination after a three-year programme.',
            ru: 'Окончено с государственным экзаменом после трёхлетней программы.',
            ar: 'إتمام البرنامج باجتياز الامتحان الحكومي بعد ثلاث سنوات من التدريب.',
        },
        keywords: {
            de: ['staatlich', 'urkunde', 'staatsexamen', 'podologie'],
            en: ['state', 'certificate', 'state exam', 'podiatry'],
            ru: ['государственный', 'диплом', 'госэкзамен', 'подология'],
            ar: ['حكومي', 'شهادة', 'امتحان حكومي', 'طب الأقدام'],
        },
    },
    {
        id: 'cred-heilpraktiker',
        icon: BadgeCheckIcon,
        heading: {
            de: 'Heilpraktikerin für Podologie (RLP)',
            en: 'Heilpraktiker for podiatry (RLP)',
            ru: 'Хайльпрактик в подологии (RLP)',
            ar: 'هايلبراكتيكر في طب الأقدام (RLP)',
        },
        body: {
            de: 'Sektorale Heilpraktiker-Erlaubnis, anerkannt in Rheinland-Pfalz.',
            en: 'Sectoral Heilpraktiker permit, recognised in Rhineland-Palatinate.',
            ru: 'Секторальное разрешение Heilpraktiker, признаваемое в Рейнланд-Пфальце.',
            ar: 'ترخيص هايلبراكتيكر قطاعي معترف به في راينلاند بفالتس.',
        },
        keywords: {
            de: ['heilpraktiker', 'heilpraktikerin', 'rlp', 'rheinland-pfalz'],
            en: ['heilpraktiker', 'rlp', 'rhineland-palatinate'],
            ru: ['heilpraktiker', 'rlp', 'рейнланд-пфальц'],
            ar: ['هايلبراكتيكر', 'rlp', 'راينلاند بفالتس'],
        },
    },
    {
        id: 'cred-rki',
        icon: ShieldCheckIcon,
        heading: {
            de: 'Hygiene nach RKI-Empfehlung',
            en: 'Hygiene per RKI recommendations',
            ru: 'Гигиена по рекомендациям RKI',
            ar: 'النظافة وفق توصيات RKI',
        },
        body: {
            de: 'Aufbereitung von Instrumenten und Flächen nach Robert-Koch-Institut.',
            en: 'Reprocessing of instruments and surfaces per the Robert Koch Institute.',
            ru: 'Обработка инструментов и поверхностей по рекомендациям Института Роберта Коха.',
            ar: 'معالجة الأدوات والأسطح وفق معهد روبرت كوخ.',
        },
        keywords: {
            de: ['hygiene', 'rki', 'robert koch'],
            en: ['hygiene', 'rki', 'robert koch'],
            ru: ['гигиена', 'rki', 'роберт кох'],
            ar: ['نظافة', 'rki', 'روبرت كوخ'],
        },
    },
];

/**
 * Visitor-experience testimonials. The cards on the home page render these
 * verbatim — the link below them sends visitors to the live Google reviews.
 *
 * Non-negotiable rule — see docs/features/testimonials.md:
 *
 * Quotes describe the *visit experience* only (atmosphere, time taken,
 * explanation, friendliness). They MUST NOT describe medical outcomes
 * (pain relief, healing, cure) — HWG §11 restricts patient testimonials
 * in healthcare advertising and outcome claims are the part it bites on.
 */
export type IndexTestimonial = {
    id: string;
    quote: LocaleString;
    attribution: LocaleString;
};

export const INDEX_TESTIMONIALS: ReadonlyArray<IndexTestimonial> = [
    {
        id: 'testimonial-1',
        quote: {
            de: 'Sehr ruhige Atmosphäre. Es wurde mir alles in Ruhe erklärt, und die Praxis ist auch für ältere Menschen gut zu erreichen.',
            en: 'A very calm atmosphere. Everything was explained to me without rush, and the practice is easy to reach for older people too.',
            ru: 'Очень спокойная атмосфера. Мне всё объяснили без спешки, а до практики легко добраться и пожилым людям.',
            ar: 'أجواء هادئة جدًا. شُرح لي كل شيء بتأنٍّ، والعيادة سهلة الوصول لكبار السن أيضًا.',
        },
        attribution: {
            de: 'Patientenstimme',
            en: 'Patient comment',
            ru: 'Отзыв пациента',
            ar: 'تعليق مريضة',
        },
    },
    {
        id: 'testimonial-2',
        quote: {
            de: 'Frau Yilmaz nimmt sich Zeit und arbeitet sehr sorgfältig. Termine waren immer pünktlich.',
            en: 'Ms Yilmaz takes time and works very carefully. Appointments were always on schedule.',
            ru: 'Госпожа Йылмаз уделяет время и работает очень внимательно. Приёмы всегда вовремя.',
            ar: 'السيدة يلماز تأخذ وقتها وتعمل بعناية فائقة. كانت المواعيد دومًا في وقتها.',
        },
        attribution: {
            de: 'Patientenstimme',
            en: 'Patient comment',
            ru: 'Отзыв пациента',
            ar: 'تعليق مريضة',
        },
    },
    {
        id: 'testimonial-3',
        quote: {
            de: 'Freundlicher Empfang, saubere Räume, persönliche Betreuung. Genau das, was man sich von einer kleinen Praxis wünscht.',
            en: 'Warm welcome, clean rooms, personal care. Exactly what you would hope for from a small practice.',
            ru: 'Тёплый приём, чистые помещения, персональный подход. Именно то, что ждёшь от небольшой практики.',
            ar: 'استقبال ودود، غرف نظيفة، رعاية شخصية. تمامًا كما يُتمنى من عيادة صغيرة.',
        },
        attribution: {
            de: 'Patientenstimme',
            en: 'Patient comment',
            ru: 'Отзыв пациента',
            ar: 'تعليق مريضة',
        },
    },
];
