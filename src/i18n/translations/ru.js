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
