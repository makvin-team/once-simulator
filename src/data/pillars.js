/**
 * The 4 curriculum pillars. Each pillar carries:
 *   - an i18n key under `pillars.{id}` (title/summary/etc — see translations)
 *   - a tone (color) keyed to the cozy palette
 *   - a recommended scenario id (the deep one we ship in this pilot)
 *   - module list (id, scenarioId, durationMinutes, locked flag)
 *
 * Modules are intentionally minimal stubs in the pilot — only the first
 * module of the AML pillar (`amlSuspiciousTransaction`) is fully wired to
 * a 3D scenario today. The others render in the dashboard as locked
 * "Coming soon" placeholders so the curriculum scope is visible.
 */

export const PILLAR_IDS = ['aml', 'cyber', 'fraud', 'cx'];

export const PILLARS = {
  aml: {
    id: 'aml',
    tone: 'peach',
    deepTone: '#FF8E5C',
    accent: 'rose',
    priority: 1,
    sessionMinutes: 60,
    recommendedScenarioId: 'amlSuspiciousTransaction',
    modules: [
      {
        id: 'aml-m1',
        scenarioId: 'amlSuspiciousTransaction',
        durationMinutes: 12,
        locked: false,
        i18nKey: 'aml.m1',
      },
      { id: 'aml-m2', durationMinutes: 10, locked: true, i18nKey: 'aml.m2' },
      { id: 'aml-m3', durationMinutes: 10, locked: true, i18nKey: 'aml.m3' },
      { id: 'aml-m4', durationMinutes: 8, locked: true, i18nKey: 'aml.m4' },
      { id: 'aml-m5', durationMinutes: 14, locked: true, i18nKey: 'aml.m5' },
    ],
  },
  cyber: {
    id: 'cyber',
    tone: 'sky',
    deepTone: '#5AB7F2',
    accent: 'sky',
    priority: 2,
    sessionMinutes: 45,
    recommendedScenarioId: 'antiFraudPhish',
    modules: [
      { id: 'cyber-m1', durationMinutes: 10, locked: true, i18nKey: 'cyber.m1' },
      { id: 'cyber-m2', durationMinutes: 12, locked: true, i18nKey: 'cyber.m2' },
      { id: 'cyber-m3', durationMinutes: 15, locked: true, i18nKey: 'cyber.m3' },
      { id: 'cyber-m4', durationMinutes: 10, locked: true, i18nKey: 'cyber.m4' },
      { id: 'cyber-m5', durationMinutes: 12, locked: true, i18nKey: 'cyber.m5' },
    ],
  },
  fraud: {
    id: 'fraud',
    tone: 'butter',
    deepTone: '#F5B73D',
    accent: 'butter',
    priority: 3,
    sessionMinutes: 40,
    recommendedScenarioId: 'amlRedFlags',
    modules: [
      { id: 'fraud-m1', durationMinutes: 9, locked: true, i18nKey: 'fraud.m1' },
      { id: 'fraud-m2', durationMinutes: 11, locked: true, i18nKey: 'fraud.m2' },
      { id: 'fraud-m3', durationMinutes: 13, locked: true, i18nKey: 'fraud.m3' },
      { id: 'fraud-m4', durationMinutes: 9, locked: true, i18nKey: 'fraud.m4' },
      { id: 'fraud-m5', durationMinutes: 14, locked: true, i18nKey: 'fraud.m5' },
    ],
  },
  cx: {
    id: 'cx',
    tone: 'mint',
    deepTone: '#5FCFA0',
    accent: 'mint',
    priority: 4,
    sessionMinutes: 35,
    recommendedScenarioId: 'clientService',
    modules: [
      { id: 'cx-m1', durationMinutes: 8, locked: true, i18nKey: 'cx.m1' },
      { id: 'cx-m2', durationMinutes: 10, locked: true, i18nKey: 'cx.m2' },
      { id: 'cx-m3', durationMinutes: 8, locked: true, i18nKey: 'cx.m3' },
      { id: 'cx-m4', durationMinutes: 12, locked: true, i18nKey: 'cx.m4' },
      { id: 'cx-m5', durationMinutes: 10, locked: true, i18nKey: 'cx.m5' },
    ],
  },
};

/**
 * Stable display order: the priority field above sorts pillars in the UI.
 */
export const PILLAR_ORDER = PILLAR_IDS
  .slice()
  .sort((a, b) => PILLARS[a].priority - PILLARS[b].priority);

/**
 * Compact module-title fallback table. Used when the active translation file
 * does not (yet) carry per-module titles — the dashboard reads from here as
 * a deterministic fallback so locked placeholders still show meaningful text.
 */
export const MODULE_TITLES = {
  'aml.m1': {
    uz: 'Shubhali tranzaksiya · CTR/SAR',
    ru: 'Подозрительная транзакция · CTR/SAR',
    en: 'Suspicious Transaction · CTR/SAR',
  },
  'aml.m2': {
    uz: 'KYC chuqurlashtirilgan · benefitsiar',
    ru: 'Углублённый KYC · бенефициар',
    en: 'KYC Deep-Dive · Beneficial Ownership',
  },
  'aml.m3': {
    uz: 'Sanksiya tekshiruvi · OFAC/UN',
    ru: 'Проверка санкций · OFAC/UN',
    en: 'Sanctions Screening · OFAC/UN',
  },
  'aml.m4': {
    uz: 'PEP risk · siyosiy shaxslar',
    ru: 'PEP-риск · политические лица',
    en: 'PEP Risk · Politically Exposed',
  },
  'aml.m5': {
    uz: 'SAR yozish · amaliyot',
    ru: 'Написание SAR · практика',
    en: 'SAR Writing · Practical',
  },
  'cyber.m1': {
    uz: 'Phishing triage · domen tahlili',
    ru: 'Phishing triage · анализ домена',
    en: 'Phishing Triage · Domain Analysis',
  },
  'cyber.m2': {
    uz: 'SOC alert triage',
    ru: 'SOC alert triage',
    en: 'SOC Alert Triage',
  },
  'cyber.m3': {
    uz: 'Incident response · NIST 800-61',
    ru: 'Incident response · NIST 800-61',
    en: 'Incident Response · NIST 800-61',
  },
  'cyber.m4': {
    uz: 'Zero Trust kirish',
    ru: 'Zero Trust доступ',
    en: 'Zero Trust Access',
  },
  'cyber.m5': {
    uz: 'Deepfake ovoz verifikatsiyasi',
    ru: 'Верификация голоса deepfake',
    en: 'Deepfake Voice Verification',
  },
  'fraud.m1': {
    uz: 'Velocity pattern detection',
    ru: 'Velocity pattern detection',
    en: 'Velocity Pattern Detection',
  },
  'fraud.m2': {
    uz: 'Mule hisob aniqlash',
    ru: 'Поиск mule-счетов',
    en: 'Mule Account Spotting',
  },
  'fraud.m3': {
    uz: 'Karta skimming · behavioral',
    ru: 'Card skimming · поведение',
    en: 'Card Skimming · Behavioural',
  },
  'fraud.m4': {
    uz: 'Chargeback triage',
    ru: 'Chargeback triage',
    en: 'Chargeback Triage',
  },
  'fraud.m5': {
    uz: 'AI anomaly tuning',
    ru: 'AI anomaly tuning',
    en: 'AI Anomaly Tuning',
  },
  'cx.m1': {
    uz: 'Qiyin mijoz · de-eskalatsiya',
    ru: 'Сложный клиент · де-эскалация',
    en: 'Difficult Customer · De-escalation',
  },
  'cx.m2': {
    uz: 'Manzil oʻzgartirish · verifikatsiya',
    ru: 'Смена адреса · верификация',
    en: 'Address Change · Verification',
  },
  'cx.m3': {
    uz: 'Hisob bloklash · empatiya',
    ru: 'Блокировка счёта · эмпатия',
    en: 'Account Block · Empathy',
  },
  'cx.m4': {
    uz: 'Imkoniyati cheklangan mijoz',
    ru: 'Клиент с ограничениями',
    en: 'Customer with Disability',
  },
  'cx.m5': {
    uz: 'Ichki eskalatsiya protokoli',
    ru: 'Внутренний протокол эскалации',
    en: 'Internal Escalation Protocol',
  },
};

export function getModuleTitle(i18nKey, locale) {
  return MODULE_TITLES[i18nKey]?.[locale] ?? i18nKey;
}
