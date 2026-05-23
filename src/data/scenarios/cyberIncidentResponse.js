import { makeScenario, withContext } from './_makeScenario.js';

/**
 * Cyber pillar · Module 3 — Incident Response (NIST 800-61).
 *
 * Ransomware is encrypting files in the finance department. Choose the
 * correct response: contain + eradicate + forensics (+10), restore from
 * backups immediately (+6), pay ransom (0).
 */

export const cyberIncidentResponseScenario = withContext(
  makeScenario({
    id: 'cyberIncidentResponse',
    pillarId: 'cyber',
    severity: 'critical',
    defaultCards: ['#FFB3C0', '#FFB68A', '#FFD86B'],
    indicators: [
      { id: 'spread', tone: 'rose', severity: 'critical' },
      { id: 'department', tone: 'peach', severity: 'high' },
      { id: 'backups', tone: 'mint', severity: 'medium' },
      { id: 'ransom', tone: 'rose', severity: 'critical' },
    ],
    correctId: 'containEradicate',
    partialId: 'restoreBackup',
    failId: 'payRansom',
  }),
  'scenarios.cyberIncidentResponse',
);
