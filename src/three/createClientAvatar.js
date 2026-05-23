import * as THREE from 'three';

/**
 * Procedural client avatar, Medkit-cozy style.
 *
 * Orientation contract (very important — past versions rendered the legs
 * tipping forward which read as "head where the feet should be" from the
 * default camera angle):
 *
 *   • Group origin sits on the floor (y = 0).
 *   • Local +Y is up. Local +Z points toward the camera (toward the desk).
 *   • The chair seat is at y ≈ 0.50.
 *   • Hips/torso pivot at y ≈ 1.05.
 *   • Head pivot at y ≈ 1.72.
 *   • Legs drop from the seat toward the floor in front of the chair —
 *     thighs extend forward (+Z) and shins drop down (-Y). They are NOT
 *     a single tilted cylinder anymore; that earlier shape kept reading
 *     as the body being inverted on certain camera tilts.
 *
 * Everything is parented to `group`. Animation handles in `userData`
 * are stable across rebuilds so OfficeScene's tick loop keeps working.
 */

const MOODS = {
  angry: { suit: 0xf47a92, accent: 0xffb3c0, emissive: 0x7a1d2c },
  neutral: { suit: 0x5ab7f2, accent: 0xa6d8ff, emissive: 0x1d4e7a },
  calm: { suit: 0xf5b73d, accent: 0xffd86b, emissive: 0x7a5a18 },
  satisfied: { suit: 0x5fcfa0, accent: 0xa8e5c8, emissive: 0x2a6b4f },
};

const SKIN = 0xf2c5a4;
const SKIN_SHADOW = 0xd99b78;
const HAIR = 0x2b1e16;
const SHOE = 0x1f140d;

export function createClientAvatar(scene) {
  const group = new THREE.Group();
  group.name = 'Client';
  group.userData.hotspot = 'client';
  group.position.set(0, 0, -2.4);

  const suitMat = new THREE.MeshStandardMaterial({
    color: MOODS.neutral.suit,
    roughness: 0.6,
    emissive: 0x000000,
    emissiveIntensity: 0,
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: SKIN,
    roughness: 0.5,
    emissive: 0xff6b6b,
    emissiveIntensity: 0.04,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: HAIR,
    roughness: 0.85,
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: SHOE,
    roughness: 0.7,
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xfff6e6,
    roughness: 0.5,
  });
  const trouserMat = new THREE.MeshStandardMaterial({
    color: 0x2b1e16,
    roughness: 0.7,
  });

  // ──────── Chair ────────
  const chair = buildChair();
  chair.position.set(0, 0, -0.18);
  group.add(chair);

  // ──────── Hips (anchor for legs + torso) ────────
  const hips = new THREE.Group();
  hips.position.set(0, 1.05, 0.0);
  group.add(hips);

  // Torso — capsule, perfectly upright.
  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.30, 0.55, 6, 16),
    suitMat,
  );
  torso.position.set(0, 0.32, 0); // hips-relative
  torso.castShadow = true;
  hips.add(torso);

  // Shirt + tie — the Vee under the collar.
  const collar = new THREE.Mesh(
    new THREE.ConeGeometry(0.17, 0.18, 16),
    shirtMat,
  );
  collar.position.set(0, 0.60, 0.16);
  collar.rotation.x = Math.PI; // wide-end up, point at the throat
  hips.add(collar);

  const tie = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.30, 0.03),
    new THREE.MeshStandardMaterial({ color: 0xff8e5c, roughness: 0.5 }),
  );
  tie.position.set(0, 0.45, 0.21);
  hips.add(tie);

  // ──────── Head + face ────────
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.72, 0); // hips-relative → world ~1.77
  hips.add(headGroup);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 28, 22),
    skinMat,
  );
  head.castShadow = true;
  headGroup.add(head);

  // Hair cap — half sphere just on top.
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.235, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2),
    hairMat,
  );
  hairCap.position.set(0, 0.02, -0.01);
  headGroup.add(hairCap);

  // Ears — tiny spheres.
  const earGeo = new THREE.SphereGeometry(0.04, 12, 10);
  const earL = new THREE.Mesh(earGeo, skinMat);
  earL.position.set(-0.22, -0.02, 0);
  headGroup.add(earL);
  const earR = new THREE.Mesh(earGeo, skinMat);
  earR.position.set(0.22, -0.02, 0);
  headGroup.add(earR);

  // Eyes: white sclera + dark iris, makes the face feel alive.
  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
  });
  const eyeWhiteGeo = new THREE.SphereGeometry(0.038, 14, 12);
  const eyeWhiteL = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
  eyeWhiteL.position.set(-0.075, 0.025, 0.19);
  headGroup.add(eyeWhiteL);
  const eyeWhiteR = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
  eyeWhiteR.position.set(0.075, 0.025, 0.19);
  headGroup.add(eyeWhiteR);

  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x2b1e16,
    roughness: 0.2,
  });
  const irisGeo = new THREE.SphereGeometry(0.018, 10, 8);
  const irisL = new THREE.Mesh(irisGeo, irisMat);
  irisL.position.set(-0.075, 0.025, 0.218);
  headGroup.add(irisL);
  const irisR = new THREE.Mesh(irisGeo, irisMat);
  irisR.position.set(0.075, 0.025, 0.218);
  headGroup.add(irisR);

  // Eyelids — used by the blink animation. Sit flush against the eye
  // whites, scale-Y up to close.
  const lidMat = new THREE.MeshStandardMaterial({
    color: SKIN_SHADOW,
    roughness: 0.5,
  });
  const lidGeo = new THREE.PlaneGeometry(0.085, 0.04);
  const lidL = new THREE.Mesh(lidGeo, lidMat);
  lidL.position.set(-0.075, 0.025, 0.222);
  lidL.scale.y = 0;
  headGroup.add(lidL);
  const lidR = new THREE.Mesh(lidGeo, lidMat);
  lidR.position.set(0.075, 0.025, 0.222);
  lidR.scale.y = 0;
  headGroup.add(lidR);

  // Eyebrows — short flat boxes above the eyes.
  const browMat = new THREE.MeshStandardMaterial({ color: HAIR });
  const browGeo = new THREE.BoxGeometry(0.06, 0.012, 0.012);
  const browL = new THREE.Mesh(browGeo, browMat);
  browL.position.set(-0.075, 0.085, 0.215);
  browL.rotation.z = 0.12;
  headGroup.add(browL);
  const browR = new THREE.Mesh(browGeo, browMat);
  browR.position.set(0.075, 0.085, 0.215);
  browR.rotation.z = -0.12;
  headGroup.add(browR);

  // Cheek blush — small flat ellipses giving the cozy-cartoon vibe.
  const blushMat = new THREE.MeshStandardMaterial({
    color: 0xff9aa2,
    transparent: true,
    opacity: 0.55,
    roughness: 0.6,
  });
  const blushGeo = new THREE.CircleGeometry(0.04, 16);
  const blushL = new THREE.Mesh(blushGeo, blushMat);
  blushL.position.set(-0.115, -0.04, 0.205);
  headGroup.add(blushL);
  const blushR = new THREE.Mesh(blushGeo, blushMat);
  blushR.position.set(0.115, -0.04, 0.205);
  headGroup.add(blushR);

  // Mouth — a thin torus segment makes a smile on the front of the
  // head. Mouth opens by scaling the y axis during speech.
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0x7c2d12,
    roughness: 0.5,
  });
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.05, 0.011, 8, 18, Math.PI),
    mouthMat,
  );
  mouth.position.set(0, -0.085, 0.21);
  mouth.rotation.z = Math.PI; // smile (open arc downward)
  headGroup.add(mouth);

  // ──────── Arms ────────
  const armUpperGeo = new THREE.CapsuleGeometry(0.075, 0.30, 4, 12);
  const armLowerGeo = new THREE.CapsuleGeometry(0.07, 0.28, 4, 12);

  // Arms hang at the sides, forearms folded forward onto the lap.
  const armL = new THREE.Mesh(armUpperGeo, suitMat);
  armL.position.set(-0.36, 0.40, 0.02);
  armL.rotation.z = 0.18;
  armL.castShadow = true;
  hips.add(armL);

  const forearmL = new THREE.Mesh(armLowerGeo, suitMat);
  forearmL.position.set(-0.30, 0.18, 0.20);
  forearmL.rotation.x = -Math.PI / 2.2;
  forearmL.castShadow = true;
  hips.add(forearmL);

  const armR = new THREE.Mesh(armUpperGeo, suitMat);
  armR.position.set(0.36, 0.40, 0.02);
  armR.rotation.z = -0.18;
  armR.castShadow = true;
  hips.add(armR);

  const forearmR = new THREE.Mesh(armLowerGeo, suitMat);
  forearmR.position.set(0.30, 0.18, 0.20);
  forearmR.rotation.x = -Math.PI / 2.2;
  forearmR.castShadow = true;
  hips.add(forearmR);

  // Hands — small skin-colored spheres at the end of each forearm.
  const handGeo = new THREE.SphereGeometry(0.075, 14, 12);
  const handL = new THREE.Mesh(handGeo, skinMat);
  handL.position.set(-0.18, 0.10, 0.36);
  hips.add(handL);
  const handR = new THREE.Mesh(handGeo, skinMat);
  handR.position.set(0.18, 0.10, 0.36);
  hips.add(handR);

  // ──────── Legs (sitting, knees pointing forward toward camera) ────────
  // Two segments per leg: thigh (horizontal, +Z) and shin (vertical, -Y).
  // This reads correctly as a person sitting in a chair from every angle.

  const thighGeo = new THREE.CapsuleGeometry(0.09, 0.32, 4, 12);
  const shinGeo = new THREE.CapsuleGeometry(0.085, 0.34, 4, 12);

  const thighL = new THREE.Mesh(thighGeo, trouserMat);
  thighL.position.set(-0.14, 0.50, 0.20);
  thighL.rotation.x = Math.PI / 2; // lie flat, along +Z
  thighL.castShadow = true;
  group.add(thighL);

  const thighR = new THREE.Mesh(thighGeo, trouserMat);
  thighR.position.set(0.14, 0.50, 0.20);
  thighR.rotation.x = Math.PI / 2;
  thighR.castShadow = true;
  group.add(thighR);

  const shinL = new THREE.Mesh(shinGeo, trouserMat);
  shinL.position.set(-0.14, 0.27, 0.36);
  // Default capsule axis is Y — leave it; shins drop straight down.
  shinL.castShadow = true;
  group.add(shinL);

  const shinR = new THREE.Mesh(shinGeo, trouserMat);
  shinR.position.set(0.14, 0.27, 0.36);
  shinR.castShadow = true;
  group.add(shinR);

  // Shoes — flat slabs at the floor.
  const shoeGeo = new THREE.BoxGeometry(0.16, 0.06, 0.22);
  const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
  shoeL.position.set(-0.14, 0.06, 0.42);
  shoeL.castShadow = true;
  group.add(shoeL);
  const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
  shoeR.position.set(0.14, 0.06, 0.42);
  shoeR.castShadow = true;
  group.add(shoeR);

  // ──────── Animation handles ────────
  group.userData.hips = hips;
  group.userData.head = headGroup;
  group.userData.headBase = headGroup.position.clone(); // anchor for the bob
  group.userData.mouth = mouth;
  group.userData.eyelids = [lidL, lidR];
  group.userData.brows = [browL, browR];
  group.userData.suitMat = suitMat;
  group.userData.mood = 'neutral';
  group.userData.speakingAmp = 0;
  group.userData.nextBlink = 1.5 + Math.random() * 2;
  group.userData.blinkPhase = 0;
  group.userData.nextGlance = 4 + Math.random() * 3;
  group.userData.glancePhase = 0;
  group.userData.glanceDir = 1;

  setMood(group, 'neutral');

  scene.add(group);

  // Sanity assertion — fail loudly if a future edit flips the avatar.
  // Head pivot (world y) must be higher than hips pivot (world y).
  // Runs in dev only via the Vite env flag.
  if (import.meta.env?.DEV) {
    group.updateMatrixWorld(true);
    const headY = new THREE.Vector3()
      .setFromMatrixPosition(headGroup.matrixWorld)
      .y;
    const hipsY = new THREE.Vector3()
      .setFromMatrixPosition(hips.matrixWorld)
      .y;
    if (!(headY > hipsY)) {
      // eslint-disable-next-line no-console
      console.warn(
        '[client-avatar] head is not above hips — orientation regression',
        { headY, hipsY },
      );
    }
  }

  return group;
}

export function setMood(client, mood) {
  if (!client) return;
  const m = MOODS[mood] ?? MOODS.neutral;
  client.userData.mood = mood;
  const suitMat = client.userData.suitMat;
  if (!suitMat) return;
  suitMat.color.setHex(m.suit);
  suitMat.emissive.setHex(m.emissive);
  suitMat.emissiveIntensity = mood === 'angry' ? 0.16 : 0.06;
}

/**
 * Per-frame animation — call from the render loop.
 *
 *   • Idle: gentle head sway and a slow breath on the shoulders.
 *   • Blink: every 2.5–5.5 s, fast eyelid closure.
 *   • Glance: every 4–7 s, the head tracks left or right for ~1 s.
 *   • Speaking: when `speakingFor === 'client'`, mouth opens, head
 *     leans forward.
 */
export function updateClient(client, dt, elapsed, { speakingFor } = {}) {
  if (!client) return;
  const hips = client.userData.hips;
  const head = client.userData.head;
  const mouth = client.userData.mouth;
  const eyelids = client.userData.eyelids;

  const isSpeaking = speakingFor === 'client';
  const targetAmp = isSpeaking ? 1 : 0;
  client.userData.speakingAmp +=
    (targetAmp - client.userData.speakingAmp) * Math.min(1, dt * 6);

  const amp = client.userData.speakingAmp;

  // Breathing in the shoulders — subtle vertical scale on the hips.
  if (hips) {
    const breath = 1 + Math.sin(elapsed * 1.4) * 0.012 + amp * 0.01;
    hips.scale.set(1, breath, 1);
  }

  // Head sway + glance.
  client.userData.nextGlance -= dt;
  if (client.userData.nextGlance <= 0 && client.userData.glancePhase <= 0) {
    client.userData.glancePhase = 1.0;
    client.userData.nextGlance = 5 + Math.random() * 4;
    client.userData.glanceDir = Math.random() > 0.5 ? 1 : -1;
  }
  let glanceX = 0;
  if (client.userData.glancePhase > 0) {
    const g = client.userData.glancePhase;
    // Bell curve: peaks at phase 0.5
    const v = Math.sin((1 - g) * Math.PI);
    glanceX = client.userData.glanceDir * v * 0.25;
    client.userData.glancePhase = Math.max(0, g - dt);
  }

  if (head) {
    head.rotation.y =
      glanceX + Math.sin(elapsed * 0.6) * (0.03 + amp * 0.06);
    head.rotation.x =
      Math.sin(elapsed * 1.1) * (0.015 + amp * 0.03) + amp * 0.1;
    // Bob and lean RELATIVE to the head's resting position — the
    // earlier version wrote `position.y = sin(...)` which clobbered
    // the 0.72 anchor and dropped the head down to the hips.
    const base = client.userData.headBase;
    if (base) {
      head.position.set(
        base.x,
        base.y + Math.sin(elapsed * 1.6) * 0.004,
        base.z + amp * 0.05,
      );
    }
  }

  if (mouth) {
    const mouthOpen = isSpeaking
      ? 1 + Math.abs(Math.sin(elapsed * 11)) * 2.4
      : 1;
    mouth.scale.y = mouthOpen;
  }

  // Blink.
  client.userData.nextBlink -= dt;
  if (client.userData.nextBlink <= 0 && client.userData.blinkPhase <= 0) {
    client.userData.blinkPhase = 0.18;
    client.userData.nextBlink = 2.5 + Math.random() * 3;
  }
  if (client.userData.blinkPhase > 0) {
    const p = client.userData.blinkPhase;
    const v = p > 0.09 ? (0.18 - p) / 0.09 : p / 0.09;
    if (eyelids) {
      eyelids[0].scale.y = v * 1.8;
      eyelids[1].scale.y = v * 1.8;
    }
    client.userData.blinkPhase = Math.max(0, p - dt);
  } else if (eyelids) {
    eyelids[0].scale.y = 0;
    eyelids[1].scale.y = 0;
  }
}

function buildChair() {
  const chair = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({
    color: 0x2b1e16,
    roughness: 0.6,
  });
  const cushion = new THREE.MeshStandardMaterial({
    color: 0x6b4f3f,
    roughness: 0.75,
  });

  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.10, 0.62),
    cushion,
  );
  seat.position.set(0, 0.52, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);

  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.85, 0.08),
    cushion,
  );
  back.position.set(0, 0.97, -0.27);
  back.castShadow = true;
  chair.add(back);

  // Wood frame around the cushion.
  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.04, 0.66),
    wood,
  );
  trim.position.set(0, 0.48, 0);
  chair.add(trim);

  // Pedestal post.
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.46, 12),
    wood,
  );
  post.position.set(0, 0.24, 0);
  chair.add(post);

  // Five-star base.
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.04, 24),
    wood,
  );
  base.position.set(0, 0.04, 0);
  chair.add(base);

  return chair;
}
