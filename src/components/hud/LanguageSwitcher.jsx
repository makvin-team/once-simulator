import { useAvailableLocales } from '../../i18n/index.js';
import { useAppStore } from '../../state/useAppStore.js';

export function LanguageSwitcher({ tone = 'cream' }) {
  const locales = useAvailableLocales();
  const active = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: tone === 'cream' ? 'var(--cream-2)' : 'white',
        border: '2.5px solid var(--line)',
        borderRadius: 999,
        boxShadow: 'var(--plush-tiny)',
      }}
    >
      {locales.map((loc) => {
        const isActive = loc.locale === active;
        return (
          <button
            key={loc.locale}
            type="button"
            onClick={() => setLocale(loc.locale)}
            style={{
              padding: '6px 12px',
              border: 0,
              background: isActive ? 'var(--butter)' : 'transparent',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: '0.06em',
              borderRadius: 999,
              cursor: isActive ? 'default' : 'pointer',
              transition: 'background 120ms ease',
            }}
            aria-pressed={isActive}
          >
            {loc.flag}
          </button>
        );
      })}
    </div>
  );
}
