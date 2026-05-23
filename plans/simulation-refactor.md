# Plan: Simulation Refactor

Single source of truth for the AI Mentor simulation overhaul.
No code blocks. One plan per feature. Always up to date.

## Mission

Take the partially built AML bank-training simulation and bring it to the
"Medkit-quality" bar the user described: the 3D humanoid client is always
visible, decisions render reliably, language switching is live, and every
visible module reaches a working end-state.

## Confirmed Bugs and Their Root Causes

### B1. Missing options after the alert popup

When the user clicks "Open" on the NotificationToast, the store calls
`openInspector()`. That only flips `inspectorOpen` to true; it does not
change `currentNodeId`. The current node is still `alert` (notification
kind). The TransactionDetailsPanel is gated by
`node.kind === 'inspect'`, so it stays null. Result: the user clicks the
CTA, the toast disappears, and nothing replaces it. This is the user's
"missing options" and "lost steps" report.

Fix: replace the open-inspector handshake with a node advance. The
alert node already has a `choices` array carrying `nextNodeId: 'inspect'`.
The CTA dispatches `pickChoice(alertNode.choices[0])` (or a new
`advanceTo(nextNodeId)` action), which advances `currentNodeId` to
`inspect` and toggles `inspectorOpen` via the `advance` reducer's
existing branch for `inspect` kinds.

### B2. Inspector cannot be reopened

Once the user presses the close button in TransactionDetailsPanel,
`closeInspector` sets `inspectorOpen: false` while `currentNodeId` is
still `inspect`. The hotspot-select handler only opens the inspector
when `node.kind === 'notification'`. Result: the panel is unrecoverable.

Fix: remove the close button on inspect nodes, OR allow the hotspot
handler to reopen the inspector whenever `node.kind === 'inspect'`.
The user is expected to choose an option, not dismiss the screen.

### B3. Localization failure for screen content

The 3D monitor renders content via canvas texture. The content payload
lives on the scenario nodes (e.g. `screen: { type: 'analysis', items:
[...] }`) and contains hardcoded Uzbek strings. AmlSimulationView memoises
`screenContent` on `[node, scenario]`, neither of which changes when
`locale` changes. Result: language switch has no effect on the monitor.

Fix: rewrite screen content as i18n key references rather than raw
strings, and recompute the screen content on every locale change.
Specifically: extend the `screen` object to use `itemsI18n`, `clientI18n`,
`cardsI18n` keys; resolve them via `useT()` at render time; add `locale`
to the `screenContent` memo dependencies.

ScreenRenderer itself contains hardcoded Uzbek strings inside
`drawBoot`, `drawIdle`, `drawDashboard`, and other variants. Those need
to accept optional copy from the `content` payload and fall back to
nothing when not provided. The taskbar wordmark `AI MENTOR · Bank ish
stansiyasi` becomes a content-driven label.

### B4. Text-duplication/oscillation on the monitor

`drawAnalysis` computes `visible = Math.min(items.length,
Math.floor(t * 1.4) % (items.length + 2) || items.length)`. As `t`
grows, this oscillates between 0 and items.length; when it hits 0 it
falls through the `||` to `items.length`. The list pops in one at a
time, then resets and pops in again. This is the user's "appearing
multiple times" report. The reset loop is a bug, not a feature.

Fix: increment `visible` monotonically toward `items.length` and stop.
Remove the modulo. When `c.allVisible` is set, render all immediately.

### B5. Client avatar disappears when the alert pops

The CAMERA_VIEWS for `computer` (and `folder`) frame those props
exclusively; the client sits at z=-2.4 and is off-screen. When the alert
node sets `activeHotspot='computer'`, AmlSimulationView calls
`setView('computer')` and the client is no longer visible. The
TransactionDetailsPanel also draws a 42% opaque overlay across the
entire scene, blurring the background and effectively hiding the client.

Fix: stop zooming to the computer hotspot. The overview view already
frames both client and monitor. Make the inspector a side panel rather
than a centered modal, so the 3D client remains visible behind it.
Optionally darken only the background outside the panel column.

### B6. Dead components and stale imports

`src/components/SimulationView.jsx`, `Dashboard.jsx`, `ChatOverlay.jsx`,
`KnowledgeAssistant.jsx`, `CharacterPortrait.jsx`, `ClientBriefCard.jsx`,
`ChoiceOptions.jsx`, `EvidencePanel.jsx`, `MicButton.jsx`,
`TypingMessage.jsx`, `VoiceWaveform.jsx`, and `PerformanceReport.jsx`
all reference store actions (`exitToDashboard`, `startScenario`,
`setRole`, `roleId`) that no longer exist. None of them are imported by
the active router (`App.jsx`). They are dead code and will confuse any
new contributor.

The flat translations file `src/data/translations.js` is only consumed
by the dead components and the SceneCanvas hotspot-label table.
SceneCanvas needs to be migrated to `useT()` from `src/i18n/`.

Fix: delete the dead components, delete the flat translations file,
migrate SceneCanvas hotspot labels to the new i18n tree.

### B7. Locked modules render as visible but disabled tiles

Phase 3 of the user's brief says: do not leave broken UI elements
visible. Currently the modules dashboard shows 4 locked + 1 playable
tile for AML, and 5 locked tiles for cyber/fraud/cx. The locked tiles
have no scenario and can never be played.

Fix: render only playable modules. The plan is to (a) implement one
real scenario per pillar (B8) so each pillar has at least one playable
tile, and (b) drop the locked tiles entirely from the dashboard.

### B8. Only AML has a wired scenario

Phase 3 explicitly asks for at least one working path per pillar.
Currently the seven other scenario files (`clientService`, `antiFraud`,
`deepfakeCall`, `amlRedFlags`, `fakeDocument`, `socialEngineering`,
`productivity`) exist but use the old node shape and are not wired to
any module. The pillars (`cyber`, `fraud`, `cx`) have no playable modules.

Fix: write three additional minimal scenarios using the new node shape
(`proctor` → `notification` → `inspect` → `end`) — one per missing
pillar. Wire each to its pillar's first module. Audit the seven legacy
scenario files; if they don't conform to the new shape, exclude them
from the registry. Keep the data files for future reuse.

## Out of Scope

- Audio synthesis / TTS. The Mic button stays simulated.
- Loading an external GLTF humanoid. The procedural avatar is upgraded
  in place. Justification: pulling in `@react-three/fiber`,
  `@react-three/drei`, and a GLTF asset is a heavy addition for a
  single-character scene that already animates. The existing avatar
  has blinking, breathing, lip-sync, and mood-driven materials —
  enough to feel alive once the camera keeps it on-screen. The user's
  brief gave explicit license: "GLTF humanoid model (or a high-quality
  representative model)".
- Persistent user accounts / progress saves beyond the existing locale
  localStorage entry.

## File-by-File Change List

### Delete

- `src/components/SimulationView.jsx`
- `src/components/Dashboard.jsx`
- `src/components/ChatOverlay.jsx`
- `src/components/KnowledgeAssistant.jsx`
- `src/components/CharacterPortrait.jsx`
- `src/components/ClientBriefCard.jsx`
- `src/components/ChoiceOptions.jsx`
- `src/components/EvidencePanel.jsx`
- `src/components/MicButton.jsx`
- `src/components/TypingMessage.jsx`
- `src/components/VoiceWaveform.jsx`
- `src/components/PerformanceReport.jsx`
- `src/data/translations.js`
- `src/data/knowledgeBase.js`

The `src/components/ui/` directory stays — its primitives (Button,
Card, Chip, etc.) are used inside the deleted files but also have
clean shapes. Audit after deletion: any unreferenced ui primitive may
also be deleted to keep `/components/ui/` tight. Tailwind config will
need to drop entries only if they become orphaned.

### Modify

- `src/state/useAppStore.js`
  - Add `advanceTo(nodeId)` action that resolves the node and applies
    the same kind-aware side effects as `advance`. Used by the
    NotificationToast CTA so the click advances rather than just
    opening the inspector.
  - `pickChoice` and `advance` already handle the node-kind branching;
    no logic change there.
  - Add `reopenInspector` action that requires the current node be
    `inspect` before flipping `inspectorOpen` back on. Wired into the
    SceneCanvas hotspot click for the computer.
  - Keep `closeInspector` only for the END node case (or remove
    entirely — the close button leaves on inspect nodes).

- `src/features/simulation/AmlSimulationView.jsx`
  - Stop forwarding `activeHotspot='computer'` to SceneCanvas when the
    node is `notification` or `inspect`. The camera stays at overview
    so the client remains in frame.
  - When NotificationToast fires onCta, dispatch
    `advanceTo(alertNode.choices[0].nextNodeId)` rather than
    `openInspector`.
  - When the SceneCanvas reports a hotspot click on `computer`,
    dispatch `reopenInspector` if `node.kind === 'inspect'`, else
    advance per the notification logic above.
  - Pass `screenContentForLocale(scenario, node, t)` to SceneCanvas
    instead of the raw `node.screen` — this helper resolves i18n
    references inside the content payload.

- `src/three/OfficeScene.js`
  - Replace per-hotspot zoom views with a single cinematic overview.
    Keep `setView` for graceful camera animation but call it only for
    `overview`.
  - Reduce the dolly-in on the speaking client; the existing parallax
    and breath are enough.
  - Confirm shadow casting on the client torso/head and chair.

- `src/three/createClientAvatar.js`
  - Replace the cylinder torso with a smoother capsule. Replace the
    plane mouth/eyelids with small spheres so the silhouette reads as
    a person and not a stack of cylinders.
  - Add subtle hand props (folded hands on lap) so the client looks
    like they are waiting for service.
  - Expand the idle animation: occasional looks left/right, gentle
    sway, periodic glances at the monitor.
  - Tighten the mood palette — current angry-red is too saturated.

- `src/three/lighting.js`
  - Add a soft fill key on the client's face. The peach/mint accent
    lights are decorative but leave the face under-lit at the
    overview angle.
  - Bias shadow camera frustum to the desk+client envelope so soft
    shadows tighten under the client without bleeding.

- `src/three/ScreenRenderer.js`
  - Replace hardcoded Uzbek strings in `drawTaskbar`, `drawBoot`,
    `drawIdle`, `drawDashboard`, `drawForwarded` with values pulled
    from a `copy` object on the `content` payload. Fall back to short
    English labels when copy is missing.
  - Fix `drawAnalysis` visible-count oscillation (see B4).
  - Confirm `setContent` JSON-deep compare still works once content
    carries copy objects.

- `src/components/SceneCanvas.jsx`
  - Replace the `import { t } from '../data/translations.js'` with
    `useT()`. The hotspot-label table is rebuilt per render.
  - Stop rendering hotspot dots while the inspector is open
    (visual clutter behind the panel).
  - Verify the camera-view switching is no longer driven by
    `activeHotspot` — pass `null` from the simulation view.

- `src/components/hud/TransactionDetailsPanel.jsx`
  - Change from centered modal to a right-side panel (max-width 480px,
    inset right with comfortable margin). The 3D office stays visible
    to the left of the panel.
  - Drop the close (✕) button on inspect nodes — the only way out is
    a choice. (Keep an Exit-to-menu route via the top-bar back button.)
  - Increase whitespace between the timeline and the action grid so
    the option buttons are unmistakable.

- `src/components/hud/NotificationToast.jsx`
  - Trim the duplicated meta text ("15 sekund …") since the live
    countdown bar already communicates urgency.
  - Wire the CTA to `advanceTo` (B1).
  - Remove the secondary "Keyinroq" button (the dismiss path) — it
    causes the user to dismiss the alert with no way to reopen it.
    Force the decision: open or auto-expire.

- `src/features/modules/ModulesDashboardPage.jsx`
  - Filter `pillar.modules` to only playable. Show a small footer
    chip indicating "more modules in development" so the pillar isn't
    misrepresented as having one module total.

- `src/data/pillars.js`
  - Mark the new cyber/fraud/cx first modules as `locked: false` once
    their scenarios are wired (B8). Leave all other modules locked but
    invisible.

- `src/data/scenarios/index.js`
  - Add the three new minimal scenarios.
  - Drop legacy exports that don't match the new shape, unless we
    migrate them in this pass.

- `src/i18n/translations/uz.js`, `ru.js`, `uz_cyrl.js`
  - Add screen copy keys for the dashboard taskbar wordmark, boot
    steps, idle hero, and per-card labels referenced from
    scenarios.
  - Add full copy trees for the three new scenarios.

### Create

- `src/data/scenarios/cyberPhishingTriage.js` — cyber pillar, m1.
- `src/data/scenarios/fraudMuleAccount.js` — fraud pillar, m1.
- `src/data/scenarios/cxAddressChange.js` — cx pillar, m1.

Each scenario follows the existing `amlSuspiciousTransaction.js` shape
exactly. Each has:
  - one `proctor` intro node with autoAdvance
  - one `notification` alert node with a single CTA choice
  - one `inspect` node with three action options scored 10/6/0
  - three `end` nodes — pass / partial / fail — with feedbackI18n

## Data Shape (Strict)

Scenario file exports an object with this shape. All copy is i18n-keyed.

- id: string (matches the key in scenarios index)
- pillarId: one of aml | cyber | fraud | cx
- startNodeId: string
- scenarioTitleI18n: string (dot-path into the translation tree)
- scenarioSubtitleI18n: string
- debriefI18n: string (path to an object with title, tipsTitle, tips[])
- defaultScreen: object (see screen shape below)
- nodes: map of nodeId -> node object

Node object kinds:
  - proctor: { kind, textI18n, autoAdvance: { afterMs, toNodeId },
    screen? }
  - notification: { kind, tagI18n, titleI18n, subtitleI18n, metaI18n,
    ctaI18n, severity, screen, choices: [{ id, actionI18n,
    nextNodeId, points }] }
  - inspect: { kind, txTagI18n, clientNameI18n, clientMetaI18n,
    yourTaskI18n, taskHintI18n, timelineI18n, indicators: [...],
    choices: [{ id, actionI18n, hintI18n, tone, isPrimary?,
    nextNodeId, points }], screen? }
  - end: { kind, result: pass | partial | fail, feedbackI18n, screen? }

Screen object shape (all keys optional; renderer falls back to defaults):
  - type: dashboard | analysis | email | policy | forwarded | call | idle | boot
  - clientI18n, cardsI18n, itemsI18n, titleI18n, subtitleI18n, codeI18n,
    bodyI18n — i18n paths resolved at render time.
  - flash: boolean for one-shot pulse.

## Localization Audit Rules

- No scenario file may contain a literal Uzbek/Russian string. Only
  i18n key references.
- Every i18n key referenced in code must exist in all three locale
  files. Add a smoke check (the dev-tools warn block in `useT()`) for
  missing keys.
- The screen renderer accepts only copy objects, never raw strings.

## Camera & Lighting Spec

- Single camera framing for the entire scenario: position (0, 1.55,
  1.6), look (0, 1.45, -1.9). Subject framing: client head at upper
  third, monitor at lower-left third.
- Parallax mouse-look retained (small, dampened).
- Add a fill light at (0, 2.6, 0.2) pointing at the client, intensity
  0.45, warm cream tint. This kills the silhouette under-lighting.
- Shadow frustum tightens to a 4x4x4 box centered on the desk.

## Client Avatar Spec

- Replace cylinder torso with a SphereGeometry-derived capsule (radius
  0.34, height 0.78). Material: warm sky-blue suit (matches Medkit
  palette and contrasts with cream walls).
- Head: keep sphere; add a soft pink cheek blush via emissive.
- Eyes: small dark spheres + white sclera (currently only black). Adds
  warmth.
- Mouth: replace plane with a thin TorusGeometry segment for a
  cartoon smile when neutral.
- Hands: two small spheres positioned on lap, gently rising on
  speakingAmp.
- Idle animation: head sway every 4-6s, subtle blink every 3-5s,
  occasional shoulder shrug.

## Acceptance Checks

Each of these must be observed in the running app before the work is
called done:

1. Role-selection page loads and 4 pillars render.
2. Picking AML shows only its playable modules (no locked tiles).
3. Picking the AML m1 enters the simulation. The 3D client is visible
   at the desk. The monitor shows the default dashboard.
4. After ~2 seconds the NotificationToast slides in. The client is
   still visible behind it. The monitor switches to the analysis view.
5. Clicking the toast CTA: toast vanishes, TransactionDetailsPanel
   slides in from the right. The 3D client is still visible to the
   left of the panel. Three action buttons render.
6. Switching language while the panel is open: every piece of copy
   in the panel and on the 3D monitor updates within one frame.
7. Picking the SAR option routes to the debrief page with score 10/10
   and the correct feedback line.
8. Pressing Retry returns to the simulation in a clean state.
9. Picking cyber, fraud, or cx leads to a working first module with
   the same four-stage flow.
10. Browser devtools console is free of React warnings, dead-import
    errors, and missing i18n keys.

## Execution Order

1. Phase A — store + AmlSimulationView wiring fix (B1, B2, B5). Smallest
   surface, biggest user-visible win.
2. Phase B — screen-content i18n migration (B3, B4).
3. Phase C — TransactionDetailsPanel right-side layout (B5 finishing).
4. Phase D — client-avatar polish + lighting (Phase 4 of the user's brief).
5. Phase E — write three new scenarios (B8).
6. Phase F — hide locked modules + delete dead code (B6, B7).
7. Phase G — manual smoke test against the Acceptance Checks list.

Each phase ends with: run dev server, walk the AML flow once, confirm no
regressions before starting the next phase.
