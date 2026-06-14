"use client";
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { loadAvatar } from "@/src/services/avatarService";
import type { AvatarConfig } from "@/types/avatar";
import { useTestLogic, TEST_SESSION_KEY } from "../components/test/useTestLogic";
import TestIntro from "../components/test/TestIntro";
import QuestionCard from "../components/test/QuestionCard";
import ResultScreen from "../components/test/ResultScreen";
import Navbar from "@/components/Navbar";
import DinosaurSVG from "@/app/components/avatar/DinosaurSVG";
import AvatarSVG from "@/app/components/avatar/AvatarSVG";
import { motion, AnimatePresence } from "framer-motion";

type SavedSession = { answers: string[]; current: number; score: number; savedAt: number };

export default function TestPage() {
  const logic = useTestLogic();
  const [savedSession, setSavedSession]   = useState<SavedSession | null>(null);
  const [avatarConfig, setAvatarConfig]   = useState<AvatarConfig | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Detecta sesión en progreso al cargar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TEST_SESSION_KEY);
      if (!raw) return;
      const data: SavedSession = JSON.parse(raw);
      if (Array.isArray(data.answers) && data.answers.length > 0 && data.current < 10) {
        setSavedSession(data);
      }
    } catch (err) {
      console.error("[TestPage] Failed to parse saved session:", err);
      localStorage.removeItem(TEST_SESSION_KEY);
    }
  }, []);

  // Carga avatar del usuario para el banner "en progreso"
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      loadAvatar(user.uid)
        .then((saved) => { if (saved) setAvatarConfig(saved.config); })
        .catch((err) => console.error("[TestPage] Failed to load avatar:", err));
    });
    return () => unsub();
  }, []);

  const handleResume = () => {
    if (!savedSession) return;
    logic.resumeTest(savedSession.answers, savedSession.current, savedSession.score);
    setSavedSession(null);
  };

  const handleStart = () => {
    setSavedSession(null);
    logic.startTest();
  };

  const handleExitConfirm = useCallback(() => {
    setShowExitModal(false);
    window.location.href = "/";
  }, []);

  const isInProgress = logic.phase === "question" || logic.phase === "feedback";

  const isDino = !avatarConfig || (avatarConfig.avatarType ?? "dino") === "dino";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff2f2_0%,#fff6f5_45%,#faf5f5_100%)]">
      <Navbar />

      {/* ── Botón "Salir" visible durante el test ── */}
      <AnimatePresence>
        {isInProgress && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExitModal(true)}
            className="fixed top-[70px] right-4 z-50 flex items-center gap-1.5 py-1.5 px-3.5 bg-white/92 border border-red-500/20 rounded-[20px] text-[#cc2b2b] text-[13px] font-semibold cursor-pointer backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          >
            ✕ Salir del test
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal de confirmación de salida ── */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/45 flex items-center justify-center p-4"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/98 rounded-[20px] py-8 px-7 max-w-[380px] w-full text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
            >
              {/* Avatar con punto pulsante */}
              <div className="relative inline-block mb-4">
                {isDino
                  ? <DinosaurSVG size={80} />
                  : <AvatarSVG config={avatarConfig!} size={80} />
                }
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 flex items-center justify-center">
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-amber-500 opacity-75 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1e1e1e] mb-2">
                ¿Salir del test?
              </h3>
              <p className="text-[13px] text-[#5c5c5c] leading-[1.6] mb-1.5">
                Tu progreso está guardado en la pregunta{" "}
                <strong className="text-[#cc2b2b]">{logic.current + 1} de {logic.total}</strong>.
              </p>
              <p className="text-xs text-[#888] mb-5">
                Puedes continuar desde tu perfil o desde la pantalla de inicio del test.
              </p>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 p-3 bg-[linear-gradient(135deg,#ffb3b3,#ff7f7f)] border-0 rounded-xl text-[#1e1e1e] font-bold text-sm cursor-pointer"
                >
                  Continuar test
                </button>
                <button
                  onClick={handleExitConfirm}
                  className="flex-1 p-3 bg-transparent border border-black/15 rounded-xl text-[#5c5c5c] font-semibold text-sm cursor-pointer"
                >
                  Salir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-57px)]">
        {logic.phase === "intro" ? (
          <TestIntro
            onStart={handleStart}
            hasSession={!!savedSession}
            sessionProgress={savedSession ? { current: savedSession.current, total: 10 } : undefined}
            onResume={handleResume}
            avatarConfig={avatarConfig}
          />
        ) : isInProgress ? (
          <QuestionCard
            question={logic.question}
            current={logic.current}
            total={logic.total}
            timeLeft={logic.timeLeft}
            selected={logic.selected}
            score={logic.score}
            onAnswer={logic.handleAnswer}
          />
        ) : logic.phase === "result" ? (
          <ResultScreen result={logic.getResult()} score={logic.score} answers={logic.answers} />
        ) : null}
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
