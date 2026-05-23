import { makeScenario } from './_makeScenario.js';

/**
 * AML pillar · Module 4 — PEP (Politically Exposed Person) Risk.
 *
 * A regional deputy wants to deposit large business proceeds. Enhanced
 * due diligence required. Trainee chooses: EDD + senior approval (+10),
 * standard KYC (+6), or accept (0).
 */

export const amlPepScenario = makeScenario({
  id: 'amlPep',
  pillarId: 'aml',
  severity: 'high',
  defaultCards: ['#FFD86B', '#FFB68A', '#A8E5C8'],
  indicators: [
    { id: 'pepRole', tone: 'rose', severity: 'critical' },
    { id: 'amount', value: '420 mln', tone: 'peach', severity: 'high' },
    { id: 'sourceFunds', tone: 'butter', severity: 'high' },
    { id: 'jurisdiction', tone: 'sky', severity: 'medium' },
  ],
  correctId: 'eddApprove',
  partialId: 'standardKyc',
  failId: 'accept',
});
