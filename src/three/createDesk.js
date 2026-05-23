import * as THREE from 'three';

export function createDesk(scene) {
  const group = new THREE.Group();
  group.name = 'Desk';

  const topMat = new THREE.MeshStandardMaterial({
    color: 0x8e5a3a,
    roughness: 0.55,
    metalness: 0.1,
  });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 1.15), topMat);
  top.position.set(0, 0.8, -1.0);
  top.castShadow = true;
  top.receiveShadow = true;
  group.add(top);

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x2b1e16,
    roughness: 0.7,
  });
  const edge = new THREE.Mesh(new THREE.BoxGeometry(2.82, 0.02, 1.17), edgeMat);
  edge.position.set(0, 0.84, -1.0);
  group.add(edge);

  const legMat = new THREE.MeshStandardMaterial({
    color: 0x2b1e16,
    roughness: 0.7,
  });
  const legGeo = new THREE.BoxGeometry(0.1, 0.8, 0.1);
  const offsets = [
    [-1.32, 0.4, -1.5],
    [1.32, 0.4, -1.5],
    [-1.32, 0.4, -0.5],
    [1.32, 0.4, -0.5],
  ];
  for (const [x, y, z] of offsets) {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    group.add(leg);
  }

  const drawer = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.45, 0.95),
    new THREE.MeshStandardMaterial({ color: 0xffd86b, roughness: 0.6 }),
  );
  drawer.position.set(0.9, 0.5, -1.0);
  drawer.castShadow = true;
  group.add(drawer);

  const drawerBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.47, 0.97),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  drawerBorder.position.set(0.9, 0.5, -1.0);
  drawerBorder.scale.multiplyScalar(0.99);
  group.add(drawerBorder);

  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.16, 12),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, metalness: 0.4 }),
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.9, 0.5, -0.5);
  group.add(handle);

  scene.add(group);
  return group;
}
