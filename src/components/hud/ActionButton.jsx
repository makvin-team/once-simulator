import { motion } from 'framer-motion';


const TONE_BG = {
  mint: 'var(--mint)',
  peach: 'var(--peach)',
  butter: 'var(--butter)',
  rose: 'var(--rose)',
  sky: 'var(--sky)',
  white: 'white',
};

export function ActionButton({
  label,
  hint,
  tone = 'butter',
  onClick,
  isPrimary = false,
  disabled = false,
}) {
  const bg = TONE_BG[tone] ?? TONE_BG.butter;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      animate={isPrimary && !disabled ? { scale: [1, 1.018, 1] } : { scale: 1 }}
      transition={{ duration: 2.4, repeat: isPrimary && !disabled ? Infinity : 0 }}
      whileHover={!disabled ? { y: -3 } : {}}
      whileTap={!disabled ? { y: 3, scale: 0.98 } : {}}
      style={{
        background: bg,
        border: '3px solid var(--line)',
        borderRadius: 'var(--r-md)',
        padding: '14px 18px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        boxShadow: 'var(--plush-sm)',
        fontFamily: 'inherit',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 15,
          fontWeight: 900,
          color: 'var(--ink)',
          lineHeight: 1.15,
        }}
      >
        {label}
      </span>
      {hint && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--ink-2)',
            lineHeight: 1.3,
          }}
        >
          {hint}
        </span>
      )}
    </motion.button>
  );
}
