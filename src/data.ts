// Contenido del portafolio, tomado del CV general de 2026.
import type { IconType } from "react-icons";
import {
  SiPython, SiJavascript, SiCplusplus, SiOpenjdk, SiReact, SiVite, SiHtml5, SiCss, SiPhp, SiFastapi,
  SiThreedotjs, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiClaude, SiOllama, SiOpencv, SiMediapipe,
  SiElevenlabs, SiGit, SiGithub, SiFigma, SiLatex, SiLinux, SiQwen, SiScrumalliance, SiSocketdotio,
} from "react-icons/si";
import {
  TbUsers, TbDatabaseSearch, TbPhoneCall, TbDeviceCctv, TbNetwork, TbShieldLock, TbBrain, TbMicrophone,
  TbTicket, TbServer, TbApi, TbFileCertificate, TbVectorTriangle, TbDatabase, TbReceipt, TbFileTypePdf,
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
  { name: "Three.js", area: "Web", icon: SiThreedotjs, color: "#ffffff", where: "Avatar 3D con WebGL y formato VRM." },
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
  { name: "LaTeX", area: "Herramientas", icon: SiLatex, color: "#ffffff", where: "Documento de la tesis en Overleaf." },
  { name: "Geyce y Bilky", area: "Herramientas", icon: TbReceipt, color: "#c9a45a", where: "Nóminas, altas, bajas y facturación en Asesores Espinoza & Jiménez." },
  { name: "Contrat@ (SEPE)", area: "Herramientas", icon: TbFileCertificate, color: "#c9a45a", where: "Comunicación de contratos en España." },
];

export const CERTS: { group: string; rows: [string, string][] }[] = [
  { group: "Universidad Indoamérica", rows: [
    ["Fundador del Club CPRIQ", "2026"],
    ["Ayudante de investigación, 20 h", "2026"],
    ["Webots para simulación robótica, 40 h", "2023"],
  ] },
  { group: "Práctica profesional", rows: [["Kruger Corp, 248 h", "2026"]] },
  { group: "Gestión", rows: [
    ["Scrum Fundamentals Certified", "2024"],
    ["Introducción a PMP (PMI), UCAM", "2024"],
  ] },
  { group: "Desarrollo", rows: [
    ["Lógica de programación, 60 h", "2024"],
    ["Desarrollador de aplicaciones en la nube", "—"],
    ["TI para servidor público", "—"],
  ] },
];

export const PDF_ICON = TbFileTypePdf;
