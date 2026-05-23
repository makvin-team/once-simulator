import { makeScenario } from './_makeScenario.js';

/**
 * CX pillar · Module 4 — Internal Escalation Protocol.
 *
 * A junior agent is being verbally aggressed by a client and freezes.
 * Trainee chooses: politely take the call + de-escalate + coach (+10),
 * advise the junior live but stay off the call (+6), let them handle
 * it alone (0).
 */

export const cxInternalEscalationScenario = makeScenario({
  id: 'cxInternalEscalation',
  pillarId: 'cx',
  severity: 'high',
  defaultCards: ['#FFB68A', '#A8E5C8', '#FFD86B'],
  indicators: [
    { id: 'tone', tone: 'rose', severity: 'high' },
    { id: 'juniorState', tone: 'peach', severity: 'high' },
    { id: 'clientHistory', tone: 'butter', severity: 'medium' },
    { id: 'queueLoad', tone: 'sky', severity: 'medium' },
  ],
  correctId: 'takeOverCoach',
  partialId: 'liveAdvise',
  failId: 'leaveAlone',
  choiceTones: { takeOverCoach: 'mint', liveAdvise: 'butter', leaveAlone: 'rose' },
});
