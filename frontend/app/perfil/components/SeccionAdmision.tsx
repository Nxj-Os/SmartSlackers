"use client";

import { Profile } from "../page";

const ETAPAS_ADMISION = [
  { id: "registro",    label: "Registro de postulante" },
  { id: "documentos", label: "Carga de documentos" },
  { id: "examen",     label: "Examen de admisión" },
  { id: "resultado",  label: "Resultado" },
  { id: "matricula",  label: "Matrícula" },
];

interface SeccionAdmisionProps {
  profile: Profile;
}

export default function SeccionAdmision({ profile }: SeccionAdmisionProps) {
  const currentEtapaIndex = ETAPAS_ADMISION.findIndex((e) => e.id === profile.etapaAdmision);

  return (
    <div className="space-y-6">
      {/* ── Proceso de admisión ── */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
          Proceso de admisión
        </p>
        <ol className="mt-6 space-y-0">
          {ETAPAS_ADMISION.map((etapa, index) => {
            const isDone    = currentEtapaIndex >= 0 && index < currentEtapaIndex;
            const isCurrent = index === currentEtapaIndex;
            const isLast    = index === ETAPAS_ADMISION.length - 1;
            return (
              <li key={etapa.id} className="relative flex gap-4 pb-8 last:pb-0">
                {!isLast && (
                  <span
                    className={`absolute left-[15px] top-8 h-full w-[2px] ${isDone ? "bg-red-400" : "bg-slate-200"}`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isDone
                      ? "bg-red-600 text-white"
                      : isCurrent
                      ? "border-2 border-red-600 bg-white text-red-600"
                      : "border-2 border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="pt-1">
                  <p className={`text-base font-semibold ${isCurrent ? "text-red-700" : isDone ? "text-slate-900" : "text-slate-500"}`}>
                    {etapa.label}
                  </p>
                  {isCurrent && (
                    <p className="mt-1 text-sm text-slate-500">Estás en esta etapa actualmente.</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {currentEtapaIndex < 0 && (
          <p className="mt-2 text-sm text-slate-500">
            Aún no se ha registrado tu avance en el proceso de admisión.
          </p>
        )}
      </div>

      {/* ── Consejos rápidos ── */}
      <div className="rounded-[2rem] border border-slate-200 bg-red-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
          Consejos rápidos
        </p>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li>1. Revisa tu correo para información del proceso de admisión.</li>
          <li>2. Completa tu perfil en caso tengas más datos disponibles.</li>
          <li>3. Usa el menú de Recursos para explorar carreras y admisión UTP.</li>
        </ul>
      </div>
    </div>
  );
}
