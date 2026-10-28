// Del PDF a la voz: el recorrido de ARIA por dentro, con las latencias medias medidas en la tesis.
import { useRef, useState } from "react";
import FluidOrb from "@/components/ui/fluid-orb";
import { ARIA_LATENCY as L } from "@/data";
import { CONTENT, type Stage } from "@/content";
import { useLang } from "@/i18n";

const ASK_MS = [L.stt, L.rag, L.llm, L.tts];

export function VoicePipeline() {
  const { lang } = useLang();
  const t = CONTENT[lang].pipe;
  const fmt = (ms: number) => (ms >= 1000
    ? `${(ms / 1000).toLocaleString(CONTENT[lang].meta.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`
    : `${Math.round(ms)} ms`);
  const [lane, setLane] = useState<"index" | "ask" | null>(null);
  const [step, setStep] = useState(-1);
  const [clock, setClock] = useState(0);
  const timers = useRef<number[]>([]);

  const run = (which: "index" | "ask") => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLane(which); setStep(0); setClock(0);
    // La pregunta va a la mitad de la velocidad real para que se pueda seguir con la vista
    let at = 0;
    (which === "index" ? t.index : t.ask).forEach((_, i) => {
      at += which === "ask" ? ASK_MS[i] * 2 : 520;
      timers.current.push(window.setTimeout(() => { setStep(i + 1); if (which === "ask") setClock((c) => c + ASK_MS[i]); }, at));
    });
  };

  const view = (stages: Stage[], which: "index" | "ask") => (
    <ol className={`pipe-lane${lane === which ? " live" : ""}`}>
      {stages.map((s, i) => {
        const on = lane === which && step > i, now = lane === which && step === i;
        return (
          <li key={i} className={`pipe-st${on ? " on" : ""}${now ? " now" : ""}`}>
            <span className="pipe-n">{String(i + 1).padStart(2, "0")}</span>
            <b>{s.k}</b>
            <span className="pipe-tool">{s.tool}</span>
            <span className="pipe-d">{s.d}</span>
            {which === "ask" && <span className="pipe-ms">{fmt(ASK_MS[i])}</span>}
            <i className="pipe-bar" />
          </li>
        );
      })}
    </ol>
  );

  const done = lane === "ask" && step >= t.ask.length;
  return (
    <div className="pipe">
      <div className="pipe-row">
        <div className="pipe-col">
          <p className="k">{t.once}</p>
          {view(t.index, "index")}
          <button type="button" className="btn-k" onClick={() => run("index")} data-cursor>{t.indexBtn}</button>
        </div>
        <div className={`pipe-orb${lane === "ask" && step >= 0 && !done ? " busy" : ""}`}>
          <FluidOrb size={200} color={done ? "#ff5a3c" : "#e0231c"} />
          <p className="pipe-clock" aria-live="polite">
            {lane === "ask" ? <><b>{fmt(clock)}</b><span>{done ? t.perceived : t.total}</span></> : <><b>{fmt(L.perceived)}</b><span>{t.perceivedAvg}</span></>}
          </p>
        </div>
        <div className="pipe-col">
          <p className="k">{t.each}</p>
          {view(t.ask, "ask")}
          <button type="button" className="btn-k" onClick={() => run("ask")} data-cursor>{t.askBtn}</button>
        </div>
      </div>
      <p className="pipe-note">{t.note}</p>
    </div>
  );
}
