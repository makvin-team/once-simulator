import { useEffect, useRef, useState } from 'react';

const PUNCT = new Set(['.', ',', '!', '?', ';', ':', '—', '…']);

export function TypingMessage({ text, speed = 22, onDone }) {
  const [shown, setShown] = useState('');
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    if (!text) {
      setShown('');
      onDone?.();
      return;
    }
    if (speed === 0) {
      setShown(text);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    setShown('');
    let index = 0;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) {
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
        return;
      }
      const ch = text[index - 1];
      const delay = PUNCT.has(ch) ? speed * 6 : ch === ' ' ? speed * 0.6 : speed;
      window.setTimeout(step, delay);
    };

    const id = window.setTimeout(step, speed);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [text, speed, onDone]);

  return (
    <span>
      {shown}
      {shown.length < (text?.length ?? 0) && (
        <span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-px animate-pulse rounded-sm bg-ink/80 align-middle" />
      )}
    </span>
  );
}
