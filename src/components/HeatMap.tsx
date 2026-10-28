// El mapa de calor del visitante: el cursor (o el dedo y el scroll) es su "mirada".
import { useEffect, useRef, useState } from "react";

const pts: [number, number, number][] = [];
let tracking = false;
function startTracking() {
  if (tracking) return;
  tracking = true;
  let last = 0;
  addEventListener("pointermove", (e) => {
    const t = performance.now();
    if (t - last < 40) return;
    last = t;
    pts.push([e.clientX + scrollX, e.clientY + scrollY, 1]);
  }, { passive: true });
  setInterval(() => {
    if (document.hidden) return;
    pts.push([innerWidth / 2, scrollY + innerHeight * 0.45, 0.6]);
    if (pts.length > 6000) pts.splice(0, 1000);
  }, 400);
}

// Paleta: transparente → marrón → dorado → blanco
let palette: Uint8ClampedArray | null = null;
function getPalette() {
  if (palette) return palette;
  const c = document.createElement("canvas");
  c.width = 256; c.height = 1;
  const g = c.getContext("2d")!;
  const lg = g.createLinearGradient(0, 0, 256, 0);
  lg.addColorStop(0, "rgba(0,0,0,0)"); lg.addColorStop(0.25, "#5a3d12"); lg.addColorStop(0.6, "#c9a45a"); lg.addColorStop(1, "#ffffff");
  g.fillStyle = lg; g.fillRect(0, 0, 256, 1);
  return (palette = g.getImageData(0, 0, 256, 1).data);
}

function draw(canvas: HTMLCanvasElement) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const W = canvas.clientWidth, H = canvas.clientHeight;
  if (!W || !H) return null;
  canvas.width = W * dpr; canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // La página se reparte en columnas, como un pliego, para que la miniatura se lea
  const docW = document.documentElement.clientWidth, docH = document.documentElement.scrollHeight;
  const k = Math.max(1, Math.round(Math.sqrt((docH * W) / (docW * H))));
  const gap = 12, colH = Math.ceil(docH / k);
  const sc = Math.min(H / colH, (W - gap * (k - 1)) / (k * docW));
  const ox = (W - (k * docW * sc + gap * (k - 1))) / 2;
  const inCol = (g: CanvasRenderingContext2D, c: number, fn: (g: CanvasRenderingContext2D) => void) => {
    g.save();
    g.translate(ox + c * (docW * sc + gap), -c * colH * sc);
    g.scale(sc, sc);
    g.beginPath(); g.rect(0, c * colH, docW, colH); g.clip();
    fn(g);
    g.restore();
  };

  const rects = [...document.querySelectorAll("h1, h2, h3, p, img, canvas, table, .names, .slip, .tile, .demo")]
    .map((el) => { const r = el.getBoundingClientRect(); return [r.left, r.top + scrollY, r.width, r.height]; })
    .filter((r) => r[2] && r[3]);
  for (let c = 0; c < k; c++) inCol(ctx, c, (g) => {
    g.fillStyle = "#0c0a08"; g.fillRect(0, c * colH, docW, colH);
    g.fillStyle = "#2b2620";
    for (const [x, y, w, h] of rects) g.fillRect(x, y, w, h);
  });

  const off = document.createElement("canvas");
  off.width = canvas.width; off.height = canvas.height;
  const o = off.getContext("2d")!;
  o.scale(dpr, dpr);
  const rad = Math.max(16 / sc, 110);
  for (let c = 0; c < k; c++) inCol(o, c, (g) => {
    for (const [x, y, w] of pts) {
      if (y < c * colH - rad || y > (c + 1) * colH + rad) continue;
      const gr = g.createRadialGradient(x, y, 0, x, y, rad);
      gr.addColorStop(0, `rgba(0,0,0,${0.12 * w})`); gr.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
  });
  const pal = getPalette();
  const img = o.getImageData(0, 0, off.width, off.height), d = img.data;
  let max = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i] > max) max = d[i];
  const boost = max ? Math.min(6, 255 / max) : 1;
  for (let i = 0; i < d.length; i += 4) {
    const a = Math.min(255, Math.round(d[i + 3] * boost));
    if (!a) continue;
    d[i] = pal[a * 4]; d[i + 1] = pal[a * 4 + 1]; d[i + 2] = pal[a * 4 + 2]; d[i + 3] = Math.min(235, a * 1.4);
  }
  o.putImageData(img, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(off, 0, 0);

  // Sección con más puntos
  const secs = [...document.querySelectorAll<HTMLElement>("[data-name]")]
    .filter((el) => !["Tu mapa de calor", "Pie"].includes(el.dataset.name!))
    .map((el) => { const r = el.getBoundingClientRect(); return { name: el.dataset.name!, top: r.top + scrollY, bottom: r.bottom + scrollY }; });
  const score = new Map<string, number>();
  for (const [, y, w] of pts) { const s = secs.find((x) => y >= x.top && y < x.bottom); if (s) score.set(s.name, (score.get(s.name) || 0) + w); }
  return [...score].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

export function HeatMap() {
  const cv = useRef<HTMLCanvasElement>(null);
  const [top, setTop] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    startTracking();
    let timer: number | undefined;
    const tick = () => { const t = draw(cv.current!); if (t) setTop(t); setCount(pts.length); };
    const io = new IntersectionObserver(([e]) => { clearInterval(timer); if (e.isIntersecting) { tick(); timer = window.setInterval(tick, 1000); } });
    io.observe(cv.current!);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  return (
    <section className="heat wrap" id="mapa" data-name="Tu mapa de calor">
      <div className="heat-text">
        <h2 className="h-mid" data-reveal>Esto es lo que miraste</h2>
        <p data-reveal>Mi prototipo de eyetracking convierte la mirada en un mapa de calor. Esta página hizo lo mismo con tu cursor, o con tu dedo y tu scroll, desde que llegaste. No se envía a ningún sitio: vive solo en tu navegador.</p>
        <p className="heat-out" data-reveal aria-live="polite">Donde más te quedaste: <strong>{top ?? "aún no lo sé"}</strong>. Puntos registrados: <strong>{count.toLocaleString("es-EC")}</strong>.</p>
        <button className="btn btn-ghost" type="button" onClick={() => { pts.length = 0; setTop(null); draw(cv.current!); setCount(0); }}>Borrar y empezar de nuevo</button>
      </div>
      <div className="heat-map">
        <canvas ref={cv} role="img" aria-label="Miniatura de esta página con un mapa de calor de tu recorrido" />
      </div>
    </section>
  );
}
