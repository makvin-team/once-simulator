import { motion, AnimatePresence } from 'framer-motion';
import { HudPanel } from './HudPanel.jsx';
import { RiskIndicatorStrip } from './RiskIndicatorStrip.jsx';
import { ActionButton } from './ActionButton.jsx';
import { useT } from '../../i18n/index.js';

/**
 * The "inspect" overlay — opens when the user clicks the notification CTA.
 *
 * Mirrors Medkit's ExamineOverlay: a centered modal with a backdrop blur,
 * a tagged header strip, a "vitals" row (RiskIndicatorStrip), a timeline,
 * and the decision buttons at the bottom. Backdrop click closes it.
 *
 * The decision buttons are the **action buttons** that Medkit uses for quick
 * interactions (Approve/Reject/Escalate). Each carries a `tone`, optional
 * `isPrimary` flag (gets the breathe animation), and an i18n action+hint.
 */

export function TransactionDetailsPanel({ node, visible, onClose, onChoose }) {
  const t = useT();
  if (!node) return null;

  const clientName = readPath(t, node.clientNameI18n);
  const clientMeta = readPath(t, node.clientMetaI18n);
  const txTag = readPath(t, node.txTagI18n);
  const yourTask = readPath(t, node.yourTaskI18n);
  const taskHint = readPath(t, node.taskHintI18n);
  const timeline = readPath(t, node.timelineI18n) ?? [];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(43, 30, 22, 0.42)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 45,
            padding: 24,
          }}
        >
          <motion.div
            initial={{ scale: 0.85, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ width: 'min(720px, 100%)' }}
          >
            <HudPanel tone="paper" pad="lg" shadow="plush">
              {/* HEAD */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 900,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      background: 'var(--butter)',
                      padding: '4px 10px',
                      borderRadius: 999,
                      border: '2.5px solid var(--line)',
                      boxShadow: 'var(--plush-tiny)',
                    }}
                  >
                    {txTag ?? 'CRM'}
                  </span>
                  <div>
                    <div
                      style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.1 }}
                    >
                      {clientName}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--ink-2)',
                        marginTop: 2,
                      }}
                    >
                      {clientMeta}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-plush ghost"
                  style={{ fontSize: 12, padding: '8px 14px' }}
                  aria-label={t.nav.exit}
                >
                  ✕
                </button>
              </div>

              {/* INDICATORS */}
              <RiskIndicatorStrip indicators={node.indicators ?? []} />

              {/* TIMELINE */}
              {Array.isArray(timeline) && timeline.length > 0 && (
                <div
                  style={{
                    marginTop: 14,
                    background: 'var(--cream-2)',
                    border: '2.5px solid var(--line)',
                    borderRadius: 14,
                    padding: 12,
                    boxShadow: 'var(--plush-tiny)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--ink-soft)',
                      marginBottom: 8,
                    }}
                  >
                    timeline
                  </div>
                  <ol
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    {timeline.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '52px 1fr',
                          gap: 10,
                          fontSize: 12,
                          fontWeight: 700,
                          color: 'var(--ink)',
                        }}
                      >
                        <span style={{ color: 'var(--ink-soft)', fontVariantNumeric: 'tabular-nums' }}>
                          {item.time}
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* TASK + ACTIONS */}
              <div
                style={{
                  marginTop: 16,
                  padding: 12,
                  background: 'var(--cream)',
                  border: '2.5px dashed rgba(43,30,22,0.25)',
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-soft)',
                  }}
                >
                  {yourTask}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--ink-2)',
                    marginTop: 2,
                  }}
                >
                  {taskHint}
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 10,
                }}
              >
                {(node.choices ?? []).map((choice) => (
                  <ActionButton
                    key={choice.id}
                    tone={choice.tone}
                    isPrimary={choice.isPrimary}
                    label={readPath(t, choice.actionI18n) ?? choice.id}
                    hint={readPath(t, choice.hintI18n)}
                    onClick={() => onChoose?.(choice)}
                  />
                ))}
              </div>
            </HudPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}
