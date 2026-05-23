import { makeScenario, withContext } from './_makeScenario.js';

/**
 * CX pillar · Module 2 — Account Block + Empathy.
 *
 * A loyal Premium client wakes to find their card auto-blocked
 * overnight by the velocity engine. They have a flight in 90 minutes
 * and are upset. Empathetic explain + branch-supervised temporary
 * lift (+10), strict protocol-only handling (+6), dismiss complaint (0).
 */

export const cxAccountBlockScenario = withContext(
  makeScenario({
    id: 'cxAccountBlock',
    pillarId: 'cx',
    severity: 'medium',
    defaultCards: ['#A8E5C8', '#A6D8FF', '#FFB68A'],
    indicators: [
      { id: 'reason', tone: 'butter', severity: 'medium' },
      { id: 'tenure', value: '5.4y', tone: 'mint', severity: 'low' },
      { id: 'urgency', tone: 'peach', severity: 'high' },
      { id: 'fraudRisk', tone: 'sky', severity: 'low' },
    ],
    correctId: 'empathyTemp',
    partialId: 'protocolOnly',
    failId: 'dismiss',
  }),
  'scenarios.cxAccountBlock',
);
