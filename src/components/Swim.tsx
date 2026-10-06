"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { swim } from "@/content/projects";
import { sections, ui } from "@/content/site";
import { usePrefs } from "@/lib/prefs";
import { FIELD_DEFAULTS, FieldControls, ParticleField } from "./ParticleField";
import type { FieldSettings } from "./ParticleField";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Swim() {
  const { t, lang } = usePrefs();
  const [settings, setSettings] = useState<FieldSettings>(FIELD_DEFAULTS);

  return (
    <section id="swim" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div className="max-w-[48ch]">
              <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
                {t(sections.swim.title)}
              </h2>
              <p className="text-muted mt-5 text-[15px] leading-relaxed lg:text-base">
                {t(sections.swim.lede)}
              </p>
            </div>
            <p className="text-muted font-mono text-[11px] tracking-widest uppercase">
              {swim.title} <span className="px-2 opacity-40">/</span> {t(swim.kind)}
              <span className="px-2 opacity-40">/</span> {swim.year}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 lg:mt-12">
            <ParticleField
              className="border-line aspect-[16/10] w-full border md:aspect-[2/1] lg:aspect-[21/9]"
              settings={settings}
              hint={t(ui.moveMouse)}
              hintTouch={t(ui.dragHere)}
            />
            <FieldControls
              settings={settings}
              onChange={setSettings}
              labels={{
                density: t(ui.ctrlDensity),
                size: t(ui.ctrlSize),
                trail: t(ui.ctrlTrail),
                force: t(ui.ctrlForce),
                color: t(ui.ctrlColor),
                reset: t(ui.reset),
              }}
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal delay={0.04}>
            <div>
              <p className="text-ink max-w-[34ch] text-[clamp(1.1rem,2vw,1.5rem)] leading-snug">
                {t(swim.summary)}
              </p>
              <div className="mt-5 space-y-4">
                {swim.body[lang].map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="text-muted max-w-[62ch] text-[15px] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <dl className="border-line border-t">
                {swim.facts?.map((f) => (
                  <div
                    key={f.label.es}
                    className="border-line flex items-baseline justify-between gap-6 border-b py-3.5"
                  >
                    <dt className="text-muted font-mono text-[11px] tracking-widest uppercase">
                      {t(f.label)}
                    </dt>
                    <dd className="text-ink text-right text-[14px]">{t(f.value)}</dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-6 space-y-3">
                {swim.stack.map((group) => (
                  <div key={group.group.es} className="grid grid-cols-[116px_1fr] gap-x-4">
                    <dt className="text-muted pt-[3px] font-mono text-[10px] leading-tight tracking-widest uppercase">
                      {t(group.group)}
                    </dt>
                    <dd className="text-ink/85 text-[12.5px] leading-relaxed">
                      {group.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>

              {swim.status && (
                <p className="border-accent text-muted mt-6 border-l-2 pl-4 text-[14px] leading-relaxed">
                  {t(swim.status)}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
