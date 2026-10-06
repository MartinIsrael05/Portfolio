"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { profile, sections } from "@/content/site";
import { usePrefs } from "@/lib/prefs";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const { t, lang } = usePrefs();
  const reduce = useReducedMotion();

  // El mail ya aparece grande arriba, así que acá sólo van los otros canales.
  const channels = [
    { label: "GitHub", value: "MartinIsrael05", href: profile.github },
    { label: "LinkedIn", value: "martinisrael05", href: profile.linkedin },
    { label: "Instagram", value: "@martoisraa", href: profile.instagram },
  ];

  return (
    <footer id="contacto" className="scroll-mt-20 px-5 pt-28 pb-14 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="display text-[clamp(2.75rem,10vw,8rem)]">
            {t(sections.contacto.title)}
          </h2>
          <p className="text-muted mt-10 max-w-[46ch] text-[15px] leading-relaxed lg:text-base">
            {t(sections.contacto.lede)} {t(profile.location)}.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="text-accent mt-10 inline-block max-w-full font-mono text-[clamp(0.95rem,3.3vw,2rem)] break-all underline decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70"
          >
            {profile.email}
          </a>
        </motion.div>

        <ul className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-3">
          {channels.map((c, i) => (
            <motion.li
              key={c.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            >
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="border-line hover:border-ink group flex h-full flex-col justify-between gap-6 border-t py-6 pr-4 transition-colors"
              >
                <span className="text-muted font-mono text-[11px] tracking-widest uppercase">
                  {c.label}
                </span>
                <span className="text-ink flex items-center gap-1.5 text-[14px] break-all">
                  {c.value}
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    className="text-muted group-hover:text-accent shrink-0 transition-colors"
                  />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="text-muted mt-20 font-mono text-[11px] tracking-wide">
          {lang === "es"
            ? `Sitio construido por ${profile.name} con Next.js. Todas las piezas son propias.`
            : `Site built by ${profile.name} with Next.js. All pieces are my own work.`}
        </p>
      </div>
    </footer>
  );
}
