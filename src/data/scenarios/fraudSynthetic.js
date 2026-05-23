import { makeScenario, withContext } from './_makeScenario.js';

/**
 * Fraud pillar · Module 2 — Synthetic Identity.
 *
 * An onboarding request shows a composite identity: real SSN tied to
 * a never-before-seen name, address shared with three flagged accounts.
 * Deny + report (+10), enhanced KYC interview (+6), open (0).
 */

export const fraudSyntheticScenario = withContext(
  makeScenario({
    id: 'fraudSynthetic',
    pillarId: 'fraud',
    severity: 'critical',
    defaultCards: ['#FFB68A', '#FFB3C0', '#FFD86B'],
    indicators: [
      { id: 'idMatch', tone: 'rose', severity: 'critical' },
      { id: 'addressLinks', tone: 'peach', severity: 'high' },
      { id: 'creditFile', tone: 'butter', severity: 'high' },
      { id: 'deviceFingerprint', tone: 'sky', severity: 'medium' },
    ],
    correctId: 'denyReport',
    partialId: 'enhancedKyc',
    failId: 'open',
  }),
  'scenarios.fraudSynthetic',
);
