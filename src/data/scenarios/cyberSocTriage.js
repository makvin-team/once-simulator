import { makeScenario } from './_makeScenario.js';

/**
 * Cyber pillar · Module 2 — SOC Alert Triage.
 *
 * IDS fires on lateral movement attempt from a finance workstation.
 * Isolate host + page IR (+10), monitor (+6), close as false positive (0).
 */

export const cyberSocTriageScenario = makeScenario({
  id: 'cyberSocTriage',
  pillarId: 'cyber',
  severity: 'critical',
  defaultCards: ['#FFB3C0', '#FFB68A', '#A6D8FF'],
  indicators: [
    { id: 'severity', tone: 'rose', severity: 'critical' },
    { id: 'host', tone: 'peach', severity: 'high' },
    { id: 'movement', tone: 'rose', severity: 'critical' },
    { id: 'asset', tone: 'sky', severity: 'medium' },
  ],
  correctId: 'isolate',
  partialId: 'monitor',
  failId: 'closeFp',
  choiceTones: { isolate: 'mint', monitor: 'butter', closeFp: 'rose' },
});
