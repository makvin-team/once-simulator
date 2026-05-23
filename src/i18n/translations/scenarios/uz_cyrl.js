/**
 * Uzbek (Cyrillic) translations for the 16 m2-m5 scenarios.
 * Mirrors the shape of scenarios/uz.js exactly; transliterated content.
 */

const amlBeneficialOwner = {
  title: 'KYC чуқурлаштирилган — UBO',
  subtitle: 'AML §5.1 · Beneficial owner аниқлаш',
  proctorIntro: 'KYC ойнаси олдидасиз. Юридик шахс ҳисоб очиш сўрови келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · KYC ойнаси · 10:10 Сешанба',
    context:
      'Сешанба куни 10:10. Сиз KYC навбатчи ходимисиз. "Konsalting Plus МЧЖ" (ИНН 30412840100501) корпоратив ҳисоб очиш сўрови билан келди. Вакил А. Назаров ҳужжатларни келтирган, лекин UBO (ultimate beneficial owner) маълумотини беришдан бош тортяпти — "бу махфий маълумот, биз бошқарувчини кўрсатамиз". Рўйхатдан ўтиш ҳужжатларига кўра, компания BVI юрисдикциясида ташкил этилган, учта воситачи қатлам орқали назорат қилинади. Бошланғич капитал — 5 млн USD. AML §5.1 талаб қилади: корпоратив ҳисоб очишдан олдин ultimate beneficial owner аниқланиши шарт, ҳар бир қатлам очилиши керак.',
    whatYouSee: [
      'Ташкилот: Konsalting Plus МЧЖ · ИНН 30412840100501 · BVI юрисдикциясида рўйхатдан ўтган.',
      'Эгалик тузилмаси: 3 воситачи қатлам · UBO яширин · POA билан А. Назаров вакил.',
      'Бошланғич капитал: 5 млн USD · маълум манба кўрсатилмаган · onboarding 2 ҳафта аввалда.',
    ],
    whatYouHear: [
      '«Бу махфий маълумот, сиз фақат бошқарувчини билишингиз керак.»',
      '«Ҳужжатларни кейинроқ томонидан юборамиз, ҳозир ҳисобни очайлик.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Тўловлар консоли олдидасиз. Санкция сканери огоҳлантириш берди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Тўлов сканери · 13:10 Пайшанба',
    context:
      'Пайшанба куни 13:10. Сиз AML тўловлар консолининг навбатчи таҳлилчисисиз. Акмал Каримов (ИНН 30312840190303) 240 минг АҚШ доллари wire-ўтказма сўрамоқда — бенефициар Алматида. Санкция сканери OFAC SDN рўйхатига нисбатан 88% fuzzy мослик аниқлади: бенефициарнинг исми ва туғилган санаси қисман тақиқланган шахс билан мос келади. Коридор UZ→KZ high-risk рўйхатда. AML §6.2 талаб қилади: 80%+ мосликда транзакция дарҳол блокланади ва 24 соат ичида OFAC ҳисоботи юборилади. Тўғридан-тўғри мижоз билан суҳбат йўқ — бу тизим аниқлаган вазият.',
    whatYouSee: [
      'Wire сўрови: 240 минг АҚШ доллари · бенефициар Алматида · UZ→KZ коридори (high-risk).',
      'Санкция сканери: OFAC SDN рўйхатига 88% fuzzy мослик · исм + туғилган сана мос келади.',
      'Мижоз: Акмал Каримов · ИНН 30312840190303 · стандарт KYC бажарилган · 3 йил мижоз.',
    ],
    whatYouHear: [
      'Сканер огоҳлантириши: «88% мослик · OFAC SDN · операторни қарорига қолдирилган».',
      'Ҳеч бир мижоз тушунтириши йўқ — тўлов ATM канали орқали, жонли суҳбат йўқ.',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Кассада навбатчисиз. PEP белгили мижоздан катта кирим келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Филиал кассаси · 15:00 Чоршанба',
    context:
      'Чоршанба куни 15:00. Сиз Тошкент-1 филиалининг навбатчи ходимисиз. Баҳодир Салимов (ИНН 30112840100210) — ҳудуд депутати, 8 йиллик мижоз — 420 млн сўм бизнес даромадини жойлаштирмоқчи. CRM профилида PEP белгиси ёқилган. Мижоз манба сифатида «менинг қурилиш компаниям» ни кўрсатади ва 2 ой аввал тузилган иш контрактини тақдим этади. AML §7.3 талаб қилади: Politically Exposed Person учун стандарт KYC етарли эмас — Enhanced Due Diligence ва senior approval мажбурий, 100 млн+ суммаларда манба ҳужжати тўлиқ текширилади.',
    whatYouSee: [
      'Профил: Баҳодир Салимов · ИНН 30112840100210 · ҳудуд депутати · PEP белгиси ёқилган · 8 йил мижоз.',
      'Кирим: 420 млн сўм нақд · манба: «қурилиш компанияси» · контракт 2 ой аввалда тузилган.',
      'Талаб: AML §7.3 EDD мажбурий · senior тасдиқ · манба ҳужжати текширилиши шарт.',
    ],
    whatYouHear: [
      '«Бу менинг қурилиш компаниямнинг даромади, ҳужжат олиб келдим.»',
      '«Тезроқ қабул қилинг, мен депутатман, вақтим йўқ.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  title: 'SAR ёзиш — амалиёт', subtitle: 'AML §8.1 · 5W нарратив формати',
  proctorIntro: 'SAR драфти тизимида вазиятни ўрганинг. Таҳлил тугаган — энди нарратив форматини танлаш керак.',
  caseContext: {
    tag: 'Вазият · SAR драфти · 11:30 Жума',
    context:
      'Жума куни 11:30. Сиз AML жамоасининг таҳлилчисисиз. 3 ҳафта давомида олиб борилган pattern таҳлили тугади: 3 та янги мижоз (ҳар бири 30-45 кун аввал очилган) ҳисобига жами 4 та транзакция орқали 50 млн сўмдан ортиқ нақд кирим келган, ҳар бири дарҳол ташқи картага ўтказилган. Далиллар тўлиқ, Compliance га юбориш учун SAR draft керак. AML §8.1 талаб қилади: фактик 5W формати (Ким, Нима, Қачон, Қаерда, Қанча), нейтрал ва профессионал оҳанг, ҳиссиёт ёки айбловсиз. Compliance 24 соат ичида SAR ни кўради ва юбориш тўғрисида қарор қабул қилади.',
    whatYouSee: [
      'Pattern: 3 янги ҳисоб (30-45 кун) · 4 та транзакция · жами 156 млн сўм нақд кирим.',
      'Йўналиш: барча маблағ дарҳол ташқи UnionPay картага ўтказилган (3 та турли карта).',
      'Талаб: 5W фактик нарратив · AML §8.1 · Compliance 24 соат ичида кўради.',
    ],
    whatYouHear: [
      'Compliance manager дан эслатма: «ҳиссиётсиз, фақат факт — ҳар гап аудит исботи билан».',
      'AI ёрдамчи: «pattern аниқ, далиллар тўлиқ — drafting бошлаш мумкин».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'SOC консоли олдидасиз. IDS critical огоҳлантириш берди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · SOC консоли · 09:34 Сешанба',
    context:
      'Сешанба куни 09:34. Сиз SOC навбатчи таҳлилчисисиз. IDS critical огоҳлантириш берди: Finance бўлимининг иш станцияси FIN-WS-12 (Win11, домен уланишида) admin$ shareʼга ноқонуний уриниш қилди ва кейин ёндош хостда SMB скан бошлади. Фойдаланувчи 09:14 да нормал login қилган эди, 18 дақиқадан кейин паттерн бошланди. Бу классик lateral movement белгиси — ransomware операторлари одатда шу йўл билан тармоқ бўйлаб тарқалади. IR жамоа stand-by да, изоляция тугмаси сизнинг консолингизда.',
    whatYouSee: [
      'Хост: FIN-WS-12 · Finance бўлими · Win11 · домен уланишида · охирги login 09:14.',
      'Паттерн: admin$ share уриниш + SMB скан ёндош хостда · IDS critical alert · 09:32-09:34.',
      'Тармоқ ҳолати: 1 хост шубҳали · бэкап тармоқлар ҳозирча тоза · IR жамоа stand-by.',
    ],
    whatYouHear: [
      'IDS хабари: «critical alert · admin$ share access attempt · 1 host · lateral movement паттерн».',
      'IR етакчиси шивирлаб: «кутамизми ёки изоляция қиламизми — қарорни сиз қабул қиласиз».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'IR command center да вазиятни ўрганинг. Актив ransomware ҳужуми — ҳар сония муҳим.',
  caseContext: {
    tag: 'Вазият · IR command center · 14:46 Чоршанба',
    context:
      'Чоршанба куни 14:46. Сиз Incident Response жамоасининг етакчисисиз. 14 дақиқа аввал (14:32 да) Finance бўлимида биринчи хост Lockbit ransomware варианти томонидан шифрланди. Ҳозирга қадар 8 та хост юқумланган, янги хабар шу дақиқада пайдо бўлди: ransom — 50 BTC (тахминан 1.5 млн USD). Бэкап тармоқ физикавий равишда ажратилган ва ҳали тоза, аммо агар инкубация давом этса, бэкап ҳам хавф остида қолади. NIST 800-61 протоколи аниқ белгилайди: Containment биринчи, кейин Eradication, кейин Recovery — forensic далилларни сақлаб қолиш керак.',
    whatYouSee: [
      'Тарқалиш: 8 хост шифрланган · барчаси Finance бўлимида · 14 дақиқада (14:32 → 14:46).',
      'Ransomware: Lockbit варианти · ransom хабари 50 BTC (≈ 1.5 млн USD) · BTC манзил берилган.',
      'Бэкап: физикавий ажратилган тармоқда · ҳали тоза · агар кечиктирилса юқиши мумкин.',
    ],
    whatYouHear: [
      'CTO шивирлаб: «forensicни сақланг — суғурта ва кейинги тергов учун зарур».',
      'Junior IR: «бэкапдан тезда тиклаймизми, ахир вақт йўқ?»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'IAM access бошқаруви олдидасиз. Ташқи вендор admin ҳуқуқи сўрайди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · IAM access бошқаруви · 10:12 Пайшанба',
    context:
      'Пайшанба куни 10:12. Сиз IAM (Identity and Access Management) навбатчи муҳандисисиз. Ташқи вендор — "TechVendor LLC" (2 йиллик шартнома, 6 муҳандис) — production муҳитига доимий admin кириш сўради. Вакил "доимий техник хизмат" деб тушунтиряпти: улар ҳар куни техник кўрик ўтказади ва шошилинч ҳолатларда уланмоқ керак. Бизнинг Zero Trust стратегиямиз IB-505 да ёзилган — ҳар сўровга шубҳа билан қараш, minimum privilege принсипи. JIT (Just-In-Time) access тизими тайёр: 4 соатлик ойналар, ҳар сессияга тасдиқ, журнал, сессия тугаши билан автоматик ўчириш.',
    whatYouSee: [
      'Сўровчи: TechVendor LLC · ташқи хизмат кўрсатувчи · 2 йил шартнома · 6 муҳандис.',
      'Сўров: production admin · доимий уланиш · "доимий техник хизмат" деб тушунтирилган.',
      'Мавжуд: JIT access тизими · 4 соат ойналар · сессияга тасдиқ + журнал · auto-revoke.',
    ],
    whatYouHear: [
      'Вендор вакили: «доимий уланиш бизга шошилинч ҳолатларда жавоб беришни осонлаштиради».',
      'CISO эслатма: «вендор хакерланган бўлса — биз ҳам бузиламиз, бу supply chain риски».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Treasury оператор столида вазиятни ўрганинг. "CEO" тезкор wire сўрамоқда — овоз шубҳали.',
  caseContext: {
    tag: 'Вазият · Treasury оператор · 16:04 Жума',
    context:
      'Жума куни 16:04. Сиз Treasury операторисиз, охирги иш куни. Нотаниш рақамдан қўнғироқ келди: овоз CEO Акмал Турсунов ники бўлади, лекин бир оз uncanny — сўзлар ўртасидаги паузалар табиий эмас, интонация ғалати. У 200 минг АҚШ доллари ҳажмидаги тезкор wire-ўтказмани сўрамоқда — "савдо улгурмасин, мен ҳозир аэропортдаман, ҳужжат кейин келади". Сўнгги 6 ойда 4 та ўхшаш deepfake ҳужум банк секторида рўй берган. IB-606 протоколи мажбурий: катта wire сўровлари учун callback CEO нинг маълум рақамига. Сизнинг экранингизда — CEO нинг расмий рақами ва сессия ёзувчиси.',
    whatYouSee: [
      'Қўнғироқ: нотаниш рақамдан · 4 дақиқа давом этмоқда · "CEO Акмал Турсунов" деб тақдим этган.',
      'Овоз: uncanny (паузалар ғалати, интонация табиий эмас) · deepfake белгиси юқори.',
      'Сўров: 200 минг АҚШ доллари wire · дарҳол · "савдо улгурмасин" · ҳужжат кейин.',
    ],
    whatYouHear: [
      '«Wire ни дарҳол амалга оширинг, савдо улгурмасин. Мен ҳозир аэропортдаман.»',
      '«Ҳужжатни кейин юбораман, ҳозир тасдиқ бериш вақти йўқ, ишон менга.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Onboarding консоли олдидасиз. Янги ҳисоб сўровида composite ID белгиси пайдо бўлди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Onboarding консоли · 09:23 Душанба',
    context:
      'Душанба куни 09:23. Сиз онлайн-онбординг навбатчи таҳлилчисисиз. Мобил иловадан «Рустам Аҳмедов» номи билан ҳисоб очиш сўрови келди. ID текшируви қизиқ нарсани кўрсатди: кўрсатилган ИНН ҳақиқий ва давлат базасида бор — лекин бу исм бу ИНН билан биринчи марта ёзилмоқда. Рўйхатдан ўтиш адреси сўнгги 6 ойда 3 та турли flagged ҳисобга боғланган. Credit file thin (янги яратилган). Энг муҳими — device fingerprint бошқа flagged ҳисоблар очилганда ҳам кўрилган. Бу классик synthetic identity белгиси: реал маълумотлардан composite identity яратилган, mule ёки credit fraud схемаси учун тайёрланган.',
    whatYouSee: [
      'ID: кўрсатилган ИНН ҳақиқий · исм бу ИНН билан биринчи марта ёзилмоқда · composite.',
      'Адрес: 6 ойда 3 та турли flagged ҳисобга боғланган · барчаси mule схемасида шубҳа қилинган.',
      'Device fingerprint: такрорий · 5 та бошқа ҳисоб очилганда ҳам кўрилган · ферма сигнали.',
    ],
    whatYouHear: [
      'Onboarding бот: «сўров тасдиқлаш учун · қарор операторга».',
      'Fraud монитор: «device fingerprint match · cluster id 3 · composite ID flagged · онбординг пауза тавсия этилади».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Карта монитор олдидасиз. Тизим geo velocity аномалия аниқлади — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Карта монитор · 14:08 Жума',
    context:
      'Жума куни 14:08. Сиз fraud монитор навбатчи таҳлилчисисиз. Тизим Premium карта 4188…7733 (эгаси Дониёр Рашидов, 3 йиллик мижоз) бўйича огоҳлантириш берди: картани 13:45 да Тошкент ATM-да 500 минг сўм нақд олиш учун ишлатилган, сўнгра 14:07 да Самарқанд ATM-да яна 500 минг сўм чиқарилган. 280 км масофа, 22 дақиқада — физикавий жиҳатдан имконсиз. Иккала ATM ҳам географик кластерда боғлиқ (охирги 30 кунда 8 та шубҳа картаси шу кластердан ўтган). Бошқа карталардаги CVV хатолари ҳам кўпайган. Классик ATM скимминг + clone сигнали.',
    whatYouSee: [
      'Карта: 4188…7733 · Дониёр Рашидов · Premium · 3 йил · охирги нормал фойдаланиш кечаги.',
      'Velocity: Тошкент 13:45 (500K сўм) → Самарқанд 14:07 (500K сўм) · 280 км · 22 дақиқа.',
      'Cluster: иккала ATM боғлиқ · 30 кун ичида 8 та шубҳа картаси · CVV хатолари кўпайган.',
    ],
    whatYouHear: [
      'Fraud бот: «geo velocity violation · 280 км/22 мин · физикавий имконсиз».',
      'ATM оперативи (телефон): «Самарқанд қурилмасига шубҳали қоплама топилди — техник текширув кетмоқда».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Chargeback консоли олдидасиз. Янги низо келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Chargeback консоли · 10:30 Сешанба',
    context:
      'Сешанба куни 10:30. Сиз chargeback навбатчи таҳлилчисисиз. Мижоз Озода Юсупова (4 йиллик мижоз, Premium карта) reason code 4855 («маҳсулот олмадим») билан 1240 АҚШ долларлик электроника хариди учун chargeback очди. 5 кун аввал мижоз UnionMall онлайн-дўконида бу харидни амалга оширган, billing адреси: унинг рўйхатдан ўтган манзил. 4 кун аввал курьер хизмати пакет етказиб берган ва имзода «O. Юсупова» ёзилган — tracking тизимида тасвир ва GPS координата бор. Энг муҳими: мижознинг сўнгги 12 ойдаги chargeback тарихи — 11 та низо, деярли ҳар ой биттадан. Бу классик friendly fraud (chargeback misuse) схемаси. Visa қоидаларига кўра 5 кун ичида defence далиллари тақдим этилиши керак.',
    whatYouSee: [
      'Мижоз: Озода Юсупова · 4 йил мижоз · Premium карта · NPS 6.8 (ўртача).',
      'Харид: $1240 электроника · UnionMall онлайн-дўкон · billing = рўйхатдан ўтган манзил · 5 кун аввал.',
      'Тарих: охирги 12 ойда 11 та chargeback · деярли ҳар ой · барчаси reason 4855.',
    ],
    whatYouHear: [
      'Мижоз chargeback формасида: «Товар етиб келмади, мен ҳеч нарса қабул қилмадим.»',
      'Tracking тизими: «Пакет етказилди · имзо: O. Юсупова · GPS billing адреси билан мос · вақт 14:22».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Модел бошқаруви олдидасиз. Velocity rule drift аниқланди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Модел бошқаруви · 11:30 Чоршанба',
    context:
      'Чоршанба куни 11:30. Сиз Fraud AI жамоасининг модел муҳандисисиз. Velocity rule v3.4 (11 ой аввал ишга тушган) сўнгги 3 ҳафта давомида ноаниқ ҳаракат қилмоқда: яънидир нотўғри ишлаш даражаси (FP rate) одатдагидан 4.2 марта юқори. Сабаб аниқланган — Тошкент ҳудудида давлат сектор ходимлари учун тўлов-куни 3 ҳафта аввал 25-чидан 5-чигача кўчирилди. Бу эски velocity нормасига зид келади. Backtest тизими тайёр: 6 ойлик тарихий маълумотлар мавжуд, hold-out тестлаш учун имконият бор. Coverage ҳозир 92% — tuning пайтида бу паст тушмаслиги муҳим. Моделни ўзгартириш — банк бутун fraud detection тизими учун критик.',
    whatYouSee: [
      'Модел: velocity rule v3.4 · 11 ой ишлаган · drift бошланган вақт: 3 ҳафта аввал.',
      'FP rate: 4.2× нормал · сабаб структуравий: payday Тошкент давлат секторида 25→5 га кўчирилган.',
      'Backtest: 6 ой тарихий маълумотлар мавжуд · coverage ҳозир 92% (сақланиши керак).',
    ],
    whatYouHear: [
      'Fraud manager: «моделни дарҳол tunelagin, лекин coverage тушмасин — fraud ўтишини хоҳламаймиз».',
      'Junior data scientist: «балки rule ни умуман ўчирсак? FP rate жуда юқори-ку».',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Premium линия навбатчисисиз. Мижоздан асабий қўнғироқ келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Premium support · 07:42 Сешанба',
    context:
      'Сешанба тонги 07:42. Сиз Premium support линиясининг навбатчисиз. Қўнғироқ қилади Дилфуза Юсупова, 5.4 йил бизнинг мижозимиз, NPS 9.4. Кечаги тунда velocity rule 5 та транзакциясидан кейин унинг картасини auto-block қилди — барчаси профил ва харажат паттернга тўғри келади, классик false positive. SMS огоҳлантириш юборилган, лекин мижоз уйқу пайтида кўрмаган. Ҳозир аэропортга 90 дақиқа қолди, мижоз асабий, бақиряпти. Fraud risk скор паст — профил мос.',
    whatYouSee: [
      'CRM: Дилфуза Юсупова · Premium · 5.4 йил · NPS 9.4 · охирги йил 0 та chargeback.',
      'Блок сабаби: velocity rule (5 транзакция 12 дақ ичида) · профил мос · fraud риск паст.',
      'Вақт босими: аэропортга 90 дақиқа · самолёт Дубай · supervisor on-call.',
    ],
    whatYouHear: [
      '«Карта ишламайди, мен аэропортдаман — сиз мендан пул тортиб олдингизми?»',
      '«Мен 5 йилдан бери сизнинг мижозингизман, бу нима аҳвол бу?»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Accessibility ёрдам линияси олидасиз. Мижоздан мурожаат келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Accessibility ёрдами · 10:18 Душанба',
    context:
      'Душанба куни 10:18. Сиз Accessibility ёрдам линиясининг навбатчисиз. Қўнғироқ қилади Мурод Раҳимов (ИНН 30412840290007), 4.1 йил бизнинг мижозимиз. У кўриш қобилиятини йўқотган — NVDA screen-reader билан ишлайди. Янги online banking интерфейсида пул ўтказма саҳифаси яроқсиз — тугмаларда ARIA label йўқ, баланс матни alt-text эмас, "Тасдиқлаш" тугмаси экран ўқигич томонидан топилмаяпти. Мижоз аллақачон 25 дақиқа саҳифани айланиб чиқди, овозида чарчоқ сезилмоқда. Бизнинг Accessibility manual §3 талаб қилади: full guided session + bookmark қилинган accessible flowлар.',
    whatYouSee: [
      'CRM: Мурод Раҳимов · ИНН 30412840290007 · 4.1 йил мижоз · accessibility flag: кўриш.',
      'Маҳсулот: янги online banking (v3.2) · ARIA audit ҳали ўтмаган · screen-reader compat паст.',
      'Сессия тарихи: охирги 25 дақиқа · 7 та муваффақиятсиз уриниш · охирги саҳифа "transfer/confirm".',
    ],
    whatYouHear: [
      '«Тасдиқлаш тугмасини топа олмаяпман, саҳифа screen-reader билан ишламаяпти.»',
      '«Аввалги версияда ўзим қила олардим, энди ёрдам керак — бу адолатсизлик.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
    standardTutorial: 'Стандарт ўқув қўлланма', standardTutorialHint: 'Экран ўқигич учун мос эмас · навигация муаммоси',
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
  proctorIntro: 'Senior консультант экрангиз олдидасиз. Junior agentдан ички SOS келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Ички SOS · 15:32 Чоршанба',
    context:
      'Чоршанба куни 15:32. Сиз CX жамоасининг senior консультантисиз. Ички SOS сигнали келди — junior agent Азиз Каримов (3 ҳафта иш стажи) қўнғироқда қотирилиб қолди. Мижоз — юқори қийматли корпоратив вакили "Soylama Ltd" тарафидан, 14 йил мижоз, охирги 6 ойда 3 та шикоят очилган. Мижоз товушини баланд қилиб, сўкиш ишлатиб гапиряпти. Junior agent жим, физикавий реакция: pulse 124, қўллари титрамоқда. Live навбат — 4 та қўнғироқ кутмоқда. CX-440 протоколи: take-over + coach.',
    whatYouSee: [
      'Junior agent экрани: Азиз Каримов · 3 ҳафта стаж · юрак уриши 124 · ёпиқ режим фаол.',
      'Мижоз: Soylama Ltd вакили · 14 йил мижоз · 6 ойда 3 шикоят · NPS сезгиси юқори.',
      'Жамоа: 4 та қўнғироқ кутмоқда · senior manager офисдан ташқарида · сизнинг навбатингиз.',
    ],
    whatYouHear: [
      '«Бу ерда ким ишлаяпти? Сен умуман гапира оласизми?!»',
      'Junior ёпиқ каналдан: «Senior, мен нима қилишни билмаяпман... мен янгиман.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
  proctorIntro: 'Premium линия навбатчисисиз. Узоқ йиллик мижоздан комплекс сўров келди — вазиятни ўрганинг.',
  caseContext: {
    tag: 'Вазият · Premium support · 11:15 Жума',
    context:
      'Жума куни 11:15. Premium support линиясининг навбатчисиз. Қўнғироқ қилади Зафар Каримов, 8.7 йил бизнинг мижозимиз, NPS 9.6. У бизнинг банкда 5 та фаол маҳсулот сақлайди: депозит, ипотека, кредитка, брокерлик ҳисоби, суғурта. Ҳисобида 3 та оила аъзоси вакил сифатида ёзилган. Бир қўнғироқда у 3 та катта сўров кўтаряпти: (1) барча 5 маҳсулот учун ягона ойлик statement; (2) ипотека фоизини қайта кўриб чиқиш (2 йил аввал 17% билан олинган); (3) брокерлик ҳисобида бенефициар ўзгартириш (отаси вафот этган). Ҳар бир сўров алоҳида бўлимга тааллуқли, ҳар бири 15-20 дақиқа вақт олади. Мижоз хотиржам, лекин чарчаган оҳангда.',
    whatYouSee: [
      'CRM: Зафар Каримов · ИНН 30412840190201 · Premium · 8.7 йил · NPS 9.6 · 5 маҳсулот.',
      'Сўровлар: (a) консолидациялашган statement, (b) ипотека қайта-кўриш, (c) бенефициар ўзгариши.',
      'Ҳисобий: 5 та маҳсулот · 3 та оила вакили · охирги қўнғироқ 90 кун аввал.',
    ],
    whatYouHear: [
      '«Ҳаммасини битта қўнғироқда ҳал қиламиз, вақтим жуда кам.»',
      '«Отам вафот этди, брокерлик ҳисобида бенефициар ўзгартириш керак — бошқалари ҳам бир вақтда бўлади.»',
    ],
    begin: 'Таҳлилни бошлаш',
  },
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
