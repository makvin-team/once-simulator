import * as THREE from 'three';

export function createDocumentFolder(scene) {
  const group = new THREE.Group();
  group.name = 'Folder';
  group.userData.hotspot = 'folder';

  const folder = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.05, 0.36),
    new THREE.MeshStandardMaterial({ color: 0xff8e5c, roughness: 0.7 }),
  );
  folder.position.set(0.65, 0.86, -1.1);
  folder.rotation.y = 0.18;
  folder.castShadow = true;
  group.add(folder);

  const folderEdge = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 0.055, 0.38),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  folderEdge.position.copy(folder.position);
  folderEdge.rotation.copy(folder.rotation);
  folderEdge.scale.multiplyScalar(0.985);
  group.add(folderEdge);

  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.01, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 0.9 }),
  );
  paper.position.set(0.68, 0.895, -1.08);
  paper.rotation.y = 0.18;
  group.add(paper);

  const tab = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.015, 0.09),
    new THREE.MeshStandardMaterial({
      color: 0xffd86b,
      emissive: 0xffd86b,
      emissiveIntensity: 0.25,
    }),
  );
  tab.position.set(0.68, 0.9, -0.98);
  tab.rotation.y = 0.18;
  group.add(tab);

  const tabBorder = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.018, 0.095),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  tabBorder.position.copy(tab.position);
  tabBorder.rotation.copy(tab.rotation);
  tabBorder.scale.multiplyScalar(0.99);
  group.add(tabBorder);

  scene.add(group);
  return group;
}
