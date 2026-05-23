# Gemini TTS — Spoken Case Context

Adds Google Gemini text-to-speech narration for the scenario case-context
paragraph (the long story text in `CaseContextCard.jsx`). Three languages:
`uz` (Latin), `uz_cyrl`, `ru`.

## Scope (locked)
- Speak ONLY the case-context paragraph (`node.contextI18n`).
- Do NOT speak the bullets, notifications, inspect prompts, or feedback.
- Auto-play on card mount + manual replay button.
- Stop on card unmount or locale change.

## Architecture decision

Runtime call from the browser to `generativelanguage.googleapis.com`.
- Key lives in `VITE_GEMINI_API_KEY` (read at build time from `.env.local`).
- `.env.local` is already gitignored.
- Security: the bundled key is visible to anyone who opens devtools. Before
  any public deploy the key MUST be restricted in Google Cloud console to
  the production HTTP referrer, or moved behind a serverless proxy. This
  is documented in README + the service file header.

## Language handling

Gemini 2.5 TTS officially supports Russian; Uzbek is not in the documented
language list. We send a per-locale style instruction prefix so the model
gets an explicit hint:

| App locale | Prompt prefix                                                  |
|------------|----------------------------------------------------------------|
| `ru`       | "Say in natural Russian, calm professional tone: "             |
| `uz`       | "Say in natural Uzbek (Latin script), calm professional tone: "|
| `uz_cyrl`  | "Say in natural Uzbek (Cyrillic), calm professional tone: "    |

Uzbek output quality is BEST-EFFORT and may sound wrong. If the user reports
it, fallback options live in the followups section.

## Files to add

1. `src/services/geminiTts.js`
   - `synthesize(text, locale) -> Promise<{ url, mimeType }>`
   - In-memory `Map` cache keyed by `${locale}::${text}` so the same paragraph
     never costs more than once per session.
   - Uses model `gemini-2.5-flash-preview-tts`, voice `Kore` (calm, firm).
   - Response is base64 PCM 24kHz mono 16-bit. We wrap with a WAV header
     and create a Blob URL playable by `<audio>`.
   - `isConfigured()` returns false if `VITE_GEMINI_API_KEY` is missing.

2. `src/hooks/useGeminiSpeak.js`
   - `{ say, stop, isLoading, isSpeaking, error, supported }`.
   - Manages a single `HTMLAudioElement` instance.
   - Stops + revokes Blob URL on unmount.
   - Coalesces rapid re-triggers (latest `say()` wins).

## Files to modify

3. `src/components/hud/CaseContextCard.jsx`
   - Add a speaker icon button (top-right of the card body).
   - Auto-call `say(contextText, locale)` on mount and when locale changes.
   - Button states: idle / loading (spinner) / playing (stop icon).
   - If `!isConfigured()` -> hide the button silently (no broken UI).

4. `README.md`
   - Add `VITE_GEMINI_API_KEY` to a new Configuration section.
   - One-line security note.

## Out of scope (followups)
- Pre-generating audio at build time (cheaper, no key in browser).
- Serverless proxy for production deploy.
- Per-scenario voice selection.
- Alternative provider for Uzbek (ElevenLabs has better Turkic coverage).
- Audio download / caching to disk.

## Verification
- `npm run dev`, open a scenario with a case-context node, confirm:
  - Russian: audio plays, voice sounds natural.
  - Uzbek (Latin) + Uzbek (Cyrillic): audio plays (quality best-effort).
  - Stop button stops playback.
  - Switching language mid-playback cuts the old audio and plays new.
  - Closing the card stops audio (no orphan playback).
  - Without env var set: no button, no console error.
