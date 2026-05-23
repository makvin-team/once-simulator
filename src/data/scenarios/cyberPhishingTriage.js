/**
 * Cyber pillar · Module 1 — Phishing Email Triage.
 *
 * Same four-stage shape as amlSuspiciousTransaction:
 *   proctor (intro) → notification (incoming email alert)
 *     → inspect (full email + sender analysis)
 *     → end (forward to SOC | quarantine | reply with creds → fail)
 *
 * All copy lives under translations `cyberScenario.*` so a language
 * switch updates the panels and the 3D monitor live.
 */

export const cyberPhishingTriageScenario = {
  id: 'cyberPhishingTriage',
  pillarId: 'cyber',
  hotspot: 'computer',
  startNodeId: 'intro',
  scenarioTitleI18n: 'cyberScenario.title',
  scenarioSubtitleI18n: 'cyberScenario.subtitle',

  defaultScreen: {
    type: 'dashboard',
    titleI18n: 'cyberScenario.screen.dashboard.title',
    clientI18n: 'cyberScenario.screen.dashboard.client',
    cards: [
      { labelI18n: 'cyberScenario.screen.dashboard.cards.inbox', value: '34', tint: '#A6D8FF' },
      { labelI18n: 'cyberScenario.screen.dashboard.cards.flagged', value: '3', tint: '#FFB68A' },
      { labelI18n: 'cyberScenario.screen.dashboard.cards.queue', value: '7', tint: '#A8E5C8' },
    ],
  },

  nodes: {
    intro: {
      kind: 'proctor',
      textI18n: 'cyberScenario.proctorIntro',
      autoAdvance: { afterMs: 2200, toNodeId: 'context' },
    },

    context: {
      kind: 'context',
      tagI18n: 'cyberScenario.caseContext.tag',
      contextI18n: 'cyberScenario.caseContext.context',
      whatYouSeeI18n: 'cyberScenario.caseContext.whatYouSee',
      whatYouHearI18n: 'cyberScenario.caseContext.whatYouHear',
      beginI18n: 'cyberScenario.caseContext.begin',
      choices: [
        { id: 'begin', nextNodeId: 'alert', points: 0 },
      ],
    },

    alert: {
      kind: 'notification',
      titleI18n: 'cyberScenario.notification.title',
      subtitleI18n: 'cyberScenario.notification.subtitle',
      tagI18n: 'cyberScenario.notification.tag',
      metaI18n: 'cyberScenario.notification.meta',
      ctaI18n: 'cyberScenario.notification.cta',
      severity: 'high',
      screen: {
        type: 'analysis',
        titleI18n: 'cyberScenario.screen.analysis.title',
        itemsI18n: 'cyberScenario.screen.analysis.items',
        allVisible: true,
      },
      choices: [
        {
          id: 'open',
          actionI18n: 'cyberScenario.notification.cta',
          nextNodeId: 'inspect',
          points: 0,
        },
      ],
    },

    inspect: {
      kind: 'inspect',
      i18nRoot: 'cyberScenario',
      txTagI18n: 'cyberScenario.txPanel.tag',
      clientNameI18n: 'cyberScenario.txPanel.client',
      clientMetaI18n: 'cyberScenario.txPanel.clientMeta',
      yourTaskI18n: 'cyberScenario.txPanel.yourTask',
      taskHintI18n: 'cyberScenario.txPanel.taskHint',
      timelineI18n: 'cyberScenario.txPanel.timeline',
      indicators: [
        {
          id: 'sender',
          valueI18n: 'cyberScenario.txPanel.indicators.sender.value',
          tone: 'rose',
          severity: 'critical',
        },
        {
          id: 'urgency',
          valueI18n: 'cyberScenario.txPanel.indicators.urgency.value',
          tone: 'peach',
          severity: 'critical',
        },
        {
          id: 'link',
          valueI18n: 'cyberScenario.txPanel.indicators.link.value',
          tone: 'rose',
          severity: 'high',
        },
        {
          id: 'attachment',
          valueI18n: 'cyberScenario.txPanel.indicators.attachment.value',
          tone: 'butter',
          severity: 'medium',
        },
      ],
      choices: [
        {
          id: 'reportSoc',
          actionI18n: 'cyberScenario.actions.reportSoc',
          hintI18n: 'cyberScenario.actions.reportSocHint',
          nextNodeId: 'endCorrect',
          points: 10,
        },
        {
          id: 'quarantine',
          actionI18n: 'cyberScenario.actions.quarantine',
          hintI18n: 'cyberScenario.actions.quarantineHint',
          nextNodeId: 'endPartial',
          points: 6,
        },
        {
          id: 'reply',
          actionI18n: 'cyberScenario.actions.reply',
          hintI18n: 'cyberScenario.actions.replyHint',
          nextNodeId: 'endFail',
          points: 0,
        },
      ],
    },

    endCorrect: {
      kind: 'end',
      result: 'pass',
      feedbackI18n: 'cyberScenario.proctorFeedback.correct',
      screen: {
        type: 'forwarded',
        titleI18n: 'cyberScenario.screen.endCorrect.title',
        subtitleI18n: 'cyberScenario.screen.endCorrect.subtitle',
        flash: true,
      },
    },
    endPartial: {
      kind: 'end',
      result: 'partial',
      feedbackI18n: 'cyberScenario.proctorFeedback.quarantineOk',
      screen: {
        type: 'forwarded',
        titleI18n: 'cyberScenario.screen.endPartial.title',
        subtitleI18n: 'cyberScenario.screen.endPartial.subtitle',
      },
    },
    endFail: {
      kind: 'end',
      result: 'fail',
      feedbackI18n: 'cyberScenario.proctorFeedback.replyFail',
      screen: {
        type: 'policy',
        codeI18n: 'cyberScenario.screen.endFail.code',
        titleI18n: 'cyberScenario.screen.endFail.title',
        bodyI18n: 'cyberScenario.screen.endFail.body',
      },
    },
  },

  debriefI18n: 'cyberScenario.debrief',
};
