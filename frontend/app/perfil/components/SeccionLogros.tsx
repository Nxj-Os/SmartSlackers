"use client";

import { motion } from "framer-motion";
import { UserBadge } from "@/lib/badges";
import BadgeDisplay from "@/app/components/BadgeDisplay";
import { TestHistoryEntry } from "../page";

interface SeccionLogrosProps {
  badges: UserBadge[];
  totalXp: number;
  totalUnlocked: number;
  totalAvailable: number;
  badgesLoading: boolean;
  careerStats: {
    key: string;
    title: string;
    emoji: string;
    avgMatch: number;
    count: number;
  }[] | null;
  historyLoading: boolean;
}

export default function SeccionLogros({
  badges,
  totalXp,
  totalUnlocked,
  totalAvailable,
  badgesLoading,
  careerStats,
  historyLoading,
}: SeccionLogrosProps) {
  return (
    <div className="space-y-6">
      {/* ── Badges / Logros ── */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
            Badges y Logros
          </p>
          {totalXp > 0 && (
            <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-1">
              <span className="text-xs">⭐</span>
              <span className="text-xs font-bold text-amber-700">{totalXp} XP</span>
            </div>
          )}
        </div>

        {badgesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-red-200 border-t-red-600" />
          </div>
        ) : (
          <BadgeDisplay
            badges={badges}
            totalXp={totalXp}
            totalUnlocked={totalUnlocked}
            totalAvailable={totalAvailable}
          />
        )}
      </div>

      {/* ── Perfil vocacional (gráfico circular) ── */}
      {!historyLoading && careerStats && careerStats.length > 0 && (() => {
        const R = 58;
        const CIRC = 2 * Math.PI * R;
        const top = careerStats[0];
        const second = careerStats[1] ?? null;
        return (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
              Tu perfil vocacional
            </p>

            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <svg width="148" height="148" viewBox="0 0 148 148">
                  <defs>
                    <linearGradient id="cvGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                  </defs>
                  <circle cx="74" cy="74" r={R} fill="none" stroke="#f1f5f9" strokeWidth="13" />
                  <motion.circle
                    cx="74" cy="74" r={R}
                    fill="none"
                    stroke="url(#cvGrad)"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    initial={{ strokeDashoffset: CIRC }}
                    animate={{ strokeDashoffset: CIRC * (1 - top.avgMatch / 100) }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
                    transform="rotate(-90 74 74)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl leading-none">{top.emoji}</span>
                  <span className="mt-1 text-2xl font-black text-red-600">{top.avgMatch}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900">{top.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Basado en {top.count} test{top.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {second && (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Segunda opción
                </p>
                <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div
                    className="flex items-center gap-3"
                    style={{ filter: "blur(3.5px)", userSelect: "none", pointerEvents: "none" }}
                  >
                    <div className="relative flex-shrink-0">
                      <svg width="56" height="56" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="20" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                        <circle
                          cx="28" cy="28" r="20"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 20}
                          strokeDashoffset={2 * Math.PI * 20 * (1 - second.avgMatch / 100)}
                          transform="rotate(-90 28 28)"
                          opacity="0.65"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black text-red-600">{second.avgMatch}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {second.emoji} {second.title}
                      </p>
                      <p className="text-xs text-slate-500">Segunda carrera más apta</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm">
                      <span className="text-xs">🔍</span>
                      <span className="text-xs font-semibold text-slate-600">Haz más tests para revelar</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ── Placeholder si no hay datos ── */}
      {(!careerStats || careerStats.length === 0) && !historyLoading && (
        <div className="flex flex-col items-center gap-3 rounded-[2rem] border border-dashed border-slate-200 bg-white p-12 text-center">
          <span className="text-4xl">🏆</span>
          <p className="text-sm font-medium text-slate-500">
            Completa tests vocacionales para desbloquear tu perfil vocacional y badges.
          </p>
        </div>
      )}
    </div>
  );
}
