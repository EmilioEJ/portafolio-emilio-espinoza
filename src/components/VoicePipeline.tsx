// Del PDF a la voz: el recorrido de ARIA por dentro, con las latencias medias medidas en la tesis.
import { useRef, useState } from "react";
import FluidOrb from "@/components/ui/fluid-orb";
import { ARIA_LATENCY as L } from "@/data";

type Stage = { k: string; tool: string; d: string; ms?: number };
const INDEX: Stage[] = [
  { k: "PDF", tool: "Documento de la carrera", d: "Malla, prácticas, titulación, aranceles y becas." },
  { k: "Lectura", tool: "pymupdf4llm", d: "Convierte el PDF en texto con su estructura." },
  { k: "Fragmentos", tool: "800 / 160 caracteres", d: "89 fragmentos con solapamiento." },
  { k: "Vectores", tool: "SentenceTransformers", d: "Embeddings multilingües MiniLM-L12-v2." },
  { k: "Índice", tool: "ChromaDB", d: "Se reconstruye en 10 s, sin reentrenar nada." },
];
const ASK: Stage[] = [
  { k: "Voz", tool: "Whisper-v3 · Groq", d: "Transcripción con 1,9 % de error.", ms: L.stt },
  { k: "Búsqueda", tool: "RAG · ChromaDB", d: "Los 3 fragmentos más cercanos.", ms: L.rag },
  { k: "Respuesta", tool: "Nemotron · Ollama", d: `Primer texto a los ${Math.round(L.ttfb)} ms por WebSocket.`, ms: L.llm },
  { k: "Audio", tool: "ElevenLabs", d: "Primer audio con lip-sync.", ms: L.tts },
];
const fmt = (ms: number) => (ms >= 1000 ? `${(ms / 1000).toFixed(2).replace(".", ",")} s` : `${Math.round(ms)} ms`);

export function VoicePipeline() {
  const [lane, setLane] = useState<"index" | "ask" | null>(null);
  const [step, setStep] = useState(-1);
  const [clock, setClock] = useState(0);
  const timers = useRef<number[]>([]);

  const run = (which: "index" | "ask") => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLane(which); setStep(0); setClock(0);
    const stages = which === "index" ? INDEX : ASK;
    // La animación va a velocidad real ×2 para que se pueda seguir con la vista
    let at = 0;
    stages.forEach((s, i) => {
      const ms = which === "ask" ? s.ms! : 2000;
      at += which === "ask" ? ms * 2 : 520;
      timers.current.push(window.setTimeout(() => { setStep(i + 1); if (which === "ask") setClock((c) => c + ms); }, at));
    });
  };

  const view = (stages: Stage[], which: "index" | "ask") => (
    <ol className={`pipe-lane${lane === which ? " live" : ""}`}>
      {stages.map((s, i) => {
        const on = lane === which && step > i, now = lane === which && step === i;
        return (
          <li key={s.k} className={`pipe-st${on ? " on" : ""}${now ? " now" : ""}`}>
            <span className="pipe-n">{String(i + 1).padStart(2, "0")}</span>
            <b>{s.k}</b>
            <span className="pipe-tool">{s.tool}</span>
            <span className="pipe-d">{s.d}</span>
            {s.ms !== undefined && <span className="pipe-ms">{fmt(s.ms)}</span>}
            <i className="pipe-bar" />
          </li>
        );
      })}
    </ol>
  );

  const done = lane === "ask" && step >= ASK.length;
  return (
    <div className="pipe">
      <div className="pipe-row">
        <div className="pipe-col">
          <p className="k">Una vez · indexar el documento</p>
          {view(INDEX, "index")}
          <button type="button" className="btn-k" onClick={() => run("index")} data-cursor>Indexar el PDF</button>
        </div>
        <div className={`pipe-orb${lane === "ask" && step >= 0 && !done ? " busy" : ""}`}>
          <FluidOrb size={200} color={done ? "#ff5a3c" : "#e0231c"} />
          <p className="pipe-clock" aria-live="polite">
            {lane === "ask" ? <><b>{fmt(clock)}</b><span>{done ? "latencia percibida" : "acumulado"}</span></> : <><b>{fmt(L.perceived)}</b><span>latencia percibida media</span></>}
          </p>
        </div>
        <div className="pipe-col">
          <p className="k">Cada pregunta · de la voz a la voz</p>
          {view(ASK, "ask")}
          <button type="button" className="btn-k" onClick={() => run("ask")} data-cursor>Hacer una pregunta</button>
        </div>
      </div>
      <p className="pipe-note">Medias de la evaluación del 7 de octubre de 2026 con el modelo local nemotron-3-nano:4b. La animación va al doble de la velocidad real.</p>
    </div>
  );
}
