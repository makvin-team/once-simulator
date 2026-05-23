export const deepfakeCallScenario = {
  id: 'deepfakeCall',
  hotspot: 'computer',
  startNodeId: 'briefing',
  brief: {
    face: 'call',
    eyebrow: 'IB-405 · CASE BRIEF',
    client: '"Boshliq" qoʻngʻiroqda',
    meta: '+998 90 *** 47 18 · notanish raqam',
    severity: 'deepfake',
    severityTone: 'rose',
    complaint: 'Server parolini zudlik bilan aytib qoʻyish soʻralmoqda',
    task: ['Shubhali belgilarni topring', 'Ovozli soʻrovni rad eting', 'Ichki callback qiling'],
    stats: [
      { label: 'Raqam', value: 'Tashqi', tone: 'rose' },
      { label: 'Soʻrov', value: 'Parol', tone: 'peach' },
      { label: 'Bosim', value: 'Yuqori', tone: 'butter' },
    ],
  },
  defaultScreen: { type: 'boot' },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Telefon jiringladi. Notanish raqam — +998 90 *** 47 18. Ovoz boshlig‘ingizning ovoziga juda o‘xshaydi va u zudlik bilan server parolini so‘ramoqda. Maqsad — IB-405 protokoli bo‘yicha to‘g‘ri javob berish.',
      choices: [
        { id: 'a', text: 'Qabul qilamiz, lekin ehtiyot bilan.', nextNodeId: 'voice_call', points: 5 },
        { id: 'b', text: 'Ovoz pochtaga yo‘naltiraman.', nextNodeId: 'voicemail_path', points: 8 },
      ],
    },
    voicemail_path: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Notanish raqamni voicemail’ga yo‘naltirish — yaxshi himoya. Lekin keling, qabul qilingan stsenariyni ham ko‘rib chiqamiz.',
      choices: [
        { id: 'a', text: 'Davom etamiz.', nextNodeId: 'voice_call', points: 0 },
      ],
    },
    voice_call: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text: 'Qo‘ng‘iroq qabul qilindi. Eshiting va shubhali belgilarni aniqlang.',
      screen: {
        type: 'call',
        from: '+998 90 *** 47 18',
        caller: 'Tashqi raqam · ATS belgisi yo`q',
        deepfakeAlert: true,
        lines: [
          { speaker: '"Boshliq"', text: 'Salom, ofisdan tashqaridaman. Shoshilinch ish bor.' },
          { speaker: '"Boshliq"', text: 'Iltimos, serverning parolini hozir aytib qo`y.' },
          { speaker: '"Boshliq"', text: 'Vaqt yo`q, savol berma — auditorlar kutyapti.' },
        ],
      },
      evidence: {
        type: 'transcript',
        from: '+998 90 *** 47 18',
        lines: [
          { speaker: '"Boshliq"', text: 'Salom, men ofisdan tashqaridaman, lekin shoshilinch ish bor.' },
          { speaker: '"Boshliq"', text: 'Iltimos, server kabinetidagi parolni hozir ayt — auditorlar kutmoqda.' },
          { speaker: '"Boshliq"', text: 'Vaqt yo‘q, savol berma, faqat aytib qo‘y.' },
        ],
      },
      choices: [
        {
          id: 'a',
          text:
            'Bu ijtimoiy muhandislik yoki deepfake hujumi. Parolni aytmayman, qo‘ng‘iroqni uzaman va ichki katalogdagi rasmiy raqamga o‘zim qo‘ng‘iroq qilaman.',
          nextNodeId: 'verified_callback',
          points: 10,
        },
        {
          id: 'b',
          text: 'Ovoz boshlig‘imniki, parolni aytaman.',
          nextNodeId: 'wrong_voice',
          points: 0,
        },
        {
          id: 'c',
          text: 'Parol o‘rniga o‘zimning kirish kalitimni beraman.',
          nextNodeId: 'wrong_voice',
          points: 0,
        },
      ],
    },
    wrong_voice: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR. Hech qachon parol, OTP yoki kalitni telefon orqali aytmang. Deepfake texnologiyasi 30 soniyalik ovozdan namuna ola oladi. IB-405 — ovoz orqali so‘rovni mustaqil kanal orqali tasdiqlash majburiy.',
      evidence: {
        type: 'policy',
        code: 'IB-405',
        title: 'Ovoz orqali ma’lumot so‘ralganda',
        body:
          'Telefon orqali parol/kalit/OTP so‘rovi — rad etiladi. Tasdiqlash uchun: 1) qo‘ng‘iroqni uzing, 2) ichki katalogdagi rasmiy raqamga o‘zingiz qo‘ng‘iroq qiling, 3) Teams/Slack’da yozma tasdiqlash so‘rang.',
      },
      choices: [
        { id: 'a', text: 'Qaytadan urinaman.', nextNodeId: 'voice_call', points: 0 },
      ],
    },
    verified_callback: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'Raqam blacklist `ga qo`shildi',
        subtitle: 'Sec Ops xabardor — IB-405 protokol bajarildi.',
        flash: true,
      },
      text:
        'Boshlig‘ingizga ichki raqam orqali qo‘ng‘iroq qildingiz — u hech qachon qo‘ng‘iroq qilmagan. Sec Ops xabardor qilindi, raqam blacklist’ga qo‘shildi. Bu sizning savodxonligingiz tufayli boshqa xodimlar himoya qilindi.',
      choices: [
        { id: 'a', text: 'Yakunlash', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'Hech qachon telefon orqali parol/OTP/kalit aytmang — ovoz tanish bo‘lsa ham.',
        'Deepfake 30 soniyalik ovoz namunasidan ishlay oladi.',
        'IB-405: callback faqat ichki katalog raqami orqali.',
        'Teams/Slack’da yozma tasdiqlash so‘ralsa — qonun bo‘yicha haqlisiz.',
        'Har bir shubhali qo‘ng‘iroq Sec Ops’ga xabar berilishi shart.',
      ],
    },
  },
};
