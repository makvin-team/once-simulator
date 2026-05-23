export const amlRedFlagsScenario = {
  id: 'amlRedFlags',
  hotspot: 'client',
  startNodeId: 'briefing',
  brief: {
    face: 'client',
    eyebrow: 'AML · CASE BRIEF',
    client: 'Bekzod Karimov',
    meta: 'INN 30312840290052 · Hisob 20208…0419',
    severity: 'red-flag',
    severityTone: 'rose',
    complaint: '187 mln so‘m naqd to‘lov · manba hujjati yo‘q',
    task: ['Red-flag belgilarini sanang', 'CTR/SAR qaroriga keling', 'Tipping-off taqibidan saqlaning'],
    stats: [
      { label: 'Summa', value: '187M', tone: 'peach' },
      { label: 'Risk', value: '74', tone: 'rose' },
      { label: 'Limit', value: '50M', tone: 'butter' },
    ],
  },
  defaultScreen: {
    type: 'dashboard',
    client: 'Bekzod Karimov · INN 30312840290052',
    cards: [
      { label: 'Hisob', value: '20208…0419', tint: '#A6D8FF' },
      { label: 'Operatsiya', value: '187 mln', tint: '#FFB68A' },
      { label: 'Risk skor', value: '74', tint: '#FFD86B' },
    ],
  },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Stsenariy: mijoz 187 mln so‘m naqd to‘lov olib keldi. Manba uchun hujjat yo‘q, qabul qilish uchun shoshilmoqda. Sizning vazifangiz — AML reglamenti v2.4 bo‘yicha red-flag‘larni aniqlash va to‘g‘ri choralarni qabul qilish.',
      choices: [
        { id: 'a', text: 'Tushundim, davom etamiz.', nextNodeId: 'greeting', points: 0 },
      ],
    },
    greeting: {
      speaker: 'client',
      name: 'Bekzod aka',
      mood: 'neutral',
      text:
        'Assalomu alaykum. 187 millionni hisobimga qo‘yishim kerak — bugun ish kunining oxirigacha. Tez bo‘lsangiz, kechqurun samolyotga chiqishim kerak.',
      choices: [
        {
          id: 'a',
          text:
            'Albatta yordam beramiz. Lekin 50 mln dan ortiq naqd to‘lov uchun mablag‘ manbasi haqida hujjat ko‘rishim kerak.',
          nextNodeId: 'ask_source',
          points: 10,
        },
        {
          id: 'b',
          text: 'Kechqurun shubhali tuyulyapti, lekin mijoz tezkor — qabul qilaman.',
          nextNodeId: 'wrong_accept',
          points: 0,
        },
        {
          id: 'c',
          text: 'Manbasini so‘ramayman, hujjatlari ko‘p kerak emas.',
          nextNodeId: 'wrong_accept',
          points: 0,
        },
      ],
    },
    wrong_accept: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR. 50 mln so‘mdan ortiq naqd to‘lov uchun CTR shakli majburiy. Hujjatsiz qabul qilsangiz, audit shaxsiy javobgarlik yuklaydi va jinoiy ishga qo‘shilish xavfi tug‘iladi.',
      evidence: {
        type: 'policy',
        code: 'AML v2.4 §4.2',
        title: 'Yirik naqd to‘lov uchun talab',
        body:
          '50 mln so‘mdan ortiq naqd to‘lov: 1) CTR (Currency Transaction Report) to‘ldiriladi, 2) mablag‘ manbasi haqida hujjat qabul qilinadi, 3) shubha mavjud bo‘lsa SAR ham yuboriladi. Hujjat bo‘lmasa — operatsiya rad etiladi.',
      },
      choices: [
        { id: 'a', text: 'Tushundim, qaytadan urinaman.', nextNodeId: 'greeting', points: 0 },
      ],
    },
    ask_source: {
      speaker: 'client',
      name: 'Bekzod aka',
      mood: 'angry',
      text:
        'Bu shaxsiy pulim! Mendan qoplash so‘rashga haqqingiz yo‘q. Boshqa banklarda bunday savol bermaydi.',
      choices: [
        {
          id: 'a',
          text:
            'Tushunaman, lekin bu Markaziy bank talabi. Ish haqi spravkasi, savdo shartnomasi yoki meros dalili — istalgan birini ko‘rsatishingiz mumkin.',
          nextNodeId: 'red_flags',
          points: 10,
        },
        {
          id: 'b',
          text: 'Mayli, hujjatsiz qabul qilaman.',
          nextNodeId: 'wrong_accept',
          points: 0,
        },
        {
          id: 'c',
          text: 'Ozgina kuting, men menejer bilan gaplashaman.',
          nextNodeId: 'escalate_path',
          points: 6,
        },
      ],
    },
    escalate_path: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Menejerga eskalatsiya yaxshi qadam, lekin red-flag‘larni o‘zingiz ham aniqlay olishingiz kerak. Eskalatsiyadan oldin holatni hujjatlashtiring.',
      choices: [
        { id: 'a', text: 'Avval o‘zim red-flag‘larni tahlil qilaman.', nextNodeId: 'red_flags', points: 0 },
      ],
    },
    red_flags: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: {
        type: 'analysis',
        items: [
          'Mablag` manbasi noaniq bo`lgan katta naqd to`lov',
          'Operatsiyani tez bajarish bo`yicha bosim',
          'Mijoz manba haqida savollardan qochishi',
          'Mijoz "boshqa banklarda so`ramaydi" deyishi (qiyoslash)',
        ],
      },
      text:
        'Endi belgilarni tahlil qilaylik. AML reglamenti v2.4 da 5 ta klassik red-flag bor. Qaysilari ushbu holatda mavjud?',
      evidence: {
        type: 'analysis',
        items: [
          'Mablag‘ manbasi noaniq bo‘lgan katta naqd to‘lov',
          'Operatsiyani tez bajarish bo‘yicha bosim',
          'Mijoz manba haqida savollardan qochishi',
          'Mijoz "boshqa banklarda so‘ramaydi" deyishi (qiyoslash)',
        ],
      },
      choices: [
        {
          id: 'a',
          text:
            '4 ta red-flag mavjud — bu yuqori risk. SAR (Suspicious Activity Report) tayyorlash kerak.',
          nextNodeId: 'sar_decision',
          points: 10,
        },
        {
          id: 'b',
          text: 'Faqat naqd to‘lov belgisi bor, qolgani normal.',
          nextNodeId: 'underestimate',
          points: 2,
        },
        {
          id: 'c',
          text: 'Red-flag yo‘q, mijoz oddiy.',
          nextNodeId: 'underestimate',
          points: 0,
        },
      ],
    },
    underestimate: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Belgilarni kam baholash AML buzilishining eng tipik sababi. Hech bo‘lmaganda 3 ta belgi bor — bu SAR uchun yetarli asos.',
      choices: [
        { id: 'a', text: 'Qaytadan tahlil qilaman.', nextNodeId: 'red_flags', points: 0 },
      ],
    },
    sar_decision: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Endi to‘g‘ri qadamlar ketma-ketligi nimadan iborat? Mijoz hali stol oldida turibdi.',
      choices: [
        {
          id: 'a',
          text:
            'Operatsiyani hozir bajarmayman. Mijozga "kelgusi ish kuni manba hujjati bilan qaytishingizni so‘raymiz" deyman. SAR shakli to‘ldirib Compliance ga 24 soat ichida yuboraman.',
          nextNodeId: 'closure',
          points: 10,
        },
        {
          id: 'b',
          text:
            'Operatsiyani bajaraman, keyin SAR yozaman.',
          nextNodeId: 'wrong_order',
          points: 2,
        },
        {
          id: 'c',
          text: 'Mijozga "siz shubhalisiz" deyman.',
          nextNodeId: 'tipping_off',
          points: 0,
        },
      ],
    },
    wrong_order: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Operatsiya bajarilgach, mablag‘ tizimga kiradi va keyingi tahlil qiyinlashadi. Shubhali operatsiya — birinchi navbatda to‘xtatiladi.',
      choices: [
        { id: 'a', text: 'To‘g‘ri ketma-ketlikni tanlayman.', nextNodeId: 'sar_decision', points: 0 },
      ],
    },
    tipping_off: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'BU JINOIY HARAKAT. Tipping-off — mijozga uning shubhalanayotganini bildirish. AML qonun-qoidalarining eng og‘ir buzilishi. Mijozga hech qachon "siz shubhalisiz" deyilmaydi.',
      evidence: {
        type: 'policy',
        code: 'AML v2.4 §7.1',
        title: 'Tipping-off taqiqi',
        body:
          'Mijozga uning haqida SAR yuborilayotganini, shubhalanilayotganini yoki tekshirilayotganini bildirish qat’iyan taqiqlanadi. Jinoiy javobgarlik. Mijozga faqat "hujjat kerak" yoki "Compliance ko‘rib chiqadi" deb aytiladi.',
      },
      choices: [
        { id: 'a', text: 'Qaytadan urinaman.', nextNodeId: 'sar_decision', points: 0 },
      ],
    },
    closure: {
      speaker: 'client',
      name: 'Bekzod aka',
      mood: 'angry',
      text:
        'Bu yer hech qachon yordam bermaydi! Boshqa bankka boraman.',
      choices: [
        {
          id: 'a',
          text:
            'Tushunaman, lekin biz har bir mijozga bir xil tartibni qo‘llaymiz. Hujjat bilan qaytsangiz — 5 daqiqada hal qilamiz.',
          nextNodeId: 'wrap',
          points: 10,
        },
        {
          id: 'b',
          text: 'Mayli, men ham xudo bilan.',
          nextNodeId: 'wrap',
          points: 4,
        },
      ],
    },
    wrap: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'SAR Compliance ga yuborildi',
        subtitle: 'AML v2.4 §4.2 protokol bajarildi · 24 soat ichida javob.',
        flash: true,
      },
      text:
        'Mijoz norozi ketdi, lekin siz qoidaga rioya qildingiz. SAR yuboring va menejerni xabardor qiling. Yana 24 soat ichida Compliance javob beradi.',
      choices: [
        { id: 'a', text: 'SAR yozaman.', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        '50 mln+ naqd — CTR majburiy (AML v2.4 §4.2).',
        'Mablag‘ manbasi hujjati so‘rash mijozga noqulay tuyulsa ham — qonun talabi.',
        'Tezkorlik bo‘yicha bosim, savollardan qochish, qiyoslash — red-flag‘lar.',
        'SAR to‘ldirilganini mijozga aytmang — tipping-off jinoyat.',
        'Shubhali operatsiya — avval to‘xtatiladi, keyin tekshiriladi.',
      ],
    },
  },
};
