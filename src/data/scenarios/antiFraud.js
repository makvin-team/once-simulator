export const antiFraudPhishScenario = {
  id: 'antiFraudPhish',
  hotspot: 'computer',
  startNodeId: 'briefing',
  brief: {
    face: 'inbox',
    eyebrow: 'IB-301 · CASE BRIEF',
    client: 'Inbox: 1 yangi xat',
    meta: 'support@bank-secure-uz.help · "URGENT"',
    severity: 'phishing',
    severityTone: 'rose',
    complaint: 'Hisobni 24 soat ichida tasdiqlash talab qilinmoqda',
    task: ['Domen tahlili', 'Red-flag belgilarini sanang', 'Sec Ops ga forward qiling'],
    stats: [
      { label: 'Domen', value: '.help', tone: 'rose' },
      { label: 'Protokol', value: 'HTTP', tone: 'peach' },
      { label: 'Mudd.', value: '24h', tone: 'butter' },
    ],
  },
  defaultScreen: { type: 'boot' },
  defaultMood: 'neutral',
  nodes: {
    briefing: {
      speaker: 'mentor',
      name: 'AI Mentor',
      screen: { type: 'boot' },
      text:
        'Bugun phishing xat tahlili mashgʻulotini oʻtkazamiz. Pochtangizda yangi xat — manzili shubhali, mazmuni tezkor harakat talab qiladi. Maqsad — xatni IB-301 protokoli boʻyicha toʻgʻri hal qilish.',
      choices: [
        { id: 'a', text: 'Boshlaymiz.', nextNodeId: 'open_email', points: 0 },
      ],
    },
    open_email: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Ekraningizda yangi xat: "URGENT: Hisobingizni 24 soat ichida tasdiqlang, aks holda bloklanadi". Joʻnatuvchi support@bank-secure-uz.help. Birinchi qaysi maydonni tekshirasiz?',
      screen: {
        type: 'email',
        from: 'support@bank-secure-uz.help',
        subject: 'URGENT: Hisobingiz bloklanish arafasida',
        body:
          'Hurmatli mijoz, hisobingizni darhol tasdiqlang. Aks holda hisob 24 soat ichida bloklanadi. Quyidagi havolaga oʻting va parolingizni kiriting: http://bank-secure-uz.help/verify',
        cursorTarget: { x: 540, y: 180 },
      },
      evidence: {
        type: 'email',
        from: 'support@bank-secure-uz.help',
        subject: 'URGENT: Hisobingiz bloklanish arafasida',
        body:
          'Hurmatli mijoz, hisobingizni darhol tasdiqlang. Aks holda hisob 24 soat ichida bloklanadi. Quyidagi havolaga oʻting va parolingizni kiriting: http://bank-secure-uz.help/verify',
      },
      choices: [
        {
          id: 'a',
          text: 'Joʻnatuvchining domenini tekshiraman.',
          nextNodeId: 'domain_check',
          points: 10,
        },
        {
          id: 'b',
          text: 'Havolani bosib, hisobni tasdiqlayman.',
          nextNodeId: 'wrong_click',
          points: 0,
        },
        {
          id: 'c',
          text: 'Xatni oʻchirib tashlayman.',
          nextNodeId: 'ignored',
          points: 2,
        },
      ],
    },
    wrong_click: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'XATAR: notanish havolani bosish — credential stealer dasturi uchun ochiq eshik. IB-301 boʻyicha: kabelni darhol uzing, parolni qayta kiritmang, Sec Ops 78-140-7777 ga qoʻngʻiroq qiling.',
      evidence: {
        type: 'policy',
        code: 'IB-301',
        title: 'Phishing havola bosilganda',
        body:
          '1) Tarmoq kabelini uzing (yoki Wi-Fi-ni oʻchiring). 2) Hech qachon parolni qayta kiritmang. 3) Sec Ops: 78-140-7777 (24/7). 4) IT-ga incident ticket yarating.',
      },
      choices: [
        { id: 'a', text: 'Tushundim, qaytadan urinaman.', nextNodeId: 'open_email', points: 0 },
      ],
    },
    ignored: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Xatni oʻchirsangiz, boshqa xodimlar bunday xatga duch kelganida xabardor boʻlmaydi. Sec Ops faqat reportlar asosida IDS qoidalarini yangilaydi. Xatni secops@bank.uz ga forward qiling.',
      choices: [
        { id: 'a', text: 'Tahlilni davom ettiraman.', nextNodeId: 'domain_check', points: 0 },
      ],
    },
    domain_check: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        '"bank-secure-uz.help" — rasmiy domen emas. Rasmiy domen .uz yoki bank nomidagi domenda joylashadi. Endi havolaga eʻtibor bering — qanday belgilarni koʻryapsiz?',
      screen: {
        type: 'email',
        from: 'support@bank-secure-uz.help',
        subject: 'URGENT: Hisobingiz bloklanish arafasida',
        body:
          'Hurmatli mijoz, hisobingizni darhol tasdiqlang. Aks holda hisob 24 soat ichida bloklanadi. Quyidagi havolaga oʻting va parolingizni kiriting: http://bank-secure-uz.help/verify',
        flags: ['domain', 'urgency', 'link'],
        warn: true,
        cursorTarget: { x: 300, y: 124 },
      },
      evidence: {
        type: 'analysis',
        items: [
          'Domain ".help" — bank tomonidan ishlatilmaydi',
          '"URGENT" va 24 soatlik muddat — bosim taktikasi',
          'Havola HTTP, HTTPS emas',
          'Parol soʻrash — bank emailda parol soʻramaydi',
        ],
      },
      choices: [
        {
          id: 'a',
          text:
            'Xatni secops@bank.uz ga forward qilaman va mijozlarga rasmiy kanal orqali ogohlantirish chiqaraman.',
          nextNodeId: 'good_escalation',
          points: 10,
        },
        {
          id: 'b',
          text: 'Bir mijozga shaxsan qoʻngʻiroq qilib ogohlantiraman.',
          nextNodeId: 'partial',
          points: 5,
        },
        {
          id: 'c',
          text: 'Spam deb belgilab oʻchiraman.',
          nextNodeId: 'ignored',
          points: 2,
        },
      ],
    },
    partial: {
      speaker: 'mentor',
      name: 'AI Mentor',
      text:
        'Yaxshi, lekin bitta mijoz emas — barcha xodimlar uchun reglament yangilanishi kerak. Sec Ops xabardor boʻlsa, IDS qoidalari yangilanadi.',
      choices: [
        { id: 'a', text: 'Sec Ops ga ham xabar beraman.', nextNodeId: 'good_escalation', points: 4 },
      ],
    },
    good_escalation: {
      speaker: 'mentor',
      name: 'AI Mentor',
      mood: 'satisfied',
      screen: {
        type: 'forwarded',
        title: 'Sec Ops ga forward qilindi',
        subtitle: 'IDS qoidasi 30 daqiqada yangilanadi — 2400 xodim himoyalanadi.',
        flash: true,
      },
      text:
        'Aʻlo. Sec Ops mailbox’dan keyingi 30 daqiqada IDS reglamentini yangilaydi va shu domenni global blacklist ga qoʻshadi. Sizning hisobotingiz boshqa 2400 xodimni himoyalaydi.',
      choices: [
        { id: 'a', text: 'Yakunlash', nextNodeId: 'end', points: 0 },
      ],
    },
    end: {
      isEnd: true,
      tips: [
        'Joʻnatuvchi domenini har doim tekshiring — .uz yoki rasmiy domen kerak.',
        '"URGENT", shoshilish, "24 soat ichida" — bosim taktikasi.',
        'Bank hech qachon emailda parol soʻramaydi.',
        'IB-301: havola bosilsa — kabelni uzing, Sec Ops 78-140-7777.',
        'Har bir xat secops@bank.uz ga forward — boshqa xodimlarni himoyalaydi.',
      ],
    },
  },
};
