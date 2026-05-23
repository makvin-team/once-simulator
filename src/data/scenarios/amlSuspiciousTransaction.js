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
   * Initial monitor content. Strings flow through the i18n resolver so
   * the canvas texture redraws on a language switch.
   */
  defaultScreen: {
    type: 'dashboard',
    titleI18n: 'amlScenario.screen.dashboard.title',
    clientI18n: 'amlScenario.screen.dashboard.client',
    cards: [
      { labelI18n: 'amlScenario.screen.dashboard.cards.account', value: '20208…0419', tint: '#A6D8FF' },
      { labelI18n: 'amlScenario.screen.dashboard.cards.risk', value: '74', tint: '#FFB68A' },
      { labelI18n: 'amlScenario.screen.dashboard.cards.limit', value: '50M', tint: '#FFD86B' },
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
        titleI18n: 'amlScenario.screen.analysis.title',
        itemsI18n: 'amlScenario.screen.analysis.items',
        allVisible: true,
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
      i18nRoot: 'amlScenario',
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
        titleI18n: 'amlScenario.screen.endCorrect.title',
        subtitleI18n: 'amlScenario.screen.endCorrect.subtitle',
        flash: true,
      },
    },
    endEscalate: {
      kind: 'end',
      result: 'partial',
      feedbackI18n: 'amlScenario.proctorFeedback.escalateOk',
      screen: {
        type: 'forwarded',
        titleI18n: 'amlScenario.screen.endEscalate.title',
        subtitleI18n: 'amlScenario.screen.endEscalate.subtitle',
      },
    },
    endRelease: {
      kind: 'end',
      result: 'fail',
      feedbackI18n: 'amlScenario.proctorFeedback.releaseFail',
      screen: {
        type: 'policy',
        codeI18n: 'amlScenario.screen.endRelease.code',
        titleI18n: 'amlScenario.screen.endRelease.title',
        bodyI18n: 'amlScenario.screen.endRelease.body',
      },
    },
  },

  debriefI18n: 'amlScenario.debrief',
};
