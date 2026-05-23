import { useCallback, useEffect, useRef, useState } from 'react';
import { isConfigured, synthesize } from '../services/geminiTts.js';

/**
 * React hook around the Gemini TTS service.
 *
 * Manages a single HTMLAudioElement so successive `say()` calls always
 * cancel the previous playback. Each call carries a token; if a newer
 * call arrives while the previous request is still inflight, the older
 * response is discarded — last say() wins.
 *
 * Returns:
 *   say(text, locale): kick off a synth + play
 *   stop():            stop current playback (does not drop the cache)
 *   isLoading:         true between say() call and first audio frame
 *   isSpeaking:        true while the <audio> element is playing
 *   error:             last error message, or null
 *   supported:         false if VITE_GEMINI_API_KEY is missing
 */
export function useGeminiSpeak() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const tokenRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      const el = audioRef.current;
      if (el) {
        el.onended = null;
        el.onerror = null;
        el.onplay = null;
        el.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stop = useCallback(() => {
    tokenRef.current += 1;
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    if (mountedRef.current) {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  }, []);

  const say = useCallback(async (text, locale) => {
    if (!text || !isConfigured()) return;

    tokenRef.current += 1;
    const myToken = tokenRef.current;

    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }

    setError(null);
    setIsLoading(true);
    setIsSpeaking(false);

    try {
      const { url } = await synthesize(text, locale);
      if (myToken !== tokenRef.current || !mountedRef.current) return;

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onplay = () => {
        if (myToken !== tokenRef.current || !mountedRef.current) return;
        setIsLoading(false);
        setIsSpeaking(true);
      };
      audio.onended = () => {
        if (myToken !== tokenRef.current || !mountedRef.current) return;
        setIsSpeaking(false);
      };
      audio.onerror = () => {
        if (myToken !== tokenRef.current || !mountedRef.current) return;
        setIsLoading(false);
        setIsSpeaking(false);
        setError('playback failed');
      };

      await audio.play();
    } catch (err) {
      if (myToken !== tokenRef.current || !mountedRef.current) return;
      setIsLoading(false);
      setIsSpeaking(false);
      setError(err instanceof Error ? err.message : 'unknown error');
    }
  }, []);

  return {
    say,
    stop,
    isLoading,
    isSpeaking,
    error,
    supported: isConfigured(),
  };
}
