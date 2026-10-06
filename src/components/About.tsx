"use client";

import { motion, useReducedMotion } from "motion/react";
import { about, sections } from "@/content/site";
import { usePrefs } from "@/lib/prefs";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-muted font-mono text-[10.5px] tracking-widest uppercase">{children}</h3>
  );
}

export function About() {
  const { t, lang } = usePrefs();
  const es = lang === "es";

  return (
    <section id="sobre" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        {/* Encabezado y bio comparten fila: el titular ya no deja una banda
            vacía a su derecha. */}
        <Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
                {t(sections.sobre.title)}
              </h2>
              <dl className="border-line mt-8 border-t">
                {about.quickFacts.map((f) => (
                  <div key={f.label.es} className="border-line border-b py-3.5">
                    <dt className="text-muted font-mono text-[10.5px] tracking-widest uppercase">
                      {t(f.label)}
                    </dt>
                    <dd className="text-ink mt-1 text-[14px]">{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-4 lg:pt-3">
              {about.bio[lang].map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="text-ink max-w-[62ch] text-[15.5px] leading-relaxed lg:text-[16.5px]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Experiencia y formación en una sola grilla de tres columnas, para que
            no queden columnas cortas al lado de columnas largas. */}
        <Reveal delay={0.06}>
          <div className="border-line mt-16 grid grid-cols-1 gap-x-10 gap-y-10 border-t pt-10 md:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-16">
            <div>
              <Label>{es ? "Experiencia" : "Experience"}</Label>
              <ul className="mt-4 space-y-5">
                {about.experience.map((job) => (
                  <li key={job.org + job.period.es}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="text-ink text-[15px] font-medium">{t(job.role)}</p>
                      <p className="text-muted font-mono text-[10.5px] tracking-wide">
                        {t(job.period)}
                      </p>
                    </div>
                    <p className="text-accent mt-0.5 font-mono text-[11.5px]">{job.org}</p>
                    <p className="text-muted mt-1.5 max-w-[42ch] text-[13.5px] leading-relaxed">
                      {t(job.note)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Label>{es ? "Formación" : "Education"}</Label>
              <ul className="mt-4 space-y-5">
                {about.education.map((ed) => (
                  <li key={ed.org}>
                    <p className="text-ink max-w-[36ch] text-[14.5px] leading-snug font-medium">
                      {t(ed.title)}
                    </p>
                    <p className="text-accent mt-1 font-mono text-[11.5px]">{ed.org}</p>
                    <p className="text-muted mt-0.5 font-mono text-[10.5px] tracking-wide">
                      {t(ed.period)}
                    </p>
                  </li>
                ))}
              </ul>

            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <Label>{es ? "Herramientas" : "Tools"}</Label>
              <dl className="mt-4 space-y-4">
                {about.skills.map((group) => (
                  <div key={group.group.es}>
                    <dt className="text-ink text-[13px] font-medium">{t(group.group)}</dt>
                    <dd className="text-muted mt-1.5 text-[13px] leading-relaxed">
                      {group.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Label>{es ? "Además" : "Also"}</Label>
                <p className="text-muted mt-3 max-w-[42ch] text-[13.5px] leading-relaxed">
                  {t(about.leadership)}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
