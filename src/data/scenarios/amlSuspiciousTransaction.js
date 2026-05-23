/**
 * AML pillar · Module 1 — Suspicious Transaction (Cash Deposit).
 *
 * This scenario is intentionally locale-agnostic: choice text, proctor
 * messages, and the on-screen task brief are i18n KEYS (e.g.
 * `amlScenario.actions.fileSar`). The simulation view resolves them at
 * render time so a mid-scenario language switch updates copy live.
 *
 * Node graph:
 *
 *   intro          (proctor sets the scene; mic enabled)
 *     ↓
 *   alert          (NotificationToast appears — KEY MEDKIT-CLONED MECHANIC)
 *     ↓ (open)
 *   inspect        (TransactionDetailsPanel expands; 3 action buttons)
 *     ↓ choice
 *   • fileSar      → end:correct          (+10)
 *   • escalate     → end:escalateOk       (+6)
 *   • release      → end:releaseFail      (0)
 *   • tipOff       → end:tipOffFail       (0)   (hidden lure exposed
 *                                                  later in module 5)
 *
 * Scores roll up into the debrief screen. Maximum 10. Tipping-off and
 * release outcomes have explanatory Proctor feedback under each end node.
 */

export const amlSuspiciousTransactionScenario = {
  id: 'amlSuspiciousTransaction',
  pillarId: 'aml',
  hotspot: 'computer',
  startNodeId: 'intro',
  scenarioTitleI18n: 'amlScenario.title',
  scenarioSubtitleI18n: 'amlScenario.subtitle',

  /**
   * Initial monitor content. `ScreenRenderer` already supports the `dashboard`
   * variant — we feed it the CRM view that matches the alert.
   */
  defaultScreen: {
    type: 'dashboard',
    client: 'Bekzod Karimov · INN 30312840290052',
    cards: [
      { label: 'Faol mijoz', value: '20208…0419', tint: '#A6D8FF' },
      { label: 'Risk skor', value: '74', tint: '#FFB68A' },
      { label: 'Limit', value: '50M', tint: '#FFD86B' },
    ],
  },

  nodes: {
    intro: {
      kind: 'proctor',
      textI18n: 'amlScenario.proctorIntro',
      autoAdvance: { afterMs: 2000, toNodeId: 'alert' },
    },

    alert: {
      kind: 'notification',
      titleI18n: 'amlScenario.notification.title',
      subtitleI18n: 'amlScenario.notification.subtitle',
      tagI18n: 'amlScenario.notification.tag',
      metaI18n: 'amlScenario.notification.meta',
      ctaI18n: 'amlScenario.notification.cta',
      dismissI18n: 'amlScenario.notification.dismiss',
      severity: 'high',
      screen: {
        type: 'analysis',
        items: [
          'Hisob 20208…0419 · 187 mln soʻm',
          'Manba hujjati yoʻq',
          'Risk skor 74 (yuqori)',
          'Mijoz: yangi · 43 kun',
        ],
      },
      choices: [
        {
          id: 'open',
          actionI18n: 'amlScenario.notification.cta',
          nextNodeId: 'inspect',
          points: 0,
        },
      ],
    },

    inspect: {
      kind: 'inspect',
      txTagI18n: 'amlScenario.txPanel.tag',
      clientNameI18n: 'amlScenario.txPanel.client',
      clientMetaI18n: 'amlScenario.txPanel.clientMeta',
      yourTaskI18n: 'amlScenario.txPanel.yourTask',
      taskHintI18n: 'amlScenario.txPanel.taskHint',
      timelineI18n: 'amlScenario.txPanel.timeline',
      indicators: [
        {
          id: 'amount',
          value: '187',
          tone: 'peach',
          severity: 'critical',
          i18nKey: 'amount',
        },
        {
          id: 'source',
          valueI18n: 'amlScenario.txPanel.indicators.source.value',
          tone: 'rose',
          severity: 'critical',
          i18nKey: 'source',
        },
        {
          id: 'risk',
          value: '74',
          tone: 'butter',
          severity: 'high',
          i18nKey: 'risk',
        },
        {
          id: 'country',
          value: 'UZ → AE',
          tone: 'sky',
          severity: 'medium',
          i18nKey: 'country',
        },
      ],
      choices: [
        {
          id: 'fileSar',
          actionI18n: 'amlScenario.actions.fileSar',
          hintI18n: 'amlScenario.actions.fileSarHint',
          tone: 'mint',
          isPrimary: true,
          nextNodeId: 'endCorrect',
          points: 10,
        },
        {
          id: 'escalate',
          actionI18n: 'amlScenario.actions.escalate',
          hintI18n: 'amlScenario.actions.escalateHint',
          tone: 'butter',
          nextNodeId: 'endEscalate',
          points: 6,
        },
        {
          id: 'release',
          actionI18n: 'amlScenario.actions.release',
          hintI18n: 'amlScenario.actions.releaseHint',
          tone: 'rose',
          nextNodeId: 'endRelease',
          points: 0,
        },
      ],
    },

    endCorrect: {
      kind: 'end',
      result: 'pass',
      feedbackI18n: 'amlScenario.proctorFeedback.correct',
      screen: {
        type: 'forwarded',
        title: 'SAR submitted',
        subtitle: 'AML v2.4 §4.2 · Compliance review 24h',
        flash: true,
      },
    },
    endEscalate: {
      kind: 'end',
      result: 'partial',
      feedbackI18n: 'amlScenario.proctorFeedback.escalateOk',
      screen: {
        type: 'forwarded',
        title: 'Escalated to Compliance',
        subtitle: 'Joint review in progress',
      },
    },
    endRelease: {
      kind: 'end',
      result: 'fail',
      feedbackI18n: 'amlScenario.proctorFeedback.releaseFail',
      screen: {
        type: 'policy',
        code: 'AML v2.4 §4.2',
        title: 'Mandatory CTR threshold',
        body:
          'Any cash deposit above 50M UZS requires a Currency Transaction Report and source-of-funds documentation. Accepting without docs is a direct breach with personal liability.',
      },
    },
  },

  debriefI18n: 'amlScenario.debrief',
};
