"use client";

import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { trackBadgeEvent, showBadgeNotification } from "@/src/services/badgeService";

export function useSimulationBadge(phase: string) {
  const tracked = useRef(false);

  useEffect(() => {
    if (phase !== "result" || tracked.current) return;
    tracked.current = true;

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const { newBadges } = await trackBadgeEvent(user.uid, "simulation_completed");
        newBadges.forEach((b) => showBadgeNotification(b));
      } catch { /* silent */ }
    });

    return () => unsub();
  }, [phase]);
}
