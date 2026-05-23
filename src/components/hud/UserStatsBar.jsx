import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../state/useAppStore.js';
import { PILLARS } from '../../data/pillars.js';
import { useT } from '../../i18n/index.js';

/**
 * Horizontal pill bar showing four session stats in real time:
 *   - Score      current scenario score / its max
 *   - XP         total points earned across all scenarios this session
 *   - Accuracy   correct answers / total answers as a percentage
 *   - Progress   completed scenarios / total scenarios in the pillar
 *
 * Stats live on the Zustand store; the bar simply mirrors them. XP gets
 * an animated count-up so trainees register the reward, and Accuracy
 * recolors from rose-to-mint as it climbs over 70%.
 */
export function UserStatsBar() {
  const t = useT();
  const pillarId = useAppStore((s) => s.pillarId);
  const score = useAppStore((s) => s.score);
  const maxScore = useAppStore((s) => s.maxScore);
  const totalXp = useAppStore((s) => s.totalXp);
  const correctAnswers = useAppStore((s) => s.correctAnswers);
  const totalAnswers = useAppStore((s) => s.totalAnswers);
  const completedScenarios = useAppStore((s) => s.completedScenarios);

  const totalScenarios = pillarId
    ? PILLARS[pillarId]?.modules?.filter((m) => m.scenarioId).length ?? 0
    : 0;
  const completedInPillar = pillarId
    ? completedScenarios.filter((id) =>
        PILLARS[pillarId]?.modules?.some((m) => m.scenarioId === id),
      ).length
    : 0;

  const accuracy =
    totalAnswers > 0
      ? Math.round((correctAnswers / totalAnswers) * 100)
      : 0;

  const displayedXp = useCountUp(totalXp);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'white',
        border: '3px solid var(--line)',
        borderRadius: 999,
        padding: '6px 12px',
        boxShadow: 'var(--plush-tiny)',
      }}
    >
      <Chip
        label={t.hud?.score ?? 'Score'}
        value={maxScore > 0 ? `${score}/${maxScore}` : `${score}`}
        tone="peach"
      />
      <Sep />
      <Chip
        label={t.hud?.xp ?? 'XP'}
        value={displayedXp}
        tone="butter"
      />
      <Sep />
      <Chip
        label={t.hud?.accuracy ?? 'Accuracy'}
        value={`${accuracy}%`}
        tone={accuracy >= 70 ? 'mint' : accuracy >= 40 ? 'butter' : 'rose'}
      />
      <Sep />
      <Chip
        label={t.hud?.progress ?? 'Progress'}
        value={
          totalScenarios > 0
            ? `${completedInPillar}/${totalScenarios}`
            : '—'
        }
        tone="sky"
      />
    </div>
  );
}

function Chip({ label, value, tone }) {
  const bg = `var(--${tone})`;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          background: bg,
          padding: '2px 7px',
          borderRadius: 999,
          border: '2px solid var(--line)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 900,
          color: 'var(--ink)',
          fontVariantNumeric: 'tabular-nums',
          minWidth: 28,
          textAlign: 'left',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span
      aria-hidden
      style={{
        width: 1,
        height: 18,
        background: 'var(--line)',
        opacity: 0.35,
      }}
    />
  );
}

/**
 * Count up to the target XP over ~600 ms whenever it increases. Drop
 * straight to the value when it resets (exit to role-selection).
 */
function useCountUp(target) {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (target < shown) {
      setShown(target);
      fromRef.current = target;
      return undefined;
    }
    if (target === shown) return undefined;
    fromRef.current = shown;
    startRef.current = performance.now();
    const duration = 600;
    const step = (now) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      const eased = 1 - (1 - t) * (1 - t);
      const v = Math.round(
        fromRef.current + (target - fromRef.current) * eased,
      );
      setShown(v);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return shown;
}
