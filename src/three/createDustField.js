import * as THREE from 'three';

export function createDustField(scene, count = 140) {
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 1] = 0.8 + Math.random() * 2.2;
    positions[i * 3 + 2] = -3 + Math.random() * 3.5;
    phases[i] = Math.random() * Math.PI * 2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

  const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xfff6e6,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  points.name = 'Dust';
  points.userData.update = (dt, elapsed) => {
    const pos = geo.attributes.position.array;
    const ph = geo.attributes.phase.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      pos[idx + 0] += Math.sin(elapsed * 0.2 + ph[i]) * 0.0008;
      pos[idx + 1] += 0.0009 + Math.sin(elapsed * 0.5 + ph[i]) * 0.0006;
      pos[idx + 2] += Math.cos(elapsed * 0.15 + ph[i]) * 0.0006;
      if (pos[idx + 1] > 3.2) pos[idx + 1] = 0.8;
    }
    geo.attributes.position.needsUpdate = true;
  };

  scene.add(points);
  return points;
}
