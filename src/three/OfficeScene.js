import * as THREE from 'three';
import { setupLighting, setMoodLight, tickMoodLight } from './lighting.js';
import { createRoom } from './createRoom.js';
import { createDesk } from './createDesk.js';
import { createComputer } from './createComputer.js';
import { createClientAvatar, setMood, updateClient } from './createClientAvatar.js';
import { createDocumentFolder } from './createDocumentFolder.js';
import { createProps } from './createProps.js';
import { createDustField } from './createDustField.js';
import { HotspotInteraction } from './interaction.js';

/**
 * Camera framings. `overview` is the only one used in the new
 * Medkit-quality flow — it frames the client (z=-2.4, head ≈ y=1.77)
 * in the upper third with the desk and monitor visible in the lower
 * third. The other framings are kept for backwards compatibility but
 * are no longer dispatched by the simulation view.
 */
const CAMERA_VIEWS = {
  // Default trainee-at-the-desk view. The trainee sits on the staff
  // side of the desk; client visible across the desk as part of the
  // scene, NOT as a face-zoom subject. Look target slightly lower so
  // the desk + monitor + folder all sit naturally in frame.
  overview: { pos: [0, 1.55, 1.45], look: [0, 1.45, -2.1] },
  // Subtle lean-in for talking-head moments — still room-scale, no
  // face zoom. Camera shifts ~60 cm forward and the look target rises
  // ~10 cm so the client's upper body draws the eye.
  deskFront: { pos: [0, 1.55, 0.85], look: [0, 1.55, -2.2] },
  client: { pos: [0.0, 1.55, -0.4], look: [0, 1.72, -2.6] },
  computer: { pos: [-0.15, 1.45, -0.35], look: [-0.6, 1.55, -1.15] },
  folder: { pos: [0.55, 1.35, -0.35], look: [0.7, 0.88, -1.05] },
};

export class OfficeScene {
  constructor(container, { onHotspotSelect, onProjections } = {}) {
    this.container = container;
    this.onHotspotSelect = onHotspotSelect;
    this.onProjections = onProjections;
    this.disposed = false;
    this.clock = new THREE.Clock();
    this.speakingFor = null;
    this.projection = new THREE.Vector3();
    this.parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfff6e6);
    this.scene.fog = new THREE.Fog(0xfff6e6, 10, 22);

    const { width, height } = this.size();
    this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 100);
    this.cameraTarget = new THREE.Vector3();
    this.lookTarget = new THREE.Vector3();
    this.setView('overview', true);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    container.appendChild(this.renderer.domElement);

    this.lights = setupLighting(this.scene);
    createRoom(this.scene);
    createDesk(this.scene);
    this.computer = createComputer(this.scene);
    this.client = createClientAvatar(this.scene);
    this.folder = createDocumentFolder(this.scene);
    this.propsRoot = createProps(this.scene);
    this.dust = createDustField(this.scene);

    this.hotspots = [this.computer, this.client, this.folder];
    this.hotspotAnchors = {
      computer: new THREE.Vector3(-0.6, 1.55, -1.12),
      client: new THREE.Vector3(0, 2.05, -2.4),
      folder: new THREE.Vector3(0.73, 0.95, -1.0),
    };
    this.interaction = new HotspotInteraction(
      this.camera,
      this.renderer.domElement,
      this.hotspots,
      (key, target) => {
        if (this.onHotspotSelect) this.onHotspotSelect(key, target);
      },
    );

    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.animate = this.animate.bind(this);
    window.addEventListener('resize', this.handleResize);
    this.renderer.domElement.addEventListener('pointermove', this.handlePointerMove);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);

    this.animate();
  }

  size() {
    const rect = this.container.getBoundingClientRect();
    return {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height),
    };
  }

  handleResize() {
    const { width, height } = this.size();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  handlePointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    this.parallax.tx = nx * 0.08;
    this.parallax.ty = -ny * 0.04;
  }

  setView(key, instant = false) {
    const view = CAMERA_VIEWS[key] ?? CAMERA_VIEWS.overview;
    this.cameraTarget.set(...view.pos);
    this.lookTarget.set(...view.look);
    if (instant) {
      this.camera.position.copy(this.cameraTarget);
      this.camera.lookAt(this.lookTarget);
    }
  }

  setSpeaker(speakerFrom) {
    this.speakingFor = speakerFrom;
  }

  setScreenContent(content) {
    this.computer?.userData?.screenRenderer?.setContent(content);
  }

  setClientMood(mood) {
    if (this.client) setMood(this.client, mood);
    setMoodLight(this.lights?.moodLight, mood);
  }

  highlight(hotspotKey) {
    for (const obj of this.hotspots) {
      const isActive = obj.userData.hotspot === hotspotKey;
      obj.traverse((child) => {
        if (!child.isMesh) return;
        if (!child.userData.__baseEmissive) {
          child.userData.__baseEmissive =
            child.material?.emissive?.clone?.() ?? null;
          child.userData.__baseEmissiveIntensity =
            child.material?.emissiveIntensity ?? 0;
        }
        if (!child.material?.emissive) return;
        if (isActive) {
          child.material.emissive.set(0xff8e5c);
          child.material.emissiveIntensity = 0.4;
        } else if (child.userData.__baseEmissive) {
          child.material.emissive.copy(child.userData.__baseEmissive);
          child.material.emissiveIntensity =
            child.userData.__baseEmissiveIntensity;
        }
      });
    }
  }

  projectHotspots() {
    if (!this.onProjections) return;
    const { width, height } = this.size();
    const results = [];
    for (const [key, anchor] of Object.entries(this.hotspotAnchors)) {
      this.projection.copy(anchor).project(this.camera);
      const inFront = this.projection.z < 1 && this.projection.z > -1;
      const x = (this.projection.x * 0.5 + 0.5) * width;
      const y = (-this.projection.y * 0.5 + 0.5) * height;
      results.push({
        key,
        x,
        y,
        visible: inFront && x > 0 && x < width && y > 0 && y < height,
      });
    }
    this.onProjections(results);
  }

  animate() {
    if (this.disposed) return;
    requestAnimationFrame(this.animate);
    const dt = Math.min(0.05, this.clock.getDelta());
    const t = this.clock.elapsedTime;

    this.parallax.x += (this.parallax.tx - this.parallax.x) * Math.min(1, dt * 4);
    this.parallax.y += (this.parallax.ty - this.parallax.y) * Math.min(1, dt * 4);

    const lerp = 1 - Math.pow(0.0001, dt);
    this.camera.position.lerp(this.cameraTarget, lerp);
    const breath = Math.sin(t * 0.7) * 0.005;
    const sway = Math.sin(t * 0.3) * 0.04;
    this.camera.position.y += breath * 0.02 + this.parallax.y * 0.6;
    this.camera.position.x += sway * 0.02 + this.parallax.x;
    this.camera.lookAt(this.lookTarget);

    updateClient(this.client, dt, t, {
      speakingFor: this.speakingFor,
      camera: this.camera,
    });
    tickMoodLight(this.lights?.moodLight, dt);

    if (this.propsRoot) {
      const plant = this.propsRoot.children[0];
      if (plant) {
        plant.rotation.z = Math.sin(t * 0.6) * 0.04;
        plant.children[2] && (plant.children[2].rotation.y = t * 0.2);
      }
    }

    if (this.lights?.windowKey) {
      const intensity = 0.85 + Math.sin(t * 0.4) * 0.08;
      this.lights.windowKey.intensity = intensity;
    }

    if (this.lights?.deskLamp) {
      this.lights.deskLamp.intensity = 0.7 + Math.sin(t * 8) * 0.02;
    }

    this.dust?.userData.update?.(dt, t);

    const renderer = this.computer?.userData?.screenRenderer;
    if (renderer) renderer.tick(dt);

    const glow = this.computer?.userData?.screenGlow;
    if (glow) {
      glow.intensity = 0.45 + Math.sin(t * 4) * 0.08;
    }

    this.projectHotspots();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.interaction?.dispose();
    window.removeEventListener('resize', this.handleResize);
    this.renderer.domElement.removeEventListener('pointermove', this.handlePointerMove);
    this.resizeObserver?.disconnect();

    this.computer?.userData?.screenRenderer?.dispose();

    this.scene.traverse((obj) => {
      if (obj.isMesh || obj.isPoints) {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose?.();
        }
      }
    });

    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
