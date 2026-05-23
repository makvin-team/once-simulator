export const fakeDocumentScenario = {
  id: 'fakeDocument',
  hotspot: 'folder',
  startNodeId: 'briefing',
  brief: {
    face: 'doc',
    eyebrow: 'KYC · CASE BRIEF',
    client: 'Nodirjon Yusupov',
    meta: 'Pasport AA 1497851 · Yangi mijoz',
    severity: 'check needed',
    severityTone: 'butter',
    complaint: 'Hisob ochish · pasport va propiska taqdim etildi',
    task: ['5 bosqichli tekshiruvni qoʻllang', 'ABS bazasini soʻrang', 'Sec Ops bilan koordinatsiya qiling'],
    stats: [
      { label: 'Doc skor', value: '38', tone: 'rose' },
      { label: 'Filial', value: 'Chilonzor', tone: 'sky' },
      { label: 'Risk', value: 'Yuqori', tone: 'peach' },
    ],
  },
  defaultScreen: {
    type: 'dashboard',
    client: 'Nodirjon Yusupov · Pasport AA 1497851',
    cards: [
      { label: 'Soʻrov', value: 'Hisob ochish', tint: '#A6D8FF' },
      { label: 'Filial', value: 'Chilonzor', tint: '#FFD86B' },
      { label: 'Doc skor', value: '38', tint: '#FFB3C0' },
    ],
  },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Stsenariy: yangi mijoz hisob ochmoqchi. Pasport AA 1497851 va propiska sahifasi taqdim etildi. Sizning ishingiz — hujjatlarni AML/KYC bo‘yicha tekshirib, qalbakilash belgilarini topish.',
      choices: [
        { id: 'a', text: 'Boshlaymiz.', nextNodeId: 'first_look', points: 0 },
      ],
    },
    first_look: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'mrz', result: 'pending' },
      text:
        'Pasportni qo‘lga olganingizda birinchi navbatda nima tekshirasiz?',
      evidence: {
        type: 'policy',
        code: 'KYC §3.4',
        title: 'Pasport tekshiruvining 5 bosqichi',
        body:
          '1) Fizik holat (yirtilgan, namlangan, qayta yopishtirilgan), 2) MRZ kod (mashinada o‘qiladigan zona) format mosligi, 3) Foto va shaxsning mosligi, 4) Pasport serial bazada bor-yo‘qligi (ABS-da F4), 5) Suv belgisi va mikroshrift UV chiroqda.',
      },
      choices: [
        {
          id: 'a',
          text:
            'Avval fizik holat, keyin MRZ, foto va ABS bazasidan tekshirish.',
          nextNodeId: 'mrz_check',
          points: 10,
        },
        {
          id: 'b',
          text: 'Faqat foto va familiyani qarayman.',
          nextNodeId: 'shallow',
          points: 2,
        },
        {
          id: 'c',
          text: 'Mijozga ishonaman, hujjatni qabul qilaman.',
          nextNodeId: 'shallow',
          points: 0,
        },
      ],
    },
    shallow: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Sun’iy intellekt yordamida yasalgan qalbaki hujjatlar foto va familiya darajasida tabiiy ko‘rinadi. KYC §3.4 — 5 bosqichli tekshiruv majburiy.',
      choices: [
        { id: 'a', text: 'To‘liq tekshiruv o‘tkazaman.', nextNodeId: 'first_look', points: 0 },
      ],
    },
    mrz_check: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: {
        type: 'mrz',
        result: 'suspicious',
        checks: [
          'MRZ kod o`qildi',
          'ABS seriya: boshqa nom',
          'Sana mosligi: NOMOS',
          'Suv belgisi: yo`q',
        ],
      },
      text:
        'MRZ koddagi tug‘ilgan sana 19831122. Pasport sahifasidagi sana 22.11.1982. Ushbu farqni qanday baholaysiz?',
      evidence: {
        type: 'analysis',
        items: [
          'MRZ: tug‘ilgan sana 1983-11-22',
          'Sahifa: 22.11.1982 (1 yil farq)',
          'Familiya MRZ: YUSUPOV → sahifa: Yusupov ✓',
          'Pasport seriya: AA 1497851',
        ],
      },
      choices: [
        {
          id: 'a',
          text:
            'Ma’lumot nomuvofiqligi qalbakilashning klassik belgisi. Pasportni qabul qilmayman, Compliance ga xabar beraman.',
          nextNodeId: 'abs_lookup',
          points: 10,
        },
        {
          id: 'b',
          text:
            'Bu kichik chop etish xatosi bo‘lishi mumkin, qabul qilaman.',
          nextNodeId: 'minor_dismiss',
          points: 0,
        },
        {
          id: 'c',
          text: 'Mijozdan sababini so‘rayman.',
          nextNodeId: 'ask_client',
          points: 4,
        },
      ],
    },
    minor_dismiss: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Davlat hujjatlarida “chop etish xatosi” yo‘q. Har qanday nomuvofiqlik — qalbakilash gumoni. Buni "kichik" deb hisoblash AML buzilishi.',
      choices: [
        { id: 'a', text: 'Qaytadan baholashga urinaman.', nextNodeId: 'mrz_check', points: 0 },
      ],
    },
    ask_client: {
      speaker: 'client',
      name: 'Nodirjon aka',
      mood: 'angry',
      text:
        'Bu mening pasportim! Pasport stolida xato qilgan bo‘lishlari mumkin, men nima qila olaman?',
      choices: [
        {
          id: 'a',
          text:
            'Tushunaman, lekin biz to‘g‘ri tartibga rioya qilishimiz kerak. ABS-da pasport seriyasini tekshiraman.',
          nextNodeId: 'abs_lookup',
          points: 8,
        },
        {
          id: 'b',
          text: 'Mayli, qabul qilaman.',
          nextNodeId: 'minor_dismiss',
          points: 0,
        },
      ],
    },
    abs_lookup: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: {
        type: 'analysis',
        allVisible: false,
        items: [
          'ABS qaytaradi: seriya AA 1497851 → Mahmudova D.S. (1991)',
          'Mijoz da`vo qilayotgan ism: Yusupov N. (1982)',
          'Familiya, ism, tug`ilgan sana — to`liq mos kelmaydi',
          'Bu identifikatsiya o`g`irligi yoki qalbakilash',
        ],
      },
      text:
        'ABS bazasida AA 1497851 seriyali pasport boshqa shaxs nomida — Mahmudova Dilnoza, 1991-yil tug‘ilgan. Bu nimani anglatadi?',
      evidence: {
        type: 'analysis',
        items: [
          'ABS qaytaradi: seriya AA 1497851 → Mahmudova D.S. (1991)',
          'Mijoz da’vo qilayotgan ism: Yusupov N. (1982)',
          'Familiya, ism, tug‘ilgan sana — to‘liq mos kelmaydi',
          'Bu identifikatsiya o‘g‘irligi yoki qalbakilash',
        ],
      },
      choices: [
        {
          id: 'a',
          text:
            'Aniq qalbakilash. Mijozni ushlab turmayman (xavf), Sec Ops va menejerga signal beraman. Tipping-off qoidasini ham eslayman.',
          nextNodeId: 'protocol',
          points: 10,
        },
        {
          id: 'b',
          text:
            'Mijozni qo‘zg‘atmaslik uchun "tizim xatosi" deyman.',
          nextNodeId: 'stall_path',
          points: 6,
        },
        {
          id: 'c',
          text: 'Mijozga "siz aldoqchisiz" deb to‘g‘ridan-to‘g‘ri ayblayman.',
          nextNodeId: 'wrong_confront',
          points: 0,
        },
      ],
    },
    stall_path: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Yaxshi yondashuv — mijozni xotirjam saqlash. Endi ichki kanal orqali Sec Ops ni xabardor qiling.',
      choices: [
        { id: 'a', text: 'Davom etamiz.', nextNodeId: 'protocol', points: 0 },
      ],
    },
    wrong_confront: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR. To‘g‘ridan-to‘g‘ri ayblash — xodim xavfsizligini buzadi, mijoz bahonalar to‘qib ketishi mumkin. Hujjatni "qo‘shimcha tekshiruv uchun" yopiq tarzda olib qoling, Sec Ops ni xabardor qiling.',
      evidence: {
        type: 'policy',
        code: 'SEC-022',
        title: 'Qalbakilash gumoni — xodim xavfsizligi',
        body:
          'Hech qachon mijozni ochiq ayblamang. "Hujjatni qo‘shimcha tekshiruv kutyapti", "Sizdan rahmat, biroz kuting" iboralaridan foydalaning. Diqqatni jalb qilmasdan kassa qo‘ng‘irog‘ini (panic button) yoki ichki Teams kanalini ishga tushiring.',
      },
      choices: [
        { id: 'a', text: 'Qaytadan urinaman.', nextNodeId: 'abs_lookup', points: 0 },
      ],
    },
    protocol: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'Sec Ops ga signal yuborildi',
        subtitle: 'Ichki ish ochildi · KYC §3.4 protokol bajarildi.',
        flash: true,
      },
      text:
        'To‘g‘ri protokol. Pasportni nusxa olib, asl nusxani "qo‘shimcha tekshiruv" deb saqlab qoling. Sec Ops keladi va ichki ish ochiladi. Sizning yozuvingiz — birlamchi guvohlik.',
      choices: [
        { id: 'a', text: 'Yakunlash', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'KYC §3.4 — pasport tekshiruvi 5 bosqichli: fizik, MRZ, foto, ABS bazasi, UV.',
        'Davlat hujjatlarida “kichik xato” degan narsa yo‘q. Har qanday nomuvofiqlik = gumon.',
        'ABS-da pasport seriyasini har doim tekshiring (F4).',
        'SEC-022: mijozni ochiq aybmang — “qo‘shimcha tekshiruv” deb yopiq harakat qiling.',
        'Sec Ops va menejerga ichki kanal orqali signal yuboring (Teams, panic button).',
      ],
    },
  },
};
