// Habilidades como iconos: filtro por área, inclinación al pasar y ficha al tocar.
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useTransform } from "motion/react";
import { AREAS, SKILLS, type Area, type Skill } from "@/data";
import { CONTENT } from "@/content";
import { useLang } from "@/i18n";

function Tile({ s, label, active, onPick }: { s: Skill; label: string; active: boolean; onPick: () => void }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 250, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 250, damping: 18 });
  const Icon = s.icon;
  return (
    <motion.li layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}>
      <motion.button
        type="button"
        className={`tile${active ? " is-on" : ""}`}
        style={{ rotateX: rx, rotateY: ry, ["--brand" as string]: s.color }}
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.92 }}
        onClick={onPick}
        aria-pressed={active}
      >
        <Icon className="tile-icon" aria-hidden="true" />
        <span>{label}</span>
      </motion.button>
    </motion.li>
  );
}

export function Skills() {
  const { lang } = useLang();
  const t = CONTENT[lang].skills;
  const name = (s: Skill) => (lang === "en" && s.nameEn) || s.name;
  const [area, setArea] = useState<Area | "Todas">("Todas");
  const [pick, setPick] = useState<Skill>(SKILLS[0]);
  const list = area === "Todas" ? SKILLS : SKILLS.filter((s) => s.area === area);
  const PickIcon = pick.icon;

  return (
    <div className="skills">
      <div className="skills-head">
        <p className="k">{t.count(list.length)}</p>
        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label={t.filter}>
            {(["Todas", ...AREAS] as const).map((a) => (
              <button key={a} type="button" role="tab" aria-selected={area === a} className="tab" onClick={() => setArea(a)} data-cursor>
                {area === a && <motion.span layoutId="tab-bg" className="tab-bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="tab-label">{a === "Todas" ? t.all : t.areas[a]}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div className="skills-body">
        <motion.ul layout className="tiles">
          <AnimatePresence mode="popLayout">
            {list.map((s) => <Tile key={s.name} s={s} label={name(s)} active={pick.name === s.name} onPick={() => setPick(s)} />)}
          </AnimatePresence>
        </motion.ul>

        <aside className="skill-card" aria-live="polite" style={{ ["--brand" as string]: pick.color }}>
          <AnimatePresence mode="wait">
            <motion.div key={pick.name + lang} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <motion.span className="skill-big" initial={{ rotate: -20, scale: 0.6 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                <PickIcon aria-hidden="true" />
              </motion.span>
              <h3 className="skill-name">{name(pick)}</h3>
              <p className="skill-area">{t.areas[pick.area]}</p>
              <p>{lang === "en" ? pick.en : pick.where}</p>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}
