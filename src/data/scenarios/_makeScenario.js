/**
 * Factory for the four-stage scenarios this app ships.
 *
 *   intro (proctor) → alert (notification) → inspect → end[pass|partial|fail]
 *
 * Every scenario uses the same skeleton: a proctor sets the scene, an
 * alert toast pops, the inspect panel surfaces 3 indicators + 3 choices,
 * and each choice ends in pass / partial / fail. The factory keeps that
 * skeleton in one place so individual scenario files stay focused on the
 * content that actually matters (the topic, indicators, scoring, and
 * i18n key root).
 *
 * The i18n contract: every scenario keys its translations under
 *   `scenarios.{id}.*`
 * so a scenario with id `amlBeneficialOwner` reads its strings from
 *   t.scenarios.amlBeneficialOwner.title
 *   t.scenarios.amlBeneficialOwner.notification.title
 *   ...etc.
 *
 * Required `opts` fields:
 *   id          — scenario id (also the i18n root)
 *   pillarId    — aml | cyber | fraud | cx
 *   severity    — alert severity: critical | high | medium | low
 *   defaultCards — three short card tints for the dashboard screen.
 *                  Use the global cozy palette hex values.
 *   indicators  — array of 3-4 indicator descriptors for the inspect
 *                 panel: { id, value? OR valueI18n?, tone, severity }
 *   correctId   — choice id that scores +10
 *   partialId   — choice id that scores +6
 *   failId      — choice id that scores 0
 *
 * Note: earlier versions accepted a `choiceTones` map that colour-coded
 * options (correct=mint, partial=butter, fail=rose) and an isPrimary
 * pulse on the correct choice. Both were stripped because they
 * telegraphed the answer through pure visual cues, defeating the
 * point of a training tool. See the design note on ActionButton.jsx.
 */

const KIND = {
  PROCTOR: 'proctor',
  NOTIFICATION: 'notification',
  INSPECT: 'inspect',
  END: 'end',
};

export function makeScenario(opts) {
  const {
    id,
    pillarId,
    severity = 'high',
    defaultCards,
    indicators,
    correctId,
    partialId,
    failId,
  } = opts;

  const root = `scenarios.${id}`;

  return {
    id,
    pillarId,
    hotspot: 'computer',
    startNodeId: 'intro',
    scenarioTitleI18n: `${root}.title`,
    scenarioSubtitleI18n: `${root}.subtitle`,

    defaultScreen: {
      type: 'dashboard',
      titleI18n: `${root}.screen.dashboard.title`,
      clientI18n: `${root}.screen.dashboard.client`,
      cards: defaultCards.map((tint, i) => ({
        labelI18n: `${root}.screen.dashboard.cards.${cardKey(i)}`,
        valueI18n: `${root}.screen.dashboard.cards.${cardKey(i)}Value`,
        tint,
      })),
    },

    nodes: {
      intro: {
        kind: KIND.PROCTOR,
        textI18n: `${root}.proctorIntro`,
        autoAdvance: { afterMs: 2000, toNodeId: 'alert' },
      },

      alert: {
        kind: KIND.NOTIFICATION,
        titleI18n: `${root}.notification.title`,
        subtitleI18n: `${root}.notification.subtitle`,
        tagI18n: `${root}.notification.tag`,
        metaI18n: `${root}.notification.meta`,
        ctaI18n: `${root}.notification.cta`,
        severity,
        screen: {
          type: 'analysis',
          titleI18n: `${root}.screen.analysis.title`,
          itemsI18n: `${root}.screen.analysis.items`,
          allVisible: true,
        },
        choices: [
          {
            id: 'open',
            actionI18n: `${root}.notification.cta`,
            nextNodeId: 'inspect',
            points: 0,
          },
        ],
      },

      inspect: {
        kind: KIND.INSPECT,
        i18nRoot: root,
        txTagI18n: `${root}.txPanel.tag`,
        clientNameI18n: `${root}.txPanel.client`,
        clientMetaI18n: `${root}.txPanel.clientMeta`,
        yourTaskI18n: `${root}.txPanel.yourTask`,
        taskHintI18n: `${root}.txPanel.taskHint`,
        timelineI18n: `${root}.txPanel.timeline`,
        indicators: indicators.map((ind) => ({
          id: ind.id,
          tone: ind.tone,
          severity: ind.severity ?? 'medium',
          ...(ind.value !== undefined
            ? { value: ind.value }
            : { valueI18n: `${root}.txPanel.indicators.${ind.id}.value` }),
        })),
        choices: [correctId, partialId, failId].map((cid, i) => ({
          id: cid,
          actionI18n: `${root}.actions.${cid}`,
          hintI18n: `${root}.actions.${cid}Hint`,
          nextNodeId: endIdFor(i),
          points: pointsFor(i),
        })),
      },

      endCorrect: {
        kind: KIND.END,
        result: 'pass',
        feedbackI18n: `${root}.proctorFeedback.correct`,
        screen: {
          type: 'forwarded',
          titleI18n: `${root}.screen.endCorrect.title`,
          subtitleI18n: `${root}.screen.endCorrect.subtitle`,
          flash: true,
        },
      },
      endPartial: {
        kind: KIND.END,
        result: 'partial',
        feedbackI18n: `${root}.proctorFeedback.partial`,
        screen: {
          type: 'forwarded',
          titleI18n: `${root}.screen.endPartial.title`,
          subtitleI18n: `${root}.screen.endPartial.subtitle`,
        },
      },
      endFail: {
        kind: KIND.END,
        result: 'fail',
        feedbackI18n: `${root}.proctorFeedback.fail`,
        screen: {
          type: 'policy',
          codeI18n: `${root}.screen.endFail.code`,
          titleI18n: `${root}.screen.endFail.title`,
          bodyI18n: `${root}.screen.endFail.body`,
        },
      },
    },

    debriefI18n: `${root}.debrief`,
  };
}

/**
 * Mutate a scenario in place to insert a case-context node between intro
 * and alert. The new node lives at `nodes.context`; intro.autoAdvance is
 * rerouted to it. Translations are read from `${i18nRoot}.caseContext.*`
 * so each scenario can author its own narrative.
 *
 *   intro (proctor) → context (case brief) → alert (notification) → ...
 *
 * Used by the CX pillar to bring its scenarios up to the AML / Cyber /
 * Fraud quality bar without duplicating the factory boilerplate.
 */
export function withContext(scenario, i18nRoot) {
  if (!scenario?.nodes) return scenario;
  const intro = scenario.nodes.intro;
  if (intro?.autoAdvance) {
    intro.autoAdvance = { ...intro.autoAdvance, toNodeId: 'context' };
  }
  scenario.nodes.context = {
    kind: 'context',
    tagI18n: `${i18nRoot}.caseContext.tag`,
    contextI18n: `${i18nRoot}.caseContext.context`,
    whatYouSeeI18n: `${i18nRoot}.caseContext.whatYouSee`,
    whatYouHearI18n: `${i18nRoot}.caseContext.whatYouHear`,
    beginI18n: `${i18nRoot}.caseContext.begin`,
    choices: [{ id: 'begin', nextNodeId: 'alert', points: 0 }],
  };
  return scenario;
}

function cardKey(i) {
  return ['a', 'b', 'c', 'd'][i] ?? `c${i}`;
}

function endIdFor(i) {
  return ['endCorrect', 'endPartial', 'endFail'][i];
}

function pointsFor(i) {
  return [10, 6, 0][i];
}
