import { motion } from 'framer-motion';
import { useAppStore } from '../state/useAppStore.js';
import { t } from '../data/translations.js';
import { scenarios, scenarioOrder, fraudScenarios } from '../data/scenarios/index.js';
import { roles, roleOrder } from '../data/roles.js';
import { KnowledgeAssistant } from './KnowledgeAssistant.jsx';
import {
  Button,
  Card,
  Chip,
  SectionHeader,
  Eyebrow,
  Stat,
  DoodleScatter,
  DotsBackground,
} from './ui/index.js';

const accents = {
  clientService: { chip: 'mint', glyph: ClientGlyph },
  antiFraudPhish: { chip: 'peach', glyph: MailGlyph },
  deepfakeCall: { chip: 'peach', glyph: PhoneGlyph },
  amlRedFlags: { chip: 'peach', glyph: FlagGlyph },
  fakeDocument: { chip: 'peach', glyph: DocGlyph },
  socialEngineering: { chip: 'peach', glyph: KeyGlyph },
  productivity: { chip: 'sky', glyph: SparkGlyph },
};

const HEADER_DOODLES = [
  { kind: 'star', x: '4%', y: 24, size: 32, color: 'peach', rotate: -8, anim: 'floaty' },
  { kind: 'sparkle', x: '92%', y: 18, size: 30, color: 'butter', rotate: 12, anim: 'floaty' },
  { kind: 'dot', x: '88%', y: 96, size: 24, color: 'mint' },
  { kind: 'sparkle', x: '46%', y: 8, size: 26, color: 'sky', rotate: -6 },
  { kind: 'star', x: '12%', y: 110, size: 28, color: 'mint', rotate: 14 },
  { kind: 'dot', x: '70%', y: 124, size: 24, color: 'rose' },
];

export function Dashboard() {
  const startScenario = useAppStore((s) => s.startScenario);
  const roleId = useAppStore((s) => s.roleId);
  const setRole = useAppStore((s) => s.setRole);
  const role = roles[roleId] ?? roles.operator;

  const mockIds = scenarioOrder.filter(
    (id) => t.scenarios[id]?.category === 'mock',
  );
  const fraudIds = fraudScenarios;

  const firstRecommended =
    role.recommended.find((id) => scenarios[id]) ?? scenarioOrder[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-full w-full overflow-y-auto scrollbar-thin"
    >
      <DotsBackground />
      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <Header
          onPrimary={() => startScenario(firstRecommended)}
          primaryLabel={`▶ ${t.scenarios[firstRecommended]?.title ?? t.start}`}
        />

        <RoleSelector activeId={roleId} onSelect={setRole} />

        <section className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <KnowledgeAssistant />
          <RoleSummary role={role} />
        </section>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Fraud Simulator"
            title="Firibgarlikka qarshi mashgʻulotlar"
            subtitle={t.sections.fraudHint}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fraudIds.map((id, index) => (
            <ScenarioCard
              key={id}
              id={id}
              index={index}
              recommended={role.recommended.includes(id)}
              onStart={() => startScenario(id)}
            />
          ))}
        </div>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Mock Playground"
            title="Real ish vaziyatlari"
            subtitle={t.sections.mockHint}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockIds.map((id, index) => (
            <ScenarioCard
              key={id}
              id={id}
              index={index}
              recommended={role.recommended.includes(id)}
              onStart={() => startScenario(id)}
            />
          ))}
        </div>

        <Footnote />
      </div>
    </motion.div>
  );
}

function Header({ onPrimary, primaryLabel }) {
  return (
    <div className="relative">
      <DoodleScatter items={HEADER_DOODLES} />
      <div className="relative flex flex-col items-start gap-4">
        <Chip tone="butter" size="md" dot>
          once for banks · pilot
        </Chip>
        <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl">
          {t.appName}
        </h1>
        <p className="max-w-3xl text-base font-semibold text-ink-2">{t.tagline}</p>
        {onPrimary && (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="primary" onClick={onPrimary}>
              {primaryLabel}
            </Button>
            <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
              Tavsiya etilgan sessiyani boshlash
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function RoleSelector({ activeId, onSelect }) {
  return (
    <section className="mt-10">
      <SectionHeader eyebrow={t.sections.role} title="Sizning rolingiz" />
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {roleOrder.map((id) => {
          const r = roles[id];
          const isActive = id === activeId;
          return (
            <Card
              key={id}
              as="button"
              type="button"
              onClick={() => onSelect(id)}
              tone={isActive ? 'butter' : 'paper'}
              stroke="thick"
              pad="md"
              className={`relative flex flex-col items-start text-left transition-transform cursor-pointer ${
                isActive ? '-translate-y-0.5' : 'hover:bg-cream-2 hover:-translate-y-0.5'
              }`}
            >
              <div className="text-sm font-extrabold text-ink">{r.title}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-ink-2">
                {r.subtitle}
              </div>
              <div className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">
                {r.onboardingDays} {t.sections.onboardingDays}
              </div>
              {isActive && (
                <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-line bg-mint-deep text-[10px] font-extrabold text-white">
                  ✓
                </span>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function RoleSummary({ role }) {
  return (
    <Card tone="cream2" stroke="thick" radius="md" pad="md" shadow="sm" tilt={0.4} className="relative">
      <div className="absolute -top-3 right-5">
        <Chip tone="sky" size="md">★ Onboarding</Chip>
      </div>
      <Chip tone="sky" size="md">{t.sections.yourPath}</Chip>
      <h3 className="mt-2 text-lg font-extrabold text-ink">
        {role.title} · {role.onboardingDays} {t.sections.onboardingDays}
      </h3>
      <p className="mt-1 text-sm font-semibold text-ink-2">{role.subtitle}</p>

      <ul className="mt-4 space-y-2">
        {role.plan.split(' · ').map((step, idx) => (
          <li key={step}>
            <Card
              tone="paper"
              stroke="thin"
              radius="sm"
              pad="sm"
              className="flex items-center gap-2.5 text-sm font-semibold text-ink"
            >
              <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border-[2px] border-line bg-butter text-[10px] font-extrabold text-ink">
                {idx + 1}
              </span>
              {step}
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Soat" value="18" tone="peach" />
        <Stat label="Modul" value="6" tone="mint" />
        <Stat label="Kvizlar" value="12" tone="sky" />
      </div>
    </Card>
  );
}

function ScenarioCard({ id, index, onStart, recommended }) {
  const meta = t.scenarios[id];
  const a = accents[id] ?? accents.clientService;
  const Glyph = a.glyph;
  const tiltDirections = [-0.6, 0.4, -0.3, 0.6, -0.4, 0.3];
  const tilt = tiltDirections[index % tiltDirections.length];

  return (
    <motion.button
      type="button"
      onClick={onStart}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index }}
      whileHover={{ y: -4, rotate: 0 }}
      whileTap={{ y: 2, scale: 0.99 }}
      style={{ transform: `rotate(${tilt}deg)` }}
      className="group block text-left cursor-pointer"
      aria-label={meta.title}
    >
      <Card
        tone="paper"
        stroke="thick"
        pad="md"
        shadow="sm"
        className="relative h-full flex flex-col"
      >
        {recommended && (
          <span className="absolute -top-3 left-5 z-10">
            <Chip tone="butter" size="md">★ Tavsiya etiladi</Chip>
          </span>
        )}

        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-line shadow-plush-tiny ${
              {
                mint: 'bg-mint',
                peach: 'bg-peach',
                sky: 'bg-sky',
                butter: 'bg-butter',
              }[a.chip]
            }`}
          >
            <Glyph />
          </div>
          <Chip tone={a.chip} size="md">{meta.tag}</Chip>
        </div>

        <h3 className="mt-4 text-base font-extrabold text-ink">{meta.title}</h3>
        <p className="mt-0.5 text-xs font-bold text-ink-2">{meta.subtitle}</p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ink-2">
          {meta.summary}
        </p>

        <div className="mt-4 flex items-center justify-start">
          <Chip tone="peach" size="md">
            ▶ {t.start}
          </Chip>
        </div>
      </Card>
    </motion.button>
  );
}

function Footnote() {
  return (
    <div className="mt-14 flex flex-wrap items-center gap-3">
      <Chip tone="mint" size="md">Shariah-compliant</Chip>
      <Chip tone="sky" size="md">Oʻzbek tilida</Chip>
      <Chip tone="butter" size="md">Three.js · React</Chip>
      <Chip tone="peach" size="md">6 fraud sub-types</Chip>
      <Chip tone="rose" size="md">4 rol</Chip>
    </div>
  );
}

function ClientGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="12" cy="9" r="4" stroke="#2B1E16" strokeWidth="2.5" />
      <path d="M4 20c1.5-3.5 5-5 8-5s6.5 1.5 8 5" stroke="#2B1E16" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#2B1E16" strokeWidth="2.5" />
      <path d="M3 8l9 6 9-6" stroke="#2B1E16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M6 4l3 3-2 3a12 12 0 005 5l3-2 3 3-2 3a16 16 0 01-13-13z"
        stroke="#2B1E16"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlagGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M5 3v18" stroke="#2B1E16" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 4h11l-2 4 2 4H5" stroke="#2B1E16" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function DocGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M7 3h7l4 4v14H7z" stroke="#2B1E16" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 3v5h4" stroke="#2B1E16" strokeWidth="2.5" />
      <path d="M9 13h7M9 17h5" stroke="#2B1E16" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function KeyGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="8" cy="14" r="4" stroke="#2B1E16" strokeWidth="2.5" />
      <path d="M11 12l8-8M16 7l3 3" stroke="#2B1E16" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3"
        stroke="#2B1E16"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
