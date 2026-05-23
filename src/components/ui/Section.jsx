export function SectionHeader({ eyebrow, title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-ink-soft">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="mt-1 text-2xl font-extrabold leading-tight text-ink">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-1 text-sm font-semibold text-ink-2">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-none">{action}</div>}
    </div>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`text-[11px] font-extrabold uppercase tracking-[0.08em] text-ink-soft ${className}`}
    >
      {children}
    </div>
  );
}
