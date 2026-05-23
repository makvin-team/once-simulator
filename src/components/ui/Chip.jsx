const TONES = {
  white: 'bg-white',
  paper: 'bg-paper',
  cream: 'bg-cream',
  mint: 'bg-mint',
  peach: 'bg-peach',
  butter: 'bg-butter',
  sky: 'bg-sky',
  rose: 'bg-rose',
};

const SIZES = {
  sm: 'h-5 px-2 text-[10px]',
  md: 'h-6 px-2.5 text-[11px]',
  lg: 'h-7 px-3 text-xs',
};

export function Chip({
  tone = 'white',
  size = 'md',
  className = '',
  dot = false,
  uppercase = true,
  children,
  ...rest
}) {
  const t = TONES[tone] ?? TONES.white;
  const s = SIZES[size] ?? SIZES.md;
  const caseCls = uppercase ? 'uppercase tracking-[0.04em]' : '';
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border-[2.5px] border-line font-extrabold text-ink shadow-plush-tiny ${t} ${s} ${caseCls} ${className}`}
      {...rest}
    >
      {dot && (
        <span className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-line" />
      )}
      {children}
    </span>
  );
}
