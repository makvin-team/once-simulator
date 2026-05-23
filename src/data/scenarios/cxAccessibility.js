import { makeScenario, withContext } from './_makeScenario.js';

/**
 * CX pillar · Module 3 — Limited-Ability Client / Accessibility.
 *
 * A visually impaired client struggles with the new online-banking
 * interface. Full guided session + screen-reader walkthrough + bookmark
 * accessible flows (+10), standard tutorial (+6), redirect to phone-
 * support only (0).
 */

export const cxAccessibilityScenario = withContext(
  makeScenario({
    id: 'cxAccessibility',
    pillarId: 'cx',
    severity: 'medium',
    defaultCards: ['#A8E5C8', '#FFD86B', '#A6D8FF'],
    indicators: [
      { id: 'need', tone: 'sky', severity: 'medium' },
      { id: 'product', tone: 'butter', severity: 'low' },
      { id: 'frustration', tone: 'peach', severity: 'medium' },
      { id: 'tools', tone: 'mint', severity: 'low' },
    ],
    correctId: 'fullSession',
    partialId: 'standardTutorial',
    failId: 'redirect',
  }),
  'scenarios.cxAccessibility',
);
