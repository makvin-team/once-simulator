/**
 * Uzbek (Latin) — primary language.
 * Keys match the shape exported by ru.js and en.js.
 */
export const uz = {
  meta: {
    locale: 'uz',
    label: 'Oʻzbek',
    flag: 'UZ',
  },
  app: {
    name: 'once · AI Mentor',
    tagline:
      'Bank xodimlari uchun keyingi avlod virtual onboarding — AML, kiberxavfsizlik, fraud monitoring va mijozlar bilan ishlash uchun chuqurlashtirilgan stsenariylar.',
    pickLanguage: 'Tilni tanlang',
  },
  nav: {
    back: 'Orqaga',
    exit: 'Chiqish',
    continue: 'Davom etish',
    finish: 'Yakunlash',
    retry: 'Qaytadan',
    start: 'Boshlash',
    next: 'Keyingisi',
  },
  roleSelection: {
    eyebrow: '1-bosqich',
    title: 'Rolingizni tanlang',
    subtitle:
      'Har bir rol — alohida onboarding traektoriyasi. Tanlash keyin ham oʻzgartirilishi mumkin.',
    pickRole: 'Boshlash uchun rolni tanlang',
    modulesCount: '{count} ta modul',
    sessionLength: 'Sessiya',
    proctorReady: 'AI Proctor tayyor',
  },
  pillars: {
    aml: {
      shortLabel: 'AML',
      title: 'AML / Compliance',
      tagline: 'Eng yuqori ustuvorlik',
      summary:
        'Notoʻgʻri pul oqimlarini aniqlash, KYC, sanksiya tekshiruvi, SAR yozish va reglament boʻyicha qarorlar.',
      jobRoles: 'AML Specialist · Compliance Officer · Fraud Analyst',
      focus: 'Shubhali tranzaksiyalar · KYC · Sanksiyalar · Reglament',
    },
    cyber: {
      shortLabel: 'CYBER',
      title: 'Kiberxavfsizlik / InfoSec',
      tagline: 'Brend va maʼlumot himoyasi',
      summary:
        'Phishing tahlili, SOC monitoring, insident javobi, Zero Trust va deepfake himoyasi.',
      jobRoles: 'Security Engineer · SOC Analyst · InfoSec Officer',
      focus: 'Phishing · SOC · Incident Response · Zero Trust',
    },
    fraud: {
      shortLabel: 'FRAUD',
      title: 'Fraud Monitoring',
      tagline: 'Onlayn-banking himoyasi',
      summary:
        'Tranzaksiya patternlarini tahlil qilish, AI fraud detection, behavioral analytics va chargeback.',
      jobRoles: 'Fraud Analyst · Transaction Monitor',
      focus: 'Pattern tahlili · AI detection · Behavioral · Chargeback',
    },
    cx: {
      shortLabel: 'CX',
      title: 'Customer Support',
      tagline: 'Bankning yuzi',
      summary:
        'Kommunikatsiya, mahsulot bilimi, nizolarni hal qilish va CRM ishlatish.',
      jobRoles: 'Client Manager · Support Operator',
      focus: 'Suhbat · Mahsulot · De-eskalatsiya · CRM',
    },
  },
  modules: {
    eyebrow: '2-bosqich',
    title: 'Modulni tanlang',
    subtitle: 'Tavsiya etilgan ketma-ketlik · har bir modul 8-15 daqiqa',
    locked: 'Yopiq',
    available: 'Mavjud',
    completed: 'Bajarildi',
    minutes: '{n} daq',
    start: 'Boshlash',
    chooseAnother: 'Boshqa rolni tanlash',
  },
  amlScenario: {
    title: 'Shubhali tranzaksiya — naqd kirim',
    subtitle: 'AML reglamenti v2.4 §4.2 · CTR/SAR qarori',
    proctorIntro:
      'Stol oldidasiz. Monitorga qarang — yangi ogohlantirish keladi.',
    proctorMicInstruction:
      'Mikrofonni bosing yoki ekrandagi tanlovni bosing.',
    notification: {
      tag: 'Yangi ogohlantirish',
      title: 'Yirik naqd kirim aniqlandi',
      subtitle: 'Hisob 20208…0419 · 187 mln soʻm',
      meta: 'AML reglamenti v2.4 §4.2 · 15 sekund ichida koʻrib chiqish',
      cta: 'Tranzaksiyani ochish',
      dismiss: 'Keyinroq',
    },
    txPanel: {
      tag: 'CRM · TRANZAKSIYA TAFSILOTLARI',
      client: 'Bekzod Karimov',
      clientMeta: 'INN 30312840290052 · Premium · Yangi mijoz (43 kun)',
      indicators: {
        amount: { label: 'Summa', unit: 'mln soʻm', hint: '50M dan ortiq' },
        source: { label: 'Manba hujjati', value: 'Yoʻq', hint: 'AML §4.2' },
        risk: { label: 'Risk skor', unit: 'AML algoritm', hint: 'Yuqori' },
        country: { label: 'Geo', hint: 'High-risk roʻyxat' },
      },
      timeline: [
        { time: '09:14', text: 'Mijoz kassaga yaqinlashdi' },
        { time: '09:14', text: '187 mln soʻm naqd, manba hujjati yoʻq' },
        { time: '09:15', text: 'Mijoz: "tezroq, samolyotga ulgurish kerak"' },
        { time: '09:15', text: 'AML algoritm risk skor 74 ni belgiladi' },
      ],
      yourTask: 'Sizning qaroringiz',
      taskHint: 'Bitta toʻgʻri javobni tanlang — qaror saqlanadi va baholanadi.',
      timelineLabel: 'Voqealar tartibi',
    },
    actions: {
      fileSar: 'SAR yozish',
      fileSarHint: 'Operatsiya bloklanadi · Compliance 24 soat ichida koʻradi',
      release: 'Rad etmasdan oʻtkazish',
      releaseHint: 'Mijoz mamnun · audit eshigi ochilgan',
      escalate: 'Compliance ga eskalatsiya',
      escalateHint: 'Menejer + Compliance birgalikda qaror',
    },
    proctorFeedback: {
      correct:
        'Aʼlo. 3 ta red-flag aniq: hujjatsiz, tezkorlik bosimi, yangi mijoz. SAR — yagona toʻgʻri yoʻl.',
      escalateOk:
        'Eskalatsiya xavfsiz qaror. Lekin xodim 3 ta red-flag asosida oʻzi SAR yozishi kerak edi.',
      releaseFail:
        'XATAR. Hujjatsiz 187 mln naqd qabul qilish — AML v2.4 §4.2 ning toʻgʻridan-toʻgʻri buzilishi. Audit shaxsiy javobgarlik yuklaydi.',
      tipOffFail:
        'JINOIY HARAKAT. Mijozga "shubhalisiz" deyish — tipping-off (AML §7.1). Hech qachon mijozga SAR jarayonini bildirmang.',
    },
    screen: {
      dashboard: {
        title: 'Mijoz CRM · Toshkent-1',
        client: 'Bekzod Karimov · INN 30312840290052',
        cards: {
          account: 'Faol hisob',
          risk: 'Risk skor',
          limit: 'Limit',
        },
      },
      analysis: {
        title: 'Aniqlangan red-flag belgilari',
        items: [
          'Hisob 20208…0419 · 187 mln soʻm',
          'Manba hujjati yoʻq',
          'Risk skor 74 (yuqori)',
          'Mijoz: yangi · 43 kun',
        ],
      },
      endCorrect: {
        title: 'SAR yuborildi',
        subtitle: 'AML v2.4 §4.2 · Compliance 24 soat ichida koʻradi',
      },
      endEscalate: {
        title: 'Compliance ga eskalatsiya qilindi',
        subtitle: 'Birgalikdagi koʻrib chiqish jarayonda',
      },
      endRelease: {
        code: 'AML v2.4 §4.2',
        title: 'Majburiy CTR chegarasi',
        body:
          '50 mln soʻmdan ortiq har qanday naqd kirim Currency Transaction Report va manba hujjatini talab qiladi. Hujjatsiz qabul qilish — bevosita buzilish va shaxsiy javobgarlik.',
      },
    },
    debrief: {
      title: 'Mashgʻulot natijasi',
      score: 'Baho',
      tipsTitle: 'Asosiy xulosalar',
      tips: [
        '50 mln+ naqd — CTR majburiy (AML v2.4 §4.2).',
        '3+ red-flag — SAR ehtimoli yuqori, eskalatsiya kerak.',
        'Tipping-off — jinoyat. Mijozga "siz shubhalisiz" deyilmaydi (§7.1).',
        'Shubhali operatsiya — avval toʻxtatiladi, keyin tekshiriladi.',
        'Tezkorlik bosimi — klassik red-flag belgisi.',
      ],
    },
  },
  hud: {
    listening: 'Tinglamoqda...',
    thinking: 'Tahlil qilmoqda...',
    speaking: 'Soʻzlamoqda',
    ready: 'Tayyor',
    micHint: 'Bosing yoki bevosita tanlovni bosing',
    aiProctor: 'AI Proctor',
    client: 'Mijoz',
  },
};
