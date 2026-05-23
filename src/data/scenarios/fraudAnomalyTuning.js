import { makeScenario, withContext } from './_makeScenario.js';

/**
 * Fraud pillar · Module 5 — AI Anomaly Tuning.
 *
 * The behavioral fraud model is producing 4x the normal false-positive
 * rate after a regional payment-day shift. Adjust the model thresholds
 * with a hold-out backtest (+10), apply a partial threshold bump (+6),
 * or disable the noisy rule outright (0).
 */

export const fraudAnomalyTuningScenario = withContext(
  makeScenario({
    id: 'fraudAnomalyTuning',
    pillarId: 'fraud',
    severity: 'medium',
    defaultCards: ['#A8E5C8', '#FFD86B', '#A6D8FF'],
    indicators: [
      { id: 'fpRate', value: '4.2x', tone: 'peach', severity: 'high' },
      { id: 'driftSource', tone: 'butter', severity: 'medium' },
      { id: 'backtest', tone: 'mint', severity: 'low' },
      { id: 'coverage', tone: 'sky', severity: 'medium' },
    ],
    correctId: 'tuneBacktest',
    partialId: 'partialBump',
    failId: 'disableRule',
  }),
  'scenarios.fraudAnomalyTuning',
);
