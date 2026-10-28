# Portafolio · Emilio Espinoza

Portafolio interactivo de Paulo Emilio Espinoza Jiménez, ingeniero en Tecnologías de la Información (Quito, Ecuador).

**En vivo:** https://portafolio-emilio-espinoza.vercel.app

## Páginas

- **`/` — Portafolio.** Montado sobre *Kage*, de [ThreeUI](https://threeui.com) (MIT): un templo en Three.js que la cámara recorre capítulo a capítulo mientras haces scroll, con primeros planos que entran por sección, palabra 3D y navegación lateral. Secciones: Sobre mí, Proyectos, Trayectoria y Contacto.
- **`/demos.html` — Demos en vivo.** La versión anterior, con las demos que se pueden tocar: el avatar VRM de mi tesis, un mapa de calor de eyetracking, el flujo de altas en GLPI, un agente de IA, un probador de drift para mandos y un robot bípedo. También tiene las habilidades por área y el mapa de calor del visitante.

## Cómo está hecho el inicio

El documento de Kage se carga en un iframe a pantalla completa desde `public/landing-pages/`:

| Archivo | Qué es |
| --- | --- |
| `kage.html` | El original de ThreeUI, byte a byte (SHA-256 `c8e06b90…`). Es la referencia; no se edita. |
| `portafolio.html` | El mismo documento con el contenido del portafolio. Solo cambian textos, enlaces y la palabra 3D (`EMILIO`, en Onest); estilos, script, escena y recursos son los del original. |
| `secret-pathways-assets/` | Three.js r149, fuentes embebidas y las 14 capas WebP de la escena. |

El anfitrión React está en `src/shaders/landing-pages/`: `LandingPageFrame.tsx`, `pageTypography.ts` y `pageRecipes.ts` son copias exactas de la fuente de ThreeUI, y `KageLandingPage.tsx` expone `KageLandingPage` (el original) y `PortfolioLandingPage` (el portafolio).

Para cambiar un texto del inicio, edítalo en `public/landing-pages/portafolio.html`. `diff public/landing-pages/kage.html public/landing-pages/portafolio.html` muestra todo lo que difiere del original.

## Stack

React 19 · Vite · TypeScript · Three.js · ThreeUI (Kage, Temple Night) · Tailwind CSS v4 · GSAP · Motion · @pixiv/three-vrm · Rare UI (Fluid Orb) · react-icons

## Desarrollo

```bash
npm install
npm run dev
npm run verify:kage   # comprueba que el código y los recursos de Kage siguen idénticos a la fuente
```

`npm run build` genera la versión de producción en `dist/` con las dos páginas. Cada push a `main` se despliega solo en Vercel.
