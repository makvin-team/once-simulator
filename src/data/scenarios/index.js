/**
 * Scenario registry.
 *
 * Each scenario is keyed by id. Only scenarios that follow the strict
 * new node shape (proctor → notification → inspect → end[]) are exposed
 * here. The legacy mock-playground scenarios that live in this folder
 * but use the old shape are intentionally NOT registered.
 */

import { amlSuspiciousTransactionScenario } from './amlSuspiciousTransaction.js';
import { cyberPhishingTriageScenario } from './cyberPhishingTriage.js';
import { fraudMuleAccountScenario } from './fraudMuleAccount.js';
import { cxAddressChangeScenario } from './cxAddressChange.js';

export const scenarios = {
  amlSuspiciousTransaction: amlSuspiciousTransactionScenario,
  cyberPhishingTriage: cyberPhishingTriageScenario,
  fraudMuleAccount: fraudMuleAccountScenario,
  cxAddressChange: cxAddressChangeScenario,
};

export const scenarioOrder = [
  'amlSuspiciousTransaction',
  'cyberPhishingTriage',
  'fraudMuleAccount',
  'cxAddressChange',
];
