import type { Node, Edge } from "reactflow";

export type StageDetail = {
  title: string;
  items: string[];
};

export type RoadmapStage = {
  id: string;
  label: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  details: StageDetail[];
};

export type CareerRoadmap = {
  stages: RoadmapStage[];
  nodes: Node[];
  edges: Edge[];
};

const H_GAP = 320;
const BASE_X = 60;
const ROW_Y = 300;

function col(i: number) {
  return BASE_X + i * H_GAP;
}

type StageDef = {
  id: string;
  label: string;
  description: string;
  duration: string;
  icon: string;
  details: StageDetail[];
};

function genRoadmap(careerId: string, stages: StageDef[], color: string): CareerRoadmap {
  const prefix = careerId.replace(/[^a-z0-9]/g, "");
  const s = stages.map((st, i) => ({
    ...st,
    id: `${prefix}-${st.id}`,
    color,
  }));
  const nodes: Node[] = s.map((st, i) => ({
    id: st.id,
    position: { x: col(i), y: ROW_Y },
    data: { label: st.id },
    type: "careerNode",
  }));
  const edges: Edge[] = [];
  for (let i = 0; i < s.length - 1; i++) {
    edges.push({
      id: `e${s[i].id}-${s[i + 1].id}`,
      source: s[i].id,
      target: s[i + 1].id,
      animated: true,
      style: { stroke: color, strokeWidth: 2 },
    });
  }
  return { stages: s, nodes, edges };
}

// ── Shared templates ─────────────────────────────────────────────────────────

const engineeringStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Matemáticas, física, química e introducción a la ingeniería", duration: "2 años", icon: "📐",
    details: [
      { title: "Materias clave", items: ["Matemática Básica y Cálculo", "Física General", "Química General", "Introducción a la Ingeniería", "Comunicación y Lenguaje"] },
      { title: "Desarrolla", items: ["Pensamiento lógico-matemático", "Resolución de problemas", "Trabajo en laboratorio", "Expresión oral y escrita"] },
    ],
  },
  {
    id: "especialidad", label: "Ciclos de Especialidad", description: "Materias propias de la rama de ingeniería", duration: "2 años", icon: "⚙️",
    details: [
      { title: "Materias clave", items: ["Mecánica y Resistencia de Materiales", "Circuitos Eléctricos", "Termodinámica", "Dibujo Técnico y CAD", "Programación Básica"] },
      { title: "Laboratorios", items: ["Laboratorio de Física", "Laboratorio de Química", "Taller de Diseño", "Software especializado"] },
    ],
  },
  {
    id: "avanzados", label: "Ciclos Avanzados", description: "Especialización y electivas profesionales", duration: "1 año", icon: "🎯",
    details: [
      { title: "Materias clave", items: ["Gestión de Proyectos", "Formulación y Evaluación de Proyectos", "Legislación Profesional", "Electivas de Especialidad", "Seminario de Tesis"] },
      { title: "Habilidades", items: ["Liderazgo y trabajo en equipo", "Ética profesional", "Comunicación técnica", "Innovación"] },
    ],
  },
  {
    id: "practicas", label: "Prácticas Preprofesionales", description: "Experiencia en empresa del rubro", duration: "6-12 meses", icon: "🏢",
    details: [
      { title: "Experiencia", items: ["Prácticas en empresa del sector", "Proyectos reales supervisados", "Mentoría profesional", "Reporte técnico final"] },
      { title: "Preparación", items: ["CV y portafolio actualizado", "LinkedIn profesional", "Simulacros de entrevista", "Networking en ferias laborales"] },
    ],
  },
  {
    id: "titulacion", label: "Titulación y Ejercicio", description: "Obtén tu título y colegiatura", duration: "6-12 meses", icon: "🎓",
    details: [
      { title: "Opciones", items: ["Tesis de investigación", "Trabajo de suficiencia profesional", "Examen de habilidad profesional", "Curso de actualización"] },
      { title: "Ejercicio", items: ["Empresa privada o pública", "Emprendimiento / Consultoría", "Especialización (maestría)", "Colegiatura profesional"] },
    ],
  },
];

const healthStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Ciencias fundamentales de la salud", duration: "2 años", icon: "🔬",
    details: [
      { title: "Materias clave", items: ["Biología General", "Química Orgánica e Inorgánica", "Anatomía Humana", "Fisiología General", "Salud Pública"] },
      { title: "Desarrolla", items: ["Pensamiento científico", "Observación clínica", "Trabajo en laboratorio", "Empatía y comunicación"] },
    ],
  },
  {
    id: "preclinico", label: "Ciclos Preclínicos", description: "Materias propias de la carrera de salud", duration: "2 años", icon: "🩺",
    details: [
      { title: "Materias clave", items: ["Farmacología", "Patología General", "Microbiología", "Bioestadística", "Nutrición"] },
      { title: "Prácticas", items: ["Laboratorio de simulación", "Prácticas comunitarias", "Atención primaria básica", "Historias clínicas"] },
    ],
  },
  {
    id: "clinico", label: "Ciclos Clínicos", description: "Rotaciones y atención directa", duration: "1-2 años", icon: "🏥",
    details: [
      { title: "Rotaciones", items: ["Medicina Interna", "Pediatría", "Ginecología y Obstetricia", "Emergencias", "Cirugía General"] },
      { title: "Aprende", items: ["Diagnóstico diferencial", "Toma de decisiones clínicas", "Trabajo en equipo multidisciplinario", "Manejo de urgencias"] },
    ],
  },
  {
    id: "internado", label: "Internado / SERUMS", description: "Práctica profesional supervisada", duration: "1-2 años", icon: "🌿",
    details: [
      { title: "Experiencia", items: ["Atención en establecimientos de salud", "Comunidades rurales o urbanas", "Trabajo con recursos limitados", "Reporte de servicio"] },
      { title: "Beneficios", items: ["Autonomía profesional", "Compromiso social", "Requisito para especialización", "Contacto directo con pacientes"] },
    ],
  },
  {
    id: "especializacion", label: "Especialización y Ejercicio", description: "Residencia o práctica profesional", duration: "∞", icon: "👨‍⚕️",
    details: [
      { title: "Opciones", items: ["Especialización (residentado)", "Consulta privada", "Hospital público o privado", "Docencia universitaria", "Investigación"] },
      { title: "Ingreso", items: ["S/. 3,000 – 15,000+ mensuales", "Varía según especialidad", "Mayor ingreso en especialidades quirúrgicas"] },
    ],
  },
];

const businessStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Fundamentos de negocios y gestión", duration: "2 años", icon: "📊",
    details: [
      { title: "Materias clave", items: ["Contabilidad General", "Microeconomía y Macroeconomía", "Matemática Financiera", "Estadística Aplicada", "Derecho Empresarial"] },
      { title: "Desarrolla", items: ["Pensamiento analítico", "Manejo de Excel", "Comunicación corporativa", "Visión de negocio"] },
    ],
  },
  {
    id: "gestion", label: "Ciclos de Gestión", description: "Administración, marketing y finanzas", duration: "2 años", icon: "📈",
    details: [
      { title: "Materias clave", items: ["Administración General", "Marketing Estratégico", "Finanzas Corporativas", "Gestión del Talento Humano", "Logística y Operaciones"] },
      { title: "Herramientas", items: ["Excel avanzado y tablas dinámicas", "Power BI o Tableau", "ERPs (SAP, Oracle)", "Google Analytics"] },
    ],
  },
  {
    id: "avanzados", label: "Ciclos Avanzados", description: "Estrategia y liderazgo", duration: "1 año", icon: "🎯",
    details: [
      { title: "Materias clave", items: ["Planeamiento Estratégico", "Evaluación de Proyectos", "Comercio Internacional", "Gobierno Corporativo", "Seminario de Investigación"] },
      { title: "Habilidades", items: ["Liderazgo y negociación", "Toma de decisiones", "Pensamiento estratégico", "Ética empresarial"] },
    ],
  },
  {
    id: "practicas", label: "Prácticas Profesionales", description: "Experiencia en empresas e instituciones", duration: "6-12 meses", icon: "🏢",
    details: [
      { title: "Experiencia", items: ["Prácticas en empresa del rubro", "Proyectos de consultoría", "Rotación por áreas", "Mentoría ejecutiva"] },
      { title: "Preparación", items: ["CV y perfil LinkedIn", "Networking profesional", "Simulacros de assessment", "Portafolio de logros"] },
    ],
  },
  {
    id: "ejercicio", label: "Ejercicio Profesional", description: "Directivo, consultor o emprendedor", duration: "∞", icon: "💼",
    details: [
      { title: "Opciones", items: ["Empresa privada (analista a gerente)", "Emprendimiento propio", "Consultoría independiente", "Sector público", "Banca y finanzas"] },
      { title: "Crecimiento", items: ["MBA o maestría", "Certificaciones internacionales", "Red de contactos profesional", "Idiomas (inglés avanzado)"] },
    ],
  },
];

const communicationStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Lenguaje, teoría de la comunicación", duration: "2 años", icon: "📖",
    details: [
      { title: "Materias clave", items: ["Teoría de la Comunicación", "Lenguaje y Redacción", "Sociología", "Psicología Social", "Fotografía y Video Básico"] },
      { title: "Desarrolla", items: ["Redacción periodística", "Análisis crítico de medios", "Comunicación oral", "Creatividad narrativa"] },
    ],
  },
  {
    id: "especialidad", label: "Ciclos de Especialidad", description: "Medios, periodismo y publicidad", duration: "2 años", icon: "📡",
    details: [
      { title: "Materias clave", items: ["Periodismo Digital", "Producción Audiovisual", "Publicidad y Branding", "Marketing de Contenidos", "Diseño Gráfico Básico"] },
      { title: "Herramientas", items: ["Adobe Premiere / Final Cut", "Canva / Adobe Suite", "CMS (WordPress)", "Google Analytics"] },
    ],
  },
  {
    id: "avanzados", label: "Ciclos Avanzados", description: "Estrategia y producción", duration: "1 año", icon: "🚀",
    details: [
      { title: "Materias clave", items: ["Comunicación Estratégica", "Gestión de Crisis", "Community Management", "Seminario de Investigación", "Legislación de Medios"] },
      { title: "Habilidades", items: ["Storytelling", "Análisis de audiencia", "Estrategia multicanal", "Gestión de proyectos"] },
    ],
  },
  {
    id: "practicas", label: "Prácticas Preprofesionales", description: "En medios, agencias o departamentos de comunicación", duration: "6-12 meses", icon: "🏢",
    details: [
      { title: "Experiencia", items: ["Redacción en medio digital o impreso", "Agencia de publicidad", "Departamento de comunicaciones", "Producción de contenidos"] },
      { title: "Portafolio", items: ["Portafolio de trabajos publicados", "Campañas realizadas", "Métricas de alcance", "Reel o showreel"] },
    ],
  },
  {
    id: "ejercicio", label: "Ejercicio Profesional", description: "Comunicador, periodista, publicista", duration: "∞", icon: "🎬",
    details: [
      { title: "Opciones", items: ["Medio de comunicación", "Agencia de publicidad", "Departamento de comunicaciones corporativas", "Freelance / creador de contenido", "Docencia"] },
      { title: "Crecimiento", items: ["Especialización en marketing digital", "Maestría en Comunicación", "Certificaciones en Google/Meta", "Networking sectorial"] },
    ],
  },
];

const educationStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Psicología, pedagogía y desarrollo humano", duration: "2 años", icon: "📚",
    details: [
      { title: "Materias clave", items: ["Psicología del Desarrollo", "Teorías del Aprendizaje", "Filosofía de la Educación", "Sociología Educativa", "Comunicación y Lenguaje"] },
      { title: "Desarrolla", items: ["Paciencia y empatía", "Comunicación asertiva", "Creatividad pedagógica", "Trabajo colaborativo"] },
    ],
  },
  {
    id: "especialidad", label: "Ciclos de Especialidad", description: "Métodos de enseñanza y currículo", duration: "2 años", icon: "✏️",
    details: [
      { title: "Materias clave", items: ["Didáctica General", "Evaluación del Aprendizaje", "Currículo y Planificación", "Psicopedagogía", "Tecnología Educativa"] },
      { title: "Prácticas", items: ["Observación en aulas", "Prácticas supervisadas", "Elaboración de materiales", "Adaptación curricular"] },
    ],
  },
  {
    id: "avanzados", label: "Ciclos Avanzados", description: "Gestión educativa e investigación", duration: "1 año", icon: "🎓",
    details: [
      { title: "Materias clave", items: ["Gestión Educativa", "Investigación Educativa", "Políticas Educativas", "Educación Inclusiva", "Seminario de Tesis"] },
      { title: "Habilidades", items: ["Liderazgo pedagógico", "Análisis de datos educativos", "Diseño curricular", "Innovación educativa"] },
    ],
  },
  {
    id: "practicas", label: "Prácticas Docentes", description: "En instituciones educativas", duration: "1 año", icon: "🏫",
    details: [
      { title: "Experiencia", items: ["Prácticas en colegios", "A cargo de aula con supervisión", "Proyectos educativos", "Participación en eventos pedagógicos"] },
      { title: "Preparación", items: ["Portafolio docente", "Plan de clases", "Material didáctico propio", "Evaluaciones diagnósticas"] },
    ],
  },
  {
    id: "ejercicio", label: "Ejercicio Profesional", description: "Docente, gestor o investigador", duration: "∞", icon: "🍎",
    details: [
      { title: "Opciones", items: ["Docencia en colegio público o privado", "Gestión educativa (director, coordinador)", "Educación alternativa (talleres, online)", "Investigación educativa", "Ministerio de Educación"] },
      { title: "Crecimiento", items: ["Maestría en Educación", "Diplomados en especialización", "Certificaciones en enseñanza de idiomas", "Concursos de nombramiento"] },
    ],
  },
];

const sciencesStages: StageDef[] = [
  {
    id: "basicos", label: "Ciclos Básicos", description: "Matemáticas, ciencias y metodología", duration: "2 años", icon: "🔬",
    details: [
      { title: "Materias clave", items: ["Matemática y Estadística", "Biología General", "Química General", "Física General", "Metodología de la Investigación"] },
      { title: "Desarrolla", items: ["Pensamiento crítico", "Método científico", "Análisis de datos", "Trabajo en laboratorio"] },
    ],
  },
  {
    id: "especialidad", label: "Ciclos de Especialidad", description: "Materias propias de la ciencia", duration: "2 años", icon: "🔭",
    details: [
      { title: "Materias clave", items: ["Biología Avanzada", "Ecología y Recursos Naturales", "Geografía y Climatología", "Estadística Aplicada", "Técnicas de Campo"] },
      { title: "Prácticas", items: ["Trabajo de campo supervisado", "Laboratorio especializado", "Manejo de equipos científicos", "Recolección de datos"] },
    ],
  },
  {
    id: "avanzados", label: "Ciclos Avanzados", description: "Investigación y especialización", duration: "1 año", icon: "📊",
    details: [
      { title: "Materias clave", items: ["Gestión Ambiental", "Evaluación de Impacto", "Seminario de Investigación", "Electivas de especialidad", "Legislación Ambiental"] },
      { title: "Habilidades", items: ["Redacción científica", "Análisis estadístico", "GIS y teledetección", "Trabajo interdisciplinario"] },
    ],
  },
  {
    id: "practicas", label: "Prácticas y Campo", description: "Experiencia profesional en el rubro", duration: "6-12 meses", icon: "🏕️",
    details: [
      { title: "Experiencia", items: ["Prácticas en institutos de investigación", "ONGs ambientales", "Empresas del sector", "Laboratorios acreditados"] },
      { title: "Preparación", items: ["CV y portafolio", "Red de contactos profesionales", "Publicaciones científicas", "Participación en congresos"] },
    ],
  },
  {
    id: "ejercicio", label: "Ejercicio Profesional", description: "Científico, consultor o investigador", duration: "∞", icon: "🌍",
    details: [
      { title: "Opciones", items: ["Investigación en universidad o centro de investigación", "Consultoría ambiental", "Sector público (MINAM, SERFOR)", "ONG internacional", "Docencia universitaria"] },
      { title: "Crecimiento", items: ["Maestría y doctorado", "Publicaciones indexadas", "Certificaciones internacionales", "Trabajo de campo internacional"] },
    ],
  },
];

// ── Career color table (from careers.ts) ──────────────────────────────────────

const C = {
  software: "#534AB7", medicina: "#1D9E75", derecho: "#BA7517",
  administracion: "#1565C0", contabilidad: "#2E7D32", "ingenieria-civil": "#F57C00",
  arquitectura: "#5A7A5A", psicologia: "#7A5A9A", marketing: "#D85A30",
  "diseno-ux": "#D4537E", enfermeria: "#4A90D9", "ingenieria-industrial": "#6A1B9A",
  economia: "#00838F", gastronomia: "#D85A30", periodismo: "#E65100",
  "ingenieria-minas": "#795548", odontologia: "#00ACC1",
  "ingenieria-ambiental": "#43A047", educacion: "#FDD835", nutricion: "#8BC34A",
  turismo: "#FF7043", "relaciones-internacionales": "#3949AB", veterinaria: "#66BB6A",
  "administracion-negocios-internacionales": "#1E88E5", "biologia-marina": "#0077B6",
  "ciencia-computacion": "#311B92", "ciencias-comunicacion": "#C62828",
  "comunicacion-publicidad": "#E91E63", "educacion-inicial": "#F48FB1",
  "educacion-primaria": "#FFD54F", "ingenieria-biomedica": "#D81B60",
  "ingenieria-ciberseguridad": "#1B5E20", "ingenieria-diseno-grafico": "#AD1457",
  "ingenieria-sistemas-informacion": "#283593", "ingenieria-sistemas": "#2E7D32",
  "ingenieria-transporte": "#546E7A", "ingenieria-economica-negocios": "#00695C",
  "ingenieria-electronica": "#FF6F00", "ingenieria-empresarial": "#4527A0",
  "ingenieria-maritima": "#0277BD", "ingenieria-mecanica": "#BF360C",
  "ingenieria-mecatronica": "#4E342E", "ingenieria-naval": "#0D47A1",
  obstetricia: "#E91E63", "psicologia-consumidor": "#8E24AA",
  "redes-telecomunicaciones": "#00838F", "tecnologia-medica": "#00BCD4",
  "traduccion-interpretacion": "#7B1FA2",
};

const templateMap: Record<string, StageDef[]> = {
  engineering: engineeringStages,
  health: healthStages,
  business: businessStages,
  communication: communicationStages,
  education: educationStages,
  sciences: sciencesStages,
};

const careerToTemplate: Record<string, string> = {
  "ingenieria-civil": "engineering",
  "ingenieria-industrial": "engineering",
  "ingenieria-minas": "engineering",
  "ingenieria-ambiental": "engineering",
  "ingenieria-biomedica": "engineering",
  "ingenieria-ciberseguridad": "engineering",
  "ingenieria-diseno-grafico": "engineering",
  "ingenieria-sistemas-informacion": "engineering",
  "ingenieria-sistemas": "engineering",
  "ingenieria-transporte": "engineering",
  "ingenieria-economica-negocios": "engineering",
  "ingenieria-electronica": "engineering",
  "ingenieria-empresarial": "engineering",
  "ingenieria-maritima": "engineering",
  "ingenieria-mecanica": "engineering",
  "ingenieria-mecatronica": "engineering",
  "ingenieria-naval": "engineering",
  "redes-telecomunicaciones": "engineering",
  enfermeria: "health",
  odontologia: "health",
  obstetricia: "health",
  "tecnologia-medica": "health",
  nutricion: "health",
  veterinaria: "health",
  contabilidad: "business",
  administracion: "business",
  "administracion-negocios-internacionales": "business",
  economia: "business",
  periodismo: "communication",
  "ciencias-comunicacion": "communication",
  "comunicacion-publicidad": "communication",
  "traduccion-interpretacion": "communication",
  educacion: "education",
  "educacion-inicial": "education",
  "educacion-primaria": "education",
  "biologia-marina": "sciences",
  "relaciones-internacionales": "sciences",
  turismo: "sciences",
  "psicologia-consumidor": "sciences",
};

// ── Manually crafted roadmaps ────────────────────────────────────────────────

type CareerTmpl = {
  stages: StageDef[];
  color: string;
};

const manual: Record<string, CareerTmpl> = {
  software: {
    color: C.software,
    stages: [
      {
        id: "s1", label: "Fundamentos", description: "Lógica, algoritmos y estructuras de datos", duration: "6 meses", icon: "📚",
        details: [
          { title: "Aprende", items: ["Pseudocódigo y diagramas de flujo", "Complejidad Big O", "Arrays, linked lists, stacks, queues", "Recursión y búsqueda binaria"] },
          { title: "Recursos", items: ["freeCodeCamp (gratis)", "CS50 de Harvard (gratis)", "Libro: Introducción a Algoritmos (CLRS)"] },
          { title: "Practica", items: ["LeetCode Easy (50+ problemas)", "HackerRank 30 Days of Code", "Crea un calendario de estudio semanal"] },
        ],
      },
      {
        id: "s2", label: "Frontend", description: "HTML, CSS, JavaScript y frameworks como React", duration: "4 meses", icon: "🖥️",
        details: [
          { title: "Domina", items: ["HTML semántico y CSS Flexbox/Grid", "JavaScript moderno (ES6+)", "React hooks y componentes", "Tailwind CSS oStyled Components"] },
          { title: "Proyectos", items: ["Landing page responsiva", "To-do app con estado local", "Buscador de APIs públicas", "Mini e-commerce con carrito"] },
          { title: "Herramientas", items: ["VS Code + extensiones", "Git y GitHub básico", "Chrome DevTools", "npm/yarn"] },
        ],
      },
      {
        id: "s3", label: "Backend", description: "Node.js, bases de datos y APIs REST", duration: "4 meses", icon: "⚙️",
        details: [
          { title: "Aprende", items: ["Node.js y Express.js", "RESTful API design", "Autenticación JWT", "Patrones MVC y Clean Architecture"] },
          { title: "Bases de datos", items: ["PostgreSQL o MySQL (SQL)", "MongoDB (NoSQL)", "ORMs: Prisma o Sequelize", "Migraciones y seeders"] },
          { title: "Deploy", items: ["Railway / Render / Vercel", "Docker básico", "Variables de entorno", "CI/CD con GitHub Actions"] },
        ],
      },
      {
        id: "s4", label: "Portafolio", description: "Crea tu portafolio con proyectos reales", duration: "3 meses", icon: "🚀",
        details: [
          { title: "Proyectos clave", items: ["App Full Stack (CRUD completo)", "Clone de una app real (Twitter, Netflix)", "Sistema de autenticación completo", "Integración con APIs de pago"] },
          { title: "Presentación", items: ["GitHub con README profesional", "Portfolio web personal", "Deploy en Vercel o Netlify", "Documentación clara del código"] },
        ],
      },
      {
        id: "s5", label: "Especialización", description: "IA, Cloud, DevOps o Seguridad", duration: "3+ meses", icon: "🎯",
        details: [
          { title: "Campos", items: ["Machine Learning / IA (Python, TensorFlow)", "Cloud (AWS, GCP, Azure)", "DevOps (Docker, K8s, CI/CD)", "Ciberseguridad (pentesting, OWASP)"] },
          { title: "Certificaciones", items: ["AWS Cloud Practitioner", "Google Cloud Associate", "Kubernetes (CKA)", "CompTIA Security+"] },
        ],
      },
    ],
  },
  medicina: {
    color: C.medicina,
    stages: [
      {
        id: "m1", label: "Pregrado", description: "Carrera de Medicina Humana", duration: "6 años", icon: "📖",
        details: [
          { title: "Materias clave", items: ["Anatomía y Fisiología", "Bioquímica y Farmacología", "Patología General", "Semiología y Semiología Quirúrgica"] },
          { title: "Preparación", items: ["Ingresa a una universidad acreditada", "Dedicación de 8+ horas diarias de estudio", "Prácticas en laboratorio desde el 1er año", "Grupo de estudio obligatorio"] },
        ],
      },
      {
        id: "m2", label: "Internado", description: "Rotaciones hospitalarias generales", duration: "1 año", icon: "🏥",
        details: [
          { title: "Rotaciones", items: ["Medicina Interna (2 meses)", "Cirugía General (2 meses)", "Pediatría (2 meses)", "Ginecología y Obstetricia (2 meses)", "Emergencias (2 meses)"] },
          { title: "Aprende", items: ["Anamnesis y exploración física", "Toma de decisiones clínicas", "Manejo de urgencias", "Trabajo en equipo multidisciplinario"] },
        ],
      },
      {
        id: "m3", label: "Servicio Rural", description: "Atención primaria en zonas rurales", duration: "1-2 años", icon: "🌿",
        details: [
          { title: "Experiencia", items: ["Atención primaria en comunidades alejadas", "Prevención y promoción de salud", "Manejo de patologías frecuentes", "Trabajo con recursos limitados"] },
          { title: "Beneficios", items: ["Compromiso social real", "Autonomía clínica desde el inicio", "Requisito para especialización", "Contacto directo con pacientes"] },
        ],
      },
      {
        id: "m4", label: "Especialización", description: "Cardiología, pediatría, cirugía...", duration: "3-5 años", icon: "🔬",
        details: [
          { title: "Opciones", items: ["Medicina Interna (3 años)", "Cardiología (3 años)", "Pediatría (3 años)", "Cirugía General (4 años)", "Dermatología, Neurología, etc."] },
          { title: "Requisitos", items: ["ENAM o examen de ingreso", "CV con publicaciones y congresos", "Entrevista personal", "Alto promedio académico"] },
        ],
      },
      {
        id: "m5", label: "Ejercicio", description: "Consulta privada o institucional", duration: "∞", icon: "👨‍⚕️",
        details: [
          { title: "Opciones", items: ["Consulta privada propia", "Hospital público o privado", "Investigación médica", "Docencia universitaria", "Salud ocupacional"] },
          { title: "Ingreso", items: ["S/. 8,000 – 25,000+ mensuales", "Varía según especialidad y experiencia", "Mayor ingreso en especialidades quirúrgicas"] },
        ],
      },
    ],
  },
  derecho: {
    color: C.derecho,
    stages: [
      {
        id: "dr1", label: "Pregrado", description: "Carrera de Derecho", duration: "5 años", icon: "📖",
        details: [
          { title: "Materias clave", items: ["Derecho Civil y Obligaciones", "Derecho Penal", "Derecho Constitucional", "Derecho Laboral y Administrativo"] },
          { title: "Desarrolla", items: ["Habilidad argumentativa oral y escrita", "Lectura crítica de sentencias", "Investigación jurídica (lexislaw)", "Redacción de escritos forenses"] },
        ],
      },
      {
        id: "dr2", label: "Prácticas", description: "Clínicas jurídicas o estudios de abogados", duration: "1 año", icon: "⚖️",
        details: [
          { title: "Experiencia", items: ["Clínica jurídica universitaria", "Estudio de abogados (litigio)", "Ministerio Público", "Defensoría del Pueblo"] },
          { title: "Aprende", items: ["Atención al ciudadano", "Redacción de demandas y recursos", "Estrategia de litigio", "Negociación y mediación"] },
        ],
      },
      {
        id: "dr3", label: "Especialización", description: "Civil, penal, laboral, constitucional", duration: "1-2 años", icon: "📚",
        details: [
          { title: "Opciones", items: ["Derecho Civil y Familia", "Derecho Penal y Criminología", "Derecho Laboral", "Derecho Constitucional e Internacional"] },
          { title: "Posgrado", items: ["Maestría en Derecho", "Especialización tributaria", "Diplomado en Derecho Digital", "Certificación en arbitraje"] },
        ],
      },
      {
        id: "dr4", label: "Habilitación", description: "Examen de licencia para ejercer", duration: "6 meses", icon: "✅",
        details: [
          { title: "Preparación", items: ["Estudiar leyes y códigos vigentes", "Resolver exámenes de años anteriores", "Grupo de estudio con compañeros", "Cursos preparatorios (2-3 meses)"] },
          { title: "Requisitos", items: ["Título universitario", "Examen de habilitación del Colegio", "Ética profesional", "Seguro de responsabilidad civil"] },
        ],
      },
      {
        id: "dr5", label: "Ejercicio", description: "Bufete propio, empresa o sector público", duration: "∞", icon: "🏛️",
        details: [
          { title: "Opciones", items: ["Bufete propio (litigio)", "Legal department en empresa", "Fiscalía o Poder Judicial", "Consultoría jurídica", "Derecho internacional"] },
          { title: "Ingreso", items: ["S/. 4,000 – 15,000+ mensuales", "Mayor ingreso en corporativo", "Litigio puede ser más variable"] },
        ],
      },
    ],
  },
  psicologia: {
    color: C.psicologia,
    stages: [
      {
        id: "p1", label: "Pregrado", description: "Psicología General", duration: "5 años", icon: "📖",
        details: [
          { title: "Materias clave", items: ["Psicología General y Social", "Psicopatología", "Neuropsicología", "Psicología del Desarrollo"] },
          { title: "Desarrolla", items: ["Escucha activa y empatía", "Observación conductual", "Técnicas de entrevista", "Pensamiento crítico"] },
        ],
      },
      {
        id: "p2", label: "Prácticas", description: "Atención directa con pacientes supervisada", duration: "1 año", icon: "🧠",
        details: [
          { title: "Experiencia", items: ["Centro de salud mental", "Consultorio con supervisión", "Hospital psiquiátrico", "Institución educativa"] },
          { title: "Aprende", items: ["Entrevista clínica", "Anamnesis psicológica", "Técnicas proyectivas", "Elaboración de informes"] },
        ],
      },
      {
        id: "p3", label: "Posgrado", description: "Clínica, educativa, organizacional o forense", duration: "2 años", icon: "🎓",
        details: [
          { title: "Opciones", items: ["Psicología Clínica (consultorio)", "Psicología Educativa (colegios)", "Psicología Organizacional (empresas)", "Psicología Forense (peritajes)"] },
          { title: "Programas", items: ["Maestría en Psicología Clínica", "Especialización en Terapia Cognitiva", "Diplomado en Neuropsicología", "Certificación en Terapia de Pareja"] },
        ],
      },
      {
        id: "p4", label: "Certificaciones", description: "Terapias específicas (CBT, sistémica...)", duration: "6-12 meses", icon: "📜",
        details: [
          { title: "Terapias", items: ["Terapia Cognitivo-Conductual (CBT)", "Terapia Sistémica Familiar", "Terapia de Aceptación y Compromiso (ACT)", "EMDR para trauma"] },
          { title: "Certificaciones", items: ["Certificación en CBT (Beck Institute)", "Terapia Breve Centrada en Soluciones", "Mindfulness-Based Stress Reduction", "Coaching certificado (ICF)"] },
        ],
      },
      {
        id: "p5", label: "Ejercicio", description: "Consulta privada, hospital o empresa", duration: "∞", icon: "💚",
        details: [
          { title: "Opciones", items: ["Consulta privada propia", "Hospital o centro de salud mental", "Empresa (Bienestar Laboral)", "Escuela o universidad", "Investigación y docencia"] },
          { title: "Ingreso", items: ["S/. 3,000 – 10,000+ mensuales", "Consulta privada: S/. 80-200 por sesión", "Mayor ingreso con especialización"] },
        ],
      },
    ],
  },
  marketing: {
    color: C.marketing,
    stages: [
      {
        id: "mk1", label: "Fundamentos", description: "Marketing, consumidor, market research", duration: "3 meses", icon: "📖",
        details: [
          { title: "Aprende", items: ["Mix de Marketing (4P/7P)", "Segmentación y targeting", "Embudo de conversión", "Análisis FODA y competencia"] },
          { title: "Recursos", items: ["Google Digital Garage (gratis)", "HubSpot Academy (gratis)", "Libro: Posicionamiento de Ries y Trout", "Podcast: Marketing PM"] },
        ],
      },
      {
        id: "mk2", label: "Digital", description: "SEO, SEM, redes sociales, email marketing", duration: "3 meses", icon: "📱",
        details: [
          { title: "Canales", items: ["SEO on-page y off-page", "Google Ads (SEM)", "Facebook/Instagram Ads", "Email marketing (Mailchimp)"] },
          { title: "Redes sociales", items: ["Estrategia de contenido", "Community management", "Influencer marketing", "Social listening"] },
        ],
      },
      {
        id: "mk3", label: "Contenido", description: "Copywriting, storytelling, branded content", duration: "2 meses", icon: "✍️",
        details: [
          { title: "Habilidades", items: ["Copywriting persuasivo", "Storytelling de marca", "Copy para ads y landing pages", "Contenido para redes sociales"] },
          { title: "Practica", items: ["Crea 10 copies para anuncios", "Escribe 5 landings de prueba", "Crea un blog personal", "Gestiona una marca ficticia"] },
        ],
      },
      {
        id: "mk4", label: "Analytics", description: "Google Analytics, métricas, ROI", duration: "2 meses", icon: "📊",
        details: [
          { title: "Herramientas", items: ["Google Analytics 4", "Google Tag Manager", "Meta Business Suite", "Hotjar (comportamiento)"] },
          { title: "Métricas", items: ["CAC, LTV, ROAS", "Tasa de conversión", "Engagement rate", "Attribution modeling"] },
        ],
      },
      {
        id: "mk5", label: "Especialización", description: "Performance, Branding, Growth o Gerencia", duration: "2+ meses", icon: "🎯",
        details: [
          { title: "Campos", items: ["Performance Marketing (ads)", "Branding e Identidad Corporativa", "Growth Hacking", "Gerencia de Marketing"] },
          { title: "Certificaciones", items: ["Google Ads Certification", "Meta Blueprint", "HubSpot Inbound Marketing", "Google Analytics IQ"] },
        ],
      },
    ],
  },
  arquitectura: {
    color: C.arquitectura,
    stages: [
      {
        id: "a1", label: "Pregrado", description: "Arquitectura y Urbanismo", duration: "5 años", icon: "📖",
        details: [
          { title: "Materias clave", items: ["Diseño Arquitectónico", "Estructuras y Resistencia", "Urbanismo y Planificación", "Historia de la Arquitectura"] },
          { title: "Desarrolla", items: ["Visión espacial y 3D", "Creatividad y composición", "Modelado físico (maquetas)", "Software: AutoCAD, SketchUp"] },
        ],
      },
      {
        id: "a2", label: "Taller", description: "Diseño arquitectónico y maquetación", duration: "Continuo", icon: "📐",
        details: [
          { title: "Practica", items: ["Diseña viviendas pequeñas", "Remodelación de espacios", "Maquetas físicas y digitales", "Presentación ante jurado"] },
          { title: "Software", items: ["AutoCAD (planos)", "SketchUp (modelado 3D)", "Revit (BIM)", "Lumion / V-Ray (render)"] },
        ],
      },
      {
        id: "a3", label: "Software", description: "AutoCAD, Revit, SketchUp, Lumion", duration: "6 meses", icon: "💻",
        details: [
          { title: "Domina", items: ["AutoCAD 2D y 3D", "Revit (Building Information Modeling)", "SketchUp + V-Ray", "Lumion para renders fotorrealistas"] },
          { title: "Extra", items: ["Photoshop para postproducción", "Illustrator para planos", "Enscape (render en tiempo real)", "Rhino + Grasshopper (paramétrico)"] },
        ],
      },
      {
        id: "a4", label: "Prácticas", description: "En estudios de arquitectura o constructoras", duration: "1-2 años", icon: "🏗️",
        details: [
          { title: "Experiencia", items: ["Estudio de arquitectura (diseño)", "Constructora (obra)", "Municipalidad (permisos y urbanismo)", "Oficina de diseño de interiores"] },
          { title: "Aprende", items: ["Gestión de proyectos reales", "Presupuestos y planificación", "Relación con clientes", "Normativas de construcción"] },
        ],
      },
      {
        id: "a5", label: "Especialización", description: "Sostenible, interiorismo, urbanismo", duration: "1+ años", icon: "🎯",
        details: [
          { title: "Campos", items: ["Arquitectura Sustentable (LEED)", "Diseño de Interiores", "Urbanismo y Planificación", "Paisajismo"] },
          { title: "Certificaciones", items: ["LEED Accredited Professional", "Maestría en Arquitectura Sustentable", "Certificación en BIM", "Diplomado en Urbanismo"] },
        ],
      },
    ],
  },
  "diseno-ux": {
    color: C["diseno-ux"],
    stages: [
      {
        id: "d1", label: "Fundamentos", description: "Teoría del color, tipografía, composición", duration: "3 meses", icon: "🎨",
        details: [
          { title: "Aprende", items: ["Teoría del color y armonías", "Tipografía y jerarquía visual", "Composición y regla de tercios", "Psicología del diseño"] },
          { title: "Recursos", items: ["Google Fonts", "Coolors.co (paletas)", "Libro: Diseño Gráfico: Los fundamentos", "Canal The Futur (YouTube)"] },
        ],
      },
      {
        id: "d2", label: "Herramientas", description: "Figma, Adobe XD, Photoshop, Illustrator", duration: "3 meses", icon: "🖌️",
        details: [
          { title: "Domina", items: ["Figma (principal)", "Componentes y auto layout", "Prototipos interactivos", "Design systems básicos"] },
          { title: "Complementos", items: ["Photoshop para edición de imagen", "Illustrator para iconos vectoriales", "After Effects para motion básico"] },
        ],
      },
      {
        id: "d3", label: "UX Research", description: "Investigación de usuarios, tests de usabilidad", duration: "2 meses", icon: "🔍",
        details: [
          { title: "Métodos", items: ["Entrevistas a usuarios", "Tests de usabilidad", "Análisis de competencia", "Personas y user journeys"] },
          { title: "Herramientas", items: ["Maze (tests remotos)", "Hotjar (heatmaps)", "Google Analytics", "Optimal Workshop"] },
        ],
      },
      {
        id: "d4", label: "Portafolio", description: "Crea 5-6 proyectos reales para mostrar", duration: "3 meses", icon: "💼",
        details: [
          { title: "Proyectos", items: ["Rediseño de app existente", "App móvil desde cero", "Sitio web responsive", "Sistema de diseño personal"] },
          { title: "Presentación", items: ["Case studies detallados", "Proceso de diseño documentado", "Resultados y métricas", "Behance o portfolio web"] },
        ],
      },
      {
        id: "d5", label: "Especialización", description: "UI, UX, Motion Design o Product Design", duration: "2+ meses", icon: "🎯",
        details: [
          { title: "Campos", items: ["UI Design (interfaces visuales)", "UX Design (investigación y flujo)", "Motion Design (animaciones)", "Product Design (visión de negocio)"] },
          { title: "Certificaciones", items: ["Google UX Design Certificate", "Nielsen Norman Group", "Interaction Design Foundation"] },
        ],
      },
    ],
  },
  gastronomia: {
    color: C.gastronomia,
    stages: [
      {
        id: "g1", label: "Fundamentos", description: "Técnicas básicas de cocina", duration: "6 meses", icon: "📖",
        details: [
          { title: "Aprende", items: ["Técnicas de corte y cocción", "Higiene y seguridad alimentaria", "Manejo de cuchillos", "Cocina peruana básica"] },
          { title: "Recursos", items: ["Escuela de cocina (I+D, Le Cordon Bleu)", "Canales de YouTube culinarios", "Libro: La Cocina Peruana de Gastón Acurio"] },
        ],
      },
      {
        id: "g2", label: "Técnicas", description: "Cocina nacional e internacional", duration: "1 año", icon: "🍳",
        details: [
          { title: "Materias", items: ["Cocina Peruana Avanzada", "Cocina Internacional", "Panadería y Pastelería", "Maridaje y Bebidas"] },
          { title: "Desarrolla", items: ["Técnica culinaria precisa", "Creatividad en la cocina", "Trabajo bajo presión", "Trabajo en brigada"] },
        ],
      },
      {
        id: "g3", label: "Gestión", description: "Administración de cocina y restaurante", duration: "1 año", icon: "📊",
        details: [
          { title: "Materias", items: ["Gestión de Restaurantes", "Costos y Presupuestos", "Gestión de Proveedores", "Diseño de Menús"] },
          { title: "Prácticas", items: ["Rotación por estaciones de cocina", "Atención al comensal", "Cocina bajo presión en servicio real", "Gestión de inventarios"] },
        ],
      },
      {
        id: "g4", label: "Prácticas", description: "En restaurantes, hoteles o emprendimiento", duration: "1 año", icon: "🏢",
        details: [
          { title: "Experiencia", items: ["Prácticas en restaurante profesional", "Cocina de hotel", "Eventos gastronómicos", "Pasos por diferentes estaciones"] },
          { title: "Preparación", items: ["Portafolio fotográfico de platos", "CV y carta de presentación", "Red de contactos del rubro", "Degustaciones abiertas"] },
        ],
      },
      {
        id: "g5", label: "Especialización", description: "Pastelería, cocina molecular o emprendimiento", duration: "∞", icon: "🎯",
        details: [
          { title: "Campos", items: ["Pastelería y Repostería", "Cocina Molecular", "Nutrición y Dietética", "Emprendimiento gastronómico", "Docencia"] },
          { title: "Ingreso", items: ["S/. 2,500 – 8,000+ mensuales", "Chef ejecutivo: S/. 5,000+", "Restaurante propio: variable"] },
        ],
      },
    ],
  },
  "ciencia-computacion": {
    color: C["ciencia-computacion"],
    stages: [
      {
        id: "cc1", label: "Fundamentos", description: "Matemáticas, algoritmos y programación", duration: "1 año", icon: "📐",
        details: [
          { title: "Materias clave", items: ["Matemática Discreta", "Cálculo y Álgebra Lineal", "Programación I y II", "Estructuras de Datos", "Arquitectura de Computadoras"] },
          { title: "Desarrolla", items: ["Pensamiento computacional", "Abstracción matemática", "Resolución de problemas", "Programación en C/Python"] },
        ],
      },
      {
        id: "cc2", label: "Núcleo", description: "Algoritmos avanzados, sistemas y teoría", duration: "2 años", icon: "💻",
        details: [
          { title: "Materias clave", items: ["Algoritmos Avanzados", "Sistemas Operativos", "Bases de Datos", "Redes de Computadoras", "Teoría de la Computación"] },
          { title: "Proyectos", items: ["Implementación de algoritmos", "Sistema operativo mínimo", "Motor de base de datos simple", "Compilador básico"] },
        ],
      },
      {
        id: "cc3", label: "Avanzado", description: "IA, machine learning, computación gráfica", duration: "1 año", icon: "🤖",
        details: [
          { title: "Materias clave", items: ["Inteligencia Artificial", "Machine Learning", "Computación Gráfica", "Seguridad Informática", "Seminario de Investigación"] },
          { title: "Áreas", items: ["Visión Computacional", "Procesamiento de Lenguaje Natural", "Robótica", "Computación Cuántica"] },
        ],
      },
      {
        id: "cc4", label: "Investigación", description: "Tesis o proyecto final", duration: "6-12 meses", icon: "🔬",
        details: [
          { title: "Opciones", items: ["Tesis de investigación", "Proyecto de desarrollo avanzado", "Publicación en conferencia", "Participación en concurso de programación"] },
          { title: "Preparación", items: ["Revisión de literatura", "Experimentación y resultados", "Escritura académica", "Defensa ante jurado"] },
        ],
      },
      {
        id: "cc5", label: "Ejercicio", description: "Industria tech o academia", duration: "∞", icon: "🚀",
        details: [
          { title: "Opciones", items: ["Big Tech (Google, Meta, Amazon)", "Startup tecnológica", "Investigación (PhD)", "Docencia universitaria", "Freelance / Consultoría"] },
          { title: "Ingreso", items: ["S/. 5,000 – 20,000+ mensuales", "FAANG: $100,000+ anual", "Startup: equity + salario"] },
        ],
      },
    ],
  },
};

// ── Build final roadmapData Record ────────────────────────────────────────────

export const roadmapData: Record<string, CareerRoadmap> = {};

// Add manually crafted
for (const [id, tmpl] of Object.entries(manual)) {
  roadmapData[id] = genRoadmap(id, tmpl.stages, tmpl.color);
}

// Add template-based for remaining
for (const [id, tmplName] of Object.entries(careerToTemplate)) {
  if (!roadmapData[id]) {
    const stages = templateMap[tmplName];
    const color = (C as any)[id] ?? "#999";
    roadmapData[id] = genRoadmap(id, stages, color);
  }
}
