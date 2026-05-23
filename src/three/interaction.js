import * as THREE from 'three';

export class HotspotInteraction {
  constructor(camera, domElement, hotspotTargets, onSelect) {
    this.camera = camera;
    this.domElement = domElement;
    this.targets = hotspotTargets;
    this.onSelect = onSelect;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.hovered = null;

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handleClick = this.handleClick.bind(this);

    domElement.addEventListener('pointermove', this.handlePointerMove);
    domElement.addEventListener('click', this.handleClick);
  }

  updatePointer(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  intersect() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const meshes = this.targets.flatMap((t) =>
      t.children.length ? t.children : [t],
    );
    const hits = this.raycaster.intersectObjects(meshes, true);
    if (!hits.length) return null;
    return findHotspotParent(hits[0].object, this.targets);
  }

  handlePointerMove(event) {
    this.updatePointer(event);
    const hit = this.intersect();
    if (hit !== this.hovered) {
      this.hovered = hit;
      this.domElement.style.cursor = hit ? 'pointer' : 'default';
    }
  }

  handleClick(event) {
    this.updatePointer(event);
    const hit = this.intersect();
    if (hit && hit.userData?.hotspot) {
      this.onSelect(hit.userData.hotspot, hit);
    }
  }

  dispose() {
    this.domElement.removeEventListener('pointermove', this.handlePointerMove);
    this.domElement.removeEventListener('click', this.handleClick);
    this.domElement.style.cursor = 'default';
  }
}

function findHotspotParent(object, targets) {
  let current = object;
  while (current) {
    if (current.userData?.hotspot) return current;
    if (targets.includes(current)) return current;
    current = current.parent;
  }
  return null;
}
