import { makeScenario, withContext } from './_makeScenario.js';

/**
 * CX pillar · Module 5 — Complex Customer / Multi-Product Reconcile.
 *
 * A long-term Premium client with 5 products and 3 family members on
 * the account asks for a global statement consolidation, an interest-
 * rate review, and a beneficiary change — all in one call. The trainee
 * chooses: structured triage with written follow-up (+10), partial
 * handling now + callback (+6), one product only (0).
 */

export const cxComplexCustomerScenario = withContext(
  makeScenario({
    id: 'cxComplexCustomer',
    pillarId: 'cx',
    severity: 'medium',
    defaultCards: ['#A6D8FF', '#A8E5C8', '#FFD86B'],
    indicators: [
      { id: 'products', tone: 'sky', severity: 'medium' },
      { id: 'requests', tone: 'butter', severity: 'medium' },
      { id: 'tenure', value: '8.7y', tone: 'mint', severity: 'low' },
      { id: 'satisfaction', tone: 'peach', severity: 'medium' },
    ],
    correctId: 'structuredTriage',
    partialId: 'partialCallback',
    failId: 'oneOnly',
  }),
  'scenarios.cxComplexCustomer',
);
