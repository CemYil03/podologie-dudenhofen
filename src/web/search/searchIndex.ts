import type { ContentLeaf, LocaleString } from '../content/contentLeaf';
import {
    LEISTUNGEN_BRING_LIST_KASSE,
    LEISTUNGEN_BRING_LIST_PRIVAT,
    LEISTUNGEN_CHECKLIST,
    LEISTUNGEN_SERVICE_GROUPS,
} from '../content/leistungenContent';
import { KARRIERE_OFFERINGS, KARRIERE_REQUIREMENTS, KARRIERE_STEPS, KARRIERE_VALUE_CARDS } from '../content/karriereContent';
import { INDEX_CREDENTIALS, INDEX_PRAXIS_PILLARS, INDEX_SERVICES, INDEX_SUGGESTED_QUESTIONS } from '../content/indexContent';
import { PRAXIS_HYGIENE_PILLARS, PRAXIS_REPROCESSING_STEPS } from '../content/praxisContent';
import type { Locale } from '../utils/locale';

export type SearchEntryPath = '/' | '/praxis' | '/leistungen' | '/kontakt' | '/qualifikation' | '/karriere' | '/datenschutz' | '/impressum';

export type SearchEntry = {
    path: SearchEntryPath;
    sectionId: string | null;
    title: LocaleString;
    description: LocaleString;
    keywords?: Record<Locale, ReadonlyArray<string>>;
};

export const SEARCH_PAGE_LABELS: Record<SearchEntryPath, LocaleString> = {
    '/': { de: 'Start', en: 'Home', ru: 'Главная', ar: 'الرئيسية' },
    '/praxis': { de: 'Praxis', en: 'Practice', ru: 'Практика', ar: 'العيادة' },
    '/leistungen': { de: 'Leistungen', en: 'Services', ru: 'Услуги', ar: 'الخدمات' },
    '/kontakt': { de: 'Kontakt', en: 'Contact', ru: 'Контакт', ar: 'اتصل بنا' },
    '/qualifikation': { de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' },
    '/karriere': { de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' },
    '/datenschutz': { de: 'Datenschutz', en: 'Privacy policy', ru: 'Политика конфиденциальности', ar: 'سياسة الخصوصية' },
    '/impressum': { de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' },
};

// Curated section-level entries — written for editorial value (the section
// title in the dialog may differ from the on-page heading). Leaf-level entries
// are auto-derived from the page-content modules below.
const SEARCH_INDEX_SECTIONS: ReadonlyArray<SearchEntry> = [
    // ─── Home ────────────────────────────────────────────────────────────
    {
        path: '/',
        sectionId: 'hero',
        title: {
            de: 'Podologische Praxis in Dudenhofen',
            en: 'Podiatry practice in Dudenhofen',
            ru: 'Подологическая практика в Dudenhofen',
            ar: 'عيادة العناية الطبية بالقدم في Dudenhofen',
        },
        description: {
            de: 'Eine kleine, ruhige Praxis für Podologie — mit Kassenzulassung. Termine nach Vereinbarung.',
            en: 'A small, calm podiatry practice covered by statutory health insurance. By appointment.',
            ru: 'Небольшая спокойная подологическая практика с допуском к работе с государственными страховыми кассами. Приём по предварительной записи.',
            ar: 'عيادة صغيرة هادئة للعناية الطبية بالقدم، معتمدة لدى التأمين الصحي القانوني. بموعد مسبق.',
        },
        keywords: {
            de: ['start', 'startseite', 'home', 'praxis', 'podologie', 'dudenhofen'],
            en: ['home', 'start', 'practice', 'podiatry', 'dudenhofen'],
            ru: ['главная', 'старт', 'практика', 'подология', 'Dudenhofen'],
            ar: ['الرئيسية', 'بداية', 'عيادة', 'عناية بالقدم', 'Dudenhofen'],
        },
    },
    {
        path: '/',
        sectionId: 'praxis-uebersicht',
        title: { de: 'Praxis — Übersicht', en: 'Practice — overview', ru: 'Практика — обзор', ar: 'العيادة — نظرة عامة' },
        description: {
            de: 'Eine ruhige Praxis in Dudenhofen — Räume, Therapeutin, Hygiene auf einen Blick.',
            en: 'A calm practice in Dudenhofen — rooms, therapist and hygiene at a glance.',
            ru: 'Спокойная практика в Dudenhofen — помещения, специалист и гигиена кратко.',
            ar: 'عيادة هادئة في Dudenhofen — الغرف والمعالجة والنظافة بإيجاز.',
        },
        keywords: {
            de: ['praxis', 'übersicht', 'räume', 'therapeutin', 'hygiene', 'barrierefrei'],
            en: ['practice', 'overview', 'rooms', 'therapist', 'hygiene', 'barrier-free'],
            ru: ['практика', 'обзор', 'помещения', 'специалист', 'гигиена', 'без барьеров'],
            ar: ['العيادة', 'نظرة عامة', 'الغرف', 'المعالجة', 'النظافة', 'خالية من العوائق'],
        },
    },
    {
        path: '/',
        sectionId: 'leistungen-uebersicht',
        title: { de: 'Leistungen — Übersicht', en: 'Services — overview', ru: 'Услуги — обзор', ar: 'الخدمات — نظرة عامة' },
        description: {
            de: 'Medizinische Fußpflege, Diabetisches Fußsyndrom und Nagelkorrektur-Spangen.',
            en: 'Medical foot-care, diabetic foot syndrome and nail-correction braces.',
            ru: 'Медицинский уход за стопами, синдром диабетической стопы и ортониксические скобы для коррекции ногтей.',
            ar: 'العناية الطبية بالقدم، متلازمة القدم السكرية، ومشابك تقويم الأظافر.',
        },
        keywords: {
            de: ['leistungen', 'übersicht', 'fußpflege', 'hornhaut', 'nagelpflege', 'druckstellen'],
            en: ['services', 'overview', 'foot-care', 'callus', 'nail care', 'pressure points'],
            ru: ['услуги', 'обзор', 'уход за стопами', 'мозоли', 'уход за ногтями', 'точки давления'],
            ar: ['الخدمات', 'نظرة عامة', 'العناية بالقدم', 'مسامير القدم', 'العناية بالأظافر', 'نقاط الضغط'],
        },
    },
    {
        path: '/',
        sectionId: 'fragen',
        title: { de: 'Fragen an den Assistenten', en: 'Ask the assistant', ru: 'Вопросы к ассистенту', ar: 'اسأل المساعد' },
        description: {
            de: 'Brauche ich überhaupt eine podologische Behandlung? Häufige Fragen zu Verordnung, erstem Termin und Krankenkasse.',
            en: 'Do I really need a podiatrist? Common questions about prescriptions, first appointment and insurance.',
            ru: 'Нужно ли мне подологическое лечение? Частые вопросы о направлении, первом приёме и страховой кассе.',
            ar: 'هل أحتاج فعلاً إلى علاج عند أخصائي العناية بالقدم؟ أسئلة شائعة حول الوصفة الطبية، الموعد الأول، والتأمين الصحي.',
        },
        keywords: {
            de: ['chat', 'assistent', 'fragen', 'verordnung', 'krankenkasse', 'erste behandlung'],
            en: ['chat', 'assistant', 'questions', 'prescription', 'insurance', 'first appointment'],
            ru: ['чат', 'ассистент', 'вопросы', 'направление', 'страховая касса', 'первый приём'],
            ar: ['دردشة', 'مساعد', 'أسئلة', 'وصفة طبية', 'تأمين صحي', 'الموعد الأول'],
        },
    },
    {
        path: '/',
        sectionId: 'oeffnungszeiten',
        title: { de: 'Öffnungszeiten und Adresse', en: 'Opening hours and address', ru: 'Часы работы и адрес', ar: 'ساعات العمل والعنوان' },
        description: {
            de: 'Mo–Do 08:00–18:00, Fr 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
            en: 'Mon–Thu 08:00–18:00, Fri 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
            ru: 'Пн–Чт 08:00–18:00, Пт 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
            ar: 'الإثنين–الخميس 08:00–18:00، الجمعة 08:00–14:00. Speyerer Straße 60, 67373 Dudenhofen.',
        },
        keywords: {
            de: ['öffnungszeiten', 'adresse', 'anfahrt', 'speyerer', 'sprechzeiten', 'wann offen'],
            en: ['opening hours', 'address', 'directions', 'speyerer', 'when open'],
            ru: ['часы работы', 'адрес', 'как добраться', 'Speyerer', 'когда открыто'],
            ar: ['ساعات العمل', 'العنوان', 'كيفية الوصول', 'Speyerer', 'متى مفتوح'],
        },
    },
    {
        path: '/',
        sectionId: 'qualifikation',
        title: { de: 'Qualifikation auf einen Blick', en: 'Credentials at a glance', ru: 'Квалификация кратко', ar: 'المؤهلات باختصار' },
        description: {
            de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie. Hygiene nach RKI-Empfehlung.',
            en: 'State-accredited podiatrist and Heilpraktiker for podiatry. Hygiene to RKI standard.',
            ru: 'Подолог с государственным дипломом и Heilpraktiker по подологии. Гигиена согласно рекомендациям RKI.',
            ar: 'أخصائية معتمدة من الدولة في العناية الطبية بالقدم وHeilpraktiker للعناية بالقدم. النظافة وفق توصيات RKI.',
        },
        keywords: {
            de: ['qualifikation', 'staatlich', 'urkunde', 'heilpraktiker', 'rki'],
            en: ['credentials', 'state certificate', 'heilpraktiker', 'rki'],
            ru: ['квалификация', 'государственный', 'диплом', 'Heilpraktiker', 'RKI'],
            ar: ['المؤهلات', 'معتمدة من الدولة', 'شهادة', 'Heilpraktiker', 'RKI'],
        },
    },
    {
        path: '/',
        sectionId: 'termin',
        title: {
            de: 'Termin vereinbaren? Rufen Sie an.',
            en: 'Want an appointment? Give us a call.',
            ru: 'Записаться на приём? Позвоните нам.',
            ar: 'هل ترغب بحجز موعد؟ اتصل بنا.',
        },
        description: {
            de: 'Am besten während unserer Anrufzeiten Mo–Fr 08:00 – 16:00.',
            en: 'Best reached during our call hours, Mon–Fri 08:00 – 16:00.',
            ru: 'Лучше всего звонить в наши часы для звонков: Пн–Пт 08:00 – 16:00.',
            ar: 'الأفضل الاتصال خلال ساعات استقبال المكالمات: الإثنين–الجمعة 08:00 – 16:00.',
        },
        keywords: {
            de: ['termin', 'anrufen', 'kontaktaufnahme', 'anfrage'],
            en: ['appointment', 'call', 'request'],
            ru: ['приём', 'позвонить', 'связаться', 'запрос'],
            ar: ['موعد', 'اتصال', 'تواصل', 'طلب'],
        },
    },

    // ─── Praxis ──────────────────────────────────────────────────────────
    {
        path: '/praxis',
        sectionId: 'hero',
        title: {
            de: 'Praxis — Räume, Therapeutin, Hygiene',
            en: 'Practice — rooms, therapist, hygiene',
            ru: 'Практика — кабинеты, специалист, гигиена',
            ar: 'العيادة — الغرف، الأخصائية، النظافة',
        },
        description: {
            de: 'Eine ruhige Praxis in Dudenhofen — immer nur eine Patientin oder ein Patient zur Zeit.',
            en: 'A calm practice in Dudenhofen — only one patient at a time.',
            ru: 'Спокойная практика в Dudenhofen — всегда только один пациент за раз.',
            ar: 'عيادة هادئة في Dudenhofen — مريض واحد فقط في كل مرة.',
        },
        keywords: {
            de: ['praxis', 'übersicht'],
            en: ['practice', 'overview'],
            ru: ['практика', 'обзор'],
            ar: ['العيادة', 'نظرة عامة'],
        },
    },
    {
        path: '/praxis',
        sectionId: 'raeume',
        title: {
            de: 'Räume — barrierefrei und ruhig',
            en: 'Rooms — barrier-free and calm',
            ru: 'Помещения — без барьеров и тихие',
            ar: 'الغرف — خالية من العوائق وهادئة',
        },
        description: {
            de: 'Ebenerdig, barrierefrei, klimatisiert. Behandlung im Liegen oder Sitzen.',
            en: 'Ground-level, barrier-free, air-conditioned. Treatment lying down or seated.',
            ru: 'На уровне земли, без барьеров, с кондиционированием. Лечение лёжа или сидя.',
            ar: 'في الطابق الأرضي، خالية من العوائق، مكيّفة. العلاج بوضع الاستلقاء أو الجلوس.',
        },
        keywords: {
            de: ['räume', 'barrierefrei', 'rollstuhl', 'rollator', 'klimatisiert'],
            en: ['rooms', 'barrier-free', 'wheelchair', 'walker', 'air-conditioned'],
            ru: ['помещения', 'без барьеров', 'инвалидная коляска', 'ходунки', 'кондиционирование'],
            ar: ['الغرف', 'خالية من العوائق', 'كرسي متحرك', 'مشاية', 'مكيّفة'],
        },
    },
    {
        path: '/praxis',
        sectionId: 'therapeutin',
        title: {
            de: 'Therapeutin — Annette Yilmaz',
            en: 'Therapist — Annette Yilmaz',
            ru: 'Специалист — Annette Йылмаз',
            ar: 'الأخصائية — Annette يلماز',
        },
        description: {
            de: 'Podologin und sektorale Heilpraktikerin für Podologie, mit Kassenzulassung.',
            en: 'Podiatrist and sectoral Heilpraktiker for podiatry, accredited by statutory insurers.',
            ru: 'Подолог и секторальный Heilpraktiker по подологии, с допуском к работе с государственными страховыми кассами.',
            ar: 'أخصائية في العناية الطبية بالقدم وHeilpraktiker قطاعية للعناية بالقدم، معتمدة لدى التأمين الصحي القانوني.',
        },
        keywords: {
            de: ['annette yilmaz', 'podologin', 'heilpraktikerin', 'ausbildung'],
            en: ['annette yilmaz', 'podiatrist', 'heilpraktiker', 'training'],
            ru: ['Annette Yilmaz', 'подолог', 'Heilpraktiker', 'образование'],
            ar: ['Annette Yilmaz', 'أخصائية القدم', 'Heilpraktiker', 'تدريب'],
        },
    },
    {
        path: '/praxis',
        sectionId: 'hygiene',
        title: {
            de: 'Hygiene und Instrumentenaufbereitung',
            en: 'Hygiene and instrument reprocessing',
            ru: 'Гигиена и обработка инструментов',
            ar: 'النظافة وإعادة معالجة الأدوات',
        },
        description: {
            de: 'Thermodesinfektion, Sterilisation, Flächendesinfektion und Einmal-Materialien — nach RKI-Empfehlung.',
            en: 'Thermal disinfection, sterilisation, surface disinfection and single-use materials per RKI recommendations.',
            ru: 'Термодезинфекция, стерилизация, дезинфекция поверхностей и одноразовые материалы — согласно рекомендациям RKI.',
            ar: 'تطهير حراري، تعقيم، تطهير الأسطح ومواد ذات استخدام واحد — وفق توصيات RKI.',
        },
        keywords: {
            de: ['hygiene', 'aufbereitung', 'sterilisation', 'autoklav', 'thermodesinfektor', 'rki', 'desinfektion'],
            en: ['hygiene', 'reprocessing', 'sterilisation', 'autoclave', 'thermal disinfector', 'rki', 'disinfection'],
            ru: ['гигиена', 'обработка', 'стерилизация', 'автоклав', 'термодезинфектор', 'RKI', 'дезинфекция'],
            ar: ['النظافة', 'إعادة المعالجة', 'التعقيم', 'أوتوكلاف', 'جهاز تطهير حراري', 'RKI', 'تطهير'],
        },
    },

    // ─── Leistungen ──────────────────────────────────────────────────────
    {
        path: '/leistungen',
        sectionId: 'hero',
        title: {
            de: 'Leistungen — was wir behandeln',
            en: 'Services — what we treat',
            ru: 'Услуги — что мы лечим',
            ar: 'الخدمات — ما الذي نعالجه',
        },
        description: {
            de: 'Was wir behandeln und wann ein Termin sinnvoll ist.',
            en: 'What we treat and when an appointment makes sense.',
            ru: 'Что мы лечим и когда имеет смысл записаться на приём.',
            ar: 'ما الذي نعالجه ومتى يكون من المفيد حجز موعد.',
        },
        keywords: {
            de: ['leistungen', 'behandlung'],
            en: ['services', 'treatment'],
            ru: ['услуги', 'лечение'],
            ar: ['الخدمات', 'العلاج'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'brauche-ich-eine-behandlung',
        title: {
            de: 'Brauche ich eine podologische Behandlung?',
            en: 'Do I need a podiatry appointment?',
            ru: 'Нужно ли мне подологическое лечение?',
            ar: 'هل أحتاج إلى موعد لدى أخصائي العناية بالقدم؟',
        },
        description: {
            de: 'Anzeichen, bei denen ein Termin sinnvoll ist — Schmerzen, eingewachsene Nägel, Druckstellen.',
            en: 'Signs that an appointment makes sense — pain, ingrown nails, pressure points.',
            ru: 'Признаки, при которых имеет смысл записаться на приём — боль, вросшие ногти, точки давления.',
            ar: 'العلامات التي تستدعي حجز موعد — الألم، الأظافر الغائرة، نقاط الضغط.',
        },
        keywords: {
            de: ['brauche ich', 'wann zum podologen', 'eingewachsen', 'druckstellen', 'schmerzen'],
            en: ['do i need', 'when to see a podiatrist', 'ingrown', 'pressure points', 'pain'],
            ru: ['нужно ли мне', 'когда идти к подологу', 'вросший', 'точки давления', 'боль'],
            ar: ['هل أحتاج', 'متى أزور أخصائي القدم', 'غائر', 'نقاط الضغط', 'ألم'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'leistungen',
        title: {
            de: 'Unsere Behandlungen',
            en: 'Our treatments',
            ru: 'Наши процедуры',
            ar: 'علاجاتنا',
        },
        description: {
            de: 'Medizinische Fußpflege, Behandlung des Diabetischen Fußsyndroms und Nagelkorrektur-Spangen.',
            en: 'Medical foot-care, diabetic foot syndrome treatment and nail-correction braces.',
            ru: 'Медицинский уход за стопами, лечение синдрома диабетической стопы и ортониксические скобы для коррекции ногтей.',
            ar: 'العناية الطبية بالقدم، علاج متلازمة القدم السكرية ومشابك تقويم الأظافر.',
        },
        keywords: {
            de: ['fußpflege', 'diabetisches fußsyndrom', 'nagelspange', 'orthonyxie', 'hornhaut'],
            en: ['foot-care', 'diabetic foot syndrome', 'nail brace', 'orthonyxia', 'callus'],
            ru: ['уход за стопами', 'синдром диабетической стопы', 'ногтевая скоба', 'ортониксия', 'мозоли'],
            ar: ['العناية بالقدم', 'متلازمة القدم السكرية', 'مشبك الظفر', 'تقويم الأظافر', 'مسامير القدم'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'was-bringe-ich-mit',
        title: {
            de: 'Was bringe ich zum ersten Termin mit?',
            en: 'What to bring to the first appointment',
            ru: 'Что взять с собой на первый приём',
            ar: 'ما الذي يجب إحضاره إلى الموعد الأول',
        },
        description: {
            de: 'Verordnung, Versichertenkarte, eigene Schuhe — Checkliste für Kassen- und Privatpatientinnen.',
            en: 'Prescription, insurance card, your own shoes — checklist for statutory and private patients.',
            ru: 'Направление, страховая карта, собственная обувь — чек-лист для пациентов с государственной и частной страховкой.',
            ar: 'الوصفة الطبية، بطاقة التأمين، أحذيتك الخاصة — قائمة تحقق لمرضى التأمين القانوني والخاص.',
        },
        keywords: {
            de: ['was mitbringen', 'erster termin', 'verordnung', 'versichertenkarte', 'checkliste'],
            en: ['what to bring', 'first appointment', 'prescription', 'insurance card', 'checklist'],
            ru: ['что взять', 'первый приём', 'направление', 'страховая карта', 'чек-лист'],
            ar: ['ما يجب إحضاره', 'الموعد الأول', 'وصفة طبية', 'بطاقة التأمين', 'قائمة تحقق'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'kosten',
        title: {
            de: 'Kosten und Krankenkasse',
            en: 'Costs and health insurance',
            ru: 'Стоимость и страховая касса',
            ar: 'التكاليف والتأمين الصحي',
        },
        description: {
            de: 'Was Kassen- und Privatpatientinnen zahlen, wann eine Verordnung erforderlich ist.',
            en: 'What statutory and private patients pay, and when a prescription is required.',
            ru: 'Сколько платят пациенты государственной и частной страховки и когда требуется направление.',
            ar: 'ما يدفعه مرضى التأمين القانوني والخاص، ومتى تكون الوصفة الطبية مطلوبة.',
        },
        keywords: {
            de: ['kosten', 'preis', 'krankenkasse', 'verordnung', 'kassenzulassung', 'privat'],
            en: ['costs', 'price', 'insurance', 'prescription', 'covered', 'private'],
            ru: ['стоимость', 'цена', 'страховая касса', 'направление', 'допуск', 'частный'],
            ar: ['التكاليف', 'السعر', 'التأمين', 'وصفة طبية', 'مغطى', 'خاص'],
        },
    },
    {
        path: '/leistungen',
        sectionId: 'termin',
        title: {
            de: 'Termin anfragen',
            en: 'Request an appointment',
            ru: 'Запросить приём',
            ar: 'طلب موعد',
        },
        description: {
            de: 'Schreiben Sie uns — wir melden uns zurück.',
            en: 'Send us a message — we will get back to you.',
            ru: 'Напишите нам — мы свяжемся с вами.',
            ar: 'راسلنا — وسنعاود التواصل معك.',
        },
        keywords: {
            de: ['termin'],
            en: ['appointment'],
            ru: ['приём'],
            ar: ['موعد'],
        },
    },

    // ─── Kontakt ─────────────────────────────────────────────────────────
    {
        path: '/kontakt',
        sectionId: 'hero',
        title: { de: 'Kontakt', en: 'Contact', ru: 'Контакт', ar: 'اتصل بنا' },
        description: {
            de: 'So erreichen Sie uns.',
            en: 'How to reach us.',
            ru: 'Как с нами связаться.',
            ar: 'كيفية التواصل معنا.',
        },
        keywords: {
            de: ['kontakt', 'erreichen'],
            en: ['contact', 'reach'],
            ru: ['контакт', 'связь'],
            ar: ['اتصال', 'تواصل'],
        },
    },
    {
        path: '/kontakt',
        sectionId: 'kontaktdaten',
        title: { de: 'Kontaktdaten', en: 'Contact details', ru: 'Контактные данные', ar: 'بيانات الاتصال' },
        description: {
            de: 'Telefon, Adresse und Öffnungszeiten auf einen Blick.',
            en: 'Phone, address and opening hours at a glance.',
            ru: 'Телефон, адрес и часы работы — кратко.',
            ar: 'الهاتف والعنوان وساعات العمل في لمحة واحدة.',
        },
        keywords: {
            de: ['telefon', 'adresse', 'öffnungszeiten', 'sprechzeiten'],
            en: ['phone', 'address', 'opening hours'],
            ru: ['телефон', 'адрес', 'часы работы'],
            ar: ['هاتف', 'عنوان', 'ساعات العمل'],
        },
    },
    {
        path: '/kontakt',
        sectionId: 'anfahrt',
        title: { de: 'Anfahrt', en: 'How to find us', ru: 'Как добраться', ar: 'كيفية الوصول إلينا' },
        description: {
            de: 'Mitten in Dudenhofen, gut zu erreichen — Karte, Bushaltestelle und Parkmöglichkeiten.',
            en: 'Right in Dudenhofen — map, bus stops and parking.',
            ru: 'В центре Dudenhofen, легко добраться — карта, автобусные остановки и парковка.',
            ar: 'في وسط Dudenhofen، سهل الوصول — خريطة، محطات حافلات ومواقف سيارات.',
        },
        keywords: {
            de: ['anfahrt', 'parken', 'bus', 'karte', 'maps', 'route'],
            en: ['directions', 'parking', 'bus', 'map', 'maps', 'route'],
            ru: ['маршрут', 'парковка', 'автобус', 'карта', 'maps', 'путь'],
            ar: ['الاتجاهات', 'موقف سيارات', 'حافلة', 'خريطة', 'maps', 'مسار'],
        },
    },
    {
        path: '/kontakt',
        sectionId: 'anfrage',
        title: { de: 'Terminanfrage', en: 'Appointment request', ru: 'Запрос на приём', ar: 'طلب موعد' },
        description: {
            de: 'Termine vereinbaren wir am Telefon — Anrufzeiten Mo–Fr 08:00 – 16:00.',
            en: 'Appointments are arranged by phone — call hours Mon–Fri 08:00 – 16:00.',
            ru: 'Приёмы мы согласуем по телефону — часы для звонков Пн–Пт 08:00 – 16:00.',
            ar: 'يتم ترتيب المواعيد عبر الهاتف — ساعات الاتصال الإثنين–الجمعة 08:00 – 16:00.',
        },
        keywords: {
            de: ['terminanfrage', 'anrufen', 'telefon', 'anfrage'],
            en: ['appointment request', 'call', 'phone', 'enquiry'],
            ru: ['запрос на приём', 'звонок', 'телефон', 'обращение'],
            ar: ['طلب موعد', 'اتصال', 'هاتف', 'استفسار'],
        },
    },

    // ─── Qualifikation ───────────────────────────────────────────────────
    {
        path: '/qualifikation',
        sectionId: 'hero',
        title: { de: 'Qualifikation', en: 'Credentials', ru: 'Квалификация', ar: 'المؤهلات' },
        description: {
            de: 'Staatlich anerkannte Podologin und Heilpraktikerin für Podologie.',
            en: 'State-accredited podiatrist and Heilpraktiker for podiatry.',
            ru: 'Подолог с государственным дипломом и Heilpraktiker по подологии.',
            ar: 'أخصائية معتمدة من الدولة في العناية الطبية بالقدم وHeilpraktiker للعناية بالقدم.',
        },
        keywords: {
            de: ['qualifikation'],
            en: ['credentials'],
            ru: ['квалификация'],
            ar: ['المؤهلات'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'podologie',
        title: { de: 'Was ist Podologie?', en: 'What is podiatry?', ru: 'Что такое подология?', ar: 'ما هي العناية الطبية بالقدم؟' },
        description: {
            de: 'Podologie ist die nicht-ärztliche Heilkunde am Fuß — staatlich geregelt nach dem Podologengesetz.',
            en: 'Podiatry is the non-medical foot-care discipline — state-regulated under the Podologengesetz.',
            ru: 'Подология — это неврачебная лечебная дисциплина по уходу за стопами, регулируемая законом Podologengesetz.',
            ar: 'العناية الطبية بالقدم هي تخصص علاجي غير طبي للقدم — منظّم بموجب قانون Podologengesetz.',
        },
        keywords: {
            de: ['podologie', 'definition', 'podologengesetz', 'staatlich'],
            en: ['podiatry', 'definition', 'podologengesetz', 'state'],
            ru: ['подология', 'определение', 'Podologengesetz', 'государственный'],
            ar: ['العناية بالقدم', 'تعريف', 'Podologengesetz', 'الدولة'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'heilpraktiker',
        title: {
            de: 'Heilpraktikerin für Podologie',
            en: 'Heilpraktiker for podiatry',
            ru: 'Heilpraktiker по подологии',
            ar: 'Heilpraktiker للعناية بالقدم',
        },
        description: {
            de: 'Sektorale Heilpraktiker-Erlaubnis für Podologie, anerkannt in Rheinland-Pfalz.',
            en: 'Sectoral Heilpraktiker permit for podiatry, recognised in Rhineland-Palatinate.',
            ru: 'Секторальное разрешение Heilpraktiker по подологии, признанное в земле Рейнланд-Пфальц.',
            ar: 'إذن Heilpraktiker قطاعي للعناية بالقدم، معترف به في ولاية راينلاند-بفالتس.',
        },
        keywords: {
            de: ['heilpraktiker', 'sektoral', 'rheinland-pfalz', 'erlaubnis', 'überweisung', 'privatversicherung', 'rechnung'],
            en: ['heilpraktiker', 'sectoral', 'rhineland-palatinate', 'permit', 'referral', 'private insurance', 'invoice'],
            ru: ['Heilpraktiker', 'секторальный', 'Рейнланд-Пфальц', 'разрешение', 'направление', 'частная страховка', 'счёт'],
            ar: ['Heilpraktiker', 'قطاعي', 'راينلاند-بفالتس', 'إذن', 'إحالة', 'تأمين خاص', 'فاتورة'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'urkunden',
        title: {
            de: 'Urkunden und Bescheinigungen',
            en: 'Certificates and documents',
            ru: 'Документы и свидетельства',
            ar: 'الشهادات والوثائق',
        },
        description: {
            de: 'Staatsexamen, Heilpraktiker-Erlaubnis und Fortbildungen — mit Brief und Siegel.',
            en: 'State exam, Heilpraktiker permit and continuing education — with seals and signatures.',
            ru: 'Государственный экзамен, разрешение Heilpraktiker и курсы повышения квалификации — с печатями и подписями.',
            ar: 'الامتحان الحكومي، وإذن Heilpraktiker، والتعليم المستمر — بأختام وتوقيعات.',
        },
        keywords: {
            de: ['urkunde', 'staatsexamen', 'bescheinigung', 'fortbildung'],
            en: ['certificate', 'state exam', 'document', 'continuing education'],
            ru: ['свидетельство', 'государственный экзамен', 'документ', 'повышение квалификации'],
            ar: ['شهادة', 'امتحان حكومي', 'وثيقة', 'تعليم مستمر'],
        },
    },
    {
        path: '/qualifikation',
        sectionId: 'termin',
        title: {
            de: 'Lernen Sie die Praxis kennen',
            en: 'Get to know the practice',
            ru: 'Познакомьтесь с нашей практикой',
            ar: 'تعرّف على عيادتنا',
        },
        description: {
            de: 'Termin vereinbaren — wir freuen uns auf Sie.',
            en: 'Make an appointment — we look forward to meeting you.',
            ru: 'Запишитесь на приём — мы будем рады встрече с вами.',
            ar: 'احجز موعدًا — نتطلّع إلى لقائك.',
        },
        keywords: {
            de: ['termin'],
            en: ['appointment'],
            ru: ['приём'],
            ar: ['موعد'],
        },
    },

    // ─── Karriere ────────────────────────────────────────────────────────
    {
        path: '/karriere',
        sectionId: 'hero',
        title: { de: 'Karriere', en: 'Careers', ru: 'Карьера', ar: 'الوظائف' },
        description: {
            de: 'Mitarbeiten in einer kleinen Praxis mit großem Anspruch.',
            en: 'Work in a small practice with high standards.',
            ru: 'Работа в небольшой практике с высокими стандартами.',
            ar: 'العمل في عيادة صغيرة بمعايير عالية.',
        },
        keywords: {
            de: ['karriere', 'jobs', 'stelle', 'mitarbeiten', 'arbeiten'],
            en: ['careers', 'jobs', 'position', 'work'],
            ru: ['карьера', 'вакансии', 'должность', 'работа'],
            ar: ['وظائف', 'فرص عمل', 'منصب', 'عمل'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'was-uns-ausmacht',
        title: { de: 'Was uns ausmacht', en: 'What sets us apart', ru: 'Что нас отличает', ar: 'ما يميّزنا' },
        description: {
            de: 'Wofür wir stehen — und wofür wir nicht stehen.',
            en: 'What we stand for — and what we do not.',
            ru: 'За что мы выступаем — и за что нет.',
            ar: 'ما نؤمن به — وما لا نؤمن به.',
        },
        keywords: {
            de: ['werte', 'arbeitsweise'],
            en: ['values', 'culture'],
            ru: ['ценности', 'культура'],
            ar: ['القيم', 'الثقافة'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'wen-wir-suchen',
        title: { de: 'Wen wir suchen', en: 'Who we are looking for', ru: 'Кого мы ищем', ar: 'من نبحث عنه' },
        description: {
            de: 'Zwei Wege in unsere Praxis — als ausgebildete Podologin oder als Auszubildende.',
            en: 'Two ways into the practice — as a qualified podiatrist or as a trainee.',
            ru: 'Два пути в нашу практику — как дипломированный подолог или как стажёр.',
            ar: 'طريقتان للانضمام إلى عيادتنا — كأخصائية مؤهلة في العناية بالقدم أو كمتدرّبة.',
        },
        keywords: {
            de: ['stellenausschreibung', 'ausbildung', 'podologin', 'azubi'],
            en: ['job posting', 'training', 'podiatrist', 'apprentice'],
            ru: ['вакансия', 'обучение', 'подолог', 'стажёр'],
            ar: ['إعلان وظيفة', 'تدريب', 'أخصائية القدم', 'متدرّبة'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'was-wir-bieten',
        title: { de: 'Was wir bieten', en: 'What we offer', ru: 'Что мы предлагаем', ar: 'ما نقدّمه' },
        description: {
            de: 'Konditionen und Rahmen — Vergütung, Fortbildung, Arbeitszeiten.',
            en: 'Terms and conditions — pay, training, working hours.',
            ru: 'Условия и рамки — оплата, обучение, рабочее время.',
            ar: 'الشروط والإطار — الأجر، التدريب، ساعات العمل.',
        },
        keywords: {
            de: ['vergütung', 'gehalt', 'fortbildung', 'arbeitszeit'],
            en: ['compensation', 'salary', 'training', 'working hours'],
            ru: ['оплата', 'зарплата', 'обучение', 'рабочее время'],
            ar: ['تعويض', 'راتب', 'تدريب', 'ساعات العمل'],
        },
    },
    {
        path: '/karriere',
        sectionId: 'bewerbung',
        title: { de: 'Bewerbung', en: 'How to apply', ru: 'Как подать заявку', ar: 'كيفية التقديم' },
        description: {
            de: 'In drei Schritten zum Probetag — kurze Nachricht reicht.',
            en: 'Three steps to a trial day — a short message is enough.',
            ru: 'Три шага до пробного дня — достаточно короткого сообщения.',
            ar: 'ثلاث خطوات للوصول إلى يوم تجريبي — رسالة قصيرة تكفي.',
        },
        keywords: {
            de: ['bewerbung', 'bewerben', 'probetag'],
            en: ['apply', 'application', 'trial day'],
            ru: ['заявка', 'подача', 'пробный день'],
            ar: ['تقديم', 'طلب', 'يوم تجريبي'],
        },
    },

    // ─── Datenschutz ─────────────────────────────────────────────────────
    {
        path: '/datenschutz',
        sectionId: 'hero',
        title: {
            de: 'Datenschutzerklärung',
            en: 'Privacy policy',
            ru: 'Политика конфиденциальности',
            ar: 'سياسة الخصوصية',
        },
        description: {
            de: 'Welche Daten wir verarbeiten und auf welcher Rechtsgrundlage.',
            en: 'Which data we process and on what legal basis.',
            ru: 'Какие данные мы обрабатываем и на каком правовом основании.',
            ar: 'البيانات التي نعالجها والأساس القانوني لذلك.',
        },
        keywords: {
            de: ['datenschutz', 'dsgvo'],
            en: ['privacy', 'gdpr'],
            ru: ['конфиденциальность', 'GDPR'],
            ar: ['الخصوصية', 'GDPR'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-1-verantwortlicher',
        title: { de: '1. Verantwortlicher', en: '1. Controller', ru: '1. Ответственное лицо', ar: '1. المسؤول عن المعالجة' },
        description: {
            de: 'Verantwortliche im Sinne der DSGVO — Name, Adresse und Kontakt.',
            en: 'Controller within the meaning of the GDPR — name, address and contact.',
            ru: 'Ответственное лицо в смысле GDPR — имя, адрес и контакт.',
            ar: 'المسؤول عن المعالجة وفق GDPR — الاسم والعنوان وبيانات الاتصال.',
        },
        keywords: {
            de: ['verantwortlicher'],
            en: ['controller'],
            ru: ['ответственное лицо'],
            ar: ['المسؤول'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-2-allgemeines',
        title: {
            de: '2. Allgemeines zur Datenverarbeitung',
            en: '2. General principles',
            ru: '2. Общие положения об обработке данных',
            ar: '2. مبادئ عامة لمعالجة البيانات',
        },
        description: {
            de: 'Rechtsgrundlagen, Zwecke und Speicherdauer der Verarbeitung.',
            en: 'Legal bases, purposes and storage duration of processing.',
            ru: 'Правовые основания, цели и сроки хранения обработки.',
            ar: 'الأسس القانونية، الأغراض ومدة تخزين المعالجة.',
        },
        keywords: {
            de: ['rechtsgrundlage', 'zwecke'],
            en: ['legal basis', 'purpose'],
            ru: ['правовое основание', 'цели'],
            ar: ['الأساس القانوني', 'الأغراض'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-3-server-logs',
        title: { de: '3. Server-Logs', en: '3. Server logs', ru: '3. Журналы сервера', ar: '3. سجلات الخادم' },
        description: {
            de: 'Welche Daten beim Aufruf der Webseite anfallen — IP-Adresse, Zeitpunkt, Browser.',
            en: 'Which data is collected when you visit the site — IP address, time, browser.',
            ru: 'Какие данные собираются при посещении сайта — IP-адрес, время, браузер.',
            ar: 'البيانات التي تُجمع عند زيارة الموقع — عنوان IP، الوقت، المتصفّح.',
        },
        keywords: {
            de: ['server', 'logs', 'ip'],
            en: ['server', 'logs', 'ip'],
            ru: ['сервер', 'логи', 'IP'],
            ar: ['خادم', 'سجلات', 'IP'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-4-cookies',
        title: { de: '4. Cookies', en: '4. Cookies', ru: '4. Файлы cookie', ar: '4. ملفات تعريف الارتباط' },
        description: {
            de: 'Welche Cookies wir setzen, wofür sie genutzt werden und wie Sie sie verwalten.',
            en: 'Which cookies we set, what they are used for and how to manage them.',
            ru: 'Какие cookie мы устанавливаем, для чего они используются и как ими управлять.',
            ar: 'ملفات تعريف الارتباط التي نستخدمها، الغرض منها وكيفية إدارتها.',
        },
        keywords: {
            de: ['cookies'],
            en: ['cookies'],
            ru: ['cookie'],
            ar: ['ملفات تعريف الارتباط'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-5-kontakt',
        title: {
            de: '5. Kontaktaufnahme per Telefon und E-Mail',
            en: '5. Contact by phone and email',
            ru: '5. Контакт по телефону и электронной почте',
            ar: '5. التواصل عبر الهاتف والبريد الإلكتروني',
        },
        description: {
            de: 'Wie wir mit Ihren Anfragen umgehen und wie lange wir sie speichern.',
            en: 'How we handle your enquiries and how long we keep them.',
            ru: 'Как мы обрабатываем ваши обращения и как долго их храним.',
            ar: 'كيف نتعامل مع استفساراتك وكم نحتفظ بها.',
        },
        keywords: {
            de: ['kontakt', 'anfrage', 'e-mail', 'telefon'],
            en: ['contact', 'enquiry', 'email', 'phone'],
            ru: ['контакт', 'обращение', 'e-mail', 'телефон'],
            ar: ['اتصال', 'استفسار', 'بريد إلكتروني', 'هاتف'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-6-google-maps',
        title: {
            de: '6. Eingebettete Karte (Google Maps)',
            en: '6. Embedded map (Google Maps)',
            ru: '6. Встроенная карта (Google Maps)',
            ar: '6. الخريطة المضمّنة (Google Maps)',
        },
        description: {
            de: 'Wie die eingebettete Google-Maps-Karte technisch funktioniert.',
            en: 'How the embedded Google Maps card works technically.',
            ru: 'Как технически работает встроенная карта Google Maps.',
            ar: 'كيف تعمل خريطة Google Maps المضمّنة من الناحية التقنية.',
        },
        keywords: {
            de: ['google maps', 'karte'],
            en: ['google maps', 'map'],
            ru: ['Google Maps', 'карта'],
            ar: ['Google Maps', 'خريطة'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-7-ai-chat',
        title: {
            de: '7. AI-Assistent (Chat)',
            en: '7. AI assistant (chat)',
            ru: '7. AI-ассистент (чат)',
            ar: '7. مساعد الذكاء الاصطناعي (دردشة)',
        },
        description: {
            de: 'Welche Daten der Chat-Assistent verarbeitet und an wen sie weitergegeben werden.',
            en: 'Which data the chat assistant processes and to whom it is passed.',
            ru: 'Какие данные обрабатывает чат-ассистент и кому они передаются.',
            ar: 'البيانات التي يعالجها مساعد الدردشة ومن يتم تمريرها إليه.',
        },
        keywords: {
            de: ['ki', 'ai', 'chat', 'assistent'],
            en: ['ai', 'chat', 'assistant'],
            ru: ['ИИ', 'AI', 'чат', 'ассистент'],
            ar: ['ذكاء اصطناعي', 'AI', 'دردشة', 'مساعد'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-8-externe-verweise',
        title: { de: '8. Externe Verweise', en: '8. External links', ru: '8. Внешние ссылки', ar: '8. الروابط الخارجية' },
        description: {
            de: 'Telefon-, Mailto- und Apple-Maps-Links und ihre Datenschutzfolgen.',
            en: 'Phone, mailto and Apple Maps links and their privacy implications.',
            ru: 'Ссылки на телефон, mailto и Apple Maps и их последствия для конфиденциальности.',
            ar: 'روابط الهاتف وmailto وApple Maps وآثارها على الخصوصية.',
        },
        keywords: {
            de: ['links', 'extern'],
            en: ['links', 'external'],
            ru: ['ссылки', 'внешние'],
            ar: ['روابط', 'خارجية'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-9-empfaenger',
        title: {
            de: '9. Empfänger und Auftragsverarbeiter',
            en: '9. Recipients and processors',
            ru: '9. Получатели и обработчики данных',
            ar: '9. المستلمون ومعالجو البيانات',
        },
        description: {
            de: 'Wer außer uns auf welcher Grundlage Zugriff auf Daten hat.',
            en: 'Who else has access to data and on what basis.',
            ru: 'Кто помимо нас имеет доступ к данным и на каком основании.',
            ar: 'من غيرنا له حق الوصول إلى البيانات وعلى أي أساس.',
        },
        keywords: {
            de: ['empfänger', 'auftragsverarbeiter'],
            en: ['recipients', 'processors'],
            ru: ['получатели', 'обработчики'],
            ar: ['المستلمون', 'المعالجون'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-10-rechte',
        title: { de: '10. Ihre Rechte', en: '10. Your rights', ru: '10. Ваши права', ar: '10. حقوقك' },
        description: {
            de: 'Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch.',
            en: 'Access, rectification, erasure, restriction, portability and objection.',
            ru: 'Доступ, исправление, удаление, ограничение, переносимость и возражение.',
            ar: 'الوصول، التصحيح، المحو، التقييد، قابلية النقل والاعتراض.',
        },
        keywords: {
            de: ['auskunft', 'löschung', 'widerspruch', 'rechte'],
            en: ['access', 'erasure', 'objection', 'rights'],
            ru: ['доступ', 'удаление', 'возражение', 'права'],
            ar: ['الوصول', 'المحو', 'الاعتراض', 'الحقوق'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-11-beschwerderecht',
        title: {
            de: '11. Beschwerderecht',
            en: '11. Right to lodge a complaint',
            ru: '11. Право на подачу жалобы',
            ar: '11. الحق في تقديم شكوى',
        },
        description: {
            de: 'Beschwerde bei der zuständigen Aufsichtsbehörde — Landesbeauftragte für den Datenschutz Rheinland-Pfalz.',
            en: 'Complaint to the supervisory authority — Rhineland-Palatinate data protection commissioner.',
            ru: 'Жалоба в компетентный надзорный орган — уполномоченный по защите данных земли Рейнланд-Пфальц.',
            ar: 'تقديم شكوى إلى الهيئة الإشرافية المختصّة — مفوّض حماية البيانات في راينلاند-بفالتس.',
        },
        keywords: {
            de: ['beschwerde', 'aufsichtsbehörde'],
            en: ['complaint', 'supervisory authority'],
            ru: ['жалоба', 'надзорный орган'],
            ar: ['شكوى', 'هيئة إشرافية'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-12-keine-automatisierung',
        title: {
            de: '12. Keine automatisierte Entscheidungsfindung',
            en: '12. No automated decision-making',
            ru: '12. Отсутствие автоматизированного принятия решений',
            ar: '12. لا توجد قرارات آلية',
        },
        description: {
            de: 'Keine automatisierten Entscheidungen oder Profiling.',
            en: 'No automated decisions or profiling.',
            ru: 'Никаких автоматизированных решений или профилирования.',
            ar: 'لا توجد قرارات آلية أو تنميط.',
        },
        keywords: {
            de: ['profiling', 'automatisiert'],
            en: ['profiling', 'automated'],
            ru: ['профилирование', 'автоматизированный'],
            ar: ['تنميط', 'آلي'],
        },
    },
    {
        path: '/datenschutz',
        sectionId: 'block-13-aktualisierungen',
        title: {
            de: '13. Aktualisierungen dieser Erklärung',
            en: '13. Updates to this statement',
            ru: '13. Обновления этого заявления',
            ar: '13. تحديثات هذا البيان',
        },
        description: {
            de: 'Wann wir die Datenschutzerklärung aktualisieren.',
            en: 'When we update the privacy statement.',
            ru: 'Когда мы обновляем политику конфиденциальности.',
            ar: 'متى نقوم بتحديث سياسة الخصوصية.',
        },
        keywords: {
            de: ['aktualisierung', 'stand'],
            en: ['updates', 'last updated'],
            ru: ['обновление', 'дата'],
            ar: ['تحديث', 'آخر تحديث'],
        },
    },

    // ─── Impressum ───────────────────────────────────────────────────────
    {
        path: '/impressum',
        sectionId: 'hero',
        title: { de: 'Impressum', en: 'Imprint', ru: 'Выходные данные', ar: 'بيانات الناشر' },
        description: {
            de: 'Anbieterkennzeichnung gemäß § 5 TMG und § 18 MStV.',
            en: 'Provider identification under § 5 TMG and § 18 MStV.',
            ru: 'Идентификация провайдера согласно § 5 TMG и § 18 MStV.',
            ar: 'تعريف مقدّم الخدمة وفق § 5 TMG و§ 18 MStV.',
        },
        keywords: {
            de: ['impressum'],
            en: ['imprint'],
            ru: ['выходные данные'],
            ar: ['بيانات الناشر'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-tmg',
        title: {
            de: 'Angaben gemäß § 5 TMG',
            en: 'Information under § 5 TMG',
            ru: 'Сведения согласно § 5 TMG',
            ar: 'البيانات وفق § 5 TMG',
        },
        description: {
            de: 'Name, Anschrift und Sitz der Praxis.',
            en: 'Name, address and seat of the practice.',
            ru: 'Имя, адрес и место нахождения практики.',
            ar: 'الاسم والعنوان ومقرّ العيادة.',
        },
        keywords: {
            de: ['tmg', 'anbieter'],
            en: ['tmg', 'provider'],
            ru: ['TMG', 'провайдер'],
            ar: ['TMG', 'مقدّم الخدمة'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-steuer',
        title: { de: 'Steuerliche Angaben', en: 'Tax details', ru: 'Налоговые данные', ar: 'البيانات الضريبية' },
        description: {
            de: 'Steuernummer und Institutionskennzeichen.',
            en: 'Tax number and institution code (IK).',
            ru: 'Налоговый номер и идентификатор учреждения (IK).',
            ar: 'الرقم الضريبي ورمز المؤسسة (IK).',
        },
        keywords: {
            de: ['steuernummer', 'ik'],
            en: ['tax number', 'institution code'],
            ru: ['налоговый номер', 'IK'],
            ar: ['الرقم الضريبي', 'IK'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-kontakt',
        title: { de: 'Kontakt', en: 'Contact', ru: 'Контакт', ar: 'اتصل بنا' },
        description: {
            de: 'Telefon und E-Mail für rechtliche Anfragen.',
            en: 'Phone and email for legal enquiries.',
            ru: 'Телефон и e-mail для юридических обращений.',
            ar: 'الهاتف والبريد الإلكتروني للاستفسارات القانونية.',
        },
        keywords: {
            de: ['kontakt'],
            en: ['contact'],
            ru: ['контакт'],
            ar: ['اتصال'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-berufsbezeichnung',
        title: {
            de: 'Berufsbezeichnung und berufsrechtliche Regelungen',
            en: 'Professional title and regulatory framework',
            ru: 'Название профессии и нормативная база',
            ar: 'المسمّى المهني والإطار التنظيمي',
        },
        description: {
            de: 'Podologin und Heilpraktikerin — verliehene Titel und maßgebliche Regelungen.',
            en: 'Podiatrist and Heilpraktiker — conferred titles and relevant regulations.',
            ru: 'Подолог и Heilpraktiker — присвоенные звания и применимые правила.',
            ar: 'أخصائية العناية بالقدم وHeilpraktiker — الألقاب الممنوحة واللوائح ذات الصلة.',
        },
        keywords: {
            de: ['berufsbezeichnung', 'titel'],
            en: ['professional title', 'regulation'],
            ru: ['название профессии', 'регулирование'],
            ar: ['المسمّى المهني', 'تنظيم'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-aufsicht',
        title: {
            de: 'Zuständige Aufsichtsbehörde',
            en: 'Supervisory authority',
            ru: 'Компетентный надзорный орган',
            ar: 'الهيئة الإشرافية المختصّة',
        },
        description: {
            de: 'Welches Gesundheitsamt für die Praxis zuständig ist.',
            en: 'Which health authority is responsible for the practice.',
            ru: 'Какой орган здравоохранения отвечает за практику.',
            ar: 'الجهة الصحية المسؤولة عن العيادة.',
        },
        keywords: {
            de: ['gesundheitsamt', 'aufsicht'],
            en: ['health authority', 'supervisory'],
            ru: ['орган здравоохранения', 'надзор'],
            ar: ['الجهة الصحية', 'إشراف'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftpflicht',
        title: {
            de: 'Berufshaftpflichtversicherung',
            en: 'Professional liability insurance',
            ru: 'Страхование профессиональной ответственности',
            ar: 'تأمين المسؤولية المهنية',
        },
        description: {
            de: 'Versicherer und räumlicher Geltungsbereich der Berufshaftpflicht.',
            en: 'Insurer and geographic scope of professional liability cover.',
            ru: 'Страховщик и территориальная сфера действия страхования профессиональной ответственности.',
            ar: 'شركة التأمين والنطاق الجغرافي لتغطية المسؤولية المهنية.',
        },
        keywords: {
            de: ['haftpflicht', 'versicherung'],
            en: ['liability', 'insurance'],
            ru: ['ответственность', 'страхование'],
            ar: ['مسؤولية', 'تأمين'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-streit',
        title: {
            de: 'Streitschlichtung',
            en: 'Online dispute resolution',
            ru: 'Разрешение споров онлайн',
            ar: 'تسوية النزاعات عبر الإنترنت',
        },
        description: {
            de: 'Hinweis zur Online-Streitbeilegung der EU.',
            en: 'Notice about EU online dispute resolution.',
            ru: 'Уведомление о платформе ЕС для онлайн-разрешения споров.',
            ar: 'إشعار بشأن منصّة الاتحاد الأوروبي لتسوية النزاعات عبر الإنترنت.',
        },
        keywords: {
            de: ['streit', 'schlichtung', 'os-plattform'],
            en: ['dispute', 'resolution', 'os platform'],
            ru: ['спор', 'разрешение', 'OS-платформа'],
            ar: ['نزاع', 'تسوية', 'منصّة OS'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftung-inhalte',
        title: {
            de: 'Haftung für Inhalte',
            en: 'Liability for content',
            ru: 'Ответственность за содержание',
            ar: 'المسؤولية عن المحتوى',
        },
        description: {
            de: 'Haftungsregelung nach § 7 TMG.',
            en: 'Liability rules under § 7 TMG.',
            ru: 'Правила ответственности согласно § 7 TMG.',
            ar: 'قواعد المسؤولية وفق § 7 TMG.',
        },
        keywords: {
            de: ['haftung', 'inhalte'],
            en: ['liability', 'content'],
            ru: ['ответственность', 'содержание'],
            ar: ['مسؤولية', 'محتوى'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-haftung-links',
        title: { de: 'Haftung für Links', en: 'Liability for links', ru: 'Ответственность за ссылки', ar: 'المسؤولية عن الروابط' },
        description: {
            de: 'Haftung für externe Links.',
            en: 'Liability for external links.',
            ru: 'Ответственность за внешние ссылки.',
            ar: 'المسؤولية عن الروابط الخارجية.',
        },
        keywords: {
            de: ['haftung', 'links'],
            en: ['liability', 'links'],
            ru: ['ответственность', 'ссылки'],
            ar: ['مسؤولية', 'روابط'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-urheberrecht',
        title: { de: 'Urheberrecht', en: 'Copyright', ru: 'Авторское право', ar: 'حقوق النشر' },
        description: {
            de: 'Urheberrechtshinweise zu Inhalten dieser Webseite.',
            en: 'Copyright notices for content on this site.',
            ru: 'Уведомления об авторском праве на содержимое этого сайта.',
            ar: 'إشعارات حقوق النشر لمحتوى هذا الموقع.',
        },
        keywords: {
            de: ['urheberrecht'],
            en: ['copyright'],
            ru: ['авторское право'],
            ar: ['حقوق النشر'],
        },
    },
    {
        path: '/impressum',
        sectionId: 'block-bildnachweise',
        title: { de: 'Bildnachweise', en: 'Image credits', ru: 'Источники изображений', ar: 'مصادر الصور' },
        description: {
            de: 'Quellen und Lizenzen der verwendeten Bilder.',
            en: 'Sources and licences of images used.',
            ru: 'Источники и лицензии используемых изображений.',
            ar: 'مصادر وتراخيص الصور المستخدمة.',
        },
        keywords: {
            de: ['bildnachweise', 'fotos'],
            en: ['image credits', 'photos'],
            ru: ['источники изображений', 'фото'],
            ar: ['مصادر الصور', 'صور'],
        },
    },
];

function leafToEntry(path: SearchEntryPath, leaf: ContentLeaf): SearchEntry {
    return {
        path,
        sectionId: leaf.id,
        title: leaf.heading,
        description: leaf.body,
        keywords: leaf.keywords,
    };
}

function searchIndexBuild(): ReadonlyArray<SearchEntry> {
    const leafEntries: SearchEntry[] = [];

    // Order matters: when two entries score identically (e.g. "Hühnerauge"
    // matches an exact keyword on both a checklist card and a treatment card),
    // cmdk breaks the tie by registration order. Push the actionable service
    // cards first so they win those ties.
    for (const group of LEISTUNGEN_SERVICE_GROUPS) for (const leaf of group.items) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_CHECKLIST) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_BRING_LIST_KASSE) leafEntries.push(leafToEntry('/leistungen', leaf));
    for (const leaf of LEISTUNGEN_BRING_LIST_PRIVAT) leafEntries.push(leafToEntry('/leistungen', leaf));

    for (const leaf of KARRIERE_VALUE_CARDS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_REQUIREMENTS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_OFFERINGS) leafEntries.push(leafToEntry('/karriere', leaf));
    for (const leaf of KARRIERE_STEPS) leafEntries.push(leafToEntry('/karriere', leaf));

    for (const leaf of INDEX_SERVICES) leafEntries.push(leafToEntry('/', leaf));
    for (const leaf of INDEX_SUGGESTED_QUESTIONS) leafEntries.push(leafToEntry('/', leaf));
    for (const leaf of INDEX_CREDENTIALS) leafEntries.push(leafToEntry('/', leaf));
    for (const leaf of INDEX_PRAXIS_PILLARS) leafEntries.push(leafToEntry('/', leaf));

    for (const leaf of PRAXIS_HYGIENE_PILLARS) leafEntries.push(leafToEntry('/praxis', leaf));
    for (const leaf of PRAXIS_REPROCESSING_STEPS) leafEntries.push(leafToEntry('/praxis', leaf));

    // Curated entries take precedence over auto-derived leaves so that an
    // editorial title is never silently overwritten by a colliding leaf id.
    const seen = new Set<string>();
    const all: SearchEntry[] = [];
    for (const entry of [...SEARCH_INDEX_SECTIONS, ...leafEntries]) {
        const key = `${entry.path}#${entry.sectionId ?? ''}`;
        if (seen.has(key)) continue;
        seen.add(key);
        all.push(entry);
    }
    return all;
}

export const SEARCH_INDEX: ReadonlyArray<SearchEntry> = searchIndexBuild();

export function searchEntryHaystack(entry: SearchEntry, locale: Locale): string {
    const parts = [entry.title[locale], entry.description[locale], ...(entry.keywords?.[locale] ?? [])];
    return parts.join(' ').toLowerCase();
}
