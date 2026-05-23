const TONES = {
  paper: 'bg-paper',
  cream: 'bg-cream',
  mint: 'bg-mint',
  peach: 'bg-peach',
  butter: 'bg-butter',
  sky: 'bg-sky',
  rose: 'bg-rose',
};

export function Stat({ label, value, tone = 'paper', className = '' }) {
  const t = TONES[tone] ?? TONES.paper;
  return (
    <div
      className={`rounded-sm border-[2.5px] border-line px-3 py-2.5 text-center shadow-plush-tiny ${t} ${className}`}
    >
      <div className="text-lg font-black leading-tight text-ink">{value}</div>
      <div className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.06em] text-ink-2">
        {label}
      </div>
    </div>
  );
}
