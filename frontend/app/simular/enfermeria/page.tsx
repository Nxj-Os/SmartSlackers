"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useSimulationBadge } from "@/src/hooks/useSimulationBadge";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { saveSimulationResult } from "@/src/services/simulationService";

type GamePhase = "briefing" | "vitals" | "medication" | "emergency" | "care" | "result";
const PHASE_ORDER: GamePhase[] = ["briefing", "vitals", "medication", "emergency", "care", "result"];

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i, x: parseFloat((Math.random() * 100).toFixed(2)), y: parseFloat((Math.random() * 100).toFixed(2)),
  size: parseFloat((Math.random() * 2 + 0.5).toFixed(1)), opacity: parseFloat((Math.random() * 0.1 + 0.03).toFixed(2)),
  dur: 5 + Math.random() * 6, delay: Math.random() * 4,
}));

const VITAL_CASES = [
  {
    patient: "Paciente: Mujer 72 años, ingresa por dolor abdominal. Presión 90/60, pulso 110, temp 38.5°C.",
    options: ["Signos estables, continuar observación", "Posible sepsis, iniciar protocolo de emergencia", "Solo dar antitérmico y esperar"],
    correct: 1,
  },
  {
    patient: "Paciente: Hombre 45 años, post-operatorio de apendicitis. SatO2 94%, dolor 3/10, herida sin signos de infección.",
    options: ["Alta médica programada para mañana", "Reintervención urgente", "Traslado a UCI inmediato"],
    correct: 0,
  },
  {
    patient: "Paciente: Niño 5 años, crisis asmática. Frecuencia respiratoria 40 rpm, SatO2 88%, no responde a broncodilatador.",
    options: ["Administrar más broncodilatador y esperar", "Activar código de emergencia — insuficiencia respiratoria", "Dar corticoides orales y observar"],
    correct: 1,
  },
];

const MEDICATIONS = [
  { med: "Paracetamol", dosis: "500 mg cada 6h", via: "VO", indicacion: "Dolor leve a moderado, fiebre" },
  { med: "Amoxicilina", dosis: "875 mg cada 12h", via: "VO", indicacion: "Infección bacteriana" },
  { med: "Omeprazol", dosis: "20 mg cada 24h", via: "VO", indicacion: "Protección gástrica" },
  { med: "Enoxaparina", dosis: "40 mg cada 24h", via: "SC", indicacion: "Prevención de TVP" },
  { med: "Morfina", dosis: "2-5 mg cada 4h", via: "EV", indicacion: "Dolor severo" },
];

const EMERGENCY_STEPS = [
  { id: 0, text: "Evaluar escena y seguridad", order: 0 },
  { id: 1, text: "Comprobar conciencia y respiración", order: 1 },
  { id: 2, text: "Llamar al código de emergencia", order: 2 },
  { id: 3, text: "Iniciar RCP 30:2 si no responde", order: 3 },
  { id: 4, text: "Aplicar DEA si disponible", order: 4 },
  { id: 5, text: "Trasladar a unidad de cuidados intensivos", order: 5 },
];

const CARE_SCENARIOS = [
  {
    patient: "Paciente post-quirúrgico: Dolor 8/10, temblor, ansiedad. Signos vitales estables.",
    options: [
      "Administrar analgesia según prescripción y brindar apoyo emocional",
      "Ignorar el dolor, es normal después de cirugía",
      "Llamar al cirujano inmediatamente",
    ],
    correct: 0,
  },
  {
    patient: "Familiar de paciente te pregunta: '¿Mi mamá va a estar bien?' con angustia.",
    options: [
      "'Está en buenas manos, explícame qué te preocupa y te explico su evolución'",
      "'No se preocupe, todo va a estar bien' sin dar detalles",
      "'Tengo que atender a otro paciente, pregúntele al médico'",
    ],
    correct: 0,
  },
];

function ScoreBar({ phase, scores }: { phase: string; scores: number[] }) {
  const phases = ["vitals", "medication", "emergency", "care"];
  return (
    <div className="flex items-center gap-1 w-32">
      {phases.map((p, i) => (
        <div key={p} className="h-1.5 flex-1 rounded-full transition-all"
          style={{ background: scores[i] !== undefined ? scores[i] >= 20 ? "#4ade80" : scores[i] >= 10 ? "#2dd4bf" : "#f87171" : phase === p ? "rgba(45,212,191,0.7)" : "rgba(255,255,255,0.15)" }} />
      ))}
    </div>
  );
}

function VitalsGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const doneRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (pts: number) => {
    const ns = score + pts;
    setScore(ns);
    if (current >= 2) {
      if (!doneRef.current) { doneRef.current = true; setTimeout(() => onComplete(Math.min(ns, 25)), 1100); }
    } else {
      setTimeout(() => { setCurrent(c => c + 1); setFeedback(null); setTimeLeft(12); }, 1000);
    }
  };

  useEffect(() => {
    if (doneRef.current || feedback !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setFeedback(-1); advance(0); return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, feedback]);

  const handle = (idx: number) => {
    if (feedback !== null || doneRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setFeedback(idx);
    advance(idx === VITAL_CASES[current].correct ? 9 : 1);
  };

  const c = VITAL_CASES[current];
  return (
    <div className="flex flex-col items-center gap-5 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-teal-300 text-xs uppercase tracking-widest mb-1">Evaluación de Signos — {current + 1}/3</p>
        <h2 className="text-white text-xl font-black">¿Cuál es tu evaluación?</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-28 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-teal-400 rounded-full" style={{ width: `${(timeLeft / 12) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
        <span className="text-teal-300/60 text-sm">{timeLeft}s</span>
      </div>
      <motion.div key={current} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/5 border border-teal-500/20 rounded-2xl p-5">
        <div className="flex gap-3 items-start">
          <span className="text-3xl shrink-0">🩺</span>
          <p className="text-white/90 text-sm leading-relaxed">{c.patient}</p>
        </div>
      </motion.div>
      <div className="w-full space-y-2">
        {c.options.map((opt, i) => {
          let bg = "rgba(45,212,191,0.1)"; let border = "rgba(45,212,191,0.25)";
          if (feedback !== null) {
            if (i === c.correct) { bg = "rgba(74,222,128,0.2)"; border = "#4ade80"; }
            else if (i === feedback) { bg = "rgba(248,113,113,0.15)"; border = "#f87171"; }
          }
          return (
            <motion.button key={i} onClick={() => handle(i)} whileHover={feedback === null ? { scale: 1.02 } : {}}
              className="w-full rounded-xl px-4 py-3 text-white text-sm font-medium border-2 text-left transition-colors"
              style={{ background: bg, borderColor: border }}>
              {opt}
            </motion.button>
          );
        })}
      </div>
      {feedback !== null && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`font-bold text-sm ${feedback === c.correct ? "text-green-400" : "text-teal-300"}`}>
          {feedback === c.correct ? "✅ Evaluación correcta" : `💡 La respuesta adecuada es: ${c.options[c.correct]}`}
        </motion.p>
      )}
    </div>
  );
}

function MedicationGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [shuffled, setShuffled] = useState<{ id: string; text: string; pairId: number; type: string; matched: boolean }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const all = MEDICATIONS.flatMap((m, i) => [
      { id: `m${i}`, text: `${m.med} (${m.via})`, pairId: i, type: "med" },
      { id: `i${i}`, text: m.indicacion, pairId: i, type: "ind" },
    ]);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    setShuffled(all.map(a => ({ ...a, matched: false })));
  }, []);

  const handleCard = (idx: number) => {
    const card = shuffled[idx];
    if (card.matched || doneRef.current) return;
    if (selected === null) { setSelected(idx); return; }
    if (selected === idx) { setSelected(null); return; }
    const first = shuffled[selected];
    if (first.pairId === card.pairId && first.type !== card.type) {
      const next = [...shuffled];
      next[selected] = { ...next[selected], matched: true };
      next[idx] = { ...next[idx], matched: true };
      setShuffled(next);
      setSelected(null);
      const allMatched = next.every(c => c.matched);
      if (allMatched && !doneRef.current) {
        doneRef.current = true;
        const pts = Math.max(5, 25 - errors * 3);
        setTimeout(() => onComplete(pts), 600);
      }
    } else {
      setErrors(e => e + 1);
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-teal-300 text-xs uppercase tracking-widest mb-1">Farmacología — Relaciona</p>
        <h2 className="text-white text-xl font-black">Empareja medicamento con indicación</h2>
        <p className="text-white/60 text-xs mt-1">❌ {errors} errores</p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {shuffled.map((card, i) => (
          <motion.button key={card.id} onClick={() => handleCard(i)} whileHover={!card.matched ? { scale: 1.03 } : {}}
            className="rounded-xl px-3 py-2.5 text-xs font-medium border-2 transition-all text-left"
            style={{
              background: card.matched ? "rgba(74,222,128,0.15)" : selected === i ? "rgba(45,212,191,0.25)" : "rgba(255,255,255,0.06)",
              borderColor: card.matched ? "#4ade80" : selected === i ? "#2dd4bf" : "rgba(255,255,255,0.12)",
              color: card.matched ? "#4ade80" : "white",
            }}>
            {card.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function EmergencyGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [order, setOrder] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  const handle = (id: number) => {
    if (done || order.includes(id)) return;
    const step = order.length;
    const expected = EMERGENCY_STEPS.find(s => s.order === step)!.id;
    if (id === expected) {
      const no = [...order, id];
      setOrder(no);
      if (no.length === EMERGENCY_STEPS.length && !doneRef.current) {
        doneRef.current = true; setDone(true);
        setTimeout(() => onComplete(Math.max(5, 25 - mistakes * 4)), 800);
      }
    } else {
      setMistakes(m => m + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4 max-w-md mx-auto">
      <div className="text-center">
        <p className="text-teal-300 text-xs uppercase tracking-widest mb-1">Emergencia</p>
        <h2 className="text-white text-xl font-black">Protocolo de Emergencia</h2>
        <p className="text-white/60 text-sm">Ordena los pasos del protocolo de atención</p>
      </div>
      <div className="flex gap-3 text-sm">
        <span className="text-teal-300">{order.length}/6 pasos</span>
        <span className="text-red-400">❌ {mistakes} errores</span>
      </div>
      <div className="w-full bg-white/5 border border-teal-500/20 rounded-xl p-4">
        <p className="text-teal-300 text-xs font-bold uppercase mb-3">Protocolo ejecutado:</p>
        <div className="space-y-1.5 min-h-12">
          {order.map((id, i) => {
            const step = EMERGENCY_STEPS.find(s => s.id === id)!;
            return (
              <motion.div key={id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 bg-teal-500/10 border border-teal-400/20 rounded-lg px-3 py-1.5">
                <span className="text-teal-400 text-xs font-bold w-4">{i + 1}.</span>
                <span className="text-white text-xs">{step.text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="w-full space-y-2">
        {EMERGENCY_STEPS.map(step => {
          const placed = order.includes(step.id);
          const isNext = order.length === step.order;
          return (
            <motion.button key={step.id} onClick={() => handle(step.id)} disabled={placed || done}
              whileHover={!placed && !done ? { scale: 1.02 } : {}}
              className="w-full text-left rounded-xl p-3 border-2 text-sm transition-all"
              style={{
                background: placed ? "rgba(74,222,128,0.1)" : "rgba(45,212,191,0.1)",
                borderColor: placed ? "#4ade80" : isNext ? "#2dd4bf" : "rgba(45,212,191,0.25)",
                opacity: placed ? 0.5 : 1, color: placed ? "#4ade80" : "white",
              }}>
              {placed ? "✅" : isNext ? "▶" : "○"} {step.text}
            </motion.button>
          );
        })}
      </div>
      {done && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 font-black">🩺 ¡Protocolo ejecutado correctamente!</motion.p>}
    </div>
  );
}

function CareGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<number | null>(null);
  const doneRef = useRef(false);

  const handle = (idx: number) => {
    if (feedback !== null || doneRef.current) return;
    setFeedback(idx);
    const correct = idx === CARE_SCENARIOS[current].correct;
    const ns = score + (correct ? 13 : 1);
    setScore(ns);
    if (current >= 1) {
      if (!doneRef.current) { doneRef.current = true; setTimeout(() => onComplete(Math.min(ns, 25)), 1100); }
    } else {
      setTimeout(() => { setCurrent(c => c + 1); setFeedback(null); }, 1100);
    }
  };

  const sc = CARE_SCENARIOS[current];
  return (
    <div className="flex flex-col items-center gap-5 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-teal-300 text-xs uppercase tracking-widest mb-1">Cuidado del Paciente — {current + 1}/2</p>
        <h2 className="text-white text-xl font-black">¿Cómo actúas?</h2>
      </div>
      <motion.div key={current} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/5 border border-teal-500/20 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-3xl shrink-0">❤️</span>
          <p className="text-white/90 text-sm leading-relaxed italic">{sc.patient}</p>
        </div>
      </motion.div>
      <div className="w-full space-y-2">
        {sc.options.map((opt, i) => {
          let bg = "rgba(45,212,191,0.1)"; let border = "rgba(45,212,191,0.25)";
          if (feedback !== null) {
            if (i === sc.correct) { bg = "rgba(74,222,128,0.2)"; border = "#4ade80"; }
            else if (i === feedback && i !== sc.correct) { bg = "rgba(248,113,113,0.15)"; border = "#f87171"; }
          }
          return (
            <motion.button key={i} onClick={() => handle(i)} whileHover={feedback === null ? { scale: 1.02 } : {}}
              className="w-full rounded-xl px-4 py-3 text-white text-sm border-2 text-left transition-colors"
              style={{ background: bg, borderColor: border }}>
              {opt}
            </motion.button>
          );
        })}
      </div>
      {feedback !== null && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`text-sm font-bold ${feedback === sc.correct ? "text-green-400" : "text-teal-300"}`}>
          {feedback === sc.correct ? "✅ Excelente cuidado de enfermería" : "💡 Una enfermera combina técnica con empatía."}
        </motion.p>
      )}
    </div>
  );
}

function ResultScreen({ scores }: { scores: number[] }) {
  const total = scores.reduce((a, b) => a + b, 0);
  const pct = Math.round((total / 100) * 100);
  const rank = pct >= 85 ? "Enfermero Jefe" : pct >= 65 ? "Enfermero Certificado" : pct >= 40 ? "Enfermero de Planta" : "Estudiante de Enfermería";
  const color = pct >= 85 ? "#4ade80" : pct >= 65 ? "#2dd4bf" : pct >= 40 ? "#60a5fa" : "#f87171";
  const phases = ["Signos Vitales", "Medicación", "Emergencia", "Cuidado"];
  const circ = 2 * Math.PI * 50;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        await saveSimulationResult(user.uid, "enfermeria", pct, rank, {
          vitals: scores[0] ?? 0,
          medication: scores[1] ?? 0,
          emergency: scores[2] ?? 0,
          care: scores[3] ?? 0,
        });
      } catch { /* silent */ }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 max-w-sm mx-auto">
      <p className="text-teal-300 text-xs uppercase tracking-widest">Evaluación de Enfermería</p>
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
          <motion.circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - pct / 100) }} transition={{ duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{pct}%</span>
          <span className="text-white/50 text-xs">cuidado clínico</span>
        </div>
      </div>
      <p className="text-2xl font-black text-center" style={{ color }}>🩹 {rank}</p>
      <div className="w-full space-y-2">
        {phases.map((name, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-white/60 text-sm w-28 shrink-0">{name}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: (scores[i] ?? 0) >= 20 ? "#4ade80" : (scores[i] ?? 0) >= 12 ? "#2dd4bf" : "#f87171" }}
                initial={{ width: 0 }} animate={{ width: `${((scores[i] ?? 0) / 25) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.15 }} />
            </div>
            <span className="text-white font-bold text-sm w-10 text-right">{scores[i] ?? 0}/25</span>
          </div>
        ))}
      </div>
      <button onClick={() => { window.location.href = "/simular"; }} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition">
        ← Volver al simulador
      </button>
    </div>
  );
}

export default function EnfermeriaPage() {
  const [phase, setPhase] = useState<GamePhase>("briefing");
  const [scores, setScores] = useState<number[]>([]);
  useSimulationBadge(phase);

  const advance = (score: number) => {
    setScores(s => [...s, score]);
    setPhase(PHASE_ORDER[PHASE_ORDER.indexOf(phase) + 1]);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(135deg,#021a19 0%,#0d3d39 60%,#021a19 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute rounded-full bg-teal-400"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
        ))}
      </div>
      <Navbar variant="dark" title="🩹 Enfermería — Cuidados Intensivos" backHref="/simular" rightSlot={<ScoreBar phase={phase} scores={scores} />} />
      <div className="relative max-w-lg mx-auto py-8">
        <AnimatePresence mode="wait">
          {phase === "briefing" && (
            <motion.div key="b" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 px-4 text-center">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-8xl">🩹</motion.div>
              <h1 className="text-white text-3xl font-black">Cuidados Intensivos</h1>
              <p className="text-white/70 text-lg">Eres enfermero en un hospital. Tus pacientes dependen de ti.</p>
              <div className="w-full bg-white/5 border border-teal-500/20 rounded-2xl p-5 text-left space-y-3">
                {["🩺 Evalúa signos vitales y toma decisiones críticas", "💊 Relaciona medicamentos con sus indicaciones", "🚨 Ejecuta el protocolo de emergencia en orden", "❤️ Brinda cuidado empático a pacientes y familias"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 text-sm"><span className="text-white/40 text-xs w-4">{i + 1}.</span>{t}</div>
                ))}
              </div>
              <motion.button onClick={() => setPhase("vitals")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-2xl text-white text-xl font-black" style={{ background: "linear-gradient(135deg,#0d9488,#2dd4bf)" }}>
                🩹 Iniciar Turno
              </motion.button>
            </motion.div>
          )}
          {phase === "vitals" && <motion.div key="v" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><VitalsGame onComplete={advance} /></motion.div>}
          {phase === "medication" && <motion.div key="m" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><MedicationGame onComplete={advance} /></motion.div>}
          {phase === "emergency" && <motion.div key="e" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><EmergencyGame onComplete={advance} /></motion.div>}
          {phase === "care" && <motion.div key="c" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><CareGame onComplete={advance} /></motion.div>}
          {phase === "result" && <motion.div key="r" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}><ResultScreen scores={scores} /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
