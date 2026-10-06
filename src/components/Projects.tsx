"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { devProjects } from "@/content/projects";
import type { Project } from "@/content/projects";
import { sections, ui } from "@/content/site";
import { usePrefs } from "@/lib/prefs";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Lista de tecnologías agrupada por rol, para que se lea todo lo que entró. */
function Stack({ groups }: { groups: Project["stack"] }) {
  const { t } = usePrefs();
  return (
    <dl className="mt-6 space-y-3">
      {groups.map((group) => (
        <div key={group.group.es} className="grid grid-cols-[116px_1fr] gap-x-4 gap-y-1">
          <dt className="text-muted pt-[3px] font-mono text-[10px] leading-tight tracking-widest uppercase">
            {t(group.group)}
          </dt>
          <dd className="text-ink/85 text-[12.5px] leading-relaxed">
            {group.items.join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Card({ project, wide }: { project: Project; wide: boolean }) {
  const { t, lang } = usePrefs();
  const live = project.links?.[0]?.href;

  return (
    <article
      className={`border-line bg-surface group/card flex h-full flex-col border transition-colors duration-300 hover:border-[var(--accent)] ${
        wide ? "lg:flex-row" : ""
      }`}
    >
      {/* La captura entera es el enlace al sitio en producción. */}
      <a
        href={live}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${project.title}, ${t(ui.openSite)}`}
        className={`border-line group/media relative block overflow-hidden border-b ${
          wide ? "lg:w-[58%] lg:border-r lg:border-b-0" : ""
        }`}
      >
        <div className={wide ? "aspect-[16/10] lg:h-full lg:min-h-[420px]" : "aspect-[16/10]"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title}, captura del sitio en producción`}
            className="size-full object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Velo + chip. Entra desde abajo, sin escalar la imagen. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#07090b]/0 transition-colors duration-300 group-hover/media:bg-[#07090b]/55"
        />
        <span
          aria-hidden="true"
          className="bg-accent text-accent-ink pointer-events-none absolute bottom-5 left-5 inline-flex translate-y-3 items-center gap-1.5 rounded-full px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/media:translate-y-0 group-hover/media:opacity-100"
        >
          {t(ui.openSite)}
          <ArrowUpRight size={13} weight="bold" />
        </span>
      </a>

      <div className={`flex flex-1 flex-col p-6 lg:p-8 ${wide ? "lg:w-[42%]" : ""}`}>
        <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)]">{project.title}</h3>
        <p className="text-muted mt-2 font-mono text-[11px] tracking-widest uppercase">
          {t(project.kind)} <span className="px-2 opacity-40">/</span> {project.year}
        </p>

        <p className="text-ink mt-4 max-w-[42ch] text-[15px] leading-snug">{t(project.summary)}</p>
        <p className="text-muted mt-3 max-w-[54ch] text-[14px] leading-relaxed">
          {project.body[lang][0]}
        </p>

        {project.facts && (
          <dl className="border-line mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t pt-5">
            {project.facts.map((f) => (
              <div key={f.label.es}>
                <dt className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  {t(f.label)}
                </dt>
                <dd className="text-ink mt-1 text-[13px]">{t(f.value)}</dd>
              </div>
            ))}
          </dl>
        )}

        <Stack groups={project.stack} />

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
          {project.links?.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-mono text-[11px] tracking-widest whitespace-nowrap uppercase transition-colors active:scale-[0.98] ${
                i === 0
                  ? "bg-accent text-accent-ink hover:opacity-85"
                  : "border-line text-ink hover:border-ink border"
              }`}
            >
              {t(link.label)}
              <ArrowUpRight size={13} weight="bold" />
            </a>
          ))}
        </div>

        {project.credits && (
          <p className="text-muted mt-5 font-mono text-[11px] tracking-wide">
            {t(project.credits)}
          </p>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { t } = usePrefs();
  const lastIndex = devProjects.length - 1;

  return (
    <section id="proyectos" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <header className="max-w-[62ch]">
            <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">
              {t(sections.proyectos.title)}
            </h2>
            <p className="text-muted mt-5 text-[15px] leading-relaxed lg:text-base">
              {t(sections.proyectos.lede)}
            </p>
          </header>
        </Reveal>

        {/* El primero y el último ocupan el ancho completo: seis proyectos,
            seis celdas, sin huecos. */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {devProjects.map((p, i) => {
            const wide = i === 0 || i === lastIndex;
            return (
              <div key={p.slug} className={wide ? "lg:col-span-2" : ""}>
                <Reveal delay={wide ? 0 : 0.06}>
                  <Card project={p} wide={wide} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
