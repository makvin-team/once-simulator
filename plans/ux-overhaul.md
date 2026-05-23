# Plan: UX/UI Overhaul (Phases 1-4)

Single source of truth. No code blocks. Phases gated — each phase requires
sign-off before the next is started.

## Mission

Bring the AI Mentor banking simulator from "functional prototype" to a
Medkit-quality, training-grade product:

- The on-screen character feels alive (face readable, gaze on camera,
  subtle idle animation).
- Scenarios are not abstract definitions but realistic, contextual cases
  with enough detail that a trainee gains actual job knowledge.
- The mic is removed; the assistant speaks scenarios aloud via TTS.
- A persistent HUD shows the trainee's Score, XP, Accuracy, and Module
  Progress in real time.
- Three pillar-anchor scenarios are rewritten as full case studies with
  real Uzbekistan banking context and policy codes.

## Out of Scope (this plan)

- Replacing Three.js geometry with imported GLTF rigs.
- Adding speech-to-text or any real microphone capture.
- Backend persistence of XP across sessions (XP lives in store, reset on
  exit to role-selection; persistence is a follow-up).
- Authoring new pillars beyond AML, Cyber, Fraud, CX.

---

## Phase 1 — Character Readability and Idle Life

Goal: the trainee instantly sees a face with eyes, a mouth, and a gaze
locked on them. No model swap. Existing avatar is kept, but read as a
character instead of a blob.

### Diagnosis (do not skip)

The avatar in src/three/createClientAvatar.js already has:
- sclera + iris spheres
- eyelid planes driven by blink animation
- mouth torus driven by speaking animation
- glance animation (head rotates left/right every 4-7 s)
- breathing scale on the hips

The reason the face reads as "faceless" is purely framing and contrast:

- The "overview" camera in src/three/OfficeScene.js sits ~4 m from a
  22 cm head. Eye geometry (radius 0.038, ~3 cm) renders as ~6-8 px
  on a 1080 p viewport. Below the contrast threshold of the cozy
  cream background.
- The skin material has emissive ff6b6b at intensity 0.04 — the eyes
  have NO emissive. Under the warm scene lighting the irises blend
  into the head silhouette.
- The mouth torus is open-arc-down but very thin; at distance it
  reads as a smudge.

### Fix 1.1 — Camera

Add a fourth named view to CAMERA_VIEWS called "portrait":
- pos roughly [0, 1.65, -0.55]
- look at [0, 1.74, -2.4]
- distance ~1.85 m from the head pivot — eyes render at ~24-30 px.

Wire AmlSimulationView to pass cameraView="portrait" when node.kind is
"proctor" (intro) or "notification" (alert). Keep "overview" only for
the inspector and end states, where the trainee needs to see the room.

### Fix 1.2 — Face

In createClientAvatar.js:
- Iris material: add emissive 0x2b1e16 at intensity 0.35 so the
  iris reads as a dark hole even under warm fill light. Make the
  iris radius 0.024 (up from 0.018). Push z to 0.221.
- Add a "highlight" tiny white sphere on each iris (radius 0.006,
  z 0.227, offset slightly up-left) to give the eyes life.
- Mouth: keep the torus but increase tube radius from 0.011 to
  0.016 and inner radius from 0.05 to 0.06 so the smile is visible
  from 2 m away. Set emissive 0x7c2d12 at intensity 0.15.
- Eyebrows: increase box width from 0.06 to 0.075 and depth from
  0.012 to 0.018 for silhouette.

### Fix 1.3 — Gaze locked on camera

In updateClient, when speakingFor !== "client" and glancePhase <= 0,
slerp head.rotation.y toward atan2(camera.x - head.x, camera.z - head.z)
multiplied by 0.6 (look slightly toward camera, not full-stare). When
glancing, override as today. This makes the character feel like it is
acknowledging the trainee.

Camera reference is passed in via the update call — extend the
update signature with { speakingFor, camera }.

### Fix 1.4 — Idle breathing emphasis

Already present at hips.scale.y. Increase amplitude from 0.012 to
0.020 so the chest movement is visible at the new portrait distance.

### Acceptance for Phase 1

- Open simulation → intro frame shows the face clearly, eyes
  visible, gaze toward camera, subtle breathing.
- During an alert, the camera is at portrait distance; during the
  inspector the camera pulls back to overview.
- Blink fires every 2.5-5.5 s and is visually obvious.
- No regression in the existing client-mood color switch.

---

## Phase 2 — Voice & Audio Overhaul

Goal: replace the useless mic UI with browser Text-To-Speech (TTS) that
reads scenario copy aloud the moment a node becomes active. The trainee
listens, then clicks.

### Fix 2.1 — Remove the mic

- Delete the bottom-center mic block from AmlSimulationView (the inline
  JSX between the TransactionDetailsPanel and the closing motion.div).
- Drop micActive, setMicActive, MicPulse usage from the simulation
  feature. Keep the MicPulse component file in place (for now — may be
  reused as a "Speaking" indicator), but remove it from the simulation
  view.
- Update useAppStore initial state to drop micActive and the setter.
  startModule/retry no longer set it. Same for advance and advanceTo.

### Fix 2.2 — Speech service

New file: src/services/speech.js. Pure module, no React:
- speak(text, { locale, onStart, onEnd, onError }) — wraps
  window.speechSynthesis.speak with a SpeechSynthesisUtterance.
- cancel() — calls speechSynthesis.cancel(); used on unmount and
  when the node changes mid-utterance.
- pickVoice(locale) — chooses the best-match voice from
  speechSynthesis.getVoices() for locale uz | ru | uz_cyrl. Falls
  back to Russian for Uzbek if no uz voice is installed; uses lang
  tag "ru-RU" then.
- isSupported() — boolean, false if the API is missing (Safari iOS,
  some embedded browsers).

The service must be defensive: getVoices() is async on Chromium; subscribe
to the "voiceschanged" event once on first load and cache the voice map.

### Fix 2.3 — useSpeak hook

New file: src/hooks/useSpeak.js:
- useSpeak() returns { speak, cancel, isSpeaking, isSupported }.
- isSpeaking is a React state driven by onStart/onEnd from the service.
- Cleans up on unmount.

### Fix 2.4 — Wire into the simulation

In AmlSimulationView:
- Compute "spoken text" per active node:
  - proctor node → readPath(t, node.textI18n)
  - notification → readPath(t, node.titleI18n) + ". " +
    readPath(t, node.subtitleI18n)
  - inspect → readPath(t, scenario.nodes.inspect.caseContextI18n)
    once on open (see Phase 4 — case context is added there). Until
    Phase 4 lands, speak the yourTask field.
  - end → readPath(t, node.feedbackI18n)
- useEffect on [currentNodeId, locale] — cancel any in-flight
  utterance then speak the new text. Pass speaker="client" while
  speaking so the avatar's mouth animates (already wired through
  SceneCanvas.setSpeaker).
- ProctorPanel status uses isSpeaking to show "Speaking..." instead
  of "Ready". The MicPulse subtitle in ProctorPanel is replaced by
  a TTS indicator (small wave glyph, no click).

### Acceptance for Phase 2

- No mic anywhere in the simulation view.
- On scenario start, the assistant speaks the intro text within
  300 ms, mouth animates, ProctorPanel shows "Speaking..."
- Changing language mid-scenario cancels current speech and re-speaks
  the new locale.
- Leaving the simulation cancels speech (no orphaned audio).
- App still works when speechSynthesis is missing — silent fallback,
  no errors logged.

---

## Phase 3 — User Stats HUD

Goal: a persistent stats strip at the top of the screen showing real
numbers. Visible across simulation and modules views.

### State additions in useAppStore

Add to initialState:
- totalXp: 0
- correctAnswers: 0
- totalAnswers: 0
- completedScenarios: [] (array of scenarioId strings)

XP rule: each scenario node choice carries `points`. On pickChoice, add
the earned points to totalXp. correctAnswers++ when earned === best
possible for that node. totalAnswers++ on every choice. completedScenarios
is appended on debrief entry (when nextNode.kind === "end") if not
already present.

Reset rule: exitToRoleSelection resets totalXp, correctAnswers,
totalAnswers, completedScenarios (same as current "...initialState"
wipe). startModule does NOT reset them (stats persist across modules
within a session).

### New component: components/hud/UserStatsBar.jsx

A horizontal pill bar, fixed top-right when on simulation/modules views,
showing four chips:
- Score — current scenario score / max. Updates live as pickChoice fires.
- XP — totalXp, integer, animated count-up when it changes.
- Accuracy — round((correctAnswers / max(1, totalAnswers)) * 100) + "%"
- Progress — completedScenarios.length + "/" + totalScenarios where
  totalScenarios is the count of pillarId's modules with a scenarioId
  (read from PILLARS).

Styling follows the existing HudPanel "white" tone, 3 px line, rounded
pill, plush-tiny shadow. No emojis.

### Mount points

- ModulesDashboardPage: top-right, below the language switcher.
- AmlSimulationView: top-right, replacing the empty space next to
  LanguageSwitcher in the TopBar row.

UserStatsBar is the SINGLE source of stats. Do not duplicate the score
display in ProctorPanel or elsewhere.

### Acceptance for Phase 3

- Stats bar visible on modules and simulation views.
- Picking a choice updates Score, XP, Accuracy chips within a frame.
- Finishing a scenario increments Progress by exactly 1; replaying
  the same scenario does NOT double-count.
- Exit to role-selection zeroes all stats.

---

## Phase 4 — Realistic Case Development (Research-Backed)

Goal: rewrite the THREE anchor scenarios (AML suspicious transaction,
Cyber phishing, Fraud mule) into full case studies. Customer Experience
is left as-is for this phase (one less translation churn) and queued for
Phase 4.5.

Each rewritten scenario gains a **case context** node — a 4-5 sentence
realistic story BEFORE the indicators panel. This is the "Context-First"
mandate from the user's brief.

### Data shape change

Add a new node kind: "context". A context node sits between "intro" and
"inspect". It carries:
- caseContextI18n — full multi-paragraph story (rendered as a
  scrollable card centered on the screen).
- whatYouSeeI18n — bullet list of observable facts (3-4 bullets).
- whatYouHearI18n — bullet list of what the client said / wrote
  verbatim (2-3 bullets).
- ctaI18n — "Begin analysis" button → advances to inspect.

The screen content during a context node shows the underlying CRM
dashboard but slightly dimmed and unfocused. The context card overlays.

### Per-scenario content (Uzbek bank-grade, authored in uz first)

Each story below is the SKELETON. The author fills the i18n files with
the real prose during build. All policy codes are real Uzbekistan
references from the existing scenario data (kept consistent — do not
invent new codes).

#### AML — Suspicious Transaction (rewrite)

Setting: Tashkent-1 branch, 09:14 on a Tuesday. The trainee is the
on-duty teller. A new Premium client (43 days) walks up with a duffel
bag of cash — 187 mln soum. He is sweating, repeatedly glances at the
door, says "tezroq, samolyotga ulgurish kerak" (faster, I need to make
my flight). He has NO source document.

What you see (3 bullets):
- Cash count: 187 mln soum in 100k notes, banded.
- AML algorithm score: 74 (yellow/high), velocity above peer median.
- KYC file: account opened 43 days ago, no business income recorded.

What you hear (2 bullets):
- "Just take the cash, I will bring the contract tomorrow."
- "I am Premium — you do not need to ask."

Then the indicators panel. Choices stay the same (fileSar +10,
escalate +6, release 0). Add a new tipping-off choice ("Tell him he is
on the SAR list") worth -5 with a hard fail end node — surfaces the
AML §7.1 lesson. This was hinted at in the original file but never
implemented.

#### Cyber — Phishing email triage (rewrite)

Setting: IB monitoring console, 11:02 Friday. The trainee is a junior
SOC analyst on first-week shift. An email from
"secure@bank-secure-uz.help" arrives, marked DMARC fail, with an
invoice.exe attachment. The display name reads "OOQ Bank Compliance".

What you see (3 bullets):
- Sender domain bank-secure-uz.help — 3 days old (WHOIS).
- Attachment invoice.exe (icon spoofed as PDF).
- Link http://bank-secure-uz.help/verify — no HTTPS.

What you hear (the email body, 2 verbatim lines):
- "Hisobingiz 30 daqiqa ichida bloklanadi. Tasdiqlash uchun bosing."
- "Bu xat OOQ Bank Compliance dan rasmiy ogohlantirishdir."

Choices kept: reportSoc +10, quarantine +6, reply 0 (hard fail).

#### Fraud — Mule account (rewrite)

Setting: Fraud monitor dashboard, 09:40 Wednesday. Trainee is the
duty fraud analyst. Account 20214...7711 (opened 11 days ago) shows
14 inbound transfers of 50-300k UZS over 30 minutes, immediately
forwarded to an external card.

What you see (3 bullets):
- Inbound: 14 transfers, 50-300k each, from 11 distinct accounts.
- Outbound: a single 1.8 mln UZS card top-up to a foreign-issued card.
- Account age: 11 days, holder Sherzod Yusupov, ID 30412840190008.

What you hear (no client interaction — system-detected, 2 bullets):
- AI velocity score 9.4x.
- KYC interview from account opening: holder declared "no business
  activity, account for salary only".

Choices kept: freeze +10, escalate +6, monitor 0 (hard fail).

### i18n authoring rules

- All new content is authored in uz.js first (primary).
- ru.js and uz_cyrl.js get verbatim-meaning translations — NOT
  machine-translated; the same level of bank-specific terminology must
  survive. (Translator is the user or a delegated reviewer; assistant
  produces draft, human signs off.)
- New i18n keys live under each pillar's namespace:
  amlScenario.caseContext, amlScenario.whatYouSee[],
  amlScenario.whatYouHear[]. Same shape for cyberScenario and
  fraudScenario.

### Acceptance for Phase 4

- All three pillars open with the context card before the indicators
  panel.
- TTS reads the case context aloud (Phase 2 wiring extends to context
  nodes — already specified there).
- Each scenario shows at least 3 specific named facts (account
  numbers, policy codes, timestamps) in the context node.
- Tipping-off lure exists in AML and dead-ends a hard fail with
  AML §7.1 in the feedback.

---

## Sequencing and Gates

Phase 1 lands first (highest visual impact, isolated to three.js).
Phase 2 second (removes UI clutter, sets up the spoken context for
Phase 4). Phase 3 third (independent, low-risk). Phase 4 last (depends
on Phase 2's TTS wiring and adds the most new content).

Each phase ends with:
- /plan-review with the plan reviewer agent against the phase
  acceptance list.
- /tdd cycle for store mutations, the speech service, and stats math.
  Three.js geometry changes are validated by a manual screenshot
  check — not unit-tested.
- /review against this plan file before merge.

## Anti-Patterns (do not do)

- Do not import a new GLTF rig — the existing procedural avatar with
  Phase 1 fixes is sufficient and avoids a 5-10 MB asset.
- Do not add a third-party TTS provider (ElevenLabs, etc.). Browser
  speechSynthesis is the user's explicit requirement.
- Do not regenerate uz_cyrl.js by transliteration — the project
  already has a curated cyrillic file; new content is authored, not
  machine-converted.
- Do not commit the rewritten scenarios with English placeholder text
  in the uz keys. Author uz first, then ru, then uz_cyrl.
