export const t = {
  appName: 'once · AI Mentor',
  tagline:
    'Bank xodimlari uchun AI asosidagi onboarding va simulyator — real ish vaziyatlari, ichki qoidalar va xavfsizlik protokollari',
  start: 'Boshlash',
  back: 'Orqaga',
  exit: 'Chiqish',
  retry: 'Qaytadan',
  continue: 'Davom etish',
  finish: 'Yakunlash',
  listening: 'Tinglamoqdaman...',
  micHint: 'Mikrofonni bosing yoki javobni tanlang',
  dashboardTitle: 'Mashgʻulot rejimini tanlang',
  dashboardSubtitle:
    'Rolingizga mos stsenariy tanlang. Har bir mashgʻulot ichki qoidalarga (KYC, AML, IB, SEC) tayangan holda real harakatlarni mashq qildiradi.',
  loadingScene: '3D xona yuklanmoqda...',
  reportTitle: 'Natijalar hisoboti',
  scoreLabel: 'Bahoyingiz',
  tipsLabel: 'Asosiy xulosalar va qoidalar',
  excellent: 'Aʻlo natija',
  good: 'Yaxshi natija',
  needsWork: 'Mashq qilish kerak',
  newSession: 'Yangi sessiya',
  sections: {
    role: 'Rolingiz',
    knowledge: 'AI Knowledge Assistant',
    knowledgeHint: 'Ichki qoidalar va qoʻllanmalarga oid savol bering',
    fraudSim: 'Fraud Simulator',
    fraudHint: '6 turdagi tahdid · har biri alohida mashgʻulot',
    mock: 'Mock Playground',
    mockHint: 'Mijoz suhbati va texnik mashqlar',
    askExample: 'Misol savollar',
    yourPath: 'Sizning yoʻlingiz',
    onboardingDays: 'kun onboarding',
  },
  scenarios: {
    clientService: {
      title: 'Mijozga xizmat koʻrsatish',
      subtitle: 'Norozi mijoz · KYC-204',
      summary:
        'Norozi mijoz manzil tasdiqnomasi soʻraydi. Hamdardlik, KYC hujjatlari, CRM yozuvi.',
      tag: 'Mock Playground',
      category: 'mock',
    },
    antiFraudPhish: {
      title: 'Phishing email',
      subtitle: 'IB-301 · domen tahlili',
      summary:
        'Shubhali xat tahlili: domen, urgency, parol soʻrash. Sec Ops ga toʻgʻri eskalatsiya.',
      tag: 'Anti-Fraud',
      category: 'fraud',
    },
    deepfakeCall: {
      title: 'Deepfake qoʻngʻiroq',
      subtitle: 'IB-405 · ovozli soʻrov',
      summary:
        'Boshliq nomidan kelgan deepfake qoʻngʻiroq parol soʻraydi. Verified callback protokoli.',
      tag: 'Anti-Fraud',
      category: 'fraud',
    },
    amlRedFlags: {
      title: 'AML red-flag',
      subtitle: 'Shubhali naqd toʻlov',
      summary:
        '187 mln naqd, manba yoʻq, bosim ostida. CTR, SAR va tipping-off taqiqi.',
      tag: 'Anti-Fraud',
      category: 'fraud',
    },
    fakeDocument: {
      title: 'Qalbaki hujjat',
      subtitle: 'KYC §3.4 · pasport',
      summary:
        '5 bosqichli pasport tekshiruvi: MRZ kod, ABS bazasi, qoʻshimcha tekshiruv protokoli.',
      tag: 'Anti-Fraud',
      category: 'fraud',
    },
    socialEngineering: {
      title: 'Ijtimoiy muhandislik',
      subtitle: 'SEC-110 · tashrif boshqaruvi',
      summary:
        '"IT texnik" deb tanishtirgan notanish shaxs server zaliga kirmoqchi. VMT tekshiruvi.',
      tag: 'Anti-Fraud',
      category: 'fraud',
    },
    productivity: {
      title: 'Mahsuldorlik AI bilan',
      subtitle: 'Power Query + AI prompt',
      summary:
        '6 ta filial kunlik hisobotini 45 daqiqadan 3 daqiqaga tushirish (OP-PQ-01).',
      tag: 'Mock Playground',
      category: 'mock',
    },
  },
  hotspots: {
    client: 'Mijoz',
    computer: 'Kompyuter',
    folder: 'Hujjatlar',
    clickHint: 'Bosing',
  },
};
