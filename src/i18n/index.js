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
import { useAppStore } from '../state/useAppStore.js';

export const LOCALES = ['uz', 'uz_cyrl', 'ru'];

const TRANSLATIONS = { uz, uz_cyrl, ru };

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
