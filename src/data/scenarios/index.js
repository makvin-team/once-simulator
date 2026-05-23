import { clientServiceScenario } from './clientService.js';
import { antiFraudPhishScenario } from './antiFraud.js';
import { deepfakeCallScenario } from './deepfakeCall.js';
import { amlRedFlagsScenario } from './amlRedFlags.js';
import { fakeDocumentScenario } from './fakeDocument.js';
import { socialEngineeringScenario } from './socialEngineering.js';
import { productivityScenario } from './productivity.js';
import { amlSuspiciousTransactionScenario } from './amlSuspiciousTransaction.js';

export const scenarios = {
  amlSuspiciousTransaction: amlSuspiciousTransactionScenario,
  clientService: clientServiceScenario,
  antiFraudPhish: antiFraudPhishScenario,
  deepfakeCall: deepfakeCallScenario,
  amlRedFlags: amlRedFlagsScenario,
  fakeDocument: fakeDocumentScenario,
  socialEngineering: socialEngineeringScenario,
  productivity: productivityScenario,
};

export const scenarioOrder = [
  'clientService',
  'antiFraudPhish',
  'deepfakeCall',
  'amlRedFlags',
  'fakeDocument',
  'socialEngineering',
  'productivity',
];

export const fraudScenarios = [
  'antiFraudPhish',
  'deepfakeCall',
  'amlRedFlags',
  'fakeDocument',
  'socialEngineering',
];
