import { useEffect } from 'react';
import { useAppStore } from '../state/useAppStore.js';
import { t } from '../data/translations.js';
import { Button } from './ui/index.js';
import { VoiceWaveform } from './VoiceWaveform.jsx';

const LISTEN_MS = 1600;

export function MicButton({ choices = [], disabled = false }) {
  const isListening = useAppStore((s) => s.isListening);
  const setListening = useAppStore((s) => s.setListening);
  const pickChoice = useAppStore((s) => s.pickChoice);

  useEffect(() => {
    if (!isListening) return;
    const best = pickBestChoice(choices);
    const id = window.setTimeout(() => {
      setListening(false);
      if (best) pickChoice(best);
    }, LISTEN_MS);
    return () => window.clearTimeout(id);
  }, [isListening, choices, pickChoice, setListening]);

  const onClick = () => {
    if (disabled) return;
    setListening(!isListening);
  };

  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative">
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full bg-peach-deep/60 animate-pulse-ring" />
            <span className="absolute inset-[-8px] rounded-full bg-peach/50 animate-pulse-ring" />
          </>
        )}
        <Button
          size="lg"
          variant={isListening ? 'primary' : 'accent'}
          shape="pill"
          onClick={onClick}
          disabled={disabled}
          aria-label="Mikrofon"
          aria-pressed={isListening}
          className="!w-14 !h-14 !p-0 !rounded-full relative"
        >
          <MicIcon />
        </Button>
      </div>
      <div className="flex flex-1 min-w-0 flex-col">
        <span className="text-xs font-bold text-ink-2">
          {disabled
            ? 'Avval AI Mentor gapirib boʻlsin...'
            : isListening
            ? t.listening
            : t.micHint}
        </span>
        <div className="mt-1.5">
          <VoiceWaveform active={isListening} />
        </div>
      </div>
    </div>
  );
}

function pickBestChoice(choices) {
  if (!choices.length) return null;
  return choices.reduce(
    (best, c) => ((c.points ?? 0) > (best?.points ?? -1) ? c : best),
    null,
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect
        x="9"
        y="3"
        width="6"
        height="11"
        rx="3"
        stroke="#2B1E16"
        strokeWidth="2.5"
      />
      <path
        d="M5 11a7 7 0 0014 0M12 18v3"
        stroke="#2B1E16"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
