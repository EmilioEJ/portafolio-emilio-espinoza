import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

// Solo el anfitrión del iframe va en el bundle; el documento Kage se sirve aparte desde /landing-pages
const Portfolio = lazy(() => import("./Portfolio"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Portfolio />
    </Suspense>
  </StrictMode>,
);
