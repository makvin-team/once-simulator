import { motion } from 'framer-motion';
import { PILLARS } from '../../data/pillars.js';
import { useT } from '../../i18n/index.js';

/**
 * One pillar tile on the Role Selection page. Hover lifts the card and
 * brings forward a peach holo-ring around the pillar's icon — picking up
 * Medkit's `floaty` + `tap` interactions in a single composite tile.
 */

const PILLAR_GLYPH = {
  aml: AmlGlyph,
  cyber: CyberGlyph,
  fraud: FraudGlyph,
  cx: CxGlyph,
};

const TONE_BG = {
  peach: 'var(--peach)',
  sky: 'var(--sky)',
  butter: 'var(--butter)',
  mint: 'var(--mint)',
};

export function PillarCard({ pillarId, index, onPick, isHighlighted = false }) {
  const t = useT();
  const pillar = PILLARS[pillarId];
  const copy = t.pillars[pillarId] ?? {};
  const Glyph = PILLAR_GLYPH[pillarId] ?? AmlGlyph;
  const tone = TONE_BG[pillar.tone] ?? TONE_BG.peach;
  const tiltDirections = [-0.6, 0.5, -0.4, 0.7];
  const tilt = tiltDirections[index % tiltDirections.length];

  return (
    <motion.button
      type="button"
      onClick={() => onPick(pillarId)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, type: 'spring', stiffness: 220, damping: 22 }}
      whileHover={{ y: -6, rotate: 0 }}
      whileTap={{ y: 2, scale: 0.99 }}
      style={{
        position: 'relative',
        textAlign: 'left',
        background: 'white',
        border: '4px solid var(--line)',
        borderRadius: 'var(--r-lg)',
        padding: 22,
        boxShadow: isHighlighted
          ? '0 10px 0 var(--line), 0 20px 36px rgba(43,30,22,0.22)'
          : 'var(--plush)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transform: `rotate(${tilt}deg)`,
        overflow: 'hidden',
      }}
      aria-label={copy.title}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 90% -10%, rgba(255,142,92,0.10), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 64,
            height: 64,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            aria-hidden
            initial={{ scale: 1, opacity: 0.45 }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,142,92,0.4) 0%, rgba(255,142,92,0) 70%)',
            }}
          />
          <span
            style={{
              position: 'relative',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: tone,
              border: '3px solid var(--line)',
              boxShadow: 'var(--plush-tiny)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph />
          </span>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'var(--cream-2)',
            color: 'var(--ink)',
            padding: '4px 10px',
            borderRadius: 999,
            border: '2.5px solid var(--line)',
            boxShadow: 'var(--plush-tiny)',
            whiteSpace: 'nowrap',
          }}
        >
          {copy.shortLabel}
        </span>
      </div>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: 'var(--ink)',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {copy.title}
      </h3>
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: 'var(--peach-deep)',
          marginTop: 4,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {copy.tagline}
      </div>

      <p
        style={{
          marginTop: 12,
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--ink-2)',
          lineHeight: 1.45,
        }}
      >
        {copy.summary}
      </p>

      <div
        style={{
          marginTop: 14,
          background: 'var(--cream-2)',
          border: '2.5px dashed rgba(43,30,22,0.25)',
          borderRadius: 12,
          padding: '10px 12px',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--ink-2)',
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
            marginBottom: 4,
          }}
        >
          {copy.focus}
        </div>
        {copy.jobRoles}
      </div>

      <div
        style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 800,
            color: 'var(--ink)',
            background: 'var(--cream)',
            border: '2.5px solid var(--line)',
            borderRadius: 999,
            padding: '5px 12px',
            boxShadow: 'var(--plush-tiny)',
          }}
        >
          {pillar.modules.length} mod · {pillar.sessionMinutes}m
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 900,
            color: 'var(--ink)',
            background: 'var(--peach)',
            border: '3px solid var(--line)',
            borderRadius: 999,
            padding: '8px 14px',
            boxShadow: '0 4px 0 var(--line)',
          }}
        >
          {t.nav.start} →
        </span>
      </div>
    </motion.button>
  );
}

function AmlGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path d="M12 3l9 4v6c0 5-3.5 7.5-9 8-5.5-.5-9-3-9-8V7l9-4z"
            fill="none" stroke="#2B1E16" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="#2B1E16" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CyberGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <rect x="4" y="10" width="16" height="11" rx="2"
            fill="none" stroke="#2B1E16" strokeWidth="2.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#2B1E16" strokeWidth="2.5" fill="none" />
      <circle cx="12" cy="15" r="1.6" fill="#2B1E16" />
      <path d="M12 16.5v2" stroke="#2B1E16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FraudGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <path d="M3 17l4-4 4 3 5-7 5 5" stroke="#2B1E16" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="7" cy="13" r="1.5" fill="#2B1E16" />
      <circle cx="11" cy="16" r="1.5" fill="#2B1E16" />
      <circle cx="16" cy="9" r="1.5" fill="#2B1E16" />
      <circle cx="21" cy="14" r="1.5" fill="#2B1E16" />
    </svg>
  );
}

function CxGlyph() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden>
      <circle cx="12" cy="9" r="4" stroke="#2B1E16" strokeWidth="2.5" fill="none" />
      <path d="M4 20c1.6-4 5-5 8-5s6.4 1 8 5" stroke="#2B1E16" strokeWidth="2.5"
            strokeLinecap="round" fill="none" />
    </svg>
  );
}
