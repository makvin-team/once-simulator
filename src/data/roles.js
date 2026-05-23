export const roles = {
  operator: {
    id: 'operator',
    title: 'Operator',
    subtitle: 'Kassa va xizmat koʻrsatish',
    onboardingDays: 60,
    plan: 'AML asoslari · ABS workflow · Mijoz xizmati · Fraud awareness',
    recommended: ['clientService', 'antiFraudPhish', 'amlRedFlags'],
  },
  callAgent: {
    id: 'callAgent',
    title: 'Call-agent',
    subtitle: 'Telefon orqali xizmat',
    onboardingDays: 30,
    plan: 'Mijoz xizmati · Deepfake himoya · Suhbat skripti',
    recommended: ['deepfakeCall', 'clientService'],
  },
  seniorOperator: {
    id: 'seniorOperator',
    title: 'Senior operator',
    subtitle: 'Murakkab keyslar va eskalatsiya',
    onboardingDays: 45,
    plan: 'AML eskalatsiya · KYC chuqurlashtirilgan · Hujjat tekshiruvi · Risk baholash',
    recommended: ['fakeDocument', 'amlRedFlags', 'socialEngineering'],
  },
  compliance: {
    id: 'compliance',
    title: 'Compliance',
    subtitle: 'AML va ichki audit',
    onboardingDays: 90,
    plan: 'AML reglamenti v2.4 · Red-flag tahlili · Hisobot tartibi',
    recommended: ['amlRedFlags', 'fakeDocument', 'antiFraudPhish'],
  },
};

export const roleOrder = ['operator', 'callAgent', 'seniorOperator', 'compliance'];
