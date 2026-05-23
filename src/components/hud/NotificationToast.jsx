import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HudPanel } from './HudPanel.jsx';
import { useT } from '../../i18n/index.js';


const COUNTDOWN_MS = 15_000;

export function NotificationToast({
  visible,
  tagI18nKey,
  titleI18nKey,
  subtitleI18nKey,
  metaI18nKey,
  ctaI18nKey,
  severity = 'high',
  onCta,
  onDismiss,
}) {
  const t = useT();
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!visible) {
      setProgress(1);
      return undefined;
    }
    const start = performance.now();
    let raf;
    const tick = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, 1 - elapsed / COUNTDOWN_MS);
      setProgress(remaining);
      if (remaining > 0) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const accent =
    severity === 'critical' ? 'var(--rose-deep)' :
    severity === 'high' ? 'var(--peach-deep)' :
    severity === 'medium' ? 'var(--butter-deep)' :
    'var(--mint-deep)';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          style={{
            position: 'absolute',
            top: 18,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(520px, calc(100vw - 32px))',
            zIndex: 40,
          }}
        >
          <HudPanel
            tone="white"
            pad="md"
            shadow="plush"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Severity accent bar */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: 6,
                background: accent,
              }}
            />

            <div style={{ display: 'flex', gap: 14, paddingLeft: 8 }}>
              <PulseSiren accent={accent} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'white',
                      background: accent,
                      padding: '3px 9px',
                      borderRadius: 999,
                      border: '2px solid var(--line)',
                      boxShadow: 'var(--plush-tiny)',
                    }}
                  >
                    {readPath(t, tagI18nKey) ?? 'Alert'}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {readPath(t, metaI18nKey) ?? ''}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 900,
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                  }}
                >
                  {readPath(t, titleI18nKey) ?? ''}
                </div>
                <div
                  style={{
                    marginTop: 3,
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--ink-2)',
                  }}
                >
                  {readPath(t, subtitleI18nKey) ?? ''}
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  <button
                    type="button"
                    onClick={onCta}
                    className="btn-plush primary"
                    style={{ fontSize: 13, padding: '10px 18px' }}
                  >
                    {readPath(t, ctaI18nKey) ?? 'Open'}
                  </button>
                  <button
                    type="button"
                    onClick={onDismiss}
                    className="btn-plush ghost"
                    style={{ fontSize: 13, padding: '10px 18px' }}
                  >
                    {t.nav.back}
                  </button>
                </div>
              </div>
            </div>

            {/* Countdown bar */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 4,
                background: 'var(--cream-2)',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress * 100}%`,
                  background: accent,
                  transition: 'width 80ms linear',
                }}
              />
            </div>
          </HudPanel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PulseSiren({ accent }) {
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flex: 'none' }}>
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: accent,
          opacity: 0.55,
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: '50%',
          background: accent,
          border: '3px solid var(--line)',
          boxShadow: 'var(--plush-tiny)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 900,
          fontSize: 18,
        }}
      >
        !
      </span>
    </div>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}
