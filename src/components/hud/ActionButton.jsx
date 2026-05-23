import { motion } from 'framer-motion';

/**
 * A single decision button on the inspect panel.
 *
 * Design note — intentionally NEUTRAL by default.
 *
 * Earlier versions of this component encoded the "correct" answer in
 * green (mint), the "partial" answer in butter, and the "fail" answer
 * in rose, and added a scale-pulse animation to the primary option.
 * That setup leaked the answer through pure visual cues — a trainee
 * could pick the green pulsing button without ever reading the
 * scenario. For a training tool, that defeats the purpose.
 *
 * The new contract:
 *   • All choices render on the same paper-cream background.
 *   • There is no isPrimary pulse.
 *   • The decision signal lives in the label + hint text (which is
 *     the educational trade-off the trainee should actually weigh).
 *
 * The `tone` prop is still accepted for backwards-compatibility but
 * defaults to the neutral paper tone. Callers can override for
 * non-scenario surfaces (e.g. a UI prompt outside the inspect flow)
 * by passing tone='mint' etc. explicitly.
 */

const TONE_BG = {
  paper: 'var(--paper)',
  cream: 'var(--cream)',
  white: 'white',
  mint: 'var(--mint)',
  peach: 'var(--peach)',
  butter: 'var(--butter)',
  rose: 'var(--rose)',
  sky: 'var(--sky)',
};

export function ActionButton({
  label,
  hint,
  tone = 'paper',
  onClick,
  disabled = false,
}) {
  const bg = TONE_BG[tone] ?? TONE_BG.paper;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -3 } : {}}
      whileTap={!disabled ? { y: 3, scale: 0.98 } : {}}
      style={{
        background: bg,
        border: '3px solid var(--line)',
        borderRadius: 'var(--r-md)',
        padding: '16px 20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        boxShadow: 'var(--plush-sm)',
        fontFamily: 'inherit',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 16,
          fontWeight: 900,
          color: 'var(--ink)',
          lineHeight: 1.2,
        }}
      >
        {label}
      </span>
      {hint && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--ink-2)',
            lineHeight: 1.4,
          }}
        >
          {hint}
        </span>
      )}
    </motion.button>
  );
}
