"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useTranslation } from "@/lib/i18n";

type Lab = {
  nameKey: string;
  descKey: string;
  img: string;
};

const BASE = "https://www.utp.edu.pe";

const LABS_BY_CAREER: Record<string, Lab[]> = {
  medicina: [
    {
      nameKey: "labs.medicina.hospitalSimulado.name",
      descKey: "labs.medicina.hospitalSimulado.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
    },
    {
      nameKey: "labs.medicina.labOrganizacion.name",
      descKey: "labs.medicina.labOrganizacion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/LAB%20DE%20ORGANIZACI%C3%93N%20Y%20FUNCI%C3%93N%20DEL%20CUERPO%20HUMANO_1%202.jpg`,
    },
    {
      nameKey: "labs.medicina.salaSimulacion.name",
      descKey: "labs.medicina.salaSimulacion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Sala%20de%20Simulaci%C3%B3n%20Compleja%20-%20%20Obestricia%201.jpg`,
    },
    {
      nameKey: "labs.medicina.salaDiseccion.name",
      descKey: "labs.medicina.salaDiseccion.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Saladedisecci%C3%B3nARyVR.webp`,
    },
  ],
  arquitectura: [
    {
      nameKey: "labs.arquitectura.tallerArquitectura.name",
      descKey: "labs.arquitectura.tallerArquitectura.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
    },
    {
      nameKey: "labs.arquitectura.salaBIM.name",
      descKey: "labs.arquitectura.salaBIM.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  derecho: [
    {
      nameKey: "labs.derecho.salaAudiencias.name",
      descKey: "labs.derecho.salaAudiencias.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
    },
    {
      nameKey: "labs.derecho.salaDesignThinking.name",
      descKey: "labs.derecho.salaDesignThinking.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  gastronomia: [
    {
      nameKey: "labs.gastronomia.labTecnicasDieteticas.name",
      descKey: "labs.gastronomia.labTecnicasDieteticas.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20Nutrici%C3%B3n%20y%20Diet%C3%A9tica%201.jpg`,
    },
    {
      nameKey: "labs.gastronomia.labProcesosIndustriales.name",
      descKey: "labs.gastronomia.labProcesosIndustriales.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB%20DE%20PROCESOS%20INDUSTRIALES%203.jpg`,
    },
  ],
  "ingenieria-civil": [
    {
      nameKey: "labs.ingenieriaCivil.labConcretoSuelos.name",
      descKey: "labs.ingenieriaCivil.labConcretoSuelos.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/Laboratorio%20de%20tecnolog%C3%ADa%20de%20concreto%20y%20resistencia%201.jpg`,
    },
    {
      nameKey: "labs.ingenieriaCivil.labHidraulica.name",
      descKey: "labs.ingenieriaCivil.labHidraulica.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20HIDR%C3%81ULICA%201.jpg`,
    },
    {
      nameKey: "labs.ingenieriaCivil.salaBIM.name",
      descKey: "labs.ingenieriaCivil.salaBIM.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
    },
  ],
  software: [
    {
      nameKey: "labs.software.salaMacs.name",
      descKey: "labs.software.salaMacs.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
    {
      nameKey: "labs.software.salaDesignThinking.name",
      descKey: "labs.software.salaDesignThinking.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
    {
      nameKey: "labs.software.labMecatronica.name",
      descKey: "labs.software.labMecatronica.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
    },
  ],
  psicologia: [
    {
      nameKey: "labs.psicologia.camaraGesell.name",
      descKey: "labs.psicologia.camaraGesell.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
    },
    {
      nameKey: "labs.psicologia.salaDesignThinking.name",
      descKey: "labs.psicologia.salaDesignThinking.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
    },
  ],
  marketing: [
    {
      nameKey: "labs.marketing.tallerAudiovisual.name",
      descKey: "labs.marketing.tallerAudiovisual.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/ESTUDIO%20DE%20TV%201.jpg`,
    },
    {
      nameKey: "labs.marketing.cabinaAudio.name",
      descKey: "labs.marketing.cabinaAudio.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/Cabina%20de%20producci%C3%B3n%20de%20audio.jpg`,
    },
    {
      nameKey: "labs.marketing.salaMacs.name",
      descKey: "labs.marketing.salaMacs.desc",
      img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LABORATORIO%20DE%20COMPUTADORAS%20MAC%201.jpg`,
    },
  ],
};

const ALL_LABS: Lab[] = [
  {
    nameKey: "labs.all.hospitalSimulado.name",
    descKey: "labs.all.hospitalSimulado.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/HOSPITAL%20SIMULADO_1%202.jpg`,
  },
  {
    nameKey: "labs.all.salaAudiencias.name",
    descKey: "labs.all.salaAudiencias.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALADEAUDIENCIA%201.webp`,
  },
  {
    nameKey: "labs.all.tallerArquitectura.name",
    descKey: "labs.all.tallerArquitectura.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/TALLER%20DE%20ARQUITECTURA.jpg`,
  },
  {
    nameKey: "labs.all.salaDesignThinking.name",
    descKey: "labs.all.salaDesignThinking.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/noticias/SALA%20DESIGN%20THINKING%203.jpg`,
  },
  {
    nameKey: "labs.all.salaBIM.name",
    descKey: "labs.all.salaBIM.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20BIM%201.jpg`,
  },
  {
    nameKey: "labs.all.labMecatronica.name",
    descKey: "labs.all.labMecatronica.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/LAB.%20DE%20MECATR%C3%93NICA%201.jpg`,
  },
  {
    nameKey: "labs.all.camaraGesell.name",
    descKey: "labs.all.camaraGesell.desc",
    img: `${BASE}/descubre-utp/sites/consideracion/files/imagenes/SALA%20GESSEL%201.jpg`,
  },
  {
    nameKey: "labs.all.tallerAudiovisual.name",
    descKey: "labs.all.tallerAudiovisual.desc",
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
                  {t(lab.nameKey)}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {t(lab.descKey)}
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
