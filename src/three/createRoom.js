import * as THREE from 'three';

const ROOM_SIZE = { w: 10, d: 8, h: 3.6 };

export function createRoom(scene) {
  const group = new THREE.Group();
  group.name = 'Room';

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xb98860,
    roughness: 0.85,
    metalness: 0.0,
  });
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.w, ROOM_SIZE.d),
    floorMat,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  group.add(floor);

  const carpetMat = new THREE.MeshStandardMaterial({
    color: 0xa8e5c8,
    roughness: 0.95,
  });
  const carpet = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.4), carpetMat);
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.y = 0.005;
  carpet.position.z = -1;
  carpet.receiveShadow = true;
  group.add(carpet);

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0xfff6e6,
    roughness: 0.95,
  });
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.w, ROOM_SIZE.d),
    ceilingMat,
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_SIZE.h;
  group.add(ceiling);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xfff1c2,
    roughness: 0.9,
  });

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.w, ROOM_SIZE.h),
    wallMat,
  );
  backWall.position.set(0, ROOM_SIZE.h / 2, -ROOM_SIZE.d / 2);
  backWall.receiveShadow = true;
  group.add(backWall);

  const frontWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.w, ROOM_SIZE.h),
    wallMat,
  );
  frontWall.position.set(0, ROOM_SIZE.h / 2, ROOM_SIZE.d / 2);
  frontWall.rotation.y = Math.PI;
  group.add(frontWall);

  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.d, ROOM_SIZE.h),
    wallMat,
  );
  leftWall.position.set(-ROOM_SIZE.w / 2, ROOM_SIZE.h / 2, 0);
  leftWall.rotation.y = Math.PI / 2;
  group.add(leftWall);

  const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE.d, ROOM_SIZE.h),
    wallMat,
  );
  rightWall.position.set(ROOM_SIZE.w / 2, ROOM_SIZE.h / 2, 0);
  rightWall.rotation.y = -Math.PI / 2;
  group.add(rightWall);

  const baseboard = new THREE.Mesh(
    new THREE.BoxGeometry(ROOM_SIZE.w, 0.12, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.6 }),
  );
  baseboard.position.set(0, 0.06, -ROOM_SIZE.d / 2 + 0.03);
  group.add(baseboard);

  addWindow(group, -ROOM_SIZE.w / 2 + 0.02, 1.8, 2);
  addLogoPanel(group, 0, 2.4, -ROOM_SIZE.d / 2 + 0.03);
  addWallArt(group, 3, 2, -ROOM_SIZE.d / 2 + 0.04);

  scene.add(group);
  return group;
}

function addWindow(group, x, y, z) {
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 1.8, 2.8),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.4 }),
  );
  frame.position.set(x, y, z);
  group.add(frame);

  const sky = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 1.6),
    new THREE.MeshBasicMaterial({ color: 0xffd49a }),
  );
  sky.rotation.y = Math.PI / 2;
  sky.position.set(x + 0.02, y, z);
  group.add(sky);

  const skyline = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xc89368 }),
  );
  skyline.rotation.y = Math.PI / 2;
  skyline.position.set(x + 0.025, y - 0.45, z);
  group.add(skyline);

  for (let i = 0; i < 6; i++) {
    const building = new THREE.Mesh(
      new THREE.PlaneGeometry(0.34 + Math.random() * 0.18, 0.4 + Math.random() * 0.3),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xa6735a : 0x8e5a3a }),
    );
    building.rotation.y = Math.PI / 2;
    building.position.set(x + 0.028, y - 0.4 + Math.random() * 0.2, z - 1.1 + i * 0.42);
    group.add(building);
  }

  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(0.22, 24),
    new THREE.MeshBasicMaterial({ color: 0xffe8a3 }),
  );
  sun.rotation.y = Math.PI / 2;
  sun.position.set(x + 0.03, y + 0.2, z - 0.5);
  group.add(sun);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 1.6),
    new THREE.MeshStandardMaterial({
      color: 0xa6d8ff,
      transparent: true,
      opacity: 0.32,
      emissive: 0xffe8a3,
      emissiveIntensity: 0.25,
      roughness: 0.2,
    }),
  );
  glass.rotation.y = Math.PI / 2;
  glass.position.set(x + 0.05, y, z);
  group.add(glass);

  const cross1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 1.7, 0.04),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  cross1.position.set(x + 0.06, y, z);
  group.add(cross1);
  const cross2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.04, 2.7),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  cross2.position.set(x + 0.06, y, z);
  group.add(cross2);
}

function addLogoPanel(group, x, y, z) {
  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.9, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  backing.position.set(x, y, z);
  group.add(backing);

  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.74),
    new THREE.MeshStandardMaterial({
      color: 0xff8e5c,
      emissive: 0xff8e5c,
      emissiveIntensity: 0.35,
      roughness: 0.5,
    }),
  );
  panel.position.set(x, y, z + 0.04);
  group.add(panel);

  const subPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 0.2),
    new THREE.MeshStandardMaterial({
      color: 0xfff6e6,
      emissive: 0xfff6e6,
      emissiveIntensity: 0.25,
    }),
  );
  subPanel.position.set(x, y - 0.55, z + 0.05);
  group.add(subPanel);
}

function addWallArt(group, x, y, z) {
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.7, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  frame.position.set(x, y, z);
  group.add(frame);

  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(0.88, 0.58),
    new THREE.MeshStandardMaterial({
      color: 0xa8e5c8,
      emissive: 0xa8e5c8,
      emissiveIntensity: 0.15,
    }),
  );
  art.position.set(x, y, z + 0.03);
  group.add(art);

  const dot = new THREE.Mesh(
    new THREE.CircleGeometry(0.1, 24),
    new THREE.MeshStandardMaterial({ color: 0xffd86b }),
  );
  dot.position.set(x - 0.18, y + 0.05, z + 0.04);
  group.add(dot);
}

export { ROOM_SIZE };
