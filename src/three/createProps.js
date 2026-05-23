import * as THREE from 'three';

export function createProps(scene) {
  const group = new THREE.Group();
  group.name = 'Props';

  const plant = buildPlant();
  plant.position.set(-3.6, 0, -3);
  group.add(plant);

  const bookshelf = buildBookshelf();
  bookshelf.position.set(3.8, 0, -3.4);
  group.add(bookshelf);

  const mug = buildMug();
  mug.position.set(0.45, 0.84, -0.7);
  group.add(mug);

  const namePlate = buildNamePlate();
  namePlate.position.set(0, 0.86, -0.45);
  group.add(namePlate);

  const lamp = buildDeskLamp();
  lamp.position.set(0.9, 0.84, -0.7);
  group.add(lamp);

  const phone = buildPhone();
  phone.position.set(-1.05, 0.85, -0.85);
  group.add(phone);

  scene.add(group);
  return group;
}

function buildDeskLamp() {
  const lamp = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.5 }),
  );
  base.position.y = 0.02;
  lamp.add(base);

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.34, 10),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  stem.position.y = 0.2;
  stem.rotation.z = -0.3;
  lamp.add(stem);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.12, 0.18, 14, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xffd86b,
      emissive: 0xffd86b,
      emissiveIntensity: 0.5,
      roughness: 0.5,
      side: THREE.DoubleSide,
    }),
  );
  shade.position.set(-0.12, 0.38, 0);
  shade.rotation.z = Math.PI * 0.6;
  lamp.add(shade);

  return lamp;
}

function buildPhone() {
  const phone = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.04, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.5 }),
  );
  base.position.y = 0.02;
  base.castShadow = true;
  phone.add(base);

  const cradle = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.06, 0.1),
    new THREE.MeshStandardMaterial({ color: 0xf5b73d, roughness: 0.5 }),
  );
  cradle.position.set(0, 0.09, 0);
  phone.add(cradle);

  const pad = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.12),
    new THREE.MeshStandardMaterial({
      color: 0x5fcfa0,
      emissive: 0x5fcfa0,
      emissiveIntensity: 0.25,
    }),
  );
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, 0.045, 0.06);
  phone.add(pad);

  return phone;
}

function buildPlant() {
  const plant = new THREE.Group();

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.2, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xff8e5c, roughness: 0.7 }),
  );
  pot.position.y = 0.2;
  pot.castShadow = true;
  plant.add(pot);

  const potRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.28, 0.04, 16),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16, roughness: 0.7 }),
  );
  potRim.position.y = 0.4;
  plant.add(potRim);

  const leavesMat = new THREE.MeshStandardMaterial({
    color: 0x5fcfa0,
    roughness: 0.85,
    flatShading: true,
  });
  const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), leavesMat);
  leaves.position.y = 0.75;
  leaves.castShadow = true;
  plant.add(leaves);

  const top = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), leavesMat);
  top.position.y = 1.1;
  plant.add(top);

  return plant;
}

function buildBookshelf() {
  const shelf = new THREE.Group();

  const cabinet = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.9, 0.45),
    new THREE.MeshStandardMaterial({ color: 0x8e5a3a, roughness: 0.65 }),
  );
  cabinet.position.y = 0.95;
  cabinet.castShadow = true;
  shelf.add(cabinet);

  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(1.34, 1.94, 0.42),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  trim.position.y = 0.95;
  shelf.add(trim);

  const colors = [0xff8e5c, 0x5ab7f2, 0xf5b73d, 0x5fcfa0, 0xf47a92];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 5; i++) {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.1 + Math.random() * 0.04, 0.36, 0.24),
        new THREE.MeshStandardMaterial({
          color: colors[(row + i) % colors.length],
          roughness: 0.55,
        }),
      );
      book.position.set(-0.5 + i * 0.2, 0.5 + row * 0.55, 0.08);
      shelf.add(book);
    }
  }

  return shelf;
}

function buildMug() {
  const mug = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.05, 0.11, 16),
    new THREE.MeshStandardMaterial({ color: 0xfff6e6, roughness: 0.4 }),
  );
  body.castShadow = true;
  mug.add(body);

  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.04, 0.012, 8, 14, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0xfff6e6, roughness: 0.4 }),
  );
  handle.rotation.y = Math.PI / 2;
  handle.position.x = 0.06;
  mug.add(handle);

  const coffee = new THREE.Mesh(
    new THREE.CircleGeometry(0.048, 16),
    new THREE.MeshStandardMaterial({ color: 0x4a2c1a, roughness: 0.4 }),
  );
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.055;
  mug.add(coffee);

  return mug;
}

function buildNamePlate() {
  const plate = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.08, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x2b1e16 }),
  );
  base.castShadow = true;
  plate.add(base);

  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(0.36, 0.06),
    new THREE.MeshStandardMaterial({
      color: 0xffd86b,
      emissive: 0xffd86b,
      emissiveIntensity: 0.2,
    }),
  );
  face.position.z = 0.052;
  plate.add(face);

  return plate;
}
