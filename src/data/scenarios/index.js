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

// m2-m5 across all pillars — generated via _makeScenario.js
import { amlBeneficialOwnerScenario } from './amlBeneficialOwner.js';
import { amlSanctionsScenario } from './amlSanctions.js';
import { amlPepScenario } from './amlPep.js';
import { amlSarWritingScenario } from './amlSarWriting.js';
import { cyberSocTriageScenario } from './cyberSocTriage.js';
import { cyberIncidentResponseScenario } from './cyberIncidentResponse.js';
import { cyberZeroTrustScenario } from './cyberZeroTrust.js';
import { cyberDeepfakeScenario } from './cyberDeepfake.js';
import { fraudSyntheticScenario } from './fraudSynthetic.js';
import { fraudSkimmingScenario } from './fraudSkimming.js';
import { fraudChargebackScenario } from './fraudChargeback.js';
import { fraudAnomalyTuningScenario } from './fraudAnomalyTuning.js';
import { cxAccountBlockScenario } from './cxAccountBlock.js';
import { cxAccessibilityScenario } from './cxAccessibility.js';
import { cxInternalEscalationScenario } from './cxInternalEscalation.js';
import { cxComplexCustomerScenario } from './cxComplexCustomer.js';

export const scenarios = {
  amlSuspiciousTransaction: amlSuspiciousTransactionScenario,
  amlBeneficialOwner: amlBeneficialOwnerScenario,
  amlSanctions: amlSanctionsScenario,
  amlPep: amlPepScenario,
  amlSarWriting: amlSarWritingScenario,
  cyberPhishingTriage: cyberPhishingTriageScenario,
  cyberSocTriage: cyberSocTriageScenario,
  cyberIncidentResponse: cyberIncidentResponseScenario,
  cyberZeroTrust: cyberZeroTrustScenario,
  cyberDeepfake: cyberDeepfakeScenario,
  fraudMuleAccount: fraudMuleAccountScenario,
  fraudSynthetic: fraudSyntheticScenario,
  fraudSkimming: fraudSkimmingScenario,
  fraudChargeback: fraudChargebackScenario,
  fraudAnomalyTuning: fraudAnomalyTuningScenario,
  cxAddressChange: cxAddressChangeScenario,
  cxAccountBlock: cxAccountBlockScenario,
  cxAccessibility: cxAccessibilityScenario,
  cxInternalEscalation: cxInternalEscalationScenario,
  cxComplexCustomer: cxComplexCustomerScenario,
};

export const scenarioOrder = [
  'amlSuspiciousTransaction', 'amlBeneficialOwner', 'amlSanctions', 'amlPep', 'amlSarWriting',
  'cyberPhishingTriage', 'cyberSocTriage', 'cyberIncidentResponse', 'cyberZeroTrust', 'cyberDeepfake',
  'fraudMuleAccount', 'fraudSynthetic', 'fraudSkimming', 'fraudChargeback', 'fraudAnomalyTuning',
  'cxAddressChange', 'cxAccountBlock', 'cxAccessibility', 'cxInternalEscalation', 'cxComplexCustomer',
];
