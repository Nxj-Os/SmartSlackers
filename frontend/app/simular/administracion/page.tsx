"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useSimulationBadge } from "@/src/hooks/useSimulationBadge";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { saveSimulationResult } from "@/src/services/simulationService";

type GamePhase = "briefing" | "strategy" | "finance" | "negotiation" | "leadership" | "result";
const PHASE_ORDER: GamePhase[] = ["briefing", "strategy", "finance", "negotiation", "leadership", "result"];

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i, x: parseFloat((Math.random() * 100).toFixed(2)), y: parseFloat((Math.random() * 100).toFixed(2)),
  size: parseFloat((Math.random() * 2 + 0.5).toFixed(1)), opacity: parseFloat((Math.random() * 0.1 + 0.03).toFixed(2)),
  dur: 5 + Math.random() * 6, delay: Math.random() * 4,
}));

const STRATEGY_CASES = [
  {
    scenario: "Tu empresa de retail tiene 3 ubicaciones. Una está perdiendo dinero, otra es estable, la tercera crece 25% anual. Tienes S/. 500,000 para invertir.",
    options: [
      "Cerrar la que pierde y duplicar la apuesta en la que crece",
      "Renovar las 3 con un plan de expansión conservador",
      "Vender las 3 y empezar un negocio online desde cero",
    ],
    correct: 0,
  },
  {
    scenario: "Un competidor acaba de lanzar un producto similar al tuyo pero 20% más barato. Tu producto tiene mejor calidad pero tu margen es reducido.",
    options: [
      "Diferenciar con calidad y servicio, mantener precio",
      "Igualar el precio para no perder mercado",
      "Lanzar una campaña agresiva contra el competidor",
    ],
    correct: 0,
  },
  {
    scenario: "Tu equipo está quemado. 3 personas renunciaron este mes. Los proyectos se acumulan pero las contrataciones tardan 2 meses.",
    options: [
      "Priorizar proyectos, redistribuir carga y contratar temporal",
      "Exigir horas extra para cumplir con todo",
      "Congelar proyectos nuevos y descansar 2 semanas",
    ],
    correct: 0,
  },
];

const FINANCE_PAIRS = [
  { term: "ROI", def: "Retorno sobre inversión" },
  { term: "EBITDA", def: "Ganancias antes de intereses, impuestos y amortización" },
  { term: "Flujo de caja", def: "Dinero neto que genera la empresa" },
  { term: "Break-even", def: "Punto donde ingresos = gastos" },
  { term: "Margen neto", def: "Ganancia después de todo gasto" },
];

const NEGOTIATION_OPENERS = [
  { offer: "El proveedor te ofrece S/. 50 la unidad. Tu presupuesto máximo es S/. 38.", hint: "Pide un descuento por volumen", correct: "volumen" },
  { offer: "El cliente quiere pagar en 90 días pero necesitas liquidez en 30.", hint: "Ofrece un descuento por pago anticipado", correct: "descuento" },
  { offer: "Tu socio quiere 60% de la nueva empresa pero tú pusiste 70% del capital.", hint: "Propón una estructura basada en aporte", correct: "aporte" },
];

const LEADERSHIP_TASKS = [
  { task: "Preparar reporte trimestral para directorio", urgent: true, important: true },
  { task: "Responder correos pendientes de clientes", urgent: false, important: true },
  { task: "Organizar la base de datos del equipo", urgent: false, important: false },
  { task: "Atender reclamo de un cliente furioso", urgent: true, important: true },
  { task: "Actualizar perfiles de LinkedIn del equipo", urgent: false, important: false },
  { task: "Revisar propuesta de nuevo proyecto", urgent: true, important: true },
  { task: "Comprar café para la oficina", urgent: false, important: false },
  { task: "Llamar a un cliente potencial importante", urgent: true, important: true },
];

function ScoreBar({ phase, scores }: { phase: string; scores: number[] }) {
  const phases = ["strategy", "finance", "negotiation", "leadership"];
  return (
    <div className="flex items-center gap-1 w-32">
      {phases.map((p, i) => (
        <div key={p} className="h-1.5 flex-1 rounded-full transition-all"
          style={{ background: scores[i] !== undefined ? scores[i] >= 20 ? "#4ade80" : scores[i] >= 10 ? "#818cf8" : "#f87171" : phase === p ? "rgba(129,140,248,0.7)" : "rgba(255,255,255,0.15)" }} />
      ))}
    </div>
  );
}

function StrategyGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<number | null>(null);
  const doneRef = useRef(false);

  const handle = (idx: number) => {
    if (feedback !== null || doneRef.current) return;
    setFeedback(idx);
    const correct = idx === STRATEGY_CASES[current].correct;
    const ns = score + (correct ? 9 : 1);
    setScore(ns);
    if (current >= 2) {
      if (!doneRef.current) { doneRef.current = true; setTimeout(() => onComplete(Math.min(ns, 25)), 1100); }
    } else {
      setTimeout(() => { setCurrent(c => c + 1); setFeedback(null); }, 1100);
    }
  };

  const sc = STRATEGY_CASES[current];
  return (
    <div className="flex flex-col items-center gap-5 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-indigo-300 text-xs uppercase tracking-widest mb-1">CEO — Estrategia {current + 1}/3</p>
        <h2 className="text-white text-xl font-black">¿Qué decisión tomas?</h2>
      </div>
      <motion.div key={current} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/5 border border-indigo-500/20 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-3xl shrink-0">🏢</span>
          <p className="text-white/90 text-sm leading-relaxed">{sc.scenario}</p>
        </div>
      </motion.div>
      <div className="w-full space-y-2">
        {sc.options.map((opt, i) => {
          let bg = "rgba(99,102,241,0.1)"; let border = "rgba(99,102,241,0.25)";
          if (feedback !== null) {
            if (i === sc.correct) { bg = "rgba(74,222,128,0.2)"; border = "#4ade80"; }
            else if (i === feedback && i !== sc.correct) { bg = "rgba(248,113,113,0.15)"; border = "#f87171"; }
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
          className={`text-sm font-bold ${feedback === sc.correct ? "text-green-400" : "text-indigo-300"}`}>
          {feedback === sc.correct ? "✅ Buena decisión estratégica" : `💡 Lo óptimo era: ${sc.options[sc.correct]}`}
        </motion.p>
      )}
    </div>
  );
}

interface CardItem {
  id: string; text: string; pairId: number; type: "term" | "def"; matched: boolean;
}

function FinanceGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [shuffled, setShuffled] = useState<CardItem[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const all: CardItem[] = FINANCE_PAIRS.flatMap((p, i) => [
      { id: `t${i}`, text: p.term, pairId: i, type: "term", matched: false },
      { id: `d${i}`, text: p.def, pairId: i, type: "def", matched: false },
    ]);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    setShuffled(all);
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
        <p className="text-indigo-300 text-xs uppercase tracking-widest mb-1">Finanzas — Relaciona conceptos</p>
        <h2 className="text-white text-xl font-black">Empareja término con definición</h2>
        <p className="text-white/60 text-xs mt-1">❌ {errors} errores</p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {shuffled.map((card, i: number) => (
          <motion.button key={card.id} onClick={() => handleCard(i)} whileHover={!card.matched ? { scale: 1.03 } : {}}
            className="rounded-xl px-3 py-2.5 text-xs font-medium border-2 transition-all text-left"
            style={{
              background: card.matched ? "rgba(74,222,128,0.15)" : selected === i ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)",
              borderColor: card.matched ? "#4ade80" : selected === i ? "#818cf8" : "rgba(255,255,255,0.12)",
              color: card.matched ? "#4ade80" : "white",
            }}>
            {card.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function NegotiationGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const doneRef = useRef(false);

  const handleSubmit = () => {
    if (feedback !== null || doneRef.current) return;
    const correct = input.toLowerCase().includes(NEGOTIATION_OPENERS[current].correct);
    setFeedback(correct ? "correct" : "wrong");
    const ns = score + (correct ? 9 : 1);
    setScore(ns);
    if (current >= 2) {
      if (!doneRef.current) { doneRef.current = true; setTimeout(() => onComplete(Math.min(ns, 25)), 1100); }
    } else {
      setTimeout(() => { setCurrent(c => c + 1); setFeedback(null); setInput(""); }, 1300);
    }
  };

  const nc = NEGOTIATION_OPENERS[current];
  return (
    <div className="flex flex-col items-center gap-5 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-indigo-300 text-xs uppercase tracking-widest mb-1">Negociación — {current + 1}/3</p>
        <h2 className="text-white text-xl font-black">¿Cómo negocias?</h2>
      </div>
      <motion.div key={current} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="w-full bg-white/5 border border-indigo-500/20 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-3xl shrink-0">🤝</span>
          <div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">{nc.offer}</p>
            <p className="text-indigo-300/80 text-xs italic">💡 Pista: {nc.hint}</p>
          </div>
        </div>
      </motion.div>
      <div className="w-full flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
          className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/5 border border-indigo-500/30 text-white outline-none focus:border-indigo-400"
          placeholder="Escribe tu estrategia..." disabled={feedback !== null} />
        <motion.button onClick={handleSubmit} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}
          disabled={!input.trim() || feedback !== null}>
          Enviar
        </motion.button>
      </div>
      {feedback !== null && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`text-sm font-bold ${feedback === "correct" ? "text-green-400" : "text-indigo-300"}`}>
          {feedback === "correct" ? "✅ ¡Buena estrategia!" : "Sigue intentando..."}
        </motion.p>
      )}
    </div>
  );
}

function LeadershipGame({ onComplete }: { onComplete: (s: number) => void }) {
  const [order, setOrder] = useState<number[]>([]);
  const [score, setScore] = useState(25);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  const handleTask = (idx: number) => {
    if (done || order.includes(idx)) return;
    const step = order.length;
    const task = LEADERSHIP_TASKS[idx];
    const isCorrect = task.urgent && task.important;
    if (step < 4 && isCorrect) {
      const no = [...order, idx];
      setOrder(no);
      if (no.length >= 4 && !doneRef.current) {
        doneRef.current = true; setDone(true);
        const pts = Math.max(5, 25 - (no.length - 4) * 3);
        setTimeout(() => onComplete(pts), 800);
      }
    } else if (step >= 4 && !isCorrect) {
      const no = [...order, idx];
      setOrder(no);
      if (no.length >= 8 && !doneRef.current) {
        doneRef.current = true; setDone(true);
        setTimeout(() => onComplete(25), 800);
      }
    } else {
      setScore(s => Math.max(0, s - 3));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 max-w-lg mx-auto">
      <div className="text-center">
        <p className="text-indigo-300 text-xs uppercase tracking-widest mb-1">Liderazgo — Matriz Eisenhower</p>
        <h2 className="text-white text-xl font-black">Prioriza: urgente e importante primero</h2>
      </div>
      <div className="w-full bg-white/5 border border-indigo-500/20 rounded-xl p-4">
        <p className="text-indigo-300 text-xs font-bold uppercase mb-2">Prioridad ejecutada:</p>
        <div className="space-y-1 min-h-6">
          {order.map((idx, i) => (
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-lg px-3 py-1.5">
              <span className="text-indigo-400 text-xs font-bold w-4">{i + 1}.</span>
              <span className="text-white text-xs">{LEADERSHIP_TASKS[idx].task}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full space-y-1.5">
        {LEADERSHIP_TASKS.map((t, i) => {
          const placed = order.includes(i);
          const isNext = order.length < 4 ? (t.urgent && t.important) : order.length >= 4 && !(t.urgent && t.important);
          return (
            <motion.button key={i} onClick={() => handleTask(i)} disabled={placed || done}
              whileHover={!placed && !done ? { scale: 1.02 } : {}}
              className="w-full text-left rounded-xl p-3 border-2 text-sm transition-all"
              style={{
                background: placed ? "rgba(74,222,128,0.1)" : "rgba(99,102,241,0.08)",
                borderColor: placed ? "#4ade80" : "rgba(99,102,241,0.25)",
                opacity: placed ? 0.5 : 1, color: placed ? "#4ade80" : "white",
              }}>
              {placed ? "✅" : "○"} {t.task}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ResultScreen({ scores }: { scores: number[] }) {
  const total = scores.reduce((a, b) => a + b, 0);
  const pct = Math.round((total / 100) * 100);
  const rank = pct >= 85 ? "Director Ejecutivo (CEO)" : pct >= 65 ? "Gerente General" : pct >= 40 ? "Jefe de Departamento" : "Analista de Negocios";
  const color = pct >= 85 ? "#4ade80" : pct >= 65 ? "#818cf8" : pct >= 40 ? "#60a5fa" : "#f87171";
  const phases = ["Estrategia", "Finanzas", "Negociación", "Liderazgo"];
  const circ = 2 * Math.PI * 50;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        await saveSimulationResult(user.uid, "administracion", pct, rank, {
          strategy: scores[0] ?? 0,
          finance: scores[1] ?? 0,
          negotiation: scores[2] ?? 0,
          leadership: scores[3] ?? 0,
        });
      } catch { /* silent */ }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 max-w-sm mx-auto">
      <p className="text-indigo-300 text-xs uppercase tracking-widest">Evaluación Ejecutiva</p>
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
          <motion.circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - pct / 100) }} transition={{ duration: 1.5, ease: "easeOut" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{pct}%</span>
          <span className="text-white/50 text-xs">gestión ejecutiva</span>
        </div>
      </div>
      <p className="text-2xl font-black text-center" style={{ color }}>📊 {rank}</p>
      <div className="w-full space-y-2">
        {phases.map((name, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-white/60 text-sm w-24 shrink-0">{name}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: (scores[i] ?? 0) >= 20 ? "#4ade80" : (scores[i] ?? 0) >= 12 ? "#818cf8" : "#f87171" }}
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

export default function AdministracionPage() {
  const [phase, setPhase] = useState<GamePhase>("briefing");
  const [scores, setScores] = useState<number[]>([]);
  useSimulationBadge(phase);

  const advance = (score: number) => {
    setScores(s => [...s, score]);
    setPhase(PHASE_ORDER[PHASE_ORDER.indexOf(phase) + 1]);
  };

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(135deg,#0f0c29 0%,#1e1b4b 60%,#0f0c29 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map(p => (
          <motion.div key={p.id} className="absolute rounded-full bg-indigo-400"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
        ))}
      </div>
      <Navbar variant="dark" title="📊 Administración — CEO Virtual" backHref="/simular" rightSlot={<ScoreBar phase={phase} scores={scores} />} />
      <div className="relative max-w-lg mx-auto py-8">
        <AnimatePresence mode="wait">
          {phase === "briefing" && (
            <motion.div key="b" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 px-4 text-center">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-8xl">📊</motion.div>
              <h1 className="text-white text-3xl font-black">CEO Virtual</h1>
              <p className="text-white/70 text-lg">Eres el CEO de una empresa mediana. Tus decisiones definen el futuro.</p>
              <div className="w-full bg-white/5 border border-indigo-500/20 rounded-2xl p-5 text-left space-y-3">
                {["🎯 Toma decisiones estratégicas de alto impacto", "💰 Domina conceptos financieros clave", "🤝 Negocia acuerdos con proveedores", "👔 Prioriza tareas como un líder"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80 text-sm"><span className="text-white/40 text-xs w-4">{i + 1}.</span>{t}</div>
                ))}
              </div>
              <motion.button onClick={() => setPhase("strategy")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-2xl text-white text-xl font-black" style={{ background: "linear-gradient(135deg,#4338ca,#6366f1)" }}>
                📊 Iniciar Gestión
              </motion.button>
            </motion.div>
          )}
          {phase === "strategy" && <motion.div key="s" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><StrategyGame onComplete={advance} /></motion.div>}
          {phase === "finance" && <motion.div key="f" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><FinanceGame onComplete={advance} /></motion.div>}
          {phase === "negotiation" && <motion.div key="n" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><NegotiationGame onComplete={advance} /></motion.div>}
          {phase === "leadership" && <motion.div key="l" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }}><LeadershipGame onComplete={advance} /></motion.div>}
          {phase === "result" && <motion.div key="r" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}><ResultScreen scores={scores} /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
