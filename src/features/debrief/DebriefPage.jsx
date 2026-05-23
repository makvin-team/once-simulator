import { motion } from 'framer-motion';
import { useAppStore } from '../../state/useAppStore.js';
import { scenarios } from '../../data/scenarios/index.js';
import { useT } from '../../i18n/index.js';
import { LanguageSwitcher } from '../../components/hud/LanguageSwitcher.jsx';

/**
 * Debrief screen — shown when the scenario hits an `end` node. Surfaces:
 *   - Score ring (correct/partial/fail tinted)
 *   - Proctor's feedback (the i18n string keyed on the end-node's `result`)
 *   - 5 takeaway tips
 *   - Retry / Pick another module CTAs
 */

export function DebriefPage() {
  const t = useT();
  const scenarioId = useAppStore((s) => s.scenarioId);
  const currentNodeId = useAppStore((s) => s.currentNodeId);
  const score = useAppStore((s) => s.score);
  const maxScore = useAppStore((s) => s.maxScore);
  const retry = useAppStore((s) => s.retry);
  const exitToRoleSelection = useAppStore((s) => s.exitToRoleSelection);

  const scenario = scenarios[scenarioId];
  const endNode = scenario?.nodes?.[currentNodeId];
  const debriefCopy = readPath(t, scenario?.debriefI18n) ?? {};

  const ratio = maxScore > 0 ? score / maxScore : 0;
  const result = endNode?.result ?? (ratio >= 0.85 ? 'pass' : ratio >= 0.5 ? 'partial' : 'fail');
  const tone =
    result === 'pass' ? 'var(--mint)' :
    result === 'partial' ? 'var(--butter)' :
    'var(--rose)';
  const deepTone =
    result === 'pass' ? 'var(--mint-deep)' :
    result === 'partial' ? 'var(--butter-deep)' :
    'var(--rose-deep)';

  const feedback = endNode?.feedbackI18n ? readPath(t, endNode.feedbackI18n) : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        background: 'var(--cream)',
      }}
    >
      <TopBar onExit={exitToRoleSelection} />

      <div
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '32px 24px 80px',
        }}
      >
        <motion.div
          initial={{ scale: 0.85, y: 12, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            background: 'white',
            border: '4px solid var(--line)',
            borderRadius: 'var(--r-lg)',
            padding: 26,
            boxShadow: 'var(--plush)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <ScoreRing ratio={ratio} tone={deepTone} score={score} maxScore={maxScore} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: tone,
                  color: 'var(--ink)',
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: '2.5px solid var(--line)',
                  boxShadow: 'var(--plush-tiny)',
                }}
              >
                {debriefCopy.score ?? 'Score'} · {Math.round(ratio * 100)}%
              </span>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  marginTop: 8,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {debriefCopy.title ?? 'Debrief'}
              </h1>
              {feedback && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 14,
                    background: 'var(--cream-2)',
                    border: '2.5px solid var(--line)',
                    borderRadius: 14,
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                  }}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>

          {Array.isArray(debriefCopy.tips) && debriefCopy.tips.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-soft)',
                  marginBottom: 8,
                }}
              >
                {debriefCopy.tipsTitle ?? 'Tips'}
              </div>
              <ol
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {debriefCopy.tips.map((tip, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '32px 1fr',
                      gap: 12,
                      alignItems: 'flex-start',
                      background: 'var(--paper)',
                      border: '2.5px solid var(--line)',
                      borderRadius: 14,
                      padding: '10px 14px',
                      boxShadow: 'var(--plush-tiny)',
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: tone,
                        border: '2.5px solid var(--line)',
                        color: 'var(--ink)',
                        fontWeight: 900,
                        fontSize: 13,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              className="btn-plush primary"
              onClick={retry}
              style={{ fontSize: 14 }}
            >
              {t.nav.retry}
            </button>
            <button
              type="button"
              className="btn-plush ghost"
              onClick={exitToRoleSelection}
              style={{ fontSize: 14 }}
            >
              {t.nav.finish}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ScoreRing({ ratio, tone, score, maxScore }) {
  const size = 92;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * ratio;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="white"
          stroke="var(--line)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--cream-2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={c / 4}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ink)',
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 22, lineHeight: 1 }}>
          {score}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-2)' }}>
          / {maxScore || 10}
        </div>
      </div>
    </div>
  );
}

function TopBar({ onExit }) {
  const t = useT();
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
        background: 'rgba(255, 246, 230, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '3px solid var(--line)',
      }}
    >
      <button
        type="button"
        onClick={onExit}
        className="btn-plush ghost"
        style={{ fontSize: 13, padding: '8px 16px' }}
      >
        ← {t.nav.finish}
      </button>
      <LanguageSwitcher />
    </div>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}
