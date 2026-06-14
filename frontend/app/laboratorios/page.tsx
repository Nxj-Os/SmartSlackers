"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n";

type Lab = {
  name: string;
  desc: string;
  img: string;
};

const BASE = "https://www.utp.edu.pe";

const LABS_BY_CAREER: Record<string, Lab[]> = {
  medicina: [
    {
      name: "Hospital Simulado",
      desc: "Entorno innovador que combina teoría y práctica con simuladores avanzados de última generación.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      name: "Lab. Organización y Función del Cuerpo Humano",
      desc: "Espacio innovador con tecnología avanzada y disección virtual en 3D.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/LAB%20DE%20ORGANIZACI%C3%93N%20Y%20FUNCI%C3%93N%20DEL%20CUERPO%20HUMANO_1%202.jpg`,
    },
    {
      name: "Sala de Simulación Compleja Ginecobstetra",
      desc: "Espacio para practicar ginecología, obstetricia y neonatología con simuladores reales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Sala%20de%20Simulaci%C3%B3n%20Compleja%20-%20%20Obestricia%201.jpg`,
    },
    {
      name: "Sala de Disección AR y VR",
      desc: "Centro de innovación con tecnología de realidad aumentada y virtual para disección sin cadáveres.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Saladedisecci%C3%B3nARyVR.webp`,
    },
  ],
  arquitectura: [
    {
      name: "Taller de Arquitectura",
      desc: "Ambiente especializado equipado para el diseño y realización de maquetas basadas en proyectos de clase.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Espacio con tecnología avanzada y modelos 3D para proyectos de construcción y diseño arquitectónico.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  derecho: [
    {
      name: "Sala de Audiencias",
      desc: "Espacio para actividades prácticas donde los estudiantes simulan audiencias procesales reales.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para desarrollar soluciones innovadoras a problemas legales complejos.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  gastronomia: [
    {
      name: "Laboratorio de Técnicas Dietéticas",
      desc: "Centro de innovación en seguridad alimentaria con tecnología avanzada para nutrición y dietética.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20Nutrici%C3%B3n%20y%20Diet%C3%A9tica%201.jpg`,
    },
    {
      name: "Laboratorio de Procesos Industriales",
      desc: "Entorno educativo con cuatro plantas de producción: cerveza artesanal, néctares, snacks y más.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  "ingenieria-civil": [
    {
      name: "Lab. Tecnología del Concreto y Mecánica de Suelos",
      desc: "Realizarás pruebas normalizadas en concreto, suelos y asfalto con equipos de última generación.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20tecnolog%C3%ADa%20de%20concreto%20y%20resistencia%201.jpg`,
    },
    {
      name: "Laboratorio Hidráulica",
      desc: "Laboratorio para estudiar el comportamiento del agua en canales, tuberías y estructuras hidráulicas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      name: "Sala BIM",
      desc: "Modelado de información de construcción con tecnología 3D para proyectos de ingeniería civil.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  software: [
    {
      name: "Sala con Macs",
      desc: "Ambientes especializados con equipos Apple para desarrollo de software, diseño y multimedia.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para el pensamiento de diseño e innovación tecnológica.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      name: "Laboratorio de Mecatrónica",
      desc: "Laboratorio multidisciplinario para el diseño y desarrollo de sistemas robóticos inteligentes.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  psicologia: [
    {
      name: "Cámara Gesell",
      desc: "Sala diseñada para entrevistas psicológicas, evaluaciones clínicas e intervenciones terapéuticas.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
    {
      name: "Sala Design Thinking",
      desc: "Espacio colaborativo para desarrollar soluciones innovadoras en salud mental y bienestar.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  marketing: [
    {
      name: "Taller de Producción Audiovisual",
      desc: "Espacio profesional equipado con ciclorama, chroma key, switcher y cámaras de cine.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      name: "Cabina de Producción de Audio",
      desc: "Espacio diseñado específicamente para grabar y mezclar sonido de alta calidad profesional.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      name: "Sala con Macs",
      desc: "Ambientes especializados con equipos Apple para diseño gráfico, edición y marketing digital.",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
};

const ALL_LABS: Lab[] = [
  {
    name: "Hospital Simulado",
    desc: "Entorno innovador con simuladores avanzados para medicina y ciencias de la salud.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
  },
  {
    name: "Sala de Audiencias",
    desc: "Simulación de audiencias procesales reales para estudiantes de derecho.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
  },
  {
    name: "Taller de Arquitectura",
    desc: "Diseño y maquetas para proyectos arquitectónicos.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
  },
  {
    name: "Sala Design Thinking",
    desc: "Espacio colaborativo para innovación y pensamiento creativo.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
  },
  {
    name: "Sala BIM",
    desc: "Modelado 3D de proyectos de construcción y arquitectura.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
  },
  {
    name: "Laboratorio de Mecatrónica",
    desc: "Robótica y sistemas mecatrónicos de última generación.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
  },
  {
    name: "Cámara Gesell",
    desc: "Evaluaciones psicológicas e intervenciones terapéuticas.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
  },
  {
    name: "Taller de Producción Audiovisual",
    desc: "Producción de video profesional con ciclorama y chroma key.",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
  },
];

const CAREER_META: Record<string, { title: string; emoji: string; color: string; gradient: string }> = {
  medicina:          { title: "Medicina Humana",        emoji: "🏥", color: "#0369a1", gradient: "linear-gradient(135deg,#0369a1,#0ea5e9)" },
  arquitectura:      { title: "Arquitectura",           emoji: "🏛️", color: "#1d4ed8", gradient: "linear-gradient(135deg,#1e3a8a,#3b82f6)" },
  derecho:           { title: "Derecho",                emoji: "⚖️", color: "#b45309", gradient: "linear-gradient(135deg,#78350f,#d97706)" },
  gastronomia:       { title: "Gastronomía",            emoji: "🍳", color: "#c2410c", gradient: "linear-gradient(135deg,#7c2d12,#ea580c)" },
  "ingenieria-civil":{ title: "Ingeniería Civil",       emoji: "🏗️", color: "#92400e", gradient: "linear-gradient(135deg,#451a03,#b45309)" },
  software:          { title: "Ingeniería de Software", emoji: "💻", color: "#166534", gradient: "linear-gradient(135deg,#052e16,#166534)" },
  psicologia:        { title: "Psicología",             emoji: "🧠", color: "#6d28d9", gradient: "linear-gradient(135deg,#2e1065,#6d28d9)" },
  marketing:         { title: "Marketing",              emoji: "📣", color: "#be185d", gradient: "linear-gradient(135deg,#4a044e,#be185d)" },
};

function LabGallery() {
  const { t } = useTranslation();
  const params = useSearchParams();
  const careerKey = params.get("career") ?? "";

  const labs = LABS_BY_CAREER[careerKey] ?? ALL_LABS;
  const meta = CAREER_META[careerKey];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#e0f2fe_100%)]">
      <Navbar />

      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 py-14 text-center"
        style={{
          background: meta?.gradient ?? "linear-gradient(135deg,#1e3a8a,#3b82f6)",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-white/60 text-sm uppercase tracking-widest font-medium mb-2">
            {t("laboratorios.infraestructuraUtp")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            {meta ? `${meta.emoji} Laboratorios de ${meta.title}` : `${"🔬"} ${t("laboratorios.conoceNuestrosLaboratorios")}`}
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto">
            {t("laboratorios.instalacionesClaseMundial")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs text-white/80 backdrop-blur-sm border border-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {labs.length === 1
              ? t("laboratorios.unLaboratorioDisponible", { count: labs.length })
              : t("laboratorios.laboratoriosDisponibles", { count: labs.length })}
          </div>
        </motion.div>
      </div>

      {/* Gallery grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52 bg-slate-100">
                <img
                  src={lab.img}
                  alt={lab.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="flex h-full items-center justify-center text-5xl">${meta?.emoji ?? "🔬"}</div>`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                  style={{ background: meta?.color ?? "#1d4ed8" }}
                >
                  UTP
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                  {lab.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {lab.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={careerKey ? `/test` : "/carreras"}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            style={{ background: meta?.gradient ?? "linear-gradient(135deg,#1e3a8a,#3b82f6)" }}
          >
            ← {careerKey ? t("laboratorios.volverAlTest") : t("laboratorios.explorarCarreras")}
          </a>
          <p className="mt-4 text-xs text-slate-400">
            {t("laboratorios.infoOficial")}{" "}
            <a
              href="https://www.utp.edu.pe/descubre-utp/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-600"
            >
              utp.edu.pe/descubre-utp
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function LaboratoriosPage() {
  const { t } = useTranslation();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#f0f9ff,#e0f2fe)]">
          <p className="text-slate-400">{t("laboratorios.cargandoLaboratorios")}</p>
        </div>
      }
    >
      <LabGallery />
    </Suspense>
  );
}
