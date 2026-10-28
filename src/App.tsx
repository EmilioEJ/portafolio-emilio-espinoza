import { Fragment, lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { EMAIL, GITHUB, LINKEDIN, REPO } from "@/data";
import { CONTENT, type Case } from "@/content";
import { useLang } from "@/i18n";
import { Skills } from "@/components/Skills";
import { VoicePipeline } from "@/components/VoicePipeline";

// three.js + VRM pesan: el avatar se carga aparte y solo cuando su proyecto se acerca
const AriaStage = lazy(() => import("@/components/AriaStage").then((m) => ({ default: m.AriaStage })));

const OUT = { target: "_blank", rel: "noopener" } as const;
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
const toTop = () => scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" });

const Arrow = () => (
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" aria-hidden="true"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg>
);
const Up = () => (
  <svg viewBox="0 0 14 14" fill="none" width="13" height="13" aria-hidden="true"><path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.3" /></svg>
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

// Las palabras llegan ya partidas, con el mismo marcado que Kage genera, para que al cambiar de idioma
// React pueda reescribirlas (Kage las salta por data-word-ready y solo se encarga de revelarlas)
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="word-mask" aria-hidden="true"><span className="word" style={{ "--word-delay": `${i * 72}ms` } as CSSProperties}>{w}</span></span>
        </Fragment>
      ))}
    </>
  );
}
const Display = ({ text, className = "h-sec" }: { text: string; className?: string }) => (
  <h2 className={`display ${className} word-reveal`} data-rv="up" data-word-ready="true" aria-label={text}><Words text={text} /></h2>
);

function CaseHead({ c }: { c: Case }) {
  return (
    <header className="case-head">
      <div className="case-top" data-rv="fade"><span className="case-n">{c.n}</span><span className="case-when">{c.when}</span></div>
      <h3 className="case-title" data-rv="up">{c.repo ? <a href={c.repo} {...OUT} data-cursor>{c.title}</a> : c.title}</h3>
      <p className="body-lg case-text" data-rv="up">{c.text}</p>
      {c.metrics && (
        <dl className="case-metrics" data-rv="up">
          {c.metrics.map(([v, k], i) => <div key={i}><dt>{v}</dt><dd>{k}</dd></div>)}
        </dl>
      )}
      <ul className="case-stack" data-rv="fade">{c.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <p className="case-links" data-rv="fade">
        {c.links.map((l, i) => l.href
          ? <a key={i} className="plink" href={l.href} {...OUT} data-cursor><span>{l.label}</span><Arrow /></a>
          : <span key={i} className="plink off">{l.label}</span>)}
      </p>
    </header>
  );
}

export default function App() {
  const { lang, setLang } = useLang();
  const t = CONTENT[lang];
  const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.subject)}`;
  const projects = [t.projects.aria, ...t.projects.rest];
  const [showTop, setShowTop] = useState(false);
  const page = useRef<HTMLDivElement>(null);
  const first = useRef(true);

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

  // El templo se ve entero en el inicio y se atenúa en los capítulos. "Volver arriba" flota entre el inicio y el pie,
  // donde ya está el botón propio del pie
  useEffect(() => {
    const dim = document.getElementById("dim")!;
    let raf = 0;
    const apply = () => { raf = 0; dim.style.opacity = String(Math.min(1, scrollY / (innerHeight * 0.8))); setShowTop(scrollY > innerHeight * 1.2 && scrollY < document.documentElement.scrollHeight - innerHeight * 1.7); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Idioma: título de la pestaña, nombres del riel de capítulos (lo crea Kage al arrancar) y un fundido suave
  useEffect(() => {
    document.title = t.meta.title;
    let tries = 0;
    const rail = () => {
      const bs = document.querySelectorAll<HTMLButtonElement>("#rail button");
      if (!bs.length && tries++ < 40) return void (timer = window.setTimeout(rail, 250));
      bs.forEach((b, i) => { b.title = t.rail[i] ?? ""; b.setAttribute("aria-label", t.rail[i] ?? ""); });
    };
    let timer = 0;
    rail();
    if (first.current) first.current = false;
    else if (!REDUCE) page.current?.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 520, easing: "cubic-bezier(.16,1,.3,1)" });
    return () => clearTimeout(timer);
  }, [lang, t]);

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
          <div className="pre-meta"><span>{t.pre}</span><b><span id="pre-pct">0</span>%</b></div>
        </div>
      </div>

      <header className="nav" id="nav">
        <a className="brand" href="#top" data-cursor>
          <Mark />
          <span className="brand-tx"><b>EMILIO ESPINOZA</b><i>{t.brandSub}</i></span>
        </a>
        <nav className="nav-links" id="navlinks" aria-label={t.navLabel}>
          {t.nav.map(([h, label, alt]) => (
            <a key={h} className="nav-link" href={h} data-cursor><span>{label}</span><span className="alt">{alt}</span></a>
          ))}
        </nav>
        <div className="lang" role="group" aria-label={t.langLabel}>
          {(["es", "en"] as const).map((l) => (
            <button key={l} type="button" className={lang === l ? "on" : ""} aria-pressed={lang === l} onClick={() => setLang(l)} data-cursor>{l.toUpperCase()}</button>
          ))}
        </div>
        <button className="nav-burger" aria-label={t.menu} data-cursor><i /><i /></button>
      </header>

      <div className="page" id="top" ref={page}>
        {/* ------------------------------------------------------------ inicio */}
        <section className="hero" id="hero" data-cam="0">
          <div className="hero-top">
            <div className="eyebrow" data-rv="fade"><span className="dot" /> {t.hero.eyebrow}</div>
            <h1 className="display h-hero" aria-label={t.hero.lines.join(" ")}>
              {t.hero.lines.map((l, i) => <span key={i} className="mask-line word-reveal" data-word-ready="true"><Words text={l} /></span>)}
            </h1>
            <p className="hero-sub body" data-rv="up">{t.hero.sub}</p>
          </div>
          <div className="hero-spacer" />
          <div className="hero-foot">
            <div className="hero-cue" data-rv="fade"><span>{t.hero.cue}</span><span className="track"><i /></span></div>
          </div>
          <div className="word-fb" aria-hidden="true">EMILIO</div>
          <div className="hero-side" data-rv="up"><span className="v jp">EE</span></div>
        </section>

        {/* ------------------------------------------------------------ 01 sobre mí */}
        <section className="sec" id="sobre-mi" data-cam="1">
          <Head n="01" title={t.about.head} alt={t.nav[0][2]} />
          <div className="gate-grid">
            <Display text={t.about.title} />
            <div className="gate-copy">
              <p className="lead" data-rv="up">{t.about.lead}</p>
              <p className="body" data-rv="up">{t.about.body}</p>
              <a className="arrowlink" href="#proyectos" data-rv="fade" data-cursor><span>{t.about.link}</span><span className="ar"><Arrow /></span></a>
            </div>
          </div>
          <div className="gate-stats" data-rv="up">
            {t.about.stats.map(([v, k]) => <div key={v}><b>{v}</b><span>{k}</span></div>)}
          </div>

          <div className="cur-head about-cur">
            <Display text={t.about.pathTitle} />
            <p className="body-lg" data-rv="up">{t.about.pathBody}</p>
          </div>
          <div className="cur" id="cur">
            {[...t.about.experience, ...t.about.education].map((e, i) => (
              <div key={e.org} className="les" data-les={i} data-cursor>
                <span className="k">{String(i + 1).padStart(2, "0")} · {i < t.about.experience.length ? t.about.work : t.about.study}</span>
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
          <Head n="02" title={t.projects.head} alt={t.nav[1][2]} />
          <div className="cur-head">
            <Display text={t.projects.title} />
            <p className="body-lg" data-rv="up">{t.projects.body}</p>
          </div>
          <ol className="pidx" data-rv="up">
            {projects.map((c) => <li key={c.id}><a href={`#${c.id}`} data-cursor><span>{c.n}</span>{c.short}</a></li>)}
          </ol>

          <article className="case" id={t.projects.aria.id}>
            <CaseHead c={t.projects.aria} />
            <div className="aria-row">
              <Suspense fallback={<div className="aria" />}><AriaStage labels={t.projects.avatar} /></Suspense>
              <div className="shots">
                {t.projects.shots.map(([img, lab, meta]) => (
                  <figure key={img} className="shot" data-rv="up">
                    <div className="shot-fr"><img src={`/projects/${img}.webp`} alt={`ARIA · ${lab}: ${meta}`} loading="lazy" decoding="async" /></div>
                    <figcaption><b>{lab}</b><span>{meta}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="case-sub">
              <h4 className="case-sub-t" data-rv="up">{t.projects.pipeTitle}</h4>
              <p className="body case-sub-p" data-rv="up">{t.projects.pipeBody}</p>
              <VoicePipeline />
            </div>
          </article>

          <div className="plist">
            {t.projects.rest.map((c) => (
              <article key={c.id} className="case case-row" id={c.id}>
                <CaseHead c={c} />
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ 03 habilidades */}
        <section className="sec" id="habilidades" data-cam="3">
          <Head n="03" title={t.skills.head} alt={t.nav[2][2]} />
          <div className="cur-head">
            <Display text={t.skills.title} />
            <p className="body-lg" data-rv="up">{t.skills.body}</p>
          </div>
          <Skills />

          <div className="certs">
            <div className="certs-side" data-rv="up">
              <p className="certs-total"><b>09</b></p>
              <p className="body">{t.certs.note}</p>
            </div>
            <ol className="certs-list">
              {t.certs.list.map((c, i) => (
                <li key={i} className="cert" data-rv="up" data-cursor>
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
          <div className="eyebrow" data-rv="fade">{t.contact.eyebrow}</div>
          <Display text={t.contact.title} className="" />
          <p className="body-lg" data-rv="up">{t.contact.body(EMAIL)}</p>
          <p className="fin-ctas" data-rv="fade">
            <a className="cta" href={mail} {...OUT} data-cursor><i /><span>{t.contact.write}</span><Arrow /></a>
            <a className="cta cta-ghost" href={LINKEDIN} {...OUT} data-cursor><i /><span>LinkedIn</span><Arrow /></a>
            <a className="cta cta-ghost" href={GITHUB} {...OUT} data-cursor><i /><span>GitHub</span><Arrow /></a>
          </p>
        </section>

        {/* ------------------------------------------------------------ pie */}
        <footer className="foot" data-cam="5">
          <div className="foot-grid">
            <div className="foot-brand">
              <Mark size={34} />
              <p>{t.foot.brand}</p>
            </div>
            <div><h4>{t.foot.sections}</h4><ul>
              {t.nav.map(([h, label]) => <li key={h}><a href={h} data-cursor>{label}</a></li>)}
            </ul></div>
            <div><h4>{t.foot.projects}</h4><ul>
              {projects.map((c) => <li key={c.id}><a href={`#${c.id}`} data-cursor>{c.short}</a></li>)}
            </ul></div>
            <div><h4>{t.foot.web}</h4><ul>
              <li><a href={LINKEDIN} {...OUT} data-cursor>LinkedIn</a></li>
              <li><a href={GITHUB} {...OUT} data-cursor>GitHub</a></li>
              <li><a href={mail} {...OUT} data-cursor>Email</a></li>
              <li><a href={REPO.portfolio} {...OUT} data-cursor>{t.foot.code}</a></li>
            </ul></div>
          </div>
          <button type="button" className="foot-top" onClick={toTop} data-cursor><span>{t.foot.top}</span><Up /></button>
          <div className="foot-base">
            <span>© 2026 Paulo Emilio Espinoza Jiménez</span>
            <span className="jp">{t.foot.place}</span>
            <span>{t.foot.scene}: <a href="https://threeui.com" {...OUT} data-cursor>{t.foot.by}</a> · MIT</span>
          </div>
        </footer>
      </div>

      <button type="button" className={`totop${showTop ? " on" : ""}`} onClick={toTop} aria-label={t.foot.top} tabIndex={showTop ? 0 : -1} data-cursor><Up /></button>
      <div className="rail" id="rail" />
    </>
  );
}
