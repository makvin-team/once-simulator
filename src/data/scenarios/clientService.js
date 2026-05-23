export const clientServiceScenario = {
  id: 'clientService',
  hotspot: 'client',
  startNodeId: 'arrival',
  brief: {
    face: 'client',
    eyebrow: 'CASE BRIEF',
    client: 'Akmal Rahimov',
    meta: '38 yosh · ID UZ-487391 · Toshkent-1',
    severity: 'urgent',
    severityTone: 'rose',
    complaint: 'Manzil tasdiqnomasi · viza intervyuyi 14:00',
    task: ['Hamdardlik bildiring', 'KYC hujjatlarini tekshiring', 'CRM yozuvini yarating'],
    stats: [
      { label: 'Hisob', value: '20208…', tone: 'sky' },
      { label: 'NPS', value: '8.4', tone: 'mint' },
      { label: 'Tashrif', value: '3-chi', tone: 'butter' },
    ],
  },
  defaultScreen: {
    type: 'dashboard',
    client: 'Akmal Rahimov · ID #UZ-487391',
    cards: [
      { label: 'Kutilayotgan', value: '3', tint: '#FFB68A' },
      { label: 'Bugun xizmat', value: '17', tint: '#A8E5C8' },
      { label: 'NPS', value: '8.4', tint: '#A6D8FF' },
    ],
  },
  defaultMood: 'angry',
  nodes: {
    arrival: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Stsenariy: norozi mijoz qabul stolingiz oldida. U ertalab manzil tasdiqnomasi soʻragan, lekin yarim soat hech qanday javob olmagan. Maqsadingiz: vaziyatni yumshatish, KYC qoidalariga rioya qilgan holda muammoni yakunlash. Tayyormisiz?',
      choices: [
        {
          id: 'a',
          text: 'Tayyorman, mijozga eʻtibor qarataman.',
          nextNodeId: 'greeting',
          points: 0,
        },
      ],
    },
    greeting: {
      speaker: 'client',
      name: 'Akmal aka',
      mood: 'angry',
      text:
        'Assalomu alaykum. Men bugun ertalab kelganimda menga juda sovuq munosabatda boʻlishdi. Yarim soat kutdim. Bu qabul qilib boʻlmas holat!',
      choices: [
        {
          id: 'a',
          text:
            'Vaqtingizni ajratganingiz uchun rahmat. Sizni eshityapman, iltimos batafsil aytib bering.',
          nextNodeId: 'listen_calmly',
          points: 10,
        },
        {
          id: 'b',
          text: 'Boshqa xodim aybdor edi, men hech narsa qila olmayman.',
          nextNodeId: 'defensive',
          points: 0,
        },
        {
          id: 'c',
          text: 'Bu sizning xato tushunchangiz boʻlishi mumkin.',
          nextNodeId: 'defensive',
          points: 0,
        },
        {
          id: 'd',
          text: 'Tinchlaning va navbatga oʻtiring.',
          nextNodeId: 'defensive',
          points: 0,
        },
      ],
    },
    defensive: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'angry',
      text:
        'Esda tuting: mijozning emotsiyasini tan olish — birinchi qadam. Ichki tashkilotga ayb yuklash mijoz uchun ahamiyatsiz. Javobgarlikni oʻz ustingizga oling, hatto xato sizniki boʻlmasa ham.',
      evidence: {
        type: 'policy',
        code: 'CS-101',
        title: 'Mijoz bilan suhbat protokoli',
        body:
          'Har qanday norozilik holatida: 1) eshitish, 2) hamdardlik, 3) yechim taklif qilish. Hech qachon mijoz oldida ichki tashkilotni ayblamang.',
      },
      choices: [
        { id: 'a', text: 'Tushundim, qaytadan urinaman.', nextNodeId: 'greeting', points: 0 },
      ],
    },
    listen_calmly: {
      speaker: 'client',
      name: 'Akmal aka',
      mood: 'angry',
      text:
        'Men oddiy manzil tasdiqnomasi soʻradim — pasportim oʻzgargan, yangi yashash joyim Yunusobod tumanida. Yarim soat kutdim, hech kim menga qiziqish bildirmadi. Hozir kerak, ertaga viza topshirishim kerak.',
      choices: [
        {
          id: 'a',
          text:
            'Tushunaman, viza muddati zich. Bu xatolik uchun uzr soʻrayman. Hozir oʻzim shaxsan yordam beraman.',
          nextNodeId: 'verify_identity',
          points: 10,
        },
        {
          id: 'b',
          text: 'Maʻlumotnoma uchun navbat tartibi bor, kuting.',
          nextNodeId: 'cold_response',
          points: 0,
        },
        {
          id: 'c',
          text: 'Iltimos, ertaga qaytib keling.',
          nextNodeId: 'cold_response',
          points: 0,
        },
      ],
    },
    cold_response: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Bu javob mijozni yanada uzoqlashtiradi va NPS koʻrsatkichini pasaytiradi. Avval hamdardlik, soʻngra aniq yechim — qoidaga rioya qiling.',
      choices: [
        { id: 'a', text: 'Yumshoqroq javob beraman.', nextNodeId: 'listen_calmly', points: 0 },
      ],
    },
    verify_identity: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'calm',
      text:
        'Toʻgʻri yondashuv. Manzil tasdiqnomasi uchun KYC qoidasi boʻyicha quyidagilarni soʻrashingiz kerak: pasport, propiska maʻlumoti, soʻnggi 3 oylik kommunal toʻlov. Mijozdan nimani soʻraysiz?',
      evidence: {
        type: 'policy',
        code: 'KYC-204',
        title: 'Manzil tasdiqnomasi uchun talab qilinadigan hujjatlar',
        body:
          'a) Amaldagi pasport (asl nusxa), b) Propiska sahifasi nusxasi, c) Soʻnggi 3 oy ichidagi kommunal toʻlov kvitansiyasi yoki bank koʻchirmasi. Hujjat boʻlmasa — tasdiqnoma berilmaydi.',
      },
      choices: [
        {
          id: 'a',
          text:
            'Pasport, propiska sahifasi va soʻnggi 3 oylik kommunal toʻlov kvitansiyasi.',
          nextNodeId: 'documents_ok',
          points: 10,
        },
        {
          id: 'b',
          text: 'Faqat pasport yetarli.',
          nextNodeId: 'wrong_docs',
          points: 0,
        },
        {
          id: 'c',
          text:
            'Pasport va INN raqami.',
          nextNodeId: 'wrong_docs',
          points: 2,
        },
      ],
    },
    wrong_docs: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'KYC-204 qoidasi boʻyicha bir nechta hujjat zarur. Yetarli boʻlmagan tekshiruv keyinroq ichki audit tomonidan ushlanadi va sizga javobgarlik yuklanadi.',
      choices: [
        { id: 'a', text: 'Toʻliq roʻyxatni soʻrayman.', nextNodeId: 'verify_identity', points: 0 },
      ],
    },
    documents_ok: {
      speaker: 'client',
      name: 'Akmal aka',
      mood: 'calm',
      text:
        'Mana, hammasini olib keldim. Pasport, propiska sahifasi va Hududgazning soʻnggi kvitansiyasi.',
      choices: [
        {
          id: 'a',
          text:
            'Rahmat. Hujjatlaringizni tekshirib chiqaman — bir-ikki daqiqada tayyorlayman.',
          nextNodeId: 'cross_check',
          points: 10,
        },
        {
          id: 'b',
          text: 'Ok, men bularni keyin tekshiraman.',
          nextNodeId: 'rushed',
          points: 0,
        },
      ],
    },
    rushed: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Hech qachon hujjatlarni "keyin" tekshirmang. Bu KYC qoidasini buzadi va aldash xavfi tugʻdiradi. Hujjatni qabul qilgan paytda — tekshirish.',
      choices: [
        { id: 'a', text: 'Hozir tekshiraman.', nextNodeId: 'cross_check', points: 0 },
      ],
    },
    cross_check: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Tekshirish: pasportdagi familiya va kvitansiyadagi familiya bir xilmi? Propiska manzili kvitansiya manzili bilan mosmi? Bunday tekshirish nima uchun muhim?',
      choices: [
        {
          id: 'a',
          text:
            'Manzillar mos kelmasa — sохta hujjat boʻlishi mumkin. Tekshiruvni Compliance boʻlimiga yuborish kerak.',
          nextNodeId: 'execute',
          points: 10,
        },
        {
          id: 'b',
          text:
            'Familiya bir xil boʻlsa yetarli, manzilni eʻtiborga olmayman.',
          nextNodeId: 'sloppy',
          points: 0,
        },
        {
          id: 'c',
          text: 'Mijoz aytsa boʻldi, men ishonaman.',
          nextNodeId: 'sloppy',
          points: 0,
        },
      ],
    },
    sloppy: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Bu yondashuv firibgarlik holatlarini ochiq qoldiradi. AML qoidasi boʻyicha har bir maydon mosligi tekshirilishi kerak. Bu nafaqat siz uchun, balki bank uchun ham xavfsizlik.',
      choices: [
        { id: 'a', text: 'Toʻliq tekshiruv oʻtkazaman.', nextNodeId: 'cross_check', points: 0 },
      ],
    },
    execute: {
      speaker: 'client',
      name: 'Akmal aka',
      mood: 'calm',
      text:
        'Yana qancha kutishim kerak? Visa intervyuyi soat 14:00 da.',
      choices: [
        {
          id: 'a',
          text:
            'Tinchlaning, 4 daqiqada hujjat tayyor boʻladi. Bu yerda choy bor, iltimos.',
          nextNodeId: 'closure',
          points: 10,
        },
        {
          id: 'b',
          text:
            'Bilmadim, kuting.',
          nextNodeId: 'vague',
          points: 0,
        },
        {
          id: 'c',
          text: 'Bugun chiqmasa, ertaga qaytib keling.',
          nextNodeId: 'vague',
          points: 0,
        },
      ],
    },
    vague: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Aniq vaqt — mijoz xotirjamligining kalitidir. "Bilmadim" javobi ishonchni yoʻqotadi. Doim aniq son yoki vaqt belgilang.',
      choices: [
        { id: 'a', text: 'Aniq vaqt aytaman.', nextNodeId: 'execute', points: 0 },
      ],
    },
    closure: {
      speaker: 'client',
      name: 'Akmal aka',
      mood: 'satisfied',
      text:
        'Mana, juda sifatli xizmat. Vaqtimni tejadingiz, rahmat. NPS soʻrovida sizni alohida belgilab oʻtaman.',
      choices: [
        {
          id: 'a',
          text:
            'Sizga xizmat koʻrsatish biz uchun ulkan ishonchdir. Visa intervyuyingizga muvaffaqiyat tilayman.',
          nextNodeId: 'wrap',
          points: 10,
        },
        {
          id: 'b',
          text: 'Rahmat.',
          nextNodeId: 'wrap',
          points: 5,
        },
      ],
    },
    wrap: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: {
        type: 'forwarded',
        title: 'CRM-ga yozildi',
        subtitle: 'Tashrif tarixi yaratildi · NPS so`rovi keyingi tashrifda.',
        flash: true,
      },
      text:
        'Tashrif yakunlandi. Eslatma: CRM-da tashrif yozuvini yarating — qaysi hujjat berildi, qaysi xodim xizmat koʻrsatdi. Bu keyingi tashrifda mijoz tarixini tezda topishga yordam beradi.',
      choices: [
        { id: 'a', text: 'CRM-ga yozaman.', nextNodeId: 'end', points: 5 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'Avval hamdardlik bildiring, keyin yechim taklif eting (CS-101).',
        'KYC-204: manzil tasdiqnomasi uchun 3 ta hujjat zarur — pasport, propiska, kvitansiya.',
        'Mijoz oldida boshqa xodimni ayblamang — javobgarlik sizniki.',
        'Aniq vaqt va aniq amal taklif qiling: "4 daqiqada hal qilaman".',
        'Hujjatlar mos kelmasa — Compliance boʻlimiga ogohlantirish.',
        'CRM-ga har tashrifni yozib qoldiring.',
      ],
    },
  },
};
