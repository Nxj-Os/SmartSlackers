"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BadgeNotification = {
  title: string;
  icon: string;
  xp: number;
};

// ── Confetti ──────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
};

function createParticles(): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 25,
      vy: -Math.random() * 18 - 8,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      opacity: 1,
    });
  }
  return particles;
}

function ConfettiCanvas({ active }: { active: boolean }) {
  const draw = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = "position:fixed;inset:0;z-index:10000;pointer-events:none;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;
    let particles = createParticles();
    let animId: number;
    let elapsed = 0;

    const loop = () => {
      elapsed += 16;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.vy += 0.45;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        if (elapsed > 1200) p.opacity -= 0.02;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (elapsed < 2500 && particles.some((p) => p.opacity > 0)) {
        animId = requestAnimationFrame(loop);
      } else {
        canvas.remove();
      }
    };

    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const cleanup = draw();
    return cleanup;
  }, [active, draw]);

  return null;
}

// ── Toast ─────────────────────────────────────────────────────────────────────

export default function BadgeToast() {
  const [notification, setNotification] = useState<BadgeNotification | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const queue = useRef<BadgeNotification[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as BadgeNotification;
      queue.current.push(detail);
      processQueue();
    };
    window.addEventListener("badge-unlocked", handler);
    return () => window.removeEventListener("badge-unlocked", handler);
  }, []);

  const processQueue = useCallback(() => {
    if (timerRef.current) return;
    if (queue.current.length === 0) return;

    const next = queue.current.shift()!;
    setNotification(next);
    setShowConfetti(true);

    timerRef.current = setTimeout(() => {
      setNotification(null);
      setShowConfetti(false);
      timerRef.current = null;
      // procesar siguiente después de que termine la animación de salida
      setTimeout(() => processQueue(), 300);
    }, 2500);
  }, []);

  return (
    <>
      <ConfettiCanvas active={showConfetti} />
      <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
        <AnimatePresence>
          {notification && (
            <motion.div
              key={notification.title + notification.xp}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-5 py-3 shadow-2xl shadow-amber-500/20"
            >
              <span className="text-3xl">{notification.icon}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  ¡Badge Desbloqueado!
                </p>
                <p className="text-sm font-bold text-slate-900">{notification.title}</p>
              </div>
              <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                +{notification.xp} XP
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
