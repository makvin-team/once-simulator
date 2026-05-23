import { useEffect, useRef, useState } from 'react';
import { OfficeScene } from '../three/OfficeScene.js';
import { t } from '../data/translations.js';

const HOTSPOT_LABELS = {
  client: t.hotspots.client,
  computer: t.hotspots.computer,
  folder: t.hotspots.folder,
};

const VIEW_FOR_HOTSPOT = {
  client: 'client',
  computer: 'computer',
  folder: 'folder',
};

export function SceneCanvas({
  activeHotspot,
  onHotspotSelect,
  speaker,
  screenContent,
  clientMood,
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const projectionsRef = useRef(null);
  const onHotspotSelectRef = useRef(onHotspotSelect);
  const [ready, setReady] = useState(false);
  const [projections, setProjections] = useState([]);

  onHotspotSelectRef.current = onHotspotSelect;
  projectionsRef.current = setProjections;

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new OfficeScene(containerRef.current, {
      onHotspotSelect: (key, target) => onHotspotSelectRef.current?.(key, target),
      onProjections: (p) => projectionsRef.current?.(p),
    });
    sceneRef.current = scene;
    setReady(true);
    return () => {
      scene.dispose();
      sceneRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    sceneRef.current?.highlight(activeHotspot);
    const view = VIEW_FOR_HOTSPOT[activeHotspot] ?? 'overview';
    sceneRef.current?.setView(view);
  }, [activeHotspot, ready]);

  useEffect(() => {
    if (!ready) return;
    sceneRef.current?.setSpeaker(speaker);
  }, [speaker, ready]);

  useEffect(() => {
    if (!ready) return;
    sceneRef.current?.setScreenContent(screenContent);
  }, [screenContent, ready]);

  useEffect(() => {
    if (!ready) return;
    sceneRef.current?.setClientMood(clientMood ?? 'neutral');
  }, [clientMood, ready]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream text-ink text-sm">
          {t.loadingScene}
        </div>
      )}
      <Hotspots
        projections={projections}
        activeHotspot={activeHotspot}
        onSelect={onHotspotSelect}
      />
    </div>
  );
}

function Hotspots({ projections, activeHotspot, onSelect }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {projections.map((p) => {
        if (!p.visible) return null;
        const isActive = activeHotspot === p.key;
        const label = HOTSPOT_LABELS[p.key] ?? p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelect(p.key)}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}px`, top: `${p.y}px` }}
            aria-label={label}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span
                className={`absolute inset-0 rounded-full ${
                  isActive ? 'bg-peach-deep/60' : 'bg-butter/70'
                } animate-pulse-ring`}
              />
              <span
                className="relative h-4 w-4 rounded-full border-[3px] border-line shadow-plush-tiny"
                style={{
                  background: isActive ? '#FF8E5C' : '#FFD86B',
                }}
              />
            </span>
            <span
              className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border-[2.5px] border-line bg-paper px-2.5 py-0.5 text-[11px] font-bold text-ink"
              style={{ boxShadow: '0 2px 0 var(--line)' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
