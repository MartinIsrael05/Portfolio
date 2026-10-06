"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { L, Lang } from "@/content/site";

type Theme = "dark" | "light";

interface Prefs {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  toggleTheme: () => void;
  /** Resuelve un par bilingüe al idioma activo. */
  t: (value: L) => string;
}

const PrefsContext = createContext<Prefs | null>(null);

const LANG_KEY = "mi.lang";
const THEME_KEY = "mi.theme";

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const [theme, setTheme] = useState<Theme>("dark");

  // El tema arranca en oscuro porque la obra en video vive ahí. La preferencia
  // guardada gana sobre ese default.
  useEffect(() => {
    try {
      const storedLang = window.localStorage.getItem(LANG_KEY);
      if (storedLang === "es" || storedLang === "en") setLang(storedLang);

      const storedTheme = window.localStorage.getItem(THEME_KEY);
      if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    } catch {
      // Almacenamiento bloqueado: se usan los valores por defecto.
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* no-op */
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* no-op */
    }
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === "es" ? "en" : "es")), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const t = useCallback((value: L) => value[lang], [lang]);

  const value = useMemo<Prefs>(
    () => ({ lang, theme, toggleLang, toggleTheme, t }),
    [lang, theme, toggleLang, toggleTheme, t],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs debe usarse dentro de PrefsProvider");
  return ctx;
}
