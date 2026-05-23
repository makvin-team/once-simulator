import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../state/useAppStore.js';
import { scenarios } from '../data/scenarios/index.js';
import { SceneCanvas } from './SceneCanvas.jsx';
import { ChatOverlay } from './ChatOverlay.jsx';
import { t } from '../data/translations.js';
import { Button, Card, Chip } from './ui/index.js';

export function SimulationView() {
  const scenarioId = useAppStore((s) => s.scenarioId);
  const currentNodeId = useAppStore((s) => s.currentNodeId);
  const exitToDashboard = useAppStore((s) => s.exitToDashboard);
  const startScenario = useAppStore((s) => s.startScenario);

  const scenario = scenarios[scenarioId];
  const node = scenario?.nodes?.[currentNodeId];
  const activeHotspot = scenario?.hotspot;

  const [speakerActive, setSpeakerActive] = useState(false);

  useEffect(() => {
    setSpeakerActive(true);
    const id = window.setTimeout(() => setSpeakerActive(false), 3200);
    return () => window.clearTimeout(id);
  }, [currentNodeId]);

  const speaker = useMemo(() => {
    if (!speakerActive) return null;
    return node?.speaker ?? null;
  }, [speakerActive, node]);

  const screenContent = useMemo(() => {
    if (!scenario) return null;
    if (node?.screen) return node.screen;
    const e = node?.evidence;
    if (e?.type === 'email') return { type: 'email', ...e, flags: e.flags };
    if (e?.type === 'analysis') return { type: 'analysis', items: e.items, allVisible: true };
    if (e?.type === 'policy') return { type: 'policy', code: e.code, title: e.title, body: e.body };
    if (e?.type === 'transcript') return { type: 'call', from: e.from, lines: e.lines };
    return scenario.defaultScreen ?? { type: 'idle' };
  }, [scenario, node]);

  const clientMood = useMemo(() => {
    if (!scenario) return 'neutral';
    return node?.mood ?? scenario.defaultMood ?? 'neutral';
  }, [scenario, node]);

  const handleHotspotSelect = useCallback(
    (hotspot) => {
      const match = Object.values(scenarios).find((s) => s.hotspot === hotspot);
      if (!match) return;
      if (match.id !== scenarioId) {
        startScenario(match.id);
      }
    },
    [scenarioId, startScenario],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') exitToDashboard();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exitToDashboard]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0"
    >
      <SceneCanvas
        activeHotspot={activeHotspot}
        onHotspotSelect={handleHotspotSelect}
        speaker={speaker}
        screenContent={screenContent}
        clientMood={clientMood}
      />

      <TopBar
        scenarioId={scenarioId}
        currentNodeId={currentNodeId}
        onExit={exitToDashboard}
      />

      <ChatOverlay />
    </motion.div>
  );
}

function TopBar({ scenarioId, currentNodeId, onExit }) {
  const meta = scenarioId ? t.scenarios[scenarioId] : null;
  const scenario = scenarios[scenarioId];
  const totalNodes = scenario
    ? Object.values(scenario.nodes).filter((n) => !n.isEnd).length
    : 0;
  const visited = scenario
    ? Object.keys(scenario.nodes).indexOf(currentNodeId) + 1
    : 0;

  return (
    <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
      <div className="pointer-events-auto">
        <Button
          size="sm"
          variant="accent"
          shape="pill"
          onClick={onExit}
          iconStart={
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M14 6l-6 6 6 6"
                stroke="#2B1E16"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {t.back}
        </Button>
      </div>

      {meta && (
        <Card
          tone="paper"
          stroke="thin"
          pad="xs"
          shadow="tiny"
          className="pointer-events-auto !rounded-pill !py-1 !px-3 flex items-center gap-2"
        >
          <Chip tone="mint" size="sm">{meta.tag}</Chip>
          <span className="text-sm font-extrabold text-ink">{meta.title}</span>
          {totalNodes > 0 && (
            <span className="text-xs font-bold text-ink-soft">
              · {Math.max(1, visited)}/{totalNodes}
            </span>
          )}
        </Card>
      )}
    </div>
  );
}
