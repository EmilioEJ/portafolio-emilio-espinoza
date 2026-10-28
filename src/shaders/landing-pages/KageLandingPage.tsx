import { splitTypographyProps, usePageTypography, type PageTypographyProps } from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
import { KAGE_TYPOGRAPHY } from "./pageRecipes";

type KageProps = LandingPageProps & PageTypographyProps;

// Igual que KageLandingPage en LandingPages.tsx de ThreeUI (SHA-256 4d379461…). Ese archivo no se copia
// entero porque importa otras veinte páginas del catálogo que este proyecto no usa.
export function KageLandingPage(props: KageProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Kage — Where stillness reveals the unseen" sourceUrl="/landing-pages/kage.html" />;
}

// El mismo documento con el contenido del portafolio: misma escena, estilos y script, solo cambia el texto.
export function PortfolioLandingPage(props: KageProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(KAGE_TYPOGRAPHY, type);
  return <LandingPageFrame {...frame} customization={customization} title="Emilio Espinoza — Portafolio" sourceUrl="/landing-pages/portafolio.html" />;
}
