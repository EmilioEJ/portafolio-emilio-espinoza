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

export type Skill = { name: string; area: Area; icon: IconType; color: string; where: string };

export const SKILLS: Skill[] = [
  { name: "Python", area: "Programación", icon: SiPython, color: "#ffd43b", where: "Avanzado, con asyncio. Backend de la tesis, eyetracking y machine learning." },
  { name: "JavaScript", area: "Programación", icon: SiJavascript, color: "#f7df1e", where: "Frontend de la tesis y la tienda Drift Cero." },
  { name: "C++", area: "Programación", icon: SiCplusplus, color: "#659ad2", where: "Control de robots de competencia en el club CPRIQ." },
  { name: "Java", area: "Programación", icon: SiOpenjdk, color: "#f89820", where: "Nivel básico: programación orientada a objetos." },

  { name: "React", area: "Web", icon: SiReact, color: "#61dafb", where: "Drift Cero y este portafolio." },
  { name: "Vite", area: "Web", icon: SiVite, color: "#a78bfa", where: "Interfaz web del asistente de la tesis." },
  { name: "HTML", area: "Web", icon: SiHtml5, color: "#e34f26", where: "Todas mis interfaces web." },
  { name: "CSS", area: "Web", icon: SiCss, color: "#2965f1", where: "Todas mis interfaces web." },
  { name: "PHP", area: "Web", icon: SiPhp, color: "#8892bf", where: "Aplicaciones web con patrón MVC." },
  { name: "FastAPI", area: "Web", icon: SiFastapi, color: "#05998b", where: "API y servidor del asistente virtual, con Uvicorn." },
  { name: "WebSockets", area: "Web", icon: SiSocketdotio, color: "#ffffff", where: "Voz y texto en tiempo real en la tesis." },
  { name: "APIs REST", area: "Web", icon: TbApi, color: "#c9a45a", where: "Integración con la API de GLPI en Kruger Corp." },
  { name: "Three.js", area: "Web", icon: SiThreedotjs, color: "#ffffff", where: "El avatar ARIA de la tesis y el templo de este portafolio." },
  { name: "Node.js", area: "Web", icon: SiNodedotjs, color: "#5fa04e", where: "En formación: backend de Drift Cero." },
  { name: "Express", area: "Web", icon: SiExpress, color: "#ffffff", where: "En formación: API REST de Drift Cero." },

  { name: "Claude", area: "Inteligencia artificial", icon: SiClaude, color: "#d97757", where: "Skills y agentes para Geyce y Contrat@, y Claude Code." },
  { name: "RAG", area: "Inteligencia artificial", icon: TbDatabaseSearch, color: "#c9a45a", where: "Motor de respuestas de la tesis: Hit Rate Top-3 de 92 %." },
  { name: "Ollama", area: "Inteligencia artificial", icon: SiOllama, color: "#ffffff", where: "LLMs locales en la tesis." },
  { name: "Qwen 2.5", area: "Inteligencia artificial", icon: SiQwen, color: "#7c6cff", where: "Modelo local evaluado en la tesis, junto a Nemotron." },
  { name: "ElevenLabs", area: "Inteligencia artificial", icon: SiElevenlabs, color: "#ffffff", where: "Voz del avatar (TTS)." },
  { name: "Whisper-v3", area: "Inteligencia artificial", icon: TbMicrophone, color: "#c9a45a", where: "Reconocimiento de voz vía Groq (STT)." },
  { name: "Embeddings", area: "Inteligencia artificial", icon: TbVectorTriangle, color: "#c9a45a", where: "SentenceTransformers multilingües y pymupdf4llm." },
  { name: "OpenCV", area: "Inteligencia artificial", icon: SiOpencv, color: "#5c3ee8", where: "Detección de presencia y eyetracking." },
  { name: "MediaPipe", area: "Inteligencia artificial", icon: SiMediapipe, color: "#0097a7", where: "Detección de presencia sin guardar imágenes." },
  { name: "Machine Learning", area: "Inteligencia artificial", icon: TbBrain, color: "#c9a45a", where: "Clustering y GANs con MNIST, Fashion-MNIST y Olivetti." },

  { name: "MySQL", area: "Datos", icon: SiMysql, color: "#4479a1", where: "Automatización de ingresos y egresos en Kruger Corp." },
  { name: "Oracle", area: "Datos", icon: TbDatabase, color: "#f80000", where: "Modelado y consultas SQL en la universidad." },
  { name: "ChromaDB", area: "Datos", icon: TbDatabaseSearch, color: "#ff6446", where: "Base vectorial del RAG de la tesis." },
  { name: "MongoDB", area: "Datos", icon: SiMongodb, color: "#47a248", where: "Base de datos de Drift Cero." },

  { name: "Linux", area: "Infraestructura", icon: SiLinux, color: "#fcc624", where: "Servidores y herramientas de seguridad." },
  { name: "Active Directory", area: "Infraestructura", icon: TbUsers, color: "#00a4ef", where: "Cuentas y permisos corporativos en Kruger Corp." },
  { name: "GLPI", area: "Infraestructura", icon: TbTicket, color: "#c9a45a", where: "API conectada a MySQL para altas y bajas de personal." },
  { name: "OCS Inventory", area: "Infraestructura", icon: TbServer, color: "#c9a45a", where: "Inventario de equipos." },
  { name: "Telefonía IP", area: "Infraestructura", icon: TbPhoneCall, color: "#c9a45a", where: "Configuración en Kruger Corp." },
  { name: "Cámaras IP", area: "Infraestructura", icon: TbDeviceCctv, color: "#c9a45a", where: "Sistemas de videovigilancia en Kruger Corp." },
  { name: "Cableado y racks", area: "Infraestructura", icon: TbNetwork, color: "#c9a45a", where: "Reestructuré y etiqueté racks de telecomunicaciones." },
  { name: "Ciberseguridad", area: "Infraestructura", icon: TbShieldLock, color: "#c9a45a", where: "Nmap, Snort y Metasploit." },

  { name: "Git", area: "Herramientas", icon: SiGit, color: "#f05032", where: "Control de versiones en todos mis proyectos." },
  { name: "GitHub", area: "Herramientas", icon: SiGithub, color: "#ffffff", where: "Repositorios en github.com/EmilioEJ." },
  { name: "Scrum", area: "Herramientas", icon: SiScrumalliance, color: "#009fda", where: "Scrum Fundamentals Certified." },
  { name: "Figma", area: "Herramientas", icon: SiFigma, color: "#f24e1e", where: "Diseño de interfaces." },
  { name: "Canva", area: "Herramientas", icon: TbPalette, color: "#00c4cc", where: "Material gráfico y presentaciones." },
  { name: "LaTeX", area: "Herramientas", icon: SiLatex, color: "#ffffff", where: "Documento de la tesis en Overleaf." },
  { name: "Geyce y Bilky", area: "Herramientas", icon: TbReceipt, color: "#c9a45a", where: "Nóminas, altas, bajas y facturación en Asesores Espinoza & Jiménez." },
  { name: "Contrat@ (SEPE)", area: "Herramientas", icon: TbFileCertificate, color: "#c9a45a", where: "Comunicación de contratos en España." },
];


export type Entry = { org: string; role: string; where: string; when: string; tag: string; points: string[] };

export const EXPERIENCE: Entry[] = [
  { org: "Kruger Corp", role: "Pasante de soporte, infraestructura y automatización", where: "Quito, Ecuador", when: "Oct. 2025 – Ene. 2026 · 248 h", tag: "GLPI",
    points: [
      "Flujos automatizados de ingreso y egreso de personal con la API de GLPI conectada a MySQL.",
      "Cuentas y permisos de usuarios corporativos en Active Directory.",
      "Telefonía IP, videovigilancia IP y reestructuración y etiquetado de los racks.",
    ] },
  { org: "Asesores Espinoza & Jiménez", role: "Gestión administrativa y soporte TI", where: "España", when: "2021 · Ago. 2024 – hoy", tag: "IA",
    points: [
      "Skills y agentes de Claude para el alta de trabajadores en Geyce y los contratos en Contrat@.",
      "Altas y bajas en Geyce, facturación y digitalización de documentos en Bilky.",
      "Copias de seguridad durante las migraciones de sistemas.",
    ] },
  { org: "LR-Light", role: "Ayudante eléctrico", where: "Quito, Ecuador", when: "Jul. – Ago. 2022", tag: "OBRA",
    points: ["Apoyo en instalaciones eléctricas residenciales y corporativas."] },
];

export const EDUCATION: Entry[] = [
  { org: "Universidad Tecnológica Indoamérica", role: "Ingeniería en Tecnologías de la Información", where: "Quito, Ecuador", when: "2026", tag: "TESIS",
    points: ["Trabajo de titulación: prototipo de asistente virtual inteligente con avatar 3D y visión artificial para la difusión de información académica."] },
  { org: "Unidad Educativa Jan Komensky", role: "Bachillerato en Ciencias", where: "Quito, Ecuador", when: "2022", tag: "BGU", points: [] },
];

export const LANGUAGES: [string, string][] = [["Español", "Nativo"], ["Inglés", "Intermedio, certificación B1"]];

export type Cert = { year: string; name: string; by: string };
export const CERTS: Cert[] = [
  { year: "2026", name: "Fundador del Club de Programación y Robótica (CPRIQ)", by: "Facultad de Ingenierías, U. Indoamérica" },
  { year: "2026", name: "Ayudante de investigación, 20 h", by: "Proyecto de neuromarketing y diseño web inclusivo, U. Indoamérica" },
  { year: "2026", name: "Prácticas preprofesionales, 248 h", by: "Kruger Corp" },
  { year: "2024", name: "Scrum Fundamentals Certified (SFC™)", by: "SCRUMstudy" },
  { year: "2024", name: "Lógica de programación, 60 h", by: "Fundación Carlos Slim" },
  { year: "2024", name: "Introducción a la certificación PMP (PMI)", by: "UCAM · Cursa" },
  { year: "2023", name: "Webots para simulación robótica, 40 h", by: "Universidad Indoamérica" },
  { year: "—", name: "Tecnologías de la Información para servidor público", by: "Curso complementario" },
  { year: "—", name: "Desarrollador de aplicaciones en la nube", by: "Curso complementario" },
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
