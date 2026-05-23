import { Card, Chip, Stat, PatientFace, MentorFace } from './ui/index.js';

const FACE_PRESETS = {
  client: { component: 'patient', skin: '#FFD8B5', hair: '#3B2A1F', mood: 'worried' },
  satisfiedClient: {
    component: 'patient',
    skin: '#FFD8B5',
    hair: '#3B2A1F',
    mood: 'happy',
  },
  inbox: { component: 'mentor' },
  call: { component: 'patient', skin: '#E8B68F', hair: '#1F1610', mood: 'thinking' },
  doc: { component: 'patient', skin: '#FFD8B5', hair: '#3B2A1F', mood: 'sad' },
  visitor: { component: 'patient', skin: '#E8B68F', hair: '#0F0A06', mood: 'thinking' },
  workflow: { component: 'mentor' },
};

export function ClientBriefCard({ brief }) {
  if (!brief) return null;
  const preset = FACE_PRESETS[brief.face ?? 'client'] ?? FACE_PRESETS.client;

  return (
    <Card
      tone="cream2"
      stroke="thick"
      radius="md"
      pad="md"
      shadow="sm"
      tilt={-0.6}
      className="relative"
    >
      <div className="absolute -top-3 left-5 z-10">
        <Chip tone="butter" size="md">
          ★ {brief.eyebrow ?? 'CASE BRIEF'}
        </Chip>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex-none animate-floaty">
          {preset.component === 'mentor' ? (
            <MentorFace size={72} />
          ) : (
            <PatientFace
              size={72}
              skin={preset.skin}
              hair={preset.hair}
              mood={preset.mood}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-extrabold leading-tight text-ink">
            {brief.client}
          </div>
          {brief.meta && (
            <div className="mt-0.5 text-[11px] font-bold leading-snug text-ink-2">
              {brief.meta}
            </div>
          )}
          {brief.severity && (
            <div className="mt-1.5">
              <Chip tone={brief.severityTone ?? 'rose'} size="sm">
                {brief.severity}
              </Chip>
            </div>
          )}
        </div>
      </div>

      {brief.complaint && (
        <Card
          tone="white"
          stroke="thin"
          radius="sm"
          pad="sm"
          shadow="flat"
          className="mt-3"
        >
          <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink-soft">
            Asosiy soʻrov
          </div>
          <p className="mt-1 text-sm font-bold leading-snug text-ink">
            {`"${brief.complaint}"`}
          </p>
        </Card>
      )}

      {brief.task && brief.task.length > 0 && (
        <Card
          tone="butter"
          stroke="thin"
          radius="sm"
          pad="sm"
          shadow="flat"
          className="mt-2"
        >
          <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-ink">
            Sizning vazifangiz
          </div>
          <ol className="mt-1.5 space-y-1 pl-4 text-xs font-bold leading-snug text-ink">
            {brief.task.map((step, idx) => (
              <li key={idx} className="list-decimal marker:font-extrabold">
                {step}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {brief.stats && brief.stats.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {brief.stats.map((s, idx) => (
            <Stat
              key={idx}
              label={s.label}
              value={s.value}
              tone={s.tone ?? 'paper'}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
