export type Option = {
  id: string;
  text: string;
  icon: string;
  career: string;
  color: string;
};

export type Question = {
  id: number;
  categoryId: number;
  category: string;
  emoji: string;
  question: string;
  options: Option[];
};

export const careerResults: Record<
  string,
  { title: string; area: string; desc: string; match: number; color: string; emoji: string; salary: string; skills: string[] }
> = {
  software: {
    title: "Ingeniería de Software",
    area: "Tecnología",
    desc: "Tienes mente analítica y te apasiona construir soluciones digitales. Eres el perfil clave de la economía moderna.",
    match: 94, color: "#534AB7", emoji: "💻", salary: "S/. 4,000 – 12,000",
    skills: ["Lógica", "Resolución de problemas", "Trabajo en equipo", "Aprendizaje continuo"],
  },
  medicina: {
    title: "Medicina Humana",
    area: "Salud",
    desc: "Tu vocación es cuidar personas. Tienes empatía profunda y resistencia bajo presión.",
    match: 92, color: "#1D9E75", emoji: "🩺", salary: "S/. 5,000 – 15,000",
    skills: ["Empatía", "Precisión", "Toma de decisiones", "Resistencia"],
  },
  derecho: {
    title: "Derecho",
    area: "Jurídico",
    desc: "Eres argumentativo y apasionado por la justicia. Tu perfil encaja con el mundo legal.",
    match: 88, color: "#BA7517", emoji: "⚖️", salary: "S/. 3,500 – 10,000",
    skills: ["Argumentación", "Lectura crítica", "Negociación", "Ética"],
  },
  psicologia: {
    title: "Psicología",
    area: "Salud Mental",
    desc: "Entiendes a las personas con facilidad. Te apasiona el comportamiento humano y acompañar a otros.",
    match: 91, color: "#7A5A9A", emoji: "🧠", salary: "S/. 2,500 – 7,000",
    skills: ["Escucha activa", "Empatía", "Observación", "Paciencia"],
  },
  marketing: {
    title: "Marketing & Comunicación",
    area: "Negocios & Creatividad",
    desc: "Combinas creatividad con estrategia. Sabes conectar ideas con personas y generar impacto.",
    match: 87, color: "#D85A30", emoji: "📣", salary: "S/. 2,800 – 8,000",
    skills: ["Creatividad", "Análisis", "Comunicación", "Tendencias digitales"],
  },
  administracion: {
    title: "Administración",
    area: "Negocios & Gestión",
    desc: "Lideras con naturalidad. Sabes organizar personas y recursos para alcanzar metas.",
    match: 88, color: "#1565C0", emoji: "💼", salary: "S/. 3,000 – 10,000",
    skills: ["Liderazgo", "Planificación", "Comunicación", "Toma de decisiones"],
  },
  arquitectura: {
    title: "Arquitectura y Urbanismo Ambiental",
    area: "Diseño & Construcción",
    desc: "Combinas arte con ingeniería. Te apasiona crear espacios que mejoran la vida de las personas.",
    match: 86, color: "#5A7A5A", emoji: "🏛️", salary: "S/. 3,000 – 9,000",
    skills: ["Visión espacial", "Creatividad", "Precisión técnica", "Gestión de proyectos"],
  },
  gastronomia: {
    title: "Gastronomía",
    area: "Artes Culinarias",
    desc: "Eres creativo con los sentidos. Transformas ingredientes en experiencias memorables.",
    match: 85, color: "#D85A30", emoji: "🍳", salary: "S/. 2,500 – 8,000",
    skills: ["Creatividad", "Técnica culinaria", "Gestión de cocina", "Innovación"],
  },
  "diseno-ux": {
    title: "Diseño UX/UI",
    area: "Creatividad & Tecnología",
    desc: "Piensas visualmente. Te obsesiona que las cosas sean bonitas y funcionales al mismo tiempo.",
    match: 88, color: "#D4537E", emoji: "🎨", salary: "S/. 3,000 – 8,000",
    skills: ["Creatividad", "Empatía con usuario", "Herramientas digitales", "Comunicación visual"],
  },
  enfermeria: {
    title: "Enfermería",
    area: "Salud",
    desc: "Tu vocación de servicio es genuina. Acompañas y cuidas a otros con calidez y compromiso.",
    match: 83, color: "#4A90D9", emoji: "🩺", salary: "S/. 2,500 – 6,000",
    skills: ["Empatía", "Trabajo en equipo", "Resistencia física", "Compromiso"],
  },
  contabilidad: {
    title: "Contabilidad",
    area: "Negocios & Finanzas",
    desc: "Tienes ojo para los números y el orden. Tu precisión mantiene el equilibrio financiero.",
    match: 78, color: "#2E7D32", emoji: "📊", salary: "S/. 2,500 – 7,000",
    skills: ["Precisión", "Análisis numérico", "Organización", "Integridad"],
  },
  "ingenieria-civil": {
    title: "Ingeniería Civil",
    area: "Construcción & Diseño",
    desc: "Te apasiona construir el mundo físico que nos rodea con solidez y creatividad.",
    match: 86, color: "#F57C00", emoji: "🏗️", salary: "S/. 3,500 – 10,000",
    skills: ["Cálculo", "Diseño estructural", "Gestión de proyectos", "Trabajo en campo"],
  },
  "ingenieria-industrial": {
    title: "Ingeniería Industrial",
    area: "Industrial",
    desc: "Optimizas procesos y sistemas. Tu mente encuentra eficiencia donde otros ven caos.",
    match: 85, color: "#6A1B9A", emoji: "⚙️", salary: "S/. 3,000 – 9,000",
    skills: ["Optimización", "Análisis de procesos", "Logística", "Mejora continua"],
  },
  economia: {
    title: "Economía",
    area: "Ciencias Sociales",
    desc: "Analizas cómo funcionan los mercados y las decisiones financieras a gran escala.",
    match: 80, color: "#00838F", emoji: "📈", salary: "S/. 3,000 – 9,000",
    skills: ["Análisis cuantitativo", "Razonamiento lógico", "Investigación", "Visión macro"],
  },
  periodismo: {
    title: "Periodismo",
    area: "Comunicación",
    desc: "Buscas la verdad y sabes contarla. Tienes curiosidad insaciable por lo que sucede.",
    match: 79, color: "#E65100", emoji: "📰", salary: "S/. 2,000 – 6,000",
    skills: ["Redacción", "Investigación", "Curiosidad", "Comunicación oral"],
  },
  "ingenieria-minas": {
    title: "Ingeniería de Minas",
    area: "Ingeniería",
    desc: "Extraes valor de la tierra con ciencia y responsabilidad. Te mueve el desarrollo minero sostenible.",
    match: 76, color: "#795548", emoji: "⛏️", salary: "S/. 4,000 – 12,000",
    skills: ["Geología", "Cálculo estructural", "Gestión ambiental", "Seguridad"],
  },
  odontologia: {
    title: "Odontología",
    area: "Salud",
    desc: "Tu precisión manual y vocación de servicio mejoran sonrisas y calidad de vida.",
    match: 82, color: "#00ACC1", emoji: "🦷", salary: "S/. 3,000 – 8,000",
    skills: ["Precisión manual", "Empatía", "Atención al detalle", "Resistencia"],
  },
  "ingenieria-ambiental": {
    title: "Ingeniería Ambiental",
    area: "Ambiental",
    desc: "Te importa el planeta. Buscas soluciones sostenibles para los desafíos ecológicos.",
    match: 84, color: "#43A047", emoji: "🌿", salary: "S/. 3,000 – 8,000",
    skills: ["Conciencia ecológica", "Análisis científico", "Resolución de problemas", "Trabajo de campo"],
  },
  educacion: {
    title: "Educación",
    area: "Ciencias Sociales",
    desc: "Tienes paciencia y pasión por enseñar. Formar mentes es tu mayor motivación.",
    match: 81, color: "#FDD835", emoji: "📚", salary: "S/. 2,000 – 5,000",
    skills: ["Paciencia", "Comunicación", "Empatía", "Creatividad pedagógica"],
  },
  nutricion: {
    title: "Nutrición",
    area: "Salud",
    desc: "Entiendes que la salud empieza en el plato. Educas y guías hacia hábitos saludables.",
    match: 79, color: "#8BC34A", emoji: "🥗", salary: "S/. 2,500 – 6,000",
    skills: ["Conocimiento científico", "Empatía", "Comunicación", "Creatividad"],
  },
  turismo: {
    title: "Turismo",
    area: "Servicios",
    desc: "Conectas personas con culturas y destinos. Tu energía contagia entusiasmo por viajar.",
    match: 77, color: "#FF7043", emoji: "✈️", salary: "S/. 2,000 – 6,000",
    skills: ["Comunicación", "Organización", "Idiomas", "Atención al cliente"],
  },
  "relaciones-internacionales": {
    title: "Relaciones Internacionales",
    area: "Ciencias Sociales",
    desc: "Entiendes la geopolítica y el diálogo entre naciones. Tu perfil es global y diplomático.",
    match: 83, color: "#3949AB", emoji: "🌐", salary: "S/. 3,000 – 8,000",
    skills: ["Negociación", "Análisis político", "Idiomas", "Visión global"],
  },
  veterinaria: {
    title: "Veterinaria",
    area: "Salud",
    desc: "Amas a los animales. Tu sensibilidad y ciencia cuidan de quienes no pueden hablar.",
    match: 80, color: "#66BB6A", emoji: "🐾", salary: "S/. 2,500 – 7,000",
    skills: ["Empatía animal", "Precisión", "Resistencia física", "Observación"],
  },
  "administracion-negocios-internacionales": {
    title: "Administración de Negocios Internacionales",
    area: "Negocios & Gestión",
    desc: "Piensas en global. Conectas mercados y culturas con visión estratégica de negocio.",
    match: 84, color: "#1E88E5", emoji: "🌍", salary: "S/. 3,000 – 9,000",
    skills: ["Visión estratégica", "Negociación", "Idiomas", "Liderazgo"],
  },
  "biologia-marina": {
    title: "Biología Marina",
    area: "Ciencias Naturales",
    desc: "El océano es tu laboratorio. Exploras la vida submarina con pasión científica.",
    match: 78, color: "#0077B6", emoji: "🐠", salary: "S/. 2,500 – 7,000",
    skills: ["Observación", "Investigación", "Trabajo de campo", "Paciencia"],
  },
  "ciencia-computacion": {
    title: "Ciencia de la Computación",
    area: "Tecnología",
    desc: "Tu mente piensa en algoritmos y estructuras de datos. La innovación digital te impulsa.",
    match: 89, color: "#311B92", emoji: "💾", salary: "S/. 4,000 – 12,000",
    skills: ["Pensamiento abstracto", "Algoritmos", "Resolución de problemas", "Aprendizaje continuo"],
  },
  "ciencias-comunicacion": {
    title: "Ciencias de la Comunicación",
    area: "Comunicación",
    desc: "Te apasiona contar historias y entender cómo se mueve la información en la sociedad.",
    match: 80, color: "#C62828", emoji: "📡", salary: "S/. 2,500 – 7,000",
    skills: ["Comunicación", "Creatividad", "Investigación", "Redacción"],
  },
  "comunicacion-publicidad": {
    title: "Comunicación y Publicidad",
    area: "Comunicación",
    desc: "Sabes vender ideas. Creas mensajes que conectan marcas con personas de forma genuina.",
    match: 82, color: "#E91E63", emoji: "📢", salary: "S/. 2,500 – 7,000",
    skills: ["Creatividad publicitaria", "Redacción persuasiva", "Análisis de audiencia", "Estrategia"],
  },
  "educacion-inicial": {
    title: "Educación Inicial",
    area: "Ciencias Sociales",
    desc: "Tienes vocación por los más pequeños. Guías los primeros pasos del aprendizaje.",
    match: 79, color: "#F48FB1", emoji: "🧸", salary: "S/. 2,000 – 5,000",
    skills: ["Paciencia", "Creatividad", "Empatía", "Juego pedagógico"],
  },
  "educacion-primaria": {
    title: "Educación Primaria",
    area: "Ciencias Sociales",
    desc: "Formas las bases del conocimiento. Enseñar con entusiasmo es tu superpoder.",
    match: 79, color: "#FFD54F", emoji: "📖", salary: "S/. 2,000 – 5,000",
    skills: ["Paciencia", "Didáctica", "Comunicación", "Creatividad"],
  },
  "ingenieria-biomedica": {
    title: "Ingeniería Biomédica",
    area: "Tecnología & Salud",
    desc: "Unes ingeniería y medicina para crear tecnología que salva vidas.",
    match: 86, color: "#D81B60", emoji: "🧬", salary: "S/. 3,500 – 10,000",
    skills: ["Conocimiento técnico", "Creatividad", "Precisión", "Trabajo interdisciplinario"],
  },
  "ingenieria-ciberseguridad": {
    title: "Ingeniería en Ciberseguridad",
    area: "Tecnología",
    desc: "Proteges sistemas y datos. Eres el guardián digital del mundo moderno.",
    match: 88, color: "#1B5E20", emoji: "🔒", salary: "S/. 4,000 – 12,000",
    skills: ["Pensamiento crítico", "Ética", "Resolución de problemas", "Actualización constante"],
  },
  "ingenieria-diseno-grafico": {
    title: "Ingeniería en Diseño Gráfico",
    area: "Creatividad & Tecnología",
    desc: "Comunicas visualmente con impacto. Tu creatividad tiene base técnica sólida.",
    match: 85, color: "#AD1457", emoji: "🎯", salary: "S/. 2,500 – 7,000",
    skills: ["Creatividad visual", "Herramientas digitales", "Comunicación", "Atención al detalle"],
  },
  "ingenieria-sistemas-informacion": {
    title: "Ingeniería de Sistemas de Información",
    area: "Tecnología",
    desc: "Diseñas sistemas que gestionan datos críticos. Tu lógica organiza el caos digital.",
    match: 87, color: "#283593", emoji: "🗄️", salary: "S/. 3,500 – 10,000",
    skills: ["Modelado de datos", "Arquitectura de sistemas", "Análisis", "Gestión de proyectos"],
  },
  "ingenieria-sistemas": {
    title: "Ingeniería de Sistemas",
    area: "Tecnología & Sistemas",
    desc: "Diseñas y gestionas infraestructura tecnológica. Tu perfil combina visión técnica con capacidad de optimización.",
    match: 88, color: "#2E7D32", emoji: "🖥️", salary: "S/. 3,500 – 10,000",
    skills: ["Redes", "Bases de datos", "Seguridad informática", "Gestión de proyectos TI"],
  },
  "ingenieria-transporte": {
    title: "Ingeniería de Transporte",
    area: "Ingeniería",
    desc: "Diseñas y gestionas sistemas de movilidad. Tu trabajo conecta ciudades y personas.",
    match: 76, color: "#546E7A", emoji: "🚆", salary: "S/. 3,000 – 8,000",
    skills: ["Planificación", "Análisis de tráfico", "Diseño de rutas", "Logística"],
  },
  "ingenieria-economica-negocios": {
    title: "Ingeniería Económica y de Negocios",
    area: "Negocios & Finanzas",
    desc: "Combinas números y estrategia. Tomas decisiones financieras con base ingenieril.",
    match: 82, color: "#00695C", emoji: "💰", salary: "S/. 3,500 – 10,000",
    skills: ["Análisis financiero", "Modelado", "Toma de decisiones", "Visión estratégica"],
  },
  "ingenieria-electronica": {
    title: "Ingeniería Electrónica",
    area: "Ingeniería",
    desc: "Entiendes los circuitos y señales que hacen funcionar el mundo moderno.",
    match: 84, color: "#FF6F00", emoji: "🔌", salary: "S/. 3,500 – 10,000",
    skills: ["Circuitos", "Programación embebida", "Resolución técnica", "Precisión"],
  },
  "ingenieria-empresarial": {
    title: "Ingeniería Empresarial",
    area: "Negocios & Ingeniería",
    desc: "Optimizas organizaciones enteras con pensamiento ingenieril. Eficiencia y estrategia van de la mano.",
    match: 83, color: "#4527A0", emoji: "🏭", salary: "S/. 3,000 – 9,000",
    skills: ["Gestión", "Análisis de procesos", "Liderazgo", "Innovación"],
  },
  "ingenieria-maritima": {
    title: "Ingeniería Marítima",
    area: "Ingeniería",
    desc: "Dominas el mar desde la ingeniería. Tu trabajo mantiene el comercio naval en movimiento.",
    match: 75, color: "#0277BD", emoji: "🚢", salary: "S/. 3,500 – 10,000",
    skills: ["Mecánica naval", "Logística portuaria", "Resistencia", "Trabajo en equipo"],
  },
  "ingenieria-mecanica": {
    title: "Ingeniería Mecánica",
    area: "Ingeniería",
    desc: "Entiendes fuerzas, movimientos y mecanismos. Diseñas máquinas que mueven el mundo.",
    match: 82, color: "#BF360C", emoji: "🔧", salary: "S/. 3,500 – 10,000",
    skills: ["Física aplicada", "Diseño mecánico", "Resolución de problemas", "Precisión"],
  },
  "ingenieria-mecatronica": {
    title: "Ingeniería Mecatrónica",
    area: "Ingeniería",
    desc: "Unes mecánica, electrónica y control. Creas sistemas inteligentes que transforman industrias.",
    match: 85, color: "#4E342E", emoji: "🤖", salary: "S/. 3,500 – 11,000",
    skills: ["Multidisciplinariedad", "Programación", "Diseño mecánico", "Automátización"],
  },
  "ingenieria-naval": {
    title: "Ingeniería Naval",
    area: "Ingeniería",
    desc: "Diseñas y construyes embarcaciones. Tu ingenio navega entre la tradición y la innovación.",
    match: 77, color: "#0D47A1", emoji: "⛵", salary: "S/. 3,500 – 10,000",
    skills: ["Diseño estructural", "Hidrodinámica", "Precisión", "Gestión de proyectos"],
  },
  obstetricia: {
    title: "Obstetricia",
    area: "Salud",
    desc: "Acompañas el milagro de la vida. Tu calidez y ciencia cuidan de madres y bebés.",
    match: 81, color: "#E91E63", emoji: "👶", salary: "S/. 2,500 – 6,000",
    skills: ["Empatía", "Precisión", "Resistencia", "Comunicación"],
  },
  "psicologia-consumidor": {
    title: "Psicología del Consumidor",
    area: "Negocios & Psicología",
    desc: "Entiendes por qué la gente compra lo que compra. Descifras decisiones de consumo.",
    match: 86, color: "#8E24AA", emoji: "🛒", salary: "S/. 3,000 – 8,000",
    skills: ["Análisis de comportamiento", "Investigación de mercado", "Empatía", "Pensamiento crítico"],
  },
  "redes-telecomunicaciones": {
    title: "Redes y Telecomunicaciones",
    area: "Tecnología",
    desc: "Conectas el mundo. Tu expertise mantiene la información fluyendo sin interrupción.",
    match: 80, color: "#00838F", emoji: "📶", salary: "S/. 3,000 – 9,000",
    skills: ["Redes", "Infraestructura", "Resolución técnica", "Seguridad"],
  },
  "tecnologia-medica": {
    title: "Tecnología Médica",
    area: "Salud & Tecnología",
    desc: "Operas y mantienes equipos que salvan vidas. Tu precisión técnica es vital.",
    match: 81, color: "#00BCD4", emoji: "🔬", salary: "S/. 2,500 – 7,000",
    skills: ["Precisión técnica", "Conocimiento médico", "Resolución de problemas", "Atención al detalle"],
  },
  "traduccion-interpretacion": {
    title: "Traducción e Interpretación",
    area: "Humanidades",
    desc: "Construyes puentes entre idiomas y culturas. Tu don lingüístico conecta personas.",
    match: 78, color: "#7B1FA2", emoji: "🌏", salary: "S/. 2,500 – 7,000",
    skills: ["Dominio de idiomas", "Precisión", "Comunicación", "Comprensión cultural"],
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

// ── Pool de 30 preguntas (3 por categoría × 10 categorías) ───────────────────

type RawQuestion = {
  categoryId: number;
  category: string;
  emoji: string;
  question: string;
  options: { career: string; icon: string; text: string }[];
};

const RAW_POOL: RawQuestion[] = [
  // ── CATEGORÍA 1: Personalidad / Forma de pensar ──────────────────────────
  {
    categoryId: 1, category: "Personalidad", emoji: "🧩",
    question: "Cuando enfrentas un problema complejo, ¿cuál es tu primer instinto?",
    options: [
      { career: "software",     icon: "🔍", text: "Busco el patrón oculto e imagino cómo sistematizarlo" },
      { career: "medicina",     icon: "🔬", text: "Observo todos los indicios antes de actuar" },
      { career: "psicologia",   icon: "👂", text: "Primero entiendo cómo afecta a las personas involucradas" },
      { career: "derecho",      icon: "📋", text: "Busco normas o precedentes que ya definan la situación" },
      { career: "ciencia-computacion", icon: "∑", text: "Lo descompongo en partes más pequeñas y analizo cada una" },
      { career: "ingenieria-sistemas", icon: "⚙️", text: "Diseño un proceso estructurado paso a paso para resolverlo" },
    ],
  },
  {
    categoryId: 1, category: "Personalidad", emoji: "💭",
    question: "¿Cuál de estas frases describe mejor cómo funciona tu mente?",
    options: [
      { career: "arquitectura",  icon: "📐", text: "Pienso en estructuras, formas y cómo encajan entre sí" },
      { career: "diseno-ux",     icon: "🖌️", text: "Si no lo veo visualmente, me cuesta entenderlo del todo" },
      { career: "traduccion-interpretacion", icon: "📖", text: "Pienso en significados y cómo expresar ideas de otra forma" },
      { career: "marketing",     icon: "🎯", text: "Siempre pienso en a quién va dirigido algo y por qué" },
      { career: "relaciones-internacionales", icon: "🌐", text: "Pienso en cómo lo mismo se ve distinto en diferentes culturas" },
      { career: "administracion",icon: "📊", text: "Pienso en objetivos, recursos y cuánto tiempo tenemos" },
    ],
  },
  {
    categoryId: 1, category: "Personalidad", emoji: "🔄",
    question: "Cuando algo no funciona como esperas, ¿cuál es tu reacción más natural?",
    options: [
      { career: "medicina",     icon: "🔄", text: "Reviso el proceso completo desde el principio" },
      { career: "ingenieria-electronica", icon: "🖥️", text: "Diagnostico componente por componente hasta encontrar el fallo" },
      { career: "derecho",      icon: "⚖️", text: "Verifico si hay alguna regla que no se esté cumpliendo" },
      { career: "gastronomia",  icon: "🍳", text: "Experimento con variaciones hasta dar con lo que falló" },
      { career: "ingenieria-biomedica",  icon: "🧬", text: "Recopilo datos y formulo hipótesis verificables" },
      { career: "psicologia",   icon: "🧠", text: "Reflexiono sobre qué factores humanos pudieron influir" },
    ],
  },

  // ── CATEGORÍA 2: Afinidad / Lo que disfrutas ─────────────────────────────
  {
    categoryId: 2, category: "Afinidad", emoji: "⚡",
    question: "¿En qué actividad pierdes la noción del tiempo con más facilidad?",
    options: [
      { career: "ingenieria-diseno-grafico", icon: "🎨", text: "Cuando creo algo que es bonito y funcional al mismo tiempo" },
      { career: "ciencias-comunicacion", icon: "📡", text: "Cuando analizo mensajes y su impacto en la audiencia" },
      { career: "arquitectura", icon: "📐", text: "Cuando imagino espacios y los llevo al papel o pantalla" },
      { career: "periodismo",   icon: "📚", text: "Cuando investigo y escribo una historia que importa" },
      { career: "gastronomia",  icon: "🍽️", text: "Cuando cocino y combino ingredientes hasta lograr algo especial" },
      { career: "biologia-marina", icon: "🐠", text: "Cuando exploro ecosistemas marinos y su biodiversidad" },
    ],
  },
  {
    categoryId: 2, category: "Afinidad", emoji: "🎮",
    question: "¿Cuál de estas actividades disfrutas más en tu tiempo libre?",
    options: [
      { career: "software",      icon: "💻", text: "Armar pequeños proyectos con tecnología o automatizar algo" },
      { career: "ingenieria-sistemas-informacion", icon: "🗄️", text: "Organizar información y crear estructuras lógicas" },
      { career: "psicologia",    icon: "👀", text: "Observar el comportamiento y las motivaciones de las personas" },
      { career: "derecho",       icon: "🗣️", text: "Debatir ideas o defender posturas en conversaciones" },
      { career: "marketing",     icon: "📱", text: "Analizar tendencias, campañas y por qué funcionan" },
      { career: "administracion",icon: "🗂️", text: "Organizar eventos, grupos o proyectos con otras personas" },
    ],
  },
  {
    categoryId: 2, category: "Afinidad", emoji: "🌀",
    question: "Si pudieras hacer lo mismo todos los días sin aburrirte, ¿qué sería?",
    options: [
      { career: "medicina",     icon: "❤️", text: "Ayudar a personas a sentirse mejor, cada caso sería distinto" },
      { career: "educacion",    icon: "✍️", text: "Enseñar y ver cómo otros aprenden y crecen" },
      { career: "comunicacion-publicidad", icon: "📣", text: "Crear mensajes y campañas que conecten con audiencias" },
      { career: "arquitectura", icon: "🏛️", text: "Diseñar y ver cómo mis creaciones toman forma real" },
      { career: "turismo",      icon: "✈️", text: "Conocer lugares nuevos y compartir experiencias de viaje" },
      { career: "enfermeria",   icon: "🩺", text: "Cuidar personas y marcar la diferencia en su bienestar" },
    ],
  },

  // ── CATEGORÍA 3: Entorno / Dónde trabajar ────────────────────────────────
  {
    categoryId: 3, category: "Entorno", emoji: "🌍",
    question: "¿Dónde te imaginas trabajando en el día a día?",
    options: [
      { career: "medicina",      icon: "🏥", text: "En un entorno clínico, cerca de quienes necesitan ayuda" },
      { career: "marketing",     icon: "🎯", text: "En un espacio creativo con ritmo rápido y proyectos nuevos" },
      { career: "administracion",icon: "🏢", text: "En una empresa coordinando equipos y tomando decisiones" },
      { career: "diseno-ux",     icon: "💡", text: "En un estudio o de forma remota con libertad creativa" },
      { career: "gastronomia",   icon: "👨‍🍳",text: "En una cocina profesional con mi equipo y mis recetas" },
      { career: "ingenieria-ambiental", icon: "🌿", text: "En campo o laboratorio, midiendo y protegiendo el entorno" },
    ],
  },
  {
    categoryId: 3, category: "Entorno", emoji: "⚡",
    question: "¿Qué tipo de ambiente de trabajo te genera más energía?",
    options: [
      { career: "software",      icon: "🛠️", text: "Uno donde haya problemas técnicos complejos por resolver" },
      { career: "arquitectura",  icon: "🌆", text: "Uno donde pueda ver mis ideas materializarse en el mundo real" },
      { career: "psicologia",    icon: "💬", text: "Uno donde pueda conectar profundamente con personas" },
      { career: "ingenieria-economica-negocios", icon: "💰", text: "Uno donde los datos financieros guíen las decisiones" },
      { career: "derecho",       icon: "⚖️", text: "Uno dinámico con retos intelectuales y debates frecuentes" },
      { career: "odontologia",   icon: "🦷", text: "Uno clínico con interacción directa con pacientes" },
    ],
  },
  {
    categoryId: 3, category: "Entorno", emoji: "👥",
    question: "¿Con quiénes preferirías interactuar principalmente en tu trabajo?",
    options: [
      { career: "medicina",     icon: "🩺", text: "Con pacientes y familias en momentos que importan de verdad" },
      { career: "ingenieria-mecatronica", icon: "🤖", text: "Con equipos técnicos integrando sistemas complejos" },
      { career: "marketing",    icon: "📊", text: "Con creativos y estrategas buscando impactar audiencias" },
      { career: "derecho",      icon: "🏛️", text: "Con clientes que necesitan defensa o asesoría legal" },
      { career: "gastronomia",  icon: "🍽️", text: "Con un equipo en cocina creando experiencias culinarias" },
      { career: "educacion-inicial", icon: "🧸", text: "Con niños pequeños en sus primeros pasos de aprendizaje" },
    ],
  },

  // ── CATEGORÍA 4: Valores / Lo que más importa ────────────────────────────
  {
    categoryId: 4, category: "Valores", emoji: "🎯",
    question: "¿Qué es lo más importante para ti en tu vida profesional?",
    options: [
      { career: "derecho",       icon: "🛡️", text: "Que se respeten los derechos de las personas" },
      { career: "psicologia",    icon: "🌱", text: "Ser parte del crecimiento personal y emocional de otros" },
      { career: "ciencia-computacion", icon: "💻", text: "Contribuir al conocimiento con exactitud y rigor" },
      { career: "administracion",icon: "🏆", text: "Construir organizaciones que perduren y prosperen" },
      { career: "comunicacion-publicidad", icon: "📢", text: "Crear mensajes que muevan a las personas a actuar" },
      { career: "periodismo",    icon: "📖", text: "Contar historias verdaderas que cambien cómo la gente ve el mundo" },
    ],
  },
  {
    categoryId: 4, category: "Valores", emoji: "💪",
    question: "¿Qué te motivaría más a esforzarte al máximo en tu trabajo?",
    options: [
      { career: "software",      icon: "🌐", text: "Saber que millones de personas usan algo que construí" },
      { career: "medicina",      icon: "❤️", text: "Saber que mi trabajo directamente mejoró o salvó una vida" },
      { career: "arquitectura",  icon: "🏛️", text: "Ver un espacio o edificio que diseñé completamente terminado" },
      { career: "gastronomia",   icon: "😊", text: "Ver la satisfacción genuina de quien prueba mis platos" },
      { career: "ingenieria-naval", icon: "⛵", text: "Ver un barco completo que diseñé surcando el mar" },
      { career: "obstetricia",   icon: "👶", text: "Ver a madres y bebés saludables tras un parto seguro" },
    ],
  },
  {
    categoryId: 4, category: "Valores", emoji: "🌟",
    question: "¿Qué tipo de impacto quieres tener en el mundo?",
    options: [
      { career: "medicina",     icon: "🏥", text: "Mejorar el bienestar físico de personas directamente" },
      { career: "derecho",      icon: "⚖️", text: "Proteger a quienes más lo necesitan ante el sistema" },
      { career: "ingenieria-ambiental", icon: "🌿", text: "Proteger el planeta para las futuras generaciones" },
      { career: "diseno-ux",    icon: "🎨", text: "Hacer el mundo más accesible y agradable visualmente" },
      { career: "educacion",    icon: "📚", text: "Formar mentes y abrir oportunidades a través del conocimiento" },
      { career: "veterinaria",  icon: "🐾", text: "Proteger la salud y el bienestar de los animales" },
    ],
  },

  // ── CATEGORÍA 5: Situación / Rol en equipo ───────────────────────────────
  {
    categoryId: 5, category: "Situación", emoji: "🚨",
    question: "En un proyecto grupal bajo presión, ¿qué rol adoptas naturalmente?",
    options: [
      { career: "software",      icon: "💻", text: "Me ocupo de la parte técnica más difícil del proyecto" },
      { career: "psicologia",    icon: "🤝", text: "Me aseguro de que el equipo esté unido y con ánimo" },
      { career: "marketing",     icon: "📢", text: "Motivo al grupo y comunico el avance hacia afuera" },
      { career: "derecho",       icon: "📋", text: "Establezco acuerdos claros y distribuyo responsabilidades" },
      { career: "ingenieria-industrial", icon: "🔧", text: "Diseño el flujo de trabajo más eficiente para entregar" },
      { career: "administracion",icon: "🗂️", text: "Coordino personas y recursos para que todo fluya" },
    ],
  },
  {
    categoryId: 5, category: "Situación", emoji: "💡",
    question: "Cuando tu equipo está perdido o bloqueado, ¿qué haces?",
    options: [
      { career: "ingenieria-sistemas-informacion", icon: "🗄️", text: "Explico la estructura lógica del problema hasta que quede claro" },
      { career: "arquitectura", icon: "📐", text: "Dibujo o visualizo el plan para que todos lo entiendan" },
      { career: "ingenieria-transporte", icon: "🚆", text: "Propongo optimizar la logística y el flujo de lo que estamos haciendo" },
      { career: "marketing",    icon: "🎯", text: "Reformulo el mensaje de forma que conecte con todos" },
      { career: "educacion-primaria", icon: "📖", text: "Explico con ejemplos sencillos hasta que todos comprendan" },
      { career: "nutricion",    icon: "🥗", text: "Busco el equilibrio correcto entre todos los enfoques disponibles" },
    ],
  },
  {
    categoryId: 5, category: "Situación", emoji: "🤝",
    question: "¿Cómo prefieres contribuir en un proyecto de grupo?",
    options: [
      { career: "software",    icon: "🛠️", text: "Desarrollando la solución técnica central del proyecto" },
      { career: "ingenieria-diseno-grafico", icon: "🎨", text: "Diseñando la identidad visual o la experiencia del producto" },
      { career: "derecho",     icon: "📑", text: "Revisando que todo esté en regla y nadie infrinja nada" },
      { career: "gastronomia", icon: "🍳", text: "Aportando creatividad y cuidado en los detalles de ejecución" },
      { career: "contabilidad", icon: "📊", text: "Llevando las cuentas y asegurando que los recursos sean correctos" },
      { career: "psicologia",  icon: "💬", text: "Facilitando que el equipo colabore y se entienda mejor" },
    ],
  },

  // ── CATEGORÍA 6: Intereses / Contenido y hobbies ─────────────────────────
  {
    categoryId: 6, category: "Intereses", emoji: "📚",
    question: "¿Qué tipo de contenido consumes cuando tienes tiempo libre?",
    options: [
      { career: "ciencias-comunicacion", icon: "📡", text: "Análisis de medios, documentales y reportajes" },
      { career: "traduccion-interpretacion", icon: "🌏", text: "Contenido en otros idiomas, literatura extranjera" },
      { career: "arquitectura", icon: "🏛️", text: "Arte, diseño de interiores y arquitectura de distintas épocas" },
      { career: "biologia-marina", icon: "🐠", text: "Documentales de naturaleza y exploración oceánica" },
      { career: "marketing",    icon: "📱", text: "Campañas virales, tendencias y psicología del consumidor" },
      { career: "diseno-ux",    icon: "🖌️", text: "Portfolios de diseño, tipografía y tendencias visuales" },
    ],
  },
  {
    categoryId: 6, category: "Intereses", emoji: "⏰",
    question: "Si tuvieras 3 horas libres inesperadas hoy, ¿cómo las usarías?",
    options: [
      { career: "software",      icon: "💻", text: "Aprendiendo algo nuevo de tecnología o haciendo un challenge" },
      { career: "ingenieria-economica-negocios", icon: "📈", text: "Analizando mercados o leyendo sobre finanzas" },
      { career: "psicologia",    icon: "💬", text: "Escuchando a alguien que necesite ser escuchado" },
      { career: "gastronomia",   icon: "🍳", text: "Cocinando algo nuevo o explorando un restaurante" },
      { career: "medicina",      icon: "🔬", text: "Investigando sobre algún tema de salud que te llama la atención" },
      { career: "administracion-negocios-internacionales", icon: "🌍", text: "Investigando mercados globales y oportunidades de negocio" },
    ],
  },
  {
    categoryId: 6, category: "Intereses", emoji: "🔎",
    question: "¿Qué tema te entusiasmaría estudiar más a fondo solo por placer?",
    options: [
      { career: "derecho",      icon: "⚖️", text: "Las leyes que moldean la sociedad y la historia de la justicia" },
      { career: "ingenieria-ciberseguridad", icon: "🔒", text: "Cómo proteger sistemas y datos de amenazas digitales" },
      { career: "arquitectura", icon: "🏛️", text: "Los principios detrás de los edificios más icónicos del mundo" },
      { career: "economia",     icon: "📊", text: "Los mercados y cómo las decisiones económicas afectan al mundo" },
      { career: "ingenieria-mecanica", icon: "🔧", text: "Cómo funcionan las máquinas y motores que mueven el mundo" },
      { career: "relaciones-internacionales", icon: "🌐", text: "Las relaciones entre países y la diplomacia global" },
    ],
  },

  // ── CATEGORÍA 7: Tecnología / Cómo la usas ───────────────────────────────
  {
    categoryId: 7, category: "Tecnología", emoji: "🤖",
    question: "¿Cómo te ves relacionándote con la tecnología en tu trabajo?",
    options: [
      { career: "software",      icon: "🛠️", text: "Creándola desde cero — código, algoritmos, plataformas" },
      { career: "medicina",      icon: "🔬", text: "Usándola para diagnósticos más rápidos y personalizados" },
      { career: "redes-telecomunicaciones", icon: "📶", text: "Administrando la infraestructura que conecta todo" },
      { career: "ciencia-computacion", icon: "💾", text: "Aplicándola para modelar datos y crear algoritmos" },
      { career: "arquitectura",  icon: "📐", text: "Usando software 3D para llevar mis diseños al límite" },
      { career: "gastronomia",   icon: "🍽️", text: "Aplicando técnicas modernas para elevar la experiencia culinaria" },
    ],
  },
  {
    categoryId: 7, category: "Tecnología", emoji: "✨",
    question: "¿Qué aspecto de la tecnología te parece más fascinante?",
    options: [
      { career: "software",      icon: "💡", text: "La capacidad de crear herramientas que cambien cómo vivimos" },
      { career: "ingenieria-maritima", icon: "🚢", text: "Los sistemas de navegación y logística que conectan continentes" },
      { career: "tecnologia-medica", icon: "🔬", text: "Los equipos que salvan vidas y mejoran diagnósticos" },
      { career: "ingenieria-electronica", icon: "🔌", text: "Los circuitos y sistemas que hacen funcionar casi todo" },
      { career: "medicina",      icon: "🧬", text: "Los avances en diagnóstico, genómica y medicina personalizada" },
      { career: "administracion",icon: "📈", text: "Las herramientas que optimizan cómo funcionan las organizaciones" },
    ],
  },
  {
    categoryId: 7, category: "Tecnología", emoji: "🌐",
    question: "Si pudieras usar tecnología para resolver cualquier problema, ¿cuál elegirías?",
    options: [
      { career: "medicina",     icon: "🩺", text: "Detectar enfermedades antes de que causen daño real" },
      { career: "derecho",      icon: "🏛️", text: "Garantizar acceso igualitario a la justicia para todos" },
      { career: "marketing",    icon: "📣", text: "Conectar a personas exactamente con lo que necesitan" },
      { career: "ingenieria-ciberseguridad", icon: "🔒", text: "Hacer que los sistemas críticos nunca fallen ni sean vulnerados" },
      { career: "psicologia",   icon: "💙", text: "Identificar y apoyar a personas con problemas de salud mental" },
      { career: "ingenieria-ambiental", icon: "🌍", text: "Monitorear y revertir el daño ecológico en tiempo real" },
    ],
  },

  // ── CATEGORÍA 8: Futuro / Visión a largo plazo ───────────────────────────
  {
    categoryId: 8, category: "Futuro", emoji: "🚀",
    question: "¿Cómo te imaginas en 10 años?",
    options: [
      { career: "software",      icon: "💡", text: "Fundando o liderando una empresa de tecnología propia" },
      { career: "medicina",      icon: "🏆", text: "Como especialista médico reconocido en mi campo" },
      { career: "arquitectura",  icon: "🌆", text: "Diseñando proyectos urbanos o edificios emblemáticos" },
      { career: "ingenieria-empresarial", icon: "🏭", text: "Liderando la transformación digital de una gran organización" },
      { career: "gastronomia",   icon: "⭐", text: "Con mi propio restaurante o empresa gastronómica exitosa" },
      { career: "marketing",     icon: "🌍", text: "Liderando la estrategia de comunicación de una gran marca" },
    ],
  },
  {
    categoryId: 8, category: "Futuro", emoji: "🏆",
    question: "¿Cuál sería tu mayor logro profesional si logras alcanzarlo?",
    options: [
      { career: "ingenieria-civil", icon: "🌉", text: "Diseñar un puente o edificio que sea referencia nacional" },
      { career: "derecho",       icon: "⚖️", text: "Ganar un caso que cambie una ley injusta" },
      { career: "psicologia-consumidor", icon: "🛒", text: "Revolucionar la forma en que las marcas entienden a sus clientes" },
      { career: "ingenieria-mecatronica", icon: "🤖", text: "Crear un sistema automatizado que transforme una industria" },
      { career: "obstetricia",   icon: "👶", text: "Reducir la mortalidad materna en comunidades vulnerables" },
      { career: "administracion",icon: "🏢", text: "Construir una empresa que emplee y motive a cientos de personas" },
    ],
  },
  {
    categoryId: 8, category: "Futuro", emoji: "💫",
    question: "¿Qué tipo de proyecto soñarías con liderar algún día?",
    options: [
      { career: "arquitectura",  icon: "🌿", text: "El diseño de un barrio o ciudad completamente sostenible" },
      { career: "software",      icon: "🌐", text: "Una plataforma digital que resuelva un problema global" },
      { career: "medicina",      icon: "🧬", text: "Una investigación que lleve a la cura de una enfermedad" },
      { career: "gastronomia",   icon: "🍽️", text: "Un restaurante que sea referente gastronómico en Perú" },
      { career: "marketing",     icon: "📣", text: "Una campaña que genere un cambio cultural real" },
      { career: "ingenieria-minas", icon: "⛏️", text: "Un proyecto minero responsable con la comunidad y el ambiente" },
    ],
  },

  // ── CATEGORÍA 9: Impacto / Legado ────────────────────────────────────────
  {
    categoryId: 9, category: "Impacto", emoji: "🌱",
    question: "¿Qué quieres que digan de ti cuando te retires?",
    options: [
      { career: "medicina",    icon: "💚", text: "Que salvó y mejoró la vida de muchas personas" },
      { career: "derecho",     icon: "🛡️", text: "Que defendió a quienes más lo necesitaban" },
      { career: "psicologia",  icon: "🌟", text: "Que acompañó el bienestar emocional de cientos" },
      { career: "enfermeria",  icon: "🩺", text: "Que cuidó con calidez a quienes más lo necesitaban" },
      { career: "ingenieria-mecanica", icon: "🔧", text: "Que sus diseños mecánicos transformaron la industria" },
      { career: "educacion",   icon: "📚", text: "Que inspiró a generaciones de estudiantes a ser mejores" },
    ],
  },
  {
    categoryId: 9, category: "Impacto", emoji: "🏅",
    question: "¿Qué tipo de huella quieres dejar en el mundo?",
    options: [
      { career: "traduccion-interpretacion", icon: "🌏", text: "Que mis traducciones acercaron culturas y personas" },
      { career: "arquitectura",  icon: "🏛️", text: "Que los espacios que diseñé mejoren la vida de quienes los habitan" },
      { career: "administracion",icon: "🏢", text: "Que las organizaciones que construí aún prosperen sin mí" },
      { career: "diseno-ux",     icon: "🎨", text: "Que las interfaces que creé hicieron la tecnología más humana" },
      { career: "gastronomia",   icon: "🍳", text: "Que elevé la gastronomía peruana a nivel internacional" },
      { career: "economia",      icon: "📈", text: "Que mis análisis ayudaron a tomar mejores decisiones económicas" },
    ],
  },
  {
    categoryId: 9, category: "Impacto", emoji: "💙",
    question: "¿A quién principalmente te gustaría que tu trabajo ayudara?",
    options: [
      { career: "medicina",      icon: "🩺", text: "A enfermos y familias en momentos de mayor vulnerabilidad" },
      { career: "psicologia",    icon: "💬", text: "A personas que atraviesan momentos emocionalmente difíciles" },
      { career: "derecho",       icon: "⚖️", text: "A personas sin recursos que no tienen acceso a la justicia" },
      { career: "marketing",     icon: "🚀", text: "A emprendedores para que sus ideas lleguen a más personas" },
      { career: "software",      icon: "🌐", text: "A personas en todo el mundo a través de herramientas que construí" },
      { career: "veterinaria",   icon: "🐾", text: "A animales que necesitan cuidado y protección" },
    ],
  },

  // ── CATEGORÍA 10: Decisión final / Qué estudiar ──────────────────────────
  {
    categoryId: 10, category: "Decisión final", emoji: "🎓",
    question: "Si pudieras estudiar solo una cosa el resto de tu vida, ¿qué elegirías?",
    options: [
      { career: "software",      icon: "🤖", text: "Inteligencia Artificial y desarrollo de software" },
      { career: "diseno-ux",     icon: "📱", text: "Diseño de experiencias digitales y productos" },
      { career: "derecho",       icon: "🏛️", text: "Derecho penal, civil o internacional" },
      { career: "administracion",icon: "📊", text: "Gestión empresarial y liderazgo organizacional" },
      { career: "ciencia-computacion", icon: "💻", text: "Ciencia de datos, algoritmos y computación avanzada" },
      { career: "ingenieria-sistemas", icon: "🖥️", text: "Sistemas de información, redes y ciberseguridad" },
    ],
  },
  {
    categoryId: 10, category: "Decisión final", emoji: "📖",
    question: "¿Cuál de estas áreas del conocimiento te llama más la atención?",
    options: [
      { career: "medicina",     icon: "🧬", text: "Biología, anatomía y el funcionamiento del cuerpo humano" },
      { career: "psicologia",   icon: "🧠", text: "La mente humana, las emociones y el comportamiento social" },
      { career: "arquitectura", icon: "🏛️", text: "El diseño del espacio y su relación con la experiencia humana" },
      { career: "nutricion",    icon: "🥗", text: "Los alimentos y su impacto en la salud y el bienestar" },
      { career: "relaciones-internacionales", icon: "🌐", text: "La política global, el comercio y las relaciones entre países" },
      { career: "ciencias-comunicacion", icon: "📡", text: "Los medios, el periodismo y la comunicación social" },
    ],
  },
  {
    categoryId: 10, category: "Decisión final", emoji: "✈️",
    question: "Si te dieran una beca para estudiar lo que quieras en cualquier parte del mundo, ¿qué estudiarías?",
    options: [
      { career: "ingenieria-ciberseguridad", icon: "🔒", text: "Ciberseguridad e infraestructura de sistemas en el MIT" },
      { career: "gastronomia",   icon: "🍽️", text: "Alta cocina y gastronomía molecular en Le Cordon Bleu" },
      { career: "derecho",       icon: "⚖️", text: "Derecho Internacional en La Haya" },
      { career: "marketing",     icon: "📣", text: "Marketing digital y neuromarketing en Harvard" },
      { career: "arquitectura",  icon: "🌿", text: "Arquitectura sostenible y urbanismo en Barcelona" },
      { career: "administracion-negocios-internacionales", icon: "🌍", text: "Negocios internacionales y comercio global en Singapur" },
    ],
  },
];

// ── generateTest: selecciona 1 pregunta aleatoria por cada categoría ─────────

export function generateTest(): Question[] {
  const categoryIds = [...new Set(RAW_POOL.map((q) => q.categoryId))].sort(
    (a, b) => a - b,
  );

  return categoryIds.map((catId, idx) => {
    const pool = RAW_POOL.filter((q) => q.categoryId === catId);
    const picked = pool[Math.floor(Math.random() * pool.length)];
    return {
      ...picked,
      id: idx + 1,
      options: buildOptions(picked.options),
    };
  });
}

export const questions: Question[] = generateTest();
