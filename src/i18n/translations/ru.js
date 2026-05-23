/**
 * Russian translations. Mirrors the shape of uz.js exactly.
 */
export const ru = {
  meta: {
    locale: 'ru',
    label: 'Русский',
    flag: 'RU',
  },
  app: {
    name: 'once · AI Mentor',
    tagline:
      'Виртуальный онбординг следующего поколения для сотрудников банка — глубокие сценарии по AML, кибербезопасности, fraud monitoring и работе с клиентами.',
    pickLanguage: 'Выберите язык',
  },
  nav: {
    back: 'Назад',
    exit: 'Выход',
    continue: 'Продолжить',
    finish: 'Завершить',
    retry: 'Заново',
    start: 'Начать',
    next: 'Далее',
  },
  roleSelection: {
    eyebrow: 'Шаг 1',
    title: 'Выберите свою роль',
    subtitle:
      'Каждая роль — отдельная траектория онбординга. Выбор можно изменить позже.',
    pickRole: 'Выберите роль, чтобы начать',
    modulesCount: '{count} модулей',
    sessionLength: 'Сессия',
    proctorReady: 'AI Proctor готов',
  },
  pillars: {
    aml: {
      shortLabel: 'AML',
      title: 'AML / Compliance',
      tagline: 'Высший приоритет',
      summary:
        'Выявление подозрительных потоков, KYC, проверка санкций, написание SAR и решения по регламенту.',
      jobRoles: 'AML Specialist · Compliance Officer · Fraud Analyst',
      focus: 'Подозрительные транзакции · KYC · Санкции · Регламент',
    },
    cyber: {
      shortLabel: 'CYBER',
      title: 'Кибербезопасность / InfoSec',
      tagline: 'Защита бренда и данных',
      summary:
        'Анализ фишинга, мониторинг SOC, реагирование на инциденты, Zero Trust и защита от deepfake.',
      jobRoles: 'Security Engineer · SOC Analyst · InfoSec Officer',
      focus: 'Phishing · SOC · Incident Response · Zero Trust',
    },
    fraud: {
      shortLabel: 'FRAUD',
      title: 'Fraud Monitoring',
      tagline: 'Защита онлайн-банкинга',
      summary:
        'Анализ паттернов транзакций, AI fraud detection, поведенческая аналитика и chargeback.',
      jobRoles: 'Fraud Analyst · Transaction Monitor',
      focus: 'Анализ паттернов · AI detection · Behavioral · Chargeback',
    },
    cx: {
      shortLabel: 'CX',
      title: 'Customer Support',
      tagline: 'Лицо банка',
      summary:
        'Коммуникация, знание продукта, разрешение конфликтов и работа с CRM.',
      jobRoles: 'Client Manager · Support Operator',
      focus: 'Диалог · Продукт · Де-эскалация · CRM',
    },
  },
  modules: {
    eyebrow: 'Шаг 2',
    title: 'Выберите модуль',
    subtitle: 'Рекомендованная последовательность · каждый модуль 8-15 минут',
    locked: 'Закрыт',
    available: 'Доступен',
    completed: 'Пройден',
    minutes: '{n} мин',
    start: 'Начать',
    chooseAnother: 'Выбрать другую роль',
  },
  amlScenario: {
    title: 'Подозрительная транзакция — наличный приход',
    subtitle: 'AML регламент v2.4 §4.2 · решение CTR/SAR',
    proctorIntro:
      'Вы за рабочим столом. Посмотрите на монитор — придёт уведомление.',
    proctorMicInstruction:
      'Нажмите микрофон или выберите вариант на экране.',
    notification: {
      tag: 'Новое уведомление',
      title: 'Обнаружен крупный наличный приход',
      subtitle: 'Счёт 20208…0419 · 187 млн сум',
      meta: 'AML регламент v2.4 §4.2 · 15 секунд на проверку',
      cta: 'Открыть транзакцию',
      dismiss: 'Позже',
    },
    txPanel: {
      tag: 'CRM · ДЕТАЛИ ТРАНЗАКЦИИ',
      client: 'Бекзод Каримов',
      clientMeta: 'ИНН 30312840290052 · Premium · Новый клиент (43 дня)',
      indicators: {
        amount: { label: 'Сумма', unit: 'млн сум', hint: 'Свыше 50М' },
        source: { label: 'Документ источника', value: 'Нет', hint: 'AML §4.2' },
        risk: { label: 'Risk score', unit: 'AML алгоритм', hint: 'Высокий' },
        country: { label: 'Гео', hint: 'High-risk список' },
      },
      timeline: [
        { time: '09:14', text: 'Клиент подошёл к кассе' },
        { time: '09:14', text: '187 млн сум наличными, документ источника отсутствует' },
        { time: '09:15', text: 'Клиент: "быстрее, надо успеть на самолёт"' },
        { time: '09:15', text: 'AML алгоритм отметил risk score 74' },
      ],
      yourTask: 'Ваше решение',
      taskHint: 'Выберите один правильный ответ — решение сохранится и будет оценено.',
      timelineLabel: 'Хронология',
    },
    actions: {
      fileSar: 'Подать SAR',
      fileSarHint: 'Операция блокируется · Compliance проверит в 24 часа',
      release: 'Провести без отказа',
      releaseHint: 'Клиент доволен · открыта дверь для аудита',
      escalate: 'Эскалация в Compliance',
      escalateHint: 'Менеджер + Compliance совместное решение',
    },
    proctorFeedback: {
      correct:
        'Отлично. 3 red-flag очевидны: без документа, давление сроком, новый клиент. SAR — единственный верный путь.',
      escalateOk:
        'Эскалация — безопасное решение. Но сотрудник должен сам подать SAR при 3 red-flag.',
      releaseFail:
        'РИСК. Приём 187 млн без документов — прямое нарушение AML v2.4 §4.2. Аудит возлагает персональную ответственность.',
      tipOffFail:
        'УГОЛОВНОЕ ДЕЙСТВИЕ. Сообщить клиенту "вы под подозрением" — это tipping-off (AML §7.1). Клиенту никогда не сообщают о SAR.',
    },
    screen: {
      dashboard: {
        title: 'Клиент CRM · Ташкент-1',
        client: 'Бекзод Каримов · ИНН 30312840290052',
        cards: {
          account: 'Активный счёт',
          risk: 'Risk score',
          limit: 'Лимит',
        },
      },
      analysis: {
        title: 'Выявленные red-flag признаки',
        items: [
          'Счёт 20208…0419 · 187 млн сум',
          'Документ источника отсутствует',
          'Risk score 74 (высокий)',
          'Клиент: новый · 43 дня',
        ],
      },
      endCorrect: {
        title: 'SAR отправлен',
        subtitle: 'AML v2.4 §4.2 · Compliance проверит в 24 часа',
      },
      endEscalate: {
        title: 'Эскалировано в Compliance',
        subtitle: 'Совместная проверка в процессе',
      },
      endRelease: {
        code: 'AML v2.4 §4.2',
        title: 'Обязательный порог CTR',
        body:
          'Любой наличный приход свыше 50 млн сум требует Currency Transaction Report и документ источника. Приём без документов — прямое нарушение и персональная ответственность.',
      },
    },
    debrief: {
      title: 'Результат тренинга',
      score: 'Оценка',
      tipsTitle: 'Главные выводы',
      tips: [
        '50 млн+ наличными — CTR обязателен (AML v2.4 §4.2).',
        '3+ red-flag — высокая вероятность SAR, нужна эскалация.',
        'Tipping-off — преступление. Клиенту не говорят "вы под подозрением" (§7.1).',
        'Подозрительная операция — сначала останавливается, потом проверяется.',
        'Давление сроком — классический red-flag.',
      ],
    },
  },
  cyberScenario: {
    title: 'Phishing email triage',
    subtitle: 'IB-301 · анализ домена и ссылки',
    proctorIntro:
      'Пришло новое письмо. Угрожают "блокировкой" счёта клиента. Проверьте внимательно.',
    proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
    notification: {
      tag: 'Новое SOC-уведомление',
      title: 'Подозрительный email',
      subtitle: 'Отправитель: secure@bank-secure-uz.help',
      meta: 'IB-301 · 5 минут на решение',
      cta: 'Открыть письмо',
    },
    txPanel: {
      tag: 'EMAIL · АНАЛИЗ',
      client: 'secure@bank-secure-uz.help',
      clientMeta: 'Внешний домен · новый (3 дня) · DMARC fail',
      indicators: {
        sender: { label: 'Отправитель', value: 'bank-secure-uz.help', hint: 'Поддельный домен' },
        urgency: { label: 'Срочность', value: '5 мин', hint: 'Запугивание клиента' },
        link: { label: 'Ссылка', value: 'http://…/verify', hint: 'Без HTTPS' },
        attachment: { label: 'Вложение', value: 'invoice.exe', hint: 'Исполняемый файл' },
      },
      timeline: [
        { time: '11:02', text: 'Письмо попало в inbox · DMARC fail' },
        { time: '11:02', text: '"Ваш счёт будет заблокирован"' },
        { time: '11:02', text: 'Ссылка: http://bank-secure-uz.help/verify' },
        { time: '11:03', text: 'Вложение: invoice.exe (скрытое)' },
      ],
      yourTask: 'Ваше решение',
      taskHint: 'Выберите один правильный ответ.',
      timelineLabel: 'Хронология',
    },
    actions: {
      reportSoc: 'Отправить в SOC',
      reportSocHint: 'Домен добавляется в IDS · 30 мин',
      quarantine: 'Поместить в карантин',
      quarantineHint: 'Только для вас · команда не защищена',
      reply: 'Перейти по ссылке и проверить',
      replyHint: 'РИСК · передача данных третьей стороне',
    },
    proctorFeedback: {
      correct:
        'Отлично. Домен, DMARC, .exe вложение — три признака. SOC-правило за 30 минут защитит 2400 сотрудников.',
      quarantineOk:
        'Хорошо, но без отправки в SOC команда не защищена. Следующий получатель может ошибиться.',
      replyFail:
        'ВНИМАНИЕ. Переход по phishing-ссылке = передача учётных данных. Счёт немедленно заблокирован.',
    },
    screen: {
      dashboard: {
        title: 'Email · мониторинг IB',
        client: 'Сегодня 34 письма · 3 flagged',
        cards: {
          inbox: 'Inbox',
          flagged: 'Подозрительные',
          queue: 'Очередь SOC',
        },
      },
      analysis: {
        title: 'Признаки phishing',
        items: [
          'Домен: bank-secure-uz.help (не официальный)',
          'DMARC: fail',
          'Ссылка: без HTTPS · сокращённая',
          'Вложение: .exe · скрытое',
        ],
      },
      endCorrect: {
        title: 'Отправлено в SOC',
        subtitle: 'IDS-правило за 30 минут · 2400 сотрудников защищены',
      },
      endPartial: {
        title: 'Помещено в карантин',
        subtitle: 'Только ваш inbox · команда ещё не защищена',
      },
      endFail: {
        code: 'IB-301',
        title: 'Переход по phishing-ссылке',
        body:
          'Переход по внешней ссылке — риск передачи учётных данных. Счёт немедленно блокируется и открывается проверка безопасности.',
      },
    },
    debrief: {
      title: 'Результат тренинга',
      score: 'Оценка',
      tipsTitle: 'Главные выводы',
      tips: [
        'DMARC/SPF fail — первый red-flag.',
        'Сокращённая ссылка без HTTPS — всегда подозрительна.',
        'Давление срочностью (5-10 мин) — классическая phishing-тактика.',
        '.exe вложения никогда не открывайте.',
        'Отправка в SOC защищает всю команду.',
      ],
    },
  },
  fraudScenario: {
    title: 'Поиск mule-счёта',
    subtitle: 'FRAUD-204 · velocity-аномалия',
    proctorIntro:
      'По счёту 20214…7711 — velocity-аномалия. Открыт 11 дней назад, много переводов.',
    proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
    notification: {
      tag: 'Уведомление Fraud monitor',
      title: 'Обнаружена velocity-аномалия',
      subtitle: 'Счёт 20214…7711 · 9.4x от нормы',
      meta: 'FRAUD-204 · 10 минут на решение',
      cta: 'Открыть счёт',
    },
    txPanel: {
      tag: 'CRM · MULE АНАЛИЗ',
      client: 'Шерзод Юсупов',
      clientMeta: 'ИНН 30412840190008 · Новый счёт (11 дней) · 14 мелких переводов',
      indicators: {
        velocity: { label: 'Velocity', unit: 'x от нормы', hint: '> 5x — high risk' },
        inbound: { label: 'Приход', value: '14 шт', hint: 'Мелкие суммы (50K-300K)' },
        outbound: { label: 'Расход', value: '14 шт', hint: 'Тот же день · 30 минут' },
        age: { label: 'Возраст счёта', unit: 'дн', hint: '< 30 дней — новый' },
      },
      timeline: [
        { time: '08:12', text: 'Счёт открыт с 50K UZS (11 дней назад)' },
        { time: '09:00', text: 'Сегодня: 14 приходов · 50-300K каждый' },
        { time: '09:32', text: 'Всё за 30 минут переведено на внешнюю карту' },
        { time: '09:40', text: 'AI velocity score: 9.4x' },
      ],
      yourTask: 'Ваше решение',
      taskHint: 'Выберите один правильный ответ.',
      timelineLabel: 'Хронология',
    },
    actions: {
      freeze: 'Немедленно заблокировать счёт',
      freezeHint: 'Расходы остановлены · Fraud team в течение часа',
      escalate: 'Эскалация в Fraud team',
      escalateHint: 'Не блок, наблюдение · 4 часа',
      monitor: 'Только наблюдение',
      monitorHint: 'РИСК · поток продолжается',
    },
    proctorFeedback: {
      correct:
        'Отлично. 9.4x velocity + новый счёт + 14 мелких приходов — классический mule-паттерн. Блок — единственный верный путь.',
      escalateOk:
        'Хорошо, но если блок задержится — деньги уходят. В mule-паттерне блок — первый шаг.',
      monitorFail:
        'РИСК. Оставить mule-счёт под наблюдением — может уйти ещё 30-50 млн UZS. Аудит возлагает персональную ответственность.',
    },
    screen: {
      dashboard: {
        title: 'Fraud monitor · Ташкент-1',
        client: 'Сегодня flagged: 7 счетов',
        cards: {
          account: 'Активный счёт',
          velocity: 'Velocity',
          age: 'Возраст',
        },
      },
      analysis: {
        title: 'Признаки mule-паттерна',
        items: [
          'Новый счёт (11 дней)',
          '14 мелких приходов за 30 минут',
          'Всё переведено на внешнюю карту',
          'AI velocity score: 9.4x',
        ],
      },
      endCorrect: {
        title: 'Счёт заблокирован',
        subtitle: 'Fraud team проанализирует в течение часа',
      },
      endPartial: {
        title: 'Эскалировано в Fraud team',
        subtitle: 'Блок будет рассмотрен в течение 4 часов',
      },
      endFail: {
        code: 'FRAUD-204',
        title: 'Оставлено под наблюдением',
        body:
          'При velocity свыше 5x счёт нужно блокировать немедленно. Режим наблюдения не останавливает поток и приводит к дополнительным потерям.',
      },
    },
    debrief: {
      title: 'Результат тренинга',
      score: 'Оценка',
      tipsTitle: 'Главные выводы',
      tips: [
        'Velocity > 5x — немедленный блок.',
        'Новый счёт (< 30 дней) + много переводов = mule-признак.',
        '10+ приходов/расходов в день — паттерн.',
        'В mule-схеме время = деньги. Блок — первый шаг.',
        'Наблюдение — только для низкого риска.',
      ],
    },
  },
  cxScenario: {
    title: 'Сложный клиент — смена адреса',
    subtitle: 'CX-118 · де-эскалация и верификация',
    proctorIntro:
      'Premium-клиент по телефону требует срочно сменить адрес. 2FA-устройства нет, нервничает.',
    proctorMicInstruction: 'Нажмите микрофон или выберите вариант.',
    notification: {
      tag: 'Клиентский сервис',
      title: 'Смена адреса · срочно',
      subtitle: 'Счёт 20208…0301 · Premium 6.2 года',
      meta: 'CX-118 · 5 минут на решение',
      cta: 'Открыть запрос',
    },
    txPanel: {
      tag: 'CRM · ЗАПРОС КЛИЕНТА',
      client: 'Мавлуда Турсунова',
      clientMeta: 'ИНН 30312840290101 · Premium · 6.2 года · NPS 9.1',
      indicators: {
        channel: { label: 'Канал', value: 'Телефон', hint: 'Аудио-идентификация' },
        factor: { label: '2FA', value: 'Нет', hint: 'Устройство потеряно' },
        tenure: { label: 'Tenure', unit: 'лет', hint: 'Лояльный клиент' },
        urgency: { label: 'Срочность', value: '5 мин', hint: 'Просит исключение' },
      },
      timeline: [
        { time: '14:05', text: 'Клиент позвонил (Premium-линия)' },
        { time: '14:05', text: '"Смените адрес сейчас, надо успеть на самолёт"' },
        { time: '14:06', text: 'Нет 2FA-устройства · "потеряла"' },
        { time: '14:07', text: 'Клиент начал кричать' },
      ],
      yourTask: 'Ваше решение',
      taskHint: 'Выберите один правильный ответ.',
      timelineLabel: 'Хронология',
    },
    actions: {
      verifyChannel: 'Верификация через филиал',
      verifyChannelHint: 'Клиент приходит в филиал · с паспортом',
      partial: 'Аудио + 3 контрольных вопроса',
      partialHint: 'По телефону · ограниченно',
      override: 'Сменить срочно (клиент кричит)',
      overrideHint: 'РИСК · нарушение KYC §3.4',
    },
    proctorFeedback: {
      correct:
        'Отлично. Без 2FA смена адреса — операция высокого риска. Филиал + паспорт — это требование KYC §3.4.',
      partialOk:
        'Хорошо, но 3 вопросов недостаточно для смены адреса. Верификация в филиале — надёжный путь.',
      overrideFail:
        'РИСК. Даже Premium-клиент не освобождает от KYC §3.4. Аудит возложит персональную ответственность.',
    },
    screen: {
      dashboard: {
        title: 'Клиент CRM · Ташкент-1',
        client: 'Сегодня 17 клиентов · 2 требуют верификации',
        cards: {
          tier: 'Тариф',
          years: 'Лет',
          nps: 'NPS',
        },
      },
      analysis: {
        title: 'Статус верификации',
        items: [
          'Premium-клиент · 6.2 года',
          'Без 2FA-устройства',
          'Запрос по телефону',
          'Давление срочностью',
        ],
      },
      endCorrect: {
        title: 'Назначена верификация в филиале',
        subtitle: 'Клиент придёт с паспортом · NPS сохранится',
      },
      endPartial: {
        title: 'Верификация по 3 вопросам',
        subtitle: 'Ограниченная смена · филиал подтвердит позже',
      },
      endFail: {
        code: 'KYC §3.4',
        title: 'Требуется верификация',
        body:
          'Смена адреса — операция высокого риска. Без 2FA смена по телефону нарушает KYC §3.4. Аудит возлагает персональную ответственность.',
      },
    },
    debrief: {
      title: 'Результат тренинга',
      score: 'Оценка',
      tipsTitle: 'Главные выводы',
      tips: [
        'Смена адреса — операция высокого риска (KYC §3.4).',
        'Без 2FA — только верификация в филиале.',
        'Эмпатия — но не в ущерб протоколу.',
        'Давление срочностью может быть признаком social engineering.',
        'Premium-клиент тоже подчиняется правилам.',
      ],
    },
  },
  hud: {
    listening: 'Слушаю...',
    thinking: 'Анализирую...',
    speaking: 'Говорю',
    ready: 'Готов',
    micHint: 'Нажмите или выберите вариант',
    aiProctor: 'AI Proctor',
    client: 'Клиент',
  },
};
