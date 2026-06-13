"use client";
import { motion } from "framer-motion";
import type { Option } from "@/lib/questions";

type Props = {
  option: Option;
  index: number;
  selected: string | null;
  timeLeft: number;
  onAnswer: (id: string) => void;
};

export default function AnswerOption({
  option, index, selected, timeLeft, onAnswer
}: Props) {
  const isSelected  = selected === option.id;
  const isOther     = selected !== null && !isSelected;
  const isDisabled  = selected !== null;
  const baseBg      = isSelected ? "rgba(255,111,111,0.15)" : "rgba(255,255,255,0.95)";
  const baseBorder  = isSelected ? "rgba(255,111,111,0.35)" : "rgba(0,0,0,0.08)";

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: isOther ? 0.3 : 1,
        y: 0,
        scale: isSelected ? 1.04 : 1,
      }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={!isDisabled ? { scale: 1.04, y: -3 } : {}}
      whileTap={!isDisabled  ? { scale: 0.96 }        : {}}
      onClick={() => !isDisabled && onAnswer(option.id)}
      aria-pressed={isSelected}
      aria-label={`Opción ${option.id}: ${option.text}`}
      style={{
        background:   baseBg,
        border:       `2px solid ${baseBorder}`,
        borderRadius: "14px",
        padding:      "18px 16px",
        cursor:       isDisabled ? "default" : "pointer",
        textAlign:    "left",
        display:      "flex",
        alignItems:   "center",
        gap:          "14px",
        width:        "100%",
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Ripple de fondo al seleccionar */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position:     "absolute",
            width:        "60px",
            height:       "60px",
            borderRadius: "50%",
            background:   "white",
            left:         "20px",
            top:          "50%",
            transform:    "translateY(-50%)",
            pointerEvents:"none",
          }}
        />
      )}

      {/* Badge letra (A / B / C / D) */}
      <div style={{
        width:          "36px",
        height:         "36px",
        borderRadius:   "10px",
        background:     isSelected ? "rgba(255,235,235,0.85)" : "#f5f2f2",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       "14px",
        fontWeight:     700,
        color:          isSelected ? "#8a1a1a" : "#1e1e1e",
        flexShrink:     0,
        zIndex:         1,
      }}>
        {option.id}
      </div>

      {/* Icono + texto */}
      <div style={{ zIndex: 1, flex: 1 }}>
        <div style={{ fontSize: "20px", marginBottom: "3px", lineHeight: 1 }}>
          {option.icon}
        </div>
        <div style={{
          fontSize:   "13px",
          fontWeight: 500,
          color:      isSelected ? "#1e1e1e" : "#444444",
          lineHeight: 1.35,
        }}>
          {option.text}
        </div>
      </div>

      {/* Check / bonus al seleccionar */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            flexShrink:  0,
            zIndex:      1,
            textAlign:   "right",
          }}
        >
          <div style={{ fontSize: "22px" }}>✅</div>
          <div style={{
            fontSize:   "11px",
            color:      "rgba(255,255,255,0.75)",
            fontWeight: 600,
            marginTop:  "2px",
          }}>
            +{100 + Math.floor(timeLeft * 5)} pts
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}