import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../state/useAppStore.js';
import { scenarios } from '../data/scenarios/index.js';
import { t } from '../data/translations.js';
import { TypingMessage } from './TypingMessage.jsx';
import { MicButton } from './MicButton.jsx';
import { ChoiceOptions } from './ChoiceOptions.jsx';
import { EvidencePanel } from './EvidencePanel.jsx';
import { CharacterPortrait } from './CharacterPortrait.jsx';
import { ClientBriefCard } from './ClientBriefCard.jsx';
import { Button, Chip } from './ui/index.js';

const THINKING_MS = 650;

export function ChatOverlay() {
  const scenarioId = useAppStore((s) => s.scenarioId);
  const currentNodeId = useAppStore((s) => s.currentNodeId);
  const history = useAppStore((s) => s.history);
  const pickChoice = useAppStore((s) => s.pickChoice);
  const exitToDashboard = useAppStore((s) => s.exitToDashboard);

  const scenario = scenarios[scenarioId];
  const node = scenario?.nodes?.[currentNodeId];
  const meta = t.scenarios[scenarioId];

  const [thinking, setThinking] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setThinking(true);
    setTypingDone(false);
    const id = window.setTimeout(() => setThinking(false), THINKING_MS);
    return () => window.clearTimeout(id);
  }, [currentNodeId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history.length, currentNodeId, typingDone, thinking]);

  const speakerLabel = useMemo(() => {
    if (!node) return '';
    return node.name ?? (node.speaker === 'mentor' ? 'AI Mentor' : 'Mijoz');
  }, [node]);

  if (!scenario || !node) return null;

  const status = thinking ? 'thinking' : typingDone ? 'ready' : 'speaking';
  const isSpeaking = !thinking && !typingDone;
  const nodeMood = node.mood ?? scenario.defaultMood ?? 'neutral';

  return (
    <motion.aside
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      className="pointer-events-auto absolute right-4 top-4 bottom-4 z-10 flex w-[440px] max-w-[calc(100vw-2rem)] flex-col rounded-md border-[3px] border-line bg-white shadow-plush"
    >
      <Header
        title={meta.title}
        subtitle={meta.subtitle}
        status={status}
        onExit={exitToDashboard}
      />

      <CharacterPortrait
        speaker={node.speaker}
        mood={nodeMood}
        isSpeaking={isSpeaking}
        isThinking={thinking}
        name={speakerLabel}
      />

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto scrollbar-thin bg-white px-4 py-4"
      >
        {scenario.brief && <ClientBriefCard brief={scenario.brief} />}

        <AnimatePresence initial={false}>
          {history.map((msg, idx) => (
            <Bubble key={`h-${idx}`} from={msg.from} text={msg.text} />
          ))}
        </AnimatePresence>

        {thinking ? (
          <ThinkingBubble speaker={node.speaker} name={speakerLabel} />
        ) : (
          <SpeakerBubble
            key={`node-${currentNodeId}`}
            speaker={node.speaker}
            name={speakerLabel}
            text={node.text}
            onDone={() => setTypingDone(true)}
          />
        )}

        {node.evidence && typingDone && (
          <EvidencePanel evidence={node.evidence} />
        )}
      </div>

      <div className="space-y-3 border-t-[3px] border-line bg-cream-2 px-4 py-3">
        <ChoiceOptions
          choices={node.choices ?? []}
          disabled={!typingDone || thinking}
          onPick={pickChoice}
        />
        <div className="flex items-center justify-between border-t-[2px] border-dashed border-line/30 pt-3">
          <MicButton choices={node.choices ?? []} disabled={!typingDone || thinking} />
        </div>
      </div>
    </motion.aside>
  );
}

function Header({ title, subtitle, status, onExit }) {
  const statusTone = {
    thinking: 'butter',
    speaking: 'peach',
    ready: 'mint',
  }[status];
  const statusLabel = {
    thinking: 'TAHLIL QILMOQDA',
    speaking: 'SOʻZLAMOQDA',
    ready: 'JAVOB KUTILMOQDA',
  }[status];
  return (
    <div className="flex items-start justify-between gap-3 border-b-[3px] border-line bg-cream px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Chip tone={statusTone} size="sm" dot>
            {statusLabel}
          </Chip>
        </div>
        <h3 className="mt-1.5 text-base font-extrabold text-ink">{title}</h3>
        <p className="truncate text-xs font-bold text-ink-2">{subtitle}</p>
      </div>
      <Button
        size="icon"
        variant="rose"
        shape="pill"
        onClick={onExit}
        aria-label={t.exit}
        className="!rounded-full !h-9 !w-9"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="#2B1E16"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </Button>
    </div>
  );
}

function SpeakerBubble({ speaker, name, text, onDone }) {
  const accent = accentFor(speaker);
  const [skip, setSkip] = useState(false);
  const handleSkip = () => setSkip(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <Avatar speaker={speaker} />
      <div className="flex-1 min-w-0">
        <SpeakerTag name={name} speaker={speaker} />
        <button
          type="button"
          onClick={handleSkip}
          className="relative mt-1 block w-full text-left overflow-hidden rounded-md rounded-tl-sm border-[2.5px] border-line bg-white px-3.5 py-2.5 text-sm font-semibold leading-relaxed text-ink shadow-plush-tiny hover:bg-cream cursor-pointer"
          title="Bosib oʻtkazib yuboring"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[5px]"
            style={{ background: accent }}
          />
          <span className="block pl-1.5">
            <TypingMessage text={text} speed={skip ? 0 : undefined} onDone={onDone} />
          </span>
        </button>
      </div>
    </motion.div>
  );
}

function ThinkingBubble({ speaker, name }) {
  const accent = accentFor(speaker);
  return (
    <div className="flex items-start gap-3">
      <Avatar speaker={speaker} />
      <div className="flex-1">
        <SpeakerTag name={name} speaker={speaker} />
        <div
          className="relative mt-1 inline-flex overflow-hidden rounded-md rounded-tl-sm border-[2.5px] border-line bg-white px-3.5 py-2.5 shadow-plush-tiny"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[5px]"
            style={{ background: accent }}
          />
          <span className="inline-flex items-center gap-1.5 pl-1.5">
            <Dot delay={0} />
            <Dot delay={0.15} />
            <Dot delay={0.3} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <motion.span
      className="h-2 w-2 rounded-full bg-ink"
      animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, delay }}
    />
  );
}

function Bubble({ from, text }) {
  if (from === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-end"
      >
        <div
          className="relative max-w-[85%] overflow-hidden rounded-md rounded-tr-sm border-[2.5px] border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-plush-tiny"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 right-0 w-[5px] bg-peach-deep"
          />
          <span className="block pr-1.5">{text}</span>
        </div>
      </motion.div>
    );
  }
  const accent = accentFor(from);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 opacity-90"
    >
      <Avatar speaker={from} small />
      <div
        className="relative overflow-hidden rounded-md rounded-tl-sm border-[2.5px] border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-plush-tiny"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-[5px]"
          style={{ background: accent }}
        />
        <span className="block pl-1.5">{text}</span>
      </div>
    </motion.div>
  );
}

function SpeakerTag({ name, speaker }) {
  const isMentor = speaker === 'mentor';
  return (
    <div className="flex items-center gap-2">
      <Chip tone={isMentor ? 'mint' : 'sky'} size="sm">
        {isMentor ? 'AI MENTOR' : 'AVATAR'}
      </Chip>
      <span className="text-[11px] font-extrabold uppercase tracking-wide text-ink-2 truncate">
        {name}
      </span>
    </div>
  );
}

function Avatar({ speaker, small }) {
  const isMentor = speaker === 'mentor';
  const bg = isMentor ? '#5FCFA0' : '#5AB7F2';
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full border-[2.5px] border-line shadow-plush-tiny ${
        small ? 'h-7 w-7 text-[10px]' : 'h-10 w-10 text-xs'
      } font-extrabold text-ink`}
      style={{ background: bg }}
    >
      {isMentor ? 'AI' : 'M'}
    </div>
  );
}

function accentFor(speaker) {
  return speaker === 'mentor' ? '#5FCFA0' : '#5AB7F2';
}
