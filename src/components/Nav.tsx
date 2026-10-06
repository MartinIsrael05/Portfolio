"use client";

import { useEffect, useState } from "react";
import { List, MoonStars, Sun, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, profile, ui } from "@/content/site";
import { usePrefs } from "@/lib/prefs";

export function Nav() {
  const { t, lang, theme, toggleLang, toggleTheme } = usePrefs();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const reduce = useReducedMotion();

  // IntersectionObserver sobre un centinela en vez de escuchar scroll.
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: "0px",
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 ${
          lifted ? "bg-bg/92 border-line border-b backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
          <a
            href="#top"
            className="font-mono text-ink text-[13px] tracking-tight whitespace-nowrap uppercase"
          >
            {profile.name}
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-muted hover:text-ink font-mono text-[12px] tracking-wide whitespace-nowrap uppercase transition-colors"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t(ui.langToggle)}
              className="text-muted hover:text-ink border-line hover:border-ink rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase transition-colors active:scale-[0.97]"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t(ui.themeToggle)}
              className="text-muted hover:text-ink grid size-9 place-items-center rounded-full transition-colors active:scale-[0.97]"
            >
              {theme === "dark" ? <Sun size={17} weight="regular" /> : <MoonStars size={17} weight="regular" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="text-muted hover:text-ink grid size-9 place-items-center transition-colors lg:hidden"
            >
              <List size={20} weight="regular" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-bg fixed inset-0 z-[55] lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex h-16 items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(ui.closeVideo)}
                className="text-ink grid size-9 place-items-center"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col px-5 pt-6" aria-label="Principal">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="display border-line text-ink border-b py-5 text-[2.5rem]"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t(item.label)}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
