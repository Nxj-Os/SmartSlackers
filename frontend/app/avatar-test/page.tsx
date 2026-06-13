"use client";

import { useState } from "react";
import AvatarCustomizer from "../components/avatar/AvatarCustomizer";
import { CAREER_COSMETICS } from "@/lib/careerCosmetics";

const CAREERS = Object.keys(CAREER_COSMETICS);

export default function AvatarTestPage() {
  const [careerResult, setCareerResult] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Prueba del Avatar
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Personaliza tu avatar y simula el resultado de una carrera.
          </p>
        </div>

        {/* Simulador de resultado del test */}
        <div className="mb-6 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            Simular resultado del test vocacional
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${!careerResult ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:border-slate-500"}`}
              onClick={() => setCareerResult(null)}
            >
              Sin carrera
            </button>
            {CAREERS.map((key) => (
              <button
                key={key}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${careerResult === key ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:border-slate-500"}`}
                onClick={() => setCareerResult(key)}
              >
                {CAREER_COSMETICS[key].label}
              </button>
            ))}
          </div>
          {careerResult && (
            <p className="mt-2 text-xs text-slate-400">
              Cosmético activo: <span className="font-medium">{CAREER_COSMETICS[careerResult].description}</span>
            </p>
          )}
        </div>

        {/* El customizador real */}
        <AvatarCustomizer careerResult={careerResult} />
      </div>
    </main>
  );
}
