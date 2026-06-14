"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/src/firebase/config";
import { careers } from "@/lib/careers";
import { CarreraAnalizada } from "../page";

interface SeccionInteresesProps {
  user: User;
  colUsuario: string;
  intereses: string[];
  setIntereses: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SeccionIntereses({
  user,
  colUsuario,
  intereses,
  setIntereses,
}: SeccionInteresesProps) {
  const [inputInteres, setInputInteres] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [guardadoOk, setGuardadoOk] = useState(false);

  const [analizando, setAnalizando] = useState(false);
  const [carrerasAnalizadas, setCarrerasAnalizadas] = useState<CarreraAnalizada[] | null>(null);
  const [errorAnalisis, setErrorAnalisis] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputInteres.trim()) {
      const nuevo = inputInteres.trim();
      if (!intereses.includes(nuevo)) setIntereses((prev) => [...prev, nuevo]);
      setInputInteres("");
      setGuardadoOk(false);
    }
    if (e.key === "Backspace" && !inputInteres && intereses.length > 0) {
      setIntereses((prev) => prev.slice(0, -1));
      setGuardadoOk(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setIntereses((prev) => prev.filter((i) => i !== tag));
    setGuardadoOk(false);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await updateDoc(doc(db, colUsuario, user.uid), { intereses });
      setGuardadoOk(true);
      setModoEdicion(false);
      setTimeout(() => setGuardadoOk(false), 3000);
    } catch (e) {
      console.error("Error guardando intereses:", e);
    } finally {
      setGuardando(false);
    }
  };

  const handleEditar = () => {
    setModoEdicion(true);
    setGuardadoOk(false);
    setCarrerasAnalizadas(null);
    setErrorAnalisis(null);
  };

  const handleCancelarEdicion = () => {
    setModoEdicion(false);
    setInputInteres("");
  };

  const handleAnalizarCarreras = async () => {
    if (intereses.length === 0) return;
    setAnalizando(true);
    setCarrerasAnalizadas(null);
    setErrorAnalisis(null);

    try {
      const carrerasPayload = careers.map((c) => ({
        id:          c.id,
        title:       c.title,
        emoji:       c.emoji,
        color:       c.color,
        description: c.description,
        skills:      c.skills,
        tools:       c.tools ?? [],
      }));

      const res = await fetch("/api/analizar-carreras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intereses, carreras: carrerasPayload }),
      });

      if (!res.ok) throw new Error("Error en el servidor");
      const { resultado } = await res.json();

      const enriquecidas: CarreraAnalizada[] = (resultado as { id: string; porcentaje: number; razon: string }[])
        .map((item) => {
          const carrera = careers.find((c) => c.id === item.id);
          if (!carrera) return null;
          return {
            title:      carrera.title,
            emoji:      carrera.emoji,
            color:      carrera.color,
            porcentaje: item.porcentaje,
            razon:      item.razon,
          };
        })
        .filter(Boolean) as CarreraAnalizada[];

      setCarrerasAnalizadas(enriquecidas);
    } catch (e) {
      console.error(e);
      setErrorAnalisis("Ocurrió un error al analizar las carreras. Intenta de nuevo.");
    } finally {
      setAnalizando(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
            Mis intereses y hobbys
          </p>
          {!modoEdicion && (
            <button
              onClick={handleEditar}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              ✏️ Editar
            </button>
          )}
        </div>

        <p className="mb-5 text-sm text-slate-500">
          {modoEdicion
            ? <>Escribe un interés y presiona <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-600">Enter</kbd> para agregarlo.</>
            : "Tus intereses y hobbys registrados."}
        </p>

        {/* ── MODO EDICIÓN ── */}
        {modoEdicion && (
          <div className="space-y-4">
            <div
              className="flex min-h-[3rem] flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition cursor-text"
              onClick={() => document.getElementById("input-interes-perfil")?.focus()}
            >
              {intereses.map((tag) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
                >
                  {tag}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveTag(tag); }}
                    className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-red-400 transition hover:bg-red-200 hover:text-red-800 text-[10px]"
                  >
                    ✕
                  </button>
                </motion.span>
              ))}
              <input
                id="input-interes-perfil"
                type="text"
                value={inputInteres}
                onChange={(e) => setInputInteres(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={intereses.length === 0 ? "Ej: programación, música, diseño..." : "Agregar más..."}
                className="min-w-[160px] flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            {intereses.length === 0 && (
              <p className="text-center text-sm text-slate-400 py-2">
                Aún no has agregado intereses. ¡Empieza escribiendo arriba!
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleGuardar}
                disabled={guardando || intereses.length === 0}
                className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {guardando ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Guardando...
                  </span>
                ) : (
                  "💾 Guardar"
                )}
              </Button>
              <Button
                onClick={handleCancelarEdicion}
                variant="outline"
                className="border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* ── MODO VISTA ── */}
        {!modoEdicion && (
          <div className="space-y-5">
            {intereses.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <span className="text-3xl">🎯</span>
                <p className="text-sm text-slate-500">
                  Aún no tienes intereses registrados.
                </p>
                <button
                  onClick={handleEditar}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  + Agregar ahora
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {intereses.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {guardadoOk && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-sm font-medium text-green-600"
                    >
                      <span className="text-base">✓</span> Intereses guardados correctamente
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleAnalizarCarreras}
                  disabled={analizando}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition hover:from-red-700 hover:to-rose-600 disabled:opacity-60"
                >
                  {analizando ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Analizando...
                    </>
                  ) : (
                    <>🎓 Analizar posibles carreras</>
                  )}
                </button>
              </>
            )}

            {/* ── Resultado del análisis ── */}
            <AnimatePresence>
              {errorAnalisis && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {errorAnalisis}
                </motion.div>
              )}

              {carrerasAnalizadas && carrerasAnalizadas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-100 pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">
                        Carreras recomendadas para ti
                      </p>
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                        Resultados generados
                      </span>
                    </div>

                    <div className="space-y-3">
                      {carrerasAnalizadas.map((c, i) => (
                        <motion.div
                          key={c.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.09, type: "spring", stiffness: 260, damping: 24 }}
                          className="rounded-2xl border p-4"
                          style={{
                            borderColor: c.color + "35",
                            background:  c.color + "08",
                          }}
                        >
                          <div className="mb-2.5 flex items-center gap-3">
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xl"
                              style={{ background: c.color + "18" }}
                            >
                              {c.emoji}
                            </span>
                            <p className="flex-1 text-sm font-bold text-slate-900 leading-snug">
                              {c.title}
                            </p>
                            <span
                              className="shrink-0 text-xl font-black tabular-nums"
                              style={{ color: c.color }}
                            >
                              {c.porcentaje}%
                            </span>
                          </div>

                          <div className="mb-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}99)` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${c.porcentaje}%` }}
                              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + i * 0.09 }}
                            />
                          </div>

                          <p className="text-xs leading-relaxed text-slate-500">{c.razon}</p>
                        </motion.div>
                      ))}
                    </div>

                    <p className="mt-4 text-center text-xs text-slate-400">
                      Análisis generado por IA · Los resultados son orientativos
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
