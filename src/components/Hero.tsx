"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { hero, ui } from "@/content/site";
import { ParticleField } from "./ParticleField";
import { usePrefs } from "@/lib/prefs";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t, lang } = usePrefs();
  const reduce = useReducedMotion();
  const lines = hero.headline[lang];

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-10 lg:justify-end"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-5 lg:grid-cols-[1.45fr_1fr] lg:gap-16 lg:px-10">
        <div>
          {/* Revelado por línea: cada palabra sube desde su propia máscara. */}
          <h1 className="display text-[clamp(3rem,11vw,9rem)]">
            {lines.map((line, i) => (
              <span key={line} className="line-mask">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.08 + i * 0.09, duration: 0.95, ease: EASE }}
                >
                  {i === lines.length - 1 ? (
                    <span className="text-accent">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-muted mt-8 max-w-[46ch] text-[15px] leading-relaxed lg:text-base"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
          >
            {t(hero.lede)}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7, ease: EASE }}
          >
            <a
              href="#obra"
              className="bg-accent text-accent-ink inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[12px] tracking-widest whitespace-nowrap uppercase transition-transform active:scale-[0.98]"
            >
              {t(hero.primaryCta)}
              <ArrowDown size={14} weight="bold" />
            </a>
            <a
              href="#contacto"
              className="border-line text-ink hover:border-ink inline-flex items-center rounded-full border px-6 py-3 font-mono text-[12px] tracking-widest whitespace-nowrap uppercase transition-colors active:scale-[0.98]"
            >
              {t(ui.contact)}
            </a>
          </motion.div>
        </div>

        {/* El panel del hero corre el motor de partículas de SWIM: lo primero
            que se ve es código propio ejecutándose, no una captura. */}
        <motion.div
          className="relative hidden min-w-0 lg:block"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
        >
          <ParticleField
            className="border-line aspect-[3/4] w-full border"
            hint={t(ui.moveMouse)}
            hintTouch={t(ui.dragHere)}
          />
          <p className="text-muted mt-3 font-mono text-[11px] tracking-widest uppercase">
            {t(ui.heroCaption)}
          </p>
        </motion.div>
      </div>

      <div id="nav-sentinel" className="absolute top-20 h-px w-full" aria-hidden="true" />
    </section>
  );
}
