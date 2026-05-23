import * as THREE from 'three';

export function setupLighting(scene) {
  const ambient = new THREE.AmbientLight(0xfff6e6, 0.55);
  scene.add(ambient);

  const hemi = new THREE.HemisphereLight(0xfff1c2, 0x6b4f3f, 0.55);
  hemi.position.set(0, 6, 0);
  scene.add(hemi);

  const ceilingLight = new THREE.PointLight(0xffe8b8, 1.6, 16, 1.4);
  ceilingLight.position.set(0, 3.6, 0);
  ceilingLight.castShadow = true;
  ceilingLight.shadow.mapSize.set(1024, 1024);
  scene.add(ceilingLight);

  const windowKey = new THREE.DirectionalLight(0xffe2b3, 0.9);
  windowKey.position.set(-6, 5, 3);
  windowKey.castShadow = true;
  windowKey.shadow.mapSize.set(1024, 1024);
  windowKey.shadow.camera.left = -6;
  windowKey.shadow.camera.right = 6;
  windowKey.shadow.camera.top = 6;
  windowKey.shadow.camera.bottom = -6;
  scene.add(windowKey);

  const peachAccent = new THREE.PointLight(0xff8e5c, 0.5, 6, 2);
  peachAccent.position.set(-2.5, 1.6, -2);
  scene.add(peachAccent);

  const mintAccent = new THREE.PointLight(0x5fcfa0, 0.45, 6, 2);
  mintAccent.position.set(2.5, 1.6, -2);
  scene.add(mintAccent);

  const moodLight = new THREE.PointLight(0xa6d8ff, 0.55, 5, 2);
  moodLight.position.set(0, 1.7, -1.4);
  scene.add(moodLight);

  const deskLamp = new THREE.PointLight(0xffd86b, 0.7, 2.4, 1.6);
  deskLamp.position.set(0.9, 1.15, -0.7);
  scene.add(deskLamp);

  return { ambient, hemi, ceilingLight, windowKey, peachAccent, mintAccent, moodLight, deskLamp };
}

const MOOD_COLORS = {
  neutral: 0xa6d8ff,
  angry: 0xf47a92,
  calm: 0xffd86b,
  satisfied: 0x5fcfa0,
};

export function setMoodLight(moodLight, mood) {
  if (!moodLight) return;
  const target = MOOD_COLORS[mood] ?? MOOD_COLORS.neutral;
  moodLight.userData.target = target;
}

export function tickMoodLight(moodLight, dt) {
  if (!moodLight) return;
  const target = moodLight.userData.target ?? 0xa6d8ff;
  const targetColor = new THREE.Color(target);
  moodLight.color.lerp(targetColor, Math.min(1, dt * 2.4));
}
