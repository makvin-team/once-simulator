import { makeScenario } from './_makeScenario.js';

/**
 * Cyber pillar · Module 5 — Deepfake Voice Verification.
 *
 * "The CEO" is on the phone demanding an urgent 200K wire transfer.
 * Voice is uncanny. Callback verification on a known number (+10),
 * email confirm to known address (+6), wire it (0).
 */

export const cyberDeepfakeScenario = makeScenario({
  id: 'cyberDeepfake',
  pillarId: 'cyber',
  severity: 'critical',
  defaultCards: ['#FFB3C0', '#FFB68A', '#A8E5C8'],
  indicators: [
    { id: 'voice', tone: 'rose', severity: 'critical' },
    { id: 'urgency', tone: 'peach', severity: 'high' },
    { id: 'amount', value: '200K', tone: 'rose', severity: 'critical' },
    { id: 'channel', tone: 'butter', severity: 'medium' },
  ],
  correctId: 'callback',
  partialId: 'emailConfirm',
  failId: 'wire',
  choiceTones: { callback: 'mint', emailConfirm: 'butter', wire: 'rose' },
});
