// Idioma del portafolio: español por defecto, inglés con el botón ES / EN. Se recuerda en este navegador.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";
const KEY = "portafolio-lang";

function initial(): Lang {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "es" || q === "en") return q;
  try { const v = localStorage.getItem(KEY); if (v === "es" || v === "en") return v; } catch { /* sin almacenamiento */ }
  return "es";
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "es", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch { /* sin almacenamiento */ }
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
