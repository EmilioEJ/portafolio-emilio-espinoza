import { lazy, Suspense, useEffect } from "react";
import { EXPERIENCE, EDUCATION, LANGUAGES, CERTS, EMAIL, GITHUB, LINKEDIN, REPO, type Link } from "@/data";
import { Skills } from "@/components/Skills";
import { VoicePipeline } from "@/components/VoicePipeline";

// three.js + VRM pesan: el avatar se carga aparte y solo cuando su proyecto se acerca
const AriaStage = lazy(() => import("@/components/AriaStage").then((m) => ({ default: m.AriaStage })));

const MAIL = `mailto:${EMAIL}?subject=Hola%20Emilio%2C%20vi%20tu%20portafolio`;
const OUT = { target: "_blank", rel: "noopener" } as const;

const Arrow = () => (
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" aria-hidden="true"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg>
);
const Mark = ({ size = 34 }: { size?: number }) => (
  <svg viewBox="0 0 44 44" fill="none" width={size} height={size} aria-hidden="true">
    <circle cx="22" cy="25" r="8.6" fill="#e0231c" fillOpacity=".9" />
    <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" strokeWidth="1.5" />
    <path d="M14 35.5h16" stroke="#dfe7e0" strokeWidth="1.2" strokeOpacity=".6" />
  </svg>
);
const Head = ({ n, title, alt }: { n: string; title: string; alt: string }) => (
  <div className="sec-head" data-rv="fade"><span className="k"><b>{n}</b> — {title}</span><span className="rule" /><span className="k">{alt}</span></div>
);

type Case = { id: string; n: string; when: string; title: string; text: string; metrics?: [string, string][]; stack: string[]; links: Link[]; repo?: string };
function CaseHead({ c }: { c: Case }) {
  return (
    <header className="case-head">
      <div className="case-top" data-rv="fade"><span className="case-n">{c.n}</span><span className="case-when">{c.when}</span></div>
      <h3 className="case-title" data-rv="up">{c.repo ? <a href={c.repo} {...OUT} data-cursor>{c.title}</a> : c.title}</h3>
      <p className="body-lg case-text" data-rv="up">{c.text}</p>
      {c.metrics && (
        <dl className="case-metrics" data-rv="up">
          {c.metrics.map(([v, k]) => <div key={k}><dt>{v}</dt><dd>{k}</dd></div>)}
        </dl>
      )}
      <ul className="case-stack" data-rv="fade">{c.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <p className="case-links" data-rv="fade">
        {c.links.map((l) => l.href
          ? <a key={l.label} className="plink" href={l.href} {...OUT} data-cursor><span>{l.label}</span><Arrow /></a>
          : <span key={l.label} className="plink off">{l.label}</span>)}
      </p>
    </header>
  );
}

const ARIA: Case = {
  id: "p-aria", n: "01", when: "Trabajo de titulación · Ene. – Jul. 2026",
  title: "ARIA, asistente virtual con RAG, voz y avatar 3D",
  text: "Un asistente académico multimodal para la carrera de TI: responde por texto o por voz con RAG local sobre los documentos oficiales, habla con un avatar VRM con lip-sync, detecta cuándo alguien se acerca sin guardar imágenes y trae un panel para cargar PDFs sin reentrenar el modelo.",
  metrics: [["92 %", "Hit Rate@3 del RAG"], ["1,9 %", "Error de transcripción"], ["10 / 10", "Preguntas fuera de tema rechazadas"], ["13", "Estudiantes en usabilidad"]],
  stack: ["FastAPI", "WebSockets", "ChromaDB", "SentenceTransformers", "Ollama", "Whisper-v3", "ElevenLabs", "Three.js", "VRM", "OpenCV", "MediaPipe", "Vite"],
  links: [{ label: "Repositorio", href: REPO.aria }, { label: "Documento de tesis", href: REPO.tesis }, { label: "Presentación de defensa", href: REPO.defensa }],
  repo: REPO.aria,
};
const GAZE: Case = {
  id: "p-gaze", n: "02", when: "Ayudante de investigación · Oct. 2025 – Ene. 2026",
  title: "GazeScope, eyetracking con una webcam normal",
  text: "Para el proyecto «Accesibilidad inteligente: neuromarketing para un diseño web inclusivo» convertí una webcam en un seguidor ocular de escritorio. Mide el iris dentro de cada ojo y la pose de la cabeza, se calibra con 13 puntos y 5 de validación, y graba la mirada sobre lo que había en pantalla para ver qué zonas de una web atraen la atención.",
  metrics: [["13 + 5", "Puntos de calibración y validación"], ["1,5–4°", "Error típico con webcam"], ["30 Hz", "Muestreo de la mirada"], ["I-VT", "Detección de fijaciones"]],
  stack: ["Python", "MediaPipe", "OpenCV", "solvePnP", "Filtro One Euro", "PySide6", "Mapas de calor"],
  links: [{ label: "Repositorio", href: REPO.gaze }], repo: REPO.gaze,
};
const SMALL: Case[] = [
  { id: "p-agentes", n: "03", when: "Asesores Espinoza & Jiménez · actualidad", title: "Agentes de IA para nóminas",
    text: "Skills y agentes de Claude que leen la documentación de un trabajador y preparan su alta en Geyce y la comunicación del contrato en Contrat@ del SEPE.",
    stack: ["Claude", "Claude Code", "Skills", "Geyce", "Contrat@"], links: [{ label: "Uso interno de la empresa" }] },
  { id: "p-glpi", n: "04", when: "Kruger Corp · 2025–26", title: "Altas y bajas automáticas con GLPI",
    text: "Flujos de ingreso y egreso de personal con la API de GLPI conectada a MySQL, para que Talento Humano no tenga que tocar cada cuenta a mano.",
    stack: ["API de GLPI", "MySQL", "Active Directory"], links: [{ label: "Sistema interno de Kruger" }] },
  { id: "p-drift", n: "05", when: "Proyecto personal · en desarrollo", title: "Drift Cero, tienda de mandos",
    text: "Tienda full stack de mandos de videojuego con React, Node.js, Express y MongoDB. Su portada trae un probador de drift como este: conecta un mando y míralo.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gamepad API"], links: [{ label: "Repositorio privado" }] },
  { id: "p-cpriq", n: "06", when: "Fundador · reconocido en 2026", title: "Club de Programación y Robótica CPRIQ",
    text: "Fundé el club en la Universidad Indoamérica. Diseño y programo el control de robots de competencia y participamos en torneos interuniversitarios de humanoides bípedos y warbots.",
    stack: ["C++", "Electrónica", "Algoritmos", "Robótica"], links: [{ label: "Club universitario" }] },
];
const SHOTS: [string, string, string][] = [
  ["aria-login", "Inicio de sesión", "Acceso con usuario y rol"],
  ["aria-conversacional", "Conversar", "Modo voz con el avatar y subtítulos"],
  ["aria-chatear", "Chatear", "Chat con respuestas por WebSocket"],
  ["aria-adminrag", "Admin RAG", "Carga de PDFs sin reentrenar"],
];

export default function App() {
  // El mundo 3D de Kage arranca cuando React ya pintó la página: lee los capítulos del DOM
  useEffect(() => {
    const w = window as unknown as { __kageBoot?: boolean };
    if (w.__kageBoot) return;
    w.__kageBoot = true;
    const add = (src: string) => new Promise<void>((ok, fail) => {
      const s = document.createElement("script");
      s.src = src; s.onload = () => ok(); s.onerror = fail;
      document.body.appendChild(s);
    });
    add("/landing-pages/secret-pathways-assets/three.min.js").then(() => add("/kage/world.js"));
  }, []);

  // El templo se ve entero en el inicio y se atenúa en los capítulos para que se lea el contenido
  useEffect(() => {
    const dim = document.getElementById("dim")!;
    let raf = 0;
    const apply = () => { raf = 0; dim.style.opacity = String(Math.min(1, scrollY / (innerHeight * 0.8))); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <canvas id="gl" aria-hidden="true" />
      <div id="dim" aria-hidden="true" />
      <div id="vignette" />
      <div id="grain" />
      <div className="cur-dot" id="cursor" />

      <div id="pre">
        <div className="pre-in">
          <div className="pre-mark">
            <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <circle cx="22" cy="24" r="9.5" stroke="#e0231c" strokeWidth="1.2" />
              <path d="M6 12h32M9.5 17h25M22 8v28" stroke="#dfe7e0" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="pre-jp jp">EMILIO ESPINOZA</div>
          <div className="pre-bar"><i id="pre-fill" /></div>
          <div className="pre-meta"><span>Preparando el portafolio</span><b><span id="pre-pct">0</span>%</b></div>
        </div>
      </div>

      <header className="nav" id="nav">
        <a className="brand" href="#top" data-cursor>
          <Mark />
          <span className="brand-tx"><b>EMILIO ESPINOZA</b><i>INGENIERO EN TI · QUITO</i></span>
        </a>
        <nav className="nav-links" id="navlinks" aria-label="Principal">
          {[["#sobre-mi", "Sobre mí", "ABOUT"], ["#proyectos", "Proyectos", "WORK"], ["#habilidades", "Habilidades", "SKILLS"], ["#contacto", "Contacto", "CONTACT"]].map(([h, t, a]) => (
            <a key={h} className="nav-link" href={h} data-cursor><span>{t}</span><span className="alt">{a}</span></a>
          ))}
        </nav>
        <button className="nav-burger" aria-label="Menú" data-cursor><i /><i /></button>
      </header>

      <div className="page" id="top">
        {/* ------------------------------------------------------------ inicio */}
        <section className="hero" id="hero" data-cam="0">
          <div className="hero-top">
            <div className="eyebrow" data-rv="fade"><span className="dot" /> Portafolio — Quito, Ecuador</div>
            <h1 className="display h-hero">
              <span className="mask-line"><span>Software que</span></span>
              <span className="mask-line"><span>entiende, escucha,</span></span>
              <span className="mask-line"><span>mira y responde.</span></span>
            </h1>
            <p className="hero-sub body" data-rv="up">Soy Emilio Espinoza, ingeniero en Tecnologías de la Información. Construyo software con IA: RAG, voz, visión artificial y agentes.</p>
          </div>
          <div className="hero-spacer" />
          <div className="hero-foot">
            <div className="hero-cue" data-rv="fade"><span>Desliza para entrar</span><span className="track"><i /></span></div>
          </div>
          <div className="word-fb" aria-hidden="true">EMILIO</div>
          <div className="hero-side" data-rv="up"><span className="v jp">EE</span></div>
        </section>

        {/* ------------------------------------------------------------ 01 sobre mí */}
        <section className="sec" id="sobre-mi" data-cam="1">
          <Head n="01" title="Sobre mí" alt="ABOUT" />
          <div className="gate-grid">
            <h2 className="display h-sec" data-rv="up">De los racks a la inteligencia artificial.</h2>
            <div className="gate-copy">
              <p className="lead" data-rv="up">Ingeniero en Tecnologías de la Información por la Universidad Indoamérica, enfocado en desarrollo web y de software con una base sólida en inteligencia artificial: arquitectura RAG, visión por computadora y diseño de skills y agentes.</p>
              <p className="body" data-rv="up">Mi trabajo de titulación fue ARIA, un asistente web multimodal con RAG, voz, visión artificial y avatar 3D. Antes automaticé procesos e infraestructura en Kruger Corp, y hoy diseño agentes de IA que ahorran horas de trabajo administrativo.</p>
              <a className="arrowlink" href="#proyectos" data-rv="fade" data-cursor><span>Ver los proyectos</span><span className="ar"><Arrow /></span></a>
            </div>
          </div>
          <div className="gate-stats" data-rv="up">
            <div><b>92 %</b><span>Acierto top-3 de ARIA</span></div>
            <div><b>1,9 s</b><span>Pregunta hablada a voz</span></div>
            <div><b>248 h</b><span>Prácticas en Kruger</span></div>
            <div><b>09</b><span>Certificaciones</span></div>
          </div>

          <div className="cur-head about-cur">
            <h2 className="display h-sec" data-rv="up">Dónde aprendí el oficio.</h2>
            <p className="body-lg" data-rv="up">Tres trabajos y dos títulos, del más reciente al primero. {LANGUAGES.map(([l, v]) => `${l}: ${v.toLowerCase()}`).join(" · ")}.</p>
          </div>
          <div className="cur" id="cur">
            {[...EXPERIENCE, ...EDUCATION].map((e, i) => (
              <div key={e.org} className="les" data-les={i} data-cursor>
                <span className="k">{String(i + 1).padStart(2, "0")} · {i < EXPERIENCE.length ? "Experiencia" : "Formación"}</span>
                <h3>{e.org}<em className="jp">{e.tag}</em></h3>
                <p className="les-role">{e.role} · {e.where}</p>
                {e.points.length > 0 && <ul className="les-pts">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>}
                <span className="t">{e.when}</span><i className="bar" />
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ 02 proyectos */}
        <section className="sec work" id="proyectos" data-cam="2">
          <Head n="02" title="Proyectos" alt="WORK" />
          <div className="cur-head">
            <h2 className="display h-sec" data-rv="up">Seis proyectos, de la tesis al trabajo.</h2>
            <p className="body-lg" data-rv="up">Lo que hice en cada uno, con qué herramientas y, cuando el código es público, el enlace a su repositorio. ARIA, el de la tesis, va con su avatar y capturas de la versión final.</p>
          </div>
          <ol className="pidx" data-rv="up">
            {[ARIA, GAZE, ...SMALL].map((c) => <li key={c.id}><a href={`#${c.id}`} data-cursor><span>{c.n}</span>{c.title.split(",")[0]}</a></li>)}
          </ol>

          <article className="case" id={ARIA.id}>
            <CaseHead c={ARIA} />
            <div className="aria-row">
              <Suspense fallback={<div className="aria" />}><AriaStage /></Suspense>
              <div className="shots">
                {SHOTS.map(([img, lab, meta]) => (
                  <figure key={img} className="shot" data-rv="up">
                    <img src={`/projects/${img}.webp`} alt={`ARIA, ${lab.toLowerCase()}: ${meta.toLowerCase()}`} loading="lazy" decoding="async" />
                    <figcaption><b>{lab}</b><span>{meta}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="case-sub">
              <h4 className="case-sub-t" data-rv="up">Del PDF a la voz</h4>
              <p className="body case-sub-p" data-rv="up">Así funciona ARIA por dentro. Un documento largo que nadie lee completo se indexa una vez; después, cada pregunta hablada recorre cuatro pasos hasta volver convertida en voz.</p>
              <VoicePipeline />
            </div>
          </article>

          <div className="plist">
            {[GAZE, ...SMALL].map((c) => (
              <article key={c.id} className="case case-row" id={c.id}>
                <CaseHead c={c} />
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ 03 habilidades */}
        <section className="sec" id="habilidades" data-cam="3">
          <Head n="03" title="Habilidades y certificaciones" alt="SKILLS" />
          <div className="cur-head">
            <h2 className="display h-sec" data-rv="up">Lo que uso, y dónde lo usé.</h2>
            <p className="body-lg" data-rv="up">Programación, web, inteligencia artificial, datos, infraestructura y herramientas. Cada habilidad dice en qué proyecto la puse a trabajar.</p>
          </div>
          <Skills />

          <div className="certs">
            <div className="certs-side" data-rv="up">
              <p className="certs-total"><b>09</b></p>
              <p className="body">Certificaciones, reconocimientos y horas de práctica. Incluye 248 horas de prácticas en Kruger Corp y 20 de investigación.</p>
            </div>
            <ol className="certs-list">
              {CERTS.map((c) => (
                <li key={c.name} className="cert" data-rv="up" data-cursor>
                  <span className="cert-y">{c.year}</span>
                  <span className="cert-n">{c.name}</span>
                  <span className="cert-b">{c.by}</span>
                  <i className="bar" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------------ 04 contacto */}
        <section className="sec fin" id="contacto" data-cam="4">
          <div className="eyebrow" data-rv="fade">04 — Contacto</div>
          <h2 className="display" data-rv="up">Hablemos</h2>
          <p className="body-lg" data-rv="up">¿Un puesto, un proyecto o una colaboración en TI? Escríbeme a {EMAIL} o búscame en LinkedIn y GitHub.</p>
          <p className="fin-ctas" data-rv="fade">
            <a className="cta" href={MAIL} {...OUT} data-cursor><i /><span>Escríbeme</span><Arrow /></a>
            <a className="cta cta-ghost" href={LINKEDIN} {...OUT} data-cursor><i /><span>LinkedIn</span><Arrow /></a>
            <a className="cta cta-ghost" href={GITHUB} {...OUT} data-cursor><i /><span>GitHub</span><Arrow /></a>
          </p>
        </section>

        {/* ------------------------------------------------------------ pie */}
        <footer className="foot" data-cam="5">
          <div className="foot-grid">
            <div className="foot-brand">
              <Mark size={34} />
              <p>Paulo Emilio Espinoza Jiménez, ingeniero en Tecnologías de la Información. Quito, Ecuador. Disponible para empleo.</p>
            </div>
            <div><h4>Secciones</h4><ul>
              {[["#sobre-mi", "Sobre mí"], ["#proyectos", "Proyectos"], ["#habilidades", "Habilidades"], ["#contacto", "Contacto"]].map(([h, t]) => <li key={h}><a href={h} data-cursor>{t}</a></li>)}
            </ul></div>
            <div><h4>Proyectos</h4><ul>
              {[ARIA, GAZE, ...SMALL].map((c) => <li key={c.id}><a href={`#${c.id}`} data-cursor>{c.title.split(",")[0]}</a></li>)}
            </ul></div>
            <div><h4>En la red</h4><ul>
              <li><a href={LINKEDIN} {...OUT} data-cursor>LinkedIn</a></li>
              <li><a href={GITHUB} {...OUT} data-cursor>GitHub</a></li>
              <li><a href={MAIL} {...OUT} data-cursor>Email</a></li>
              <li><a href={REPO.portfolio} {...OUT} data-cursor>Código de este portafolio</a></li>
            </ul></div>
          </div>
          <div className="foot-base">
            <span>© 2026 Paulo Emilio Espinoza Jiménez</span>
            <span className="jp">QUITO · ECUADOR</span>
            <span>Escena: <a href="https://threeui.com" {...OUT} data-cursor>Kage de ThreeUI</a> · MIT</span>
          </div>
        </footer>
      </div>

      <div className="rail" id="rail" />
    </>
  );
}
