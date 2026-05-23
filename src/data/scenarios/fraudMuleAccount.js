/**
 * Fraud pillar · Module 1 — Mule Account Detection.
 *
 * The trainee sees an alert about velocity anomalies: a brand-new account
 * receiving rapid small inbound transfers and immediately wiring them out.
 * They inspect the account, decide whether to freeze, escalate to fraud,
 * or let it ride.
 */

export const fraudMuleAccountScenario = {
  id: 'fraudMuleAccount',
  pillarId: 'fraud',
  hotspot: 'computer',
  startNodeId: 'intro',
  scenarioTitleI18n: 'fraudScenario.title',
  scenarioSubtitleI18n: 'fraudScenario.subtitle',

  defaultScreen: {
    type: 'dashboard',
    titleI18n: 'fraudScenario.screen.dashboard.title',
    clientI18n: 'fraudScenario.screen.dashboard.client',
    cards: [
      { labelI18n: 'fraudScenario.screen.dashboard.cards.account', value: '20214…7711', tint: '#A6D8FF' },
      { labelI18n: 'fraudScenario.screen.dashboard.cards.velocity', value: '9.4x', tint: '#FFB68A' },
      { labelI18n: 'fraudScenario.screen.dashboard.cards.age', value: '11d', tint: '#FFD86B' },
    ],
  },

  nodes: {
    intro: {
      kind: 'proctor',
      textI18n: 'fraudScenario.proctorIntro',
      autoAdvance: { afterMs: 2000, toNodeId: 'alert' },
    },

    alert: {
      kind: 'notification',
      titleI18n: 'fraudScenario.notification.title',
      subtitleI18n: 'fraudScenario.notification.subtitle',
      tagI18n: 'fraudScenario.notification.tag',
      metaI18n: 'fraudScenario.notification.meta',
      ctaI18n: 'fraudScenario.notification.cta',
      severity: 'high',
      screen: {
        type: 'analysis',
        titleI18n: 'fraudScenario.screen.analysis.title',
        itemsI18n: 'fraudScenario.screen.analysis.items',
        allVisible: true,
      },
      choices: [
        {
          id: 'open',
          actionI18n: 'fraudScenario.notification.cta',
          nextNodeId: 'inspect',
          points: 0,
        },
      ],
    },

    inspect: {
      kind: 'inspect',
      txTagI18n: 'fraudScenario.txPanel.tag',
      clientNameI18n: 'fraudScenario.txPanel.client',
      clientMetaI18n: 'fraudScenario.txPanel.clientMeta',
      yourTaskI18n: 'fraudScenario.txPanel.yourTask',
      taskHintI18n: 'fraudScenario.txPanel.taskHint',
      timelineI18n: 'fraudScenario.txPanel.timeline',
      indicators: [
        {
          id: 'velocity',
          value: '9.4x',
          tone: 'rose',
          severity: 'critical',
        },
        {
          id: 'inbound',
          valueI18n: 'fraudScenario.txPanel.indicators.inbound.value',
          tone: 'peach',
          severity: 'high',
        },
        {
          id: 'outbound',
          valueI18n: 'fraudScenario.txPanel.indicators.outbound.value',
          tone: 'rose',
          severity: 'critical',
        },
        {
          id: 'age',
          value: '11d',
          tone: 'butter',
          severity: 'medium',
        },
      ],
      choices: [
        {
          id: 'freeze',
          actionI18n: 'fraudScenario.actions.freeze',
          hintI18n: 'fraudScenario.actions.freezeHint',
          tone: 'mint',
          isPrimary: true,
          nextNodeId: 'endCorrect',
          points: 10,
        },
        {
          id: 'escalate',
          actionI18n: 'fraudScenario.actions.escalate',
          hintI18n: 'fraudScenario.actions.escalateHint',
          tone: 'butter',
          nextNodeId: 'endPartial',
          points: 6,
        },
        {
          id: 'monitor',
          actionI18n: 'fraudScenario.actions.monitor',
          hintI18n: 'fraudScenario.actions.monitorHint',
          tone: 'rose',
          nextNodeId: 'endFail',
          points: 0,
        },
      ],
    },

    endCorrect: {
      kind: 'end',
      result: 'pass',
      feedbackI18n: 'fraudScenario.proctorFeedback.correct',
      screen: {
        type: 'forwarded',
        titleI18n: 'fraudScenario.screen.endCorrect.title',
        subtitleI18n: 'fraudScenario.screen.endCorrect.subtitle',
        flash: true,
      },
    },
    endPartial: {
      kind: 'end',
      result: 'partial',
      feedbackI18n: 'fraudScenario.proctorFeedback.escalateOk',
      screen: {
        type: 'forwarded',
        titleI18n: 'fraudScenario.screen.endPartial.title',
        subtitleI18n: 'fraudScenario.screen.endPartial.subtitle',
      },
    },
    endFail: {
      kind: 'end',
      result: 'fail',
      feedbackI18n: 'fraudScenario.proctorFeedback.monitorFail',
      screen: {
        type: 'policy',
        codeI18n: 'fraudScenario.screen.endFail.code',
        titleI18n: 'fraudScenario.screen.endFail.title',
        bodyI18n: 'fraudScenario.screen.endFail.body',
      },
    },
  },

  debriefI18n: 'fraudScenario.debrief',
};
