import { makeScenario, withContext } from './_makeScenario.js';

/**
 * Cyber pillar · Module 4 — Zero Trust Access.
 *
 * A vendor requests admin access to production for "ongoing maintenance".
 * Time-bound JIT access with logging (+10), VPN with monitoring (+6),
 * permanent admin group membership (0).
 */

export const cyberZeroTrustScenario = withContext(
  makeScenario({
    id: 'cyberZeroTrust',
    pillarId: 'cyber',
    severity: 'high',
    defaultCards: ['#A6D8FF', '#FFD86B', '#FFB68A'],
    indicators: [
      { id: 'requester', tone: 'sky', severity: 'medium' },
      { id: 'scope', tone: 'rose', severity: 'critical' },
      { id: 'duration', tone: 'peach', severity: 'high' },
      { id: 'audit', tone: 'butter', severity: 'medium' },
    ],
    correctId: 'jitAccess',
    partialId: 'vpnMonitor',
    failId: 'permanentGroup',
  }),
  'scenarios.cyberZeroTrust',
);
