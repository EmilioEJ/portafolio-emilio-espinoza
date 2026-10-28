// ARIA, el avatar de la tesis, como demostración: mismo modelo VRM y mismo animador de reposo que la
// app real (resortes, respiración, parpadeo y sacadas). La cabeza sigue un poco al cursor.
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";

const ruido = (t: number, s: number) => Math.sin(t * 0.37 + s) * 0.5 + Math.sin(t * 0.83 + s * 1.7) * 0.3 + Math.sin(t * 1.61 + s * 2.3) * 0.2;
const POSE: Record<string, [number, number, number]> = {
  leftUpperArm: [0.1, -0.15, -1.25], rightUpperArm: [0.1, 0.15, 1.25],
  leftLowerArm: [-0.25, -0.15, 0], rightLowerArm: [-0.25, 0.15, 0],
  leftHand: [0, 0, 0], rightHand: [0, 0, 0],
};
const RIGIDEZ: Record<string, number> = { UpperArm: 26, LowerArm: 20, Hand: 16 };

export function AriaStage() {
  const host = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState<{ state: "idle" | "loading" | "ready" | "error"; pct: number }>({ state: "idle", pct: 0 });

  useEffect(() => {
    const el = host.current!;
    let disposed = false, visible = false, raf = 0;
    let renderer: THREE.WebGLRenderer | null = null, vrm: VRM | null = null, cleanup = () => {};

    // 15 MB: solo se descarga cuando el proyecto está a una pantalla de distancia
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { near.disconnect(); start(); } }, { rootMargin: "100% 0px" });
    const seen = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && renderer && !raf) loop(); });
    near.observe(el); seen.observe(el);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.15, 10);
    camera.position.set(0, 1.3, 1.5);
    const clock = new THREE.Timer();
    const springs = new Map<string, { pos: number; vel: number }>();
    const spring = (k: string, to: number, stiff: number, dt: number) => {
      let r = springs.get(k);
      if (!r) { r = { pos: to, vel: 0 }; springs.set(k, r); }
      const damp = 2 * Math.sqrt(stiff), steps = Math.max(1, Math.ceil(dt / 0.0167)), h = dt / steps;
      for (let i = 0; i < steps; i++) { r.vel += (stiff * (to - r.pos) - damp * r.vel) * h; r.pos += r.vel * h; }
      return r.pos;
    };
    const gaze = { x: 0, y: 0, tx: 0, ty: 0, next: 0 }, pointer = { x: 0, y: 0 };
    let nextBlink = 1.5;

    function fit() {
      const w = el.clientWidth, h = el.clientHeight;
      if (!renderer || !w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // En un marco estrecho la cámara se abre para que ARIA no quede cortada
      camera.fov = w / h < 0.9 ? 44 : 35;
      camera.updateProjectionMatrix();
    }

    function start() {
      setLoad({ state: "loading", pct: 0 });
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(1, 1, 1).normalize();
      const rim = new THREE.DirectionalLight(0xff5a3c, 1.4);
      rim.position.set(-1.4, 1.6, -1.2);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 1.5));
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(el);
      const onMove = (ev: PointerEvent) => { const r = el.getBoundingClientRect(); pointer.x = ((ev.clientX - r.left) / r.width) * 2 - 1; pointer.y = ((ev.clientY - r.top) / r.height) * 2 - 1; };
      addEventListener("pointermove", onMove, { passive: true });
      cleanup = () => { ro.disconnect(); removeEventListener("pointermove", onMove); };

      const loader = new GLTFLoader();
      loader.register((p) => new VRMLoaderPlugin(p));
      loader.load("/models/aria.vrm", (gltf) => {
        if (disposed) return;
        vrm = gltf.userData.vrm as VRM;
        vrm.scene.rotation.y = 0;
        scene.add(vrm.scene);
        setLoad({ state: "ready", pct: 100 });
      }, (p) => p.total && setLoad({ state: "loading", pct: Math.round((p.loaded / p.total) * 100) }), () => setLoad({ state: "error", pct: 0 }));
      if (visible) loop();
    }

    function loop() {
      if (disposed || !renderer) return;
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(loop);
      clock.update();
      const dt = Math.min(clock.getDelta(), 0.25), t = clock.getElapsed();
      if (vrm) {
        const bone = (n: string) => vrm!.humanoid.getNormalizedBoneNode(n as never);
        const em = vrm.expressionManager;

        // Parpadeo natural
        if (t > nextBlink) { em?.setValue("blink", 1); if (t > nextBlink + 0.12) { em?.setValue("blink", 0); nextBlink = t + 2.2 + Math.random() * 3.8; } }

        // Mirada: fijaciones breves con pequeños saltos (sacadas)
        if (t > gaze.next) {
          if (Math.random() < 0.6) { gaze.tx = (Math.random() - 0.5) * 0.02; gaze.ty = (Math.random() - 0.5) * 0.04; gaze.next = t + 1.2 + Math.random() * 2.5; }
          else { gaze.tx = (Math.random() - 0.5) * 0.08; gaze.ty = (Math.random() - 0.5) * 0.24; gaze.next = t + 0.4 + Math.random() * 0.8; }
        }
        gaze.x += (gaze.tx - gaze.x) * Math.min(1, dt * 14);
        gaze.y += (gaze.ty - gaze.y) * Math.min(1, dt * 14);
        bone("leftEye")?.rotation.set(gaze.x, gaze.y, 0);
        bone("rightEye")?.rotation.set(gaze.x, gaze.y, 0);

        // Cuerpo: respiración, cambio de peso y la cabeza que sigue un poco al cursor
        const breath = Math.sin(t * 1.35);
        const hips = bone("hips"), spine = bone("spine"), chest = bone("chest"), neck = bone("neck"), head = bone("head");
        if (hips) { hips.rotation.y = spring("hips.y", ruido(t * 0.6, 1) * 0.035, 8, dt); hips.rotation.z = spring("hips.z", ruido(t * 0.35, 2) * 0.025, 8, dt); }
        if (spine) {
          spine.rotation.x = spring("spine.x", breath * 0.012, 10, dt);
          spine.rotation.y = spring("spine.y", ruido(t * 0.5, 3) * 0.025, 10, dt);
          spine.rotation.z = spring("spine.z", -ruido(t * 0.35, 2) * 0.02, 10, dt);
        }
        if (chest) chest.rotation.x = Math.sin(t * 1.35 + 0.5) * 0.01;
        if (head) {
          head.rotation.x = spring("head.x", gaze.x * 0.4 + ruido(t * 0.7, 4) * 0.015 + pointer.y * 0.08, 30, dt);
          head.rotation.y = spring("head.y", gaze.y * 0.5 + ruido(t * 0.5, 5) * 0.025 + pointer.x * 0.22, 24, dt);
          head.rotation.z = spring("head.z", ruido(t * 0.4, 6) * 0.025, 18, dt);
          if (neck) neck.rotation.y = head.rotation.y * 0.35;
        }

        // Brazos abajo con un vaivén leve; el resorte da la inercia
        for (const [name, base] of Object.entries(POSE)) {
          const node = bone(name);
          if (!node) continue;
          const side = name.startsWith("left") ? 1 : -1, type = name.replace(/^(left|right)/, ""), seed = (side > 0 ? 10 : 20) + type.length;
          const o = [...base];
          if (type === "UpperArm") { o[0] += breath * 0.015 + ruido(t * 0.5, seed) * 0.025; o[2] += side * ruido(t * 0.45, seed + 1) * 0.03; }
          else if (type === "LowerArm") o[1] += -side * (ruido(t * 0.55, seed) * 0.06 + 0.04);
          else o[2] += ruido(t * 0.7, seed) * 0.05;
          node.rotation.set(spring(name + ".x", o[0], RIGIDEZ[type], dt), spring(name + ".y", o[1], RIGIDEZ[type], dt), spring(name + ".z", o[2], RIGIDEZ[type], dt));
        }

        // Dedos relajados con micromovimiento
        for (const lado of ["left", "right"]) {
          const s = lado === "left" ? -1 : 1;
          ["Index", "Middle", "Ring", "Little"].forEach((d, i) => {
            const curl = 0.32 + i * 0.07 + ruido(t * 0.8, i * 3 + (lado === "left" ? 0 : 50)) * 0.06;
            ["Proximal", "Intermediate", "Distal"].forEach((f, j) => bone(`${lado}${d}${f}`)?.rotation.set(0, 0, s * spring(`${lado}${d}${f}`, curl * (1 - j * 0.12), 22, dt)));
          });
          ["Proximal", "Intermediate", "Distal"].forEach((f) => bone(`${lado}Thumb${f}`)?.rotation.set(0, s * 0.3, s * 0.2));
        }
        vrm.update(dt);
      }
      camera.lookAt(0, 1.2, 0);
      renderer.render(scene, camera);
    }

    return () => {
      disposed = true;
      near.disconnect(); seen.disconnect();
      cancelAnimationFrame(raf);
      cleanup();
      if (vrm) VRMUtils.deepDispose(vrm.scene);
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <div className="aria">
      <div ref={host} className="aria-canvas" aria-hidden="true" />
      {load.state !== "ready" && (
        <div className="aria-wait">
          <span>{load.state === "error" ? "No se pudo cargar el avatar" : load.state === "idle" ? "ARIA" : "Cargando avatar VRM"}</span>
          {load.state === "loading" && <b>{load.pct}%</b>}
        </div>
      )}
      <p className="aria-tag">Avatar VRM de ARIA · demostración</p>
    </div>
  );
}
