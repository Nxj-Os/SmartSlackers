export type Option = {
  id: string;
  text: string;
  icon: string;
  career: string;
  color: string;
};

export type Question = {
  id: number;
  category: string;
  emoji: string;
  question: string;
  options: Option[];
};

export const careerResults: Record<
  string,
  {
    title: string;
    area: string;
    desc: string;
    match: number;
    color: string;
    emoji: string;
    salary: string;
    skills: string[];
  }
> = {
  software: {
    title: "Ingeniería de Software",
    area: "Tecnología",
    desc: "Tienes mente analítica y te apasiona construir soluciones digitales. Eres el perfil clave de la economía moderna.",
    match: 94,
    color: "#534AB7",
    emoji: "💻",
    salary: "S/. 4,000 – 12,000",
    skills: ["Lógica", "Resolución de problemas", "Trabajo en equipo", "Aprendizaje continuo"],
  },
  ingenieria: {
    title: "Ingeniería de Sistemas",
    area: "Tecnología & Sistemas",
    desc: "Diseñas y gestionas infraestructura tecnológica. Tu perfil combina visión técnica con capacidad de optimización.",
    match: 93,
    color: "#2E7D32",
    emoji: "🖥️",
    salary: "S/. 3,500 – 10,000",
    skills: ["Redes", "Bases de datos", "Seguridad informática", "Gestión de proyectos TI"],
  },
  medicina: {
    title: "Medicina Humana",
    area: "Salud",
    desc: "Tu vocación es cuidar personas. Tienes empatía profunda y resistencia bajo presión.",
    match: 92,
    color: "#1D9E75",
    emoji: "🩺",
    salary: "S/. 5,000 – 15,000",
    skills: ["Empatía", "Precisión", "Toma de decisiones", "Resistencia"],
  },
  diseno: {
    title: "Diseño UX/UI",
    area: "Creatividad & Tecnología",
    desc: "Piensas visualmente. Te obsesiona que las cosas sean bonitas y funcionales al mismo tiempo.",
    match: 89,
    color: "#D4537E",
    emoji: "🎨",
    salary: "S/. 3,000 – 8,000",
    skills: ["Creatividad", "Empatía con usuario", "Herramientas digitales", "Comunicación visual"],
  },
  derecho: {
    title: "Derecho",
    area: "Jurídico",
    desc: "Eres argumentativo y apasionado por la justicia. Tu perfil encaja con el mundo legal.",
    match: 88,
    color: "#BA7517",
    emoji: "⚖️",
    salary: "S/. 3,500 – 10,000",
    skills: ["Argumentación", "Lectura crítica", "Negociación", "Ética"],
  },
  psicologia: {
    title: "Psicología",
    area: "Salud Mental",
    desc: "Entiendes a las personas con facilidad. Te apasiona el comportamiento humano y acompañar a otros.",
    match: 91,
    color: "#7A5A9A",
    emoji: "🧠",
    salary: "S/. 2,500 – 7,000",
    skills: ["Escucha activa", "Empatía", "Observación", "Paciencia"],
  },
  marketing: {
    title: "Marketing & Comunicación",
    area: "Negocios & Creatividad",
    desc: "Combinas creatividad con estrategia. Sabes conectar ideas con personas y generar impacto.",
    match: 87,
    color: "#D85A30",
    emoji: "📣",
    salary: "S/. 2,800 – 8,000",
    skills: ["Creatividad", "Análisis", "Comunicación", "Tendencias digitales"],
  },
  arquitectura: {
    title: "Arquitectura",
    area: "Diseño & Construcción",
    desc: "Combinas arte con ingeniería. Te apasiona crear espacios que mejoran la vida de las personas.",
    match: 86,
    color: "#5A7A5A",
    emoji: "🏛️",
    salary: "S/. 3,000 – 9,000",
    skills: ["Visión espacial", "Creatividad", "Precisión técnica", "Gestión de proyectos"],
  },
  matematicas: {
    title: "Matemáticas / Ciencia de Datos",
    area: "Ciencias Exactas",
    desc: "Tu cerebro procesa abstracciones con naturalidad. Disfrutas resolver problemas con lógica y precisión.",
    match: 90,
    color: "#5C3AB7",
    emoji: "∑",
    salary: "S/. 4,000 – 11,000",
    skills: ["Análisis", "Abstracción", "Pensamiento lógico", "Modelado"],
  },
  administracion: {
    title: "Administración de Empresas",
    area: "Negocios & Gestión",
    desc: "Lideras con naturalidad. Sabes organizar personas y recursos para alcanzar metas.",
    match: 88,
    color: "#1565C0",
    emoji: "💼",
    salary: "S/. 3,000 – 10,000",
    skills: ["Liderazgo", "Planificación", "Comunicación", "Toma de decisiones"],
  },
  gastronomia: {
    title: "Gastronomía",
    area: "Artes Culinarias",
    desc: "Eres creativo con los sentidos. Transformas ingredientes en experiencias memorables.",
    match: 85,
    color: "#D85A30",
    emoji: "🍳",
    salary: "S/. 2,500 – 8,000",
    skills: ["Creatividad", "Técnica culinaria", "Gestión de cocina", "Innovación"],
  },
  musica: {
    title: "Música & Producción Musical",
    area: "Artes",
    desc: "Expresas emociones a través del sonido. Tienes sensibilidad artística y disciplina creativa.",
    match: 84,
    color: "#C2185B",
    emoji: "🎵",
    salary: "S/. 2,000 – 7,000",
    skills: ["Oído musical", "Creatividad", "Disciplina", "Interpretación"],
  },
  astronauta: {
    title: "Astronáutica & Aeroespacial",
    area: "Ciencias & Exploración",
    desc: "Tu curiosidad no tiene límites. Quieres entender el universo y ser parte de la exploración espacial.",
    match: 88,
    color: "#1565C0",
    emoji: "🚀",
    salary: "S/. 6,000 – 20,000",
    skills: ["Física", "Matemáticas avanzadas", "Resistencia", "Trabajo en equipo"],
  },
  literatura: {
    title: "Literatura & Comunicación",
    area: "Humanidades",
    desc: "Tienes un don para las palabras. Piensas narrativamente y conectas ideas con humanidad.",
    match: 83,
    color: "#795548",
    emoji: "✍️",
    salary: "S/. 2,000 – 6,000",
    skills: ["Redacción", "Análisis crítico", "Creatividad narrativa", "Comunicación"],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function buildOptions(
  raw: { career: string; icon: string; text: string }[],
): Option[] {
  return shuffle(raw).map((o, i) => ({
    id: LETTERS[i],
    text: o.text,
    icon: o.icon,
    career: o.career,
    color: careerResults[o.career]?.color ?? "#999",
  }));
}

// ── Preguntas (10 × 6 opciones = 60 slots, distribución balanceada) ──────────
// Distribución por carrera: software×5 | medicina×5 | ingenieria×5 |
// derecho×5 | resto×4 cada uno
const RAW: {
  id: number;
  category: string;
  emoji: string;
  question: string;
  options: { career: string; icon: string; text: string }[];
}[] = [
  {
    id: 1,
    category: "Personalidad",
    emoji: "🧩",
    question: "Cuando enfrentas un problema complejo, ¿cuál es tu primer instinto?",
    options: [
      { career: "software",     icon: "🔍", text: "Busco patrones y pienso en cómo automatizarlo" },
      { career: "medicina",     icon: "🔬", text: "Observo síntomas y descarto causas una por una" },
      { career: "psicologia",   icon: "👂", text: "Entiendo cómo afecta emocionalmente a cada persona" },
      { career: "derecho",      icon: "📋", text: "Investigo precedentes y busco el marco normativo" },
      { career: "matematicas",  icon: "∑",  text: "Descompongo el problema en partes pequeñas y precisas" },
      { career: "ingenieria",   icon: "⚙️", text: "Diseño un sistema o proceso estructurado para resolverlo" },
    ],
  },
  {
    id: 2,
    category: "Afinidad",
    emoji: "⚡",
    question: "¿En qué actividad pierdes la noción del tiempo?",
    options: [
      { career: "diseno",       icon: "🖌️", text: "Diseñando, editando o creando elementos visuales" },
      { career: "musica",       icon: "🎸", text: "Tocando un instrumento o produciendo música" },
      { career: "arquitectura", icon: "📐", text: "Dibujando planos o construyendo maquetas" },
      { career: "literatura",   icon: "📖", text: "Leyendo o escribiendo historias y ensayos" },
      { career: "gastronomia",  icon: "🍳", text: "Cocinando y experimentando con nuevas recetas" },
      { career: "astronauta",   icon: "🌌", text: "Aprendiendo sobre el universo, física o astronomía" },
    ],
  },
  {
    id: 3,
    category: "Entorno",
    emoji: "🌍",
    question: "¿Dónde te imaginas trabajando en el día a día?",
    options: [
      { career: "medicina",      icon: "🏥", text: "En un hospital o clínica atendiendo pacientes" },
      { career: "marketing",     icon: "🎯", text: "En una agencia creativa o startup innovadora" },
      { career: "administracion",icon: "🏢", text: "En una empresa liderando equipos y estrategias" },
      { career: "diseno",        icon: "💡", text: "En un estudio de diseño o agencia digital" },
      { career: "gastronomia",   icon: "👨‍🍳",text: "En una cocina o con mi propio restaurante" },
      { career: "astronauta",    icon: "🛸", text: "En un centro de investigación o laboratorio espacial" },
    ],
  },
  {
    id: 4,
    category: "Valores",
    emoji: "🎯",
    question: "¿Qué es lo más importante para ti en tu vida profesional?",
    options: [
      { career: "derecho",       icon: "⚖️", text: "Defender derechos y que se haga justicia" },
      { career: "psicologia",    icon: "🌱", text: "Acompañar el crecimiento personal de otros" },
      { career: "matematicas",   icon: "🧮", text: "Resolver problemas que nadie más puede resolver" },
      { career: "administracion",icon: "📈", text: "Construir organizaciones exitosas y sostenibles" },
      { career: "musica",        icon: "🎵", text: "Crear arte que emocione y conecte a las personas" },
      { career: "literatura",    icon: "✍️", text: "Contar historias que cambien la forma de ver el mundo" },
    ],
  },
  {
    id: 5,
    category: "Situación",
    emoji: "🚨",
    question: "En un proyecto grupal bajo presión, ¿qué rol adoptas naturalmente?",
    options: [
      { career: "software",      icon: "💻", text: "Me encargo de la parte técnica y la solución concreta" },
      { career: "psicologia",    icon: "🤝", text: "Me aseguro de que el equipo esté bien anímicamente" },
      { career: "marketing",     icon: "📢", text: "Motivo al grupo y comunico el avance hacia afuera" },
      { career: "derecho",       icon: "📑", text: "Organizo tiempos, responsabilidades y acuerdos" },
      { career: "ingenieria",    icon: "🔧", text: "Diseño el proceso más eficiente para entregar a tiempo" },
      { career: "administracion",icon: "🗂️", text: "Coordino los recursos disponibles y tomo decisiones" },
    ],
  },
  {
    id: 6,
    category: "Intereses",
    emoji: "📚",
    question: "¿Qué tipo de contenido consumes cuando tienes tiempo libre?",
    options: [
      { career: "musica",        icon: "🎧", text: "Música, conciertos o tutoriales de producción musical" },
      { career: "literatura",    icon: "📚", text: "Libros, novelas, ensayos o blogs literarios" },
      { career: "arquitectura",  icon: "🏛️", text: "Arte, arquitectura y diseño de interiores" },
      { career: "astronauta",    icon: "🔭", text: "Documentales del espacio y ciencia ficción" },
      { career: "marketing",     icon: "📱", text: "Tendencias, campañas virales y marcas globales" },
      { career: "diseno",        icon: "🎨", text: "Diseño de productos, tipografía y experiencia UX" },
    ],
  },
  {
    id: 7,
    category: "Tecnología",
    emoji: "🤖",
    question: "¿Cómo te ves relacionándote con la tecnología en tu trabajo?",
    options: [
      { career: "software",      icon: "🛠️", text: "Creándola y programándola desde cero" },
      { career: "medicina",      icon: "🔬", text: "Usándola para diagnósticos y tratamientos más precisos" },
      { career: "ingenieria",    icon: "🖥️", text: "Administrando sistemas, redes y bases de datos" },
      { career: "matematicas",   icon: "📊", text: "Modelando fenómenos y predicciones con algoritmos" },
      { career: "arquitectura",  icon: "📐", text: "Usando software BIM y herramientas de diseño 3D" },
      { career: "gastronomia",   icon: "🍽️", text: "Aplicando técnicas modernas y maquinaria en cocina" },
    ],
  },
  {
    id: 8,
    category: "Futuro",
    emoji: "🚀",
    question: "¿Cómo te imaginas en 10 años?",
    options: [
      { career: "software",      icon: "💡", text: "Lanzando mi propia startup o producto tecnológico" },
      { career: "medicina",      icon: "🏆", text: "Como especialista médico reconocido" },
      { career: "arquitectura",  icon: "🌆", text: "Diseñando proyectos urbanos o edificios emblemáticos" },
      { career: "literatura",    icon: "📗", text: "Con mis propios libros publicados o dirigiendo una editorial" },
      { career: "gastronomia",   icon: "🌟", text: "Con mi propio restaurante o empresa gastronómica" },
      { career: "marketing",     icon: "🌍", text: "Liderando una agencia o estrategia de marca global" },
    ],
  },
  {
    id: 9,
    category: "Impacto",
    emoji: "🌱",
    question: "¿Qué quieres que digan de ti cuando te retires?",
    options: [
      { career: "medicina",      icon: "💚", text: "Que salvó y mejoró la vida de muchísimas personas" },
      { career: "derecho",       icon: "🛡️", text: "Que defendió a quienes más lo necesitaban" },
      { career: "psicologia",    icon: "🌟", text: "Que acompañó el bienestar emocional de muchos" },
      { career: "musica",        icon: "🎶", text: "Que su música emocionó a generaciones enteras" },
      { career: "astronauta",    icon: "🌠", text: "Que contribuyó al conocimiento del universo" },
      { career: "ingenieria",    icon: "💻", text: "Que sus sistemas transformaron cómo trabaja la gente" },
    ],
  },
  {
    id: 10,
    category: "Decisión final",
    emoji: "🎓",
    question: "Si pudieras estudiar solo una cosa el resto de tu vida, ¿qué elegirías?",
    options: [
      { career: "software",      icon: "🤖", text: "Inteligencia Artificial y desarrollo de software" },
      { career: "diseno",        icon: "📱", text: "Diseño de experiencias y productos digitales" },
      { career: "derecho",       icon: "🏛️", text: "Derecho penal, civil o internacional" },
      { career: "administracion",icon: "📊", text: "Gestión empresarial y liderazgo organizacional" },
      { career: "matematicas",   icon: "🔢", text: "Matemáticas, estadística o ciencia de datos" },
      { career: "ingenieria",    icon: "🔒", text: "Sistemas de información, redes y ciberseguridad" },
    ],
  },
];

export const questions: Question[] = RAW.map((q) => ({
  ...q,
  options: buildOptions(q.options),
}));
