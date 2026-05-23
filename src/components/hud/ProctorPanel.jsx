import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HudPanel } from './HudPanel.jsx';
import { useT } from '../../i18n/index.js';

const STATUS_COLOR = {
  listening: 'var(--peach-deep)',
  thinking: 'var(--butter-deep)',
  speaking: 'var(--mint-deep)',
  ready: 'var(--mint-deep)',
  offline: 'var(--ink-soft)',
};

export function ProctorPanel({ status, subtitle }) {
  const t = useT();
  const statusLabel =
    status === 'listening' ? t.hud.listening :
    status === 'thinking' ? t.hud.thinking :
    status === 'speaking' ? t.hud.speaking :
    t.hud.ready;
  const live = status !== 'offline';
  const tone = STATUS_COLOR[status] ?? STATUS_COLOR.ready;
  const displayed = useTypewriter(subtitle ?? '');

  return (
    <HudPanel
      tone="white"
      pad="md"
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        width: 300,
        zIndex: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ProctorBadge />
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--ink)' }}>
              {t.hud.aiProctor}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--ink-soft)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              opus 4.7 · v1
            </div>
          </div>
        </div>
        <StatusBadge tone={tone} label={statusLabel} live={live} />
      </div>

      <div
        style={{
          background: 'var(--cream-2)',
          border: '2.5px solid var(--line)',
          borderRadius: 12,
          padding: '10px 12px',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--ink)',
          lineHeight: 1.4,
          minHeight: 56,
          fontStyle: displayed ? 'italic' : 'normal',
        }}
      >
        {displayed || (
          <span style={{ color: 'var(--ink-soft)', fontStyle: 'normal' }}>
            {t.hud.ready}…
          </span>
        )}
        {displayed && displayed.length < (subtitle ?? '').length && (
          <span className="caret" style={{ marginLeft: 2 }}>|</span>
        )}
      </div>
    </HudPanel>
  );
}

function StatusBadge({ tone, label, live }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 9,
        letterSpacing: '0.12em',
        fontWeight: 900,
        color: tone,
        textTransform: 'uppercase',
        padding: '4px 8px',
        background: 'var(--cream)',
        border: '2px solid var(--line)',
        borderRadius: 999,
      }}
    >
      <motion.span
        aria-hidden
        animate={live ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] } : {}}
        transition={{ duration: 1.3, repeat: live ? Infinity : 0 }}
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: tone,
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  );
}

function ProctorBadge() {
  return (
    <span
      aria-hidden
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'var(--mint)',
        border: '3px solid var(--line)',
        boxShadow: 'var(--plush-tiny)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: 13,
        color: 'var(--ink)',
      }}
    >
      AI
    </span>
  );
}

const CHARS_PER_SECOND = 38;

/**
 * Tiny typewriter — types `target` out at a fixed character rate. Resets
 * whenever `target` changes so a new proctor message restarts the animation.
 */
function useTypewriter(target) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    if (!target) return undefined;
    let cancelled = false;
    let i = 0;
    const step = () => {
      if (cancelled) return;
      i += 1;
      setOut(target.slice(0, i));
      if (i < target.length) {
        window.setTimeout(step, 1000 / CHARS_PER_SECOND);
      }
    };
    window.setTimeout(step, 1000 / CHARS_PER_SECOND);
    return () => {
      cancelled = true;
    };
  }, [target]);
  return out;
}
