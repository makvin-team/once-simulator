export const knowledgeBase = [
  {
    id: 'aml-large-cash',
    question: 'AML qoidasi: 50 mln so‘mdan ortiq naqd to‘lov keldi — nima qilish kerak?',
    citation: 'AML reglamenti v2.4 · §4.2',
    answer:
      'CTR (Currency Transaction Report) shakli to‘ldiriladi va 24 soat ichida Compliance bo‘limiga yuboriladi. Mijozdan mablag‘ manbasi haqida hujjat (ish haqi spravkasi, savdo shartnomasi, meros dalili) so‘raladi. Manba isbotlanmasa — operatsiya rad etiladi va SAR (Suspicious Activity Report) shakli to‘ldiriladi.',
    tags: ['AML', 'CTR', 'naqd'],
  },
  {
    id: 'kyc-update',
    question: 'KYC ma’lumotini qachon yangilash kerak?',
    citation: 'KYC tartibi · §2.1',
    answer:
      'Standart mijoz uchun har 3 yilda bir marta. Yuqori risk mijozlari (PEP, naqd savdo, geografik risk) uchun har 12 oyda. Hujjat o‘zgargan (familiya, fuqarolik, manzil) — darhol yangilanadi. Yangilanmasa hisob "Limited" rejimga o‘tadi.',
    tags: ['KYC', 'compliance'],
  },
  {
    id: 'abs-customer-search',
    question: 'ABS tizimida mijozni qanday tezkor topish mumkin?',
    citation: 'ABS foydalanuvchi qo‘llanma · 3-bob',
    answer:
      'F4 (Search) — INN, pasport seriyasi yoki hisob raqamiga ko‘ra qidiruv. Yaxshi amaliyot: ism orqali emas, INN orqali qidiring — bu noto‘g‘ri hisobga kirishni oldini oladi. Yopiq hisoblar uchun Ctrl+H — Archive search.',
    tags: ['ABS', 'workflow'],
  },
  {
    id: 'phishing-report',
    question: 'Shubhali xat kelganda kimga xabar beraman?',
    citation: 'IB-301 · Phishing protokoli',
    answer:
      'Xatni o‘chirmang. Sec Ops ga forward qiling: secops@bank.uz. Tezkor holatlar uchun 78-140-7777 (24/7). Havolani bosgan bo‘lsangiz: kabelni darhol uzing, parolni o‘zgartiring, IT-ga xabar bering.',
    tags: ['xavfsizlik', 'phishing'],
  },
  {
    id: 'deepfake-call',
    question: 'Boshliqdan kelgan qo‘ng‘iroq parol so‘rasa nima qilaman?',
    citation: 'IB-405 · Ovozli soʻrov protokoli',
    answer:
      'Hech qachon telefon orqali parol, OTP yoki kalit aytmang — hatto ovoz tanish bo‘lsa ham. Deepfake 30 soniyalik ovozdan namuna ola oladi. Protokol: qo‘ng‘iroqni uzing, ichki katalogdagi rasmiy raqamga o‘zingiz qo‘ng‘iroq qiling yoki Teams orqali tasdiqlang.',
    tags: ['deepfake', 'xavfsizlik'],
  },
  {
    id: 'dress-code',
    question: 'Front-office xodimi uchun dress code qanday?',
    citation: 'HR-022 · Etiket va ko‘rinish',
    answer:
      'Erkaklar: kostyum yoki klassik shim + ko‘ylak, galstuk majburiy emas. Ayollar: ofis ko‘ylagi, etak yoki shim. Bank logosi badge har doim ko‘rinib turishi shart. Ish soatida telefon ringtonsiz (vibrate), hidli parfyumeriyadan saqlaning.',
    tags: ['etiket', 'HR'],
  },
  {
    id: 'visitor-control',
    question: 'Bosh ofisdan IT texnik kelsa qanday qabul qilaman?',
    citation: 'SEC-110 · Tashrif boshqaruvi',
    answer:
      'Tashriflar oldindan VMT (Visitor Management Tool) tizimida 24 soat avval ro‘yxatga olinadi. Tashrif sodir bo‘lganda: 1) badge va ID tekshiring, 2) ichki katalog orqali yuboruvchi rahbar bilan shaxsan tasdiqlang, 3) tashrif Sec Ops jurnaliga yoziladi. Hujjat yo‘q yoki tasdiq yo‘q — kirish berilmaydi.',
    tags: ['SEC', 'xavfsizlik', 'tashrif'],
  },
];

export const samplePrompts = [
  'AML naqd to‘lov limiti qancha?',
  'KYC qanchada yangilanadi?',
  'ABS-da mijozni qidirish',
  'Phishing xatni kimga yuboraman?',
  'Tashriflarni qanday tekshiraman?',
];
