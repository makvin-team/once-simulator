import { motion, AnimatePresence } from 'framer-motion';
import { HudPanel } from './HudPanel.jsx';
import { RiskIndicatorStrip } from './RiskIndicatorStrip.jsx';
import { ActionButton } from './ActionButton.jsx';
import { useT } from '../../i18n/index.js';

/**
 * Inspect-node panel. Anchored to the right so the 3D office (and the
 * client) remain visible on the left. The panel intentionally has no
 * close affordance — the only way out is choosing an action, which
 * advances the scenario. Closing it without a decision would strand the
 * player on a node with no UI.
 */

export function TransactionDetailsPanel({ node, visible, onChoose }) {
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
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 32, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          style={{
            position: 'absolute',
            top: 72,
            right: 16,
            bottom: 96,
            width: 'min(560px, calc(100vw - 32px))',
            zIndex: 45,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{ width: '100%' }}
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
                      style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.1 }}
                    >
                      {clientName}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--ink-2)',
                        marginTop: 3,
                      }}
                    >
                      {clientMeta}
                    </div>
                  </div>
                </div>
              </div>

              {/* INDICATORS */}
              <RiskIndicatorStrip
                indicators={node.indicators ?? []}
                i18nRoot={node.i18nRoot}
              />

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
                    {t.amlScenario?.txPanel?.timelineLabel ?? 'Timeline'}
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
                          gridTemplateColumns: '60px 1fr',
                          gap: 12,
                          fontSize: 13,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          lineHeight: 1.45,
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
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--ink-2)',
                    marginTop: 4,
                    lineHeight: 1.45,
                  }}
                >
                  {taskHint}
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {(node.choices ?? []).map((choice) => (
                  // Deliberately NOT forwarding choice.tone / choice.isPrimary
                  // — the scenario data still carries them for legacy reasons,
                  // but visual encoding of "correct" answers turns the
                  // training tool into a stoplight quiz. See the design note
                  // at the top of ActionButton.jsx.
                  <ActionButton
                    key={choice.id}
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
