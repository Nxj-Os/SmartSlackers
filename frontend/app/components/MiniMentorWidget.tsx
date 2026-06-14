"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENTOR_API_URL =
  process.env.NEXT_PUBLIC_MENTOR_API_URL || "http://127.0.0.1:8000";

const MINI_CAREERS = [
  { id: "software",   icon: "💻", label: "Software" },
  { id: "medicina",   icon: "🩺", label: "Medicina" },
  { id: "derecho",    icon: "⚖️",  label: "Derecho" },
  { id: "negocios",   icon: "📊", label: "Negocios" },
  { id: "psicologia", icon: "🧠", label: "Psicología" },
  { id: "ingenieria", icon: "🏗️",  label: "Ingeniería" },
] as const;

type MiniMsg = { role: "user" | "assistant"; content: string };

export default function MiniMentorWidget() {
  const [open, setOpen]       = useState(false);
  const [careerId, setCareerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MiniMsg[]>([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && careerId && inputRef.current) inputRef.current.focus();
  }, [open, careerId]);

  const stream = async (msgs: MiniMsg[], career: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${MENTOR_API_URL}/api/mentor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: msgs, careerId: career }),
      });
      if (!res.ok) throw new Error();
      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let content   = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const p = JSON.parse(data);
            if (p.content) {
              content += p.content;
              setMessages([...msgs, { role: "assistant", content }]);
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch { /* silent */ }
    setLoading(false);
  };

  const startChat = (id: string) => {
    setCareerId(id);
    const init: MiniMsg = {
      role: "user",
      content: "Hola, preséntate brevemente y hazme una pregunta para comenzar.",
    };
    setMessages([init]);
    stream([init], id);
  };

  const send = async () => {
    if (!input.trim() || loading || !careerId) return;
    const userMsg: MiniMsg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    await stream(next, careerId);
  };

  const reset = () => {
    setCareerId(null);
    setMessages([]);
    setInput("");
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir Mentor IA"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-[0_8px_32px_rgba(220,38,38,0.45)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="text-base font-bold"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="text-2xl"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
            style={{ height: 480 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-rose-500 px-4 py-3 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-base">
                  🤖
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">Mentor IA</p>
                  <p className="mt-0.5 text-[10px] text-red-100">
                    {careerId
                      ? MINI_CAREERS.find((c) => c.id === careerId)?.label ?? careerId
                      : "Elige una carrera"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {careerId && (
                  <button
                    onClick={reset}
                    title="Cambiar mentor"
                    className="rounded-lg bg-white/15 px-2.5 py-1 text-[10px] font-semibold transition hover:bg-white/25"
                  >
                    ↩ Cambiar
                  </button>
                )}
                <a
                  href="/mentor"
                  className="rounded-lg bg-white/15 px-2.5 py-1 text-[10px] font-semibold transition hover:bg-white/25"
                >
                  Completo →
                </a>
              </div>
            </div>

            {/* Selector de carrera */}
            {!careerId ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-5">
                <p className="text-center text-sm font-semibold text-slate-700">
                  ¿Con qué mentor quieres practicar?
                </p>
                <div className="grid w-full grid-cols-3 gap-2">
                  {MINI_CAREERS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => startChat(c.id)}
                      className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 p-3 text-center text-xs font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  Para más funciones usa el mentor completo
                </p>
              </div>
            ) : (
              <>
                {/* Mensajes (saltamos el primer user msg de inicialización) */}
                <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
                  {messages.slice(1).map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                          m.role === "user"
                            ? "rounded-br-sm bg-gradient-to-br from-red-500 to-rose-500 text-white"
                            : "rounded-bl-sm bg-slate-100 text-slate-800"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-3">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-slate-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2.5">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                    placeholder="Responde al mentor..."
                    disabled={loading}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-red-400 focus:ring-1 focus:ring-red-100 disabled:opacity-50"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || loading}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white shadow disabled:opacity-40"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
