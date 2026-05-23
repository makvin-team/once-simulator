/**
 * CX pillar · Module 1 — Difficult Client / Address Change Verification.
 *
 * A regular client (Premium tier) asks to change their registered address
 * urgently. They've forgotten their second-factor device, the request
 * comes by phone, and they're frustrated. The trainee must balance
 * empathy with verification protocol.
 */

export const cxAddressChangeScenario = {
  id: 'cxAddressChange',
  pillarId: 'cx',
  hotspot: 'computer',
  startNodeId: 'intro',
  scenarioTitleI18n: 'cxScenario.title',
  scenarioSubtitleI18n: 'cxScenario.subtitle',

  defaultScreen: {
    type: 'dashboard',
    titleI18n: 'cxScenario.screen.dashboard.title',
    clientI18n: 'cxScenario.screen.dashboard.client',
    cards: [
      { labelI18n: 'cxScenario.screen.dashboard.cards.tier', value: 'Premium', tint: '#A8E5C8' },
      { labelI18n: 'cxScenario.screen.dashboard.cards.years', value: '6.2', tint: '#A6D8FF' },
      { labelI18n: 'cxScenario.screen.dashboard.cards.nps', value: '9.1', tint: '#FFD86B' },
    ],
  },

  nodes: {
    intro: {
      kind: 'proctor',
      textI18n: 'cxScenario.proctorIntro',
      autoAdvance: { afterMs: 2200, toNodeId: 'context' },
    },

    context: {
      kind: 'context',
      tagI18n: 'cxScenario.caseContext.tag',
      contextI18n: 'cxScenario.caseContext.context',
      whatYouSeeI18n: 'cxScenario.caseContext.whatYouSee',
      whatYouHearI18n: 'cxScenario.caseContext.whatYouHear',
      beginI18n: 'cxScenario.caseContext.begin',
      choices: [
        { id: 'begin', nextNodeId: 'alert', points: 0 },
      ],
    },

    alert: {
      kind: 'notification',
      titleI18n: 'cxScenario.notification.title',
      subtitleI18n: 'cxScenario.notification.subtitle',
      tagI18n: 'cxScenario.notification.tag',
      metaI18n: 'cxScenario.notification.meta',
      ctaI18n: 'cxScenario.notification.cta',
      severity: 'medium',
      screen: {
        type: 'analysis',
        titleI18n: 'cxScenario.screen.analysis.title',
        itemsI18n: 'cxScenario.screen.analysis.items',
        allVisible: true,
      },
      choices: [
        {
          id: 'open',
          actionI18n: 'cxScenario.notification.cta',
          nextNodeId: 'inspect',
          points: 0,
        },
      ],
    },

    inspect: {
      kind: 'inspect',
      i18nRoot: 'cxScenario',
      txTagI18n: 'cxScenario.txPanel.tag',
      clientNameI18n: 'cxScenario.txPanel.client',
      clientMetaI18n: 'cxScenario.txPanel.clientMeta',
      yourTaskI18n: 'cxScenario.txPanel.yourTask',
      taskHintI18n: 'cxScenario.txPanel.taskHint',
      timelineI18n: 'cxScenario.txPanel.timeline',
      indicators: [
        {
          id: 'channel',
          valueI18n: 'cxScenario.txPanel.indicators.channel.value',
          tone: 'butter',
          severity: 'medium',
        },
        {
          id: 'factor',
          valueI18n: 'cxScenario.txPanel.indicators.factor.value',
          tone: 'rose',
          severity: 'high',
        },
        {
          id: 'tenure',
          value: '6.2y',
          tone: 'mint',
          severity: 'low',
        },
        {
          id: 'urgency',
          valueI18n: 'cxScenario.txPanel.indicators.urgency.value',
          tone: 'peach',
          severity: 'medium',
        },
      ],
      choices: [
        {
          id: 'verifyChannel',
          actionI18n: 'cxScenario.actions.verifyChannel',
          hintI18n: 'cxScenario.actions.verifyChannelHint',
          nextNodeId: 'endCorrect',
          points: 10,
        },
        {
          id: 'partial',
          actionI18n: 'cxScenario.actions.partial',
          hintI18n: 'cxScenario.actions.partialHint',
          nextNodeId: 'endPartial',
          points: 6,
        },
        {
          id: 'override',
          actionI18n: 'cxScenario.actions.override',
          hintI18n: 'cxScenario.actions.overrideHint',
          nextNodeId: 'endFail',
          points: 0,
        },
      ],
    },

    endCorrect: {
      kind: 'end',
      result: 'pass',
      feedbackI18n: 'cxScenario.proctorFeedback.correct',
      screen: {
        type: 'forwarded',
        titleI18n: 'cxScenario.screen.endCorrect.title',
        subtitleI18n: 'cxScenario.screen.endCorrect.subtitle',
        flash: true,
      },
    },
    endPartial: {
      kind: 'end',
      result: 'partial',
      feedbackI18n: 'cxScenario.proctorFeedback.partialOk',
      screen: {
        type: 'forwarded',
        titleI18n: 'cxScenario.screen.endPartial.title',
        subtitleI18n: 'cxScenario.screen.endPartial.subtitle',
      },
    },
    endFail: {
      kind: 'end',
      result: 'fail',
      feedbackI18n: 'cxScenario.proctorFeedback.overrideFail',
      screen: {
        type: 'policy',
        codeI18n: 'cxScenario.screen.endFail.code',
        titleI18n: 'cxScenario.screen.endFail.title',
        bodyI18n: 'cxScenario.screen.endFail.body',
      },
    },
  },

  debriefI18n: 'cxScenario.debrief',
};
