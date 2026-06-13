"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/lib/questions";
import ProgressBar  from "./ProgressBar";
import AnswerOption from "./AnswerOption";

type Props = {
  question: Question;
  current:  number;
  total:    number;
  timeLeft: number;
  selected: string | null;
  score:    number;
  onAnswer: (id: string) => void;
};

export default function QuestionCard({
  question, current, total, timeLeft, selected, score, onAnswer
}: Props) {
  return (
    <div style={{ width: "100%", maxWidth: "680px" }}>

      <ProgressBar
        current={current}
        total={total}
        timeLeft={timeLeft}
        score={score}
        category={question.category}
      />

      {/* Tarjeta de pregunta */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{    opacity: 0, x: -50 }}
          transition={{ duration: 0.35 }}
          style={{
            background:   "rgba(255,255,255,0.92)",
            border:       "0.5px solid rgba(255,0,0,0.18)",
            borderRadius: "16px",
            padding:      "1.75rem 1.5rem",
            marginBottom: "1rem",
            textAlign:    "center",
          }}
        >
          <motion.div
            key={question.emoji}
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: 1,   rotate: 0   }}
            transition={{ type: "spring", stiffness: 260 }}
            style={{ fontSize: "52px", marginBottom: "12px" }}
          >
            {question.emoji}
          </motion.div>

          <h2 style={{
            fontSize:   "20px",
            fontWeight: 600,
            color:      "#1e1e1e",
            lineHeight: 1.4,
            margin:     0,
          }}>
            {question.question}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Grid de opciones */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 "12px",
        marginBottom:        "10px",
      }}>
        {question.options.map((opt, i) => (
          <AnswerOption
            key={opt.id}
            option={opt}
            index={i}
            selected={selected}
            timeLeft={timeLeft}
            onAnswer={onAnswer}
          />
        ))}
      </div>

      {/* Hint velocidad */}
      <AnimatePresence>
        {!selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            style={{
              textAlign:  "center",
              fontSize:   "11px",
              color:      "#7a7a7a",
              marginTop:  "4px",
            }}
          >
            ⚡ Responde rápido para ganar más puntos
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}