const TONES = {
  paper: 'bg-paper',
  cream: 'bg-cream',
  cream2: 'bg-cream-2',
  white: 'bg-white',
  mint: 'bg-mint',
  peach: 'bg-peach',
  butter: 'bg-butter',
  sky: 'bg-sky',
  rose: 'bg-rose',
};

const SHADOWS = {
  flat: '',
  tiny: 'shadow-plush-tiny',
  sm: 'shadow-plush-sm',
  full: 'shadow-plush',
};

const RADII = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  pill: 'rounded-pill',
};

const STROKES = {
  thin: 'border-[2.5px]',
  thick: 'border-[3px]',
  bold: 'border-[4px]',
};

const PADS = {
  none: '',
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

const ANIMS = {
  floaty: 'animate-floaty',
  wobble: 'animate-wobble',
  breathe: 'animate-breathe',
};

export function Card({
  tone = 'paper',
  shadow = 'tiny',
  radius = 'md',
  stroke = 'thick',
  pad = 'md',
  tilt = 0,
  anim,
  as: As = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const t = TONES[tone] ?? TONES.paper;
  const sh = SHADOWS[shadow] ?? SHADOWS.tiny;
  const r = RADII[radius] ?? RADII.md;
  const st = STROKES[stroke] ?? STROKES.thick;
  const p = PADS[pad] ?? PADS.md;
  const animCls = anim ? ANIMS[anim] ?? '' : '';
  const tiltStyle = tilt ? { transform: `rotate(${tilt}deg)` } : null;

  return (
    <As
      className={`border-line ${t} ${sh} ${r} ${st} ${p} ${animCls} ${className}`}
      style={{ ...tiltStyle, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}
