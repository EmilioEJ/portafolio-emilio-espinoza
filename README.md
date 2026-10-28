# Portafolio · Emilio Espinoza

Portafolio interactivo de Paulo Emilio Espinoza Jiménez, ingeniero en Tecnologías de la Información (Quito, Ecuador).

**En vivo:** https://portafolio-emilio-espinoza.vercel.app

## Qué tiene

Una sola página montada sobre el mundo 3D de *Kage* ([ThreeUI](https://threeui.com), MIT): un templo en Three.js que la cámara recorre capítulo a capítulo con el scroll, con la palabra EMILIO en 3D. En español o en inglés, con el botón ES / EN de la barra superior.

1. **Sobre mí**: perfil, cifras, experiencia y formación del CV.
2. **Proyectos**, con enlace a su repositorio cuando es público:
   - **ARIA**, el asistente de la tesis: el avatar VRM real como demostración (mismo animador de reposo que la app), capturas de la versión final y el recorrido «Del PDF a la voz» con las latencias medidas.
   - GazeScope (eyetracking), agentes de IA para nóminas, altas con GLPI, Drift Cero y el club CPRIQ.
3. **Habilidades y certificaciones**: iconos con filtro por área y la lista de certificaciones.
4. **Contacto**.

## Cómo está hecho

| Ruta | Qué es |
| --- | --- |
| `src/App.tsx` | La página: capítulos con `data-cam` y textos. |
| `src/content.ts` | Todo el texto del portafolio en español y en inglés. |
| `src/data.ts` | Habilidades, enlaces y latencias de ARIA. |
| `src/components/` | El avatar de ARIA, el pipeline de voz y las habilidades. |
| `src/kage/kage.css`, `public/kage/world.js` | Estilos y mundo 3D de Kage, adaptados (palabra EMILIO, nombres del riel, remedición de capítulos). |
| `public/landing-pages/` | El documento original de Kage y sus recursos, sin tocar. |
| `public/models/aria.vrm`, `public/projects/` | El avatar ARIA 2.0 y las capturas de la tesis. El avatar se descarga solo cuando su proyecto se acerca. |

## Stack

React 19 · Vite · TypeScript · Three.js (r149 para Kage, r186 para el avatar) · @pixiv/three-vrm · Motion · Rare UI (Fluid Orb) · react-icons

## Desarrollo

```bash
npm install
npm run dev
npm run verify:kage   # comprueba que el original de Kage y sus recursos siguen idénticos a la fuente
```

`npm run build` genera la versión de producción en `dist/`. Cada push a `main` se despliega solo en Vercel.
