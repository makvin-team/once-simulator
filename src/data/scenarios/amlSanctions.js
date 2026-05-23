import { makeScenario } from './_makeScenario.js';

/**
 * AML pillar · Module 3 — Sanctions Screening (OFAC / UN list match).
 *
 * Transaction screening flags a name fuzzy-match against an OFAC list.
 * Trainee chooses: block + report (+10), escalate to Compliance (+6),
 * or let it through (0).
 */

export const amlSanctionsScenario = makeScenario({
  id: 'amlSanctions',
  pillarId: 'aml',
  severity: 'critical',
  defaultCards: ['#FFB3C0', '#FFB68A', '#A6D8FF'],
  indicators: [
    { id: 'matchScore', value: '88%', tone: 'rose', severity: 'critical' },
    { id: 'list', tone: 'rose', severity: 'critical' },
    { id: 'amount', tone: 'peach', severity: 'high' },
    { id: 'corridor', tone: 'sky', severity: 'medium' },
  ],
  correctId: 'blockReport',
  partialId: 'escalate',
  failId: 'release',
});
