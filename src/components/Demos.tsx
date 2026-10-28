// Demostraciones vivas de cada proyecto: se usan con el ratón, el dedo o un mando.
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ---------- Eyetracking: una web de ejemplo que se calienta donde miras ---------- */
export function EyeDemo() {
  const cv = useRef<HTMLCanvasElement>(null);
  const pts = useRef<[number, number][]>([]);

  useEffect(() => {
    const c = cv.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const W = c.clientWidth, H = c.clientHeight, d = Math.min(devicePixelRatio, 2);
      if (c.width !== W * d) { c.width = W * d; c.height = H * d; }
      ctx.setTransform(d, 0, 0, d, 0, 0);
      // Maqueta de una página web
      ctx.fillStyle = "#f2f0eb"; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#d9d5cc";
      ctx.fillRect(W * 0.06, H * 0.06, W * 0.2, H * 0.06);
      [0.55, 0.68, 0.81].forEach((x) => ctx.fillRect(W * x, H * 0.075, W * 0.1, H * 0.03));
      ctx.fillStyle = "#bfb8aa"; ctx.fillRect(W * 0.06, H * 0.2, W * 0.5, H * 0.1);
      ctx.fillStyle = "#d9d5cc";
      for (let i = 0; i < 4; i++) ctx.fillRect(W * 0.06, H * (0.36 + i * 0.05), W * (0.45 - i * 0.04), H * 0.025);
      ctx.fillStyle = "#c9a45a"; ctx.fillRect(W * 0.06, H * 0.6, W * 0.18, H * 0.07);
      ctx.fillStyle = "#cfc9bd"; ctx.fillRect(W * 0.62, H * 0.2, W * 0.32, H * 0.5);
      ctx.fillStyle = "#d9d5cc";
      [0.06, 0.37, 0.68].forEach((x) => ctx.fillRect(W * x, H * 0.76, W * 0.26, H * 0.18));
      // Mapa de calor
      for (const [x, y] of pts.current) {
        const g = ctx.createRadialGradient(x * W, y * H, 0, x * W, y * H, 38);
        g.addColorStop(0, "rgba(255,40,0,0.10)");
        g.addColorStop(0.5, "rgba(255,190,0,0.06)");
        g.addColorStop(1, "rgba(0,120,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x * W - 38, y * H - 38, 76, 76);
      }
    };
    draw();
    // Un recorrido de mirada de ejemplo para que la demo no empiece vacía
    const seed: [number, number][] = [[0.15, 0.09], [0.3, 0.25], [0.2, 0.25], [0.15, 0.38], [0.14, 0.63], [0.78, 0.4]];
    seed.forEach(([x, y]) => { for (let i = 0; i < 14; i++) pts.current.push([x + (Math.random() - 0.5) * 0.08, y + (Math.random() - 0.5) * 0.06]); });
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    pts.current.push([(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]);
    if (pts.current.length > 900) pts.current.splice(0, 100);
  };

  return (
    <div className="demo demo-eye" data-ui>
      <canvas ref={cv} onPointerMove={onMove} role="img" aria-label="Página de ejemplo que se llena de calor donde pasas el cursor o el dedo" />
      <div className="demo-bar">
        <p>Pasa el cursor o el dedo: tu mirada calienta la página.</p>
        <button type="button" className="chip-btn" onClick={() => (pts.current = [])}>Borrar</button>
      </div>
    </div>
  );
}

/* ---------- GLPI: el flujo de alta de personal, paso a paso ---------- */
const FLOW = [
  { k: "Talento Humano", d: "Registra el ingreso" },
  { k: "API de GLPI", d: "Crea la ficha y el ticket" },
  { k: "MySQL", d: "Guarda al empleado" },
  { k: "Active Directory", d: "Cuenta y permisos" },
];
export function FlowDemo() {
  const [step, setStep] = useState(-1);
  const [mode, setMode] = useState<"Ingreso" | "Egreso">("Ingreso");
  const run = (m: "Ingreso" | "Egreso") => {
    setMode(m); setStep(0);
    FLOW.forEach((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 650));
  };
  const done = step >= FLOW.length;
  return (
    <div className="demo demo-flow" data-ui>
      <ol className="flow">
        {FLOW.map((f, i) => (
          <motion.li key={f.k} className="flow-node" animate={{ backgroundColor: step > i ? "#c9a45a" : "#1e1a16", color: step > i ? "#0c0a08" : "#ffffff", scale: step === i + 1 ? 1.04 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
            <b>{f.k}</b><span>{mode === "Egreso" && i === 3 ? "Desactiva la cuenta" : f.d}</span>
            {i < FLOW.length - 1 && <motion.i className="flow-link" animate={{ scaleY: step > i ? 1 : 0 }} />}
          </motion.li>
        ))}
      </ol>
      <div className="demo-bar">
        <AnimatePresence mode="wait">
          <motion.p key={done ? "ok" : "go"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {done ? `${mode} completado sin tocar nada a mano.` : "Simula un proceso real de Kruger Corp."}
          </motion.p>
        </AnimatePresence>
        <div className="chip-row">
          <button type="button" className="chip-btn" onClick={() => run("Ingreso")}>Simular ingreso</button>
          <button type="button" className="chip-btn" onClick={() => run("Egreso")}>Simular egreso</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Agentes de IA: de un contrato a los datos de Contrat@ ---------- */
const FIELDS: [string, string][] = [
  ["Trabajador", "Persona de ejemplo"],
  ["Tipo de contrato", "Indefinido, tiempo completo"],
  ["Fecha de alta", "03/11/2026"],
  ["Categoría", "Oficial administrativo"],
  ["Destino", "Alta en Geyce y aviso en Contrat@"],
];
export function AgentDemo() {
  const [n, setN] = useState(0);
  const run = () => { setN(0); FIELDS.forEach((_, i) => setTimeout(() => setN(i + 1), 450 * (i + 1))); };
  return (
    <div className="demo demo-agent" data-ui>
      <div className="agent-doc">
        <p className="agent-title">Contrato de trabajo.pdf</p>
        {Array.from({ length: 9 }).map((_, i) => <i key={i} style={{ width: `${88 - (i % 3) * 18}%` }} />)}
      </div>
      <motion.div className="agent-arrow" animate={{ x: n > 0 && n < FIELDS.length ? [0, 10, 0] : 0 }} transition={{ repeat: n > 0 && n < FIELDS.length ? Infinity : 0, duration: 0.6 }} aria-hidden="true">→</motion.div>
      <dl className="agent-out">
        {FIELDS.map(([k, v], i) => (
          <motion.div key={k} initial={false} animate={{ opacity: n > i ? 1 : 0.18, x: n > i ? 0 : 8 }}>
            <dt>{k}</dt><dd>{n > i ? v : "…"}</dd>
          </motion.div>
        ))}
      </dl>
      <div className="demo-bar">
        <p>{n >= FIELDS.length ? "Datos listos para revisar y enviar." : "Un agente de Claude lee el contrato por mí."}</p>
        <button type="button" className="chip-btn" onClick={run}>Ejecutar agente</button>
      </div>
    </div>
  );
}

/* ---------- Drift Cero: probador de stick con ratón, dedo o mando real ---------- */
export function StickDemo() {
  const pad = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [source, setSource] = useState("ratón o dedo");
  const DEAD = 0.08;

  useEffect(() => {
    let raf = 0;
    const poll = () => {
      raf = requestAnimationFrame(poll);
      const gp = navigator.getGamepads?.().find(Boolean);
      if (gp) { setSource(gp.id.split("(")[0].trim() || "mando"); setPos({ x: gp.axes[0] ?? 0, y: gp.axes[1] ?? 0 }); }
    };
    poll();
    return () => cancelAnimationFrame(raf);
  }, []);

  const move = (e: React.PointerEvent) => {
    if (!dragging) return;
    const r = pad.current!.getBoundingClientRect();
    let x = ((e.clientX - r.left) / r.width) * 2 - 1, y = ((e.clientY - r.top) / r.height) * 2 - 1;
    const m = Math.hypot(x, y); if (m > 1) { x /= m; y /= m; }
    setPos({ x, y });
  };
  const release = () => {
    setDragging(false);
    // Al soltar, el stick vuelve al centro… casi: así se ve el drift
    setPos({ x: (Math.random() - 0.5) * 0.24, y: (Math.random() - 0.5) * 0.24 });
  };
  const mag = Math.hypot(pos.x, pos.y);
  const drift = !dragging && mag > DEAD;

  return (
    <div className="demo demo-stick" data-ui>
      <div ref={pad} className="stick-pad" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); move(e); }} onPointerMove={move} onPointerUp={release} onPointerCancel={release}
        role="slider" aria-label="Stick del mando" aria-valuetext={`x ${pos.x.toFixed(2)}, y ${pos.y.toFixed(2)}`} tabIndex={0}
        onKeyDown={(e) => { const s = 0.2; const k: Record<string, [number, number]> = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }; if (k[e.key]) { e.preventDefault(); setPos((p) => ({ x: Math.max(-1, Math.min(1, p.x + k[e.key][0])), y: Math.max(-1, Math.min(1, p.y + k[e.key][1])) })); } }}>
        <span className="stick-dead" style={{ width: `${DEAD * 100}%`, height: `${DEAD * 100}%` }} />
        <motion.span className="stick-knob" style={{ x: "-50%", y: "-50%" }} animate={{ left: `${50 + pos.x * 42}%`, top: `${50 + pos.y * 42}%`, backgroundColor: drift ? "#e5484d" : "#c9a45a" }} transition={{ type: "spring", stiffness: dragging ? 900 : 260, damping: dragging ? 50 : 14 }} />
      </div>
      <div className="stick-read">
        <p>X <b>{pos.x.toFixed(2)}</b></p>
        <p>Y <b>{pos.y.toFixed(2)}</b></p>
        <p className={drift ? "warn" : ""}>{drift ? "Drift detectado" : dragging ? "Moviendo" : "Sin drift"}</p>
      </div>
      <div className="demo-bar"><p>Arrastra el stick y suéltalo. Entrada: {source}.</p></div>
    </div>
  );
}

/* ---------- CPRIQ: un robot bípedo que camina y patea ---------- */
export function RobotDemo() {
  const [kick, setKick] = useState(0);
  return (
    <div className="demo demo-robot" data-ui>
      <motion.svg viewBox="0 0 200 220" className="robot" animate={{ x: [0, 18, 0, -18, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} aria-label="Robot humanoide bípedo de competencia" role="img">
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
          <rect x="70" y="20" width="60" height="44" rx="6" fill="#6b5f52" />
          <motion.rect x="82" y="34" width="12" height="10" fill="#c9a45a" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1] }} />
          <motion.rect x="106" y="34" width="12" height="10" fill="#c9a45a" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1] }} />
          <rect x="62" y="70" width="76" height="62" rx="4" fill="#8a7b6a" />
          <rect x="88" y="86" width="24" height="24" fill="#c9a45a" />
          <motion.rect x="40" y="74" width="16" height="50" rx="4" fill="#6b5f52" style={{ originX: "48px", originY: "76px" }} animate={{ rotate: [12, -12, 12] }} transition={{ duration: 1, repeat: Infinity }} />
          <motion.rect x="144" y="74" width="16" height="50" rx="4" fill="#6b5f52" style={{ originX: "152px", originY: "76px" }} animate={{ rotate: [-12, 12, -12] }} transition={{ duration: 1, repeat: Infinity }} />
        </motion.g>
        <motion.rect x="74" y="136" width="20" height="62" rx="4" fill="#6b5f52" style={{ originX: "84px", originY: "138px" }} animate={{ rotate: [-14, 14, -14] }} transition={{ duration: 1, repeat: Infinity }} />
        <motion.rect key={kick} x="106" y="136" width="20" height="62" rx="4" fill="#6b5f52" style={{ originX: "116px", originY: "138px" }} animate={kick ? { rotate: [0, -70, 0] } : { rotate: [14, -14, 14] }} transition={kick ? { duration: 0.6 } : { duration: 1, repeat: Infinity }} onAnimationComplete={() => kick && setKick(0)} />
        <rect x="20" y="206" width="160" height="6" fill="#c9a45a" />
      </motion.svg>
      <div className="demo-bar">
        <p>Humanoides bípedos y warbots en torneos interuniversitarios.</p>
        <button type="button" className="chip-btn" onClick={() => setKick((k) => k + 1)}>¡Patada!</button>
      </div>
    </div>
  );
}
