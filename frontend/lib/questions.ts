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
    skills: [
      "Lógica",
      "Resolución de problemas",
      "Trabajo en equipo",
      "Aprendizaje continuo",
    ],
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
    skills: [
      "Creatividad",
      "Empatía con usuario",
      "Herramientas digitales",
      "Comunicación visual",
    ],
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
    skills: [
      "Visión espacial",
      "Creatividad",
      "Precisión técnica",
      "Gestión de proyectos",
    ],
  },
  finanzas: {
    title: "Finanzas & Economía",
    area: "Negocios",
    desc: "Piensas en números y estrategia. Tienes habilidad para analizar mercados y tomar decisiones.",
    match: 90,
    color: "#378ADD",
    emoji: "📊",
    salary: "S/. 4,000 – 12,000",
    skills: [
      "Análisis cuantitativo",
      "Pensamiento estratégico",
      "Atención al detalle",
      "Visión global",
    ],
  },
};

// Mezcla aleatoria de opciones
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const LETTERS = ["A", "B", "C", "D"];

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

// Preguntas con opciones sin asignar letra todavía
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
    question: "Cuando tienes un problema difícil, ¿qué haces primero?",
    options: [
      {
        career: "software",
        icon: "📊",
        text: "Busco patrones y analizo datos",
      },
      {
        career: "psicologia",
        icon: "👂",
        text: "Escucho a todos los involucrados",
      },
      { career: "diseno", icon: "✏️", text: "Dibujo o visualizo la solución" },
      {
        career: "derecho",
        icon: "📋",
        text: "Reviso antecedentes y busco precedentes",
      },
    ],
  },
  {
    id: 2,
    category: "Habilidades",
    emoji: "⚡",
    question: "¿En qué actividad pierdes la noción del tiempo?",
    options: [
      {
        career: "software",
        icon: "💻",
        text: "Programando o resolviendo bugs",
      },
      { career: "diseno", icon: "🎨", text: "Diseñando o ilustrando algo" },
      {
        career: "arquitectura",
        icon: "📐",
        text: "Dibujando planos o maquetas",
      },
      { career: "finanzas", icon: "📈", text: "Analizando números o gráficos" },
    ],
  },
  {
    id: 3,
    category: "Entorno",
    emoji: "🌍",
    question: "¿Dónde te imaginas trabajando en el día a día?",
    options: [
      { career: "medicina", icon: "🏥", text: "En un hospital con pacientes" },
      {
        career: "marketing",
        icon: "🎯",
        text: "En una agencia creativa o startup",
      },
      {
        career: "arquitectura",
        icon: "🏗️",
        text: "Entre planos, obras y espacios",
      },
      {
        career: "finanzas",
        icon: "🏦",
        text: "En una empresa o banco analizando mercados",
      },
    ],
  },
  {
    id: 4,
    category: "Valores",
    emoji: "🎯",
    question: "¿Qué es lo que más te importa lograr en tu carrera?",
    options: [
      {
        career: "medicina",
        icon: "❤️",
        text: "Mejorar la vida de las personas directamente",
      },
      { career: "derecho", icon: "🛡️", text: "Que se haga justicia" },
      {
        career: "software",
        icon: "🌐",
        text: "Construir algo que use mucha gente",
      },
      {
        career: "psicologia",
        icon: "🌱",
        text: "Acompañar el crecimiento de otros",
      },
    ],
  },
  {
    id: 5,
    category: "Situación",
    emoji: "🚨",
    question: "En un proyecto grupal bajo presión, ¿qué haces?",
    options: [
      {
        career: "software",
        icon: "⚙️",
        text: "Me enfoco en resolver el problema técnico",
      },
      {
        career: "psicologia",
        icon: "🤝",
        text: "Me preocupo por cómo está el equipo",
      },
      {
        career: "marketing",
        icon: "📢",
        text: "Comunico y mantengo el orden del grupo",
      },
      {
        career: "derecho",
        icon: "📑",
        text: "Organizo las tareas y responsabilidades",
      },
    ],
  },
  {
    id: 6,
    category: "Afinidad",
    emoji: "📚",
    question: "¿Qué tipo de contenido consumes cuando tienes tiempo libre?",
    options: [
      {
        career: "software",
        icon: "🔧",
        text: "Tutoriales tech o documentales de ciencia",
      },
      {
        career: "psicologia",
        icon: "🧠",
        text: "Podcasts sobre conducta humana o filosofía",
      },
      {
        career: "marketing",
        icon: "📱",
        text: "Tendencias, redes sociales y marcas",
      },
      {
        career: "arquitectura",
        icon: "🖼️",
        text: "Arte, arquitectura y diseño de interiores",
      },
    ],
  },
  {
    id: 7,
    category: "Tecnología",
    emoji: "🤖",
    question: "¿Cómo te ves usando la tecnología en tu trabajo?",
    options: [
      {
        career: "software",
        icon: "🛠️",
        text: "Creándola y programándola yo mismo",
      },
      {
        career: "medicina",
        icon: "🔬",
        text: "Para diagnósticos más precisos",
      },
      {
        career: "finanzas",
        icon: "📉",
        text: "Para predecir mercados y reducir riesgos",
      },
      {
        career: "diseno",
        icon: "🖌️",
        text: "Para crear interfaces y experiencias",
      },
    ],
  },
  {
    id: 8,
    category: "Futuro",
    emoji: "🚀",
    question: "¿Cómo te imaginas en 10 años?",
    options: [
      { career: "software", icon: "💡", text: "Lanzando mi propia startup" },
      {
        career: "medicina",
        icon: "🏆",
        text: "Como especialista médico reconocido",
      },
      {
        career: "arquitectura",
        icon: "🌆",
        text: "Diseñando proyectos de gran escala",
      },
      {
        career: "marketing",
        icon: "🌍",
        text: "Dirigiendo una agencia o marca global",
      },
    ],
  },
  {
    id: 9,
    category: "Impacto",
    emoji: "🌱",
    question: "¿Qué quieres que digan de ti cuando te retires?",
    options: [
      {
        career: "medicina",
        icon: "💚",
        text: "Que ayudó a salvar muchas vidas",
      },
      {
        career: "derecho",
        icon: "⚖️",
        text: "Que defendió a quienes más lo necesitaban",
      },
      {
        career: "psicologia",
        icon: "🌟",
        text: "Que cambió la vida de sus pacientes",
      },
      {
        career: "finanzas",
        icon: "📊",
        text: "Que construyó negocios sólidos y duraderos",
      },
    ],
  },
  {
    id: 10,
    category: "Decisión final",
    emoji: "🎓",
    question: "Si pudieras estudiar solo una cosa, ¿qué elegirías?",
    options: [
      {
        career: "software",
        icon: "🤖",
        text: "Inteligencia Artificial y programación",
      },
      { career: "diseno", icon: "📱", text: "Diseño de productos digitales" },
      { career: "derecho", icon: "🏛️", text: "Derecho penal o internacional" },
      {
        career: "arquitectura",
        icon: "🏠",
        text: "Diseño de espacios y urbanismo",
      },
    ],
  },
];

// Exportamos las preguntas ya con opciones mezcladas
export const questions: Question[] = RAW.map((q) => ({
  ...q,
  options: buildOptions(q.options),
}));
