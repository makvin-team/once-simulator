import { motion } from 'framer-motion';
import { Card, Eyebrow } from './ui/index.js';

export function EvidencePanel({ evidence }) {
  if (!evidence) return null;

  if (evidence.type === 'email') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, rotate: -0.6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
      >
        <Card tone="rose" stroke="thick" radius="md" pad="sm" shadow="sm">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-ink">
            <span className="h-2 w-2 rounded-full bg-line" />
            Shubhali xat · Inbox
          </div>
          <Card tone="paper" stroke="thin" radius="sm" pad="sm" shadow="flat">
            <div className="font-extrabold text-ink">{evidence.subject}</div>
            <div className="mt-0.5 text-[11px] font-bold text-ink-soft">
              From: {evidence.from}
            </div>
            <p className="mt-2 text-xs font-medium leading-relaxed text-ink-2">
              {evidence.body}
            </p>
          </Card>
        </Card>
      </motion.div>
    );
  }

  if (evidence.type === 'analysis') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card tone="mint" stroke="thick" radius="md" pad="sm" shadow="sm">
          <Eyebrow className="mb-2">Tahlil natijasi</Eyebrow>
          <ul className="space-y-1.5">
            {evidence.items.map((item, idx) => (
              <li key={idx}>
                <Card
                  tone="paper"
                  stroke="thin"
                  radius="sm"
                  pad="sm"
                  shadow="flat"
                  className="flex items-start gap-2 text-xs font-semibold text-ink"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border-[2px] border-line bg-mint-deep text-[10px] font-extrabold text-paper">
                    {idx + 1}
                  </span>
                  {item}
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    );
  }

  if (evidence.type === 'policy') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card tone="butter" stroke="thick" radius="md" pad="sm" shadow="sm">
          <div className="mb-1 flex items-center justify-between">
            <Eyebrow>
              Ichki qoida · {evidence.code ?? 'POLICY'}
            </Eyebrow>
          </div>
          <div className="text-sm font-extrabold text-ink">{evidence.title}</div>
          <p className="mt-1.5 text-xs font-medium leading-relaxed text-ink-2">
            {evidence.body}
          </p>
        </Card>
      </motion.div>
    );
  }

  if (evidence.type === 'transcript') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card tone="sky" stroke="thick" radius="md" pad="sm" shadow="sm">
          <Eyebrow className="mb-2">
            Qoʻngʻiroq transkripti · {evidence.from ?? 'Notanish raqam'}
          </Eyebrow>
          <div className="space-y-1.5">
            {evidence.lines.map((line, idx) => (
              <Card
                key={idx}
                tone="paper"
                stroke="thin"
                radius="sm"
                pad="sm"
                shadow="flat"
                className="text-xs font-semibold text-ink"
              >
                <span className="text-ink-soft">{line.speaker}:</span> {line.text}
              </Card>
            ))}
          </div>
        </Card>
      </motion.div>
    );
  }

  return null;
}
