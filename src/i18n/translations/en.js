/**
 * English translations. Mirrors the shape of uz.js exactly.
 */
export const en = {
  meta: {
    locale: 'en',
    label: 'English',
    flag: 'EN',
  },
  app: {
    name: 'once · AI Mentor',
    tagline:
      'Next-generation virtual onboarding for bank employees — deep scenarios across AML, cybersecurity, fraud monitoring, and customer support.',
    pickLanguage: 'Pick a language',
  },
  nav: {
    back: 'Back',
    exit: 'Exit',
    continue: 'Continue',
    finish: 'Finish',
    retry: 'Retry',
    start: 'Start',
    next: 'Next',
  },
  roleSelection: {
    eyebrow: 'Step 1',
    title: 'Pick your role',
    subtitle:
      'Each role unlocks a tailored onboarding path. You can change later.',
    pickRole: 'Pick a role to start',
    modulesCount: '{count} modules',
    sessionLength: 'Session',
    proctorReady: 'AI Proctor ready',
  },
  pillars: {
    aml: {
      shortLabel: 'AML',
      title: 'AML / Compliance',
      tagline: 'Highest priority',
      summary:
        'Catch illegal flows, run KYC, screen sanctions, write SARs, and act on regulatory decisions.',
      jobRoles: 'AML Specialist · Compliance Officer · Fraud Analyst',
      focus: 'Suspicious transactions · KYC · Sanctions · Regulation',
    },
    cyber: {
      shortLabel: 'CYBER',
      title: 'Cybersecurity / InfoSec',
      tagline: 'Protect brand & data',
      summary:
        'Phishing triage, SOC monitoring, incident response, Zero Trust, and deepfake defence.',
      jobRoles: 'Security Engineer · SOC Analyst · InfoSec Officer',
      focus: 'Phishing · SOC · Incident Response · Zero Trust',
    },
    fraud: {
      shortLabel: 'FRAUD',
      title: 'Fraud Monitoring',
      tagline: 'Online-banking shield',
      summary:
        'Transaction pattern analysis, AI fraud detection, behavioural analytics, chargeback triage.',
      jobRoles: 'Fraud Analyst · Transaction Monitor',
      focus: 'Pattern analysis · AI detection · Behavioural · Chargeback',
    },
    cx: {
      shortLabel: 'CX',
      title: 'Customer Support',
      tagline: 'Face of the bank',
      summary:
        'Communication, product knowledge, conflict resolution, and CRM use.',
      jobRoles: 'Client Manager · Support Operator',
      focus: 'Conversation · Product · De-escalation · CRM',
    },
  },
  modules: {
    eyebrow: 'Step 2',
    title: 'Pick a module',
    subtitle: 'Recommended order · each module 8-15 minutes',
    locked: 'Locked',
    available: 'Available',
    completed: 'Completed',
    minutes: '{n} min',
    start: 'Start',
    chooseAnother: 'Pick another role',
  },
  amlScenario: {
    title: 'Suspicious Transaction — Cash Deposit',
    subtitle: 'AML Regulation v2.4 §4.2 · CTR/SAR decision',
    proctorIntro:
      'You are at the desk. Watch the monitor — an alert is incoming.',
    proctorMicInstruction:
      'Tap the mic, or pick a choice on the screen.',
    notification: {
      tag: 'New alert',
      title: 'Large cash deposit detected',
      subtitle: 'Account 20208…0419 · 187M UZS',
      meta: 'AML Reg. v2.4 §4.2 · 15 seconds to review',
      cta: 'Open transaction',
      dismiss: 'Later',
    },
    txPanel: {
      tag: 'CRM · TRANSACTION DETAILS',
      client: 'Bekzod Karimov',
      clientMeta: 'TIN 30312840290052 · Premium · New client (43 days)',
      indicators: {
        amount: { label: 'Amount', unit: 'M UZS', hint: 'Above 50M' },
        source: { label: 'Source doc', value: 'None', hint: 'AML §4.2' },
        risk: { label: 'Risk score', unit: 'AML algo', hint: 'High' },
        country: { label: 'Geo', hint: 'High-risk list' },
      },
      timeline: [
        { time: '09:14', text: 'Client approached the teller' },
        { time: '09:14', text: '187M UZS in cash, no source document' },
        { time: '09:15', text: 'Client: "hurry up, I need to catch a flight"' },
        { time: '09:15', text: 'AML algorithm flagged risk score 74' },
      ],
      yourTask: 'Your decision',
      taskHint: 'Pick one correct answer — the decision is saved and graded.',
    },
    actions: {
      fileSar: 'File SAR',
      fileSarHint: 'Operation blocked · Compliance reviews within 24h',
      release: 'Release without refusal',
      releaseHint: 'Client happy · audit door open',
      escalate: 'Escalate to Compliance',
      escalateHint: 'Manager + Compliance joint decision',
    },
    proctorFeedback: {
      correct:
        'Excellent. 3 red flags are obvious: no document, time pressure, new client. SAR is the only correct path.',
      escalateOk:
        'Escalation is a safe call. But the employee should have filed the SAR themselves once 3 red flags were visible.',
      releaseFail:
        'RISK. Accepting 187M cash without documents is a direct breach of AML v2.4 §4.2. The audit will assign personal liability.',
      tipOffFail:
        'CRIMINAL ACT. Telling the client they are flagged is tipping-off (AML §7.1). Never inform a client about a SAR.',
    },
    debrief: {
      title: 'Session result',
      score: 'Score',
      tipsTitle: 'Key takeaways',
      tips: [
        '50M+ cash deposit — CTR mandatory (AML v2.4 §4.2).',
        '3+ red flags — SAR likely, escalate.',
        'Tipping-off is criminal. Never tell a client they are flagged (§7.1).',
        'Suspicious operation — stop first, investigate later.',
        'Time pressure is a classic red-flag indicator.',
      ],
    },
  },
  hud: {
    listening: 'Listening...',
    thinking: 'Thinking...',
    speaking: 'Speaking',
    ready: 'Ready',
    micHint: 'Tap or click an option',
    aiProctor: 'AI Proctor',
    client: 'Client',
  },
};
