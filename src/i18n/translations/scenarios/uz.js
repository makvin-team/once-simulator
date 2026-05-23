/**
 * Uzbek (Latin) translations for the 16 m2-m5 scenarios. Each entry is
 * keyed by scenario id and the shape is what makeScenario expects:
 *   { title, subtitle, proctorIntro, proctorMicInstruction,
 *     notification, txPanel, actions, proctorFeedback, screen, debrief }
 *
 * Per-locale strings only — no business logic, no JSX.
 */

const amlBeneficialOwner = {
  title: 'KYC chuqurlashtirilgan — UBO',
  subtitle: 'AML §5.1 · Beneficial owner aniqlash',
  proctorIntro: '"Konsalting MChJ" hisob ochmoqchi. UBO maʼlumotini bermayapti.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'KYC eskalatsiyasi',
    title: 'UBO hujjati taqdim etilmadi',
    subtitle: 'Korp. hisob · Tashqi yurisdiksiya',
    meta: 'AML §5.1 · 10 daqiqada qaror',
    cta: 'Hujjatni ochish',
  },
  txPanel: {
    tag: 'CRM · YUR. SHAXS ROʻYXATI',
    client: 'Konsalting Plus MChJ',
    clientMeta: 'INN 30412840100501 · Vakil: A. Nazarov · 2 hafta avval ochilgan',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '10:02', text: 'Vakil hisob ochish soʻradi · "korporativ"' },
      { time: '10:05', text: 'UBO maʼlumotini soʻradik · vakil "bu maxfiy" dedi' },
      { time: '10:10', text: 'BVI yurisdiksiyasi · uchta vositachi qatlam' },
      { time: '10:12', text: 'Boshlangʻich kapital 5 mln USD' },
    ],
    indicators: {
      entity: { label: 'Tashkilot turi', value: 'LLC · BVI', hint: 'Tashqi yurisdiksiya' },
      ubo: { label: 'UBO', value: 'Yashirin', hint: 'AML §5.1 buzilishi' },
      jurisdiction: { label: 'Yurisdiksiya', value: 'BVI', hint: 'High-risk roʻyxat' },
      capital: { label: 'Boshl. kapital', value: '5M USD', hint: 'Yuqori miqdor' },
    },
  },
  actions: {
    demandUbo: 'UBO hujjatini talab qilish',
    demandUboHint: 'Onboarding toʻxtatiladi · barcha qatlamlar koʻrsatilsin',
    escalate: 'Compliance ga eskalatsiya',
    escalateHint: 'Birgalikdagi qaror · 4 soat',
    openAnyway: 'Berilgan hujjatlar bilan ochish',
    openAnywayHint: 'XATAR · AML §5.1 buzilishi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. UBO talab qilish — AML §5.1 ning yagona toʻgʻri yoʻli.',
    partial: 'Eskalatsiya xavfsiz qaror, lekin xodim oʻzi UBO talab qilishi kerak edi.',
    fail: 'XATAR. UBOsiz korporativ hisob ochish — bevosita §5.1 buzilishi.',
  },
  screen: {
    dashboard: {
      title: 'KYC · Yuridik shaxslar',
      client: 'Bugun 3 ta korp. soʻrov · 1 eskalatsiya',
      cards: {
        a: 'Tashkilot', aValue: 'LLC',
        b: 'UBO', bValue: 'Yashirin',
        c: 'Kapital', cValue: '5M $',
      },
    },
    analysis: {
      title: 'KYC red-flag belgilari',
      items: [
        'BVI yurisdiksiyasi · tashqi',
        'UBO hujjati yoʻq',
        'Uchta vositachi qatlam',
        'Boshlangʻich kapital 5M USD',
      ],
    },
    endCorrect: { title: 'UBO talab yuborildi', subtitle: 'Onboarding pauza · barcha qatlamlar talab qilindi' },
    endPartial: { title: 'Compliance ga eskalatsiya', subtitle: 'Birgalikdagi koʻrib chiqish 4 soat' },
    endFail: {
      code: 'AML §5.1',
      title: 'UBO majburiy',
      body: 'Har qanday korporativ hisob ochishda ultimate beneficial owner aniqlanishi shart. Onboarding UBO ochilmaguncha davom etmaydi.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'UBO — har bir korporativ hisob uchun majburiy.',
      'Tashqi yurisdiksiya + uchta qatlam — yuqori risk.',
      'Vakil "maxfiy" deyolmaydi — qonun talabi.',
      'Onboarding UBO yoʻq holatda pauza qilinadi.',
      'AML §5.1 — shaxsiy javobgarlik moddasi.',
    ],
  },
};

const amlSanctions = {
  title: 'Sanksiya tekshiruvi — OFAC',
  subtitle: 'AML §6.2 · Sanksiya roʻyxati mosligi',
  proctorIntro: 'Tranzaksiya skanerlash 88% moslik aniqladi. OFAC roʻyxati.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Sanksiya mosligi',
    title: '88% OFAC moslik',
    subtitle: 'Beneficiar: A. Karimov · $240K wire',
    meta: 'AML §6.2 · darhol qaror',
    cta: 'Mosllikni koʻrish',
  },
  txPanel: {
    tag: 'CRM · SANKSIYA TAHLILI',
    client: 'Akmal Karimov',
    clientMeta: 'INN 30312840190303 · Wire $240K · Beneficiar: KZ',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '13:10', text: 'Wire soʻrovi · $240K' },
      { time: '13:10', text: 'Sanksiya skaneri ishga tushdi' },
      { time: '13:11', text: 'OFAC SDN roʻyxati · 88% fuzzy moslik' },
      { time: '13:12', text: 'Beneficiar Almatida · qoʻshimcha bayroq' },
    ],
    indicators: {
      matchScore: { label: 'Moslik', unit: '%', hint: '> 80% = critical' },
      list: { label: 'Roʻyxat', value: 'OFAC SDN', hint: 'Toʻliq blokirovka' },
      amount: { label: 'Summa', value: '$240K', hint: 'Wire transfer' },
      corridor: { label: 'Koridor', value: 'UZ→KZ', hint: 'High-risk' },
    },
  },
  actions: {
    blockReport: 'Bloklash + OFAC hisobot',
    blockReportHint: 'Tranzaksiya toʻxtatiladi · 24 soat ichida hisobot',
    escalate: 'Compliance ga eskalatsiya',
    escalateHint: 'Birgalikdagi tekshiruv · 1 soat',
    release: 'Oʻtkazib yuborish',
    releaseHint: 'XATAR · OFAC buzilishi · jinoiy javobgarlik',
  },
  proctorFeedback: {
    correct: 'Aʼlo. 88% OFAC moslik — darhol block va hisobot. Bu qonun talabi.',
    partial: 'Eskalatsiya yaxshi, lekin sanksiya holatida darhol block birinchi qadam.',
    fail: 'JINOIY. OFAC sanksiya buzilishi — bankka $millionlab jarima va shaxsiy javobgarlik.',
  },
  screen: {
    dashboard: {
      title: 'Sanksiya monitor',
      client: 'Bugun 4 ta moslik tekshiruvi',
      cards: {
        a: 'Moslik', aValue: '88%',
        b: 'Roʻyxat', bValue: 'OFAC',
        c: 'Summa', cValue: '$240K',
      },
    },
    analysis: {
      title: 'OFAC moslik tahlili',
      items: [
        'OFAC SDN roʻyxati · 88% fuzzy moslik',
        'Beneficiar Qozogʻistonda',
        'Wire summa $240K',
        'UZ→KZ koridori · high-risk',
      ],
    },
    endCorrect: { title: 'Sanksiya bloklandi', subtitle: 'OFAC hisoboti 24 soat ichida yuboriladi' },
    endPartial: { title: 'Compliance ga eskalatsiya', subtitle: 'Birgalikdagi qaror 1 soat ichida' },
    endFail: {
      code: 'AML §6.2',
      title: 'OFAC buzilishi',
      body: 'Sanksiya roʻyxatidagi shaxslarga oʻtkazma — OFAC buzilishi. Bankka millionlab dollar jarima va xodimga jinoiy javobgarlik yuklanadi.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      '> 80% sanksiya moslik — darhol block.',
      'OFAC, UN, EU roʻyxatlari ham tekshiriladi.',
      'Block birinchi qadam, eskalatsiya keyin.',
      'OFAC buzilishi — jinoiy javobgarlik.',
      'Fuzzy moslik ham bayroq · qoʻshimcha tekshirish kerak.',
    ],
  },
};

const amlPep = {
  title: 'PEP risk — siyosiy shaxslar',
  subtitle: 'AML §7.3 · Enhanced Due Diligence',
  proctorIntro: 'Hudud deputati 420 mln biznes daromadini joylashtirmoqchi.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'PEP belgisi',
    title: 'Deputat hisobiga katta kirim',
    subtitle: 'B. Salimov · 420 mln · biznes daromadi',
    meta: 'AML §7.3 · EDD talab qilinadi',
    cta: 'PEP profilini koʻrish',
  },
  txPanel: {
    tag: 'CRM · PEP PROFIL',
    client: 'Bahodir Salimov',
    clientMeta: 'INN 30112840100210 · Hudud deputati · 8 yil mijoz',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '15:00', text: '420 mln soʻm kirim · "biznes daromadi"' },
      { time: '15:01', text: 'PEP belgisi profilda · hudud deputati' },
      { time: '15:02', text: 'Manba: "qurilish kompaniyam"' },
      { time: '15:03', text: 'Hujjat: ish boʻyicha kontrakt 2 oy avval' },
    ],
    indicators: {
      pepRole: { label: 'Lavozim', value: 'Deputat', hint: 'High-risk PEP' },
      amount: { label: 'Summa', unit: 'mln', hint: '> 100 mln EDD' },
      sourceFunds: { label: 'Manba', value: 'Qurilish', hint: 'Tekshirish kerak' },
      jurisdiction: { label: 'Yurisdiksiya', value: 'UZ', hint: 'Mahalliy' },
    },
  },
  actions: {
    eddApprove: 'EDD + senior approval',
    eddApproveHint: 'Manba hujjati · senior tasdiq · 24 soat',
    standardKyc: 'Standart KYC ishlatish',
    standardKycHint: 'PEP uchun yetarli emas · audit riski',
    accept: 'Qabul qilish',
    acceptHint: 'XATAR · §7.3 buzilishi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. PEP + katta summa = EDD majburiy. Senior tasdiq — qoidaga muvofiq.',
    partial: 'Standart KYC PEP uchun yetarli emas. EDD majburiy.',
    fail: 'XATAR. PEP risk eʼtibordan chetda qoldi — §7.3 buzilishi va audit muammosi.',
  },
  screen: {
    dashboard: {
      title: 'PEP monitor',
      client: 'Bugun 2 ta PEP operatsiya',
      cards: {
        a: 'PEP', aValue: 'Deputat',
        b: 'Summa', bValue: '420M',
        c: 'EDD', cValue: 'Talab',
      },
    },
    analysis: {
      title: 'PEP risk belgilari',
      items: [
        'Hudud deputati (high-risk PEP)',
        'Katta naqd kirim · 420 mln',
        'Manba: biznes daromadi (tekshirish kerak)',
        'AML §7.3 EDD majburiy',
      ],
    },
    endCorrect: { title: 'EDD boshlandi', subtitle: 'Manba hujjati + senior tasdiq 24 soat' },
    endPartial: { title: 'Standart KYC qoʻllanildi', subtitle: 'PEP holatida yetarli emas · audit riski' },
    endFail: {
      code: 'AML §7.3',
      title: 'PEP EDD talab qilinadi',
      body: 'Siyosiy shaxslar uchun standart KYC yetarli emas. Enhanced Due Diligence va senior approval — qoidaga muvofiq.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'PEP = Enhanced Due Diligence majburiy.',
      'Hudud deputati ham high-risk PEP.',
      'Manba hujjati har doim tekshiriladi.',
      'Senior approval — protokolning bir qismi.',
      'PEP risk — shaxsiy javobgarlik moddasi.',
    ],
  },
};

const amlSarWriting = {
  title: 'SAR yozish — amaliyot',
  subtitle: 'AML §8.1 · 5W narrativ formati',
  proctorIntro: 'Shubhali pattern aniqlandi. SAR yozish vaqti — qaysi formatni tanlaysiz?',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'SAR drafti',
    title: 'SAR yozish formati',
    subtitle: 'Pattern aniq · uchta variantdan tanlang',
    meta: 'AML §8.1 · 15 daqiqada draft',
    cta: 'Formatlarni koʻrish',
  },
  txPanel: {
    tag: 'CRM · SAR DRAFT',
    client: 'Pattern: 3 ta yangi mijoz + 50M+ naqd',
    clientMeta: 'Tahlil tugadi · narrativ format tanlash',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri formatni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '11:00', text: 'Pattern tahlili tugadi' },
      { time: '11:15', text: '3 ta hisob + 4 ta tranzaksiya' },
      { time: '11:20', text: 'SAR yozish vaqti · format tanlash' },
      { time: '11:30', text: 'Compliance 24 soat ichida koʻradi' },
    ],
    indicators: {
      pattern: { label: 'Pattern', value: 'Aniq', hint: 'Hujjatli' },
      evidence: { label: 'Dalillar', value: '4 ta', hint: 'Tranzaksiya' },
      timeline: { label: 'Vaqt', value: '3 hafta', hint: 'Davomli' },
      tone: { label: 'Stil', value: 'Tanlash', hint: 'Faktik' },
    },
  },
  actions: {
    factualFiveW: '5W faktik narrativ',
    factualFiveWHint: 'Kim · Nima · Qachon · Qaerda · Qancha · faqat fakt',
    partialNarrative: 'Qisman narrativ (kontekst yoʻq)',
    partialNarrativeHint: 'Audit savol berishi mumkin',
    accusatory: 'Hissiy / ayblovchi stil',
    accusatoryHint: 'XATAR · SAR rad etiladi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. 5W formati — Compliance bir oʻqishda tushunadi. Faktik, neytral.',
    partial: 'Qisman narrativ ishlaydi, lekin kontekst yoʻqligi qoʻshimcha savol tugʻdiradi.',
    fail: 'XATAR. Hissiy stil SAR ni invalid qiladi. Compliance qaytaradi.',
  },
  screen: {
    dashboard: {
      title: 'SAR draft tizimi',
      client: 'Bugun 1 ta SAR draft',
      cards: {
        a: 'Pattern', aValue: 'Aniq',
        b: 'Dalillar', bValue: '4',
        c: 'Stil', cValue: '5W',
      },
    },
    analysis: {
      title: 'SAR format qoidalari',
      items: [
        '5W — Kim, Nima, Qachon, Qaerda, Qancha',
        'Faqat fakt · hissiyot yoʻq',
        'Audit isboti har bandda',
        'Neytral, professional ohang',
      ],
    },
    endCorrect: { title: 'SAR yuborildi', subtitle: '5W faktik · Compliance 24 soat ichida koʻradi' },
    endPartial: { title: 'SAR yuborildi (qisman)', subtitle: 'Qoʻshimcha kontekst soʻralishi mumkin' },
    endFail: {
      code: 'AML §8.1',
      title: 'SAR format buzilishi',
      body: 'Hissiy yoki ayblovchi stil SAR ni invalid qiladi. Faqat fakt, 5W formatida yoziladi.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      '5W formati — har SAR uchun standart.',
      'Faqat fakt · hissiyot va ayblov yoʻq.',
      'Har bir gap audit isboti bilan tasdiqlanadi.',
      'Neytral, professional ohang.',
      'Kontekst hech qachon "tushunarli" deb tashlanmaydi.',
    ],
  },
};

const cyberSocTriage = {
  title: 'SOC alert triage — lateral movement',
  subtitle: 'IB-402 · IDS yuqori prioritet',
  proctorIntro: 'Finance bo‘limidan lateral movement. IDS yuqori prioritet.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'IDS critical',
    title: 'Lateral movement aniqlandi',
    subtitle: 'FIN-WS-12 · admin-shareʼga urinish',
    meta: 'IB-402 · darhol javob',
    cta: 'Alertni ochish',
  },
  txPanel: {
    tag: 'SOC · ALERT TAHLILI',
    client: 'FIN-WS-12 · Finance bo‘limi',
    clientMeta: 'Win11 · domen ulanishida · oxirgi login 09:14',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '09:14', text: 'Foydalanuvchi login · normal' },
      { time: '09:32', text: 'admin$ shareʼga urinish' },
      { time: '09:33', text: 'IDS critical alert · lateral movement' },
      { time: '09:34', text: 'Boshqa hostda SMB skan' },
    ],
    indicators: {
      severity: { label: 'Prioritet', value: 'Critical', hint: 'IDS tasdiq' },
      host: { label: 'Host', value: 'FIN-WS-12', hint: 'Finance' },
      movement: { label: 'Pattern', value: 'admin$ + SMB', hint: 'Klassik' },
      asset: { label: 'Asset', value: 'Finance ish stansiyasi', hint: 'Yuqori risk' },
    },
  },
  actions: {
    isolate: 'Host izolatsiya + IR page',
    isolateHint: 'Tarmoqdan uziladi · IR jamoa 5 daqiqada',
    monitor: 'Faqat kuzatish',
    monitorHint: 'Tarqalish riski mavjud',
    closeFp: 'False positive deb yopish',
    closeFpHint: 'XATAR · ransomware tarqalishi mumkin',
  },
  proctorFeedback: {
    correct: 'Aʼlo. admin$ + SMB skan — klassik tarqalish. Izolatsiya + IR — birinchi qadam.',
    partial: 'Kuzatish kechikadi · har daqiqa qoʻshimcha host yuqishi mumkin.',
    fail: 'XATAR. Ransomware lateral movement deb noaniq belgilanadi. Tarqalish riski yuqori.',
  },
  screen: {
    dashboard: {
      title: 'SOC monitor',
      client: 'Bugun 12 ta alert · 1 critical',
      cards: {
        a: 'Prioritet', aValue: 'Critical',
        b: 'Hostlar', bValue: '2',
        c: 'IR', cValue: 'Tayyor',
      },
    },
    analysis: {
      title: 'Lateral movement belgilari',
      items: [
        'admin$ share urinish',
        'SMB skan boshqa hostda',
        'Foydalanuvchi tushunmadi',
        'IDS critical alert',
      ],
    },
    endCorrect: { title: 'Host izolatsiya qilindi', subtitle: 'IR jamoa 5 daqiqada · tarqalish toʻxtatildi' },
    endPartial: { title: 'Kuzatish rejimida', subtitle: 'Tarqalish riski davom etmoqda' },
    endFail: {
      code: 'IB-402',
      title: 'Lateral movement eʼtibordan chetda',
      body: 'Klassik lateral movement — ransomware boshlanishi. Izolatsiya kechiktirilsa, butun tarmoq xavf ostida.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'admin$ + SMB skan = lateral movement.',
      'Critical alertda izolatsiya birinchi qadam.',
      'IR page kechiktirilmaydi.',
      'False positive shubhasiz emas — tekshiruv kerak.',
      'Lateral movement — ransomware kirib kelishi.',
    ],
  },
};

const cyberIncidentResponse = {
  title: 'Incident response — ransomware',
  subtitle: 'NIST 800-61 · Containment + Eradication',
  proctorIntro: 'Ransomware Finance bo‘limida fayllarni shifrlayapti. Vaqt yoʻq.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'INCIDENT critical',
    title: 'Ransomware aniqlandi',
    subtitle: 'Finance · 8 host · .lockbit',
    meta: 'NIST 800-61 · darhol javob',
    cta: 'Incidentni ochish',
  },
  txPanel: {
    tag: 'IR · INCIDENT TAHLILI',
    client: 'Finance bo‘limi · 8 host',
    clientMeta: 'Lockbit variant · 14 daqiqa avval boshlangan',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '14:32', text: 'Birinchi host shifrlandi' },
      { time: '14:38', text: '5 host yuqdi' },
      { time: '14:44', text: 'Backup tarmog‘i hali toza' },
      { time: '14:46', text: 'Ransom xabari paydo boʻldi · 50 BTC' },
    ],
    indicators: {
      spread: { label: 'Tarqalish', value: '8 host', hint: '14 daqiqada' },
      department: { label: 'Boʻlim', value: 'Finance', hint: 'Kritik' },
      backups: { label: 'Backup', value: 'Toza', hint: 'Hali' },
      ransom: { label: 'Ransom', value: '50 BTC', hint: '~$1.5M' },
    },
  },
  actions: {
    containEradicate: 'Containment + Eradication + Forensics',
    containEradicateHint: 'NIST 800-61 protokoli · backuplarni saqlash',
    restoreBackup: 'Tezda backupdan tiklash',
    restoreBackupHint: 'Forensik yoʻqoladi · tarqalish davom etishi mumkin',
    payRansom: 'Ransom toʻlash',
    payRansomHint: 'JINOIY · jurnal va keyingi hujum riski',
  },
  proctorFeedback: {
    correct: 'Aʼlo. NIST 800-61 — Containment birinchi, keyin Eradication, oxirida tiklash. Forensik tahlil ham saqlanadi.',
    partial: 'Tez tiklash forensikani yoʻq qiladi. Sabab aniqlanmasa hujum qaytadi.',
    fail: 'JINOIY. Ransom toʻlash bankni jinoiy javobgarlikka oladi va keyingi hujumlarni rag‘batlantiradi.',
  },
  screen: {
    dashboard: {
      title: 'IR Command Center',
      client: 'Aktiv incident · Finance',
      cards: {
        a: 'Hostlar', aValue: '8',
        b: 'Vaqt', bValue: '14 daq',
        c: 'Backup', cValue: 'Toza',
      },
    },
    analysis: {
      title: 'Incident belgilari',
      items: [
        'Lockbit ransomware varianti',
        '8 host shifrlandi · 14 daqiqada',
        'Backup tarmog‘i hali toza',
        'Ransom xabari · 50 BTC',
      ],
    },
    endCorrect: { title: 'Containment muvaffaqiyatli', subtitle: 'NIST 800-61 protokoli · forensik saqlandi' },
    endPartial: { title: 'Tiklash boshlandi', subtitle: 'Forensik cheklangan · sabab tahlil zarur' },
    endFail: {
      code: 'NIST 800-61',
      title: 'Ransom toʻlash — qonun buzilishi',
      body: 'Ransom toʻlash jinoiy guruhlarni moliyalashtirish bilan tenglashtiriladi. Bankka jarima va keyingi hujum riski.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'NIST 800-61 — Containment birinchi.',
      'Forensik tahlil tiklashdan oldin.',
      'Ransom toʻlash — qonun buzilishi.',
      'Backup tarmog‘ini darhol izolyatsiya qiling.',
      'Sabab aniqlanmasa hujum qaytadi.',
    ],
  },
};

const cyberZeroTrust = {
  title: 'Zero Trust — vendor kirishi',
  subtitle: 'IB-505 · Just-In-Time Access',
  proctorIntro: 'Vendor production ga doimiy admin kirish soʻraydi. Zero Trust strategiyasi.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Access soʻrovi',
    title: 'Vendor production access',
    subtitle: 'TechVendor · admin · doimiy',
    meta: 'IB-505 · qaror kerak',
    cta: 'Soʻrovni ochish',
  },
  txPanel: {
    tag: 'IAM · VENDOR ACCESS',
    client: 'TechVendor LLC',
    clientMeta: 'Tashqi xizmat ko‘rsatuvchi · 2 yil shartnoma · 6 muhandis',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '10:00', text: 'Vendor production admin so‘ragan' },
      { time: '10:05', text: '"Doimiy texnik xizmat" deb tushuntirgan' },
      { time: '10:10', text: 'Zero Trust qoidalari mavjud' },
      { time: '10:12', text: 'JIT access tizimi ishlatishga tayyor' },
    ],
    indicators: {
      requester: { label: 'Soʻrovchi', value: 'TechVendor', hint: 'Tashqi' },
      scope: { label: 'Doiraga', value: 'Production admin', hint: 'Yuqori risk' },
      duration: { label: 'Davomiyligi', value: 'Doimiy', hint: 'Talab maqulemas' },
      audit: { label: 'Audit', value: 'Kerak', hint: 'Yoz/o‘chir' },
    },
  },
  actions: {
    jitAccess: 'JIT access · 4 soat oynalar',
    jitAccessHint: 'Har sessiya: tasdiq + jurnal · sessiya tugashi bilan o‘chirish',
    vpnMonitor: 'VPN + kuzatish',
    vpnMonitorHint: 'Doimiy ulanish · audit zaif',
    permanentGroup: 'Doimiy admin guruhga qo‘shish',
    permanentGroupHint: 'XATAR · Zero Trust buzilishi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. JIT access — Zero Trustning bosh maqsadi. Kerak vaqtda, kerak doirada, jurnal bilan.',
    partial: 'VPN ishlaydi, lekin doimiy ulanish auditni qiyinlashtiradi.',
    fail: 'XATAR. Doimiy admin = supply chain riski. Vendor xakerlangani holatda — siz ham buzilgan.',
  },
  screen: {
    dashboard: {
      title: 'IAM · Access Manager',
      client: 'Bugun 3 ta access soʻrov',
      cards: {
        a: 'Soʻrovchi', aValue: 'Vendor',
        b: 'Doiraga', bValue: 'Admin',
        c: 'JIT', cValue: 'Tayyor',
      },
    },
    analysis: {
      title: 'Zero Trust qoidalari',
      items: [
        'Hech kim default da ishonchli emas',
        'Just-In-Time access · vaqt cheklovi',
        'Audit jurnali har sessiya',
        'Minimum privilege · faqat kerak doiraga',
      ],
    },
    endCorrect: { title: 'JIT access yoqildi', subtitle: '4 soat sessiya · jurnal aktiv' },
    endPartial: { title: 'VPN ulanish berildi', subtitle: 'Audit cheklangan · doimiy ulanish' },
    endFail: {
      code: 'IB-505',
      title: 'Zero Trust buzilishi',
      body: 'Tashqi vendor uchun doimiy admin huquqi supply chain hujumlariga eshik ochadi. Zero Trust prinsipi — har soʻrovga shubha bilan qarash.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'JIT access — Zero Trustning yuragi.',
      'Doimiy admin = supply chain riski.',
      'Audit jurnali har sessiya majburiy.',
      'Minimum privilege — faqat kerak doiraga.',
      'Vendor buzilsa — siz ham buzilgan.',
    ],
  },
};

const cyberDeepfake = {
  title: 'Deepfake ovoz verifikatsiyasi',
  subtitle: 'IB-606 · Callback protokoli',
  proctorIntro: '"CEO" qoʻngʻiroq qildi · tezkor $200K wire so‘rayapti. Ovoz g‘alati.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'CEO qoʻngʻirog‘i',
    title: 'Tezkor wire $200K',
    subtitle: '"CEO" Akmal Tursunov · ovoz shubhali',
    meta: 'IB-606 · darhol qaror',
    cta: 'Qoʻngʻiroqni koʻrish',
  },
  txPanel: {
    tag: 'IB · OVOZ TAHLILI',
    client: 'Soʻrovchi: "Akmal Tursunov" (CEO)',
    clientMeta: 'Notanish raqamdan · 4 daqiqa qoʻngʻiroq · ovoz uncanny',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '16:02', text: 'Qoʻngʻiroq · notanish raqam' },
      { time: '16:02', text: '"CEO Akmal Tursunov" deb taqdim etdi' },
      { time: '16:03', text: '$200K wire · "tezda, savdo ulgurmasin"' },
      { time: '16:04', text: 'Ovoz uncanny · pauzalar gʻalati' },
    ],
    indicators: {
      voice: { label: 'Ovoz', value: 'Uncanny', hint: 'Deepfake belgisi' },
      urgency: { label: 'Tezkorlik', value: '"tezda"', hint: 'Klassik social engineering' },
      amount: { label: 'Summa', hint: 'Wire transfer' },
      channel: { label: 'Kanal', value: 'Notanish raqam', hint: 'Verify kerak' },
    },
  },
  actions: {
    callback: 'CEO ning maʼlum raqamiga callback',
    callbackHint: 'Real ovoz tekshiriladi · qoʻshimcha 2 daqiqa',
    emailConfirm: 'Email tasdiqlash',
    emailConfirmHint: 'Email ham xakerlanishi mumkin · ehtiyot',
    wire: 'Wire ni amalga oshirish',
    wireHint: 'JINOIY · $200K yo‘qotiladi · CEO impersonation hujumi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Callback — deepfake ga qarshi yagona ishonchli yo‘l. 2 daqiqa kechikish $200K dan arzon.',
    partial: 'Email yaxshi, lekin email accounts ham buzilishi mumkin. Telefon callback kuchliroq.',
    fail: 'JINOIY. CEO impersonation = deepfake. $200K yoʻqoladi va bankka audit muammosi.',
  },
  screen: {
    dashboard: {
      title: 'IB · qoʻngʻiroq monitor',
      client: 'Aktiv qoʻngʻiroq · CEO impersonation shubhasi',
      cards: {
        a: 'Soʻrovchi', aValue: 'CEO?',
        b: 'Summa', bValue: '$200K',
        c: 'Ovoz', cValue: 'Uncanny',
      },
    },
    analysis: {
      title: 'Deepfake belgilari',
      items: [
        'Ovoz uncanny · pauzalar g‘alati',
        'Notanish raqamdan',
        'Tezkorlik bosimi',
        'Katta wire summa $200K',
      ],
    },
    endCorrect: { title: 'Callback verifikatsiya', subtitle: 'Real ovoz tekshirildi · soʻrov rad etildi' },
    endPartial: { title: 'Email tasdiqlash', subtitle: 'Cheklangan ishonch · ehtiyot' },
    endFail: {
      code: 'IB-606',
      title: 'CEO impersonation muvaffaqiyatli',
      body: 'Deepfake ovoz $200K wire ni amalga oshirdi. Bankka audit muammosi va shaxsiy javobgarlik. Callback protokoli majburiy.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Deepfake ovoz hozir qulay · ehtiyot.',
      'Callback maʼlum raqamga — yagona ishonchli yo‘l.',
      'Tezkorlik bosimi — klassik social engineering.',
      '$200K + tezkorlik = pause va verify.',
      'Email ham xakerlanishi mumkin · telefon kuchliroq.',
    ],
  },
};

const fraudSynthetic = {
  title: 'Synthetic identity onboarding',
  subtitle: 'FRAUD-318 · Composite ID detection',
  proctorIntro: 'Hisob ochish soʻrovi · ID composite · 3 ta flagged adresga bog‘langan.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Fraud monitor',
    title: 'Synthetic identity belgisi',
    subtitle: 'Real INN · soxta ism · linked addresses',
    meta: 'FRAUD-318 · onboarding pauza',
    cta: 'Profilni ochish',
  },
  txPanel: {
    tag: 'CRM · ID TAHLILI',
    client: '"Rustam Ahmedov"',
    clientMeta: 'INN real · ism birinchi marta · adres 3 ta flagged hisobga bog‘langan',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '09:20', text: 'Online hisob ochish soʻrovi' },
      { time: '09:21', text: 'INN tekshiruvi · real, lekin boshqa ism bilan' },
      { time: '09:22', text: 'Adres 3 ta flagged hisobga bog‘langan' },
      { time: '09:23', text: 'Device fingerprint takroriy' },
    ],
    indicators: {
      idMatch: { label: 'ID moslik', value: 'Composite', hint: 'Real INN + yangi ism' },
      addressLinks: { label: 'Adres', value: '3 flagged', hint: 'Boglanish' },
      creditFile: { label: 'Credit file', value: 'Thin', hint: 'Yangi yaratilgan' },
      deviceFingerprint: { label: 'Device', value: 'Takroriy', hint: 'Boshqa hisoblarda ham' },
    },
  },
  actions: {
    denyReport: 'Rad etish + fraud hisobot',
    denyReportHint: 'Onboarding bloklanadi · fraud team xabardor',
    enhancedKyc: 'EKYC suhbati',
    enhancedKycHint: 'Qoʻshimcha hujjat soʻrash · 24 soat',
    open: 'Hisob ochish',
    openHint: 'XATAR · synthetic identity faol bo‘ladi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Composite ID + linked addresses + device fingerprint — synthetic identity klassik belgilari. Rad etish va hisobot — to‘g‘ri yo‘l.',
    partial: 'EKYC ishlaydi, lekin synthetic identity tayyorlangan javoblar bilan o‘tishi mumkin.',
    fail: 'XATAR. Synthetic identity bilan ochilgan hisob keyinchalik mule sxemada ishlatiladi.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · ID monitor',
      client: 'Bugun 4 ta synthetic shubha',
      cards: {
        a: 'ID', aValue: 'Composite',
        b: 'Linked', bValue: '3 hisob',
        c: 'Device', cValue: 'Takroriy',
      },
    },
    analysis: {
      title: 'Synthetic ID belgilari',
      items: [
        'Real INN + birinchi marta ko‘ringan ism',
        'Adres 3 ta flagged hisobga bog‘langan',
        'Credit file thin (yangi yaratilgan)',
        'Device fingerprint takroriy',
      ],
    },
    endCorrect: { title: 'Onboarding rad etildi', subtitle: 'Fraud hisobot yuborildi · 24 soatda audit' },
    endPartial: { title: 'EKYC suhbati', subtitle: 'Qoʻshimcha hujjat soʻraladi · 24 soat' },
    endFail: {
      code: 'FRAUD-318',
      title: 'Synthetic identity ochildi',
      body: 'Composite ID bilan ochilgan hisob mule yoki credit fraud sxemada ishlatiladi. Onboarding bosqichida rad etish — eng samarali himoya.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Real INN + yangi ism = composite signal.',
      'Adres bog‘lanishlar — ko‘rsatkich.',
      'Device fingerprint takroriy = bot/farma.',
      'EKYC tayyor javoblar bilan o‘tishi mumkin.',
      'Onboarding bosqichida rad etish eng arzon.',
    ],
  },
};

const fraudSkimming = {
  title: 'ATM skimming + behavioral',
  subtitle: 'FRAUD-422 · Geo velocity anomalya',
  proctorIntro: 'Bitta karta 22 daqiqada 280 km uzoqlikda ishlatilgan. Fizik imkonsiz.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Card fraud',
    title: 'Geo velocity anomalya',
    subtitle: 'Toshkent + Samarqand · 22 daqiqada',
    meta: 'FRAUD-422 · darhol',
    cta: 'Tahlilni ochish',
  },
  txPanel: {
    tag: 'CRM · KARTA TAHLILI',
    client: 'Karta 4188…7733 · D. Rashidov',
    clientMeta: 'Premium · 3 yil · oxirgi normal foydalanish kechagi',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '13:45', text: 'Toshkent ATM · 500K naqd' },
      { time: '14:07', text: 'Samarqand ATM · 500K naqd' },
      { time: '14:07', text: '280 km · 22 daqiqada · fizik imkonsiz' },
      { time: '14:08', text: 'Ikkalasi ham ATM clusterida' },
    ],
    indicators: {
      geoVelocity: { label: 'Geo velocity', value: '280km/22m', hint: 'Imkonsiz' },
      amountPattern: { label: 'Summa', value: '500K×2', hint: 'Maks limit' },
      atmCluster: { label: 'ATM cluster', value: 'Bog‘liq', hint: 'Skimmer shubhasi' },
      cvvFailures: { label: 'CVV xato', value: '3', hint: 'Boshqa kartalarda ham' },
    },
  },
  actions: {
    blockInvestigate: 'Karta block + skimmer tergovi',
    blockInvestigateHint: 'Yangi karta · ATM clusteri tekshiruvi',
    notifyCustomer: 'Mijozni ogohlantirish + soft block',
    notifyCustomerHint: 'Mijoz tasdiqi kutiladi · vaqt yo‘qotish',
    monitor: 'Kuzatish davom etsin',
    monitorHint: 'XATAR · qo‘shimcha o‘g‘irlash mumkin',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Geo velocity imkonsiz + ATM cluster + CVV xatolar = skimming. Block + tergov — darhol qadam.',
    partial: 'Mijoz tasdiqi kutilsa, qo‘shimcha pul o‘g‘irlanishi mumkin. Block birinchi qadam.',
    fail: 'XATAR. Skimming davom etayotgan kartani kuzatishda qoldirish = ko‘proq mijozlar zarar.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Karta monitor',
      client: 'Bugun 5 ta velocity alert',
      cards: {
        a: 'Karta', aValue: '4188…',
        b: 'Anomalya', bValue: '280km',
        c: 'Vaqt', cValue: '22 daq',
      },
    },
    analysis: {
      title: 'Skimming belgilari',
      items: [
        'Geo velocity fizik imkonsiz',
        'Ikkita ATM bog‘liq clusterda',
        'CVV xatolari boshqa kartalarda ham',
        'Mijoz xabar bermagan',
      ],
    },
    endCorrect: { title: 'Karta bloklandi', subtitle: 'Skimmer tergovi · ATM cluster tekshiruvda' },
    endPartial: { title: 'Soft block · mijoz tasdiqi', subtitle: 'Vaqt yo‘qotildi · qo‘shimcha o‘g‘irlash riski' },
    endFail: {
      code: 'FRAUD-422',
      title: 'Skimming davom etadi',
      body: 'Geo velocity imkonsiz bo‘lganda darhol block. Kuzatish rejimi qo‘shimcha mijozlarni zarar yetkazadi.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Geo velocity imkonsiz = darhol block.',
      'ATM cluster bog‘lanishi — skimmer belgisi.',
      'CVV xatolar boshqa kartalarda ham — farma signali.',
      'Mijoz tasdiqi kutilmaydi · darhol himoyadi.',
      'Skimming davom etayotganda har daqiqa qimmat.',
    ],
  },
};

const fraudChargeback = {
  title: 'Chargeback triage — friendly fraud',
  subtitle: 'FRAUD-510 · Dispute defense',
  proctorIntro: 'Mijoz delivery qabul qilganini rad etyapti. Tracking imzo ko‘rsatadi.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Chargeback',
    title: 'Friendly fraud shubhasi',
    subtitle: '$1240 elektronika · "qabul qilmadim"',
    meta: 'FRAUD-510 · 5 kun deadline',
    cta: 'Dispute koʻrish',
  },
  txPanel: {
    tag: 'CRM · CHARGEBACK',
    client: 'O. Yusupova · 4 yil mijoz',
    clientMeta: 'Premium karta · 11 chargeback so‘nggi 12 oyda · pattern',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '5 kun avval', text: '$1240 elektronika xarid · billing adres' },
      { time: '4 kun avval', text: 'Tracking · billing adresga yetkazildi' },
      { time: '4 kun avval', text: 'Imzo · "O. Yusupova" tracking da' },
      { time: 'Bugun', text: '"Qabul qilmadim" chargeback' },
    ],
    indicators: {
      delivery: { label: 'Delivery', value: 'Imzo bilan', hint: 'Billing adres' },
      history: { label: 'Tarix', value: '11 chargeback', hint: 'Pattern' },
      pattern: { label: 'Pattern', value: 'Aniq', hint: 'Friendly fraud' },
      reasonCode: { label: 'Reason', value: '4855', hint: 'Mahsulot olmaganligi' },
    },
  },
  actions: {
    defendEvidence: 'Dalillar yig‘ish + dispute himoya',
    defendEvidenceHint: 'Tracking + imzo · 5 kunda javob',
    partialRefund: 'Goodwill qisman refund',
    partialRefundHint: 'NPS saqlanadi · friendly fraud rag‘batlanadi',
    acceptDispute: 'Disputeni qabul qilish',
    acceptDisputeHint: 'XATAR · mijoz pattern davom etadi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Tracking + imzo + 11 prior chargeback = friendly fraud. Dalillar bilan himoya — to‘g‘ri yo‘l.',
    partial: 'Goodwill refund qisqa muddatda yaxshi, lekin pattern davom etadi va boshqa mijozlarga ham yuqadi.',
    fail: 'XATAR. Friendly fraud qabul qilinsa, mijoz har oy chargeback qiladi. Bank uchun yo‘qotish.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Chargeback',
      client: 'Bu hafta 23 ta dispute',
      cards: {
        a: 'Summa', aValue: '$1240',
        b: 'Reason', bValue: '4855',
        c: 'Tarix', cValue: '11×',
      },
    },
    analysis: {
      title: 'Friendly fraud belgilari',
      items: [
        'Tracking imzo bilan',
        'Billing adresga yetkazilgan',
        '11 prior chargeback so‘nggi 12 oyda',
        'Premium karta · uzoq tarix',
      ],
    },
    endCorrect: { title: 'Dispute himoya qilindi', subtitle: 'Dalillar yetkazildi · 5 kunda hal qilinadi' },
    endPartial: { title: 'Goodwill refund berildi', subtitle: 'Pattern davom etish riski' },
    endFail: {
      code: 'FRAUD-510',
      title: 'Friendly fraud rag‘batlandi',
      body: 'Tracking + imzo dalillari bilan dispute himoya qilinishi kerak. Qabul qilish friendly fraud patternini rag‘batlantiradi.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Tracking + imzo = kuchli dalil.',
      '11+ chargeback tarixi = friendly fraud signali.',
      'Goodwill refund pattern davom etishini rag‘batlantiradi.',
      'Reason code 4855 — eng ko‘p suiisteʼmol.',
      'Dispute himoya bankning huquqi.',
    ],
  },
};

const fraudAnomalyTuning = {
  title: 'AI anomaly model tuning',
  subtitle: 'FRAUD-630 · Threshold + backtest',
  proctorIntro: 'Hudud to‘lov-kuni o‘zgargandan so‘ng false-positive 4.2× ortdi.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Model drift',
    title: 'FP rate 4.2× ortgan',
    subtitle: 'Velocity rule · regional payday shift',
    meta: 'FRAUD-630 · model tuning',
    cta: 'Modelni ko‘rish',
  },
  txPanel: {
    tag: 'IB · MODEL TAHLILI',
    client: 'Velocity rule v3.4',
    clientMeta: 'Ishga tushgan: 11 oy oldin · drift: 3 hafta · FP rate 4.2×',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '3 hafta', text: 'Hudud to‘lov-kuni o‘zgartirildi' },
      { time: '2 hafta', text: 'FP rate o‘sa boshladi' },
      { time: 'Bugun', text: 'FP rate 4.2× normal' },
      { time: 'Bugun', text: 'Backtest tizimi tayyor' },
    ],
    indicators: {
      fpRate: { label: 'FP rate', unit: '× normal', hint: '> 2× = problem' },
      driftSource: { label: 'Drift sababi', value: 'Payday shift', hint: 'Strukturaviy' },
      backtest: { label: 'Backtest', value: '6 oy data', hint: 'Tayyor' },
      coverage: { label: 'Coverage', value: '92%', hint: 'Saqlanadi' },
    },
  },
  actions: {
    tuneBacktest: 'Threshold + backtest + monitoring',
    tuneBacktestHint: 'Backtest hold-out · 1 hafta monitoring',
    partialBump: 'Qisman threshold ko‘tarish',
    partialBumpHint: 'FP kamayadi · coverage to‘g‘ri tekshirilmaydi',
    disableRule: 'Rule ni o‘chirish',
    disableRuleHint: 'XATAR · fraud detection bo‘shashadi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Backtest + monitoring — modelni o‘zgartirishning yagona ishonchli yo‘li. Coverage va FP balansi.',
    partial: 'Tezda yengillik, lekin backtestsiz haqiqiy detection saqlanganini bilmaysiz.',
    fail: 'XATAR. Noisy ruleni o‘chirish FP ni 0 qiladi, lekin fraud o‘tishni boshlaydi. Mijozlar zarar ko‘radi.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Model monitor',
      client: 'Aktiv rule · drift kuzatuvi',
      cards: {
        a: 'FP rate', aValue: '4.2×',
        b: 'Drift', bValue: '3 hafta',
        c: 'Backtest', cValue: 'Tayyor',
      },
    },
    analysis: {
      title: 'Model drift belgilari',
      items: [
        'FP rate 4.2× normal',
        'Strukturaviy drift · payday shift',
        'Backtest tizimi tayyor (6 oy data)',
        'Coverage 92% saqlanadi',
      ],
    },
    endCorrect: { title: 'Model tuningi', subtitle: 'Backtest + 1 hafta monitoring' },
    endPartial: { title: 'Threshold ko‘tarildi', subtitle: 'FP kamaydi · coverage tekshirilmagan' },
    endFail: {
      code: 'FRAUD-630',
      title: 'Rule o‘chirildi',
      body: 'Noisy rule o‘chirilsa, fraud detection bo‘shashadi. Backtest va monitoring — modelni o‘zgartirishning yagona ishonchli yo‘li.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'FP rate o‘sishi — model drift signali.',
      'Strukturaviy drift (payday) — tarix tahlil zarur.',
      'Backtest hold-out — ishonchli o‘zgarish.',
      'Threshold tezkor ko‘tarish — coverage ni buzadi.',
      'Rule o‘chirish — eng oxirgi vositadan.',
    ],
  },
};

const cxAccountBlock = {
  title: 'Hisob bloklash · empatiya',
  subtitle: 'CX-220 · Velocity false positive',
  proctorIntro: 'Premium mijoz uyqudan turdi — kartasi bloklangan. Samolyotga 90 daqiqa qoldi.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Mijoz xizmati',
    title: 'Auto-block + samolyot',
    subtitle: 'D. Yusupova · 5.4 yil mijoz',
    meta: 'CX-220 · empatiya kerak',
    cta: 'Soʻrovni ochish',
  },
  txPanel: {
    tag: 'CRM · MIJOZ HOLATI',
    client: 'Dilfuza Yusupova',
    clientMeta: 'Premium · 5.4 yil · NPS 9.4 · samolyotga 90 daqiqa',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: 'Kechagi', text: '5 ta tranzaksiya · velocity rule yondi' },
      { time: 'Kechagi', text: 'Karta auto-block · ogohlantirish yuborildi' },
      { time: 'Bugun', text: 'Mijoz uyqudan turdi · samolyot 90 daqiqa' },
      { time: 'Bugun', text: 'Premium liniya · asabiy ovoz' },
    ],
    indicators: {
      reason: { label: 'Block sababi', value: 'Velocity FP', hint: 'False positive' },
      tenure: { label: 'Tenure', unit: 'yil', hint: 'Lo‘yal' },
      urgency: { label: 'Tezkorlik', value: '90 daq', hint: 'Samolyot' },
      fraudRisk: { label: 'Fraud risk', value: 'Past', hint: 'Profil mos' },
    },
  },
  actions: {
    empathyTemp: 'Empatik tushuntirish + vaqtinchalik unblock',
    empathyTempHint: 'Supervisor approval · 24 soatlik oyna',
    protocolOnly: 'Faqat protokol bo‘yicha javob',
    protocolOnlyHint: 'Empatiya yo‘q · NPS yo‘qotish riski',
    dismiss: 'Shikoyatni rad etish',
    dismissHint: 'XATAR · Premium mijoz yo‘qotish',
  },
  proctorFeedback: {
    correct: 'Aʼlo. False positive aniq + premium + low fraud risk = empatik echim. Supervisor approval — protokolga zid emas.',
    partial: 'Protokol to‘g‘ri, lekin mijoz Premium NPS yo‘qotadi · empatiya kerak edi.',
    fail: 'XATAR. Premium mijozni rad etish · NPS pasayishi · keyingi yili churn.',
  },
  screen: {
    dashboard: {
      title: 'CX · Mijoz monitor',
      client: 'Bugun 12 ta auto-block · 2 ta FP',
      cards: {
        a: 'Daraja', aValue: 'Premium',
        b: 'Sabab', bValue: 'Velocity',
        c: 'Vaqt', cValue: '90 daq',
      },
    },
    analysis: {
      title: 'Holat tahlili',
      items: [
        'Velocity rule false positive',
        'Profil va xarajatlar mos',
        'Premium 5.4 yil mijoz',
        'Samolyotga 90 daqiqa',
      ],
    },
    endCorrect: { title: 'Vaqtinchalik unblock', subtitle: '24 soat · supervisor approval · NPS saqlandi' },
    endPartial: { title: 'Protokol javob', subtitle: 'Empatiya yo‘q · NPS pasayishi' },
    endFail: {
      code: 'CX-220',
      title: 'Mijoz yo‘qotildi',
      body: 'Premium mijoz uchun empatiya kerak edi. False positive aniq holatda vaqtinchalik echim — protokolga zid emas.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'False positive — supervisor approval bilan vaqtinchalik unblock.',
      'Premium mijoz NPS qimmat.',
      'Empatiya protokolga zid emas.',
      'Tezkorlik — emergency lever ishlatish vaqti.',
      'Mijoz pasportini eslang · profil mos bo‘lsa, risk past.',
    ],
  },
};

const cxAccessibility = {
  title: 'Imkoniyati cheklangan mijoz',
  subtitle: 'CX-330 · Accessibility · assistive tech',
  proctorIntro: 'Ko‘rish qobiliyati cheklangan mijoz online banking bilan qiynalmoqda.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Mijoz yordami',
    title: 'Accessibility yordami',
    subtitle: 'M. Rahimov · screen-reader',
    meta: 'CX-330 · vaqt cheklov yo‘q',
    cta: 'Yordamni boshlash',
  },
  txPanel: {
    tag: 'CRM · ACCESSIBILITY',
    client: 'Mansur Rahimov',
    clientMeta: 'Ko‘rish nogironligi · NVDA screen-reader · 3 yil mijoz',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '11:00', text: 'Mijoz qoʻngʻiroq qildi' },
      { time: '11:01', text: '"Yangi online banking tushunarsiz"' },
      { time: '11:02', text: 'Screen-reader uchun navigatsiya zaif' },
      { time: '11:03', text: 'Accessible flowlar mavjud · bookmark imkoni' },
    ],
    indicators: {
      need: { label: 'Ehtiyoj', value: 'Screen-reader', hint: 'Assistive tech' },
      product: { label: 'Mahsulot', value: 'Online banking', hint: 'Yangi versiya' },
      frustration: { label: 'Holat', value: 'Yuqori', hint: 'Asabiy' },
      tools: { label: 'Vositalar', value: 'Mavjud', hint: 'Accessible flow' },
    },
  },
  actions: {
    fullSession: 'To‘liq sessiya + screen-reader walkthrough',
    fullSessionHint: 'Accessible flow ko‘rsatish · bookmark · 25 daq',
    standardTutorial: 'Standart tutorial',
    standardTutorialHint: 'Screen-reader uchun mos emas · navigatsiya muammosi',
    redirect: 'Faqat telefon support ga yo‘naltirish',
    redirectHint: 'XATAR · online banking dan voz kechtirish',
  },
  proctorFeedback: {
    correct: 'Aʼlo. To‘liq sessiya · accessible flow ko‘rsatish · mijoz mustaqil bo‘ladi. NPS va inclusion ikkisi ham.',
    partial: 'Standart tutorial screen-reader uchun mos emas. Mijoz yana qoʻngʻiroq qiladi.',
    fail: 'XATAR. Telefon-only yo‘naltirish nogiron mijozlarga qarshi diskriminatsiya hisoblanadi.',
  },
  screen: {
    dashboard: {
      title: 'CX · Accessibility',
      client: 'Bugun 1 ta assistive tech yordami',
      cards: {
        a: 'Ehtiyoj', aValue: 'NVDA',
        b: 'Mahsulot', bValue: 'OB',
        c: 'Yordam', cValue: 'To‘liq',
      },
    },
    analysis: {
      title: 'Yordam strategiyasi',
      items: [
        'Screen-reader bilan mos navigatsiya',
        'Accessible flow lar mavjud',
        'Bookmark imkoni',
        'Vaqt cheklov yo‘q',
      ],
    },
    endCorrect: { title: 'To‘liq sessiya', subtitle: 'Mijoz mustaqil bo‘ldi · NPS yuqori' },
    endPartial: { title: 'Standart tutorial', subtitle: 'Cheklangan yordam · qayta qoʻngʻiroq mumkin' },
    endFail: {
      code: 'CX-330',
      title: 'Inclusion buzilishi',
      body: 'Imkoniyati cheklangan mijozlarni faqat telefon ga yo‘naltirish — diskriminatsiya. Online banking accessible bo‘lishi kerak.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Accessible flowlarni biling — bank majburiyati.',
      'Screen-reader bilan navigatsiya boshqacha.',
      'Vaqt cheklash yo‘q · sabr — yordamning bir qismi.',
      'Bookmark imkoni — mustaqillik kaliti.',
      'Inclusion — har bir mijoz uchun bank xizmati.',
    ],
  },
};

const cxInternalEscalation = {
  title: 'Ichki eskalatsiya protokoli',
  subtitle: 'CX-440 · Junior agent qo‘llab-quvvatlash',
  proctorIntro: 'Junior agent agressiv mijozga qotib qoldi. Mijoz baqirayapti.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Internal SOS',
    title: 'Junior agent qotirilgan',
    subtitle: 'Aktiv qo‘ng‘iroq · client baqiryapti',
    meta: 'CX-440 · darhol',
    cta: 'Holatni ko‘rish',
  },
  txPanel: {
    tag: 'CRM · INTERNAL ESCALATION',
    client: 'Junior: A. Karimova (2 oy)',
    clientMeta: 'Aktiv qo‘ng‘iroq · client X. Olimov (6 yil mijoz, asabiy)',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '14:30', text: 'Junior qo‘ng‘iroq qabul qildi' },
      { time: '14:33', text: 'Client baqirishni boshladi' },
      { time: '14:34', text: 'Junior pauza qildi · javob yo‘q' },
      { time: '14:35', text: 'Internal SOS yondi' },
    ],
    indicators: {
      tone: { label: 'Mijoz tonusi', value: 'Agressiv', hint: 'De-escalation kerak' },
      juniorState: { label: 'Junior', value: 'Qotirilgan', hint: 'Yordam kerak' },
      clientHistory: { label: 'Mijoz tarix', value: '6 yil', hint: 'Saqlash arziydi' },
      queueLoad: { label: 'Navbat', value: '7', hint: 'Yuqori' },
    },
  },
  actions: {
    takeOverCoach: 'Qabul qilish · de-eskalatsiya · koucherlik',
    takeOverCoachHint: 'Junior tinglaydi · client tinch · keyin debrief',
    liveAdvise: 'Live maslahat (qo‘ng‘iroqqa kirmasdan)',
    liveAdviseHint: 'Junior o‘rganadi · client kutadi · risk',
    leaveAlone: 'Junior yolg‘iz hal qilsin',
    leaveAloneHint: 'XATAR · client va junior ikkisi ham yo‘qotiladi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Qabul + de-eskalatsiya + debrief = junior o‘sadi, mijoz saqlanadi. Ikki maqsad.',
    partial: 'Live maslahat ishlaydi, lekin client kutadi · pauzalar agressiya kuchaytiradi.',
    fail: 'XATAR. 2 oylik junior agressiv 6 yillik mijoz bilan yolg‘iz — ikkalasi ham yo‘qoladi.',
  },
  screen: {
    dashboard: {
      title: 'CX · Senior dashboard',
      client: 'Aktiv junior SOS · 2 ta navbat',
      cards: {
        a: 'Junior', aValue: 'A. K.',
        b: 'Mijoz', bValue: '6 yil',
        c: 'Tonus', cValue: 'Agressiv',
      },
    },
    analysis: {
      title: 'Eskalatsiya holati',
      items: [
        'Junior 2 oy tajriba',
        'Mijoz 6 yil sodiq',
        'Agressiya · de-escalation zarur',
        'Live coaching + debrief imkoni',
      ],
    },
    endCorrect: { title: 'Senior qabul qildi', subtitle: 'Client tinch · junior o‘rgandi · debrief belgilandi' },
    endPartial: { title: 'Live maslahat', subtitle: 'Cheklangan yordam · client kutdi' },
    endFail: {
      code: 'CX-440',
      title: 'Ikki tomon yo‘qotildi',
      body: 'Junior coaching va mijoz saqlash — ikkalasi ham senior majburiyati. Yolg‘iz qoldirish — yo‘qotish.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Internal SOS — senior eshigini darhol ochish.',
      'De-eskalatsiya senior tajribasi bilan kuchli.',
      'Debrief — junior o‘sishining manbai.',
      'Mijoz saqlash + junior coaching = ikki maqsad.',
      'Yolg‘iz qoldirish — ikkalasini ham yo‘qotish.',
    ],
  },
};

const cxComplexCustomer = {
  title: 'Murakkab mijoz · 3 ta soʻrov',
  subtitle: 'CX-550 · Multi-product triage',
  proctorIntro: '8 yillik Premium mijoz statementni jamlash, foiz qayta ko‘rib, beneficiar o‘zgartirish so‘rayapti.',
  proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
  notification: {
    tag: 'Multi-soʻrov',
    title: 'Bir qo‘ng‘iroqda 3 ta soʻrov',
    subtitle: 'Z. Karimov · 5 mahsulot · 8.7 yil',
    meta: 'CX-550 · structured triage',
    cta: 'Soʻrovni ochish',
  },
  txPanel: {
    tag: 'CRM · MULTI-PRODUCT',
    client: 'Zafar Karimov',
    clientMeta: 'Premium · 5 mahsulot · 8.7 yil · NPS 9.6 · oilaviy hisob',
    yourTask: 'Sizning qaroringiz',
    taskHint: 'Bitta toʻgʻri javobni tanlang.',
    timelineLabel: 'Voqealar tartibi',
    timeline: [
      { time: '11:10', text: '"Hammasi statementni jamlash kerak"' },
      { time: '11:11', text: '"Foiz qayta ko‘rib chiqilsin"' },
      { time: '11:12', text: '"Beneficiarni o‘zgartirmoqchiman"' },
      { time: '11:13', text: 'Mijoz ish kunining oxiri' },
    ],
    indicators: {
      products: { label: 'Mahsulot', value: '5', hint: 'Multi-product' },
      requests: { label: 'Soʻrov', value: '3', hint: 'Bir qoʻngʻiroqda' },
      tenure: { label: 'Tenure', unit: 'yil', hint: 'Premium' },
      satisfaction: { label: 'NPS', value: '9.6', hint: 'Yuqori' },
    },
  },
  actions: {
    structuredTriage: 'Strukturali triage + yozma follow-up',
    structuredTriageHint: 'Birinchi: beneficiar (KYC) · ikkinchi: statement · uchinchi: callback',
    partialCallback: 'Bittasini hozir + callback boshqalar uchun',
    partialCallbackHint: 'Soʻrovlar bo‘linadi · mijoz ikki marta gaplashadi',
    oneOnly: 'Faqat bittasini bajarish',
    oneOnlyHint: 'XATAR · mijoz xafa bo‘ladi · NPS pasayadi',
  },
  proctorFeedback: {
    correct: 'Aʼlo. Strukturali triage · KYC birinchi (huquqiy ahamiyat) · yozma follow-up · Premium tarix qadrlandi.',
    partial: 'Bittasi+callback ishlaydi, lekin mijoz qaytadan gaplashishi kerak · vaqt yo‘qotish.',
    fail: 'XATAR. Premium 8.7 yil mijozni rad etish — keyingi yili churn riski.',
  },
  screen: {
    dashboard: {
      title: 'CX · Multi-product',
      client: 'Aktiv multi-soʻrov · Premium',
      cards: {
        a: 'Soʻrov', aValue: '3',
        b: 'Mahsulot', bValue: '5',
        c: 'Tarix', cValue: '8.7y',
      },
    },
    analysis: {
      title: 'Soʻrovlar triage',
      items: [
        'Beneficiar oʻzgartirish — KYC (huquqiy)',
        'Statement jamlash — texnik',
        'Foiz qayta ko‘rish — yuqori vakolat',
        'Premium 8.7 yil tarix qadrlanadi',
      ],
    },
    endCorrect: { title: 'Strukturali javob', subtitle: '3 soʻrov tartiblangan · yozma follow-up' },
    endPartial: { title: 'Bittasi + callback', subtitle: 'Mijoz qaytadan gaplashadi · vaqt yo‘qotish' },
    endFail: {
      code: 'CX-550',
      title: 'Mijoz xafa',
      body: 'Premium 8.7 yil mijoz murakkab soʻrov bilan keldi · faqat bittasi bajarilishi protokolga zid emas, lekin NPS va churn riski.',
    },
  },
  debrief: {
    title: 'Mashgʻulot natijasi', score: 'Baho', tipsTitle: 'Asosiy xulosalar',
    tips: [
      'Strukturali triage — har soʻrovni tartiblang.',
      'KYC soʻrovlari birinchi (huquqiy ahamiyat).',
      'Yozma follow-up — mijoz xotirjam bo‘ladi.',
      'Premium tarix — yo‘qotmaslik majburiyati.',
      'Bir qo‘ng‘iroqda hammasini — vaqt va respect.',
    ],
  },
};

export const uzScenarios = {
  amlBeneficialOwner,
  amlSanctions,
  amlPep,
  amlSarWriting,
  cyberSocTriage,
  cyberIncidentResponse,
  cyberZeroTrust,
  cyberDeepfake,
  fraudSynthetic,
  fraudSkimming,
  fraudChargeback,
  fraudAnomalyTuning,
  cxAccountBlock,
  cxAccessibility,
  cxInternalEscalation,
  cxComplexCustomer,
};
