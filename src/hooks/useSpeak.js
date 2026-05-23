import { useCallback, useEffect, useRef, useState } from 'react';
import { cancel, isSupported, speak } from '../services/speech.js';

/**
 * React hook around the browser TTS service.
 *
 * Returns { say, stop, isSpeaking, supported }. Cancels any in-flight
 * utterance on unmount so leaving the simulation never leaves orphaned
 * audio playing in the background.
 *
 * `say` is locale-aware: callers pass the current i18n locale and the
 * underlying service picks the closest installed voice.
 */
export function useSpeak() {
  const [speaking, setSpeaking] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      cancel();
    };
  }, []);

  const say = useCallback((text, locale) => {
    if (!text) return;
    speak(text, {
      locale,
      onStart: () => {
        if (mounted.current) setSpeaking(true);
      },
      onEnd: () => {
        if (mounted.current) setSpeaking(false);
      },
      onError: () => {
        if (mounted.current) setSpeaking(false);
      },
    });
  }, []);

  const stop = useCallback(() => {
    cancel();
    if (mounted.current) setSpeaking(false);
  }, []);

  return {
    say,
    stop,
    isSpeaking: speaking,
    supported: isSupported(),
  };
}
