"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AvatarCustomizer from "@/app/components/avatar/AvatarCustomizer";
import { auth } from "@/src/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function AvatarSetupPage() {
  const router = useRouter();
  const [userReady, setUserReady] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUserLogged(true);
      setUserReady(true);
    });

    return () => unsubscribe();
  }, [router]);

  if (!userReady) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 px-8 py-10 shadow-2xl">
          <p className="text-sm text-slate-500 dark:text-slate-400">Cargando personalización...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen [background:radial-gradient(circle_at_top_left,rgba(244,63,94,0.12),transparent_20%),radial-gradient(circle_at_top_right,rgba(252,165,165,0.10),transparent_22%),linear-gradient(180deg,#fff5f5_0%,#fef2f2_100%)] dark:bg-none dark:bg-[#101014] text-slate-900 dark:text-slate-100 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl"
          >
            Personaliza tu avatar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base"
          >
            Crea tu identidad visual en Vocatio y guarda tu avatar para que tus resultados
            y recomendaciones sean más representativos desde tu primera sesión.
          </motion.p>
        </div>

        <div className="rounded-[2rem] border border-white/80 dark:border-white/[0.08] bg-white/80 dark:bg-[rgba(20,20,30,0.95)] p-6 shadow-[0_30px_80px_rgba(220,38,38,0.12)] backdrop-blur-xl">
          <AvatarCustomizer onSaved={() => router.push("/")} />
        </div>
      </div>
    </main>
  );
}
