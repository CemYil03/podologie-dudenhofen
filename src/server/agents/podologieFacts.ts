import type { Locale } from '../../web/utils/locale';

// Single source of truth for the practice facts the visitor agent grounds
// its answers in. Mirrors the "Practice details" section of `docs/project.md`
// and the constants in `src/web/components/SiteHeader.tsx` /
// `src/routes/{-$locale}/kontakt.tsx` — when any of these change, update both
// places and this file.
//
// Kept as a small TypeScript constant rather than a JSON blob so the
// strings live where IDE go-to-definition lands and so refactors that
// rename a field in the prompt fail loudly instead of silently going
// stale.
export const PODOLOGIE_FACTS = {
    practitioner: 'Annette Yilmaz',
    address: 'Speyerer Straße 60, 67373 Dudenhofen',
    phone: '+49 6232 621064',
    phoneTel: '+496232621064',
    email: 'podologie.annette@gmail.com',
    pageAnchors: {
        services: '/leistungen',
        servicesNeed: '/leistungen#brauche-ich-podologen',
        servicesList: '/leistungen#leistungen',
        firstAppointment: '/leistungen#was-bringe-ich-mit',
        costs: '/leistungen#kosten',
        rooms: '/praxis#raeume',
        therapist: '/praxis#therapeutin',
        hygiene: '/praxis#hygiene',
        directions: '/kontakt#anfahrt',
        contactRequest: '/kontakt#kontaktdaten',
    },
} as const;

// Locale-specific facts. Hours and transit text use locale-appropriate day
// abbreviations and connectors; the `services` list is grounded medical-
// vocabulary text the visitor agent quotes back at users when they ask what
// the practice offers. Adding a new locale here is enough to make the agent
// respond in that language — see `agentVisitorAssistant.ts`.
// The `costs` block encodes the German statutory-insurance rules around
// podologische Leistungen so the visitor agent can answer Zuzahlung /
// Eigenanteil / Kassen-vs-Privat questions accurately. The wording mirrors
// the public `/leistungen#kosten` page (the practice owner has signed off on
// it there) — when that page changes, mirror it here. The 10 €/10 % numbers
// are statutory, not practice-set prices, so the agent is allowed to quote
// them; everything else stays "call us for concrete prices".
export const PODOLOGIE_FACTS_LOCALIZED: Record<
    Locale,
    {
        hours: string;
        transit: string;
        services: ReadonlyArray<string>;
        costs: ReadonlyArray<string>;
    }
> = {
    de: {
        hours: 'Mo–Do 08:00–18:00, Fr 08:00–14:00, Sa & So geschlossen — Termine nach Vereinbarung',
        transit: 'Bus 591 und 507 ab Speyer; Haltestellen "Speyerer Straße" und "Boligweg" (Dudenhofen)',
        services: [
            'Podologische Behandlung (Hornhaut, Hühneraugen, eingewachsene Nägel)',
            'Diabetisches Fußsyndrom — Verordnung über Heilmittel möglich',
            'Nagelkorrekturspangen / Orthonyxie',
            'Hausbesuche nach Absprache',
        ],
        costs: [
            'Gesetzlich versichert mit ärztlicher Verordnung (z. B. bei diabetischem Fußsyndrom oder vergleichbarer Diagnose): Die gesetzliche Krankenkasse übernimmt die Behandlungskosten — wir rechnen direkt mit der Kasse ab. Du verwechselst „die Kasse zahlt alles" nicht mit „kostenlos für die Patientin": es bleibt der gesetzliche Eigenanteil (siehe unten), den die Patientin selbst trägt.',
            'Gesetzlicher Eigenanteil für Kassenpatient*innen besteht aus zwei Teilen, beide gesetzlich vorgeschrieben (kein Praxisaufschlag): (a) 10 € Rezeptgebühr pro Verordnungsblatt — einmalig je Blatt, unabhängig davon, wie viele Behandlungen darauf stehen; (b) 10 % gesetzliche Zuzahlung auf die Behandlungskosten je Sitzung. Beides rechnen wir direkt mit der Patientin ab, nicht mit der Kasse.',
            'Bei Hausbesuchen für Kassenpatient*innen gelten die 10 % Zuzahlung nicht nur auf die Behandlung, sondern auch auf Hauspauschale und Wegegeld.',
            'Zuzahlungsbefreiung: Wer von seiner Krankenkasse für das laufende Jahr von Zuzahlungen befreit ist (Befreiungsausweis), zahlt weder die 10 € Rezeptgebühr noch den 10 %-Eigenanteil. Bitte den Befreiungsausweis zum Termin mitbringen.',
            'Selbstzahler*innen / Privat ohne Verordnung: Wir rechnen nach Leistung ab. Konkrete Preise nennen wir am Telefon — nicht im Chat.',
            'Privat versichert mit Verordnung: Die Patientin zahlt zunächst selbst und reicht die Rechnung bei ihrer privaten Krankenversicherung (PKV) bzw. Beihilfe ein. Ob und wie viel erstattet wird, hängt vom individuellen Tarif ab — das kann nur die PKV beantworten, nicht die Praxis.',
            'Wichtig: Der „Eigenanteil" gemeint ist hier ausschließlich die gesetzliche Zuzahlung der GKV (10 €/Rezept + 10 %/Behandlung). Bei Privatpatient*innen oder Selbstzahler*innen gibt es keinen „Eigenanteil" in diesem Sinne — sie zahlen die Rechnung vollständig selbst und holen sich ggf. eine Erstattung bei ihrer PKV.',
        ],
    },
    en: {
        hours: 'Mon–Thu 08:00–18:00, Fri 08:00–14:00, Sat & Sun closed — appointments by arrangement',
        transit: 'Buses 591 and 507 from Speyer; stops "Speyerer Straße" and "Boligweg" (Dudenhofen)',
        services: [
            'Podiatry treatment (calluses, corns, ingrown nails)',
            'Diabetic foot syndrome — prescription via medical aid possible',
            'Nail-correction braces / orthonyxia',
            'Home visits by arrangement',
        ],
        costs: [
            'Statutory health insurance (GKV) with a medical prescription (e.g. diabetic foot syndrome or comparable diagnosis): the statutory fund covers the treatment cost — we bill the fund directly. Do not confuse "the fund pays" with "free for the patient": the statutory co-payment (Eigenanteil, see below) is still owed by the patient.',
            'The statutory co-payment for GKV patients has two parts, both set by law (not a practice mark-up): (a) €10 prescription fee per prescription form — one-off per form, regardless of how many treatments are listed on it; (b) 10% statutory co-payment on the treatment cost per session. Both are billed directly to the patient, not to the fund.',
            'For home visits for GKV patients the 10% co-payment also applies to the home-visit flat fee and travel costs, not just the treatment itself.',
            'Co-payment exemption: patients whose statutory fund has granted them a co-payment exemption for the current year (Befreiungsausweis) pay neither the €10 prescription fee nor the 10% co-payment. Please bring the exemption certificate to the appointment.',
            'Self-payers / private without prescription: billed by service. We share concrete prices over the phone — never in chat.',
            'Privately insured (PKV) with a prescription: the patient pays the practice directly and then submits the invoice to their private health insurer (PKV) and/or Beihilfe. Whether and how much is reimbursed depends on the individual tariff — only the PKV can answer that, not the practice.',
            'Important: in the German system "Eigenanteil" here means strictly the statutory GKV co-payment (€10/prescription + 10%/treatment). For privately insured or self-paying patients there is no "Eigenanteil" in that sense — they pay the full invoice themselves and may get reimbursed by their PKV.',
        ],
    },
    ru: {
        hours: 'Пн–Чт 08:00–18:00, Пт 08:00–14:00, Сб и Вс выходной — приём по предварительной записи',
        transit: 'Автобусы 591 и 507 из Шпайера; остановки «Speyerer Straße» и «Boligweg» (Dudenhofen)',
        services: [
            'Подологическое лечение (мозоли, натоптыши, вросшие ногти)',
            'Синдром диабетической стопы — возможно назначение по медицинской страховке',
            'Ортонихические скобы / ортониксия',
            'Визиты на дом по согласованию',
        ],
        costs: [
            'Государственная страховка (GKV) с врачебным назначением (например, при диабетической стопе или сопоставимом диагнозе): государственная касса покрывает стоимость лечения — мы рассчитываемся напрямую с кассой. Не путать «касса оплачивает» с «бесплатно для пациента»: законная доплата (Eigenanteil, см. ниже) остаётся за пациентом.',
            'Законная доплата для пациентов GKV состоит из двух частей, обе установлены законом (это не наценка практики): (a) 10 € рецептурный сбор за каждый бланк назначения — однократно за бланк, независимо от количества процедур; (b) 10 % законная доплата (Zuzahlung) на стоимость каждой процедуры. Обе суммы мы выставляем напрямую пациенту, а не кассе.',
            'При визитах на дом для пациентов GKV 10 % доплата распространяется не только на саму процедуру, но и на фиксированный сбор за выезд и транспортные расходы.',
            'Освобождение от доплат: пациентам, освобождённым своей кассой от доплат на текущий год (Befreiungsausweis), не нужно платить ни 10 € рецептурный сбор, ни 10 % доплату. Пожалуйста, принесите удостоверение об освобождении.',
            'Самоплательщики / частный пациент без назначения: расчёт по услуге. Конкретные цены сообщаем по телефону — не в чате.',
            'Частное страхование (PKV) с назначением: пациент сначала оплачивает счёт сам и затем подаёт его в свою частную страховую компанию (PKV) или Beihilfe. Будет ли возмещена сумма и в каком объёме — зависит от индивидуального тарифа; ответить может только страховая, не практика.',
            'Важно: «Eigenanteil» здесь означает исключительно законную доплату GKV (10 €/рецепт + 10 %/процедура). У частных пациентов и самоплательщиков «Eigenanteil» в этом смысле нет — они оплачивают всю сумму сами и могут получить возмещение от PKV.',
        ],
    },
    ar: {
        hours: 'الإثنين–الخميس 08:00–18:00، الجمعة 08:00–14:00، السبت والأحد مغلق — المواعيد بالحجز المسبق',
        transit: 'الحافلتان 591 و507 من شباير؛ المحطتان «Speyerer Straße» و«Boligweg» (Dudenhofen)',
        services: [
            'علاج الأقدام (الجلد المتيبس، الكالو، الأظافر الغارزة)',
            'متلازمة القدم السكرية — يمكن الحصول على وصفة عبر التأمين الصحي',
            'أقواس تصحيح الأظافر / أوثونيكسيا',
            'الزيارات المنزلية بالاتفاق',
        ],
        costs: [
            'التأمين الصحي القانوني (GKV) مع وصفة طبية (مثل متلازمة القدم السكرية أو تشخيص مشابه): يتحمّل الصندوق القانوني تكاليف العلاج — ونقوم بالتسوية مع الصندوق مباشرة. لا تخلط بين «الصندوق يدفع» و«مجاني للمريض»: تبقى المساهمة القانونية (Eigenanteil، انظر أدناه) على عاتق المريض.',
            'المساهمة القانونية لمرضى GKV تتكوّن من جزأين، كلاهما محدّد بالقانون وليس رسماً من العيادة: (أ) رسم وصفة 10 يورو لكل ورقة وصفة — لمرة واحدة لكل ورقة بصرف النظر عن عدد الجلسات المُدرجة فيها؛ (ب) مساهمة قانونية 10٪ من تكلفة الجلسة. كلاهما يُحسب مباشرة مع المريض وليس مع الصندوق.',
            'في الزيارات المنزلية لمرضى GKV تنطبق نسبة 10٪ ليس فقط على الجلسة، بل أيضاً على الرسم الثابت للزيارة المنزلية وأجرة التنقل.',
            'الإعفاء من المساهمات: المرضى الذين منحهم صندوقهم إعفاءً من المساهمات للسنة الجارية (Befreiungsausweis) لا يدفعون رسم الوصفة 10 يورو ولا المساهمة بنسبة 10٪. يُرجى إحضار شهادة الإعفاء إلى الموعد.',
            'الدفع الذاتي / مريض القطاع الخاص بدون وصفة: نحسب التكلفة بحسب الخدمة. الأسعار المحددة نخبركم بها هاتفياً — وليس عبر الدردشة.',
            'التأمين الخاص (PKV) مع وصفة: يدفع المريض الفاتورة أولاً بنفسه ثم يُقدّمها إلى شركة تأمينه الخاصة (PKV) أو إلى Beihilfe. مقدار التعويض وقابليّته يعتمدان على التعريفة الفردية — فقط شركة التأمين الخاصة تستطيع الإجابة، وليست العيادة.',
            'تنبيه: «Eigenanteil» هنا تعني تحديداً المساهمة القانونية لـ GKV فقط (10 يورو لكل وصفة + 10٪ لكل جلسة). أمّا مرضى التأمين الخاص أو الدفع الذاتي فلا يوجد لديهم «Eigenanteil» بهذا المعنى — يدفعون الفاتورة كاملة بأنفسهم وقد يحصلون على تعويض لاحقاً من تأمينهم الخاص.',
        ],
    },
};
