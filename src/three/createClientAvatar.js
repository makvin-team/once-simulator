import * as THREE from 'three';

const MOODS = {
  angry: { suit: 0xf47a92, accent: 0xffb3c0, emissive: 0x7a1d2c },
  neutral: { suit: 0x5ab7f2, accent: 0xa6d8ff, emissive: 0x1d4e7a },
  calm: { suit: 0xf5b73d, accent: 0xffd86b, emissive: 0x7a5a18 },
  satisfied: { suit: 0x5fcfa0, accent: 0xa8e5c8, emissive: 0x2a6b4f },
};

export function createClientAvatar(scene) {
  const group = new THREE.Group();
  group.name = 'Client';
  group.userData.hotspot = 'client';
  group.position.set(0, 0, -2.4);
  group.scale.setScalar(1.15);

  const chair = buildChair();
  chair.position.set(0, 0, -0.3);
  group.add(chair);

  const suitMat = new THREE.MeshStandardMaterial({
    color: MOODS.neutral.suit,
    roughness: 0.7,
    emissive: 0x000000,
    emissiveIntensity: 0,
  });

  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.36, 0.7, 14),
    suitMat,
  );
  torso.position.set(0, 1.15, 0);
  torso.castShadow = true;
  group.add(torso);

  const collar = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.12, 14),
    new THREE.MeshStandardMaterial({ color: 0xfff6e6, roughness: 0.7 }),
  );
  collar.position.set(0, 1.5, 0.05);
  group.add(collar);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.72, 0);
  group.add(headGroup);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xefc8a8, roughness: 0.6 }),
  );
  head.castShadow = true;
  headGroup.add(head);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.23, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.2),
    new THREE.MeshStandardMaterial({ color: 0x2a1d12, roughness: 0.8 }),
  );
  hair.position.set(0, 0.06, -0.02);
  headGroup.add(hair);

  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.3 });
  const eyeGeo = new THREE.SphereGeometry(0.022, 10, 8);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.07, 0.02, 0.2);
  headGroup.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.07, 0.02, 0.2);
  headGroup.add(eyeR);

  const eyelidMat = new THREE.MeshStandardMaterial({ color: 0xefc8a8, roughness: 0.6 });
  const eyelidGeo = new THREE.PlaneGeometry(0.06, 0.025);
  const lidL = new THREE.Mesh(eyelidGeo, eyelidMat);
  lidL.position.set(-0.07, 0.02, 0.205);
  lidL.scale.y = 0;
  headGroup.add(lidL);
  const lidR = new THREE.Mesh(eyelidGeo, eyelidMat);
  lidR.position.set(0.07, 0.02, 0.205);
  lidR.scale.y = 0;
  headGroup.add(lidR);

  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.5 });
  const mouth = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.018), mouthMat);
  mouth.position.set(0, -0.07, 0.205);
  headGroup.add(mouth);

  const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.55, 10);
  const armL = new THREE.Mesh(armGeo, suitMat);
  armL.position.set(-0.38, 1.15, 0.1);
  armL.rotation.z = 0.35;
  group.add(armL);
  const armR = new THREE.Mesh(armGeo, suitMat);
  armR.position.set(0.38, 1.15, 0.1);
  armR.rotation.z = -0.35;
  group.add(armR);

  const legMat = new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.7 });
  const legGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.6, 10);
  const legL = new THREE.Mesh(legGeo, legMat);
  legL.position.set(-0.14, 0.48, 0.18);
  legL.rotation.x = Math.PI / 2.6;
  group.add(legL);
  const legR = new THREE.Mesh(legGeo, legMat);
  legR.position.set(0.14, 0.48, 0.18);
  legR.rotation.x = Math.PI / 2.6;
  group.add(legR);

  group.userData.head = headGroup;
  group.userData.mouth = mouth;
  group.userData.eyelids = [lidL, lidR];
  group.userData.suitMat = suitMat;
  group.userData.mood = 'neutral';
  group.userData.speakingAmp = 0;
  group.userData.nextBlink = 1.5 + Math.random() * 2;
  group.userData.blinkPhase = 0;

  setMood(group, 'neutral');

  scene.add(group);
  return group;
}

export function setMood(client, mood) {
  const m = MOODS[mood] ?? MOODS.neutral;
  client.userData.mood = mood;
  const suitMat = client.userData.suitMat;
  suitMat.color.setHex(m.suit);
  suitMat.emissive.setHex(m.emissive);
  suitMat.emissiveIntensity = mood === 'angry' ? 0.18 : 0.08;
}

export function updateClient(client, dt, elapsed, { speakingFor } = {}) {
  if (!client) return;
  const head = client.userData.head;
  const mouth = client.userData.mouth;
  const eyelids = client.userData.eyelids;

  const isSpeaking = speakingFor === 'client';
  const targetAmp = isSpeaking ? 1 : 0;
  client.userData.speakingAmp +=
    (targetAmp - client.userData.speakingAmp) * Math.min(1, dt * 6);

  const amp = client.userData.speakingAmp;
  head.rotation.y = Math.sin(elapsed * 0.6) * (0.06 + amp * 0.08);
  head.rotation.x =
    Math.sin(elapsed * 1.2) * (0.02 + amp * 0.04) + amp * 0.15;
  head.position.y = Math.sin(elapsed * 1.8) * 0.005;
  head.position.z = amp * 0.08;

  const mouthOpen = isSpeaking
    ? 1 + Math.abs(Math.sin(elapsed * 11)) * 4
    : 1;
  mouth.scale.y = mouthOpen;

  client.userData.nextBlink -= dt;
  if (client.userData.nextBlink <= 0 && client.userData.blinkPhase <= 0) {
    client.userData.blinkPhase = 0.18;
    client.userData.nextBlink = 2.5 + Math.random() * 3;
  }
  if (client.userData.blinkPhase > 0) {
    const p = client.userData.blinkPhase;
    const v = p > 0.09 ? (0.18 - p) / 0.09 : p / 0.09;
    eyelids[0].scale.y = v * 3;
    eyelids[1].scale.y = v * 3;
    client.userData.blinkPhase = Math.max(0, p - dt);
  } else {
    eyelids[0].scale.y = 0;
    eyelids[1].scale.y = 0;
  }
}

function buildChair() {
  const chair = new THREE.Group();
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.08, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.6 }),
  );
  seat.position.set(0, 0.55, 0);
  seat.castShadow = true;
  chair.add(seat);
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.7, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.6 }),
  );
  back.position.set(0, 0.95, -0.26);
  chair.add(back);
  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.5, 10),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  post.position.set(0, 0.25, 0);
  chair.add(post);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  base.position.set(0, 0.04, 0);
  chair.add(base);
  return chair;
}
