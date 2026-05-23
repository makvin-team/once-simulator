import { motion } from 'framer-motion';
import { useAppStore } from '../state/useAppStore.js';
import { t } from '../data/translations.js';
import { scenarios } from '../data/scenarios/index.js';
import { Button, Card, Chip, Stat } from './ui/index.js';

export function PerformanceReport() {
  const score = useAppStore((s) => s.score);
  const maxScore = useAppStore((s) => s.maxScore);
  const tips = useAppStore((s) => s.tips);
  const scenarioId = useAppStore((s) => s.scenarioId);
  const retry = useAppStore((s) => s.retryScenario);
  const exit = useAppStore((s) => s.exitToDashboard);

  const meta = scenarios[scenarioId];
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const verdict = pickVerdict(percent);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex items-center justify-center overflow-y-auto p-6"
    >
      <motion.div
        initial={{ scale: 0.94, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="my-8 w-full max-w-xl"
      >
        <Card tone="paper" stroke="thick" radius="lg" pad="lg" shadow="full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Chip tone={verdict.chip} size="md">{t.reportTitle}</Chip>
              <h2 className="mt-3 text-2xl font-extrabold text-ink">
                {t.scenarios[meta?.id]?.title ?? ''}
              </h2>
              <p className="mt-1 text-sm font-bold text-ink-2">{verdict.label}</p>
            </div>
            <ScoreRing percent={percent} accent={verdict.color} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Stat label={t.scoreLabel} value={`${score} / ${maxScore}`} tone="cream" />
            <Stat label="Aniqlik" value={`${percent} / 100`} tone="cream" />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-ink-soft">
              {t.tipsLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {tips.map((tip, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Card
                    tone="cream"
                    stroke="thin"
                    radius="sm"
                    pad="sm"
                    className="flex items-start gap-2.5 text-sm font-semibold text-ink"
                  >
                    <Chip tone="butter" size="sm" uppercase={false} className="!h-6 !w-6 !px-0 justify-center flex-none">
                      {idx + 1}
                    </Chip>
                    <span className="flex-1 leading-snug">{tip}</span>
                  </Card>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-3">
            <Button variant="ghost" fullWidth onClick={retry} size="lg">
              {t.retry}
            </Button>
            <Button variant="primary" fullWidth onClick={exit} size="lg">
              {t.newSession}
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ScoreRing({ percent, accent }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative">
      <svg width="92" height="92" viewBox="0 0 92 92">
        <circle
          cx="46"
          cy="46"
          r={radius}
          stroke="#FFEFD1"
          strokeWidth="10"
          fill="#FFFAF0"
        />
        <motion.circle
          cx="46"
          cy="46"
          r={radius}
          stroke={accent}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 46 46)"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <circle cx="46" cy="46" r="42" stroke="#2B1E16" strokeWidth="3" fill="none" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-extrabold text-ink">
        <span className="text-lg leading-none">{percent}</span>
        <span className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">
          / 100
        </span>
      </div>
    </div>
  );
}

function pickVerdict(percent) {
  if (percent >= 80)
    return { label: t.excellent, color: '#5FCFA0', chip: 'mint' };
  if (percent >= 50)
    return { label: t.good, color: '#F5B73D', chip: 'butter' };
  return { label: t.needsWork, color: '#F47A92', chip: 'rose' };
}
