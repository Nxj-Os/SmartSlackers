export type BadgeDefinition = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "test" | "exploracion" | "comunidad" | "simulacion" | "aprendizaje";
  xp: number;
};

export type UserBadge = BadgeDefinition & {
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
};

export type UserBadgeResponse = {
  badges: UserBadge[];
  totalXp: number;
  totalUnlocked: number;
  totalAvailable: number;
  stats: Record<string, number>;
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "primera-vez",
    title: "Primera Vez",
    description: "Completaste el test vocacional por primera vez",
    icon: "🎯",
    category: "test",
    xp: 50,
  },
  {
    id: "explorador",
    title: "Explorador",
    description: "Exploraste 5 carreras diferentes",
    icon: "🔍",
    category: "exploracion",
    xp: 75,
  },
  {
    id: "explorador-experto",
    title: "Explorador Experto",
    description: "Exploraste 10 carreras diferentes",
    icon: "🧭",
    category: "exploracion",
    xp: 150,
  },
  {
    id: "corazon-generoso",
    title: "Corazón Generoso",
    description: "Diste 10 likes en la comunidad",
    icon: "❤️",
    category: "comunidad",
    xp: 75,
  },
  {
    id: "simulador",
    title: "Simulador",
    description: "Completaste una simulación de carrera",
    icon: "🎮",
    category: "simulacion",
    xp: 100,
  },
  {
    id: "pionero",
    title: "Pionero",
    description: "Completaste 3 simulaciones de carrera",
    icon: "🏆",
    category: "simulacion",
    xp: 200,
  },
  {
    id: "comentarista",
    title: "Comentarista",
    description: "Publicaste 5 comentarios en la comunidad",
    icon: "💬",
    category: "comunidad",
    xp: 75,
  },
  {
    id: "popular",
    title: "Popular",
    description: "Tus posts recibieron 10 likes en total",
    icon: "⭐",
    category: "comunidad",
    xp: 150,
  },
  {
    id: "activo",
    title: "Activo",
    description: "Publicaste 5 posts en la comunidad",
    icon: "📢",
    category: "comunidad",
    xp: 100,
  },
  {
    id: "mentor",
    title: "Mentor",
    description: "Usaste el Mentor IA 5 veces",
    icon: "🤖",
    category: "aprendizaje",
    xp: 100,
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  test: "#dc2626",
  exploracion: "#2563eb",
  comunidad: "#7c3aed",
  simulacion: "#059669",
  aprendizaje: "#d97706",
};

export const CATEGORY_LABELS: Record<string, string> = {
  test: "Test Vocacional",
  exploracion: "Exploración",
  comunidad: "Comunidad",
  simulacion: "Simulación",
  aprendizaje: "Aprendizaje",
};
