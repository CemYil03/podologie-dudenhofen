import { ClockIcon, GraduationCapIcon, HandshakeIcon, ShieldCheckIcon } from 'lucide-react';
import { PRACTICE } from '../practice';
import type { ContentLeaf } from './contentLeaf';

export const KARRIERE_VALUE_CARDS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'value-zeit',
        icon: ClockIcon,
        heading: {
            de: 'Zeit pro Behandlung',
            en: 'Time per treatment',
            ru: 'Время на каждую процедуру',
            ar: 'الوقت المخصص لكل علاج',
        },
        body: {
            de: 'Keine 20-Minuten-Termine. Wir nehmen uns die Zeit, die der Fuß braucht.',
            en: 'No 20-minute slots. We take the time each foot actually needs.',
            ru: 'Никаких приёмов по 20 минут. Мы уделяем каждой стопе столько времени, сколько ей действительно необходимо.',
            ar: 'لا مواعيد مدتها عشرون دقيقة. نخصص لكل قدم الوقت الذي تحتاجه فعلاً.',
        },
        keywords: {
            de: ['zeit', 'behandlungsdauer'],
            en: ['time', 'treatment duration'],
            ru: ['время', 'продолжительность процедуры'],
            ar: ['الوقت', 'مدة العلاج'],
        },
    },
    {
        id: 'value-hygiene',
        icon: ShieldCheckIcon,
        heading: {
            de: 'Hygiene auf Praxisniveau',
            en: 'Hygiene at practice level',
            ru: 'Гигиена на уровне медицинской практики',
            ar: 'النظافة على مستوى العيادة',
        },
        body: {
            de: 'Thermische Desinfektion und Sterilisation der Instrumente nach RKI-Empfehlung.',
            en: 'Thermal disinfection and sterilisation of instruments following RKI guidelines.',
            ru: 'Термическая дезинфекция и стерилизация инструментов согласно рекомендациям RKI.',
            ar: 'تعقيم وتطهير حراري للأدوات وفقاً لتوصيات معهد RKI.',
        },
        keywords: {
            de: ['hygiene', 'rki', 'sterilisation'],
            en: ['hygiene', 'rki', 'sterilisation'],
            ru: ['гигиена', 'rki', 'стерилизация'],
            ar: ['النظافة', 'RKI', 'التعقيم'],
        },
    },
    {
        id: 'value-fortbildung',
        icon: GraduationCapIcon,
        heading: {
            de: 'Fortbildungen',
            en: 'Continuing education',
            ru: 'Повышение квалификации',
            ar: 'التعليم المستمر',
        },
        body: {
            de: 'Wir unterstützen Weiterbildungen aktiv, fachlich und finanziell.',
            en: 'We actively support further training — both professionally and financially.',
            ru: 'Мы активно поддерживаем дальнейшее обучение — как профессионально, так и финансово.',
            ar: 'ندعم التدريب الإضافي بفعالية، مهنياً ومالياً على حدٍّ سواء.',
        },
        keywords: {
            de: ['fortbildung', 'weiterbildung', 'schulung'],
            en: ['continuing education', 'training', 'courses'],
            ru: ['повышение квалификации', 'обучение', 'курсы'],
            ar: ['التعليم المستمر', 'التدريب', 'الدورات'],
        },
    },
    {
        id: 'value-kollegial',
        icon: HandshakeIcon,
        heading: {
            de: 'Kollegiales Miteinander',
            en: 'Collegial atmosphere',
            ru: 'Дружеская коллегиальная атмосфера',
            ar: 'أجواء زمالة ودية',
        },
        body: {
            de: 'Kleine Praxis, kurze Wege, ehrliche Absprachen.',
            en: 'Small practice, short paths, honest agreements.',
            ru: 'Небольшая практика, короткие пути, честные договорённости.',
            ar: 'عيادة صغيرة، مسافات قصيرة، اتفاقات صريحة.',
        },
        keywords: {
            de: ['kollegial', 'team', 'miteinander'],
            en: ['collegial', 'team', 'atmosphere'],
            ru: ['коллегиальность', 'команда', 'атмосфера'],
            ar: ['الزمالة', 'الفريق', 'الأجواء'],
        },
    },
];

export const KARRIERE_REQUIREMENTS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'req-staatlich',
        heading: {
            de: 'Staatliche Anerkennung als Podologin / Podologe',
            en: 'State-recognised qualification as a podiatrist',
            ru: 'Государственное признание квалификации подолога',
            ar: 'اعتماد حكومي كأخصائي في علاج القدم (Podologe)',
        },
        body: {
            de: 'Abgeschlossene Ausbildung mit Staatsexamen — die rechtliche Grundlage für Kassenabrechnung.',
            en: 'Completed training with the state examination — the legal basis for statutory billing.',
            ru: 'Законченное образование с государственным экзаменом — правовая основа для расчётов с больничными кассами.',
            ar: 'تدريب مكتمل مع اجتياز الامتحان الحكومي — الأساس القانوني للتعامل مع شركات التأمين الصحي.',
        },
        keywords: {
            de: ['staatlich', 'anerkennung', 'staatsexamen'],
            en: ['state', 'recognised', 'state exam'],
            ru: ['государственное', 'признание', 'госэкзамен'],
            ar: ['حكومي', 'اعتماد', 'امتحان الدولة'],
        },
    },
    {
        id: 'req-dfs',
        heading: {
            de: 'Sicheres Arbeiten beim diabetischen Fußsyndrom (DFS)',
            en: 'Confident treatment of patients with diabetic foot syndrome (DFS)',
            ru: 'Уверенная работа с синдромом диабетической стопы (DFS)',
            ar: 'العمل بثقة مع متلازمة القدم السكرية (DFS)',
        },
        body: {
            de: 'Sie kennen Befund, Risiken und Grenzen einer podologischen Behandlung bei Diabetes.',
            en: 'You know the findings, risks and limits of podiatric treatment in diabetes.',
            ru: 'Вы знаете клиническую картину, риски и границы подологического лечения при диабете.',
            ar: 'تعرفون التشخيص والمخاطر وحدود العلاج للقدم لدى مرضى السكري.',
        },
        keywords: {
            de: ['diabetes', 'dfs', 'diabetisches fußsyndrom'],
            en: ['diabetes', 'dfs', 'diabetic foot syndrome'],
            ru: ['диабет', 'dfs', 'синдром диабетической стопы'],
            ar: ['السكري', 'DFS', 'متلازمة القدم السكرية'],
        },
    },
    {
        id: 'req-spangen',
        heading: {
            de: 'Idealerweise Erfahrung mit Nagelkorrektur-Spangen',
            en: 'Ideally experience with nail-correction braces',
            ru: 'В идеале — опыт работы с корректирующими скобами для ногтей',
            ar: 'يُفضَّل وجود خبرة في تقويم الأظافر بالمشابك',
        },
        body: {
            de: 'Erfahrung mit Orthonyxie-Systemen ist ein Plus — wir bilden hier auch weiter.',
            en: 'Experience with orthonyxia systems is a plus — we also support further training here.',
            ru: 'Опыт работы с системами ортониксии будет плюсом — в этой области мы также проводим обучение.',
            ar: 'الخبرة في أنظمة Orthonyxie ميزة إضافية — ونقدم تدريباً إضافياً في هذا المجال أيضاً.',
        },
        keywords: {
            de: ['spange', 'spangen', 'orthonyxie'],
            en: ['brace', 'braces', 'orthonyxia'],
            ru: ['скоба', 'скобы', 'ортониксия'],
            ar: ['مشبك', 'مشابك', 'Orthonyxie'],
        },
    },
    {
        id: 'req-empathie',
        heading: {
            de: 'Empathischer Umgang mit älteren Patientinnen und Patienten',
            en: 'Empathetic manner with elderly patients',
            ru: 'Эмпатичное отношение к пожилым пациентам',
            ar: 'التعامل بتعاطف مع المرضى من كبار السن',
        },
        body: {
            de: 'Ein Großteil unserer Stammkundschaft ist über 70 — Geduld und ein freundlicher Ton sind wichtig.',
            en: 'A large share of our regulars is over 70 — patience and a friendly tone matter.',
            ru: 'Значительная часть наших постоянных пациентов — старше 70 лет; терпение и доброжелательный тон имеют большое значение.',
            ar: 'يزيد عمر جزء كبير من مرضانا الدائمين عن سبعين عاماً — الصبر ولطف الأسلوب أمران جوهريان.',
        },
        keywords: {
            de: ['empathie', 'umgang', 'patienten'],
            en: ['empathy', 'patient care'],
            ru: ['эмпатия', 'обращение', 'пациенты'],
            ar: ['التعاطف', 'رعاية المرضى'],
        },
    },
    {
        id: 'req-deutsch',
        heading: {
            de: 'Deutschkenntnisse auf Konversationsniveau',
            en: 'Conversational German',
            ru: 'Знание немецкого языка на разговорном уровне',
            ar: 'إتقان اللغة الألمانية على المستوى التحادثي',
        },
        body: {
            de: 'Die Behandlung läuft auf Deutsch — Anamnese, Beratung, Aufklärung.',
            en: 'Treatment runs in German — history, advice, explanations.',
            ru: 'Лечение проходит на немецком языке — анамнез, консультация, разъяснения.',
            ar: 'يجري العلاج باللغة الألمانية — التاريخ المرضي والاستشارة والتوضيح.',
        },
        keywords: {
            de: ['deutsch', 'sprache'],
            en: ['german', 'language'],
            ru: ['немецкий', 'язык'],
            ar: ['الألمانية', 'اللغة'],
        },
    },
];

export const KARRIERE_OFFERINGS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'offer-anstellung',
        heading: {
            de: 'Anstellung',
            en: 'Employment',
            ru: 'Трудоустройство',
            ar: 'التوظيف',
        },
        body: {
            de: 'Voll- oder Teilzeit, nach Absprache.',
            en: 'Full-time or part-time, by arrangement.',
            ru: 'Полная или частичная занятость, по договорённости.',
            ar: 'دوام كامل أو جزئي، حسب الاتفاق.',
        },
        keywords: {
            de: ['anstellung', 'vollzeit', 'teilzeit'],
            en: ['employment', 'full-time', 'part-time'],
            ru: ['трудоустройство', 'полная занятость', 'частичная занятость'],
            ar: ['التوظيف', 'دوام كامل', 'دوام جزئي'],
        },
    },
    {
        id: 'offer-verguetung',
        heading: {
            de: 'Vergütung',
            en: 'Compensation',
            ru: 'Оплата труда',
            ar: 'الأجر',
        },
        body: {
            de: 'Fair, leistungsgerecht, im Gespräch klärbar.',
            en: 'Fair, performance-based, settled in conversation.',
            ru: 'Справедливая, соответствующая результатам, согласовывается в личной беседе.',
            ar: 'عادل ويتناسب مع الأداء، ويُتفق عليه في حوار شخصي.',
        },
        keywords: {
            de: ['vergütung', 'gehalt', 'lohn', 'bezahlung'],
            en: ['compensation', 'salary', 'pay'],
            ru: ['оплата', 'зарплата', 'жалованье'],
            ar: ['الأجر', 'الراتب', 'المكافأة'],
        },
    },
    {
        id: 'offer-fortbildungsbudget',
        heading: {
            de: 'Fortbildungsbudget',
            en: 'Training budget',
            ru: 'Бюджет на повышение квалификации',
            ar: 'ميزانية التدريب',
        },
        body: {
            de: 'Jährlich, schriftlich vereinbart.',
            en: 'Annual, agreed in writing.',
            ru: 'Ежегодный, согласованный в письменной форме.',
            ar: 'سنوية ومتفق عليها كتابياً.',
        },
        keywords: {
            de: ['fortbildung', 'budget', 'weiterbildung'],
            en: ['training', 'budget', 'continuing education'],
            ru: ['повышение квалификации', 'бюджет', 'обучение'],
            ar: ['التدريب', 'الميزانية', 'التعليم المستمر'],
        },
    },
    {
        id: 'offer-ausstattung',
        heading: {
            de: 'Ausstattung',
            en: 'Equipment',
            ru: 'Оснащение',
            ar: 'التجهيزات',
        },
        body: {
            de: 'Moderne Behandlungseinheiten, ergonomisches Arbeiten.',
            en: 'Modern treatment units, ergonomic working environment.',
            ru: 'Современные процедурные установки, эргономичные условия работы.',
            ar: 'وحدات علاج حديثة وبيئة عمل مريحة بيولوجياً.',
        },
        keywords: {
            de: ['ausstattung', 'geräte', 'ergonomie'],
            en: ['equipment', 'units', 'ergonomic'],
            ru: ['оснащение', 'оборудование', 'эргономика'],
            ar: ['التجهيزات', 'الأجهزة', 'الهندسة البشرية'],
        },
    },
    {
        id: 'offer-standort',
        heading: {
            de: 'Praxisstandort',
            en: 'Location',
            ru: 'Расположение практики',
            ar: 'موقع العيادة',
        },
        body: {
            de: 'Dudenhofen bei Speyer, gute Anbindung.',
            en: 'Dudenhofen near Speyer, well connected.',
            ru: 'Dudenhofen рядом со Speyer, удобное транспортное сообщение.',
            ar: 'في Dudenhofen بالقرب من Speyer، مع وصلات مواصلات جيدة.',
        },
        keywords: {
            de: ['standort', 'dudenhofen', 'speyer'],
            en: ['location', 'dudenhofen', 'speyer'],
            ru: ['расположение', 'Dudenhofen', 'Speyer'],
            ar: ['الموقع', 'Dudenhofen', 'Speyer'],
        },
    },
    {
        id: 'offer-stammkundschaft',
        heading: {
            de: 'Stammkundschaft',
            en: 'Patient base',
            ru: 'Постоянная клиентура',
            ar: 'قاعدة المرضى الدائمين',
        },
        body: {
            de: 'Gewachsene Stammkundschaft, Hausbesuche im Umkreis.',
            en: 'Established, many regulars, house calls in the surrounding area.',
            ru: 'Сложившаяся постоянная клиентура, выезды на дом в близлежащих районах.',
            ar: 'قاعدة راسخة من المرضى الدائمين، مع زيارات منزلية في المنطقة المحيطة.',
        },
        keywords: {
            de: ['stammkundschaft', 'patienten', 'hausbesuche'],
            en: ['regulars', 'patients', 'house calls'],
            ru: ['постоянные пациенты', 'пациенты', 'выезды на дом'],
            ar: ['المرضى الدائمون', 'المرضى', 'الزيارات المنزلية'],
        },
    },
];

export const KARRIERE_STEPS: ReadonlyArray<ContentLeaf> = [
    {
        id: 'step-schreiben',
        heading: {
            de: 'Schreiben Sie uns',
            en: 'Get in touch',
            ru: 'Напишите нам',
            ar: 'تواصلوا معنا',
        },
        body: {
            de: `Eine kurze Mail oder ein Anruf reicht. Adresse: ${PRACTICE.email}.`,
            en: `A short email or phone call is enough. Address: ${PRACTICE.email}.`,
            ru: `Достаточно короткого письма или звонка. Адрес: ${PRACTICE.email}.`,
            ar: `تكفي رسالة قصيرة عبر البريد الإلكتروني أو مكالمة هاتفية. العنوان: ${PRACTICE.email}.`,
        },
        keywords: {
            de: ['kontakt', 'mail', 'anruf', 'bewerbung'],
            en: ['contact', 'email', 'call', 'apply'],
            ru: ['контакт', 'письмо', 'звонок', 'заявка'],
            ar: ['التواصل', 'البريد الإلكتروني', 'الاتصال', 'التقديم'],
        },
    },
    {
        id: 'step-kennenlernen',
        heading: {
            de: 'Kennenlernen',
            en: 'Meet in person',
            ru: 'Личное знакомство',
            ar: 'لقاء شخصي',
        },
        body: {
            de: 'Wir vereinbaren ein lockeres Gespräch in der Praxis.',
            en: 'We arrange a relaxed conversation at the practice.',
            ru: 'Мы договариваемся о непринуждённой беседе в практике.',
            ar: 'ننسق لقاءً ودياً غير رسمي في العيادة.',
        },
        keywords: {
            de: ['kennenlernen', 'gespräch'],
            en: ['meeting', 'conversation', 'meet'],
            ru: ['знакомство', 'беседа'],
            ar: ['التعارف', 'الحوار'],
        },
    },
    {
        id: 'step-probetag',
        heading: {
            de: 'Probetag',
            en: 'Trial day',
            ru: 'Пробный день (Schnuppertag)',
            ar: 'يوم تجريبي (Schnuppertag)',
        },
        body: {
            de: 'Ein bezahlter Probetag — bevor irgendjemand etwas unterschreibt.',
            en: 'A paid trial day — before anyone signs anything.',
            ru: 'Оплачиваемый пробный день — прежде чем кто-либо что-либо подписывает.',
            ar: 'يوم تجريبي مدفوع الأجر — قبل أن يوقع أي طرف على أي شيء.',
        },
        keywords: {
            de: ['probetag', 'probearbeit', 'schnuppertag'],
            en: ['trial day', 'paid trial'],
            ru: ['пробный день', 'пробная работа', 'Schnuppertag'],
            ar: ['يوم تجريبي', 'تجربة عمل', 'Schnuppertag'],
        },
    },
];
