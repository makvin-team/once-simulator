import { makeScenario } from './_makeScenario.js';

/**
 * Fraud pillar · Module 3 — Card Skimming / Behavioral.
 *
 * A debit card shows ATM withdrawals in two cities 280 km apart inside
 * 22 minutes — physical impossibility. Block + open skimmer investigation
 * (+10), notify customer + soft block (+6), monitor (0).
 */

export const fraudSkimmingScenario = makeScenario({
  id: 'fraudSkimming',
  pillarId: 'fraud',
  severity: 'critical',
  defaultCards: ['#FFB68A', '#FFB3C0', '#A6D8FF'],
  indicators: [
    { id: 'geoVelocity', tone: 'rose', severity: 'critical' },
    { id: 'amountPattern', tone: 'peach', severity: 'high' },
    { id: 'atmCluster', tone: 'butter', severity: 'high' },
    { id: 'cvvFailures', tone: 'sky', severity: 'medium' },
  ],
  correctId: 'blockInvestigate',
  partialId: 'notifyCustomer',
  failId: 'monitor',
  choiceTones: { blockInvestigate: 'mint', notifyCustomer: 'butter', monitor: 'rose' },
});
