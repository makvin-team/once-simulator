/**
 * Lightweight i18n. No dependencies — the Zustand store holds `locale`, and
 * `useT()` returns the translation tree for the active language.
 *
 * Locales: Uzbek (Latin), Uzbek (Cyrillic), Russian. Default is Cyrillic
 * because most banking documentation in Uzbekistan is still produced in
 * Cyrillic, especially in compliance/AML contexts.
 *
 * Adding a language = add a file under `translations/` and register it here.
 */
import { uz } from './translations/uz.js';
import { uz_cyrl } from './translations/uz_cyrl.js';
import { ru } from './translations/ru.js';
import { uzScenarios } from './translations/scenarios/uz.js';
import { uzCyrlScenarios } from './translations/scenarios/uz_cyrl.js';
import { ruScenarios } from './translations/scenarios/ru.js';
import { useAppStore } from '../state/useAppStore.js';

export const LOCALES = ['uz', 'uz_cyrl', 'ru'];

/**
 * Merge the per-locale base translations with the m2-m5 scenario trees
 * loaded from `./translations/scenarios/`. The factory-generated
 * scenarios resolve all their copy under `scenarios.{id}.*`, so this
 * mount point is the single integration seam between the base
 * translation set and the scenario authoring files.
 */
const TRANSLATIONS = {
  uz: { ...uz, scenarios: uzScenarios },
  uz_cyrl: { ...uz_cyrl, scenarios: uzCyrlScenarios },
  ru: { ...ru, scenarios: ruScenarios },
};

export const DEFAULT_LOCALE = 'uz_cyrl';

/**
 * Resolve the translation tree for a locale. Falls back to the default
 * locale if unknown.
 */
export function getTranslations(locale) {
  return TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE];
}

/**
 * Hook: subscribe to the active locale and return its translation tree.
 * Components re-render whenever the locale changes in the store.
 */
export function useT() {
  const locale = useAppStore((s) => s.locale);
  return getTranslations(locale);
}

/**
 * Hook: list of every available locale's meta block — for the language switcher.
 */
export function useAvailableLocales() {
  return LOCALES.map((code) => TRANSLATIONS[code].meta);
}

/**
 * Substitute `{key}` placeholders in a template string.
 * Example: format('{n} min', { n: 12 }) → '12 min'
 */
export function format(template, values) {
  if (!template || !values) return template ?? '';
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    values[k] !== undefined ? String(values[k]) : `{${k}}`,
  );
}
