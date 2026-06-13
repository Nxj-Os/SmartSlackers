"use client";
import { motion } from "framer-motion";

type Props = {
  current:  number;
  total:    number;
  timeLeft: number;
  score:    number;
  category: string;
};

export default function ProgressBar({
  current, total, timeLeft, score, category
}: Props) {
  const progressPct = (current / total) * 100;
  const timerPct    = (timeLeft / 20) * 100;

  const timerColor =
    timeLeft > 10 ? "#ff7f7f" :
    timeLeft > 5  ? "#ff5959" : "#cc3b3b";

  const timerLabel =
    timeLeft > 10 ? "Tómate tu tiempo" :
    timeLeft > 5  ? "¡Decide pronto!"  : "¡Últimos segundos!";

  return (
    <div style={{ width: "100%", marginBottom: "1.25rem" }}>

      {/* Fila superior: categoría · pregunta · score */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        marginBottom:   "10px",
        flexWrap:       "wrap",
        gap:            "8px",
      }}>

        {/* Badge categoría */}
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background:   "rgba(255,255,255,0.95)",
            border:       "0.5px solid rgba(255,0,0,0.15)",
            color:        "#1e1e1e",
            fontSize:     "11px",
            fontWeight:   500,
            padding:      "3px 12px",
            borderRadius: "20px",
          }}
        >
          {category}
        </motion.div>

        {/* Pregunta X de Y con puntos */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "12px", color: "#000000" }}>
            {current + 1} <span style={{ color: "#888888" }}>/</span> {total}
          </span>
          <div style={{
            background:   "rgba(255,255,255,0.95)",
            border:       "0.5px solid rgba(255,0,0,0.15)",
            borderRadius: "20px",
            padding:      "3px 10px",
            fontSize:     "12px",
            fontWeight:   600,
            color:        "#cc2b2b",
            display:      "flex",
            alignItems:   "center",
            gap:          "4px",
          }}>
            🏆 {score}
          </div>
        </div>
      </div>

      {/* Barra de progreso de preguntas */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          height:       "5px",
          background:   "rgba(0, 0, 0, 0.19)",
          borderRadius: "3px",
          overflow:     "hidden",
        }}>
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              height:       "100%",
              background:   "#FF2B2B",
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Bolitas de pasos */}
        <div style={{
          display:       "flex",
          justifyContent:"space-between",
          marginTop:     "6px",
          padding:       "0 2px",
        }}>
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.6 }}
              animate={{
                scale:      i <= current ? 1 : 0.7,
                background: i < current  ? "#FF2B2B"
                          : i === current ? "#FF4F4F"
                          : "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.3 }}
              style={{
                width:        i === current ? "10px" : "7px",
                height:       i === current ? "10px" : "7px",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      </div>

      {/* Timer */}
      <div style={{
        background:   "rgba(255,255,255,0.04)",
        border:       "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding:      "10px 14px",
      }}>
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   "6px",
        }}>
          <span style={{ fontSize: "11px", color: "#2a2a2a" }}>
            ⏱ {timerLabel}
          </span>
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.4, color: timerColor }}
            animate={{ scale: 1,   color: timerColor }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: "15px", fontWeight: 700 }}
          >
            {timeLeft}s
          </motion.span>
        </div>

        {/* Barra timer */}
        <div style={{
          height:       "6px",
          background:   "rgba(255,255,255,0.07)",
          borderRadius: "3px",
          overflow:     "hidden",
        }}>
          <motion.div
            animate={{ width: `${timerPct}%` }}
            transition={{ duration: 1, ease: "linear" }}
            style={{
              height:       "100%",
              background:   timerColor,
              borderRadius: "3px",
            }}
          />
        </div>

        {/* Bonus label */}
        <div style={{
          marginTop:  "5px",
          fontSize:   "10px",
          color:      "#252525",
          textAlign:  "right",
        }}>
          Bonus ahora: +{Math.floor(timeLeft * 5)} pts
        </div>
      </div>
    </div>
  );
}