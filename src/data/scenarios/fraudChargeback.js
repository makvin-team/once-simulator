import { makeScenario, withContext } from './_makeScenario.js';

/**
 * Fraud pillar · Module 4 — Chargeback Triage.
 *
 * A "friendly fraud" dispute: customer claims they never received a
 * delivered electronics order. Tracking shows signed delivery to the
 * billing address. Gather evidence + defend (+10), partial refund as
 * goodwill (+6), accept the dispute (0).
 */

export const fraudChargebackScenario = withContext(
  makeScenario({
    id: 'fraudChargeback',
    pillarId: 'fraud',
    severity: 'medium',
    defaultCards: ['#FFD86B', '#A8E5C8', '#A6D8FF'],
    indicators: [
      { id: 'delivery', tone: 'mint', severity: 'medium' },
      { id: 'history', tone: 'butter', severity: 'medium' },
      { id: 'pattern', tone: 'peach', severity: 'high' },
      { id: 'reasonCode', tone: 'sky', severity: 'medium' },
    ],
    correctId: 'defendEvidence',
    partialId: 'partialRefund',
    failId: 'acceptDispute',
  }),
  'scenarios.fraudChargeback',
);
