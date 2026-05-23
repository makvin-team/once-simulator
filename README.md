# AI Mentor — Bank Training Simulator

A high-fidelity prototype of a 3D virtual training platform for bank employees. Combines a Three.js office environment with a Medkit-style conversational AI overlay. UI text is in Uzbek; code identifiers are in English.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build      # production bundle
npm run preview    # preview the build
```

## Architecture

```
src/
  main.jsx                  React bootstrap
  App.jsx                   Top-level view router (Dashboard | Simulation | Report)
  index.css                 Tailwind + small utility classes
  state/useAppStore.js      Zustand store (view, scenario, history, score, tips)
  data/
    translations.js         Uzbek UI strings
    scenarios/
      index.js              Registry of all scenarios
      clientService.js      Scenario A graph (client roleplay)
      antiFraud.js          Scenario B graph (phishing / deepfake)
      productivity.js       Scenario C graph (Excel + AI)
  three/
    OfficeScene.js          Scene controller, render loop, dispose
    lighting.js             Ambient + key + accent lighting
    createRoom.js           Floor, walls, ceiling, window, branding panel
    createDesk.js           Desk + legs + drawer
    createComputer.js       Monitor, stand, keyboard, mouse
    createClientAvatar.js   Low-poly seated client with chair
    createDocumentFolder.js Folder, paper, label
    createProps.js          Plant, bookshelf, mug
    interaction.js          Raycaster-based hotspot picking
  components/
    Dashboard.jsx           Scenario selection grid
    SimulationView.jsx      3D + chat overlay shell
    SceneCanvas.jsx         Three.js mount + 2D hotspot markers
    ChatOverlay.jsx         Medkit-style chat panel
    TypingMessage.jsx       Character-by-character typing effect
    MicButton.jsx           Pulsing microphone (simulated)
    ChoiceOptions.jsx       Multiple-choice answers
    EvidencePanel.jsx       In-chat evidence (phishing email, analysis)
    PerformanceReport.jsx   Score ring + tips at scenario end
```

## Scenarios

| ID              | Title                          | Hotspot   |
| --------------- | ------------------------------ | --------- |
| clientService   | Mijozga xizmat koʻrsatish      | Client    |
| antiFraud       | Firibgarlikka qarshi           | Computer  |
| productivity    | Mahsuldorlik AI bilan          | Folder    |

Each scenario is a directed graph of dialogue nodes with multiple-choice transitions. Choices have point weights; the report shows percentage and targeted tips.

## Content Constraints

The simulator strictly avoids loans (qarz), interest (foiz), and conventional insurance. Scenarios focus on:

- Customer service etiquette
- Operational security (phishing, deepfake, social engineering)
- Internal policy navigation
- Productivity skills (Excel, Power Query, AI prompting)

## Controls

- **Click** scenario cards on the dashboard to start
- **Click** hotspot markers in the 3D scene to switch scenarios
- **Esc** exits to the dashboard
- **Microphone button** simulates listening (no real STT — visual only)

## Tech

- React 18 + Vite
- Three.js (raw, no helpers — pure ES module)
- Tailwind CSS
- Framer Motion (UI transitions)
- Zustand (state)

## Notes

- Hotspots are dual: 3D raycasting in `interaction.js` plus 2D pulse markers in `SceneCanvas.jsx` so they remain discoverable from any camera position.
- All scenarios are self-contained data; adding a new one means: drop a `*.js` file in `data/scenarios/`, register it in `index.js`, add labels to `translations.js`.
