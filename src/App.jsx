import { AnimatePresence } from 'framer-motion';
import { useAppStore } from './state/useAppStore.js';
import { RoleSelectionPage } from './features/roleSelection/RoleSelectionPage.jsx';
import { ModulesDashboardPage } from './features/modules/ModulesDashboardPage.jsx';
import { AmlSimulationView } from './features/simulation/AmlSimulationView.jsx';
import { DebriefPage } from './features/debrief/DebriefPage.jsx';

/**
 * Top-level view router. The four screens are mounted in an AnimatePresence
 * so each page fade-transitions cleanly. The active view is driven by the
 * Zustand store's `view` field (roleSelection | modules | simulation | debrief).
 */

export default function App() {
  const view = useAppStore((s) => s.view);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {view === 'roleSelection' && <RoleSelectionPage key="roleSelection" />}
        {view === 'modules' && <ModulesDashboardPage key="modules" />}
        {view === 'simulation' && <AmlSimulationView key="simulation" />}
        {view === 'debrief' && <DebriefPage key="debrief" />}
      </AnimatePresence>
    </div>
  );
}
