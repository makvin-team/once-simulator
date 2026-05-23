import { motion } from 'framer-motion';

/**
 * The base "plush floating panel" that every HUD overlay sits inside.
 *
 * This is the bank-themed reinterpretation of Medkit's docked panels:
 * white (or tinted) background, 3px black outline, plush drop shadow,
 * rounded `var(--r-md)` corners. NOT translucent glass — saved user
 * feedback rejects dark/glass-morphism aesthetics for this product.
 *
 * `tone` picks one of the palette tints. `tilt` rotates by a fractional
 * degree for the hand-drawn feel. `pad` controls inner padding (sm/md/lg).
 */

const TONES = {
  white: { background: 'white' },
  cream: { background: 'var(--cream-2)' },
  paper: { background: 'var(--paper)' },
  butter: { background: 'var(--butter)' },
  peach: { background: 'var(--peach)' },
  mint: { background: 'var(--mint)' },
  rose: { background: 'var(--rose)' },
  sky: { background: 'var(--sky)' },
};

const PAD = { sm: 10, md: 16, lg: 22 };

export function HudPanel({
  children,
  tone = 'white',
  pad = 'md',
  tilt = 0,
  shadow = 'plush-sm',
  className = '',
  style,
  as: As = 'div',
  ...rest
}) {
  const toneStyle = TONES[tone] ?? TONES.white;
  const padding = PAD[pad] ?? PAD.md;
  const shadowVar =
    shadow === 'plush'
      ? 'var(--plush)'
      : shadow === 'plush-tiny'
        ? 'var(--plush-tiny)'
        : 'var(--plush-sm)';

  return (
    <As
      className={`hud-panel ${className}`.trim()}
      style={{
        ...toneStyle,
        border: '3px solid var(--line)',
        borderRadius: 'var(--r-md)',
        boxShadow: shadowVar,
        padding,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
}

/**
 * Animated variant — pops in like Medkit's `popin` class but as a
 * framer-motion element so we can control mount/unmount transitions
 * from the parent.
 */
export function HudPanelMotion({ children, tone = 'white', pad = 'md', ...rest }) {
  return (
    <motion.div
      initial={{ scale: 0.6, rotate: -4, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
    >
      <HudPanel tone={tone} pad={pad} {...rest}>
        {children}
      </HudPanel>
    </motion.div>
  );
}
