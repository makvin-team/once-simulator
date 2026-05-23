/**
 * Uzbek (Cyrillic) translations for the 16 m2-m5 scenarios.
 * Mirrors the shape of scenarios/uz.js exactly; transliterated content.
 */

const amlBeneficialOwner = {
  title: 'KYC чуқурлаштирилган — UBO',
  subtitle: 'AML §5.1 · Beneficial owner аниқлаш',
  proctorIntro: '"Консалтинг МЧЖ" ҳисоб очмоқчи. UBO маълумотини бермаяпти.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'KYC эскалацияси',
    title: 'UBO ҳужжати тақдим этилмади',
    subtitle: 'Корп. ҳисоб · Ташқи юрисдикция',
    meta: 'AML §5.1 · 10 дақиқада қарор',
    cta: 'Ҳужжатни очиш',
  },
  txPanel: {
    tag: 'CRM · ЮР. ШАХС РЎЙХАТИ',
    client: 'Консалтинг Плюс МЧЖ',
    clientMeta: 'ИНН 30412840100501 · Вакил: А. Назаров · 2 ҳафта аввал очилган',
    yourTask: 'Сизнинг қарорингиз',
    taskHint: 'Битта тўғри жавобни танланг.',
    timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '10:02', text: 'Вакил ҳисоб очиш сўради · "корпоратив"' },
      { time: '10:05', text: 'UBO маълумотини сўрадик · вакил "бу махфий" деди' },
      { time: '10:10', text: 'BVI юрисдикцияси · учта воситачи қатлам' },
      { time: '10:12', text: 'Бошланғич капитал 5 млн USD' },
    ],
    indicators: {
      entity: { label: 'Ташкилот тури', value: 'LLC · BVI', hint: 'Ташқи юрисдикция' },
      ubo: { label: 'UBO', value: 'Яширин', hint: 'AML §5.1 бузилиши' },
      jurisdiction: { label: 'Юрисдикция', value: 'BVI', hint: 'High-risk рўйхат' },
      capital: { label: 'Бошл. капитал', value: '5M USD', hint: 'Юқори миқдор' },
    },
  },
  actions: {
    demandUbo: 'UBO ҳужжатини талаб қилиш',
    demandUboHint: 'Онбординг тўхтатилади · барча қатламлар кўрсатилсин',
    escalate: 'Compliance га эскалация',
    escalateHint: 'Биргаликдаги қарор · 4 соат',
    openAnyway: 'Берилган ҳужжатлар билан очиш',
    openAnywayHint: 'ХАТАР · AML §5.1 бузилиши',
  },
  proctorFeedback: {
    correct: 'Аъло. UBO талаб қилиш — AML §5.1 нинг ягона тўғри йўли.',
    partial: 'Эскалация хавфсиз қарор, лекин ходим ўзи UBO талаб қилиши керак эди.',
    fail: 'ХАТАР. UBOсиз корпоратив ҳисоб очиш — бевосита §5.1 бузилиши.',
  },
  screen: {
    dashboard: {
      title: 'KYC · Юридик шахслар',
      client: 'Бугун 3 та корп. сўров · 1 эскалация',
      cards: {
        a: 'Ташкилот', aValue: 'LLC',
        b: 'UBO', bValue: 'Яширин',
        c: 'Капитал', cValue: '5M $',
      },
    },
    analysis: {
      title: 'KYC red-flag белгилари',
      items: ['BVI юрисдикцияси · ташқи', 'UBO ҳужжати йўқ', 'Учта воситачи қатлам', 'Бошланғич капитал 5M USD'],
    },
    endCorrect: { title: 'UBO талаб юборилди', subtitle: 'Онбординг пауза · барча қатламлар талаб қилинди' },
    endPartial: { title: 'Compliance га эскалация', subtitle: 'Биргаликдаги кўриб чиқиш 4 соат' },
    endFail: {
      code: 'AML §5.1',
      title: 'UBO мажбурий',
      body: 'Ҳар қандай корпоратив ҳисоб очишда ultimate beneficial owner аниқланиши шарт. Онбординг UBO очилмагунча давом этмайди.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'UBO — ҳар бир корпоратив ҳисоб учун мажбурий.',
      'Ташқи юрисдикция + учта қатлам — юқори риск.',
      'Вакил "махфий" деёлмайди — қонун талаби.',
      'Онбординг UBO йўқ ҳолатда пауза қилинади.',
      'AML §5.1 — шахсий жавобгарлик моддаси.',
    ],
  },
};

const amlSanctions = {
  title: 'Санкция текшируви — OFAC',
  subtitle: 'AML §6.2 · Санкция рўйхати мослиги',
  proctorIntro: 'Транзакция сканерлаш 88% мослик аниқлади. OFAC рўйхати.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Санкция мослиги', title: '88% OFAC мослик', subtitle: 'Бенефициар: А. Каримов · $240K wire',
    meta: 'AML §6.2 · дарҳол қарор', cta: 'Мосликни кўриш',
  },
  txPanel: {
    tag: 'CRM · САНКЦИЯ ТАҲЛИЛИ', client: 'Акмал Каримов',
    clientMeta: 'ИНН 30312840190303 · Wire $240K · Бенефициар: KZ',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '13:10', text: 'Wire сўрови · $240K' },
      { time: '13:10', text: 'Санкция сканери ишга тушди' },
      { time: '13:11', text: 'OFAC SDN рўйхати · 88% fuzzy мослик' },
      { time: '13:12', text: 'Бенефициар Алматида · қўшимча байроқ' },
    ],
    indicators: {
      matchScore: { label: 'Мослик', unit: '%', hint: '> 80% = critical' },
      list: { label: 'Рўйхат', value: 'OFAC SDN', hint: 'Тўлиқ блокировка' },
      amount: { label: 'Сумма', value: '$240K', hint: 'Wire transfer' },
      corridor: { label: 'Коридор', value: 'UZ→KZ', hint: 'High-risk' },
    },
  },
  actions: {
    blockReport: 'Блоклаш + OFAC ҳисобот', blockReportHint: 'Транзакция тўхтатилади · 24 соат ичида ҳисобот',
    escalate: 'Compliance га эскалация', escalateHint: 'Биргаликдаги текширув · 1 соат',
    release: 'Ўтказиб юбориш', releaseHint: 'ХАТАР · OFAC бузилиши · жиноий жавобгарлик',
  },
  proctorFeedback: {
    correct: 'Аъло. 88% OFAC мослик — дарҳол block ва ҳисобот. Бу қонун талаби.',
    partial: 'Эскалация яхши, лекин санкция ҳолатида дарҳол block биринчи қадам.',
    fail: 'ЖИНОИЙ. OFAC санкция бузилиши — банкка $millionларча жарима ва шахсий жавобгарлик.',
  },
  screen: {
    dashboard: {
      title: 'Санкция монитор', client: 'Бугун 4 та мослик текшируви',
      cards: { a: 'Мослик', aValue: '88%', b: 'Рўйхат', bValue: 'OFAC', c: 'Сумма', cValue: '$240K' },
    },
    analysis: {
      title: 'OFAC мослик таҳлили',
      items: ['OFAC SDN рўйхати · 88% fuzzy мослик', 'Бенефициар Қозоғистонда', 'Wire сумма $240K', 'UZ→KZ коридори · high-risk'],
    },
    endCorrect: { title: 'Санкция блокланди', subtitle: 'OFAC ҳисоботи 24 соат ичида юборилади' },
    endPartial: { title: 'Compliance га эскалация', subtitle: 'Биргаликдаги қарор 1 соат ичида' },
    endFail: {
      code: 'AML §6.2', title: 'OFAC бузилиши',
      body: 'Санкция рўйхатидаги шахсларга ўтказма — OFAC бузилиши. Банкка миллионларча доллар жарима ва ходимга жиноий жавобгарлик юкланади.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      '> 80% санкция мослик — дарҳол block.',
      'OFAC, UN, EU рўйхатлари ҳам текширилади.',
      'Block биринчи қадам, эскалация кейин.',
      'OFAC бузилиши — жиноий жавобгарлик.',
      'Fuzzy мослик ҳам байроқ · қўшимча текшириш керак.',
    ],
  },
};

const amlPep = {
  title: 'PEP риск — сиёсий шахслар', subtitle: 'AML §7.3 · Enhanced Due Diligence',
  proctorIntro: 'Ҳудуд депутати 420 млн бизнес даромадини жойлаштирмоқчи.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'PEP белгиси', title: 'Депутат ҳисобига катта кирим',
    subtitle: 'Б. Салимов · 420 млн · бизнес даромади', meta: 'AML §7.3 · EDD талаб қилинади', cta: 'PEP профилини кўриш',
  },
  txPanel: {
    tag: 'CRM · PEP ПРОФИЛ', client: 'Баходир Салимов',
    clientMeta: 'ИНН 30112840100210 · Ҳудуд депутати · 8 йил мижоз',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '15:00', text: '420 млн сўм кирим · "бизнес даромади"' },
      { time: '15:01', text: 'PEP белгиси профилда · ҳудуд депутати' },
      { time: '15:02', text: 'Манба: "қурилиш компаниям"' },
      { time: '15:03', text: 'Ҳужжат: иш бўйича контракт 2 ой аввал' },
    ],
    indicators: {
      pepRole: { label: 'Лавозим', value: 'Депутат', hint: 'High-risk PEP' },
      amount: { label: 'Сумма', unit: 'млн', hint: '> 100 млн EDD' },
      sourceFunds: { label: 'Манба', value: 'Қурилиш', hint: 'Текшириш керак' },
      jurisdiction: { label: 'Юрисдикция', value: 'UZ', hint: 'Маҳаллий' },
    },
  },
  actions: {
    eddApprove: 'EDD + senior approval', eddApproveHint: 'Манба ҳужжати · senior тасдиқ · 24 соат',
    standardKyc: 'Стандарт KYC ишлатиш', standardKycHint: 'PEP учун етарли эмас · audit риски',
    accept: 'Қабул қилиш', acceptHint: 'ХАТАР · §7.3 бузилиши',
  },
  proctorFeedback: {
    correct: 'Аъло. PEP + катта сумма = EDD мажбурий. Senior тасдиқ — қоидага мувофиқ.',
    partial: 'Стандарт KYC PEP учун етарли эмас. EDD мажбурий.',
    fail: 'ХАТАР. PEP риск эътибордан четда қолди — §7.3 бузилиши ва audit муаммоси.',
  },
  screen: {
    dashboard: {
      title: 'PEP монитор', client: 'Бугун 2 та PEP операция',
      cards: { a: 'PEP', aValue: 'Депутат', b: 'Сумма', bValue: '420M', c: 'EDD', cValue: 'Талаб' },
    },
    analysis: {
      title: 'PEP риск белгилари',
      items: ['Ҳудуд депутати (high-risk PEP)', 'Катта нақд кирим · 420 млн', 'Манба: бизнес даромади (текшириш керак)', 'AML §7.3 EDD мажбурий'],
    },
    endCorrect: { title: 'EDD бошланди', subtitle: 'Манба ҳужжати + senior тасдиқ 24 соат' },
    endPartial: { title: 'Стандарт KYC қўлланилди', subtitle: 'PEP ҳолатида етарли эмас · audit риски' },
    endFail: {
      code: 'AML §7.3', title: 'PEP EDD талаб қилинади',
      body: 'Сиёсий шахслар учун стандарт KYC етарли эмас. Enhanced Due Diligence ва senior approval — қоидага мувофиқ.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'PEP = Enhanced Due Diligence мажбурий.',
      'Ҳудуд депутати ҳам high-risk PEP.',
      'Манба ҳужжати ҳар доим текширилади.',
      'Senior approval — протоколнинг бир қисми.',
      'PEP риск — шахсий жавобгарлик моддаси.',
    ],
  },
};

const amlSarWriting = {
  title: 'SAR ёзиш — амалиёт', subtitle: 'AML §8.1 · 5W нарратив форматi',
  proctorIntro: 'Шубҳали pattern аниқланди. SAR ёзиш вақти — қайси форматни танлайсиз?',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'SAR драфти', title: 'SAR ёзиш форматi',
    subtitle: 'Pattern аниқ · учта вариантдан танланг', meta: 'AML §8.1 · 15 дақиқада драфт', cta: 'Форматларни кўриш',
  },
  txPanel: {
    tag: 'CRM · SAR DRAFT', client: 'Pattern: 3 та янги мижоз + 50M+ нақд',
    clientMeta: 'Таҳлил тугади · нарратив формат танлаш',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри форматни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '11:00', text: 'Pattern таҳлили тугади' },
      { time: '11:15', text: '3 та ҳисоб + 4 та транзакция' },
      { time: '11:20', text: 'SAR ёзиш вақти · формат танлаш' },
      { time: '11:30', text: 'Compliance 24 соат ичида кўради' },
    ],
    indicators: {
      pattern: { label: 'Pattern', value: 'Аниқ', hint: 'Ҳужжатли' },
      evidence: { label: 'Далиллар', value: '4 та', hint: 'Транзакция' },
      timeline: { label: 'Вақт', value: '3 ҳафта', hint: 'Давомли' },
      tone: { label: 'Стил', value: 'Танлаш', hint: 'Фактик' },
    },
  },
  actions: {
    factualFiveW: '5W фактик нарратив', factualFiveWHint: 'Ким · Нима · Қачон · Қаерда · Қанча · фақат факт',
    partialNarrative: 'Қисман нарратив (контекст йўқ)', partialNarrativeHint: 'Audit савол бериши мумкин',
    accusatory: 'Ҳиссий / айбловчи стил', accusatoryHint: 'ХАТАР · SAR рад этилади',
  },
  proctorFeedback: {
    correct: 'Аъло. 5W форматi — Compliance бир ўқишда тушунади. Фактик, нейтрал.',
    partial: 'Қисман нарратив ишлайди, лекин контекст йўқлиги қўшимча савол туғдиради.',
    fail: 'ХАТАР. Ҳиссий стил SAR ни invalid қилади. Compliance қайтаради.',
  },
  screen: {
    dashboard: {
      title: 'SAR draft тизими', client: 'Бугун 1 та SAR draft',
      cards: { a: 'Pattern', aValue: 'Аниқ', b: 'Далиллар', bValue: '4', c: 'Стил', cValue: '5W' },
    },
    analysis: {
      title: 'SAR формат қоидалари',
      items: ['5W — Ким, Нима, Қачон, Қаерда, Қанча', 'Фақат факт · ҳиссиёт йўқ', 'Audit исботи ҳар бандда', 'Нейтрал, профессионал оҳанг'],
    },
    endCorrect: { title: 'SAR юборилди', subtitle: '5W фактик · Compliance 24 соат ичида кўради' },
    endPartial: { title: 'SAR юборилди (қисман)', subtitle: 'Қўшимча контекст сўралиши мумкин' },
    endFail: {
      code: 'AML §8.1', title: 'SAR формат бузилиши',
      body: 'Ҳиссий ёки айбловчи стил SAR ни invalid қилади. Фақат факт, 5W форматида ёзилади.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      '5W форматi — ҳар SAR учун стандарт.',
      'Фақат факт · ҳиссиёт ва айблов йўқ.',
      'Ҳар бир гап audit исботи билан тасдиқланади.',
      'Нейтрал, профессионал оҳанг.',
      'Контекст ҳеч қачон "тушунарли" деб ташланмайди.',
    ],
  },
};

const cyberSocTriage = {
  title: 'SOC alert triage — lateral movement', subtitle: 'IB-402 · IDS юқори приоритет',
  proctorIntro: 'Finance бўлимидан lateral movement. IDS юқори приоритет.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'IDS critical', title: 'Lateral movement аниқланди',
    subtitle: 'FIN-WS-12 · admin-shareʼга уриниш', meta: 'IB-402 · дарҳол жавоб', cta: 'Alertни очиш',
  },
  txPanel: {
    tag: 'SOC · ALERT ТАҲЛИЛИ', client: 'FIN-WS-12 · Finance бўлими',
    clientMeta: 'Win11 · домен уланишида · охирги логин 09:14',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '09:14', text: 'Фойдаланувчи логин · нормал' },
      { time: '09:32', text: 'admin$ shareʼга уриниш' },
      { time: '09:33', text: 'IDS critical alert · lateral movement' },
      { time: '09:34', text: 'Бошқа хостда SMB скан' },
    ],
    indicators: {
      severity: { label: 'Приоритет', value: 'Critical', hint: 'IDS тасдиқ' },
      host: { label: 'Host', value: 'FIN-WS-12', hint: 'Finance' },
      movement: { label: 'Pattern', value: 'admin$ + SMB', hint: 'Классик' },
      asset: { label: 'Asset', value: 'Finance иш станцияси', hint: 'Юқори риск' },
    },
  },
  actions: {
    isolate: 'Host изоляция + IR page', isolateHint: 'Тармоқдан узилади · IR жамоа 5 дақиқада',
    monitor: 'Фақат кузатиш', monitorHint: 'Тарқалиш риски мавжуд',
    closeFp: 'False positive деб ёпиш', closeFpHint: 'ХАТАР · ransomware тарқалиши мумкин',
  },
  proctorFeedback: {
    correct: 'Аъло. admin$ + SMB скан — классик тарқалиш. Изоляция + IR — биринчи қадам.',
    partial: 'Кузатиш кечикади · ҳар дақиқа қўшимча хост юқиши мумкин.',
    fail: 'ХАТАР. Ransomware lateral movement деб ноаниқ белгиланади. Тарқалиш риски юқори.',
  },
  screen: {
    dashboard: {
      title: 'SOC монитор', client: 'Бугун 12 та alert · 1 critical',
      cards: { a: 'Приоритет', aValue: 'Critical', b: 'Хостлар', bValue: '2', c: 'IR', cValue: 'Тайёр' },
    },
    analysis: {
      title: 'Lateral movement белгилари',
      items: ['admin$ share уриниш', 'SMB скан бошқа хостда', 'Фойдаланувчи тушунмади', 'IDS critical alert'],
    },
    endCorrect: { title: 'Host изоляция қилинди', subtitle: 'IR жамоа 5 дақиқада · тарқалиш тўхтатилди' },
    endPartial: { title: 'Кузатиш режимида', subtitle: 'Тарқалиш риски давом этмоқда' },
    endFail: {
      code: 'IB-402', title: 'Lateral movement эътибордан четда',
      body: 'Классик lateral movement — ransomware бошланиши. Изоляция кечиктирилса, бутун тармоқ хавф остида.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'admin$ + SMB скан = lateral movement.',
      'Critical alertда изоляция биринчи қадам.',
      'IR page кечиктирилмайди.',
      'False positive шубҳасиз эмас — текширув керак.',
      'Lateral movement — ransomware кириб келиши.',
    ],
  },
};

const cyberIncidentResponse = {
  title: 'Incident response — ransomware', subtitle: 'NIST 800-61 · Containment + Eradication',
  proctorIntro: 'Ransomware Finance бўлимида файлларни шифрлаяпти. Вақт йўқ.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'INCIDENT critical', title: 'Ransomware аниқланди',
    subtitle: 'Finance · 8 хост · .lockbit', meta: 'NIST 800-61 · дарҳол жавоб', cta: 'Incidentни очиш',
  },
  txPanel: {
    tag: 'IR · INCIDENT ТАҲЛИЛИ', client: 'Finance бўлими · 8 хост',
    clientMeta: 'Lockbit варианти · 14 дақиқа аввал бошланган',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '14:32', text: 'Биринчи хост шифрланди' },
      { time: '14:38', text: '5 хост юқди' },
      { time: '14:44', text: 'Backup тармоғи ҳали тоза' },
      { time: '14:46', text: 'Ransom хабари пайдо бўлди · 50 BTC' },
    ],
    indicators: {
      spread: { label: 'Тарқалиш', value: '8 хост', hint: '14 дақиқада' },
      department: { label: 'Бўлим', value: 'Finance', hint: 'Критик' },
      backups: { label: 'Backup', value: 'Тоза', hint: 'Ҳали' },
      ransom: { label: 'Ransom', value: '50 BTC', hint: '~$1.5M' },
    },
  },
  actions: {
    containEradicate: 'Containment + Eradication + Forensics', containEradicateHint: 'NIST 800-61 протоколи · бэкапларни сақлаш',
    restoreBackup: 'Тезда бэкапдан тиклаш', restoreBackupHint: 'Forensик йўқолади · тарқалиш давом этиши мумкин',
    payRansom: 'Ransom тўлаш', payRansomHint: 'ЖИНОИЙ · журнал ва кейинги ҳужум риски',
  },
  proctorFeedback: {
    correct: 'Аъло. NIST 800-61 — Containment биринчи, кейин Eradication, охирида тиклаш. Forensик таҳлил ҳам сақланади.',
    partial: 'Тез тиклаш forensик ани йўқ қилади. Сабаб аниқланмаса ҳужум қайтади.',
    fail: 'ЖИНОИЙ. Ransom тўлаш банкни жиноий жавобгарликка олади ва кейинги ҳужумларни рағбатлантиради.',
  },
  screen: {
    dashboard: {
      title: 'IR Command Center', client: 'Актив incident · Finance',
      cards: { a: 'Хостлар', aValue: '8', b: 'Вақт', bValue: '14 дақ', c: 'Backup', cValue: 'Тоза' },
    },
    analysis: {
      title: 'Incident белгилари',
      items: ['Lockbit ransomware варианти', '8 хост шифрланди · 14 дақиқада', 'Backup тармоғи ҳали тоза', 'Ransom хабари · 50 BTC'],
    },
    endCorrect: { title: 'Containment муваффақиятли', subtitle: 'NIST 800-61 протоколи · forensик сақланди' },
    endPartial: { title: 'Тиклаш бошланди', subtitle: 'Forensик чекланган · сабаб таҳлил зарур' },
    endFail: {
      code: 'NIST 800-61', title: 'Ransom тўлаш — қонун бузилиши',
      body: 'Ransom тўлаш жиноий гуруҳларни молиялаштириш билан тенглаштирилади. Банкка жарима ва кейинги ҳужум риски.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'NIST 800-61 — Containment биринчи.',
      'Forensик таҳлил тиклашдан олдин.',
      'Ransom тўлаш — қонун бузилиши.',
      'Backup тармоғини дарҳол изоляция қилинг.',
      'Сабаб аниқланмаса ҳужум қайтади.',
    ],
  },
};

const cyberZeroTrust = {
  title: 'Zero Trust — вендор кириши', subtitle: 'IB-505 · Just-In-Time Access',
  proctorIntro: 'Вендор production га доимий admin кириш сўрайди. Zero Trust стратегияси.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Access сўрови', title: 'Вендор production access',
    subtitle: 'TechVendor · admin · доимий', meta: 'IB-505 · қарор керак', cta: 'Сўровни очиш',
  },
  txPanel: {
    tag: 'IAM · ВЕНДОР ACCESS', client: 'TechVendor LLC',
    clientMeta: 'Ташқи хизмат кўрсатувчи · 2 йил шартнома · 6 муҳандис',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '10:00', text: 'Вендор production admin сўраган' },
      { time: '10:05', text: '"Доимий техник хизмат" деб тушунтирган' },
      { time: '10:10', text: 'Zero Trust қоидалари мавжуд' },
      { time: '10:12', text: 'JIT access тизими ишлатишга тайёр' },
    ],
    indicators: {
      requester: { label: 'Сўровчи', value: 'TechVendor', hint: 'Ташқи' },
      scope: { label: 'Доирага', value: 'Production admin', hint: 'Юқори риск' },
      duration: { label: 'Давомийлиги', value: 'Доимий', hint: 'Талаб мақулемас' },
      audit: { label: 'Audit', value: 'Керак', hint: 'Ёз/ўчир' },
    },
  },
  actions: {
    jitAccess: 'JIT access · 4 соат ойналар', jitAccessHint: 'Ҳар сессия: тасдиқ + журнал · сессия тугаши билан ўчириш',
    vpnMonitor: 'VPN + кузатиш', vpnMonitorHint: 'Доимий уланиш · audit заиф',
    permanentGroup: 'Доимий admin гуруҳга қўшиш', permanentGroupHint: 'ХАТАР · Zero Trust бузилиши',
  },
  proctorFeedback: {
    correct: 'Аъло. JIT access — Zero Trustнинг бош мақсади. Керак вақтда, керак доирада, журнал билан.',
    partial: 'VPN ишлайди, лекин доимий уланиш auditни қийинлаштиради.',
    fail: 'ХАТАР. Доимий admin = supply chain риски. Вендор хакерлангани ҳолатда — сиз ҳам бузилган.',
  },
  screen: {
    dashboard: {
      title: 'IAM · Access Manager', client: 'Бугун 3 та access сўров',
      cards: { a: 'Сўровчи', aValue: 'Вендор', b: 'Доирага', bValue: 'Admin', c: 'JIT', cValue: 'Тайёр' },
    },
    analysis: {
      title: 'Zero Trust қоидалари',
      items: ['Ҳеч ким default да ишончли эмас', 'Just-In-Time access · вақт чеклови', 'Audit журнали ҳар сессия', 'Minimum privilege · фақат керак доирага'],
    },
    endCorrect: { title: 'JIT access ёқилди', subtitle: '4 соат сессия · журнал актив' },
    endPartial: { title: 'VPN уланиш берилди', subtitle: 'Audit чекланган · доимий уланиш' },
    endFail: {
      code: 'IB-505', title: 'Zero Trust бузилиши',
      body: 'Ташқи вендор учун доимий admin ҳуқуқи supply chain ҳужумларига эшик очади. Zero Trust принципи — ҳар сўровга шубҳа билан қараш.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'JIT access — Zero Trustнинг юраги.',
      'Доимий admin = supply chain риски.',
      'Audit журнали ҳар сессия мажбурий.',
      'Minimum privilege — фақат керак доирага.',
      'Вендор бузилса — сиз ҳам бузилган.',
    ],
  },
};

const cyberDeepfake = {
  title: 'Deepfake овоз верификацияси', subtitle: 'IB-606 · Callback протоколи',
  proctorIntro: '"CEO" қўнғироқ қилди · тезкор $200K wire сўраяпти. Овоз ғалати.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'CEO қўнғироғи', title: 'Тезкор wire $200K',
    subtitle: '"CEO" Акмал Турсунов · овоз шубҳали', meta: 'IB-606 · дарҳол қарор', cta: 'Қўнғироқни кўриш',
  },
  txPanel: {
    tag: 'IB · ОВОЗ ТАҲЛИЛИ', client: 'Сўровчи: "Акмал Турсунов" (CEO)',
    clientMeta: 'Нотаниш рақамдан · 4 дақиқа қўнғироқ · овоз uncanny',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '16:02', text: 'Қўнғироқ · нотаниш рақам' },
      { time: '16:02', text: '"CEO Акмал Турсунов" деб тақдим этди' },
      { time: '16:03', text: '$200K wire · "тезда, савдо улгурмасин"' },
      { time: '16:04', text: 'Овоз uncanny · паузалар ғалати' },
    ],
    indicators: {
      voice: { label: 'Овоз', value: 'Uncanny', hint: 'Deepfake белгиси' },
      urgency: { label: 'Тезкорлик', value: '"тезда"', hint: 'Классик social engineering' },
      amount: { label: 'Сумма', hint: 'Wire transfer' },
      channel: { label: 'Канал', value: 'Нотаниш рақам', hint: 'Verify керак' },
    },
  },
  actions: {
    callback: 'CEO нинг маълум рақамига callback', callbackHint: 'Реал овоз текширилади · қўшимча 2 дақиқа',
    emailConfirm: 'Email тасдиқлаш', emailConfirmHint: 'Email ҳам хакерланиши мумкин · эҳтиёт',
    wire: 'Wire ни амалга ошириш', wireHint: 'ЖИНОИЙ · $200K йўқотилади · CEO impersonation ҳужуми',
  },
  proctorFeedback: {
    correct: 'Аъло. Callback — deepfake га қарши ягона ишончли йўл. 2 дақиқа кечикиш $200K дан арзон.',
    partial: 'Email яхши, лекин email accounts ҳам бузилиши мумкин. Телефон callback кучлироқ.',
    fail: 'ЖИНОИЙ. CEO impersonation = deepfake. $200K йўқолади ва банкка audit муаммоси.',
  },
  screen: {
    dashboard: {
      title: 'IB · қўнғироқ монитор', client: 'Актив қўнғироқ · CEO impersonation шубҳаси',
      cards: { a: 'Сўровчи', aValue: 'CEO?', b: 'Сумма', bValue: '$200K', c: 'Овоз', cValue: 'Uncanny' },
    },
    analysis: {
      title: 'Deepfake белгилари',
      items: ['Овоз uncanny · паузалар ғалати', 'Нотаниш рақамдан', 'Тезкорлик босими', 'Катта wire сумма $200K'],
    },
    endCorrect: { title: 'Callback верификация', subtitle: 'Реал овоз текширилди · сўров рад этилди' },
    endPartial: { title: 'Email тасдиқлаш', subtitle: 'Чекланган ишонч · эҳтиёт' },
    endFail: {
      code: 'IB-606', title: 'CEO impersonation муваффақиятли',
      body: 'Deepfake овоз $200K wire ни амалга оширди. Банкка audit муаммоси ва шахсий жавобгарлик. Callback протоколи мажбурий.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Deepfake овоз ҳозир қулай · эҳтиёт.',
      'Callback маълум рақамга — ягона ишончли йўл.',
      'Тезкорлик босими — классик social engineering.',
      '$200K + тезкорлик = pause ва verify.',
      'Email ҳам хакерланиши мумкин · телефон кучлироқ.',
    ],
  },
};

const fraudSynthetic = {
  title: 'Synthetic identity onboarding', subtitle: 'FRAUD-318 · Composite ID detection',
  proctorIntro: 'Ҳисоб очиш сўрови · ID composite · 3 та flagged адресга боғланган.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Fraud monitor', title: 'Synthetic identity белгиси',
    subtitle: 'Реал ИНН · сохта исм · linked addresses', meta: 'FRAUD-318 · онбординг пауза', cta: 'Профилни очиш',
  },
  txPanel: {
    tag: 'CRM · ID ТАҲЛИЛИ', client: '"Рустам Аҳмедов"',
    clientMeta: 'ИНН реал · исм биринчи марта · адрес 3 та flagged ҳисобга боғланган',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '09:20', text: 'Online ҳисоб очиш сўрови' },
      { time: '09:21', text: 'ИНН текшируви · реал, лекин бошқа исм билан' },
      { time: '09:22', text: 'Адрес 3 та flagged ҳисобга боғланган' },
      { time: '09:23', text: 'Device fingerprint такрорий' },
    ],
    indicators: {
      idMatch: { label: 'ID мослик', value: 'Composite', hint: 'Реал ИНН + янги исм' },
      addressLinks: { label: 'Адрес', value: '3 flagged', hint: 'Боғланиш' },
      creditFile: { label: 'Credit file', value: 'Thin', hint: 'Янги яратилган' },
      deviceFingerprint: { label: 'Device', value: 'Такрорий', hint: 'Бошқа ҳисобларда ҳам' },
    },
  },
  actions: {
    denyReport: 'Рад этиш + fraud ҳисобот', denyReportHint: 'Онбординг блокланади · fraud team хабардор',
    enhancedKyc: 'EKYC суҳбати', enhancedKycHint: 'Қўшимча ҳужжат сўраш · 24 соат',
    open: 'Ҳисоб очиш', openHint: 'ХАТАР · synthetic identity фаол бўлади',
  },
  proctorFeedback: {
    correct: 'Аъло. Composite ID + linked addresses + device fingerprint — synthetic identity классик белгилари. Рад этиш ва ҳисобот — тўғри йўл.',
    partial: 'EKYC ишлайди, лекин synthetic identity тайёрланган жавоблар билан ўтиши мумкин.',
    fail: 'ХАТАР. Synthetic identity билан очилган ҳисоб кейинчалик mule схемада ишлатилади.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · ID монитор', client: 'Бугун 4 та synthetic шубҳа',
      cards: { a: 'ID', aValue: 'Composite', b: 'Linked', bValue: '3 ҳисоб', c: 'Device', cValue: 'Такрорий' },
    },
    analysis: {
      title: 'Synthetic ID белгилари',
      items: ['Реал ИНН + биринчи марта кўринган исм', 'Адрес 3 та flagged ҳисобга боғланган', 'Credit file thin (янги яратилган)', 'Device fingerprint такрорий'],
    },
    endCorrect: { title: 'Онбординг рад этилди', subtitle: 'Fraud ҳисобот юборилди · 24 соатда audit' },
    endPartial: { title: 'EKYC суҳбати', subtitle: 'Қўшимча ҳужжат сўралади · 24 соат' },
    endFail: {
      code: 'FRAUD-318', title: 'Synthetic identity очилди',
      body: 'Composite ID билан очилган ҳисоб mule ёки credit fraud схемада ишлатилади. Онбординг босқичида рад этиш — энг самарали ҳимоя.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Реал ИНН + янги исм = composite signal.',
      'Адрес боғланишлар — кўрсаткич.',
      'Device fingerprint такрорий = bot/фарма.',
      'EKYC тайёр жавоблар билан ўтиши мумкин.',
      'Онбординг босқичида рад этиш энг арзон.',
    ],
  },
};

const fraudSkimming = {
  title: 'ATM skimming + behavioral', subtitle: 'FRAUD-422 · Geo velocity аномалия',
  proctorIntro: 'Битта карта 22 дақиқада 280 км узоқликда ишлатилган. Физик имконсиз.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Card fraud', title: 'Geo velocity аномалия',
    subtitle: 'Тошкент + Самарқанд · 22 дақиқада', meta: 'FRAUD-422 · дарҳол', cta: 'Таҳлилни очиш',
  },
  txPanel: {
    tag: 'CRM · КАРТА ТАҲЛИЛИ', client: 'Карта 4188…7733 · Д. Рашидов',
    clientMeta: 'Premium · 3 йил · охирги нормал фойдаланиш кечаги',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '13:45', text: 'Тошкент ATM · 500K нақд' },
      { time: '14:07', text: 'Самарқанд ATM · 500K нақд' },
      { time: '14:07', text: '280 км · 22 дақиқада · физик имконсиз' },
      { time: '14:08', text: 'Иккаласи ҳам ATM кластерида' },
    ],
    indicators: {
      geoVelocity: { label: 'Geo velocity', value: '280км/22м', hint: 'Имконсиз' },
      amountPattern: { label: 'Сумма', value: '500K×2', hint: 'Макс лимит' },
      atmCluster: { label: 'ATM cluster', value: 'Боғлиқ', hint: 'Skimmer шубҳаси' },
      cvvFailures: { label: 'CVV хато', value: '3', hint: 'Бошқа карталарда ҳам' },
    },
  },
  actions: {
    blockInvestigate: 'Карта block + skimmer тергови', blockInvestigateHint: 'Янги карта · ATM кластери текшируви',
    notifyCustomer: 'Мижозни огоҳлантириш + soft block', notifyCustomerHint: 'Мижоз тасдиқи кутилади · вақт йўқотиш',
    monitor: 'Кузатиш давом этсин', monitorHint: 'ХАТАР · қўшимча ўғирлаш мумкин',
  },
  proctorFeedback: {
    correct: 'Аъло. Geo velocity имконсиз + ATM cluster + CVV хатолар = skimming. Block + тергов — дарҳол қадам.',
    partial: 'Мижоз тасдиқи кутилса, қўшимча пул ўғирланиши мумкин. Block биринчи қадам.',
    fail: 'ХАТАР. Skimming давом этаётган картани кузатишда қолдириш = кўпроқ мижозлар зарар.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Карта монитор', client: 'Бугун 5 та velocity alert',
      cards: { a: 'Карта', aValue: '4188…', b: 'Аномалия', bValue: '280км', c: 'Вақт', cValue: '22 дақ' },
    },
    analysis: {
      title: 'Skimming белгилари',
      items: ['Geo velocity физик имконсиз', 'Иккита ATM боғлиқ кластерда', 'CVV хатолари бошқа карталарда ҳам', 'Мижоз хабар бермаган'],
    },
    endCorrect: { title: 'Карта блокланди', subtitle: 'Skimmer тергови · ATM cluster текширувда' },
    endPartial: { title: 'Soft block · мижоз тасдиқи', subtitle: 'Вақт йўқотилди · қўшимча ўғирлаш риски' },
    endFail: {
      code: 'FRAUD-422', title: 'Skimming давом этади',
      body: 'Geo velocity имконсиз бўлганда дарҳол block. Кузатиш режими қўшимча мижозларни зарар етказади.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Geo velocity имконсиз = дарҳол block.',
      'ATM cluster боғланиши — skimmer белгиси.',
      'CVV хатолар бошқа карталарда ҳам — фарма сигнали.',
      'Мижоз тасдиқи кутилмайди · дарҳол ҳимоя.',
      'Skimming давом этаётганда ҳар дақиқа қиммат.',
    ],
  },
};

const fraudChargeback = {
  title: 'Chargeback triage — friendly fraud', subtitle: 'FRAUD-510 · Dispute defense',
  proctorIntro: 'Мижоз delivery қабул қилганини рад этяпти. Tracking имзо кўрсатади.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Chargeback', title: 'Friendly fraud шубҳаси',
    subtitle: '$1240 электроника · "қабул қилмадим"', meta: 'FRAUD-510 · 5 кун deadline', cta: 'Dispute кўриш',
  },
  txPanel: {
    tag: 'CRM · CHARGEBACK', client: 'О. Юсупова · 4 йил мижоз',
    clientMeta: 'Premium карта · 11 chargeback сўнгги 12 ойда · pattern',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '5 кун аввал', text: '$1240 электроника харид · billing адрес' },
      { time: '4 кун аввал', text: 'Tracking · billing адресга етказилди' },
      { time: '4 кун аввал', text: 'Имзо · "О. Юсупова" tracking да' },
      { time: 'Бугун', text: '"Қабул қилмадим" chargeback' },
    ],
    indicators: {
      delivery: { label: 'Delivery', value: 'Имзо билан', hint: 'Billing адрес' },
      history: { label: 'Тарих', value: '11 chargeback', hint: 'Pattern' },
      pattern: { label: 'Pattern', value: 'Аниқ', hint: 'Friendly fraud' },
      reasonCode: { label: 'Reason', value: '4855', hint: 'Маҳсулот олмаганлиги' },
    },
  },
  actions: {
    defendEvidence: 'Далиллар йиғиш + dispute ҳимоя', defendEvidenceHint: 'Tracking + имзо · 5 кунда жавоб',
    partialRefund: 'Goodwill қисман refund', partialRefundHint: 'NPS сақланади · friendly fraud рағбатланади',
    acceptDispute: 'Disputeни қабул қилиш', acceptDisputeHint: 'ХАТАР · мижоз pattern давом этади',
  },
  proctorFeedback: {
    correct: 'Аъло. Tracking + имзо + 11 prior chargeback = friendly fraud. Далиллар билан ҳимоя — тўғри йўл.',
    partial: 'Goodwill refund қисқа муддатда яхши, лекин pattern давом этади ва бошқа мижозларга ҳам юқади.',
    fail: 'ХАТАР. Friendly fraud қабул қилинса, мижоз ҳар ой chargeback қилади. Банк учун йўқотиш.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Chargeback', client: 'Бу ҳафта 23 та dispute',
      cards: { a: 'Сумма', aValue: '$1240', b: 'Reason', bValue: '4855', c: 'Тарих', cValue: '11×' },
    },
    analysis: {
      title: 'Friendly fraud белгилари',
      items: ['Tracking имзо билан', 'Billing адресга етказилган', '11 prior chargeback сўнгги 12 ойда', 'Premium карта · узоқ тарих'],
    },
    endCorrect: { title: 'Dispute ҳимоя қилинди', subtitle: 'Далиллар етказилди · 5 кунда ҳал қилинади' },
    endPartial: { title: 'Goodwill refund берилди', subtitle: 'Pattern давом этиш риски' },
    endFail: {
      code: 'FRAUD-510', title: 'Friendly fraud рағбатланди',
      body: 'Tracking + имзо далиллари билан dispute ҳимоя қилиниши керак. Қабул қилиш friendly fraud патернини рағбатлантиради.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Tracking + имзо = кучли далил.',
      '11+ chargeback тарихи = friendly fraud сигнали.',
      'Goodwill refund pattern давом этишини рағбатлантиради.',
      'Reason code 4855 — энг кўп суиистеъмол.',
      'Dispute ҳимоя банкнинг ҳуқуқи.',
    ],
  },
};

const fraudAnomalyTuning = {
  title: 'AI anomaly model tuning', subtitle: 'FRAUD-630 · Threshold + backtest',
  proctorIntro: 'Ҳудуд тўлов-куни ўзгаргандан сўнг false-positive 4.2× ортди.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Model drift', title: 'FP rate 4.2× ортган',
    subtitle: 'Velocity rule · regional payday shift', meta: 'FRAUD-630 · model tuning', cta: 'Моделни кўриш',
  },
  txPanel: {
    tag: 'IB · MODEL ТАҲЛИЛИ', client: 'Velocity rule v3.4',
    clientMeta: 'Ишга тушган: 11 ой олдин · drift: 3 ҳафта · FP rate 4.2×',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '3 ҳафта', text: 'Ҳудуд тўлов-куни ўзгартирилди' },
      { time: '2 ҳафта', text: 'FP rate ўса бошлади' },
      { time: 'Бугун', text: 'FP rate 4.2× нормал' },
      { time: 'Бугун', text: 'Backtest тизими тайёр' },
    ],
    indicators: {
      fpRate: { label: 'FP rate', unit: '× нормал', hint: '> 2× = problem' },
      driftSource: { label: 'Drift сабаби', value: 'Payday shift', hint: 'Структуравий' },
      backtest: { label: 'Backtest', value: '6 ой data', hint: 'Тайёр' },
      coverage: { label: 'Coverage', value: '92%', hint: 'Сақланади' },
    },
  },
  actions: {
    tuneBacktest: 'Threshold + backtest + monitoring', tuneBacktestHint: 'Backtest hold-out · 1 ҳафта monitoring',
    partialBump: 'Қисман threshold кўтариш', partialBumpHint: 'FP камаяди · coverage тўғри текширилмайди',
    disableRule: 'Rule ни ўчириш', disableRuleHint: 'ХАТАР · fraud detection бўшашади',
  },
  proctorFeedback: {
    correct: 'Аъло. Backtest + monitoring — моделни ўзгартиришнинг ягона ишончли йўли. Coverage ва FP баланси.',
    partial: 'Тезда енгиллик, лекин backtestсиз ҳақиқий detection сақланганини билмайсиз.',
    fail: 'ХАТАР. Noisy ruleни ўчириш FP ни 0 қилади, лекин fraud ўтишни бошлайди. Мижозлар зарар кўради.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Model монитор', client: 'Актив rule · drift кузатуви',
      cards: { a: 'FP rate', aValue: '4.2×', b: 'Drift', bValue: '3 ҳафта', c: 'Backtest', cValue: 'Тайёр' },
    },
    analysis: {
      title: 'Model drift белгилари',
      items: ['FP rate 4.2× нормал', 'Структуравий drift · payday shift', 'Backtest тизими тайёр (6 ой data)', 'Coverage 92% сақланади'],
    },
    endCorrect: { title: 'Model tuningи', subtitle: 'Backtest + 1 ҳафта monitoring' },
    endPartial: { title: 'Threshold кўтарилди', subtitle: 'FP камайди · coverage текширилмаган' },
    endFail: {
      code: 'FRAUD-630', title: 'Rule ўчирилди',
      body: 'Noisy rule ўчирилса, fraud detection бўшашади. Backtest ва monitoring — моделни ўзгартиришнинг ягона ишончли йўли.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'FP rate ўсиши — model drift сигнали.',
      'Структуравий drift (payday) — тарих таҳлил зарур.',
      'Backtest hold-out — ишончли ўзгариш.',
      'Threshold тезкор кўтариш — coverage ни бузади.',
      'Rule ўчириш — энг охирги воситадан.',
    ],
  },
};

const cxAccountBlock = {
  title: 'Ҳисоб блоклаш · эмпатия', subtitle: 'CX-220 · Velocity false positive',
  proctorIntro: 'Premium мижоз уйқудан турди — картаси блокланган. Самолётга 90 дақиқа қолди.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Мижоз хизмати', title: 'Auto-block + самолёт',
    subtitle: 'Д. Юсупова · 5.4 йил мижоз', meta: 'CX-220 · эмпатия керак', cta: 'Сўровни очиш',
  },
  txPanel: {
    tag: 'CRM · МИЖОЗ ҲОЛАТИ', client: 'Дилфуза Юсупова',
    clientMeta: 'Premium · 5.4 йил · NPS 9.4 · самолётга 90 дақиқа',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: 'Кечаги', text: '5 та транзакция · velocity rule ёнди' },
      { time: 'Кечаги', text: 'Карта auto-block · огоҳлантириш юборилди' },
      { time: 'Бугун', text: 'Мижоз уйқудан турди · самолёт 90 дақиқа' },
      { time: 'Бугун', text: 'Premium линия · асабий овоз' },
    ],
    indicators: {
      reason: { label: 'Block сабаби', value: 'Velocity FP', hint: 'False positive' },
      tenure: { label: 'Tenure', unit: 'йил', hint: 'Лоял' },
      urgency: { label: 'Тезкорлик', value: '90 дақ', hint: 'Самолёт' },
      fraudRisk: { label: 'Fraud risk', value: 'Паст', hint: 'Профил мос' },
    },
  },
  actions: {
    empathyTemp: 'Эмпатик тушунтириш + вақтинчалик unblock', empathyTempHint: 'Supervisor approval · 24 соатлик ойна',
    protocolOnly: 'Фақат протокол бўйича жавоб', protocolOnlyHint: 'Эмпатия йўқ · NPS йўқотиш риски',
    dismiss: 'Шикоятни рад этиш', dismissHint: 'ХАТАР · Premium мижоз йўқотиш',
  },
  proctorFeedback: {
    correct: 'Аъло. False positive аниқ + premium + low fraud risk = эмпатик ечим. Supervisor approval — протоколга зид эмас.',
    partial: 'Протокол тўғри, лекин мижоз Premium NPS йўқотади · эмпатия керак эди.',
    fail: 'ХАТАР. Premium мижозни рад этиш · NPS пасайиши · кейинги йили churn.',
  },
  screen: {
    dashboard: {
      title: 'CX · Мижоз монитор', client: 'Бугун 12 та auto-block · 2 та FP',
      cards: { a: 'Даража', aValue: 'Premium', b: 'Сабаб', bValue: 'Velocity', c: 'Вақт', cValue: '90 дақ' },
    },
    analysis: {
      title: 'Ҳолат таҳлили',
      items: ['Velocity rule false positive', 'Профил ва харажатлар мос', 'Premium 5.4 йил мижоз', 'Самолётга 90 дақиқа'],
    },
    endCorrect: { title: 'Вақтинчалик unblock', subtitle: '24 соат · supervisor approval · NPS сақланди' },
    endPartial: { title: 'Протокол жавоб', subtitle: 'Эмпатия йўқ · NPS пасайиши' },
    endFail: {
      code: 'CX-220', title: 'Мижоз йўқотилди',
      body: 'Premium мижоз учун эмпатия керак эди. False positive аниқ ҳолатда вақтинчалик ечим — протоколга зид эмас.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'False positive — supervisor approval билан вақтинчалик unblock.',
      'Premium мижоз NPS қиммат.',
      'Эмпатия протоколга зид эмас.',
      'Тезкорлик — emergency lever ишлатиш вақти.',
      'Мижоз паспортини эсланг · профил мос бўлса, риск паст.',
    ],
  },
};

const cxAccessibility = {
  title: 'Имконияти чекланган мижоз', subtitle: 'CX-330 · Accessibility · assistive tech',
  proctorIntro: 'Кўриш қобилияти чекланган мижоз online banking билан қийналмоқда.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Мижоз ёрдами', title: 'Accessibility ёрдами',
    subtitle: 'М. Раҳимов · screen-reader', meta: 'CX-330 · вақт чеклов йўқ', cta: 'Ёрдамни бошлаш',
  },
  txPanel: {
    tag: 'CRM · ACCESSIBILITY', client: 'Мансур Раҳимов',
    clientMeta: 'Кўриш ногиронлиги · NVDA screen-reader · 3 йил мижоз',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '11:00', text: 'Мижоз қўнғироқ қилди' },
      { time: '11:01', text: '"Янги online banking тушунарсиз"' },
      { time: '11:02', text: 'Screen-reader учун навигация заиф' },
      { time: '11:03', text: 'Accessible flowлар мавжуд · bookmark имкони' },
    ],
    indicators: {
      need: { label: 'Эҳтиёж', value: 'Screen-reader', hint: 'Assistive tech' },
      product: { label: 'Маҳсулот', value: 'Online banking', hint: 'Янги версия' },
      frustration: { label: 'Ҳолат', value: 'Юқори', hint: 'Асабий' },
      tools: { label: 'Воситалар', value: 'Мавжуд', hint: 'Accessible flow' },
    },
  },
  actions: {
    fullSession: 'Тўлиқ сессия + screen-reader walkthrough', fullSessionHint: 'Accessible flow кўрсатиш · bookmark · 25 дақ',
    standardTutorial: 'Стандарт tutorial', standardTutorialHint: 'Screen-reader учун мос эмас · навигация муаммоси',
    redirect: 'Фақат телефон support га йўналтириш', redirectHint: 'ХАТАР · online banking дан воз кечтириш',
  },
  proctorFeedback: {
    correct: 'Аъло. Тўлиқ сессия · accessible flow кўрсатиш · мижоз мустақил бўлади. NPS ва inclusion иккиси ҳам.',
    partial: 'Стандарт tutorial screen-reader учун мос эмас. Мижоз яна қўнғироқ қилади.',
    fail: 'ХАТАР. Телефон-only йўналтириш ногирон мижозларга қарши дискриминация ҳисобланади.',
  },
  screen: {
    dashboard: {
      title: 'CX · Accessibility', client: 'Бугун 1 та assistive tech ёрдами',
      cards: { a: 'Эҳтиёж', aValue: 'NVDA', b: 'Маҳсулот', bValue: 'OB', c: 'Ёрдам', cValue: 'Тўлиқ' },
    },
    analysis: {
      title: 'Ёрдам стратегияси',
      items: ['Screen-reader билан мос навигация', 'Accessible flow лар мавжуд', 'Bookmark имкони', 'Вақт чеклов йўқ'],
    },
    endCorrect: { title: 'Тўлиқ сессия', subtitle: 'Мижоз мустақил бўлди · NPS юқори' },
    endPartial: { title: 'Стандарт tutorial', subtitle: 'Чекланган ёрдам · қайта қўнғироқ мумкин' },
    endFail: {
      code: 'CX-330', title: 'Inclusion бузилиши',
      body: 'Имконияти чекланган мижозларни фақат телефон га йўналтириш — дискриминация. Online banking accessible бўлиши керак.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Accessible flowларни билинг — банк мажбурияти.',
      'Screen-reader билан навигация бошқача.',
      'Вақт чеклаш йўқ · сабр — ёрдамнинг бир қисми.',
      'Bookmark имкони — мустақиллик калити.',
      'Inclusion — ҳар бир мижоз учун банк хизмати.',
    ],
  },
};

const cxInternalEscalation = {
  title: 'Ички эскалация протоколи', subtitle: 'CX-440 · Junior agent қўллаб-қувватлаш',
  proctorIntro: 'Junior agent агрессив мижозга қотиб қолди. Мижоз бақираяпти.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Internal SOS', title: 'Junior agent қотирилган',
    subtitle: 'Актив қўнғироқ · клиент бақиряпти', meta: 'CX-440 · дарҳол', cta: 'Ҳолатни кўриш',
  },
  txPanel: {
    tag: 'CRM · INTERNAL ESCALATION', client: 'Junior: А. Каримова (2 ой)',
    clientMeta: 'Актив қўнғироқ · клиент Х. Олимов (6 йил мижоз, асабий)',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '14:30', text: 'Junior қўнғироқ қабул қилди' },
      { time: '14:33', text: 'Клиент бақиришни бошлади' },
      { time: '14:34', text: 'Junior пауза қилди · жавоб йўқ' },
      { time: '14:35', text: 'Internal SOS ёнди' },
    ],
    indicators: {
      tone: { label: 'Мижоз тонуси', value: 'Агрессив', hint: 'De-escalation керак' },
      juniorState: { label: 'Junior', value: 'Қотирилган', hint: 'Ёрдам керак' },
      clientHistory: { label: 'Мижоз тарих', value: '6 йил', hint: 'Сақлаш арзийди' },
      queueLoad: { label: 'Навбат', value: '7', hint: 'Юқори' },
    },
  },
  actions: {
    takeOverCoach: 'Қабул қилиш · де-эскалация · коучерлик', takeOverCoachHint: 'Junior тинглайди · клиент тинч · кейин debrief',
    liveAdvise: 'Live маслаҳат (қўнғироққа кирмасдан)', liveAdviseHint: 'Junior ўрганади · клиент кутади · риск',
    leaveAlone: 'Junior ёлғиз ҳал қилсин', leaveAloneHint: 'ХАТАР · клиент ва junior иккиси ҳам йўқотилади',
  },
  proctorFeedback: {
    correct: 'Аъло. Қабул + де-эскалация + debrief = junior ўсади, мижоз сақланади. Икки мақсад.',
    partial: 'Live маслаҳат ишлайди, лекин клиент кутади · паузалар агрессия кучайтиради.',
    fail: 'ХАТАР. 2 ойлик junior агрессив 6 йиллик мижоз билан ёлғиз — иккаласи ҳам йўқолади.',
  },
  screen: {
    dashboard: {
      title: 'CX · Senior dashboard', client: 'Актив junior SOS · 2 та навбат',
      cards: { a: 'Junior', aValue: 'А. К.', b: 'Мижоз', bValue: '6 йил', c: 'Тонус', cValue: 'Агрессив' },
    },
    analysis: {
      title: 'Эскалация ҳолати',
      items: ['Junior 2 ой тажриба', 'Мижоз 6 йил содиқ', 'Агрессия · de-escalation зарур', 'Live coaching + debrief имкони'],
    },
    endCorrect: { title: 'Senior қабул қилди', subtitle: 'Клиент тинч · junior ўрганди · debrief белгиланди' },
    endPartial: { title: 'Live маслаҳат', subtitle: 'Чекланган ёрдам · клиент кутди' },
    endFail: {
      code: 'CX-440', title: 'Икки томон йўқотилди',
      body: 'Junior coaching ва мижоз сақлаш — иккаласи ҳам senior мажбурияти. Ёлғиз қолдириш — йўқотиш.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Internal SOS — senior эшигини дарҳол очиш.',
      'De-эскалация senior тажрибаси билан кучли.',
      'Debrief — junior ўсишининг манбаи.',
      'Мижоз сақлаш + junior coaching = икки мақсад.',
      'Ёлғиз қолдириш — иккаласини ҳам йўқотиш.',
    ],
  },
};

const cxComplexCustomer = {
  title: 'Мураккаб мижоз · 3 та сўров', subtitle: 'CX-550 · Multi-product triage',
  proctorIntro: '8 йиллик Premium мижоз statementни жамлаш, фоиз қайта кўриб, бенефициар ўзгартириш сўраяпти.',
  proctorMicInstruction: 'Микрофонни босинг ёки танловни босинг.',
  notification: {
    tag: 'Multi-сўров', title: 'Бир қўнғироқда 3 та сўров',
    subtitle: 'З. Каримов · 5 маҳсулот · 8.7 йил', meta: 'CX-550 · structured triage', cta: 'Сўровни очиш',
  },
  txPanel: {
    tag: 'CRM · MULTI-PRODUCT', client: 'Зафар Каримов',
    clientMeta: 'Premium · 5 маҳсулот · 8.7 йил · NPS 9.6 · оилавий ҳисоб',
    yourTask: 'Сизнинг қарорингиз', taskHint: 'Битта тўғри жавобни танланг.', timelineLabel: 'Воқеалар тартиби',
    timeline: [
      { time: '11:10', text: '"Ҳаммаси statementни жамлаш керак"' },
      { time: '11:11', text: '"Фоиз қайта кўриб чиқилсин"' },
      { time: '11:12', text: '"Бенефициарни ўзгартирмоқчиман"' },
      { time: '11:13', text: 'Мижоз иш кунининг охири' },
    ],
    indicators: {
      products: { label: 'Маҳсулот', value: '5', hint: 'Multi-product' },
      requests: { label: 'Сўров', value: '3', hint: 'Бир қўнғироқда' },
      tenure: { label: 'Tenure', unit: 'йил', hint: 'Premium' },
      satisfaction: { label: 'NPS', value: '9.6', hint: 'Юқори' },
    },
  },
  actions: {
    structuredTriage: 'Структурали triage + ёзма follow-up', structuredTriageHint: 'Биринчи: бенефициар (KYC) · иккинчи: statement · учинчи: callback',
    partialCallback: 'Биттасини ҳозир + callback бошқалар учун', partialCallbackHint: 'Сўровлар бўлинади · мижоз икки марта гаплашади',
    oneOnly: 'Фақат биттасини бажариш', oneOnlyHint: 'ХАТАР · мижоз хафа бўлади · NPS пасаяди',
  },
  proctorFeedback: {
    correct: 'Аъло. Структурали triage · KYC биринчи (ҳуқуқий аҳамият) · ёзма follow-up · Premium тарих қадрланди.',
    partial: 'Биттаси+callback ишлайди, лекин мижоз қайтадан гаплашиши керак · вақт йўқотиш.',
    fail: 'ХАТАР. Premium 8.7 йил мижозни рад этиш — кейинги йили churn риски.',
  },
  screen: {
    dashboard: {
      title: 'CX · Multi-product', client: 'Актив multi-сўров · Premium',
      cards: { a: 'Сўров', aValue: '3', b: 'Маҳсулот', bValue: '5', c: 'Тарих', cValue: '8.7й' },
    },
    analysis: {
      title: 'Сўровлар triage',
      items: ['Бенефициар ўзгартириш — KYC (ҳуқуқий)', 'Statement жамлаш — техник', 'Фоиз қайта кўриш — юқори ваколат', 'Premium 8.7 йил тарих қадрланади'],
    },
    endCorrect: { title: 'Структурали жавоб', subtitle: '3 сўров тартибланган · ёзма follow-up' },
    endPartial: { title: 'Биттаси + callback', subtitle: 'Мижоз қайтадан гаплашади · вақт йўқотиш' },
    endFail: {
      code: 'CX-550', title: 'Мижоз хафа',
      body: 'Premium 8.7 йил мижоз мураккаб сўров билан келди · фақат биттаси бажарилиши протоколга зид эмас, лекин NPS ва churn риски.',
    },
  },
  debrief: {
    title: 'Машғулот натижаси', score: 'Баҳо', tipsTitle: 'Асосий хулосалар',
    tips: [
      'Структурали triage — ҳар сўровни тартибланг.',
      'KYC сўровлари биринчи (ҳуқуқий аҳамият).',
      'Ёзма follow-up — мижоз хотиржам бўлади.',
      'Premium тарих — йўқотмаслик мажбурияти.',
      'Бир қўнғироқда ҳаммасини — вақт ва respect.',
    ],
  },
};

export const uzCyrlScenarios = {
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
