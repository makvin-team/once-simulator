import { motion } from 'framer-motion';
import { PILLAR_ORDER } from '../../data/pillars.js';
import { useAppStore } from '../../state/useAppStore.js';
import { useT } from '../../i18n/index.js';
import { LanguageSwitcher } from '../../components/hud/LanguageSwitcher.jsx';
import { PillarCard } from './PillarCard.jsx';

/**
 * PHASE 3 DELIVERABLE — Role Selection page.
 *
 * Layout:
 *   ┌─ TopBar (wordmark + language switcher) ─┐
 *   │  Eyebrow / Title / Subtitle / Proctor-ready chip
 *   │  Doodle scatter (subtle decorative)
 *   │  4-pillar grid (cards above)
 *   │  Footnote (compliance badges)
 *   └─────────────────────────────────────────┘
 *
 * Picking a pillar drives the store to `view: 'modules'` which is rendered
 * by ModulesDashboardPage.
 */

export function RoleSelectionPage() {
  const t = useT();
  const pickPillar = useAppStore((s) => s.pickPillar);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="dots-bg"
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        background:
          'radial-gradient(900px 500px at 15% -10%, rgba(255,142,92,0.14), transparent 60%), radial-gradient(800px 500px at 100% 110%, rgba(95,207,160,0.14), transparent 60%), var(--cream)',
      }}
    >
      <TopBar />

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '32px 28px 80px',
        }}
      >
        <Header />

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 22,
          }}
        >
          {PILLAR_ORDER.map((pid, idx) => (
            <PillarCard
              key={pid}
              pillarId={pid}
              index={idx}
              onPick={pickPillar}
              isHighlighted={pid === 'aml'}
            />
          ))}
        </div>

        <Footnote />
      </div>
    </motion.div>
  );
}

function TopBar() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'rgba(255, 246, 230, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '3px solid var(--line)',
      }}
    >
      <Wordmark />
      <LanguageSwitcher />
    </div>
  );
}

function Wordmark() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        fontWeight: 900,
        fontSize: 22,
        color: 'var(--ink)',
        letterSpacing: '-0.02em',
      }}
    >
      <span>once</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: 'var(--ink-soft)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        · AI Mentor
      </span>
    </div>
  );
}

function Header() {
  const t = useT();
  return (
    <div style={{ position: 'relative' }}>
      <DecorativeDoodles />
      <div style={{ position: 'relative', maxWidth: 760 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: 'var(--butter)',
            padding: '6px 14px',
            borderRadius: 999,
            border: '2.5px solid var(--line)',
            boxShadow: 'var(--plush-tiny)',
          }}
        >
          {t.roleSelection.eyebrow}
        </span>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginTop: 14,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
          }}
        >
          {t.roleSelection.title}
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--ink-2)',
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          {t.roleSelection.subtitle}
        </p>

        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <ProctorChip label={t.roleSelection.proctorReady} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--ink-soft)',
            }}
          >
            {t.roleSelection.pickRole}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProctorChip({ label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'white',
        border: '3px solid var(--line)',
        borderRadius: 999,
        padding: '6px 14px',
        boxShadow: 'var(--plush-tiny)',
        fontSize: 12,
        fontWeight: 800,
        color: 'var(--ink)',
      }}
    >
      <motion.span
        aria-hidden
        animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: 'var(--mint-deep)',
          display: 'inline-block',
        }}
      />
      {label}
    </span>
  );
}

function DecorativeDoodles() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Doodle x="2%" y={10} rot={-12}>
        <svg width="36" height="36" viewBox="0 0 100 100">
          <path d="M50 8 L62 38 L92 42 L70 62 L76 92 L50 76 L24 92 L30 62 L8 42 L38 38 Z"
                fill="#FFD86B" stroke="#2B1E16" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </Doodle>
      <Doodle x="88%" y={4} rot={10}>
        <svg width="32" height="32" viewBox="0 0 100 100">
          <path d="M50 6 L56 44 L94 50 L56 56 L50 94 L44 56 L6 50 L44 44 Z"
                fill="#A6D8FF" stroke="#2B1E16" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      </Doodle>
      <Doodle x="50%" y={84} rot={-8}>
        <svg width="28" height="28" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#A8E5C8" stroke="#2B1E16" strokeWidth="4" />
        </svg>
      </Doodle>
    </div>
  );
}

function Doodle({ x, y, rot = 0, children }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rot}deg)`,
      }}
    >
      {children}
    </motion.div>
  );
}

function Footnote() {
  const t = useT();
  return (
    <div
      style={{
        marginTop: 56,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}>
        
      {['4 pillars · 20 modules'].map(
        (label) => (
          <span
            key={label}
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--ink)',
              background: 'white',
              border: '2.5px solid var(--line)',
              borderRadius: 999,
              padding: '5px 12px',
              boxShadow: 'var(--plush-tiny)',
            }}
          >
            {label}
          </span>
        ),
      )}
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)' }}>
        {t.app.name}
      </span>
    </div>
  );
}
