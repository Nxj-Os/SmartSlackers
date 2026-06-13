"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(220,38,38,0.12) 0%, transparent 40%), radial-gradient(circle at bottom right, rgba(244,63,94,0.10) 0%, transparent 40%), linear-gradient(180deg,#fff5f5 0%,#fef2f2 100%)",
      }}
    >
      {/* Blob decorativo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      {/* Logo */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mb-10 flex items-center gap-2.5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white text-sm font-black shadow-lg shadow-red-500/30">
          VT
        </div>
        <div className="text-left leading-none">
          <p className="text-base font-extrabold text-slate-900">Vocatio</p>
          <p className="text-[10px] text-slate-400">Tu camino, tu futuro.</p>
        </div>
      </motion.a>

      {/* 404 grande */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
        className="relative z-10 select-none"
      >
        <p
          className="font-black leading-none text-transparent"
          style={{
            fontSize: "clamp(100px,22vw,180px)",
            WebkitTextStroke: "3px #dc2626",
            opacity: 0.08,
            userSelect: "none",
          }}
        >
          404
        </p>
        <motion.p
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: "clamp(72px,15vw,130px)" }}
        >
          🗺️
        </motion.p>
      </motion.div>

      {/* Mensaje */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-2 max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          ¡Esta página no existe!
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-1">
          Parece que te perdiste en tu camino vocacional{dots}
        </p>
        <p className="text-slate-400 text-xs mb-8">
          La ruta{" "}
          <code className="rounded bg-red-50 px-1.5 py-0.5 text-red-600 font-mono text-xs border border-red-100">
            {typeof window !== "undefined" ? window.location.pathname : ""}
          </code>{" "}
          no existe en Vocatio.
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="/"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            style={{
              background: "linear-gradient(135deg,#dc2626,#f87171)",
              boxShadow: "0 8px 24px rgba(220,38,38,0.25)",
            }}
          >
            🏠 Volver al inicio
          </motion.a>
        
        </div>
      </motion.div>

      {/* Links útiles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {[
          { href: "/carreras", label: "Explorar Carreras" },
          { href: "/simular", label: "Simular Carrera" },
          { href: "/comunidad", label: "Comunidad" },
          { href: "/mentor", label: "Mentor IA" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs text-slate-400 hover:text-red-600 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </main>
  );
}
