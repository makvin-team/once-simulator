export const socialEngineeringScenario = {
  id: 'socialEngineering',
  hotspot: 'client',
  startNodeId: 'briefing',
  brief: {
    face: 'visitor',
    eyebrow: 'SEC · CASE BRIEF',
    client: '"IT texnik" (Tashrif buyuruvchi)',
    meta: 'Tasdiqlanmagan tashrif · server zaliga kirish soʻrovi',
    severity: 'social-eng',
    severityTone: 'rose',
    complaint: '"Bosh ofisdan keldim, shoshilinch update kerak"',
    task: ['VMT bazasini soʻrang', 'Yuboruvchi rahbarni tasdiqlang', 'Sec Ops ga signal yuboring'],
    stats: [
      { label: 'Badge', value: 'Yoʻq', tone: 'rose' },
      { label: 'VMT', value: 'Yoʻq', tone: 'rose' },
      { label: 'Risk', value: 'Yuqori', tone: 'peach' },
    ],
  },
  defaultScreen: {
    type: 'dashboard',
    client: 'Tashrif buyuruvchi · INN noma’lum',
    cards: [
      { label: 'Tashrif', value: 'IT texnik', tint: '#A6D8FF' },
      { label: 'Tasdiq', value: 'Yo‘q', tint: '#FFB3C0' },
      { label: 'Kirish', value: 'Server zal', tint: '#FFD86B' },
    ],
  },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Filialga "IT texnik" deb tanishtirgan shaxs tashrif buyurdi. U "shoshilinch yangilanish" deb server zaliga kirishni so‘ramoqda. Sizning vazifangiz — ijtimoiy muhandislik hujumini aniqlash.',
      choices: [
        { id: 'a', text: 'Boshlaymiz.', nextNodeId: 'visitor', points: 0 },
      ],
    },
    visitor: {
      speaker: 'client',
      name: 'Texnik',
      mood: 'neutral',
      screen: { type: 'cctv', target: 'Tashrifchi · IT texnik' },
      text:
        'Salom, men markaziy IT dan keldim. Bosh ofis Anvar aka yubordi — bugun server kabinetiga shoshilinch update kerak ekan. Kalit borligini eshitdim, eshikni ochib qo‘ying.',
      choices: [
        {
          id: 'a',
          text:
            'Tashriflar SEC-110 boʻyicha oldindan e’lon qilinadi. Anvar akaga o‘zim qo‘ng‘iroq qilib tasdiqlayman.',
          nextNodeId: 'verify_visitor',
          points: 10,
        },
        {
          id: 'b',
          text: 'Bosh ofis yuborgan boʻlsa kirsa boʻladi.',
          nextNodeId: 'wrong_trust',
          points: 0,
        },
        {
          id: 'c',
          text: 'Avval ID badge va ish guvohnomasini koʻrsataring.',
          nextNodeId: 'check_badge',
          points: 8,
        },
      ],
    },
    wrong_trust: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR. Ijtimoiy muhandislik hujumi aynan shu yondashuvga qaratilgan: rahbar nomini aytib ishonchni qozonish. SEC-110 boʻyicha har qanday tashrif oldindan ro‘yxatdan o‘tadi va ichki kanal orqali tasdiqlanadi.',
      evidence: {
        type: 'policy',
        code: 'SEC-110',
        title: 'Tashriflar va kirish boshqaruvi',
        body:
          'Bosh ofisdan keladigan texnik xodim har doim 24 soat oldin tashrif ro‘yxatga olinadi. Tasdiqlash uchun: 1) ichki katalogdagi rahbar bilan bog‘laning, 2) Visitor Management tizimida (VMT) ID tekshiring, 3) Tashrif Sec Ops jurnaliga yoziladi.',
      },
      choices: [
        { id: 'a', text: 'Qaytadan urinaman.', nextNodeId: 'visitor', points: 0 },
      ],
    },
    check_badge: {
      speaker: 'client',
      name: 'Texnik',
      mood: 'angry',
      text:
        'Badge’ni mashinada qoldirgan ekanman. Anvar aka kutmoqda, men kech qoldim — ishonib eshikni oching, bo‘lmasa rahbaringizga shikoyat qilaman.',
      choices: [
        {
          id: 'a',
          text:
            'Tushunaman, lekin men shaxsiy javobgarlikni olmayman. Bir lahza, Anvar akaga ichki raqam orqali qo‘ng‘iroq qilaman.',
          nextNodeId: 'verify_visitor',
          points: 10,
        },
        {
          id: 'b',
          text: 'Mayli, kiraman.',
          nextNodeId: 'wrong_trust',
          points: 0,
        },
      ],
    },
    verify_visitor: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Anvar aka bilan ichki raqam orqali bog‘landingiz. U "men bunday tashrif yubormaganman" dedi. VMT bazasida ham bu shaxs ro‘yxatda yo‘q. Endi nima qilasiz?',
      choices: [
        {
          id: 'a',
          text:
            'Sec Ops ga signal beraman, "texnik" ni xona oldida ushlab turaman va xushmuomalalik bilan kuting deyman. Ko‘rinishini xotira uchun yozaman.',
          nextNodeId: 'protocol',
          points: 10,
        },
        {
          id: 'b',
          text: '"Siz aldoqchisiz" deb to‘g‘ridan-to‘g‘ri ayblayman.',
          nextNodeId: 'wrong_confront',
          points: 0,
        },
        {
          id: 'c',
          text: '"Tushunmovchilik bor, ishtirok eta olmaymiz" deb chiqarib yuboraman.',
          nextNodeId: 'let_go',
          points: 3,
        },
      ],
    },
    wrong_confront: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR. Ochiq ayblash — xodim xavfsizligini buzadi va aldovchini bahonalar to‘qishga undaydi. SEC-022 ga muvofiq, yopiq harakat kerak.',
      choices: [
        { id: 'a', text: 'Qaytadan urinaman.', nextNodeId: 'verify_visitor', points: 0 },
      ],
    },
    let_go: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Aldovchini chiqarib yuborish — boshqa filialda boshqa nom bilan urinish imkonini beradi. Sec Ops ushlab qolishi va kim kelganini aniqlashi kerak.',
      choices: [
        { id: 'a', text: 'Sec Ops ga signal beraman.', nextNodeId: 'protocol', points: 4 },
      ],
    },
    protocol: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'Sec Ops kelmoqda · 6 daqiqa',
        subtitle: 'Server zali himoyada — tashrif jurnalga yozildi.',
        flash: true,
      },
      text:
        'Sec Ops 6 daqiqada keldi. "Texnik" o‘zining haqiqiy nomini aytishdan bosh tortdi va politsiya chaqirildi. Sizning kuzatuvchanligingiz tufayli filial server zali himoyalandi.',
      choices: [
        { id: 'a', text: 'Yakunlash', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'SEC-110: tashriflar oldindan VMT-da ro‘yxatga olinadi va ichki kanal orqali tasdiqlanadi.',
        'Rahbar nomi va shoshilinchlik — ijtimoiy muhandislikning klassik vositalari.',
        'Badge va ID majburiy — "mashinada qoldirdim" qabul qilinmaydi.',
        'Ichki katalog orqali shaxsan tasdiqlamasdan eshikni ochmang.',
        'Aldovchini ushlab qoling, lekin ochiq ayblamang (SEC-022).',
      ],
    },
  },
};
