// Contenido del portafolio: CV general de 2026, trabajo de titulación y repositorios.
import type { IconType } from "react-icons";
import {
  SiPython, SiJavascript, SiCplusplus, SiOpenjdk, SiReact, SiVite, SiHtml5, SiCss, SiPhp, SiFastapi,
  SiThreedotjs, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiClaude, SiOllama, SiOpencv, SiMediapipe,
  SiElevenlabs, SiGit, SiGithub, SiFigma, SiLatex, SiLinux, SiQwen, SiScrumalliance, SiSocketdotio,
} from "react-icons/si";
import {
  TbUsers, TbDatabaseSearch, TbPhoneCall, TbDeviceCctv, TbNetwork, TbShieldLock, TbBrain, TbMicrophone,
  TbTicket, TbServer, TbApi, TbFileCertificate, TbVectorTriangle, TbDatabase, TbReceipt, TbPalette,
} from "react-icons/tb";

export const EMAIL = "emil.200409@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/emilio-espinoza-jimenez-51405b2ab";
export const GITHUB = "https://github.com/EmilioEJ";

export type Area = "Programación" | "Web" | "Inteligencia artificial" | "Datos" | "Infraestructura" | "Herramientas";
export const AREAS: Area[] = ["Programación", "Web", "Inteligencia artificial", "Datos", "Infraestructura", "Herramientas"];

export type Skill = { name: string; nameEn?: string; area: Area; icon: IconType; color: string; where: string; en: string };

export const SKILLS: Skill[] = [
  { name: "Python", area: "Programación", icon: SiPython, color: "#ffd43b", where: "Avanzado, con asyncio. Backend de la tesis, eyetracking y machine learning." , en: "Advanced, with asyncio. Thesis backend, eyetracking and machine learning." },
  { name: "JavaScript", area: "Programación", icon: SiJavascript, color: "#f7df1e", where: "Frontend de la tesis y la tienda Drift Cero." , en: "Thesis frontend and the Drift Cero store." },
  { name: "C++", area: "Programación", icon: SiCplusplus, color: "#659ad2", where: "Control de robots de competencia en el club CPRIQ." , en: "Control of competition robots at the CPRIQ club." },
  { name: "Java", area: "Programación", icon: SiOpenjdk, color: "#f89820", where: "Nivel básico: programación orientada a objetos." , en: "Basic level: object-oriented programming." },

  { name: "React", area: "Web", icon: SiReact, color: "#61dafb", where: "Drift Cero y este portafolio." , en: "Drift Cero and this portfolio." },
  { name: "Vite", area: "Web", icon: SiVite, color: "#a78bfa", where: "Interfaz web del asistente de la tesis." , en: "Web interface of the thesis assistant." },
  { name: "HTML", area: "Web", icon: SiHtml5, color: "#e34f26", where: "Todas mis interfaces web." , en: "All my web interfaces." },
  { name: "CSS", area: "Web", icon: SiCss, color: "#2965f1", where: "Todas mis interfaces web." , en: "All my web interfaces." },
  { name: "PHP", area: "Web", icon: SiPhp, color: "#8892bf", where: "Aplicaciones web con patrón MVC." , en: "Web applications with the MVC pattern." },
  { name: "FastAPI", area: "Web", icon: SiFastapi, color: "#05998b", where: "API y servidor del asistente virtual, con Uvicorn." , en: "API and server of the virtual assistant, with Uvicorn." },
  { name: "WebSockets", area: "Web", icon: SiSocketdotio, color: "#ffffff", where: "Voz y texto en tiempo real en la tesis." , en: "Real-time voice and text in the thesis." },
  { name: "APIs REST", area: "Web", icon: TbApi, color: "#c9a45a", where: "Integración con la API de GLPI en Kruger Corp." , en: "Integration with the GLPI API at Kruger Corp.", nameEn: "REST APIs" },
  { name: "Three.js", area: "Web", icon: SiThreedotjs, color: "#ffffff", where: "El avatar ARIA de la tesis y el templo de este portafolio." , en: "The thesis's ARIA avatar and the temple in this portfolio." },
  { name: "Node.js", area: "Web", icon: SiNodedotjs, color: "#5fa04e", where: "En formación: backend de Drift Cero." , en: "Learning: Drift Cero backend." },
  { name: "Express", area: "Web", icon: SiExpress, color: "#ffffff", where: "En formación: API REST de Drift Cero." , en: "Learning: Drift Cero REST API." },

  { name: "Claude", area: "Inteligencia artificial", icon: SiClaude, color: "#d97757", where: "Skills y agentes para Geyce y Contrat@, y Claude Code." , en: "Skills and agents for Geyce and Contrat@, plus Claude Code." },
  { name: "RAG", area: "Inteligencia artificial", icon: TbDatabaseSearch, color: "#c9a45a", where: "Motor de respuestas de la tesis: Hit Rate Top-3 de 92 %." , en: "Answer engine of the thesis: 92% Hit Rate Top-3." },
  { name: "Ollama", area: "Inteligencia artificial", icon: SiOllama, color: "#ffffff", where: "LLMs locales en la tesis." , en: "Local LLMs in the thesis." },
  { name: "Qwen 2.5", area: "Inteligencia artificial", icon: SiQwen, color: "#7c6cff", where: "Modelo local evaluado en la tesis, junto a Nemotron." , en: "Local model evaluated in the thesis, alongside Nemotron." },
  { name: "ElevenLabs", area: "Inteligencia artificial", icon: SiElevenlabs, color: "#ffffff", where: "Voz del avatar (TTS)." , en: "The avatar's voice (TTS)." },
  { name: "Whisper-v3", area: "Inteligencia artificial", icon: TbMicrophone, color: "#c9a45a", where: "Reconocimiento de voz vía Groq (STT)." , en: "Speech recognition through Groq (STT)." },
  { name: "Embeddings", area: "Inteligencia artificial", icon: TbVectorTriangle, color: "#c9a45a", where: "SentenceTransformers multilingües y pymupdf4llm." , en: "Multilingual SentenceTransformers and pymupdf4llm." },
  { name: "OpenCV", area: "Inteligencia artificial", icon: SiOpencv, color: "#5c3ee8", where: "Detección de presencia y eyetracking." , en: "Presence detection and eyetracking." },
  { name: "MediaPipe", area: "Inteligencia artificial", icon: SiMediapipe, color: "#0097a7", where: "Detección de presencia sin guardar imágenes." , en: "Presence detection without storing images." },
  { name: "Machine Learning", area: "Inteligencia artificial", icon: TbBrain, color: "#c9a45a", where: "Clustering y GANs con MNIST, Fashion-MNIST y Olivetti." , en: "Clustering and GANs with MNIST, Fashion-MNIST and Olivetti." },

  { name: "MySQL", area: "Datos", icon: SiMysql, color: "#4479a1", where: "Automatización de ingresos y egresos en Kruger Corp." , en: "Staff onboarding and offboarding automation at Kruger Corp." },
  { name: "Oracle", area: "Datos", icon: TbDatabase, color: "#f80000", where: "Modelado y consultas SQL en la universidad." , en: "Data modeling and SQL queries at university." },
  { name: "ChromaDB", area: "Datos", icon: TbDatabaseSearch, color: "#ff6446", where: "Base vectorial del RAG de la tesis." , en: "Vector database behind the thesis RAG." },
  { name: "MongoDB", area: "Datos", icon: SiMongodb, color: "#47a248", where: "Base de datos de Drift Cero." , en: "Drift Cero database." },

  { name: "Linux", area: "Infraestructura", icon: SiLinux, color: "#fcc624", where: "Servidores y herramientas de seguridad." , en: "Servers and security tools." },
  { name: "Active Directory", area: "Infraestructura", icon: TbUsers, color: "#00a4ef", where: "Cuentas y permisos corporativos en Kruger Corp." , en: "Corporate accounts and permissions at Kruger Corp." },
  { name: "GLPI", area: "Infraestructura", icon: TbTicket, color: "#c9a45a", where: "API conectada a MySQL para altas y bajas de personal." , en: "API connected to MySQL for staff onboarding and offboarding." },
  { name: "OCS Inventory", area: "Infraestructura", icon: TbServer, color: "#c9a45a", where: "Inventario de equipos." , en: "Hardware inventory." },
  { name: "Telefonía IP", area: "Infraestructura", icon: TbPhoneCall, color: "#c9a45a", where: "Configuración en Kruger Corp." , en: "Configuration at Kruger Corp.", nameEn: "IP telephony" },
  { name: "Cámaras IP", area: "Infraestructura", icon: TbDeviceCctv, color: "#c9a45a", where: "Sistemas de videovigilancia en Kruger Corp." , en: "Video surveillance systems at Kruger Corp.", nameEn: "IP cameras" },
  { name: "Cableado y racks", area: "Infraestructura", icon: TbNetwork, color: "#c9a45a", where: "Reestructuré y etiqueté racks de telecomunicaciones." , en: "Restructured and labeled telecom racks.", nameEn: "Cabling and racks" },
  { name: "Ciberseguridad", area: "Infraestructura", icon: TbShieldLock, color: "#c9a45a", where: "Nmap, Snort y Metasploit." , en: "Nmap, Snort and Metasploit.", nameEn: "Cybersecurity" },

  { name: "Git", area: "Herramientas", icon: SiGit, color: "#f05032", where: "Control de versiones en todos mis proyectos." , en: "Version control in all my projects." },
  { name: "GitHub", area: "Herramientas", icon: SiGithub, color: "#ffffff", where: "Repositorios en github.com/EmilioEJ." , en: "Repositories at github.com/EmilioEJ." },
  { name: "Scrum", area: "Herramientas", icon: SiScrumalliance, color: "#009fda", where: "Scrum Fundamentals Certified." , en: "Scrum Fundamentals Certified." },
  { name: "Figma", area: "Herramientas", icon: SiFigma, color: "#f24e1e", where: "Diseño de interfaces." , en: "Interface design." },
  { name: "Canva", area: "Herramientas", icon: TbPalette, color: "#00c4cc", where: "Material gráfico y presentaciones." , en: "Graphics and presentations." },
  { name: "LaTeX", area: "Herramientas", icon: SiLatex, color: "#ffffff", where: "Documento de la tesis en Overleaf." , en: "Thesis document in Overleaf." },
  { name: "Geyce y Bilky", area: "Herramientas", icon: TbReceipt, color: "#c9a45a", where: "Nóminas, altas, bajas y facturación en Asesores Espinoza & Jiménez." , en: "Payroll, onboarding, offboarding and invoicing at Asesores Espinoza & Jiménez.", nameEn: "Geyce and Bilky" },
  { name: "Contrat@ (SEPE)", area: "Herramientas", icon: TbFileCertificate, color: "#c9a45a", where: "Comunicación de contratos en España." , en: "Reporting employment contracts in Spain." },
];


export type Link = { label: string; href?: string };
export const REPO = {
  aria: "https://github.com/EmilioEJ/Virtual_Asistant",
  tesis: "https://github.com/EmilioEJ/TFG_EmilioESPINOZA",
  defensa: "https://emilioej.github.io/Presentacion-Tesis/",
  gaze: "https://github.com/EmilioEJ/Eyetracking",
  portfolio: "https://github.com/EmilioEJ/portafolio-emilio-espinoza",
};

// Latencias medias de la evaluación del 7 de octubre de 2026 (evaluacion/resultados/latencia_resumen.json), en ms
export const ARIA_LATENCY = { stt: 374.5, rag: 38.3, llm: 809.9, ttfb: 384.1, tts: 642.1, perceived: 1869.1 };
