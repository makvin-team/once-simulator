/**
 * Russian translations for the 16 m2-m5 scenarios. Same shape as
 * scenarios/uz.js, translated content.
 */

const amlBeneficialOwner = {
  title: 'Углублённый KYC — UBO',
  subtitle: 'AML §5.1 · определение конечного бенефициара',
  proctorIntro: '"Консалтинг ООО" хочет открыть счёт. UBO не раскрывают.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'KYC эскалация',
    title: 'UBO документ не предоставлен',
    subtitle: 'Корп. счёт · внешняя юрисдикция',
    meta: 'AML §5.1 · 10 минут на решение',
    cta: 'Открыть документ',
  },
  txPanel: {
    tag: 'CRM · ЮРЛИЦО',
    client: 'Консалтинг Плюс ООО',
    clientMeta: 'ИНН 30412840100501 · Представитель: А. Назаров · открыт 2 нед. назад',
    yourTask: 'Ваше решение',
    taskHint: 'Выберите один правильный ответ.',
    timelineLabel: 'Хронология',
    timeline: [
      { time: '10:02', text: 'Представитель запросил счёт · "корпоративный"' },
      { time: '10:05', text: 'Запросили UBO · представитель: "это конфиденциально"' },
      { time: '10:10', text: 'BVI юрисдикция · три промежуточных слоя' },
      { time: '10:12', text: 'Начальный капитал 5 млн USD' },
    ],
    indicators: {
      entity: { label: 'Тип', value: 'LLC · BVI', hint: 'Внешняя юрисдикция' },
      ubo: { label: 'UBO', value: 'Скрыт', hint: 'Нарушение AML §5.1' },
      jurisdiction: { label: 'Юрисдикция', value: 'BVI', hint: 'High-risk' },
      capital: { label: 'Капитал', value: '5M USD', hint: 'Высокая сумма' },
    },
  },
  actions: {
    demandUbo: 'Требовать UBO документ',
    demandUboHint: 'Онбординг приостановлен · показать все слои',
    escalate: 'Эскалация в Compliance',
    escalateHint: 'Совместное решение · 4 часа',
    openAnyway: 'Открыть с текущими документами',
    openAnywayHint: 'РИСК · нарушение AML §5.1',
  },
  proctorFeedback: {
    correct: 'Отлично. Требование UBO — единственный верный путь по AML §5.1.',
    partial: 'Эскалация — безопасное решение, но сотрудник должен сам запросить UBO.',
    fail: 'РИСК. Корпоративный счёт без UBO — прямое нарушение §5.1.',
  },
  screen: {
    dashboard: {
      title: 'KYC · Юрлица',
      client: 'Сегодня 3 корп. запроса · 1 эскалация',
      cards: { a: 'Тип', aValue: 'LLC', b: 'UBO', bValue: 'Скрыт', c: 'Капитал', cValue: '5M $' },
    },
    analysis: {
      title: 'KYC red-flag признаки',
      items: ['BVI юрисдикция · внешняя', 'Документ UBO отсутствует', 'Три промежуточных слоя', 'Капитал 5M USD'],
    },
    endCorrect: { title: 'UBO запрошен', subtitle: 'Онбординг приостановлен · запрошены все слои' },
    endPartial: { title: 'Эскалация в Compliance', subtitle: 'Совместное рассмотрение 4 часа' },
    endFail: {
      code: 'AML §5.1',
      title: 'UBO обязателен',
      body: 'При открытии любого корпоративного счёта обязательно определение конечного бенефициара. Онбординг не продолжается до раскрытия UBO.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'UBO обязателен для каждого корпоративного счёта.',
      'Внешняя юрисдикция + три слоя — высокий риск.',
      'Представитель не может ссылаться на "конфиденциальность" — требование закона.',
      'Онбординг без UBO останавливается.',
      'AML §5.1 — статья личной ответственности.',
    ],
  },
};

const amlSanctions = {
  title: 'Санкционный скрининг — OFAC', subtitle: 'AML §6.2 · совпадение с санкционным списком',
  proctorIntro: 'Скрининг показал 88% совпадение. Список OFAC.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Санкции', title: '88% совпадение OFAC',
    subtitle: 'Бенефициар: А. Каримов · $240K wire', meta: 'AML §6.2 · немедленное решение', cta: 'Открыть совпадение',
  },
  txPanel: {
    tag: 'CRM · САНКЦИИ', client: 'Акмал Каримов',
    clientMeta: 'ИНН 30312840190303 · Wire $240K · Бенефициар: KZ',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '13:10', text: 'Запрос на wire · $240K' },
      { time: '13:10', text: 'Запущен сканер санкций' },
      { time: '13:11', text: 'OFAC SDN · 88% fuzzy совпадение' },
      { time: '13:12', text: 'Бенефициар в Алматы · дополнительный флаг' },
    ],
    indicators: {
      matchScore: { label: 'Совпадение', unit: '%', hint: '> 80% = critical' },
      list: { label: 'Список', value: 'OFAC SDN', hint: 'Полная блокировка' },
      amount: { label: 'Сумма', value: '$240K', hint: 'Wire transfer' },
      corridor: { label: 'Коридор', value: 'UZ→KZ', hint: 'High-risk' },
    },
  },
  actions: {
    blockReport: 'Блокировка + отчёт в OFAC', blockReportHint: 'Транзакция остановлена · отчёт в 24 часа',
    escalate: 'Эскалация в Compliance', escalateHint: 'Совместная проверка · 1 час',
    release: 'Пропустить', releaseHint: 'РИСК · нарушение OFAC · уголовная ответственность',
  },
  proctorFeedback: {
    correct: 'Отлично. 88% OFAC — немедленный блок и отчёт. Это требование закона.',
    partial: 'Эскалация полезна, но при санкциях первый шаг — блок.',
    fail: 'УГОЛОВНО. Нарушение OFAC — миллионные штрафы банку и личная ответственность сотрудника.',
  },
  screen: {
    dashboard: {
      title: 'Санкционный монитор', client: 'Сегодня 4 проверки',
      cards: { a: 'Совпадение', aValue: '88%', b: 'Список', bValue: 'OFAC', c: 'Сумма', cValue: '$240K' },
    },
    analysis: {
      title: 'Анализ совпадения OFAC',
      items: ['OFAC SDN · 88% fuzzy совпадение', 'Бенефициар в Казахстане', 'Сумма wire $240K', 'Коридор UZ→KZ · high-risk'],
    },
    endCorrect: { title: 'Санкция заблокирована', subtitle: 'Отчёт OFAC отправлен в 24 часа' },
    endPartial: { title: 'Эскалация в Compliance', subtitle: 'Совместное решение в течение часа' },
    endFail: {
      code: 'AML §6.2', title: 'Нарушение OFAC',
      body: 'Перевод лицу из санкционного списка — нарушение OFAC. Миллионные штрафы банку и уголовная ответственность сотрудника.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      '> 80% совпадение — немедленный блок.',
      'Списки OFAC, UN, EU также проверяются.',
      'Блок — первый шаг, эскалация — следом.',
      'Нарушение OFAC — уголовная ответственность.',
      'Fuzzy-совпадение — тоже флаг.',
    ],
  },
};

const amlPep = {
  title: 'PEP-риск — политические лица', subtitle: 'AML §7.3 · Enhanced Due Diligence',
  proctorIntro: 'Депутат региона размещает 420 млн "бизнес-дохода".',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'PEP-признак', title: 'Крупный приход на счёт депутата',
    subtitle: 'Б. Салимов · 420 млн · бизнес-доход', meta: 'AML §7.3 · требуется EDD', cta: 'Открыть PEP-профиль',
  },
  txPanel: {
    tag: 'CRM · PEP', client: 'Баходир Салимов',
    clientMeta: 'ИНН 30112840100210 · Депутат региона · 8 лет клиент',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '15:00', text: '420 млн сум приход · "бизнес-доход"' },
      { time: '15:01', text: 'PEP-метка · депутат региона' },
      { time: '15:02', text: 'Источник: "строительная компания"' },
      { time: '15:03', text: 'Документ: контракт 2 месяца назад' },
    ],
    indicators: {
      pepRole: { label: 'Должность', value: 'Депутат', hint: 'High-risk PEP' },
      amount: { label: 'Сумма', unit: 'млн', hint: '> 100 млн = EDD' },
      sourceFunds: { label: 'Источник', value: 'Строительство', hint: 'Проверить' },
      jurisdiction: { label: 'Юрисдикция', value: 'UZ', hint: 'Местная' },
    },
  },
  actions: {
    eddApprove: 'EDD + одобрение senior', eddApproveHint: 'Документ источника · senior approval · 24 часа',
    standardKyc: 'Стандартный KYC', standardKycHint: 'Недостаточно для PEP · audit-риск',
    accept: 'Принять', acceptHint: 'РИСК · нарушение §7.3',
  },
  proctorFeedback: {
    correct: 'Отлично. PEP + крупная сумма = EDD обязателен. Senior approval — по протоколу.',
    partial: 'Стандартный KYC недостаточен для PEP. EDD обязателен.',
    fail: 'РИСК. PEP-риск пропущен — нарушение §7.3 и проблема при аудите.',
  },
  screen: {
    dashboard: {
      title: 'PEP-монитор', client: 'Сегодня 2 PEP-операции',
      cards: { a: 'PEP', aValue: 'Депутат', b: 'Сумма', bValue: '420M', c: 'EDD', cValue: 'Треб.' },
    },
    analysis: {
      title: 'Признаки PEP-риска',
      items: ['Депутат региона (high-risk PEP)', 'Крупный наличный приход · 420 млн', 'Источник: бизнес (требует проверки)', 'AML §7.3 EDD обязателен'],
    },
    endCorrect: { title: 'EDD запущен', subtitle: 'Документ источника + senior approval 24 часа' },
    endPartial: { title: 'Применён стандартный KYC', subtitle: 'Недостаточно для PEP · audit-риск' },
    endFail: {
      code: 'AML §7.3', title: 'PEP требует EDD',
      body: 'Стандартный KYC недостаточен для политических лиц. Enhanced Due Diligence и senior approval — обязательны.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'PEP = Enhanced Due Diligence обязательно.',
      'Депутат региона также high-risk PEP.',
      'Документ источника проверяется всегда.',
      'Senior approval — часть протокола.',
      'PEP-риск — статья личной ответственности.',
    ],
  },
};

const amlSarWriting = {
  title: 'Написание SAR — практика', subtitle: 'AML §8.1 · нарративный формат 5W',
  proctorIntro: 'Подозрительный паттерн выявлен. Какой формат SAR выбрать?',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'SAR черновик', title: 'Формат SAR',
    subtitle: 'Паттерн ясен · 3 варианта', meta: 'AML §8.1 · 15 мин на черновик', cta: 'Показать варианты',
  },
  txPanel: {
    tag: 'CRM · SAR DRAFT', client: 'Паттерн: 3 новых клиента + 50M+ нал',
    clientMeta: 'Анализ завершён · выбор формата нарратива',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный формат.', timelineLabel: 'Хронология',
    timeline: [
      { time: '11:00', text: 'Анализ паттерна завершён' },
      { time: '11:15', text: '3 счёта + 4 транзакции' },
      { time: '11:20', text: 'Время писать SAR · выбор формата' },
      { time: '11:30', text: 'Compliance рассмотрит в 24 часа' },
    ],
    indicators: {
      pattern: { label: 'Паттерн', value: 'Ясен', hint: 'Документирован' },
      evidence: { label: 'Доказательства', value: '4 шт', hint: 'Транзакции' },
      timeline: { label: 'Период', value: '3 нед', hint: 'Продолжается' },
      tone: { label: 'Стиль', value: 'Выбор', hint: 'Фактический' },
    },
  },
  actions: {
    factualFiveW: 'Фактический нарратив 5W', factualFiveWHint: 'Кто · Что · Когда · Где · Сколько · только факты',
    partialNarrative: 'Частичный нарратив (без контекста)', partialNarrativeHint: 'Audit задаст вопросы',
    accusatory: 'Эмоциональный / обвиняющий', accusatoryHint: 'РИСК · SAR будет отклонён',
  },
  proctorFeedback: {
    correct: 'Отлично. Формат 5W — Compliance поймёт с первого чтения. Фактический, нейтральный.',
    partial: 'Частичный нарратив работает, но без контекста возможны дополнительные вопросы.',
    fail: 'РИСК. Эмоциональный стиль делает SAR недействительным. Compliance вернёт.',
  },
  screen: {
    dashboard: {
      title: 'Система SAR-черновиков', client: 'Сегодня 1 SAR-черновик',
      cards: { a: 'Паттерн', aValue: 'Ясен', b: 'Доказ.', bValue: '4', c: 'Стиль', cValue: '5W' },
    },
    analysis: {
      title: 'Правила формата SAR',
      items: ['5W — Кто, Что, Когда, Где, Сколько', 'Только факты · без эмоций', 'Audit-подтверждение в каждом пункте', 'Нейтральный, профессиональный тон'],
    },
    endCorrect: { title: 'SAR отправлен', subtitle: '5W фактический · Compliance рассмотрит в 24 часа' },
    endPartial: { title: 'SAR отправлен (частично)', subtitle: 'Возможны дополнительные запросы контекста' },
    endFail: {
      code: 'AML §8.1', title: 'Нарушение формата SAR',
      body: 'Эмоциональный или обвиняющий стиль делает SAR недействительным. Пишется только фактически, в формате 5W.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Формат 5W — стандарт для каждого SAR.',
      'Только факты · без эмоций и обвинений.',
      'Каждое утверждение подтверждается audit-доказательством.',
      'Нейтральный, профессиональный тон.',
      'Контекст никогда не отбрасывается как "очевидное".',
    ],
  },
};

const cyberSocTriage = {
  title: 'SOC alert triage — lateral movement', subtitle: 'IB-402 · IDS высокий приоритет',
  proctorIntro: 'Из Finance — lateral movement. IDS высокий приоритет.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'IDS critical', title: 'Обнаружен lateral movement',
    subtitle: 'FIN-WS-12 · попытка admin-share', meta: 'IB-402 · немедленный ответ', cta: 'Открыть alert',
  },
  txPanel: {
    tag: 'SOC · ANALYSIS', client: 'FIN-WS-12 · отдел Finance',
    clientMeta: 'Win11 · в домене · последний логин 09:14',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '09:14', text: 'Пользователь вошёл · норма' },
      { time: '09:32', text: 'Попытка обращения к admin$' },
      { time: '09:33', text: 'IDS critical · lateral movement' },
      { time: '09:34', text: 'SMB-скан на другом хосте' },
    ],
    indicators: {
      severity: { label: 'Приоритет', value: 'Critical', hint: 'IDS подтверждает' },
      host: { label: 'Host', value: 'FIN-WS-12', hint: 'Finance' },
      movement: { label: 'Паттерн', value: 'admin$ + SMB', hint: 'Классика' },
      asset: { label: 'Asset', value: 'Finance АРМ', hint: 'High-risk' },
    },
  },
  actions: {
    isolate: 'Изоляция хоста + page IR', isolateHint: 'Отключён от сети · IR-команда через 5 мин',
    monitor: 'Только наблюдение', monitorHint: 'Риск распространения',
    closeFp: 'Закрыть как false positive', closeFpHint: 'РИСК · ransomware может расползтись',
  },
  proctorFeedback: {
    correct: 'Отлично. admin$ + SMB-скан = классическое распространение. Изоляция + IR — первый шаг.',
    partial: 'Наблюдение запаздывает · каждая минута — ещё один хост.',
    fail: 'РИСК. Ransomware называют lateral movement не зря. Распространение неизбежно.',
  },
  screen: {
    dashboard: {
      title: 'SOC-монитор', client: 'Сегодня 12 алертов · 1 critical',
      cards: { a: 'Приоритет', aValue: 'Critical', b: 'Хосты', bValue: '2', c: 'IR', cValue: 'Готов' },
    },
    analysis: {
      title: 'Признаки lateral movement',
      items: ['Попытка admin$', 'SMB-скан на другом хосте', 'Пользователь не в курсе', 'IDS critical alert'],
    },
    endCorrect: { title: 'Хост изолирован', subtitle: 'IR через 5 минут · распространение остановлено' },
    endPartial: { title: 'Режим наблюдения', subtitle: 'Риск распространения продолжается' },
    endFail: {
      code: 'IB-402', title: 'Lateral movement пропущен',
      body: 'Классический lateral movement — начало ransomware. Задержка с изоляцией ставит под угрозу всю сеть.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'admin$ + SMB-скан = lateral movement.',
      'При critical alert изоляция — первый шаг.',
      'IR-page не откладывается.',
      'False positive — не очевидность · проверка нужна.',
      'Lateral movement = заход ransomware.',
    ],
  },
};

const cyberIncidentResponse = {
  title: 'Реагирование на ransomware', subtitle: 'NIST 800-61 · Containment + Eradication',
  proctorIntro: 'Ransomware шифрует файлы в Finance. Времени нет.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'INCIDENT critical', title: 'Обнаружен ransomware',
    subtitle: 'Finance · 8 хостов · .lockbit', meta: 'NIST 800-61 · немедленный ответ', cta: 'Открыть incident',
  },
  txPanel: {
    tag: 'IR · INCIDENT', client: 'Отдел Finance · 8 хостов',
    clientMeta: 'Lockbit variant · начало 14 мин назад',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '14:32', text: 'Первый хост зашифрован' },
      { time: '14:38', text: '5 хостов заражены' },
      { time: '14:44', text: 'Backup-сеть пока чиста' },
      { time: '14:46', text: 'Сообщение о выкупе · 50 BTC' },
    ],
    indicators: {
      spread: { label: 'Распр.', value: '8 хостов', hint: 'за 14 мин' },
      department: { label: 'Отдел', value: 'Finance', hint: 'Критичный' },
      backups: { label: 'Backup', value: 'Чистый', hint: 'Пока' },
      ransom: { label: 'Ransom', value: '50 BTC', hint: '~$1.5M' },
    },
  },
  actions: {
    containEradicate: 'Containment + Eradication + Forensics', containEradicateHint: 'Протокол NIST 800-61 · сохранение бэкапов',
    restoreBackup: 'Срочно восстанавливать из backup', restoreBackupHint: 'Криминалистика потеряна · риск повторения',
    payRansom: 'Оплатить выкуп', payRansomHint: 'УГОЛОВНО · протокол и риск повторных атак',
  },
  proctorFeedback: {
    correct: 'Отлично. NIST 800-61 — сначала Containment, затем Eradication, в конце восстановление. Криминалистика тоже сохраняется.',
    partial: 'Быстрое восстановление уничтожает криминалистику. Без выяснения причины — атака повторится.',
    fail: 'УГОЛОВНО. Оплата выкупа финансирует преступную группу — штрафы банку и провоцирование новых атак.',
  },
  screen: {
    dashboard: {
      title: 'IR Command Center', client: 'Активный incident · Finance',
      cards: { a: 'Хосты', aValue: '8', b: 'Время', bValue: '14 мин', c: 'Backup', cValue: 'Чистый' },
    },
    analysis: {
      title: 'Признаки incident',
      items: ['Lockbit ransomware', '8 хостов · за 14 мин', 'Backup-сеть пока чиста', 'Выкуп · 50 BTC'],
    },
    endCorrect: { title: 'Containment успешен', subtitle: 'NIST 800-61 · криминалистика сохранена' },
    endPartial: { title: 'Восстановление начато', subtitle: 'Криминалистика ограничена · нужен анализ причины' },
    endFail: {
      code: 'NIST 800-61', title: 'Оплата выкупа — нарушение закона',
      body: 'Оплата выкупа приравнивается к финансированию преступной группы. Штрафы банку и риск повторной атаки.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'NIST 800-61 — сначала Containment.',
      'Криминалистика — до восстановления.',
      'Выкуп — нарушение закона.',
      'Backup-сеть изолировать немедленно.',
      'Без причины атака повторится.',
    ],
  },
};

const cyberZeroTrust = {
  title: 'Zero Trust — доступ вендора', subtitle: 'IB-505 · Just-In-Time Access',
  proctorIntro: 'Вендор просит постоянный admin-доступ к production. Zero Trust.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Запрос доступа', title: 'Production-доступ вендора',
    subtitle: 'TechVendor · admin · постоянный', meta: 'IB-505 · решение', cta: 'Открыть запрос',
  },
  txPanel: {
    tag: 'IAM · VENDOR ACCESS', client: 'TechVendor LLC',
    clientMeta: 'Внешний поставщик · 2 года контракт · 6 инженеров',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '10:00', text: 'Вендор запросил production admin' },
      { time: '10:05', text: '"Постоянное техобслуживание"' },
      { time: '10:10', text: 'Правила Zero Trust внедрены' },
      { time: '10:12', text: 'Система JIT-access готова' },
    ],
    indicators: {
      requester: { label: 'Запросчик', value: 'TechVendor', hint: 'Внешний' },
      scope: { label: 'Область', value: 'Production admin', hint: 'High-risk' },
      duration: { label: 'Длительность', value: 'Постоянная', hint: 'Не одобряем' },
      audit: { label: 'Audit', value: 'Обязателен', hint: 'WORM-лог' },
    },
  },
  actions: {
    jitAccess: 'JIT-access · окна по 4 часа', jitAccessHint: 'Каждая сессия: одобрение + лог · автоотзыв',
    vpnMonitor: 'VPN + мониторинг', vpnMonitorHint: 'Постоянное подключение · audit слабее',
    permanentGroup: 'Постоянно в admin-группе', permanentGroupHint: 'РИСК · нарушение Zero Trust',
  },
  proctorFeedback: {
    correct: 'Отлично. JIT-access — суть Zero Trust. Нужное время, нужный объём, журнал.',
    partial: 'VPN работает, но постоянное подключение усложняет audit.',
    fail: 'РИСК. Постоянный admin = supply chain атака. Взлом вендора = взлом вас.',
  },
  screen: {
    dashboard: {
      title: 'IAM · Access Manager', client: 'Сегодня 3 запроса доступа',
      cards: { a: 'Запросчик', aValue: 'Вендор', b: 'Область', bValue: 'Admin', c: 'JIT', cValue: 'Готов' },
    },
    analysis: {
      title: 'Принципы Zero Trust',
      items: ['Никто не доверен по умолчанию', 'Just-In-Time · временные рамки', 'Audit-лог каждой сессии', 'Minimum privilege · только нужный объём'],
    },
    endCorrect: { title: 'JIT-access включён', subtitle: 'Сессия 4 часа · журнал активен' },
    endPartial: { title: 'Подключение VPN', subtitle: 'Audit ограничен · постоянная связь' },
    endFail: {
      code: 'IB-505', title: 'Нарушение Zero Trust',
      body: 'Постоянный admin для внешнего вендора — дверь supply chain атакам. Принцип Zero Trust — сомневаться в каждом запросе.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'JIT-access — сердце Zero Trust.',
      'Постоянный admin = supply chain атака.',
      'Audit-лог обязателен в каждой сессии.',
      'Minimum privilege — только нужный объём.',
      'Взлом вендора = взлом вас.',
    ],
  },
};

const cyberDeepfake = {
  title: 'Верификация deepfake-голоса', subtitle: 'IB-606 · протокол callback',
  proctorIntro: '"CEO" звонит · срочный wire $200K. Голос странный.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Звонок CEO', title: 'Срочный wire $200K',
    subtitle: '"CEO" Акмал Турсунов · голос подозрительный', meta: 'IB-606 · немедленное решение', cta: 'Открыть звонок',
  },
  txPanel: {
    tag: 'IB · АНАЛИЗ ГОЛОСА', client: 'Запросчик: "Акмал Турсунов" (CEO)',
    clientMeta: 'С незнакомого номера · 4 мин разговора · голос uncanny',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '16:02', text: 'Звонок · незнакомый номер' },
      { time: '16:02', text: '"CEO Акмал Турсунов"' },
      { time: '16:03', text: '$200K wire · "срочно, торги не пропустить"' },
      { time: '16:04', text: 'Голос uncanny · странные паузы' },
    ],
    indicators: {
      voice: { label: 'Голос', value: 'Uncanny', hint: 'Признак deepfake' },
      urgency: { label: 'Срочность', value: '"срочно"', hint: 'Классика SE' },
      amount: { label: 'Сумма', hint: 'Wire transfer' },
      channel: { label: 'Канал', value: 'Незнакомый номер', hint: 'Нужна verify' },
    },
  },
  actions: {
    callback: 'Callback на известный номер CEO', callbackHint: 'Реальный голос проверяется · доп. 2 мин',
    emailConfirm: 'Подтвердить через email', emailConfirmHint: 'Email тоже может быть взломан · осторожно',
    wire: 'Сделать wire', wireHint: 'УГОЛОВНО · $200K теряются · CEO impersonation',
  },
  proctorFeedback: {
    correct: 'Отлично. Callback — единственный надёжный способ против deepfake. 2 мин задержки дешевле $200K.',
    partial: 'Email хорошо, но email тоже взламывают. Telephone callback сильнее.',
    fail: 'УГОЛОВНО. CEO impersonation = deepfake. $200K теряются и audit-проблема для банка.',
  },
  screen: {
    dashboard: {
      title: 'IB · монитор звонков', client: 'Активный звонок · подозрение CEO impersonation',
      cards: { a: 'Запросчик', aValue: 'CEO?', b: 'Сумма', bValue: '$200K', c: 'Голос', cValue: 'Uncanny' },
    },
    analysis: {
      title: 'Признаки deepfake',
      items: ['Голос uncanny · странные паузы', 'С незнакомого номера', 'Давление срочностью', 'Крупный wire $200K'],
    },
    endCorrect: { title: 'Callback-верификация', subtitle: 'Реальный голос проверен · запрос отклонён' },
    endPartial: { title: 'Email-подтверждение', subtitle: 'Ограниченное доверие · осторожно' },
    endFail: {
      code: 'IB-606', title: 'CEO impersonation удался',
      body: 'Deepfake-голос провёл $200K wire. Audit-проблема банку и личная ответственность. Callback-протокол обязателен.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Deepfake-голос сейчас доступен · осторожность.',
      'Callback на известный номер — единственный надёжный путь.',
      'Срочность — классика social engineering.',
      '$200K + срочность = пауза и verify.',
      'Email тоже взламывают · телефон сильнее.',
    ],
  },
};

const fraudSynthetic = {
  title: 'Synthetic identity onboarding', subtitle: 'FRAUD-318 · Composite ID detection',
  proctorIntro: 'Запрос на открытие счёта · ID composite · 3 flagged-адреса.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Fraud monitor', title: 'Признак synthetic identity',
    subtitle: 'Реальный ИНН · фейк имя · linked addresses', meta: 'FRAUD-318 · онбординг пауза', cta: 'Открыть профиль',
  },
  txPanel: {
    tag: 'CRM · ID АНАЛИЗ', client: '"Рустам Ахмедов"',
    clientMeta: 'ИНН реальный · имя впервые · адрес связан с 3 flagged-счетами',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '09:20', text: 'Запрос online-открытия счёта' },
      { time: '09:21', text: 'ИНН реален, но с другим именем' },
      { time: '09:22', text: 'Адрес связан с 3 flagged-счетами' },
      { time: '09:23', text: 'Device fingerprint повторяется' },
    ],
    indicators: {
      idMatch: { label: 'ID-совпад.', value: 'Composite', hint: 'Реал ИНН + новое имя' },
      addressLinks: { label: 'Адрес', value: '3 flagged', hint: 'Связь' },
      creditFile: { label: 'Credit file', value: 'Thin', hint: 'Свежий' },
      deviceFingerprint: { label: 'Device', value: 'Повтор', hint: 'И на других счетах' },
    },
  },
  actions: {
    denyReport: 'Отказ + отчёт fraud', denyReportHint: 'Онбординг заблокирован · fraud-team в курсе',
    enhancedKyc: 'EKYC-интервью', enhancedKycHint: 'Доп. документы · 24 часа',
    open: 'Открыть счёт', openHint: 'РИСК · synthetic identity становится активным',
  },
  proctorFeedback: {
    correct: 'Отлично. Composite ID + linked addresses + device fingerprint — классика synthetic identity. Отказ + отчёт — правильно.',
    partial: 'EKYC работает, но synthetic identity может пройти с подготовленными ответами.',
    fail: 'РИСК. Счёт synthetic identity потом используется в mule-схеме.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · ID-монитор', client: 'Сегодня 4 подозрения на synthetic',
      cards: { a: 'ID', aValue: 'Composite', b: 'Linked', bValue: '3 счёта', c: 'Device', cValue: 'Повтор' },
    },
    analysis: {
      title: 'Признаки synthetic ID',
      items: ['Реал ИНН + впервые встречающееся имя', 'Адрес связан с 3 flagged-счетами', 'Credit file thin (свежий)', 'Device fingerprint повторяется'],
    },
    endCorrect: { title: 'Онбординг отказан', subtitle: 'Fraud-отчёт отправлен · audit 24 часа' },
    endPartial: { title: 'EKYC-интервью', subtitle: 'Доп. документы · 24 часа' },
    endFail: {
      code: 'FRAUD-318', title: 'Synthetic identity открыт',
      body: 'Счёт с composite ID используется в mule или credit fraud. Отказ на этапе онбординга — самая дешёвая защита.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Реал ИНН + новое имя = composite-сигнал.',
      'Связи адресов — индикатор.',
      'Device fingerprint повтор = bot/ферма.',
      'EKYC может пройти с подготовкой.',
      'Отказ на онбординге — самое дешёвое.',
    ],
  },
};

const fraudSkimming = {
  title: 'ATM-скимминг + поведение', subtitle: 'FRAUD-422 · Geo velocity-аномалия',
  proctorIntro: 'Одна карта использована в 280 км друг от друга за 22 минуты. Физически невозможно.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Card fraud', title: 'Geo velocity-аномалия',
    subtitle: 'Ташкент + Самарканд · 22 мин', meta: 'FRAUD-422 · немедленно', cta: 'Открыть анализ',
  },
  txPanel: {
    tag: 'CRM · АНАЛИЗ КАРТЫ', client: 'Карта 4188…7733 · Д. Рашидов',
    clientMeta: 'Premium · 3 года · последнее норм. использование вчера',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '13:45', text: 'Ташкент ATM · 500K нал' },
      { time: '14:07', text: 'Самарканд ATM · 500K нал' },
      { time: '14:07', text: '280 км за 22 мин · физически невозможно' },
      { time: '14:08', text: 'Обе ATM в одном кластере' },
    ],
    indicators: {
      geoVelocity: { label: 'Geo velocity', value: '280км/22м', hint: 'Невозможно' },
      amountPattern: { label: 'Сумма', value: '500K×2', hint: 'Макс. лимит' },
      atmCluster: { label: 'ATM cluster', value: 'Связан', hint: 'Подозрение skimmer' },
      cvvFailures: { label: 'CVV ошиб.', value: '3', hint: 'И на других картах' },
    },
  },
  actions: {
    blockInvestigate: 'Блок карты + следствие skimmer', blockInvestigateHint: 'Новая карта · проверка ATM-кластера',
    notifyCustomer: 'Уведомить клиента + soft block', notifyCustomerHint: 'Ждать подтверждения · потеря времени',
    monitor: 'Продолжать наблюдение', monitorHint: 'РИСК · возможны новые кражи',
  },
  proctorFeedback: {
    correct: 'Отлично. Geo velocity невозможно + ATM-кластер + CVV-ошибки = skimming. Блок + следствие — немедленный шаг.',
    partial: 'Пока ждём подтверждения — могут украсть ещё. Блок — первый шаг.',
    fail: 'РИСК. Оставить активный skimming под наблюдением — пострадают другие клиенты.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · монитор карт', client: 'Сегодня 5 velocity-алертов',
      cards: { a: 'Карта', aValue: '4188…', b: 'Аномалия', bValue: '280км', c: 'Время', cValue: '22 мин' },
    },
    analysis: {
      title: 'Признаки skimming',
      items: ['Geo velocity физически невозможно', 'Две ATM в одном кластере', 'CVV-ошибки на других картах', 'Клиент не сообщал'],
    },
    endCorrect: { title: 'Карта заблокирована', subtitle: 'Следствие skimmer · ATM-кластер на проверке' },
    endPartial: { title: 'Soft block · ждём клиента', subtitle: 'Потеря времени · риск новых краж' },
    endFail: {
      code: 'FRAUD-422', title: 'Skimming продолжается',
      body: 'При невозможном geo velocity — немедленный блок. Режим наблюдения приводит к новым потерям.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Geo velocity невозможно = немедленный блок.',
      'Связь ATM-кластера — признак skimmer.',
      'CVV-ошибки на других картах — сигнал фермы.',
      'Подтверждение клиента не ждём · защищаем сразу.',
      'При активном skimming каждая минута дорогая.',
    ],
  },
};

const fraudChargeback = {
  title: 'Chargeback triage — friendly fraud', subtitle: 'FRAUD-510 · защита dispute',
  proctorIntro: 'Клиент отрицает получение доставки. Tracking показывает подпись.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Chargeback', title: 'Подозрение friendly fraud',
    subtitle: '$1240 электроника · "не получал"', meta: 'FRAUD-510 · 5 дней дедлайн', cta: 'Открыть dispute',
  },
  txPanel: {
    tag: 'CRM · CHARGEBACK', client: 'О. Юсупова · 4 года клиент',
    clientMeta: 'Premium карта · 11 chargeback за 12 мес · паттерн',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '5 дней назад', text: '$1240 электроника · billing-адрес' },
      { time: '4 дня назад', text: 'Tracking · доставлено по billing-адресу' },
      { time: '4 дня назад', text: 'Подпись "О. Юсупова" в tracking' },
      { time: 'Сегодня', text: '"Не получал" · chargeback' },
    ],
    indicators: {
      delivery: { label: 'Доставка', value: 'С подписью', hint: 'Billing-адрес' },
      history: { label: 'История', value: '11 chargeback', hint: 'Паттерн' },
      pattern: { label: 'Паттерн', value: 'Ясный', hint: 'Friendly fraud' },
      reasonCode: { label: 'Reason', value: '4855', hint: 'Товар не получен' },
    },
  },
  actions: {
    defendEvidence: 'Сбор доказательств + защита dispute', defendEvidenceHint: 'Tracking + подпись · ответ в 5 дней',
    partialRefund: 'Goodwill частичный refund', partialRefundHint: 'NPS сохранится · поощрение friendly fraud',
    acceptDispute: 'Принять dispute', acceptDisputeHint: 'РИСК · паттерн продолжится',
  },
  proctorFeedback: {
    correct: 'Отлично. Tracking + подпись + 11 prior chargeback = friendly fraud. Защита доказательствами — верный путь.',
    partial: 'Goodwill refund в краткосрочке полезен, но паттерн распространится на других клиентов.',
    fail: 'РИСК. Принятие friendly fraud — клиент будет chargeback каждый месяц. Прямая потеря банку.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · Chargeback', client: 'На этой неделе 23 disputes',
      cards: { a: 'Сумма', aValue: '$1240', b: 'Reason', bValue: '4855', c: 'История', cValue: '11×' },
    },
    analysis: {
      title: 'Признаки friendly fraud',
      items: ['Tracking с подписью', 'Доставлено по billing-адресу', '11 prior chargeback за 12 мес', 'Premium-карта · давний клиент'],
    },
    endCorrect: { title: 'Dispute защищён', subtitle: 'Доказательства поданы · решение в 5 дней' },
    endPartial: { title: 'Goodwill refund выдан', subtitle: 'Риск распространения паттерна' },
    endFail: {
      code: 'FRAUD-510', title: 'Friendly fraud поощрён',
      body: 'Dispute с tracking + подписью защищается. Принятие поощряет паттерн friendly fraud.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Tracking + подпись = сильное доказательство.',
      '11+ chargeback в истории = сигнал friendly fraud.',
      'Goodwill refund поощряет повтор.',
      'Reason 4855 — самый частый абуз.',
      'Защита dispute — право банка.',
    ],
  },
};

const fraudAnomalyTuning = {
  title: 'Тюнинг AI-аномалий', subtitle: 'FRAUD-630 · threshold + backtest',
  proctorIntro: 'После смещения регионального дня выплаты FP выросли в 4.2×.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Model drift', title: 'FP rate вырос 4.2×',
    subtitle: 'Velocity rule · regional payday shift', meta: 'FRAUD-630 · тюнинг модели', cta: 'Показать модель',
  },
  txPanel: {
    tag: 'IB · АНАЛИЗ МОДЕЛИ', client: 'Velocity rule v3.4',
    clientMeta: 'Запущена 11 мес назад · drift: 3 нед · FP rate 4.2×',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '3 недели', text: 'Региональный день выплаты сдвинут' },
      { time: '2 недели', text: 'FP rate начал расти' },
      { time: 'Сегодня', text: 'FP rate 4.2× нормы' },
      { time: 'Сегодня', text: 'Backtest-система готова' },
    ],
    indicators: {
      fpRate: { label: 'FP rate', unit: '× нормы', hint: '> 2× = проблема' },
      driftSource: { label: 'Drift', value: 'Payday shift', hint: 'Структурный' },
      backtest: { label: 'Backtest', value: '6 мес данных', hint: 'Готов' },
      coverage: { label: 'Coverage', value: '92%', hint: 'Сохраняется' },
    },
  },
  actions: {
    tuneBacktest: 'Threshold + backtest + monitoring', tuneBacktestHint: 'Hold-out backtest · мониторинг 1 нед',
    partialBump: 'Частичный bump threshold', partialBumpHint: 'FP уменьшится · coverage не проверен',
    disableRule: 'Отключить rule', disableRuleHint: 'РИСК · ослабление fraud detection',
  },
  proctorFeedback: {
    correct: 'Отлично. Backtest + monitoring — единственный надёжный способ менять модель. Баланс coverage и FP.',
    partial: 'Быстрое облегчение, но без backtest не узнаешь, сохранилась ли реальная detection.',
    fail: 'РИСК. Отключение noisy rule сбрасывает FP в 0, но fraud начинает проходить. Клиенты пострадают.',
  },
  screen: {
    dashboard: {
      title: 'Fraud · монитор модели', client: 'Активная rule · наблюдение drift',
      cards: { a: 'FP rate', aValue: '4.2×', b: 'Drift', bValue: '3 нед', c: 'Backtest', cValue: 'Готов' },
    },
    analysis: {
      title: 'Признаки model drift',
      items: ['FP rate 4.2× нормы', 'Структурный drift · payday shift', 'Backtest-система готова (6 мес данных)', 'Coverage 92% сохраняется'],
    },
    endCorrect: { title: 'Тюнинг модели', subtitle: 'Backtest + 1 неделя мониторинга' },
    endPartial: { title: 'Threshold поднят', subtitle: 'FP меньше · coverage не проверен' },
    endFail: {
      code: 'FRAUD-630', title: 'Rule отключена',
      body: 'Отключение noisy rule ослабляет fraud detection. Backtest + monitoring — единственный надёжный способ менять модель.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Рост FP rate — сигнал model drift.',
      'Структурный drift (payday) — нужен исторический анализ.',
      'Hold-out backtest — надёжное изменение.',
      'Быстрый bump threshold портит coverage.',
      'Отключение rule — последняя мера.',
    ],
  },
};

const cxAccountBlock = {
  title: 'Блокировка счёта · эмпатия', subtitle: 'CX-220 · velocity false positive',
  proctorIntro: 'Premium-клиент проснулся — карта заблокирована. До самолёта 90 минут.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Клиентский сервис', title: 'Auto-block + самолёт',
    subtitle: 'Д. Юсупова · 5.4 года клиент', meta: 'CX-220 · нужна эмпатия', cta: 'Открыть запрос',
  },
  txPanel: {
    tag: 'CRM · СТАТУС КЛИЕНТА', client: 'Дилфуза Юсупова',
    clientMeta: 'Premium · 5.4 года · NPS 9.4 · до самолёта 90 мин',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: 'Вчера', text: '5 транзакций · сработала velocity rule' },
      { time: 'Вчера', text: 'Карта auto-block · уведомление выслано' },
      { time: 'Сегодня', text: 'Клиент проснулся · самолёт через 90 мин' },
      { time: 'Сегодня', text: 'Premium-линия · нервный тон' },
    ],
    indicators: {
      reason: { label: 'Причина', value: 'Velocity FP', hint: 'False positive' },
      tenure: { label: 'Tenure', unit: 'лет', hint: 'Лоял' },
      urgency: { label: 'Срочность', value: '90 мин', hint: 'Самолёт' },
      fraudRisk: { label: 'Fraud risk', value: 'Низкий', hint: 'Профиль соответствует' },
    },
  },
  actions: {
    empathyTemp: 'Эмпатичное объяснение + временный unblock', empathyTempHint: 'Supervisor approval · окно 24 часа',
    protocolOnly: 'Только протокольный ответ', protocolOnlyHint: 'Без эмпатии · риск потери NPS',
    dismiss: 'Отклонить жалобу', dismissHint: 'РИСК · потеря Premium-клиента',
  },
  proctorFeedback: {
    correct: 'Отлично. Чёткий FP + premium + low fraud risk = эмпатичное решение. Supervisor approval — не против протокола.',
    partial: 'Протокол верен, но Premium-клиент потеряет NPS · эмпатия нужна.',
    fail: 'РИСК. Отказ Premium-клиенту · падение NPS · churn в следующем году.',
  },
  screen: {
    dashboard: {
      title: 'CX · монитор клиента', client: 'Сегодня 12 auto-block · 2 FP',
      cards: { a: 'Уровень', aValue: 'Premium', b: 'Причина', bValue: 'Velocity', c: 'Время', cValue: '90 мин' },
    },
    analysis: {
      title: 'Анализ ситуации',
      items: ['Velocity rule false positive', 'Профиль и расходы соответствуют', 'Premium 5.4 года', 'До самолёта 90 минут'],
    },
    endCorrect: { title: 'Временный unblock', subtitle: '24 часа · supervisor approval · NPS сохранён' },
    endPartial: { title: 'Протокольный ответ', subtitle: 'Без эмпатии · падение NPS' },
    endFail: {
      code: 'CX-220', title: 'Клиент потерян',
      body: 'Premium-клиенту нужна была эмпатия. При чётком FP временное решение не нарушает протокол.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'False positive — supervisor approval с временным unblock.',
      'Premium NPS дорогой.',
      'Эмпатия не противоречит протоколу.',
      'Срочность — повод задействовать emergency-рычаг.',
      'Помните паспорт клиента · если профиль соответствует, риск низкий.',
    ],
  },
};

const cxAccessibility = {
  title: 'Клиент с ограничениями', subtitle: 'CX-330 · accessibility · ассистивные технологии',
  proctorIntro: 'Незрячий клиент с трудом работает с новым online-банкингом.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Помощь клиенту', title: 'Accessibility-помощь',
    subtitle: 'М. Рахимов · screen-reader', meta: 'CX-330 · без таймера', cta: 'Начать помощь',
  },
  txPanel: {
    tag: 'CRM · ACCESSIBILITY', client: 'Мансур Рахимов',
    clientMeta: 'Нарушение зрения · NVDA screen-reader · 3 года клиент',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '11:00', text: 'Клиент позвонил' },
      { time: '11:01', text: '"Новый OB непонятен"' },
      { time: '11:02', text: 'Навигация под screen-reader слаба' },
      { time: '11:03', text: 'Accessible flow есть · возможность bookmark' },
    ],
    indicators: {
      need: { label: 'Потребность', value: 'Screen-reader', hint: 'Ассист. тех.' },
      product: { label: 'Продукт', value: 'OB', hint: 'Новая версия' },
      frustration: { label: 'Статус', value: 'Высокий', hint: 'Нервно' },
      tools: { label: 'Инструменты', value: 'Есть', hint: 'Accessible flow' },
    },
  },
  actions: {
    fullSession: 'Полная сессия + walkthrough', fullSessionHint: 'Показ accessible flow · bookmark · 25 мин',
    standardTutorial: 'Стандартный tutorial', standardTutorialHint: 'Не подходит под screen-reader · проблема навигации',
    redirect: 'Только в телефонную поддержку', redirectHint: 'РИСК · отказ от OB',
  },
  proctorFeedback: {
    correct: 'Отлично. Полная сессия · показ accessible flow · клиент станет самостоятельным. NPS и inclusion одновременно.',
    partial: 'Стандартный tutorial не подходит для screen-reader. Клиент перезвонит.',
    fail: 'РИСК. Переадресация только на телефон — дискриминация клиентов с ограничениями.',
  },
  screen: {
    dashboard: {
      title: 'CX · Accessibility', client: 'Сегодня 1 запрос ассист. тех.',
      cards: { a: 'Потреб.', aValue: 'NVDA', b: 'Продукт', bValue: 'OB', c: 'Помощь', cValue: 'Полная' },
    },
    analysis: {
      title: 'Стратегия помощи',
      items: ['Навигация под screen-reader', 'Accessible flow доступны', 'Возможность bookmark', 'Без ограничения по времени'],
    },
    endCorrect: { title: 'Полная сессия', subtitle: 'Клиент самостоятелен · NPS высокий' },
    endPartial: { title: 'Стандартный tutorial', subtitle: 'Ограниченная помощь · возможен повторный звонок' },
    endFail: {
      code: 'CX-330', title: 'Нарушение inclusion',
      body: 'Переадресация клиентов с ограничениями только на телефон — дискриминация. Online banking должен быть accessible.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Знайте accessible flow — обязанность банка.',
      'Навигация со screen-reader другая.',
      'Без таймера · терпение — часть помощи.',
      'Bookmark — ключ к самостоятельности.',
      'Inclusion — банковский сервис для каждого.',
    ],
  },
};

const cxInternalEscalation = {
  title: 'Внутренний протокол эскалации', subtitle: 'CX-440 · поддержка junior agent',
  proctorIntro: 'Junior замер от агрессивного клиента. Клиент кричит.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Internal SOS', title: 'Junior agent замер',
    subtitle: 'Активный звонок · клиент кричит', meta: 'CX-440 · немедленно', cta: 'Смотреть статус',
  },
  txPanel: {
    tag: 'CRM · INTERNAL ESCALATION', client: 'Junior: А. Каримова (2 мес)',
    clientMeta: 'Активный звонок · клиент Х. Олимов (6 лет клиент, нервозный)',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '14:30', text: 'Junior принял звонок' },
      { time: '14:33', text: 'Клиент начал кричать' },
      { time: '14:34', text: 'Junior замер · нет ответа' },
      { time: '14:35', text: 'Сработал Internal SOS' },
    ],
    indicators: {
      tone: { label: 'Тон клиента', value: 'Агрессивный', hint: 'Нужна de-escalation' },
      juniorState: { label: 'Junior', value: 'Замер', hint: 'Нужна помощь' },
      clientHistory: { label: 'Клиент', value: '6 лет', hint: 'Стоит сохранить' },
      queueLoad: { label: 'Очередь', value: '7', hint: 'Высокая' },
    },
  },
  actions: {
    takeOverCoach: 'Принять · de-escalation · коучинг', takeOverCoachHint: 'Junior слушает · клиент успокоится · debrief',
    liveAdvise: 'Live-совет (без подключения)', liveAdviseHint: 'Junior учится · клиент ждёт · риск',
    leaveAlone: 'Пусть junior сам', leaveAloneHint: 'РИСК · потеряем и клиента, и junior',
  },
  proctorFeedback: {
    correct: 'Отлично. Принять + de-escalation + debrief = junior растёт, клиент сохранён. Две цели.',
    partial: 'Live-совет работает, но клиент ждёт · паузы усиливают агрессию.',
    fail: 'РИСК. 2-месячный junior с агрессивным 6-летним клиентом наедине — потеряем обоих.',
  },
  screen: {
    dashboard: {
      title: 'CX · Senior dashboard', client: 'Активный junior SOS · 2 в очереди',
      cards: { a: 'Junior', aValue: 'А. К.', b: 'Клиент', bValue: '6 лет', c: 'Тон', cValue: 'Агрес.' },
    },
    analysis: {
      title: 'Статус эскалации',
      items: ['Junior 2 мес опыта', 'Клиент 6 лет лояльный', 'Агрессия · нужна de-escalation', 'Возможность live coaching + debrief'],
    },
    endCorrect: { title: 'Senior принял', subtitle: 'Клиент спокоен · junior научился · debrief назначен' },
    endPartial: { title: 'Live-совет', subtitle: 'Ограниченная помощь · клиент ждал' },
    endFail: {
      code: 'CX-440', title: 'Потеряли обоих',
      body: 'Coaching junior и сохранение клиента — обязанность senior. Оставить наедине — потеря.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Internal SOS — дверь senior открыть сразу.',
      'De-escalation сильна опытом senior.',
      'Debrief — источник роста junior.',
      'Сохранение клиента + coaching junior = две цели.',
      'Оставить одного — потерять обоих.',
    ],
  },
};

const cxComplexCustomer = {
  title: 'Сложный клиент · 3 запроса', subtitle: 'CX-550 · multi-product triage',
  proctorIntro: '8-летний Premium-клиент просит свести statement, пересмотр ставки и смену бенефициара.',
  proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
  notification: {
    tag: 'Multi-запрос', title: '3 запроса в одном звонке',
    subtitle: 'З. Каримов · 5 продуктов · 8.7 лет', meta: 'CX-550 · structured triage', cta: 'Открыть запрос',
  },
  txPanel: {
    tag: 'CRM · MULTI-PRODUCT', client: 'Зафар Каримов',
    clientMeta: 'Premium · 5 продуктов · 8.7 лет · NPS 9.6 · семейный счёт',
    yourTask: 'Ваше решение', taskHint: 'Выберите один правильный ответ.', timelineLabel: 'Хронология',
    timeline: [
      { time: '11:10', text: '"Сведите все statement"' },
      { time: '11:11', text: '"Пересмотрите ставку"' },
      { time: '11:12', text: '"Хочу сменить бенефициара"' },
      { time: '11:13', text: 'Клиент в конце рабочего дня' },
    ],
    indicators: {
      products: { label: 'Продукты', value: '5', hint: 'Multi-product' },
      requests: { label: 'Запросы', value: '3', hint: 'В одном звонке' },
      tenure: { label: 'Tenure', unit: 'лет', hint: 'Premium' },
      satisfaction: { label: 'NPS', value: '9.6', hint: 'Высокий' },
    },
  },
  actions: {
    structuredTriage: 'Структурный triage + письменный follow-up', structuredTriageHint: '1: бенефициар (KYC) · 2: statement · 3: callback',
    partialCallback: 'Один сейчас + callback по остальным', partialCallbackHint: 'Запросы делятся · клиент позвонит ещё раз',
    oneOnly: 'Сделать только один', oneOnlyHint: 'РИСК · клиент расстроится · NPS падает',
  },
  proctorFeedback: {
    correct: 'Отлично. Структурный triage · KYC первым (юр. значимость) · письменный follow-up · Premium tenure ценим.',
    partial: 'Один + callback работает, но клиент перезвонит · потеря времени.',
    fail: 'РИСК. Отказ Premium-клиенту 8.7 лет — churn в следующем году.',
  },
  screen: {
    dashboard: {
      title: 'CX · Multi-product', client: 'Активный multi-запрос · Premium',
      cards: { a: 'Запросы', aValue: '3', b: 'Продукты', bValue: '5', c: 'История', cValue: '8.7л' },
    },
    analysis: {
      title: 'Triage запросов',
      items: ['Смена бенефициара — KYC (юр.)', 'Сведение statement — техн.', 'Пересмотр ставки — выше полномочий', 'Premium 8.7 лет — ценим'],
    },
    endCorrect: { title: 'Структурный ответ', subtitle: '3 запроса упорядочены · письменный follow-up' },
    endPartial: { title: 'Один + callback', subtitle: 'Клиент перезвонит · потеря времени' },
    endFail: {
      code: 'CX-550', title: 'Клиент расстроен',
      body: 'Premium-клиент 8.7 лет пришёл со сложным запросом · выполнение только одного — не нарушение протокола, но риск NPS и churn.',
    },
  },
  debrief: {
    title: 'Результат тренинга', score: 'Оценка', tipsTitle: 'Главные выводы',
    tips: [
      'Структурный triage — упорядочьте каждый запрос.',
      'KYC-запросы первые (юр. значимость).',
      'Письменный follow-up — клиент спокойнее.',
      'Premium-историю беречь.',
      'Всё в одном звонке — время и respect.',
    ],
  },
};

export const ruScenarios = {
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
