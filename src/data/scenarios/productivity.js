export const productivityScenario = {
  id: 'productivity',
  hotspot: 'folder',
  startNodeId: 'briefing',
  brief: {
    face: 'workflow',
    eyebrow: 'OP-PQ-01 · CASE BRIEF',
    client: 'Kunlik operatsion hisobot',
    meta: '6 ta filial · 1200 yozuv · har kuni 09:00',
    severity: 'workflow',
    severityTone: 'sky',
    complaint: '45 daqiqani 3 daqiqaga tushirish',
    task: ['CRM eksport oling', 'Power Query qoʻllang', 'AI tahlil promtini yozing'],
    stats: [
      { label: 'Hozir', value: '45m', tone: 'peach' },
      { label: 'Maqsad', value: '3m', tone: 'mint' },
      { label: 'Filial', value: '6', tone: 'sky' },
    ],
  },
  defaultScreen: { type: 'excel' },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Vazifa: 6 ta filialdan kelgan kunlik operatsion hisobotni bitta yigʻma jadvalga aylantirish va uni har kuni 09:00 da avtomatik yangilash. Hozir bu jarayonni qoʻlda 45 daqiqada bajaryapsiz. Bizning maqsadimiz — 3 daqiqaga tushirish. Tayyormi?',
      choices: [
        { id: 'a', text: 'Tayyorman, boshlaymiz.', nextNodeId: 'source', points: 0 },
      ],
    },
    source: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'excel', live: true },
      text:
        'Birinchi qadam — manba. Maʻlumot CRM tizimidan kunlik CSV sifatida eksport qilinadi. Siz qanday boshlaysiz?',
      choices: [
        {
          id: 'a',
          text: 'CRM-dan CSV eksport qilib, ustun nomlarini va sanani tekshiraman.',
          nextNodeId: 'connect',
          points: 10,
        },
        {
          id: 'b',
          text: 'Filiallarga email yuborib, hisobotni Excelda yuborishni soʻrayman.',
          nextNodeId: 'inefficient_source',
          points: 2,
        },
        {
          id: 'c',
          text: 'Maʻlumotni qoʻlda kiritaman.',
          nextNodeId: 'manual_input',
          points: 0,
        },
      ],
    },
    manual_input: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Qoʻlda kiritish — xato manbai #1. Bir kunlik 200 ta yozuvni qoʻlda kiritishda oʻrtacha 4-6 xato yuzaga keladi. Doim avtomatik manba tanlang.',
      choices: [
        { id: 'a', text: 'Tushundim, CSV eksportdan boshlayman.', nextNodeId: 'connect', points: 0 },
      ],
    },
    inefficient_source: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Email orqali yigʻish — formatlar bir-biriga toʻgʻri kelmaydi, har kim oʻzicha yozadi. Buni qayta tozalash kerak boʻladi. CRM eksport — yagona haqiqat manbai.',
      choices: [
        { id: 'a', text: 'CRM eksport tanlayman.', nextNodeId: 'connect', points: 0 },
      ],
    },
    connect: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'pqRunning', steps: [] },
      text:
        'CSV tayyor. Endi Excelda Power Query orqali ulanish kerak. Quyidagi qaysi yoʻl toʻgʻri?',
      choices: [
        {
          id: 'a',
          text:
            'Data → Get Data → From File → From Folder. Folder yoʻlini koʻrsataman, barcha CSV birga yuklanadi.',
          nextNodeId: 'transform',
          points: 10,
        },
        {
          id: 'b',
          text: 'Har bir CSV-ni alohida ochaman, copy-paste qilaman.',
          nextNodeId: 'manual_paste',
          points: 0,
        },
        {
          id: 'c',
          text: 'Data → From Text/CSV — birinchi faylni yuklayman.',
          nextNodeId: 'partial_import',
          points: 4,
        },
      ],
    },
    manual_paste: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Copy-paste qilish hech qachon avtomatlashtirilmaydi. Power Query-ning Folder ulanishi bilan barcha CSV birga olib kelinadi va har kuni avtomatik yangilanadi.',
      choices: [
        { id: 'a', text: 'Folder ulanishini tanlayman.', nextNodeId: 'transform', points: 0 },
      ],
    },
    partial_import: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Yaxshi boshlanish, lekin 6 ta filial — 6 ta fayl. From Folder yondashuvi barcha fayllarni bir vaqtda yuklaydi va sizga oson ulanish beradi.',
      choices: [
        { id: 'a', text: 'From Folder yondashuvini olaman.', nextNodeId: 'transform', points: 0 },
      ],
    },
    transform: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'pqRunning' },
      text:
        'Maʻlumot Power Query-ga yuklandi. Quyidagi muammolar bor: boʻsh qatorlar, ikki marta yozilgan yozuvlar, sana formati nomos. Power Query-da qaysi qadamlarni qoʻllaysiz?',
      evidence: {
        type: 'policy',
        code: 'OP-PQ-01',
        title: 'Power Query standart tozalash qadamlari',
        body:
          '1) Promote Headers, 2) Remove Empty rows, 3) Remove Duplicates, 4) Change Type (sanani Date qilib), 5) Replace Errors. Har qanday tozalash shu tartibda bajariladi — bu auditga ham mos.',
      },
      choices: [
        {
          id: 'a',
          text:
            'Promote Headers → Remove Empty → Remove Duplicates → Change Type (Date) → Replace Errors.',
          nextNodeId: 'pivot',
          points: 10,
        },
        {
          id: 'b',
          text: 'Har bir qatorni qoʻlda tekshiraman.',
          nextNodeId: 'slow_clean',
          points: 0,
        },
        {
          id: 'c',
          text:
            'Faqat Remove Duplicates — qolgan tozalash kerak emas.',
          nextNodeId: 'incomplete_clean',
          points: 3,
        },
      ],
    },
    slow_clean: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        '1200 qatorni qoʻlda tekshirish — 90 daqiqa. Power Query qadamlari yozib qoʻyilgach, har safar 5 soniya. Doim koʻp marta takrorlanadigan ishni avtomatlashtiring.',
      choices: [
        { id: 'a', text: 'Power Query qadamlarini qoʻllayman.', nextNodeId: 'transform', points: 0 },
      ],
    },
    incomplete_clean: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Yetarli emas. Boʻsh qatorlar Pivot-da xato boʻladi, sana formati mosligi tahlilni buzadi. Toʻliq qadam — OP-PQ-01.',
      choices: [
        { id: 'a', text: 'Toʻliq tozalashni qoʻllayman.', nextNodeId: 'transform', points: 0 },
      ],
    },
    pivot: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'pqRunning', complete: true },
      text:
        'Tozalangan jadval Excelga qaytib yuklandi. Endi yigʻma hisobot — boʻlim boʻyicha sotuv, kunlik trend, statusi "Failed" boʻlganlar. Qanday qilamiz?',
      choices: [
        {
          id: 'a',
          text:
            'Insert → PivotTable. Rows: Boʻlim, Columns: Sana, Values: Soni (Sum). Filter: Status.',
          nextNodeId: 'auto_refresh',
          points: 10,
        },
        {
          id: 'b',
          text: 'SUMIFS formulalarini qoʻlda yozaman.',
          nextNodeId: 'sumif_path',
          points: 5,
        },
      ],
    },
    sumif_path: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'SUMIFS ishlaydi, lekin har gal yangi boʻlim qoʻshilsa formula yangilanmaydi. PivotTable — sof avtomatik. Yangi maʻlumot kelganda faqat Refresh tugmasi.',
      choices: [
        { id: 'a', text: 'PivotTable bilan davom etaman.', nextNodeId: 'auto_refresh', points: 0 },
      ],
    },
    auto_refresh: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'pqPivot' },
      text:
        'Eng muhim qadam — har kuni 09:00 da avtomatik yangilanish. Excel-da bu qanday qilinadi?',
      choices: [
        {
          id: 'a',
          text:
            'Query Properties → "Refresh data when opening the file" + "Refresh every 60 minutes". Faylni OneDrive-ga saqlab, Power Automate orqali har kuni 09:00 da ochilishini sozlayman.',
          nextNodeId: 'ai_assist',
          points: 10,
        },
        {
          id: 'b',
          text: 'Har kuni qoʻlda Refresh tugmasini bosaman.',
          nextNodeId: 'manual_refresh',
          points: 2,
        },
        {
          id: 'c',
          text:
            '"Refresh on open" qoʻyaman — faylni har kuni ochishimga toʻgʻri keladi.',
          nextNodeId: 'ai_assist',
          points: 6,
        },
      ],
    },
    manual_refresh: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Qoʻlda Refresh — siz dam olganda yoki kasal boʻlganda hisobot yangilanmaydi. Power Automate yoki "Refresh on open" — toʻliq avtomatik.',
      choices: [
        { id: 'a', text: 'Avtomatik yangilanishni sozlayman.', nextNodeId: 'auto_refresh', points: 0 },
      ],
    },
    ai_assist: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'pqPivot' },
      text:
        'Soʻnggi qadam — AI yordamida tahlil. Pivot natijani AI yordamchiga koʻrsatib, asosiy tendentsiyalarni soʻrayman. Qaysi prompt toʻgʻri?',
      choices: [
        {
          id: 'a',
          text:
            '"Mana 6 ta filialning 14 kunlik operatsion sonlari. 3 ta eng katta trendni va 2 ta istisnoni 60 soʻzdan kam tushuntiring. Format: bullet list."',
          nextNodeId: 'finish',
          points: 10,
        },
        {
          id: 'b',
          text: '"Hisobotni tahlil qil."',
          nextNodeId: 'vague_prompt',
          points: 2,
        },
        {
          id: 'c',
          text: '"Bu maʻlumotda nima qiziq?"',
          nextNodeId: 'vague_prompt',
          points: 3,
        },
      ],
    },
    vague_prompt: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Yaxshi prompt 4 ta narsani belgilaydi: kontekst (qanday maʻlumot), maqsad (nima topish), miqdor (necha ta natija), format (qanday koʻrinishda). "Tahlil qil" — javob ham noaniq boʻladi.',
      choices: [
        { id: 'a', text: 'Aniqroq prompt yozaman.', nextNodeId: 'ai_assist', points: 0 },
      ],
    },
    finish: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'Avtomatlashtirildi',
        subtitle: 'OP-PQ-01 jarayoni 09:00 da har kuni o`zi ishga tushadi.',
        flash: true,
      },
      text:
        'Tayyor. Endi har kuni 09:00 da hisobot avtomatik yangilanadi, AI tahlili tayyor boʻlib turadi. 45 daqiqalik ish — 3 daqiqaga tushdi. Bu vaqt boshqa qiymatli ishlarga sarflanadi.',
      choices: [
        { id: 'a', text: 'Yakunlash', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'Manba — yagona avtomatik manba (CRM/tizim eksport), email/qoʻl emas.',
        'OP-PQ-01: Power Query qadamlari — Promote → Remove Empty → Remove Duplicates → Change Type → Replace Errors.',
        'From Folder — bir nechta CSV birga yuklash uchun.',
        'PivotTable — qoʻl formulalardan tezroq va avtomatik.',
        '"Refresh on open" + Power Automate — har kuni 09:00 da avtomatik yangilanish.',
        'AI prompt: kontekst + maqsad + miqdor + format. Aniq prompt = aniq natija.',
      ],
    },
  },
};
