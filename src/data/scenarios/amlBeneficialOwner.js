import { makeScenario } from './_makeScenario.js';

/**
 * AML pillar · Module 2 — Enhanced KYC / Ultimate Beneficial Owner.
 *
 * A "consultant" wants to open a corporate account but won't disclose
 * the ultimate beneficial owner. Trainee chooses: demand UBO disclosure
 * (+10), escalate to Compliance (+6), or open with the docs given (0).
 */

export const amlBeneficialOwnerScenario = makeScenario({
  id: 'amlBeneficialOwner',
  pillarId: 'aml',
  severity: 'high',
  defaultCards: ['#A6D8FF', '#FFB68A', '#FFD86B'],
  indicators: [
    { id: 'entity', tone: 'sky', severity: 'medium' },
    { id: 'ubo', tone: 'rose', severity: 'critical' },
    { id: 'jurisdiction', tone: 'peach', severity: 'high' },
    { id: 'capital', tone: 'butter', severity: 'medium' },
  ],
  correctId: 'demandUbo',
  partialId: 'escalate',
  failId: 'openAnyway',
});
