import { lazy, Suspense, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import FluidOrb from "@/components/ui/fluid-orb";
import { EyeDemo, FlowDemo, AgentDemo, StickDemo, RobotDemo } from "@/components/Demos";
import { Skills } from "@/components/Skills";
import { HeatMap } from "@/components/HeatMap";
import { CERTS, EMAIL, GITHUB, LINKEDIN } from "@/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// La escena 3D del hero pesa: se carga aparte para no frenar el primer pintado
const Temple = lazy(() => import("@/components/Temple"));
const AvatarStage = lazy(() => import("@/components/AvatarStage").then((m) => ({ default: m.AvatarStage })));

type Project = { id: string; title: string; when: string; text: string; stack: string[]; demo: ReactNode };
const PROJECTS: Project[] = [
  { id: "p-asistente", title: "Asistente Virtual Web", when: "Trabajo de titulación · 2026", demo: <Suspense fallback={<div className="avatar" />}><AvatarStage /></Suspense>,
    text: "Un asistente académico multimodal: texto, voz y este mismo avatar 3D. Responde con RAG local sobre los documentos de la carrera, detecta cuándo alguien se acerca sin guardar imágenes y trae un panel para subir PDFs sin reentrenar nada.",
    stack: ["FastAPI", "WebSockets", "ChromaDB", "Ollama", "Whisper-v3", "ElevenLabs", "Three.js", "VRM", "OpenCV", "MediaPipe", "Vite"] },
  { id: "p-eyetracking", title: "Eyetracking y mapas de calor", when: "Ayudante de investigación · 2025–26", demo: <EyeDemo />,
    text: "Para el proyecto «Accesibilidad inteligente: neuromarketing para un diseño web inclusivo» programé en Python un seguimiento ocular que genera mapas de calor en tiempo real y mide la usabilidad de una interfaz.",
    stack: ["Python", "OpenCV", "Mapas de calor", "UX/UI"] },
  { id: "p-glpi", title: "Altas y bajas automáticas", when: "Kruger Corp · 2025–26", demo: <FlowDemo />,
    text: "Flujos automatizados de ingreso y egreso de personal con la API de GLPI conectada a MySQL, para que Talento Humano no tenga que tocar cada cuenta a mano. También administré Active Directory, telefonía y cámaras IP, y reordené los racks.",
    stack: ["API de GLPI", "MySQL", "Active Directory", "Telefonía IP", "Racks"] },
  { id: "p-agentes", title: "Agentes de IA para nóminas", when: "Asesores Espinoza & Jiménez · actualidad", demo: <AgentDemo />,
    text: "Diseño skills y agentes de Claude que leen la documentación de un trabajador y preparan su alta en Geyce y la comunicación del contrato en Contrat@ del SEPE.",
    stack: ["Claude", "Skills", "Agentes", "Geyce", "Contrat@"] },
  { id: "p-drift", title: "Drift Cero", when: "Proyecto personal · en desarrollo", demo: <StickDemo />,
    text: "Tienda full stack de mandos de videojuego con React, Node.js, Express y MongoDB. Su portada trae un probador de drift como este: conecta un mando y míralo.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gamepad API", "Git"] },
  { id: "p-cpriq", title: "Club CPRIQ", when: "Fundador · reconocido en 2026", demo: <RobotDemo />,
    text: "Fundé el Club de Programación y Robótica de la Universidad Indoamérica en Quito. Diseño y programo el control de robots de competencia y competimos en torneos de humanoides bípedos y warbots.",
    stack: ["C++", "Electrónica", "Algoritmos", "Robótica"] },
];

const NAMES: [string, string][] = [
  ["Asistente Virtual Web", "#p-asistente"], ["Eyetracking", "#p-eyetracking"], ["Altas y bajas con GLPI", "#p-glpi"],
  ["Agentes de IA para nóminas", "#p-agentes"], ["Drift Cero", "#p-drift"], ["Club CPRIQ", "#p-cpriq"],
  ["Laboratorios de machine learning", "#habilidades"], ["Robots en Webots", "#habilidades"], ["Apps Android en Kotlin", "#habilidades"], ["MVC en PHP", "#habilidades"],
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [speaking, setSpeaking] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-name .line-in", { yPercent: 105, duration: 1.1, stagger: 0.11 })
        .from(".hero-foot > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6")
        .from(".top > *", { opacity: 0, duration: 0.6 }, "<");
      gsap.to(".hero-name .second", { xPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-name .line:first-child", { xPercent: -4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      // El estado oculto solo se aplica al entrar: si el disparador no llega, el contenido sigue visible
      gsap.utils.toArray<HTMLElement>("section").forEach((sec) => {
        const parts = sec.querySelectorAll("[data-reveal]");
        if (parts.length) ScrollTrigger.create({ trigger: sec, start: "top bottom-=80", once: true, onEnter: () => gsap.from(parts, { y: 28, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 }) });
      });

      const names = gsap.utils.toArray<HTMLElement>(".names a");
      ScrollTrigger.create({ trigger: ".names", start: "top 75%", end: "bottom 45%", onUpdate: (self) => {
        const n = Math.round(self.progress * names.length);
        names.forEach((a, i) => a.classList.toggle("lit", i < n));
      } });

      // PDF → orbe → VOZ: las palabras llegan desde los lados y el orbe crece al centro
      gsap.timeline({ scrollTrigger: { trigger: ".voice-row", start: "top 85%", end: "center 55%", scrub: 1 } })
        .from(".voice-in", { xPercent: -40, opacity: 0 }, 0)
        .from(".voice-out", { xPercent: 40, opacity: 0 }, 0)
        .from(".voice-orb", { scale: 0.3, opacity: 0 }, 0);
      gsap.from(".pipe li", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".pipe", start: "top 90%", once: true } });

      ScrollTrigger.create({ trigger: ".certs", start: "top 70%", once: true, onEnter: () => {
        gsap.from(".count", { textContent: 0, duration: 1.4, ease: "power2.out", snap: { textContent: 1 } });
        gsap.from(".slip-r", { x: -16, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" });
      } });
      ScrollTrigger.create({ trigger: ".contact", start: "top 70%", once: true, onEnter: () => gsap.from(".mail span", { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1 }) });
    });

    // Proyectos: scroll horizontal fijado en pantallas anchas
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const hs = document.querySelector<HTMLElement>(".hs")!;
      const track = hs.querySelector<HTMLElement>(".hs-track")!;
      hs.classList.add("is-h");
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: hs, start: "top top", end: () => "+=" + dist() * 0.8, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.to(".hs-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: hs, start: "top top", end: () => "+=" + dist() * 0.8, scrub: true } });
      hs.querySelectorAll(".panel").forEach((p) => {
        ScrollTrigger.create({ trigger: p, containerAnimation: tween, start: "left 80%", once: true,
          onEnter: () => gsap.from(p.querySelectorAll(".panel-text > *"), { x: 60, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }) });
      });
      return () => hs.classList.remove("is-h");
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    addEventListener("load", () => ScrollTrigger.refresh());
  }, { scope: root });

  return (
    <div ref={root}>
      <header className="top">
        <a className="mono" href="#inicio" aria-label="Inicio">EE</a>
        <nav aria-label="Principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" data-name="Inicio">
          <div className="hero-scene" aria-hidden="true">
            <Suspense fallback={null}><Temple /></Suspense>
          </div>
          <h1 className="hero-name" aria-label="Emilio Espinoza, ingeniero en Tecnologías de la Información">
            <span className="line"><span className="line-in">Emilio</span></span>
            <span className="line second"><span className="line-in">Espinoza</span></span>
          </h1>
          <div className="hero-foot">
            <p className="hero-lead">Ingeniero en Tecnologías de la Información. Desarrollo web y software con IA: RAG, visión artificial y agentes.</p>
            <a className="btn" href="#proyectos">Ver mis proyectos</a>
          </div>
        </section>

        <section className="about wrap" id="sobre-mi" data-name="Sobre mí">
          <h2 className="h-sec" data-reveal>Sobre mí</h2>
          <div className="about-row">
            <dl className="facts" data-reveal>
              <div><dt>Base</dt><dd>Quito, Ecuador</dd></div>
              <div><dt>Título</dt><dd>Ingeniero en Tecnologías de la Información, Universidad Tecnológica Indoamérica, 2026</dd></div>
              <div><dt>Idiomas</dt><dd>Español nativo, inglés B1</dd></div>
            </dl>
            <div className="about-body">
              <p className="about-text" data-reveal>Hago software que entiende documentos, escucha, mira y responde.</p>
              <p data-reveal>Mi trabajo de titulación fue un asistente web con RAG, voz, visión artificial y un avatar 3D que acierta el 92 % de las veces entre sus tres primeras fuentes y contesta en 3,2 segundos. Antes de eso automaticé procesos e infraestructura en Kruger Corp, y hoy diseño agentes de IA que ahorran horas de trabajo administrativo.</p>
            </div>
          </div>
          <div className="about-row record">
            <h3 className="rec-label" data-reveal>Trayectoria</h3>
            <div className="rec-cols">
              <ul className="rec" data-reveal aria-label="Experiencia laboral">
                <li><span>Asesores Espinoza &amp; Jiménez, gestión administrativa y soporte TI (España)</span><span>2021, 2024–hoy</span></li>
                <li><span>Kruger Corp, pasante de soporte, infraestructura y automatización</span><span>2025–26</span></li>
                <li><span>LR-Light, ayudante eléctrico</span><span>2022</span></li>
              </ul>
              <ul className="rec" data-reveal aria-label="Formación">
                <li><span>Ingeniería en Tecnologías de la Información, U. Indoamérica</span><span>2026</span></li>
                <li><span>Fundador del Club de Programación y Robótica CPRIQ</span><span>2026</span></li>
                <li><span>Ayudante de investigación en neuromarketing</span><span>2025–26</span></li>
                <li><span>Bachillerato en Ciencias, U. E. Jan Komensky</span><span>2022</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="work wrap" id="proyectos" data-name="Proyectos">
          <h2 className="sr-only">Proyectos</h2>
          <ul className="names" aria-label="Lista de proyectos">
            <li className="lead-in" aria-hidden="true">Proyectos:</li>
            {NAMES.map(([n, href], i) => <li key={n}><a href={href}>{n}</a>{i < NAMES.length - 1 ? "," : "."}</li>)}
          </ul>
          <p className="work-count" data-reveal>Diez proyectos entre 2022 y 2026. Los seis primeros, abajo y en vivo: puedes tocarlos.</p>
        </section>

        <section className="hs" id="detalle" data-name="Proyectos en detalle" aria-label="Proyectos en detalle">
          <div className="hs-progress" aria-hidden="true"><i /></div>
          <div className="hs-track">
            {PROJECTS.map((p) => (
              <article className="panel" id={p.id} key={p.id}>
                <div className="panel-media">{p.demo}</div>
                <div className="panel-text">
                  <p className="panel-when">{p.when}</p>
                  <h3 className="h-panel">{p.title}</h3>
                  <p>{p.text}</p>
                  <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="voice wrap" id="tesis" data-name="Tesis">
          <div className="show-head">
            <h2 className="h-mid" data-reveal>Del PDF a la voz</h2>
            <p data-reveal>Así funciona mi tesis por dentro. Entra un documento largo que nadie lee completo: el plan de la carrera. Se trocea, se guarda como vectores, un modelo local escribe la respuesta y sale convertida en voz, con el avatar moviendo los labios. Toca el orbe.</p>
          </div>
          <div className="voice-row">
            <p className="voice-word voice-in">PDF</p>
            <motion.button type="button" className="voice-orb" onClick={() => setSpeaking((s) => !s)} aria-pressed={speaking} aria-label={speaking ? "Detener la voz" : "Hacer hablar al orbe"}
              animate={speaking ? { scale: [1, 1.12, 0.96, 1.08, 1] } : { scale: 1 }} transition={speaking ? { duration: 0.9, repeat: Infinity } : { type: "spring" }}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
              <FluidOrb size={260} color={speaking ? "#f2c66d" : "#c9a45a"} />
            </motion.button>
            <p className="voice-word voice-out">VOZ</p>
          </div>
          <ol className="pipe" aria-label="Recorrido de una pregunta">
            <li><b>pymupdf4llm</b> lee el PDF</li>
            <li><b>SentenceTransformers</b> lo convierte en vectores</li>
            <li><b>ChromaDB</b> encuentra los fragmentos</li>
            <li><b>Ollama</b> redacta la respuesta</li>
            <li><b>ElevenLabs</b> le pone voz</li>
          </ol>
        </section>

        <Skills />

        <section className="certs wrap" id="certificaciones" data-name="Certificaciones">
          <div className="certs-left">
            <div>
              <h2 className="h-mid" data-reveal>Certificaciones</h2>
              <p className="certs-note" data-reveal>Cursos, horas de práctica y reconocimientos, sumados como en un recibo.</p>
            </div>
            <div className="total-wrap">
              <p className="total" aria-label="9 certificaciones y reconocimientos"><span className="count">9</span></p>
              <p className="total-cap">certificaciones y reconocimientos, con 248 horas de prácticas en Kruger Corp.</p>
            </div>
          </div>
          <div className="slip" data-reveal>
            {CERTS.map((g) => (
              <div key={g.group}>
                <p className="slip-g">{g.group}</p>
                {g.rows.map(([n, y]) => <p className="slip-r" key={n}><span>{n}</span><i aria-hidden="true" /><b>{y}</b></p>)}
              </div>
            ))}
            <p className="slip-r slip-total"><span>Total</span><i aria-hidden="true" /><b>9</b></p>
          </div>
        </section>

        <HeatMap />

        <section className="contact" id="contacto" data-name="Contacto">
          <h2 className="contact-say">¿Un puesto, un proyecto o una colaboración en TI? Escríbeme.</h2>
          <a className="mail" href={`mailto:${EMAIL}?subject=Hola%20Emilio%2C%20vi%20tu%20portafolio`}><span>emil.200409@</span><span>gmail.com</span></a>
          <div className="contact-foot">
            <p>Quito, Ecuador</p>
            <p><a href={LINKEDIN} rel="me">LinkedIn</a> <a href={GITHUB} rel="me">GitHub</a></p>
          </div>
        </section>
      </main>

      <footer className="foot" data-name="Pie">
        <div className="foot-cols wrap">
          <div><p className="f1">Ubicación</p><p>Quito, Ecuador</p><p>Disponible para empleo</p></div>
          <div><p className="f1">Página</p><p><a href="#proyectos">Proyectos</a></p><p><a href="#habilidades">Habilidades</a></p><p><a href="#contacto">Contacto</a></p></div>
          <div><p className="f1">En la red</p><p><a href={LINKEDIN} rel="me">LinkedIn</a></p><p><a href={GITHUB} rel="me">GitHub</a></p><p><a href={`mailto:${EMAIL}`}>Email</a></p></div>
          <div className="credits"><p className="f1">Créditos</p><p>Escena del inicio: Temple Night de <a href="https://www.npmjs.com/package/@designcodeio/threeui">ThreeUI</a> (Meng To, MIT). Orbe: <a href="https://rareui.com">Rare UI</a> de Swami Malode. Iconos: Simple Icons y Tabler. El avatar es el de mi trabajo de titulación.</p></div>
        </div>
        <div className="wordmark wrap" aria-hidden="true">
          <svg className="wm-one" viewBox="0 0 1000 118"><text x="0" y="114" textLength="1000" lengthAdjust="spacingAndGlyphs">EMILIO ESPINOZA</text></svg>
          <svg className="wm-two" viewBox="0 0 1000 450"><text x="0" y="215">EMILIO</text><text x="0" y="445" textLength="1000" lengthAdjust="spacingAndGlyphs">ESPINOZA</text></svg>
        </div>
        <p className="legal wrap">© 2026 Paulo Emilio Espinoza Jiménez</p>
      </footer>
    </div>
  );
}
