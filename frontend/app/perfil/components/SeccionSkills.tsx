"use client";

import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/src/firebase/config";
import { careers } from "@/lib/careers";
import SkillAssessment from "./SkillAssessment";
import SkillGapDashboard from "./SkillGapDashboard";

interface SeccionSkillsProps {
  user: User;
  colUsuario: string;
  carrera: string | undefined;
  setCarrera: (value: string | undefined) => void;
}

export default function SeccionSkills({ user, colUsuario, carrera, setCarrera }: SeccionSkillsProps) {
  return (
    <div className="space-y-6">
      {/* ── Selector de Carrera ── */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600 mb-4">
          Carrera de interés
        </p>
        <p className="text-sm text-slate-500 mb-4">
          Selecciona la carrera que te interesa para desbloquear el análisis de skills.
        </p>
        <select
          value={carrera || ""}
          onChange={async (e) => {
            const value = e.target.value;
            setCarrera(value || undefined);
            try {
              await updateDoc(doc(db, colUsuario, user.uid), { carrera: value });
            } catch { /* silent */ }
          }}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
        >
          <option value="">— Selecciona una carrera —</option>
          {careers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* ── Skills Assessment ── */}
      {carrera && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <SkillAssessment userId={user.uid} careerId={carrera} />
        </div>
      )}

      {/* ── Skill Gap Dashboard ── */}
      {carrera && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <SkillGapDashboard userId={user.uid} careerId={carrera} />
        </div>
      )}

      {/* ── Placeholder when no career selected ── */}
      {!carrera && (
        <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-dashed border-slate-200 bg-white p-12 text-center shadow-[0_22px_70px_rgba(15,23,42,0.04)]">
          <span className="text-4xl">📊</span>
          <p className="text-sm font-medium text-slate-500">
            Selecciona una carrera arriba para ver tu análisis de skills y brechas.
          </p>
        </div>
      )}
    </div>
  );
}
