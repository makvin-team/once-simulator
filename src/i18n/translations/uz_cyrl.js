/**
 * Uzbek (Cyrillic) — Ўзбек тили (кирилл алифбоси).
 *
 * Mirrors the shape of uz.js (Latin) exactly. Transliterated by hand;
 * technical acronyms (AML, SAR, KYC, CTR, CRM, SOC, NIST, PEP, OFAC,
 * Compliance, etc.) are left in Latin since that is how they appear in
 * Uzbek banking documents regardless of script.
 */
export const uz_cyrl = {
  meta: {
    locale: 'uz_cyrl',
    label: 'Ўзбек (кирилл)',
    flag: 'УЗ',
  },
  app: {
    name: 'once · AI Mentor',
    tagline:
      'Банк ходимлари учун кейинги авлод виртуал онбординг — AML, киберхавфсизлик, fraud monitoring ва мижозлар билан ишлаш учун чуқурлаштирилган стсенарийлар.',
    pickLanguage: 'Тилни танланг',
  },
  nav: {
    back: 'Орқага',
    exit: 'Чиқиш',
    continue: 'Давом этиш',
    finish: 'Якунлаш',
    retry: 'Қайтадан',
    start: 'Бошлаш',
    next: 'Кейингиси',
  },
  roleSelection: {
    eyebrow: '1-босқич',
    title: 'Ролингизни танланг',
    subtitle:
      'Ҳар бир рол — алоҳида онбординг траэкторияси. Танлаш кейин ҳам ўзгартирилиши мумкин.',
    pickRole: 'Бошлаш учун ролни танланг',
    modulesCount: '{count} та модул',
    sessionLength: 'Сессия',
    proctorReady: 'AI Proctor тайёр',
  },
  pillars: {
    aml: {
      shortLabel: 'AML',
      title: 'AML / Compliance',
      tagline: 'Энг юқори устуворлик',
      summary:
        'Нотўғри пул оқимларини аниқлаш, KYC, санксия текшируви, SAR ёзиш ва регламент бўйича қарорлар.',
      jobRoles: 'AML Specialist · Compliance Officer · Fraud Analyst',
      focus: 'Шубҳали транзаксиялар · KYC · Санксиялар · Регламент',
    },
    cyber: {
      shortLabel: 'CYBER',
      title: 'Киберхавфсизлик / InfoSec',
      tagline: 'Бренд ва маълумот ҳимояси',
      summary:
        'Phishing таҳлили, SOC monitoring, инцидент жавоби, Zero Trust ва deepfake ҳимояси.',
      jobRoles: 'Security Engineer · SOC Analyst · InfoSec Officer',
      focus: 'Phishing · SOC · Incident Response · Zero Trust',
    },
    fraud: {
      shortLabel: 'FRAUD',
      title: 'Fraud Monitoring',
      tagline: 'Онлайн-банкинг ҳимояси',
      summary:
        'Транзаксия паттернларини таҳлил қилиш, AI fraud detection, behavioral analytics ва chargeback.',
      jobRoles: 'Fraud Analyst · Transaction Monitor',
      focus: 'Pattern таҳлили · AI detection · Behavioral · Chargeback',
    },
    cx: {
      shortLabel: 'CX',
      title: 'Customer Support',
      tagline: 'Банкнинг юзи',
      summary:
        'Коммуникация, маҳсулот билими, низоларни ҳал қилиш ва CRM ишлатиш.',
      jobRoles: 'Client Manager · Support Operator',
      focus: 'Суҳбат · Маҳсулот · Де-эскалация · CRM',
    },
  },
  modules: {
    eyebrow: '2-босқич',
    title: 'Модулни танланг',
    subtitle: 'Тавсия этилган кетма-кетлик · ҳар бир модул 8-15 дақиқа',
    locked: 'Ёпиқ',
    available: 'Мавжуд',
    completed: 'Бажарилди',
    minutes: '{n} дақ',
    start: 'Бошлаш',
    chooseAnother: 'Бошқа ролни танлаш',
  },
  amlScenario: {
    title: 'Шубҳали транзаксия — нақд кирим',
    subtitle: 'AML регламенти v2.4 §4.2 · CTR/SAR қарори',
    proctorIntro:
      'Стол олдидасиз. Мониторга қаранг — янги огоҳлантириш келади.',
    proctorMicInstruction:
      'Микрофонни босинг ёки экрандаги танловни босинг.',
    notification: {
      tag: 'Янги огоҳлантириш',
      title: 'Йирик нақд кирим аниқланди',
      subtitle: 'Ҳисоб 20208…0419 · 187 млн сўм',
      meta: 'AML регламенти v2.4 §4.2 · 15 секунд ичида кўриб чиқиш',
      cta: 'Транзаксияни очиш',
      dismiss: 'Кейинроқ',
    },
    txPanel: {
      tag: 'CRM · ТРАНЗАКСИЯ ТАФСИЛОТЛАРИ',
      client: 'Бекзод Каримов',
      clientMeta: 'ИНН 30312840290052 · Premium · Янги мижоз (43 кун)',
      indicators: {
        amount: { label: 'Сумма', unit: 'млн сўм', hint: '50M дан ортиқ' },
        source: { label: 'Манба ҳужжати', value: 'Йўқ', hint: 'AML §4.2' },
        risk: { label: 'Риск скор', unit: 'AML алгоритм', hint: 'Юқори' },
        country: { label: 'Гео', hint: 'High-risk рўйхат' },
      },
      timeline: [
        { time: '09:14', text: 'Мижоз кассага яқинлашди' },
        { time: '09:14', text: '187 млн сўм нақд, манба ҳужжати йўқ' },
        { time: '09:15', text: 'Мижоз: "тезроқ, самолётга улгуриш керак"' },
        { time: '09:15', text: 'AML алгоритм риск скор 74 ни белгилади' },
      ],
      yourTask: 'Сизнинг қарорингиз',
      taskHint: 'Битта тўғри жавобни танланг — қарор сақланади ва баҳоланади.',
    },
    actions: {
      fileSar: 'SAR ёзиш',
      fileSarHint: 'Операция блокланади · Compliance 24 соат ичида кўради',
      release: 'Рад этмасдан ўтказиш',
      releaseHint: 'Мижоз мамнун · audit эшиги очилган',
      escalate: 'Compliance га эскалация',
      escalateHint: 'Менежер + Compliance биргаликда қарор',
    },
    proctorFeedback: {
      correct:
        'Аъло. 3 та red-flag аниқ: ҳужжатсиз, тезкорлик босими, янги мижоз. SAR — ягона тўғри йўл.',
      escalateOk:
        'Эскалация хавфсиз қарор. Лекин ходим 3 та red-flag асосида ўзи SAR ёзиши керак эди.',
      releaseFail:
        'ХАТАР. Ҳужжатсиз 187 млн нақд қабул қилиш — AML v2.4 §4.2 нинг тўғридан-тўғри бузилиши. Аудит шахсий жавобгарлик юклайди.',
      tipOffFail:
        'ЖИНОИЙ ҲАРАКАТ. Мижозга "шубҳалисиз" дейиш — tipping-off (AML §7.1). Ҳеч қачон мижозга SAR жараёнини билдирманг.',
    },
    debrief: {
      title: 'Машғулот натижаси',
      score: 'Баҳо',
      tipsTitle: 'Асосий хулосалар',
      tips: [
        '50 млн+ нақд — CTR мажбурий (AML v2.4 §4.2).',
        '3+ red-flag — SAR эҳтимоли юқори, эскалация керак.',
        'Tipping-off — жиноят. Мижозга "сиз шубҳалисиз" дейилмайди (§7.1).',
        'Шубҳали операция — аввал тўхтатилади, кейин текширилади.',
        'Тезкорлик босими — классик red-flag белгиси.',
      ],
    },
  },
  hud: {
    listening: 'Тингламоқда...',
    thinking: 'Таҳлил қилмоқда...',
    speaking: 'Сўзламоқда',
    ready: 'Тайёр',
    micHint: 'Босинг ёки бевосита танловни босинг',
    aiProctor: 'AI Proctor',
    client: 'Мижоз',
  },
};
