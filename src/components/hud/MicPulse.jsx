import { motion } from 'framer-motion';
import { useT } from '../../i18n/index.js';


const STATUS_TONE = {
  idle: '#FFD86B',
  listening: '#FF8E5C',
  thinking: '#F5B73D',
  speaking: '#5FCFA0',
};

export function MicPulse({ status = 'idle', onClick, disabled = false }) {
  const t = useT();
  const live = status === 'listening' || status === 'speaking' || status === 'thinking';
  const label =
    status === 'listening' ? t.hud.listening :
    status === 'thinking' ? t.hud.thinking :
    status === 'speaking' ? t.hud.speaking :
    t.hud.micHint;
  const ring = STATUS_TONE[status] ?? STATUS_TONE.idle;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: 0,
        border: 0,
        background: 'transparent',
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'inherit',
      }}
    >
      <span style={{ position: 'relative', width: 64, height: 64, flex: 'none' }}>
        {/* outer pulse halo — only when live */}
        {live && (
          <motion.span
            aria-hidden
            initial={{ scale: 0.85, opacity: 0.65 }}
            animate={{ scale: 1.55, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: ring,
            }}
          />
        )}
        {/* primary disc */}
        <motion.span
          aria-hidden
          animate={live ? { scale: [1, 1.06, 1] } : { scale: 1 }}
          transition={{ duration: 1.8, repeat: live ? Infinity : 0 }}
          style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            background: ring,
            border: '3px solid var(--line)',
            boxShadow: 'var(--plush-tiny)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MicGlyph />
        </motion.span>
      </span>
      <span
        style={{
          fontWeight: 800,
          fontSize: 13,
          color: 'var(--ink)',
          letterSpacing: 0.2,
          textAlign: 'left',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function MicGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <rect
        x="9"
        y="3"
        width="6"
        height="12"
        rx="3"
        fill="#2B1E16"
      />
      <path
        d="M6 11a6 6 0 0 0 12 0"
        stroke="#2B1E16"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 17v3"
        stroke="#2B1E16"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
