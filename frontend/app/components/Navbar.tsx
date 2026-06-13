"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebase/config";
import { logout } from "../../src/services/authService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase/config";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      setUserEmail(user.email || "");

      const docRef = doc(db, "Usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserName(data.nombre || "");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="relative z-10 border-b border-white/50 bg-white/50 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/25">
            <span className="text-lg font-black">VT</span>
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-slate-950">
              Vocatio
            </p>
            <p className="text-xs text-slate-500">Tu camino, tu futuro.</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          <a
            className="transition-colors hover:text-red-500"
            href="/#inicio"
          >
            Inicio
          </a>
          <a className="transition-colors hover:text-red-500" href="/test">
            Test Vocacional
          </a>
          <a
            className="transition-colors hover:text-red-500"
            href="/carreras"
          >
            Explorar Carreras
          </a>
          <a
            className="relative transition-colors hover:text-red-500 font-semibold text-red-600"
            href="/simular"
          >
            Simular Carrera
            <span className="absolute -top-2 -right-4 rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
              NEW
            </span>
          </a>
          <a className="transition-colors hover:text-red-500" href="/#mentor">
            Mentor IA
          </a>
          <a
            className="transition-colors hover:text-red-500"
            href="/recursos"
          >
            Recursos
          </a>
          <a
            className="transition-colors hover:text-red-500"
            href="/#comunidad"
          >
            Comunidad
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-900">
                  Bienvenido, {userName}
                </span>
                <span className="text-xs text-slate-500">
                  {userEmail}
                </span>
              </div>

              <Avatar>
                <AvatarFallback className="bg-red-600 text-white">
                  {userName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Button
                variant="outline"
                disabled={isLoggingOut}
                onClick={async () => {
                  if (!confirm("¿Estás seguro que quieres cerrar sesión?")) return;
                  setIsLoggingOut(true);
                  await logout();
                  document.cookie = "vocatio_session=; path=/; max-age=0";
                  setIsLoggedIn(false);
                  setUserEmail("");
                  setUserName("");
                  setIsLoggingOut(false);
                }}
              >
                {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </Button>
              <Button
                onClick={() => router.push("/login")}
              >
                Registrarme
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
