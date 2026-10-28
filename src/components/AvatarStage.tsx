// El avatar VRM real de la tesis: mira al cursor, parpadea y "habla" al tocarlo.
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, type VRM } from "@pixiv/three-vrm";

const LINES = [
  "¡Hola! Soy el asistente de la carrera de TI.",
  "Pregúntame por materias, horarios o requisitos.",
  "Leo el plan de estudios con RAG y te respondo en voz alta.",
];

export function AvatarStage() {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [line, setLine] = useState<string | null>(null);
  const talkUntil = useRef(0);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;

    // Solo carga el modelo (7 MB) cuando el panel está cerca de la pantalla
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      start();
    }, { rootMargin: "600px 600px" });
    io.observe(el);

    function start() {
      setState("loading");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, el!.clientWidth / el!.clientHeight, 0.1, 10);
      camera.position.set(0, 1.38, 1.55);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(el!.clientWidth, el!.clientHeight);
      el!.appendChild(renderer.domElement);
      const key = new THREE.DirectionalLight(0xfff1dc, 2.2);
      key.position.set(1, 1.5, 1.2);
      const rim = new THREE.DirectionalLight(0xc9a45a, 2.5);
      rim.position.set(-1.2, 1.6, -1);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.9));

      const lookTarget = new THREE.Object3D();
      lookTarget.position.set(0, 1.4, 1.5);
      scene.add(lookTarget);
      const pointer = new THREE.Vector2(0, 0);
      const onMove = (ev: PointerEvent) => {
        const r = el!.getBoundingClientRect();
        pointer.set(((ev.clientX - r.left) / r.width) * 2 - 1, -(((ev.clientY - r.top) / r.height) * 2 - 1));
      };
      addEventListener("pointermove", onMove, { passive: true });

      let vrm: VRM | null = null;
      const loader = new GLTFLoader();
      loader.register((parser) => new VRMLoaderPlugin(parser));
      loader.load("/models/avatar.vrm", (gltf) => {
        if (disposed) return;
        vrm = gltf.userData.vrm as VRM;
        vrm.scene.rotation.y = Math.PI;
        const h = vrm.humanoid;
        const lu = h.getNormalizedBoneNode("leftUpperArm"), ru = h.getNormalizedBoneNode("rightUpperArm");
        if (lu && ru) { lu.rotation.z = 1.15; ru.rotation.z = -1.15; }
        if (vrm.lookAt) vrm.lookAt.target = lookTarget;
        scene.add(vrm.scene);
        setState("ready");
      }, undefined, () => setState("error"));

      const clock = new THREE.Clock();
      let nextBlink = 2;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const dt = clock.getDelta(), t = clock.elapsedTime;
        lookTarget.position.set(pointer.x * 0.8, 1.4 + pointer.y * 0.5, 1.5);
        if (vrm) {
          const em = vrm.expressionManager;
          const spine = vrm.humanoid.getNormalizedBoneNode("spine");
          const head = vrm.humanoid.getNormalizedBoneNode("head");
          if (spine) spine.rotation.x = Math.sin(t * 1.4) * 0.015;
          if (head) { head.rotation.y = pointer.x * 0.35; head.rotation.x = -pointer.y * 0.15; }
          if (em) {
            if (t > nextBlink) { em.setValue("blink", 1); if (t > nextBlink + 0.12) { em.setValue("blink", 0); nextBlink = t + 2 + Math.random() * 3; } }
            const talking = performance.now() < talkUntil.current;
            em.setValue("aa", talking ? Math.abs(Math.sin(t * 14)) * 0.8 : 0);
            em.setValue("happy", talking ? 0.3 : 0.15);
          }
          vrm.update(dt);
        }
        renderer!.render(scene, camera);
      };
      loop();

      const ro = new ResizeObserver(() => {
        if (!renderer) return;
        camera.aspect = el!.clientWidth / el!.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(el!.clientWidth, el!.clientHeight);
      });
      ro.observe(el!);
      cleanup = () => { removeEventListener("pointermove", onMove); ro.disconnect(); };
    }

    let cleanup = () => {};
    return () => {
      disposed = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      cleanup();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  const speak = () => {
    const next = LINES[(LINES.indexOf(line ?? "") + 1) % LINES.length];
    setLine(next);
    talkUntil.current = performance.now() + next.length * 55;
  };

  return (
    <div className="avatar" data-ui>
      <div ref={host} className="avatar-canvas" aria-hidden="true" />
      {state !== "ready" && <p className="avatar-wait">{state === "error" ? "No se pudo cargar el avatar." : "Cargando el avatar de la tesis…"}</p>}
      {line && <p className="avatar-bubble" aria-live="polite">{line}</p>}
      <div className="avatar-stats">
        <p><b>92 %</b> Hit Rate Top-3</p>
        <p><b>3,2 s</b> de extremo a extremo</p>
        <p><b>13</b> estudiantes en pruebas</p>
      </div>
      <button type="button" className="btn avatar-btn" onClick={speak} disabled={state !== "ready"}>Hablar con el avatar</button>
    </div>
  );
}
