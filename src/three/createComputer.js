import * as THREE from 'three';
import { ScreenRenderer } from './ScreenRenderer.js';

export function createComputer(scene) {
  const group = new THREE.Group();
  group.name = 'Computer';
  group.userData.hotspot = 'computer';

  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, 0.18, 16),
    new THREE.MeshStandardMaterial({ color: 0x1a1f2c, roughness: 0.4 }),
  );
  stand.position.set(-0.6, 0.95, -1.15);
  stand.castShadow = true;
  group.add(stand);

  const neck = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.3, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x1a1f2c, roughness: 0.4 }),
  );
  neck.position.set(-0.6, 1.19, -1.15);
  group.add(neck);

  const monitorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.7, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x0b0f17, roughness: 0.3 }),
  );
  monitorFrame.position.set(-0.6, 1.55, -1.15);
  monitorFrame.castShadow = true;
  group.add(monitorFrame);

  const renderer = new ScreenRenderer();
  const screenMat = new THREE.MeshBasicMaterial({
    map: renderer.texture,
    toneMapped: false,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.6), screenMat);
  screen.position.set(-0.6, 1.55, -1.12);
  group.add(screen);
  group.userData.screen = screen;
  group.userData.screenRenderer = renderer;

  const screenGlow = new THREE.PointLight(0x6ea8d6, 0.55, 1.6, 1.6);
  screenGlow.position.set(-0.6, 1.55, -1.0);
  group.add(screenGlow);
  group.userData.screenGlow = screenGlow;

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.04, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x0e1320, roughness: 0.55 }),
  );
  keyboard.position.set(-0.6, 0.86, -0.6);
  keyboard.castShadow = true;
  group.add(keyboard);

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.03, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x0e1320, roughness: 0.55 }),
  );
  mouse.position.set(0.05, 0.855, -0.6);
  group.add(mouse);

  scene.add(group);
  return group;
}
