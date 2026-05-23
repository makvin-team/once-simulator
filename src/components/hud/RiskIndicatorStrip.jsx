import { useT } from '../../i18n/index.js';

const TONE = {
  rose: { bg: 'var(--rose)', icon: '⚠' },
  peach: { bg: 'var(--peach)', icon: '$' },
  butter: { bg: 'var(--butter)', icon: '◆' },
  mint: { bg: 'var(--mint)', icon: '✓' },
  sky: { bg: 'var(--sky)', icon: '◯' },
};

/**
 * Renders the 3-4 risk chips at the top of the inspect panel.
 *
 * `i18nRoot` is the dot-path to the active scenario's i18n root
 * (e.g. "amlScenario", "scenarios.cyberZeroTrust"). Each indicator's
 * label/unit/hint are looked up under
 *   {i18nRoot}.txPanel.indicators.{id}
 * so the same component works for every scenario without a hardcoded
 * tree name.
 */
export function RiskIndicatorStrip({ indicators = [], i18nRoot }) {
  const t = useT();
  const lookupBase = i18nRoot
    ? readPath(t, `${i18nRoot}.txPanel.indicators`)
    : null;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.max(1, indicators.length)}, 1fr)`,
        gap: 10,
      }}
    >
      {indicators.map((ind) => {
        const meta = lookupBase?.[ind.id] ?? {};
        const tone = TONE[ind.tone] ?? TONE.butter;
        const valueText =
          ind.value !== undefined
            ? ind.value
            : (readPath(t, ind.valueI18n) ?? meta.value ?? '—');
        return (
          <div
            key={ind.id}
            style={{
              background: tone.bg,
              border: '3px solid var(--line)',
              borderRadius: 14,
              padding: '10px 8px',
              textAlign: 'center',
              boxShadow: 'var(--plush-tiny)',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900 }}>{tone.icon}</div>
            <div style={{ fontWeight: 900, fontSize: 22, lineHeight: 1.05 }}>
              {valueText}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: 'var(--ink-2)',
                marginTop: 2,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {meta.label ?? ind.id}
              {meta.unit ? (
                <>
                  {' '}
                  <span style={{ opacity: 0.6 }}>{meta.unit}</span>
                </>
              ) : null}
            </div>
            {meta.hint && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 9,
                  fontWeight: 700,
                  color: 'var(--ink-soft)',
                }}
              >
                {meta.hint}
              </div>
            )}
            {ind.severity === 'critical' && (
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -7,
                  right: -7,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--rose-deep)',
                  border: '2px solid var(--line)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                !
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}
