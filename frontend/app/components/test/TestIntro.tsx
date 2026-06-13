"use client";
import { motion } from "framer-motion";

export default function TestIntro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: "center", maxWidth: "520px", width: "100%",
        padding: "2.5rem 2rem",
        background: "rgba(255,255,255,0.95)",
        border: "0.5px solid rgba(255,0,0,0.2)",
        borderRadius: "20px",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(255,0,0,0.12)", border: "0.5px solid rgba(255,0,0,0.25)",
          color: "#2d2d2d", fontSize: "12px", fontWeight: 500,
          padding: "4px 14px", borderRadius: "20px", marginBottom: "1.5rem"
        }}
      >
        ✨ Test Vocacional
      </motion.div>

      {/* Emoji animado */}
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        style={{ fontSize: "64px", marginBottom: "1rem", display: "block" }}
      >
        🎯
      </motion.div>

      <h1 style={{
        fontSize: "28px", fontWeight: 600, color: "#1e1e1e",
        marginBottom: "12px", lineHeight: 1.3
      }}>
        Descubre tu carrera ideal
      </h1>

      <p style={{
        fontSize: "15px", color: "#5c5c5c", lineHeight: 1.7,
        marginBottom: "2rem"
      }}>
        10 preguntas · 20 segundos cada una · Resultado con IA
        <br />
        Responde rapido — el tiempo suma puntos extra.
      </p>

      {/* Stats row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
        gap: "10px", marginBottom: "2rem"
      }}>
        {[
          { icon: "⚡", label: "10 preguntas", sub: "Rápido y preciso" },
          { icon: "🏆", label: "Sistema de pts", sub: "Velocidad = bonus" },
          { icon: "🤖", label: "Análisis IA", sub: "Resultado único" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "0.5px solid rgba(255,0,0,0.15)",
              borderRadius: "12px", padding: "12px 8px"
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#2d2d2d" }}>{s.label}</div>
            <div style={{ fontSize: "11px", color: "#d74f4f", marginTop: "2px" }}>{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Botón start */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        style={{
          width: "100%", padding: "15px",
          background: "linear-gradient(135deg, #ffb3b3, #ff7f7f)",
          border: "none", borderRadius: "12px",
          color: "#1e1e1e", fontSize: "16px", fontWeight: 600,
          cursor: "pointer", letterSpacing: "0.3px"
        }}
      >
        🚀 Comenzar el test
      </motion.button>

      <p style={{ fontSize: "11px", color: "#7a7a7a", marginTop: "12px" }}>
        Tus respuestas son confidenciales y solo se usan para tu perfil vocacional.
      </p>
    </motion.div>
  );
}