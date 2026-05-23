import { motion } from 'framer-motion';
import { HudPanel } from './HudPanel.jsx';
import { useT } from '../../i18n/index.js';


export function ClientHologramCard({ nameI18n, metaI18n, position = 'bottom-left' }) {
  const t = useT();
  const name = readPath(t, nameI18n) ?? '—';
  const meta = readPath(t, metaI18n) ?? '';

  const placement =
    position === 'bottom-right'
      ? { bottom: 24, right: 24 }
      : position === 'top-left'
        ? { top: 24, left: 24 }
        : { bottom: 24, left: 24 };

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      style={{
        position: 'absolute',
        ...placement,
        zIndex: 28,
      }}
    >
      <HudPanel tone="white" pad="md" style={{ width: 240 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <HoloPortrait />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: 'var(--ink-soft)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {t.hud.client}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: 'var(--ink)',
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              {name}
            </div>
            {meta && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--ink-2)',
                  marginTop: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {meta}
              </div>
            )}
          </div>
        </div>
      </HudPanel>
    </motion.div>
  );
}

function HoloPortrait() {
  return (
    <div
      style={{
        position: 'relative',
        width: 76,
        height: 76,
        flex: 'none',
      }}
    >
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,142,92,0.55) 0%, rgba(255,142,92,0) 70%)',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        width={76}
        height={76}
        aria-hidden
        style={{ position: 'relative', display: 'block' }}
      >
        <defs>
          <clipPath id="holoClip">
            <circle cx="50" cy="50" r="44" />
          </clipPath>
        </defs>
        <circle cx="50" cy="50" r="44" fill="#FFE6D1" stroke="#2B1E16" strokeWidth="4" />
        <g clipPath="url(#holoClip)">
          {/* shoulders / suit */}
          <path d="M10 100 Q 10 70 30 64 L 70 64 Q 90 70 90 100 Z" fill="#3B2A1F" />
          <path d="M10 100 Q 10 70 30 64 L 70 64 Q 90 70 90 100 Z" fill="none" stroke="#2B1E16" strokeWidth="3" />
          {/* shirt collar */}
          <path d="M38 64 L 50 80 L 62 64 Z" fill="white" stroke="#2B1E16" strokeWidth="2.5" />
          {/* tie */}
          <path d="M48 70 L52 70 L 55 86 L 50 92 L 45 86 Z" fill="#FF8E5C" stroke="#2B1E16" strokeWidth="2" />
          {/* face */}
          <ellipse cx="50" cy="44" rx="22" ry="26" fill="#F0C4A8" stroke="#2B1E16" strokeWidth="3" />
          {/* hair */}
          <path d="M28 36 Q 32 14 50 14 Q 68 14 72 36 Q 64 28 50 30 Q 36 28 28 36 Z" fill="#2B1E16" />
          {/* brows */}
          <path d="M38 40 Q 42 38 46 40" stroke="#2B1E16" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M54 40 Q 58 38 62 40" stroke="#2B1E16" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* eyes */}
          <circle cx="42" cy="46" r="2" fill="#2B1E16" />
          <circle cx="58" cy="46" r="2" fill="#2B1E16" />
          {/* mouth */}
          <path d="M44 56 Q 50 60 56 56" stroke="#2B1E16" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* ID badge */}
          <rect x="26" y="80" width="20" height="14" rx="2" fill="#FFD86B" stroke="#2B1E16" strokeWidth="2" />
          <rect x="29" y="83" width="14" height="3" fill="#2B1E16" opacity="0.6" />
          <rect x="29" y="88" width="10" height="2" fill="#2B1E16" opacity="0.4" />
        </g>
        {/* outer holo ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#FF8E5C" strokeWidth="2" strokeDasharray="3 5" opacity="0.7" />
      </svg>
    </div>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}
