"use client";

import { motion } from "framer-motion";
import { UserBadge, CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/badges";

function BadgeCard({ badge, index }: { badge: UserBadge; index: number }) {
  const isUnlocked = badge.unlocked;
  const progress = badge.target > 0 ? (badge.progress / badge.target) * 100 : 0;
  const catColor = CATEGORY_COLORS[badge.category] ?? "#6b7280";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 24 }}
      className={`relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all ${
        isUnlocked
          ? "border-transparent bg-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          : "border-slate-200 bg-slate-50/80"
      }`}
      style={isUnlocked ? { borderColor: catColor + "30" } : undefined}
    >
      {/* XP badge */}
      {isUnlocked && (
        <span
          className="absolute -top-2.5 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ background: catColor }}
        >
          +{badge.xp} XP
        </span>
      )}

      {/* Icon */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
          isUnlocked ? "" : "grayscale opacity-40"
        }`}
        style={{
          background: isUnlocked ? catColor + "15" : "#f1f5f9",
        }}
      >
        {badge.icon}
      </div>

      {/* Title */}
      <p
        className={`text-sm font-bold leading-tight ${
          isUnlocked ? "text-slate-900" : "text-slate-400"
        }`}
      >
        {badge.title}
      </p>

      {/* Description */}
      <p
        className={`text-xs leading-relaxed ${
          isUnlocked ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {badge.description}
      </p>

      {/* Progress bar (for locked badges) */}
      {!isUnlocked && badge.target > 1 && (
        <div className="w-full space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full"
              style={{ background: catColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] font-medium text-slate-400">
            {badge.progress}/{badge.target}
          </p>
        </div>
      )}

      {/* Unlocked date */}
      {isUnlocked && badge.unlockedAt && (
        <p className="text-[10px] text-slate-400">
          Desbloqueado{" "}
          {new Date(badge.unlockedAt).toLocaleDateString("es-PE", {
            day: "numeric",
            month: "short",
          })}
        </p>
      )}

      {/* Locked overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
          <span className="text-xl opacity-20">🔒</span>
        </div>
      )}
    </motion.div>
  );
}

export default function BadgeDisplay({
  badges,
  totalXp,
  totalUnlocked,
  totalAvailable,
}: {
  badges: UserBadge[];
  totalXp: number;
  totalUnlocked: number;
  totalAvailable: number;
}) {
  const categories = Array.from(new Set(badges.map((b) => b.category)));

  return (
    <div className="space-y-6">
      {/* Stats header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2">
          <span className="text-lg">⭐</span>
          <div>
            <p className="text-xs text-amber-600 font-semibold">XP Total</p>
            <p className="text-lg font-black text-amber-700">{totalXp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2">
          <span className="text-lg">🏅</span>
          <div>
            <p className="text-xs text-red-600 font-semibold">Badges</p>
            <p className="text-lg font-black text-red-700">
              {totalUnlocked}/{totalAvailable}
            </p>
          </div>
        </div>
      </div>

      {/* Badges by category */}
      {categories.map((cat) => {
        const catBadges = badges.filter((b) => b.category === cat);
        const catColor = CATEGORY_COLORS[cat] ?? "#6b7280";
        return (
          <div key={cat}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background: catColor }} />
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: catColor }}>
                {CATEGORY_LABELS[cat] ?? cat}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {catBadges.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
