/**
 * Browser Text-to-Speech wrapper around window.speechSynthesis.
 *
 * Why this exists:
 *   - The previous mic UI did nothing — it was a fake interaction.
 *     The user's UX brief calls for the assistant to READ scenario
 *     text aloud so the trainee can listen and click, mimicking a
 *     real conversation.
 *   - speechSynthesis is the only TTS API guaranteed to work without
 *     network access or an API key, which is the explicit constraint
 *     from the brief.
 *
 * Quirks this module handles:
 *   - Chromium populates getVoices() asynchronously and fires a
 *     'voiceschanged' event on first load. Calling speak() before
 *     voices are ready picks the wrong voice and re-pick is awkward,
 *     so we cache the voice list eagerly and re-cache on the event.
 *   - Safari iOS does not expose speechSynthesis on all builds —
 *     isSupported() lets the caller render a silent fallback.
 *   - cancel() must be called before speak() if anything is queued;
 *     otherwise utterances stack up and the trainee hears the previous
 *     node's text after answering.
 *   - For Uzbek (uz-UZ) most platforms ship no voice. Russian (ru-RU)
 *     is the most likely fallback that still sounds reasonable to an
 *     Uzbek listener and is widely installed.
 */

const LANG_TAGS = {
  uz: ['uz-UZ', 'uz', 'ru-RU', 'ru'],
  uz_cyrl: ['uz-UZ', 'uz', 'ru-RU', 'ru'],
  ru: ['ru-RU', 'ru'],
};

let cachedVoices = [];
let voicesReady = false;

function refreshVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const list = window.speechSynthesis.getVoices?.() ?? [];
  if (list.length) {
    cachedVoices = list;
    voicesReady = true;
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
}

export function isSupported() {
  return (
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance !== 'undefined'
  );
}

export function pickVoice(locale) {
  if (!isSupported()) return null;
  if (!voicesReady) refreshVoices();
  const tags = LANG_TAGS[locale] ?? LANG_TAGS.uz;
  for (const tag of tags) {
    const match = cachedVoices.find(
      (v) => v.lang?.toLowerCase() === tag.toLowerCase(),
    );
    if (match) return match;
    const prefix = cachedVoices.find((v) =>
      v.lang?.toLowerCase().startsWith(tag.slice(0, 2).toLowerCase()),
    );
    if (prefix) return prefix;
  }
  return cachedVoices[0] ?? null;
}

/**
 * speak(text, options)
 *   text:    string to read aloud
 *   options: { locale, rate, pitch, onStart, onEnd, onError }
 * Returns the utterance so the caller can cancel by reference if needed.
 * cancel() is called automatically before scheduling the new utterance
 * so the trainee never hears two scenarios at once.
 */
export function speak(text, options = {}) {
  if (!isSupported()) {
    options.onEnd?.();
    return null;
  }
  const clean = (text ?? '').trim();
  if (!clean) {
    options.onEnd?.();
    return null;
  }
  const synth = window.speechSynthesis;
  synth.cancel();

  const utter = new window.SpeechSynthesisUtterance(clean);
  const voice = pickVoice(options.locale);
  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang;
  } else {
    utter.lang = LANG_TAGS[options.locale]?.[0] ?? 'ru-RU';
  }
  utter.rate = options.rate ?? 1;
  utter.pitch = options.pitch ?? 1;
  utter.volume = options.volume ?? 1;

  utter.onstart = () => options.onStart?.();
  utter.onend = () => options.onEnd?.();
  utter.onerror = (event) => {
    if (event.error === 'interrupted' || event.error === 'canceled') {
      options.onEnd?.();
      return;
    }
    options.onError?.(event.error);
    options.onEnd?.();
  };

  synth.speak(utter);
  return utter;
}

export function cancel() {
  if (!isSupported()) return;
  window.speechSynthesis.cancel();
}
