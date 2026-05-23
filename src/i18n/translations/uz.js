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
      'Stol oldidasiz. Mijoz keladi — vaziyatni diqqat bilan oʻrganing.',
    caseContext: {
      tag: 'Vaziyat · Toshkent-1 filiali · 09:14',
      context:
        'Seshanba tongi, 09:14. Siz Toshkent-1 filialining navbatchi kassirisiz. Premium mijoz — Bekzod Karimov, 43 kun avval hisob ochgan — duffel sumka bilan keladi. Sumkada 100 ming soʻmlik bogʼlamlar bilan 187 mln soʻm naqd. Mijoz terlagan, eshikka qarab-qarab oladi va ovozi titrab gapiradi. KYC fayliga koʻra, hisob ochilganda u "biznes faoliyati yoʻq, faqat oylik uchun" deb yozdirgan. Manba hujjati yoʻq — kontrakt ham, daromad bayonnomasi ham. AML algoritmi risk skorini 74 (sariq) gacha koʻtardi, peer-median dan ancha yuqori velocity belgisi bilan.',
      whatYouSee: [
        'Kassada: 187 mln soʻm naqd · 100 ming soʻmlik bogʼlamlar, hisoblangan va lentalangan.',
        'AML algoritm skori 74/100 (yuqori), velocity peer-median dan 2.1x yuqori.',
        'KYC fayli: hisob 43 kun avval ochilgan · biznes daromad yozilmagan · oylik klasterga tegishli.',
      ],
      whatYouHear: [
        '"Tezroq qabul qiling, men kontraktni ertaga olib kelaman."',
        '"Men Premium—siz mendan hujjat soʻramasligingiz kerak."',
      ],
      begin: 'Tahlilni boshlash',
    },
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
      tipOff: 'Mijozga ogohlantirish — "siz shubhalisiz"',
      tipOffHint: 'JINOIY · AML §7.1 — mijozga SAR jarayoni aytilmaydi',
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
      endTipOff: {
        code: 'AML §7.1',
        title: 'Tipping-off — jinoiy harakat',
        body:
          'Mijozga "siz shubhalisiz" yoki "biz SAR yozyapmiz" deyish — tipping-off. Bu AML §7.1 ostida jinoiy harakat hisoblanadi va xodimga 5 yilgacha jazo yuklaydi. Mijozga hech qachon SAR jarayoni haqida xabar berilmaydi.',
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
  cyberScenario: {
    title: 'Phishing email triage',
    subtitle: 'IB-301 · domen va havola tahlili',
    proctorIntro:
      'IB konsoli oldidasiz. Yangi xat tushdi — vaziyatni diqqat bilan oʻrganing.',
    caseContext: {
      tag: 'Vaziyat · IB monitoring konsoli · 11:02 Juma',
      context:
        'Juma kuni 11:02, IB monitoring konsoli oldidasiz. Siz birinchi hafta navbatchi kichik SOC analitiksiz. Pochtaga "secure@bank-secure-uz.help" yuboruvchisidan xat keldi. Display name — "OOQ Bank Compliance" — rasmiy bankka oʻxshatib qoʻyilgan. WHOIS soʻrovi koʻrsatadi: domen 3 kun avval roʻyxatga olingan. Xat DMARC tekshiruvini "fail" bilan oʻtgan. Ilova — "invoice.exe", lekin PDF ikonkasi bilan niqoblangan. Havola HTTPS emas, oddiy HTTP. Mavzu: "Hisobingiz 30 daqiqada bloklanadi".',
      whatYouSee: [
        'Yuboruvchi domeni: bank-secure-uz.help · 3 kun avval roʻyxatga olingan (WHOIS).',
        'Ilova: invoice.exe — PDF ikonkasi bilan niqoblangan (real fayl turi .exe).',
        'Havola: http://bank-secure-uz.help/verify — HTTPS yoʻq, qisqartirilgan domen.',
        'Email header: DMARC fail · SPF none · Reply-To boshqa domen.',
      ],
      whatYouHear: [
        '«Hisobingiz 30 daqiqa ichida bloklanadi. Tasdiqlash uchun bosing.»',
        '«Bu xat OOQ Bank Compliance dan rasmiy ogohlantirishdir.»',
      ],
      begin: 'Tahlilni boshlash',
    },
    proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
    notification: {
      tag: 'Yangi SOC ogohlantirishi',
      title: 'Shubhali email keldi',
      subtitle: 'Yuboruvchi: secure@bank-secure-uz.help',
      meta: 'IB-301 · 5 daqiqada javob bering',
      cta: 'Xatni ochish',
    },
    txPanel: {
      tag: 'EMAIL · TAHLIL',
      client: 'secure@bank-secure-uz.help',
      clientMeta: 'Tashqi domen · yangi (3 kun) · DMARC fail',
      indicators: {
        sender: { label: 'Yuboruvchi', value: 'bank-secure-uz.help', hint: 'Soxta domen' },
        urgency: { label: 'Tezkorlik', value: '5 daq', hint: 'Mijozni qoʻrqitish' },
        link: { label: 'Havola', value: 'http://…/verify', hint: 'HTTPS yoʻq' },
        attachment: { label: 'Ilova', value: 'invoice.exe', hint: 'Bajariluvchi fayl' },
      },
      timeline: [
        { time: '11:02', text: 'Xat inbox ga tushdi · DMARC fail belgisi' },
        { time: '11:02', text: '"Hisobingiz bloklanadi"' },
        { time: '11:02', text: 'Havola: http://bank-secure-uz.help/verify' },
        { time: '11:03', text: 'Ilova: invoice.exe (yashirilgan)' },
      ],
      yourTask: 'Sizning qaroringiz',
      taskHint: 'Bitta toʻgʻri javobni tanlang.',
      timelineLabel: 'Voqealar tartibi',
    },
    actions: {
      reportSoc: 'SOC ga yuborish',
      reportSocHint: 'Domen IDS qoidalariga qoʻshiladi · 30 daq',
      quarantine: 'Karantinga qoʻyish',
      quarantineHint: 'Faqat oʻzingiz uchun · jamoa himoyalanmagan',
      reply: 'Havolaga bosish va tekshirish',
      replyHint: 'XATAR · uchinchi tomonga maʼlumot kiritish',
    },
    proctorFeedback: {
      correct:
        'Aʼlo. Domen, DMARC, .exe ilova — uchta belgi. SOC qoidasi 30 daq ichida tarqalib, 2400 xodimni himoya qiladi.',
      quarantineOk:
        'Yaxshi qaror, lekin SOC ga yubormaganingiz uchun jamoa himoyalanmaydi. Keyingi qabul qiluvchi ham xato qilishi mumkin.',
      replyFail:
        'OGOHLANTIRISH. Phishing havolaga bosish — kredensiallarni topshirish bilan teng. Hisobingiz darhol bloklandi.',
    },
    screen: {
      dashboard: {
        title: 'Email · IB monitoringi',
        client: 'Bugun 34 xat · 3 ta flagged',
        cards: {
          inbox: 'Inbox',
          flagged: 'Shubhali',
          queue: 'SOC navbati',
        },
      },
      analysis: {
        title: 'Phishing belgilari',
        items: [
          'Domen: bank-secure-uz.help (rasmiy emas)',
          'DMARC: fail',
          'Havola: HTTPS yoʻq · qisqartirilgan',
          'Ilova: .exe · yashirilgan',
        ],
      },
      endCorrect: {
        title: 'SOC ga yuborildi',
        subtitle: 'IDS qoidasi 30 daqiqada · 2400 xodim himoyalanadi',
      },
      endPartial: {
        title: 'Karantinga qoʻyildi',
        subtitle: 'Faqat sizning inbox · jamoa hali himoyasiz',
      },
      endFail: {
        code: 'IB-301',
        title: 'Phishing havolasiga bosish',
        body:
          'Tashqi havolaga bosish — kredensiallarni topshirish riski. Hisob darhol bloklanadi va xavfsizlik tekshiruvi ochiladi.',
      },
    },
    debrief: {
      title: 'Mashgʻulot natijasi',
      score: 'Baho',
      tipsTitle: 'Asosiy xulosalar',
      tips: [
        'DMARC/SPF fail — birinchi red-flag.',
        'HTTPS yoʻq qisqartirilgan havola — har doim shubhali.',
        'Tezkorlik bosimi (5-10 daq) — klassik phishing taktikasi.',
        '.exe ilovalarni hech qachon ochmang.',
        'SOC ga yuborish — jamoa himoyasini ochadi.',
      ],
    },
  },
  fraudScenario: {
    title: 'Mule hisob aniqlash',
    subtitle: 'FRAUD-204 · velocity anomalya',
    proctorIntro:
      'Fraud monitor konsoli oldidasiz. Tizim flagged hisob aniqladi — vaziyatni oʻrganing.',
    caseContext: {
      tag: 'Vaziyat · Fraud monitoring · 09:40 Chorshanba',
      context:
        'Chorshanba ertalab 09:40. Siz Toshkent-1 navbatchi fraud analitiksiz. Tizim hisob 20214…7711 ni flagged qildi. Hisob 11 kun avval ochilgan, egasi — Sherzod Yusupov, INN 30412840190008. Bugun 09:00 dan 09:32 gacha — 32 daqiqa ichida — 11 ta turli hisobdan 14 ta kirim oʻtkazma keldi, har biri 50-300 ming UZS. Hammasi darhol bitta tashqi xorijiy kartaga 1.8 mln UZS card top-up sifatida yuborildi. AI velocity skor 9.4x (peer-median dan 9.4 marta yuqori). Mijoz bilan suhbat yoʻq — tizim aniqlagan vaziyat.',
      whatYouSee: [
        'Kirim: 14 ta oʻtkazma · 50-300k UZS har biri · 11 ta turli yuboruvchi hisobdan · 32 daqiqa ichida.',
        'Chiqim: 1.8 mln UZS · bitta xorijiy karta ga card top-up · darhol.',
        'Hisob yoshi: 11 kun · egasi Sherzod Yusupov · INN 30412840190008.',
        'AI velocity skor: 9.4x peer-median (chegara — 5x).',
      ],
      whatYouHear: [
        'KYC suhbatidan (hisob ochilganda): «biznes faoliyatim yoʻq, hisob faqat oylik uchun».',
        'AI ogohlantirish: «mule schemasi pattern aniqlandi — darhol koʻrib chiqing».',
      ],
      begin: 'Tahlilni boshlash',
    },
    proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
    notification: {
      tag: 'Fraud monitor ogohlantirishi',
      title: 'Velocity anomalya aniqlandi',
      subtitle: 'Hisob 20214…7711 · 9.4x odatdagi',
      meta: 'FRAUD-204 · 10 daqiqada qaror',
      cta: 'Hisobni ochish',
    },
    txPanel: {
      tag: 'CRM · MULE TAHLILI',
      client: 'Sherzod Yusupov',
      clientMeta: 'INN 30412840190008 · Yangi hisob (11 kun) · 14 kichik oʻtkazma',
      indicators: {
        velocity: { label: 'Velocity', unit: 'x odatdagi', hint: '> 5x — high risk' },
        inbound: { label: 'Kirim', value: '14 ta', hint: 'Kichik miqdor (50K-300K)' },
        outbound: { label: 'Chiqim', value: '14 ta', hint: 'Bir xil kun · 30 daqiqada' },
        age: { label: 'Hisob yoshi', unit: 'kun', hint: '< 30 kun — yangi' },
      },
      timeline: [
        { time: '08:12', text: 'Hisob 50K UZS bilan ochildi (11 kun avval)' },
        { time: '09:00', text: 'Bugun: 14 ta kirim · 50-300K har biri' },
        { time: '09:32', text: 'Hammasi 30 daq ichida tashqi karta ga oʻtkazildi' },
        { time: '09:40', text: 'AI velocity skor: 9.4x' },
      ],
      yourTask: 'Sizning qaroringiz',
      taskHint: 'Bitta toʻgʻri javobni tanlang.',
      timelineLabel: 'Voqealar tartibi',
    },
    actions: {
      freeze: 'Hisobni darhol bloklash',
      freezeHint: 'Chiqimlar toʻxtatiladi · Fraud team 1 soat ichida',
      escalate: 'Fraud teamga eskalatsiya',
      escalateHint: 'Block emas, lekin kuzatish · 4 soat',
      monitor: 'Faqat kuzatish',
      monitorHint: 'XATAR · pul oqimi davom etadi',
    },
    proctorFeedback: {
      correct:
        'Aʼlo. 9.4x velocity + yangi hisob + 14 ta kichik kirim — klassik mule pattern. Block — yagona toʻgʻri yoʻl.',
      escalateOk:
        'Yaxshi, lekin block kechiktirilsa pul chiqib ketadi. Mule patternda block birinchi qadam boʻlishi kerak.',
      monitorFail:
        'XATAR. Mule hisobni kuzatishda qoldirish — qoʻshimcha 30-50 mln UZS chiqib ketishi mumkin. Audit shaxsiy javobgarlik yuklaydi.',
    },
    screen: {
      dashboard: {
        title: 'Fraud monitor · Toshkent-1',
        client: 'Bugungi flagged: 7 hisob',
        cards: {
          account: 'Faol hisob',
          velocity: 'Velocity',
          age: 'Yosh',
        },
      },
      analysis: {
        title: 'Mule pattern belgilari',
        items: [
          'Yangi hisob (11 kun)',
          '14 ta kichik kirim · 30 daq ichida',
          'Hammasi tashqi karta ga oʻtkazildi',
          'AI velocity skor: 9.4x',
        ],
      },
      endCorrect: {
        title: 'Hisob bloklandi',
        subtitle: 'Fraud team 1 soat ichida tahlil qiladi',
      },
      endPartial: {
        title: 'Fraud teamga eskalatsiya qilindi',
        subtitle: 'Block 4 soat ichida koʻrib chiqiladi',
      },
      endFail: {
        code: 'FRAUD-204',
        title: 'Mule hisobini kuzatishda qoldirish',
        body:
          'Velocity 5x dan oshganda hisobni darhol bloklash kerak. Kuzatish rejimi pul oqimini toʻxtatmaydi va qoʻshimcha zarar yetkazadi.',
      },
    },
    debrief: {
      title: 'Mashgʻulot natijasi',
      score: 'Baho',
      tipsTitle: 'Asosiy xulosalar',
      tips: [
        'Velocity > 5x — darhol block.',
        'Yangi hisob (< 30 kun) + koʻp oʻtkazmalar — mule belgisi.',
        'Bir kunda 10+ kirim/chiqim — patternga oid.',
        'Mule schemada vaqt — pul. Block birinchi qadam.',
        'Kuzatish — faqat past riskdagi hollarda.',
      ],
    },
  },
  cxScenario: {
    title: 'Qiyin mijoz — manzil oʻzgartirish',
    subtitle: 'CX-118 · de-eskalatsiya va verifikatsiya',
    proctorIntro:
      'Mijoz xizmati liniyasi oldidasiz. Premium mijozdan qoʻngʻiroq keldi — vaziyatni oʻrganing.',
    caseContext: {
      tag: 'Vaziyat · Premium support · 14:05 Payshanba',
      context:
        'Payshanba kuni 14:05. Siz Premium support liniyasining navbatchi konsultantisiz. Qoʻngʻiroq qiladi Mavluda Tursunova (INN 30312840290101), 6.2 yil bizning mijozimiz, NPS 9.1. U manzilini darhol oʻzgartirishni soʻraydi — "samolyotga ulgurish kerak, hozir oʻzgartiring". 2FA qurilmasi yoʻq — "yoʻqotdim, vaqt yoʻq pasportim ham yoʻq" deydi. Manzil oʻzgartirish KYC §3.4 boʻyicha yuqori risk operatsiya: 2FA yoki filial verifikatsiyasi talab qilinadi. Mijoz baqirishni boshlaydi, ovozi keskinlashadi.',
      whatYouSee: [
        'CRM: Mavluda Tursunova · INN 30312840290101 · Premium · 6.2 yil tenure · NPS 9.1.',
        'Kanal: telefon (Premium liniya) · audio identifikatsiya faqat ovoz boʻyicha · 2FA aktiv emas.',
        'Soʻrov: manzil oʻzgartirish · KYC §3.4 yuqori risk · 5 daqiqada qaror talab qilinadi.',
      ],
      whatYouHear: [
        '«Manzilni hozir oʻzgartiring, samolyotga ulgurish kerak.»',
        '«2FA qurilmasini yoʻqotdim, vaqtim yoʻq, pasport ham yoʻnimda emas.»',
      ],
      begin: 'Tahlilni boshlash',
    },
    proctorMicInstruction: 'Mikrofonni bosing yoki tanlovni bosing.',
    notification: {
      tag: 'Mijoz xizmati',
      title: 'Manzil oʻzgartirish · tezkor',
      subtitle: 'Hisob 20208…0301 · Premium 6.2 yil',
      meta: 'CX-118 · 5 daqiqada qaror',
      cta: 'Soʻrovni ochish',
    },
    txPanel: {
      tag: 'CRM · MIJOZ SOʻROVI',
      client: 'Mavluda Tursunova',
      clientMeta: 'INN 30312840290101 · Premium · 6.2 yil mijoz · NPS 9.1',
      indicators: {
        channel: { label: 'Kanal', value: 'Telefon', hint: 'Audio identifikatsiya' },
        factor: { label: '2FA', value: 'Yoʻq', hint: 'Qurilma yoʻqolgan' },
        tenure: { label: 'Tenure', unit: 'yil', hint: 'Loyal mijoz' },
        urgency: { label: 'Tezkorlik', value: '5 daq', hint: 'Hujjat soʻraladi' },
      },
      timeline: [
        { time: '14:05', text: 'Mijoz qoʻngʻiroq qildi (Premium liniya)' },
        { time: '14:05', text: '"Manzilni hozir oʻzgartiring, samolyotga ulgurish kerak"' },
        { time: '14:06', text: '2FA qurilmasi yoʻq · "yoʻqotdim" dedi' },
        { time: '14:07', text: 'Mijoz baqirishni boshladi' },
      ],
      yourTask: 'Sizning qaroringiz',
      taskHint: 'Bitta toʻgʻri javobni tanlang.',
      timelineLabel: 'Voqealar tartibi',
    },
    actions: {
      verifyChannel: 'Filial orqali verifikatsiya',
      verifyChannelHint: 'Mijoz filialga keladi · pasport bilan',
      partial: 'Audio + 3 nazorat savoli',
      partialHint: 'Telefon orqali · cheklangan',
      override: 'Tezda oʻzgartirish (mijoz baqirayapti)',
      overrideHint: 'XATAR · KYC §3.4 buzilishi',
    },
    proctorFeedback: {
      correct:
        'Aʼlo. 2FA yoʻq · manzil oʻzgartirish — yuqori risk operatsiya. Filial + pasport — KYC §3.4 talab qiladi.',
      partialOk:
        'Yaxshi, lekin 3 ta savol manzil oʻzgartirish uchun yetarli emas. Filial verifikatsiyasi mahkam yoʻl.',
      overrideFail:
        'XATAR. Premium mijoz boʻlsa ham KYC §3.4 buzilmasligi kerak. Audit yuklamadi shaxsiy javobgarlik bermaydi.',
    },
    screen: {
      dashboard: {
        title: 'Mijoz CRM · Toshkent-1',
        client: 'Bugun 17 mijoz · 2 ta verifikatsiya kerak',
        cards: {
          tier: 'Daraja',
          years: 'Yil',
          nps: 'NPS',
        },
      },
      analysis: {
        title: 'Verifikatsiya holati',
        items: [
          'Premium mijoz · 6.2 yil tenure',
          '2FA qurilmasi yoʻq',
          'Telefon orqali soʻrov',
          'Tezkorlik bosimi',
        ],
      },
      endCorrect: {
        title: 'Filial verifikatsiyasi belgilandi',
        subtitle: 'Mijoz pasport bilan keladi · NPS saqlanadi',
      },
      endPartial: {
        title: '3 ta savol verifikatsiyasi',
        subtitle: 'Cheklangan oʻzgartirish · keyin filial tasdiqlaydi',
      },
      endFail: {
        code: 'KYC §3.4',
        title: 'Verifikatsiya talab qilinadi',
        body:
          'Manzil oʻzgartirish — yuqori risk operatsiya. 2FA yoʻq holatda telefon orqali oʻzgartirish — KYC §3.4 buzilishi. Audit shaxsiy javobgarlik yuklaydi.',
      },
    },
    debrief: {
      title: 'Mashgʻulot natijasi',
      score: 'Baho',
      tipsTitle: 'Asosiy xulosalar',
      tips: [
        'Manzil oʻzgartirish — yuqori risk operatsiya (KYC §3.4).',
        '2FA yoʻq holatda — faqat filial verifikatsiyasi.',
        'Empatiya — lekin protokolni buzmaslik.',
        'Tezkorlik bosimi — social engineering belgisi boʻlishi mumkin.',
        'Premium mijoz ham qoidalardan ustun emas.',
      ],
    },
  },
  caseContext: {
    tag: 'Vaziyat',
    whatYouSee: 'Siz nimani koʻrasiz',
    whatYouHear: 'Siz nimani eshitasiz',
    begin: 'Tahlilni boshlash',
  },
  hud: {
    listening: 'Tinglamoqda...',
    thinking: 'Tahlil qilmoqda...',
    speaking: 'Soʻzlamoqda',
    ready: 'Tayyor',
    micHint: 'Bosing yoki bevosita tanlovni bosing',
    aiProctor: 'AI Proctor',
    client: 'Mijoz',
    score: 'Baho',
    xp: 'XP',
    accuracy: 'Aniqlik',
    progress: 'Bajarildi',
  },
};
