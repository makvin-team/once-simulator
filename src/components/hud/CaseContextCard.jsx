import { motion } from 'framer-motion';
import { useT } from '../../i18n/index.js';

/**
 * Center-stage card that frames a scenario with realistic context BEFORE
 * the indicators panel. This is the "Context-First Storytelling" pillar
 * from the UX brief — every scenario shows specific named facts (account
 * numbers, policy codes, timestamps, verbatim quotes) so the trainee
 * builds a mental model of the actual situation instead of answering an
 * abstract definition.
 *
 * Inputs come from the scenario's `context` node:
 *   contextI18n:      multi-sentence story
 *   whatYouSeeI18n:   key the i18n bundle returns as an array of bullets
 *   whatYouHearI18n:  same shape — verbatim client quotes
 *   beginI18n:        CTA label
 *   onBegin:          handler that advances to the inspect node
 *
 * The 3D scene stays visible behind the card; the card has a soft
 * semi-opaque backdrop so the room context isn't lost.
 */
export function CaseContextCard({
  contextText,
  whatYouSee,
  whatYouHear,
  beginLabel,
  caseTagLabel,
  onBegin,
}) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 246, 230, 0.62)',
        backdropFilter: 'blur(2px)',
        padding: '24px',
        zIndex: 28,
      }}
    >
      <motion.div
        initial={{ scale: 0.92, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        style={{
          width: 'min(720px, 100%)',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          background: 'white',
          border: '3px solid var(--line)',
          borderRadius: 'var(--r-md)',
          boxShadow: 'var(--plush)',
          padding: 24,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: 'var(--peach)',
            border: '2px solid var(--line)',
            padding: '3px 9px',
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          {caseTagLabel ?? t.caseContext?.tag ?? 'Case'}
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.55,
            color: 'var(--ink)',
            whiteSpace: 'pre-line',
          }}
        >
          {contextText}
        </p>

        {Array.isArray(whatYouSee) && whatYouSee.length > 0 && (
          <Section
            title={t.caseContext?.whatYouSee ?? 'What you see'}
            tone="var(--butter)"
            items={whatYouSee}
          />
        )}

        {Array.isArray(whatYouHear) && whatYouHear.length > 0 && (
          <Section
            title={t.caseContext?.whatYouHear ?? 'What you hear'}
            tone="var(--sky)"
            items={whatYouHear}
            italic
          />
        )}

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onBegin}
            className="btn-plush"
            style={{ fontSize: 14, padding: '10px 22px' }}
          >
            {beginLabel ?? t.caseContext?.begin ?? 'Begin analysis'} →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ title, tone, items, italic = false }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          background: tone,
          border: '2px solid var(--line)',
          padding: '2px 8px',
          borderRadius: 999,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 13.5,
              lineHeight: 1.5,
              color: 'var(--ink)',
              fontStyle: italic ? 'italic' : 'normal',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
