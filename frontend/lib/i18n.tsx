"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import es from "@/locales/es.json";
import en from "@/locales/en.json";
import qu from "@/locales/qu.json";

export type Locale = "es" | "en" | "qu";

const translations: Record<Locale, Record<string, any>> = { es, en, qu };

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  qu: "Runasimi",
};

const localeFlags: Record<Locale, string> = {
  es: "🇵🇪",
  en: "🇺🇸",
  qu: "🏔️",
};

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  localeName: string;
  localeFlag: string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) as string | undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = localStorage.getItem("vocatio_locale") as Locale | null;
    if (stored && translations[stored]) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("vocatio_locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = getNestedValue(translations[locale], key);
      if (value === undefined) {
        value = getNestedValue(translations.es, key);
      }
      if (value === undefined) return key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value!.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return value;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, localeName: localeNames[locale], localeFlag: localeFlags[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}

export { localeNames, localeFlags };
