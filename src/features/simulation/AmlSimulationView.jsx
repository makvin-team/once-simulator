import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const scenarioId = useAppStore((s) => s.scenarioId);
  const currentNodeId = useAppStore((s) => s.currentNodeId);
  const notificationVisible = useAppStore((s) => s.notificationVisible);
  const inspectorOpen = useAppStore((s) => s.inspectorOpen);
  const micActive = useAppStore((s) => s.micActive);
  const advance = useAppStore((s) => s.advance);
  const openInspector = useAppStore((s) => s.openInspector);
  const closeInspector = useAppStore((s) => s.closeInspector);
  const dismissNotification = useAppStore((s) => s.dismissNotification);
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

  const handleHotspotSelect = useCallback(
    (key) => {
      if (key === 'computer' && node?.kind === 'notification' && notificationVisible) {
        openInspector();
      }
    },
    [node, notificationVisible, openInspector],
  );

  const screenContent = useMemo(() => {
    if (!node) return scenario?.defaultScreen ?? { type: 'idle' };
    if (node.screen) return node.screen;
    return scenario?.defaultScreen ?? { type: 'idle' };
  }, [node, scenario]);

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
      />

      <TopBar
        title={readPath(t, scenario.scenarioTitleI18n) ?? scenario.id}
        subtitle={readPath(t, scenario.scenarioSubtitleI18n) ?? ''}
        onExit={exitToRoleSelection}
      />

      <ProctorPanel status={proctorStatus} subtitle={proctorSubtitle} />

      <ClientHologramCard
        nameI18n="amlScenario.txPanel.client"
        metaI18n="amlScenario.txPanel.clientMeta"
        position="bottom-left"
      />

      <NotificationToast
        visible={notificationVisible && !inspectorOpen}
        tagI18nKey={node.tagI18n}
        titleI18nKey={node.titleI18n}
        subtitleI18nKey={node.subtitleI18n}
        metaI18nKey={node.metaI18n}
        ctaI18nKey={node.ctaI18n}
        severity={node.severity}
        onCta={openInspector}
        onDismiss={dismissNotification}
      />

      <TransactionDetailsPanel
        node={node.kind === 'inspect' ? node : null}
        visible={inspectorOpen && node.kind === 'inspect'}
        onClose={closeInspector}
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

function TopBar({ title, subtitle, onExit }) {
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
            background: 'var(--peach)',
            padding: '2px 8px',
            borderRadius: 999,
            border: '2px solid var(--line)',
          }}
        >
          AML
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
