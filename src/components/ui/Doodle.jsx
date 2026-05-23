const COLORS = {
  peach: '#FFB68A',
  butter: '#FFD86B',
  mint: '#A8E5C8',
  sky: '#A6D8FF',
  rose: '#FFB3C0',
};

export function Doodle({ kind, size = 40, color = 'butter', style }) {
  const fill = COLORS[color] ?? color;
  const stroke = '#2B1E16';
  switch (kind) {
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
          <path
            d="M50 8 L62 38 L94 42 L70 64 L78 96 L50 78 L22 96 L30 64 L6 42 L38 38 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'sparkle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
          <path
            d="M50 6 L58 42 L94 50 L58 58 L50 94 L42 58 L6 50 L42 42 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
          <path
            d="M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'shield':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
          <path
            d="M50 8 L86 22 V52 C86 72 70 86 50 92 C30 86 14 72 14 52 V22 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M36 50 L46 60 L66 40"
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'dot':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
          <circle cx="50" cy="50" r="38" fill={fill} stroke={stroke} strokeWidth="4" />
        </svg>
      );
    default:
      return null;
  }
}

export function DoodleScatter({ items = [] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((d, idx) => (
        <span
          key={idx}
          className={d.anim === 'floaty' ? 'absolute animate-floaty' : 'absolute'}
          style={{
            left: d.x,
            top: d.y,
            transform: d.rotate ? `rotate(${d.rotate}deg)` : undefined,
          }}
        >
          <Doodle kind={d.kind} size={d.size ?? 40} color={d.color ?? 'butter'} />
        </span>
      ))}
    </div>
  );
}
