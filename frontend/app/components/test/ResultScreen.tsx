"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AvatarCustomizer from "@/app/components/avatar/AvatarCustomizer";

type Result = {
  title: string; desc: string;
  match: number; color: string; emoji: string;
  careerKey: string;
};

export default function ResultScreen({
  result, score
}: { result: Result; score: number }) {
  const [displayMatch, setDisplayMatch] = useState(0);
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 2;
      if (start >= result.match) {
        setDisplayMatch(result.match);
        clearInterval(interval);
      } else {
        setDisplayMatch(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [result.match]);

  useEffect(() => {
    const t = setTimeout(() => setShowAvatar(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          textAlign: "center", padding: "2.5rem 2rem",
          background: "rgba(255,255,255,0.96)",
          border: "0.5px solid rgba(255,0,0,0.18)",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          style={{ fontSize: "64px", marginBottom: "1rem" }}
        >
          🎉
        </motion.div>

        <div style={{
          fontSize: "13px", color: "#3a3a3a",
          marginBottom: "8px", letterSpacing: "1px",
          textTransform: "uppercase", fontWeight: 500
        }}>
          Tu carrera ideal es
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "30px", fontWeight: 700, color: "#cc2b2b", marginBottom: "0.5rem" }}
        >
          {result.emoji} {result.title}
        </motion.h2>

        <div style={{
          background: "rgba(255,255,255,0.95)", borderRadius: "12px",
          padding: "1.25rem", margin: "1.25rem 0"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#363636", marginBottom: "8px" }}>
            <span>Compatibilidad con tu perfil</span>
            <span style={{ fontWeight: 700, color: "#FF2B2B", fontSize: "16px" }}>{displayMatch}%</span>
          </div>
          <div style={{ height: "10px", background: "rgba(0,0,0,0.06)", borderRadius: "5px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${displayMatch}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              style={{ height: "100%", borderRadius: "5px", background: "linear-gradient(90deg, #FF2B2B, rgba(255,43,43,0.6))" }}
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: "14px", color: "#5b5b5b", lineHeight: 1.7, marginBottom: "1.5rem" }}
        >
          {result.desc}
        </motion.p>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.95)", border: "0.5px solid rgba(255,0,0,0.18)", borderRadius: "12px", padding: "10px 20px", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "20px" }}>🏆</span>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#cc2b2b" }}>{score} puntos</div>
            <div style={{ fontSize: "11px", color: "#5b5b5b" }}>Puntaje total del test</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = `/roadmap?career=${result.careerKey}`}
            style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #ffb3b3, #ff7f7f)", border: "none", borderRadius: "12px", color: "#1e1e1e", fontSize: "15px", fontWeight: 600, cursor: "pointer" }}
          >
            Ver mi roadmap personalizado →
          </motion.button>

          {/* Botón nuevo del main */}
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.location.href = `/laboratorios?career=${result.careerKey}`}
            style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", border: "none", borderRadius: "12px", color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            🔬 Ver Laboratorio de {result.title}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.location.reload()}
            style={{ width: "100%", padding: "12px", background: "transparent", border: "0.5px solid rgba(170,0,0,0.18)", borderRadius: "12px", color: "#1e1e1e", fontSize: "14px", cursor: "pointer" }}
          >
            🔄 Repetir el test
          </motion.button>
        </div>
      </motion.div>

      {/* Avatar con cosmético de carrera */}
      {showAvatar && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{
            background: "rgba(255,255,255,0.96)",
            border: "0.5px solid rgba(255,0,0,0.12)",
            borderRadius: "20px",
            padding: "1.5rem 1rem",
          }}
        >
          <h3 style={{ textAlign: "center", fontWeight: 700, fontSize: "18px", marginBottom: "4px" }}>
            ¡Tu avatar ha recibido un cosmético!
          </h3>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#5b5b5b", marginBottom: "1rem" }}>
            Personaliza tu avatar y guárdalo con tu cosmético de {result.title}
          </p>
          <AvatarCustomizer careerResult={result.careerKey} />
        </motion.div>
      )}
    </div>
  );
}
