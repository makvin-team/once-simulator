import { makeScenario } from './_makeScenario.js';

/**
 * AML pillar · Module 5 — SAR Writing Practice.
 *
 * Trainee has already identified a suspicious pattern; the module asks
 * them to choose the correct narrative form for the SAR submission.
 * Factual 5W narrative (+10), partial narrative missing context (+6),
 * accusatory / opinion-laden tone (0).
 */

export const amlSarWritingScenario = makeScenario({
  id: 'amlSarWriting',
  pillarId: 'aml',
  severity: 'medium',
  defaultCards: ['#A8E5C8', '#A6D8FF', '#FFD86B'],
  indicators: [
    { id: 'pattern', tone: 'peach', severity: 'high' },
    { id: 'evidence', tone: 'mint', severity: 'medium' },
    { id: 'timeline', tone: 'sky', severity: 'medium' },
    { id: 'tone', tone: 'butter', severity: 'medium' },
  ],
  correctId: 'factualFiveW',
  partialId: 'partialNarrative',
  failId: 'accusatory',
  choiceTones: { factualFiveW: 'mint', partialNarrative: 'butter', accusatory: 'rose' },
});
