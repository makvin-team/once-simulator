import { useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../state/useAppStore.js';
import { scenarios } from '../../data/scenarios/index.js';
import { useT } from '../../i18n/index.js';
import { SceneCanvas } from '../../components/SceneCanvas.jsx';
import { ProctorPanel } from '../../components/hud/ProctorPanel.jsx';
import { ClientHologramCard } from '../../components/hud/ClientHologramCard.jsx';
import { NotificationToast } from '../../components/hud/NotificationToast.jsx';
import { TransactionDetailsPanel } from '../../components/hud/TransactionDetailsPanel.jsx';
import { MicPulse } from '../../components/hud/MicPulse.jsx';
import { LanguageSwitcher } from '../../components/hud/LanguageSwitcher.jsx';

/**
 * PHASE 3 DELIVERABLE — the AML "Suspicious Transaction" 3D scenario view.
 *
 * Composition:
 *   1. <SceneCanvas> — existing high-fidelity Three.js office (kept as-is)
 *   2. <ProctorPanel> — top-right Medkit-style status + latest instruction
 *   3. <ClientHologramCard> — bottom-left 2D portrait of the client at the desk
 *   4. <NotificationToast> — the KEY popup (slides in on `alert` node)
 *   5. <TransactionDetailsPanel> — full-screen modal on `inspect` node
 *   6. <MicPulse> — bottom-center simulated mic
 *
 * Node flow is driven by `useAppStore`. The scenario data file
 * (`amlSuspiciousTransaction.js`) carries i18n keys for all copy so a
 * language switch updates the panels live without remounting the scene.
 */

export function AmlSimulationView() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const scenarioId = useAppStore((s) => s.scenarioId);
  const currentNodeId = useAppStore((s) => s.currentNodeId);
  const notificationVisible = useAppStore((s) => s.notificationVisible);
  const inspectorOpen = useAppStore((s) => s.inspectorOpen);
  const micActive = useAppStore((s) => s.micActive);
  const advance = useAppStore((s) => s.advance);
  const advanceTo = useAppStore((s) => s.advanceTo);
  const reopenInspector = useAppStore((s) => s.reopenInspector);
  const pickChoice = useAppStore((s) => s.pickChoice);
  const setMicActive = useAppStore((s) => s.setMicActive);
  const exitToRoleSelection = useAppStore((s) => s.exitToRoleSelection);

  const scenario = scenarios[scenarioId];
  const node = scenario?.nodes?.[currentNodeId];

  // Intro node auto-advances to the notification after a short pause
  // so the player sees the empty bank office before the alert pops.
  useEffect(() => {
    if (!node || node.kind !== 'proctor' || !node.autoAdvance) return undefined;
    const id = window.setTimeout(
      () => advance(node.autoAdvance.toNodeId),
      node.autoAdvance.afterMs,
    );
    return () => window.clearTimeout(id);
  }, [node, advance]);

  // The proctor's spoken subtitle — different per node.
  const proctorSubtitle = useMemo(() => {
    if (!node) return '';
    if (node.kind === 'proctor') {
      return readPath(t, node.textI18n) ?? '';
    }
    if (node.kind === 'notification') {
      return readPath(t, 'amlScenario.proctorMicInstruction') ?? '';
    }
    if (node.kind === 'inspect') {
      return readPath(t, 'amlScenario.proctorMicInstruction') ?? '';
    }
    return '';
  }, [node, t]);

  const proctorStatus = micActive
    ? 'listening'
    : node?.kind === 'proctor'
      ? 'speaking'
      : 'ready';

  /**
   * Hotspot click on the 3D computer.
   *   - notification node: behave like the toast CTA, advance to the
   *     node it links to (typically the inspect node).
   *   - inspect node with the panel closed (shouldn't happen in the new
   *     flow but kept as a safety net): reopen the panel.
   *   - any other node: no-op.
   */
  const handleHotspotSelect = useCallback(
    (key) => {
      if (key !== 'computer') return;
      if (node?.kind === 'notification') {
        const next = node.choices?.[0]?.nextNodeId;
        if (next) advanceTo(next);
        return;
      }
      if (node?.kind === 'inspect' && !inspectorOpen) {
        reopenInspector();
      }
    },
    [node, inspectorOpen, advanceTo, reopenInspector],
  );

  /**
   * Notification CTA. Advances `currentNodeId` to the link target on the
   * alert node's first choice (typically the inspect node). This is the
   * fix for the "missing options" bug — the previous code only flipped a
   * boolean and left the node graph behind.
   */
  const handleNotificationCta = useCallback(() => {
    if (node?.kind !== 'notification') return;
    const next = node.choices?.[0]?.nextNodeId;
    if (next) advanceTo(next);
  }, [node, advanceTo]);

  /**
   * Screen-content resolver. Depends on `locale` so a language switch
   * recomputes the payload and the canvas texture redraws with the
   * translated copy. Locale-aware string lookups are done lazily on
   * the underlying `screen` object (string i18n paths are resolved here).
   */
  const screenContent = useMemo(() => {
    const raw = node?.screen ?? scenario?.defaultScreen ?? { type: 'idle' };
    return resolveScreenContent(raw, t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, scenario, locale]);

  if (!scenario || !node) {
    return (
      <div style={{ padding: 32 }}>
        <button
          type="button"
          className="btn-plush ghost"
          onClick={exitToRoleSelection}
        >
          ← {t.nav.back}
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <SceneCanvas
        activeHotspot={node?.kind === 'notification' ? 'computer' : null}
        onHotspotSelect={handleHotspotSelect}
        speaker={null}
        screenContent={screenContent}
        clientMood="neutral"
        cameraView="overview"
        hideHotspots={inspectorOpen}
      />

      <TopBar
        title={readPath(t, scenario.scenarioTitleI18n) ?? scenario.id}
        subtitle={readPath(t, scenario.scenarioSubtitleI18n) ?? ''}
        pillarLabel={
          readPath(t, `pillars.${scenario.pillarId}.shortLabel`) ?? scenario.pillarId
        }
        pillarTone={resolvePillarTone(scenario.pillarId)}
        onExit={exitToRoleSelection}
      />

      {!inspectorOpen && (
        <ProctorPanel status={proctorStatus} subtitle={proctorSubtitle} />
      )}

      <ClientHologramCard
        nameI18n="amlScenario.txPanel.client"
        metaI18n="amlScenario.txPanel.clientMeta"
        position="bottom-left"
      />

      <NotificationToast
        visible={notificationVisible && !inspectorOpen && node.kind === 'notification'}
        tagI18nKey={node.tagI18n}
        titleI18nKey={node.titleI18n}
        subtitleI18nKey={node.subtitleI18n}
        metaI18nKey={node.metaI18n}
        ctaI18nKey={node.ctaI18n}
        severity={node.severity}
        onCta={handleNotificationCta}
      />

      <TransactionDetailsPanel
        node={node.kind === 'inspect' ? node : null}
        visible={inspectorOpen && node.kind === 'inspect'}
        onChoose={pickChoice}
      />

      {/* Bottom-center mic */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 32,
          background: 'white',
          border: '3px solid var(--line)',
          borderRadius: 999,
          padding: '8px 18px',
          boxShadow: 'var(--plush-sm)',
        }}
      >
        <MicPulse
          status={micActive ? 'listening' : 'idle'}
          onClick={() => setMicActive(!micActive)}
        />
      </div>
    </motion.div>
  );
}

function resolvePillarTone(pillarId) {
  switch (pillarId) {
    case 'aml':
      return 'var(--peach)';
    case 'cyber':
      return 'var(--sky)';
    case 'fraud':
      return 'var(--butter)';
    case 'cx':
      return 'var(--mint)';
    default:
      return 'var(--peach)';
  }
}

function TopBar({ title, subtitle, pillarLabel, pillarTone, onExit }) {
  const t = useT();
  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        right: 340,
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <button
        type="button"
        className="btn-plush ghost"
        onClick={onExit}
        style={{ fontSize: 12, padding: '8px 14px' }}
      >
        ← {t.nav.back}
      </button>
      <div
        style={{
          background: 'white',
          border: '3px solid var(--line)',
          borderRadius: 999,
          padding: '8px 16px',
          boxShadow: 'var(--plush-tiny)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          maxWidth: 'calc(100vw - 700px)',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            background: pillarTone,
            padding: '2px 8px',
            borderRadius: 999,
            border: '2px solid var(--line)',
          }}
        >
          {pillarLabel}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 900,
              color: 'var(--ink)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--ink-2)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            · {subtitle}
          </span>
        </div>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <LanguageSwitcher tone="white" />
      </div>
    </div>
  );
}

function readPath(obj, path) {
  if (!path) return null;
  return path
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/**
 * Walk a `screen` payload from the scenario and resolve any i18n key
 * references to their live translations. Recognised key suffixes are
 * `I18n` (e.g. `titleI18n`, `clientI18n`); the resolved value is placed
 * under the de-suffixed key. Arrays are mapped element-by-element so a
 * card or item list can be authored entirely from translations.
 *
 * Plain (non-key-suffixed) properties are passed through untouched.
 * This means existing scenarios can opt in to i18n field-by-field
 * without a wholesale rewrite.
 */
function resolveScreenContent(raw, t) {
  if (!raw || typeof raw !== 'object') return raw;
  const out = { type: raw.type };
  for (const [key, value] of Object.entries(raw)) {
    if (key === 'type') continue;
    if (key.endsWith('I18n') && typeof value === 'string') {
      const targetKey = key.slice(0, -4);
      out[targetKey] = readPath(t, value) ?? value;
      continue;
    }
    if (Array.isArray(value)) {
      out[key] = value.map((entry) =>
        typeof entry === 'object' ? resolveScreenContent(entry, t) : entry,
      );
      continue;
    }
    if (value && typeof value === 'object') {
      out[key] = resolveScreenContent(value, t);
      continue;
    }
    out[key] = value;
  }
  return out;
}
