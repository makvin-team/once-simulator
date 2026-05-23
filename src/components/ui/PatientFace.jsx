const SKIN_DEFAULT = '#FFD8B5';
const HAIR_DEFAULT = '#3B2A1F';
const STROKE = '#2B1E16';

const MOUTHS = {
  neutral: 'M 80 132 Q 100 142 120 132',
  happy: 'M 78 128 Q 100 150 122 128',
  sad: 'M 78 138 Q 100 124 122 138',
  worried: 'M 82 134 Q 100 130 118 134',
  thinking: 'M 80 134 Q 90 128 100 134 T 120 134',
};

export function PatientFace({
  size = 96,
  skin = SKIN_DEFAULT,
  hair = HAIR_DEFAULT,
  mood = 'neutral',
  accessory,
  className = '',
}) {
  const mouthD = MOUTHS[mood] ?? MOUTHS.neutral;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <ellipse cx="100" cy="86" rx="74" ry="78" fill={hair} />
      <circle
        cx="100"
        cy="104"
        r="62"
        fill={skin}
        stroke={STROKE}
        strokeWidth="4"
      />
      <path
        d="M 42 78 Q 60 38 100 40 Q 140 38 158 78 Q 130 60 100 64 Q 70 60 42 78 Z"
        fill={hair}
      />
      <ellipse cx="74" cy="118" rx="9" ry="6" fill="#FF9DAA" opacity="0.7" />
      <ellipse cx="126" cy="118" rx="9" ry="6" fill="#FF9DAA" opacity="0.7" />
      <g
        className="blink-eye"
        style={{ transformOrigin: '100px 105px' }}
      >
        <circle cx="82" cy="105" r="5" fill={STROKE} />
        <circle cx="118" cy="105" r="5" fill={STROKE} />
      </g>
      <path
        d={mouthD}
        stroke={STROKE}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {accessory === 'badge' && (
        <g transform="translate(140 150) rotate(-12)">
          <rect
            x="-20"
            y="-10"
            width="40"
            height="20"
            rx="6"
            fill="#FFD86B"
            stroke={STROKE}
            strokeWidth="3"
          />
          <circle cx="-8" cy="0" r="2" fill={STROKE} />
          <circle cx="0" cy="0" r="2" fill={STROKE} />
          <circle cx="8" cy="0" r="2" fill={STROKE} />
        </g>
      )}
    </svg>
  );
}

export function MentorFace({ size = 96, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <rect
        x="20"
        y="50"
        width="160"
        height="140"
        rx="28"
        fill="#FFFAF0"
        stroke={STROKE}
        strokeWidth="4"
      />
      <rect
        x="70"
        y="22"
        width="60"
        height="32"
        rx="14"
        fill="#5FCFA0"
        stroke={STROKE}
        strokeWidth="4"
      />
      <circle cx="84" cy="16" r="6" fill="#FFD86B" stroke={STROKE} strokeWidth="3" />
      <circle cx="116" cy="16" r="6" fill="#FFB68A" stroke={STROKE} strokeWidth="3" />
      <circle cx="76" cy="110" r="14" fill="#A6D8FF" stroke={STROKE} strokeWidth="3" />
      <circle cx="124" cy="110" r="14" fill="#A6D8FF" stroke={STROKE} strokeWidth="3" />
      <g
        className="blink-eye"
        style={{ transformOrigin: '100px 110px' }}
      >
        <circle cx="76" cy="110" r="5" fill={STROKE} />
        <circle cx="124" cy="110" r="5" fill={STROKE} />
      </g>
      <path
        d="M 60 92 L 88 88"
        stroke={STROKE}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 140 92 L 112 88"
        stroke={STROKE}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 78 150 Q 100 168 122 150"
        stroke={STROKE}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="86"
        y="178"
        width="28"
        height="8"
        rx="4"
        fill="#5FCFA0"
        stroke={STROKE}
        strokeWidth="3"
      />
    </svg>
  );
}
