import { create } from 'zustand';
import { scenarios } from '../data/scenarios/index.js';
import { PILLARS, PILLAR_ORDER } from '../data/pillars.js';
import { DEFAULT_LOCALE, LOCALES } from '../i18n/index.js';

/**
 * App-wide Zustand store.
 *
 * Views form a 4-stage pipeline:
 *   roleSelection → modules → simulation → debrief
 *
 * Locale is persisted in localStorage so a returning user keeps their pick.
 */

const LOCALE_KEY = 'once-locale-v1';

function readPersistedLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    if (saved && LOCALES.includes(saved)) return saved;
  } catch {
    /* localStorage unavailable in some sandboxes — fall through */
  }
  return DEFAULT_LOCALE;
}

function persistLocale(locale) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    /* swallow — persistence is best-effort */
  }
}

const initialState = {
  view: 'roleSelection',
  locale: readPersistedLocale(),

  pillarId: null,
  moduleId: null,
  scenarioId: null,

  currentNodeId: null,
  history: [],
  score: 0,
  maxScore: 0,
  decision: null,

  notificationVisible: false,
  inspectorOpen: false,
  micActive: false,
};

export const useAppStore = create((set, get) => ({
  ...initialState,

  setLocale: (locale) => {
    if (!LOCALES.includes(locale)) return;
    persistLocale(locale);
    set({ locale });
  },

  pickPillar: (pillarId) => {
    if (!PILLARS[pillarId]) return;
    set({ pillarId, view: 'modules' });
  },

  exitToRoleSelection: () =>
    set({
      ...initialState,
      locale: get().locale,
      view: 'roleSelection',
    }),

  startModule: (moduleId) => {
    const { pillarId } = get();
    const pillar = PILLARS[pillarId];
    const module = pillar?.modules.find((m) => m.id === moduleId);
    if (!module || module.locked || !module.scenarioId) return;
    const scenario = scenarios[module.scenarioId];
    if (!scenario) return;
    set({
      view: 'simulation',
      moduleId,
      scenarioId: scenario.id,
      currentNodeId: scenario.startNodeId,
      history: [],
      score: 0,
      maxScore: 0,
      decision: null,
      notificationVisible: false,
      inspectorOpen: false,
      micActive: false,
    });
  },

  openNotification: () => set({ notificationVisible: true }),
  dismissNotification: () => set({ notificationVisible: false }),

  /**
   * Advance directly to a named node, applying the same kind-aware side
   * effects as `advance`. Used by the NotificationToast CTA so the click
   * actually moves the graph forward instead of just toggling a panel.
   */
  advanceTo: (nodeId) => {
    const { scenarioId } = get();
    const scenario = scenarios[scenarioId];
    const node = scenario?.nodes?.[nodeId];
    if (!node) return;
    if (node.kind === 'notification') {
      set({
        currentNodeId: nodeId,
        notificationVisible: true,
        inspectorOpen: false,
      });
      return;
    }
    if (node.kind === 'inspect') {
      set({
        currentNodeId: nodeId,
        inspectorOpen: true,
        notificationVisible: false,
      });
      return;
    }
    set({
      currentNodeId: nodeId,
      notificationVisible: false,
      inspectorOpen: false,
    });
  },

  /**
   * Re-open the inspector. Only valid while the current node is of
   * kind=inspect; on any other node this is a no-op so we don't strand
   * the player in an empty modal.
   */
  reopenInspector: () => {
    const { scenarioId, currentNodeId } = get();
    const node = scenarios[scenarioId]?.nodes?.[currentNodeId];
    if (node?.kind !== 'inspect') return;
    set({ inspectorOpen: true, notificationVisible: false });
  },

  setMicActive: (value) => set({ micActive: !!value }),

  advance: (nextNodeId) => {
    const { scenarioId } = get();
    const scenario = scenarios[scenarioId];
    const node = scenario?.nodes?.[nextNodeId];
    if (!node) return;
    if (node.kind === 'notification') {
      set({ currentNodeId: nextNodeId, notificationVisible: true });
      return;
    }
    if (node.kind === 'inspect') {
      set({
        currentNodeId: nextNodeId,
        inspectorOpen: true,
        notificationVisible: false,
      });
      return;
    }
    set({ currentNodeId: nextNodeId });
  },

  pickChoice: (choice) => {
    const { scenarioId, currentNodeId, history, score, maxScore } = get();
    const scenario = scenarios[scenarioId];
    const node = scenario?.nodes?.[currentNodeId];
    if (!scenario || !node || !choice) return;

    const earned = choice.points ?? 0;
    const bestPossible = Math.max(
      ...(node.choices ?? []).map((c) => c.points ?? 0),
      0,
    );

    const nextNode = scenario.nodes[choice.nextNodeId];
    const nextHistory = [
      ...history,
      { from: 'user', choiceId: choice.id, points: earned },
    ];

    if (!nextNode) return;

    if (nextNode.kind === 'end') {
      set({
        view: 'debrief',
        history: nextHistory,
        score: score + earned,
        maxScore: maxScore + bestPossible,
        decision: { choiceId: choice.id, endNodeId: choice.nextNodeId },
        currentNodeId: choice.nextNodeId,
        inspectorOpen: false,
        notificationVisible: false,
      });
      return;
    }

    set({
      history: nextHistory,
      score: score + earned,
      maxScore: maxScore + bestPossible,
      currentNodeId: choice.nextNodeId,
      inspectorOpen: nextNode.kind === 'inspect',
      notificationVisible: nextNode.kind === 'notification',
    });
  },

  retry: () => {
    const { scenarioId, moduleId } = get();
    if (!scenarioId || !moduleId) return;
    const scenario = scenarios[scenarioId];
    set({
      view: 'simulation',
      currentNodeId: scenario.startNodeId,
      history: [],
      score: 0,
      maxScore: 0,
      decision: null,
      notificationVisible: false,
      inspectorOpen: false,
      micActive: false,
    });
  },

  /**
   * Stable selectors — used by components that don't want the whole state
   * tree (each selector is a referentially-stable callable).
   */
  selectors: {
    pillarOrder: () => PILLAR_ORDER,
  },
}));
