import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Stylized procedural client — direct port of medkit-app's
 * `StylizedCharacter.tsx` to imperative Three.js.
 *
 * Key proportions (all match medkit, do not adjust without a screenshot
 * compare; small numbers compound into "robot face" perception):
 *   head       0.20 wide x 0.24 tall x 0.20 deep (RoundedBox, radius 0.08)
 *   torso      0.30 (F) / 0.38 (M) wide, 0.48 tall, 0.22 deep
 *   hips       0.34 wide, 0.14 tall, 0.24 deep
 *   neck       cyl 0.055/0.06 radius, 0.08 tall
 *   nose       cone radius 0.018, height 0.055, 6 segments (CONE is the
 *              single most important feature — a sphere reads as a nose
 *              of a different species)
 *   eyes       solid #1a1410 spheres radius 0.016 at x +/- 0.045, y 0.01
 *   mouth      flat box, width 0.04, height 0.006, depth 0.006
 *
 * Sitting pose joint angles (taken verbatim from medkit):
 *   hipBend   -pi/2     thighs forward
 *   kneeBend   pi/2     shins down
 *   shoulderBend -0.35  upper arms in toward lap
 *   elbowBend  0.9      forearms forward onto lap
 *
 * Animation contract (also matches medkit):
 *   - Breathing: root group .position.y oscillates +/- 0.004 m at 1.8 Hz
 *     when neutral. Speaking modulates the mouth scale.y.
 *   - Head yaw tracks active camera, clamped to +/- 50 deg, lerped at
 *     0.15 per frame. When camera is null or speaking is in progress,
 *     eases back to neutral.
 */

const COL = {
  skin: 0xe4b58c,
  hair: 0x2a1b10,
  shirt: 0x4a6a8a,
  pants: 0x2a2a3a,
  shoe: 0x1a1a1a,
  eye: 0x1a1410,
  mouth: 0x8a3a32,
  nose: 0xd99b78,
};

const SEAT_HIP_Y = 0.46;

export function createClientAvatar(scene) {
  const group = new THREE.Group();
  group.name = 'Client';
  group.userData.hotspot = 'client';
  group.position.set(0, 0, -2.4);

  // Chair behind the patient — kept from the previous build so the
  // scene composition stays familiar. Rebuilt as a clean low-poly form.
  const chair = buildChair();
  chair.position.set(0, 0, -0.18);
  group.add(chair);

  // Root for the seated body. medkit's StylizedCharacter root sits at
  // the floor; the inner torso group is lifted to seatHipY.
  const root = new THREE.Group();
  group.add(root);

  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, SEAT_HIP_Y, 0);
  root.add(torsoGroup);

  const mats = {
    skin: new THREE.MeshStandardMaterial({ color: COL.skin, roughness: 0.78 }),
    hair: new THREE.MeshStandardMaterial({ color: COL.hair, roughness: 0.9 }),
    shirt: new THREE.MeshStandardMaterial({ color: COL.shirt, roughness: 0.8 }),
    pants: new THREE.MeshStandardMaterial({ color: COL.pants, roughness: 0.85 }),
    shoe: new THREE.MeshStandardMaterial({ color: COL.shoe, roughness: 0.6 }),
    eye: new THREE.MeshStandardMaterial({ color: COL.eye, roughness: 0.45 }),
    mouth: new THREE.MeshStandardMaterial({ color: COL.mouth, roughness: 0.6 }),
  };

  // ---- HIPS ----
  const hips = new THREE.Mesh(
    new RoundedBoxGeometry(0.34, 0.14, 0.24, 3, 0.05),
    mats.pants,
  );
  hips.castShadow = true;
  torsoGroup.add(hips);

  // ---- TORSO ----
  const torso = new THREE.Mesh(
    new RoundedBoxGeometry(0.38, 0.48, 0.22, 3, 0.09),
    mats.shirt,
  );
  torso.position.set(0, 0.32, 0);
  torso.castShadow = true;
  torsoGroup.add(torso);

  // Tie — small splash of color on the shirt; keeps a hint of the
  // banker outfit while staying in medkit's flat aesthetic.
  const tie = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.30, 0.01),
    new THREE.MeshStandardMaterial({ color: 0xc94a3a, roughness: 0.7 }),
  );
  tie.position.set(0, 0.34, 0.115);
  torsoGroup.add(tie);

  // ---- NECK ----
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.06, 0.08, 14),
    mats.skin,
  );
  neck.position.set(0, 0.62, 0);
  neck.castShadow = true;
  torsoGroup.add(neck);

  // ---- HEAD ----
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.77, 0);
  torsoGroup.add(headGroup);

  const head = new THREE.Mesh(
    new RoundedBoxGeometry(0.20, 0.24, 0.20, 4, 0.08),
    mats.skin,
  );
  head.castShadow = true;
  headGroup.add(head);

  // Hair — partial-sphere skullcap that hugs the cranium. medkit's
  // "crop" style: a low-coverage cap that leaves the forehead clear.
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.108, 22, 16, 0, Math.PI * 2, 0, Math.PI / 2.5),
    mats.hair,
  );
  hairCap.position.set(0, 0.02, -0.005);
  hairCap.scale.set(1, 0.95, 1.02);
  hairCap.castShadow = true;
  headGroup.add(hairCap);

  // Eyes — small solid spheres. No emissive, no separate sclera. The
  // medkit aesthetic relies on the dark dot reading as the whole eye
  // against the lighter skin tone.
  const eyeGeo = new THREE.SphereGeometry(0.016, 10, 8);
  const eyeL = new THREE.Mesh(eyeGeo, mats.eye);
  eyeL.position.set(-0.045, 0.01, 0.102);
  headGroup.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, mats.eye);
  eyeR.position.set(0.045, 0.01, 0.102);
  headGroup.add(eyeR);

  // Eyebrows — box primitives, hair-colored. Sit just above the eyes.
  const browMat = new THREE.MeshStandardMaterial({
    color: COL.hair,
    roughness: 0.85,
  });
  const browGeo = new THREE.BoxGeometry(0.032, 0.008, 0.006);
  const browL = new THREE.Mesh(browGeo, browMat);
  browL.position.set(-0.045, 0.045, 0.105);
  headGroup.add(browL);
  const browR = new THREE.Mesh(browGeo, browMat);
  browR.position.set(0.045, 0.045, 0.105);
  headGroup.add(browR);

  // Nose — CONE pointed forward. This is the single biggest difference
  // between "person" and "robot" on the procedural face.
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.018, 0.055, 6),
    mats.skin,
  );
  nose.position.set(0, -0.01, 0.108);
  nose.rotation.x = Math.PI / 2;
  nose.castShadow = true;
  headGroup.add(nose);

  // Mouth — flat box. Scaled vertically while speaking to fake lip
  // motion since browser speechSynthesis exposes no amplitude.
  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.006, 0.006),
    mats.mouth,
  );
  mouth.position.set(0, -0.058, 0.102);
  headGroup.add(mouth);

  // Ears — small spheres on either side.
  const earGeo = new THREE.SphereGeometry(0.028, 10, 8);
  const earL = new THREE.Mesh(earGeo, mats.skin);
  earL.position.set(-0.1, 0, 0);
  earL.castShadow = true;
  headGroup.add(earL);
  const earR = new THREE.Mesh(earGeo, mats.skin);
  earR.position.set(0.1, 0, 0);
  earR.castShadow = true;
  headGroup.add(earR);

  // ---- ARMS ----
  buildArm(torsoGroup, -1, mats);
  buildArm(torsoGroup, 1, mats);

  // ---- LEGS ----
  buildLeg(root, -1, mats);
  buildLeg(root, 1, mats);

  // Animation handles — kept under userData so OfficeScene.animate()'s
  // existing call signature still works.
  group.userData.root = root;
  group.userData.head = headGroup;
  group.userData.mouth = mouth;
  group.userData.suitMat = mats.shirt;
  group.userData.mood = 'neutral';
  group.userData.speakingAmp = 0;
  group.userData.headYaw = 0;

  scene.add(group);
  return group;
}

function buildArm(parent, side, mats) {
  // Sitting pose: shoulderBend -0.35 on X, elbowBend 0.9. Per medkit.
  const armRoot = new THREE.Group();
  armRoot.position.set(side * 0.2, 0.5, 0);
  armRoot.rotation.set(-0.35, 0, side * 0.08);
  parent.add(armRoot);

  const upper = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.045, 0.32, 12),
    mats.shirt,
  );
  upper.position.set(0, -0.16, 0);
  upper.castShadow = true;
  armRoot.add(upper);

  const forearm = new THREE.Group();
  forearm.position.set(0, -0.32, 0);
  forearm.rotation.set(0.9, 0, 0);
  armRoot.add(forearm);

  const lower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.038, 0.3, 12),
    mats.shirt,
  );
  lower.position.set(0, -0.16, 0);
  lower.castShadow = true;
  forearm.add(lower);

  const hand = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 10, 10),
    mats.skin,
  );
  hand.position.set(0, -0.34, 0);
  hand.castShadow = true;
  forearm.add(hand);
}

function buildLeg(parent, side, mats) {
  // hipBend -pi/2 (thighs forward), kneeBend +pi/2 (shins down).
  // Note legs are children of root, not torsoGroup, so they hinge from
  // the seat plane (y=SEAT_HIP_Y in root-local space, which matches
  // torsoBaseY).
  const hip = new THREE.Group();
  hip.position.set(side * 0.09, SEAT_HIP_Y, 0);
  hip.rotation.set(-Math.PI / 2, 0, 0);
  parent.add(hip);

  const thigh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.06, 0.4, 12),
    mats.pants,
  );
  thigh.position.set(0, -0.2, 0);
  thigh.castShadow = true;
  hip.add(thigh);

  const knee = new THREE.Group();
  knee.position.set(0, -0.4, 0);
  knee.rotation.set(Math.PI / 2, 0, 0);
  hip.add(knee);

  const shin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.045, 0.4, 12),
    mats.pants,
  );
  shin.position.set(0, -0.2, 0);
  shin.castShadow = true;
  knee.add(shin);

  const shoe = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.07, 0.22),
    mats.shoe,
  );
  shoe.position.set(0, -0.38, 0.08);
  shoe.castShadow = true;
  knee.add(shoe);
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
  seat.position.set(0, 0.45, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);

  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.85, 0.08),
    cushion,
  );
  back.position.set(0, 0.90, -0.27);
  back.castShadow = true;
  chair.add(back);

  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.04, 0.66),
    wood,
  );
  trim.position.set(0, 0.40, 0);
  chair.add(trim);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.40, 12),
    wood,
  );
  post.position.set(0, 0.20, 0);
  chair.add(post);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.04, 24),
    wood,
  );
  base.position.set(0, 0.02, 0);
  chair.add(base);

  return chair;
}

/**
 * setMood — kept for compatibility with OfficeScene.setClientMood().
 * The medkit-style avatar does not switch materials per mood; mood is
 * stored on userData so future scenarios can branch on it without a
 * geometry rebuild.
 */
export function setMood(client, mood) {
  if (!client) return;
  client.userData.mood = mood ?? 'neutral';
}

/**
 * Per-frame animation, called from OfficeScene's render loop.
 *
 * Inputs match medkit's StylizedCharacter.useFrame:
 *   - dt:        seconds since last frame
 *   - elapsed:   seconds since clock start
 *   - speakingFor: 'client' | null | undefined; when 'client', the
 *     mouth animates open/closed.
 *   - camera:    THREE.Camera or null; when present and not speaking,
 *     the head yaws toward the camera (clamped, lerped).
 */
export function updateClient(client, dt, elapsed, { speakingFor, camera } = {}) {
  if (!client) return;
  const root = client.userData.root;
  const head = client.userData.head;
  const mouth = client.userData.mouth;
  if (!root || !head || !mouth) return;

  const isSpeaking = speakingFor === 'client';
  const targetAmp = isSpeaking ? 1 : 0;
  client.userData.speakingAmp +=
    (targetAmp - client.userData.speakingAmp) * Math.min(1, dt * 6);
  const amp = client.userData.speakingAmp;

  // Breathing — root group bob. medkit uses 1.8 Hz x 0.004 m for
  // neutral, ramps to 2.6 Hz x 0.012 m for "pain". We only do
  // neutral for now.
  root.position.y = Math.sin(elapsed * 1.8) * 0.004;

  // Head yaw toward camera (or back to neutral). Verbatim from medkit:
  //   - convert camera position to head-local frame
  //   - clamp to +/- 50 deg
  //   - lerp current rotation toward target at 0.15 per frame
  if (camera && !isSpeaking) {
    const headWorld = new THREE.Vector3();
    head.getWorldPosition(headWorld);
    const dx = camera.position.x - headWorld.x;
    const dz = camera.position.z - headWorld.z;
    if (dx * dx + dz * dz > 0.001) {
      const q = new THREE.Quaternion();
      client.getWorldQuaternion(q);
      const charYaw = new THREE.Euler().setFromQuaternion(q, 'YXZ').y;
      const worldAngleToCam = Math.atan2(dx, dz);
      let yaw = worldAngleToCam - charYaw;
      while (yaw > Math.PI) yaw -= 2 * Math.PI;
      while (yaw < -Math.PI) yaw += 2 * Math.PI;
      const limit = Math.PI / 3.6;
      yaw = Math.max(-limit, Math.min(limit, yaw));
      head.rotation.y += (yaw - head.rotation.y) * 0.15;
    }
  } else if (head.rotation.y !== 0) {
    head.rotation.y *= 0.85;
  }

  // Mouth — when speaking, oscillate the vertical scale at ~5 Hz so
  // the box reads as opening and closing. No real lip sync since
  // browser TTS gives no amplitude back.
  const mouthOpen = isSpeaking
    ? 1 + Math.abs(Math.sin(elapsed * 9)) * (2.4 * amp)
    : 1;
  mouth.scale.y = mouthOpen;
}
