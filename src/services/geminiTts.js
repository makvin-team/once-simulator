/**
 * Google Gemini text-to-speech wrapper.
 *
 * SECURITY:
 *   This service calls the Generative Language API directly from the
 *   browser, which means VITE_GEMINI_API_KEY ships in the JS bundle and
 *   is readable to anyone who opens devtools on a deployed build.
 *   Before any public deploy:
 *     - Restrict the key by HTTP referrer in the Google Cloud console, OR
 *     - Move this call behind a serverless proxy.
 *   See /plans/gemini-tts.md for the followup task.
 *
 * Language handling:
 *   Gemini 2.5 TTS officially lists ~24 languages — Russian is in,
 *   Uzbek is not. We prepend a per-locale style instruction so the model
 *   gets an explicit cue for the right language and script.
 *   Uzbek output is best-effort and may sound off; document any reports.
 *
 * Caching:
 *   Same (locale, text) pair is hashed once per page session. Repeated
 *   `synthesize` calls return the cached Blob URL synchronously, so a
 *   trainee that replays a scenario does not re-bill or re-wait.
 */

const MODEL_ID = 'gemini-2.5-flash-preview-tts';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent`;
const DEFAULT_VOICE = 'Kore';

// Gemini returns 24 kHz, 16-bit, mono PCM in inlineData.data (base64).
const SAMPLE_RATE = 24000;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS = 1;

const STYLE_PROMPTS = {
  ru: 'Say in natural Russian, calm professional banking-trainer tone: ',
  uz: 'Say in natural Uzbek (Latin script), calm professional banking-trainer tone: ',
  // uz_cyrl is transliterated to Latin before being sent to the model
  // (see CYRL_TO_LATIN below) — Gemini 2.5 TTS refuses Uzbek Cyrillic
  // input outright (finishReason=OTHER, no audio). Once the text is in
  // Latin script the same Uzbek voice prompt works.
  uz_cyrl: 'Say in natural Uzbek (Latin script), calm professional banking-trainer tone: ',
};

/**
 * Uzbek Cyrillic to Latin transliteration, per the 1993/2019 reformed
 * Latin orthography. Multi-char keys must be tried before single-char
 * keys (Я -> Ya before Я -> A-style fallbacks would be).
 */
const CYRL_TO_LATIN = {
  Ё: 'Yo', ё: 'yo', Ю: 'Yu', ю: 'yu', Я: 'Ya', я: 'ya',
  Ў: "Oʻ", ў: "oʻ", Ғ: "Gʻ", ғ: "gʻ",
  Ҳ: 'H', ҳ: 'h', Қ: 'Q', қ: 'q',
  Ц: 'Ts', ц: 'ts', Ч: 'Ch', ч: 'ch', Ш: 'Sh', ш: 'sh',
  А: 'A', а: 'a', Б: 'B', б: 'b', В: 'V', в: 'v', Г: 'G', г: 'g',
  Д: 'D', д: 'd', Е: 'E', е: 'e', Ж: 'J', ж: 'j', З: 'Z', з: 'z',
  И: 'I', и: 'i', Й: 'Y', й: 'y', К: 'K', к: 'k', Л: 'L', л: 'l',
  М: 'M', м: 'm', Н: 'N', н: 'n', О: 'O', о: 'o', П: 'P', п: 'p',
  Р: 'R', р: 'r', С: 'S', с: 's', Т: 'T', т: 't', У: 'U', у: 'u',
  Ф: 'F', ф: 'f', Х: 'X', х: 'x', Ы: 'I', ы: 'i', Э: 'E', э: 'e',
  Ъ: "ʼ", ъ: "ʼ", Ь: '', ь: '',
};

function transliterateUzCyrlToLatin(text) {
  let out = '';
  for (const ch of text) {
    out += CYRL_TO_LATIN[ch] ?? ch;
  }
  return out;
}

/** @type {Map<string, { url: string, mimeType: string }>} */
const cache = new Map();

/** @type {Map<string, Promise<{ url: string, mimeType: string }>>} */
const pending = new Map();

function getApiKey() {
  return import.meta.env?.VITE_GEMINI_API_KEY ?? '';
}

export function isConfigured() {
  return Boolean(getApiKey());
}

function cacheKey(locale, text) {
  return `${locale}::${text}`;
}

/**
 * Wrap raw PCM bytes in a minimal WAV (RIFF) header so the result is
 * playable by an <audio> element. Gemini returns headerless 16-bit PCM.
 */
function pcmToWav(pcmBytes) {
  const byteRate = (SAMPLE_RATE * NUM_CHANNELS * BITS_PER_SAMPLE) / 8;
  const blockAlign = (NUM_CHANNELS * BITS_PER_SAMPLE) / 8;
  const dataSize = pcmBytes.byteLength;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, NUM_CHANNELS, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, BITS_PER_SAMPLE, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  new Uint8Array(buffer, 44).set(pcmBytes);
  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view, offset, str) {
  for (let i = 0; i < str.length; i += 1) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function base64ToBytes(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function buildPrompt(text, locale) {
  const prefix = STYLE_PROMPTS[locale] ?? STYLE_PROMPTS.ru;
  const body = locale === 'uz_cyrl' ? transliterateUzCyrlToLatin(text) : text;
  return `${prefix}${body}`;
}

/**
 * Synthesize speech for the given text and locale.
 *
 * @param {string} text   the text to read aloud
 * @param {'uz' | 'uz_cyrl' | 'ru'} locale
 * @returns {Promise<{ url: string, mimeType: string }>}
 *   Resolves with a Blob URL playable by an <audio> element.
 *   Rejects if the API key is missing or the request fails.
 */
export async function synthesize(text, locale) {
  const clean = (text ?? '').trim();
  if (!clean) throw new Error('synthesize: empty text');

  const apiKey = getApiKey();
  if (!apiKey) throw new Error('synthesize: VITE_GEMINI_API_KEY is not set');

  const key = cacheKey(locale, clean);
  const cached = cache.get(key);
  if (cached) return cached;

  const inflight = pending.get(key);
  if (inflight) return inflight;

  const request = (async () => {
    const body = {
      contents: [
        {
          parts: [{ text: buildPrompt(clean, locale) }],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: DEFAULT_VOICE },
          },
        },
      },
    };

    const response = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`Gemini TTS HTTP ${response.status}: ${errText.slice(0, 200)}`);
    }

    const json = await response.json();
    const part = json?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    const inline = part?.inlineData;
    if (!inline?.data) {
      throw new Error('Gemini TTS: response had no inline audio data');
    }

    const pcm = base64ToBytes(inline.data);
    const wav = pcmToWav(pcm);
    const url = URL.createObjectURL(wav);
    const result = { url, mimeType: 'audio/wav' };
    cache.set(key, result);
    return result;
  })();

  pending.set(key, request);
  try {
    return await request;
  } finally {
    pending.delete(key);
  }
}

/**
 * Release every cached Blob URL. Call on full app teardown if needed —
 * not on every unmount, since the cache survives navigation and keeps
 * replays free.
 */
export function clearCache() {
  for (const { url } of cache.values()) {
    URL.revokeObjectURL(url);
  }
  cache.clear();
}
