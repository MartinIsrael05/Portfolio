"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowsOutSimple, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { designProjects } from "@/content/projects";
import type { Project } from "@/content/projects";
import { sections, ui } from "@/content/site";
import { usePrefs } from "@/lib/prefs";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Intro({ project }: { project: Project }) {
  const { t, lang } = usePrefs();
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div>
        <h3 className="display text-[clamp(2.2rem,5vw,3.6rem)]">{project.title}</h3>
        <p className="text-muted mt-2 font-mono text-[11px] tracking-widest uppercase">
          {t(project.kind)} <span className="px-2 opacity-40">/</span> {project.year}
        </p>
        <p className="text-ink mt-5 max-w-[30ch] text-[clamp(1.05rem,1.9vw,1.4rem)] leading-snug">
          {t(project.summary)}
        </p>
      </div>
      <div className="lg:pt-2">
        <div className="space-y-4">
          {project.body[lang].map((para) => (
            <p
              key={para.slice(0, 24)}
              className="text-muted max-w-[62ch] text-[15px] leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
        <dl className="mt-6 space-y-3">
          {project.stack.map((group) => (
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
      </div>
    </div>
  );
}

export function Design() {
  const { t } = usePrefs();
  const reduce = useReducedMotion();

  const weeknd = designProjects.find((p) => p.slug === "weeknd")!;
  const blur = designProjects.find((p) => p.slug === "blur")!;

  const [spread, setSpread] = useState(0);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const close = useCallback(() => setZoom(null), []);

  // Las diez páginas se leen de a dos, como una revista abierta.
  const pages = weeknd.gallery ?? [];
  const spreads: typeof pages[] = [];
  for (let i = 0; i < pages.length; i += 2) spreads.push(pages.slice(i, i + 2));
  const lastSpread = spreads.length - 1;

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom, close]);

  return (
    <section id="diseno" className="scroll-mt-20 px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <header className="max-w-[62ch]">
            <h2 className="display text-[clamp(2.5rem,7vw,5.5rem)]">{t(sections.diseno.title)}</h2>
            <p className="text-muted mt-5 text-[15px] leading-relaxed lg:text-base">
              {t(sections.diseno.lede)}
            </p>
          </header>
        </Reveal>

        <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
          {/* The Weeknd: visor de revista, de a dos páginas. */}
          <div>
            <Reveal>
              <Intro project={weeknd} />
            </Reveal>

            <Reveal delay={0.06}>
              <figure className="mt-10">
                <div className="border-line bg-[#0e1013] border p-4 lg:p-8">
                  <div className="mx-auto grid max-w-[940px] grid-cols-2 gap-px bg-[var(--line)]">
                    {spreads[spread].map((page) => (
                      <button
                        key={page.src}
                        type="button"
                        onClick={() => setZoom({ src: page.src, alt: t(page.alt) })}
                        className="group/page relative block bg-white"
                        aria-label={t(page.alt)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={page.src}
                          alt={t(page.alt)}
                          className="block aspect-[1190/1683] w-full object-cover"
                          loading="lazy"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 grid place-items-center bg-[#07090b]/0 transition-colors duration-300 group-hover/page:bg-[#07090b]/45"
                        >
                          <ArrowsOutSimple
                            size={26}
                            weight="bold"
                            className="scale-75 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover/page:scale-100 group-hover/page:opacity-100"
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <figcaption className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-muted font-mono text-[11px] tracking-widest uppercase">
                    {t(ui.pageOf)} {spread * 2 + 1}
                    <span className="px-1.5 opacity-40">-</span>
                    {Math.min(spread * 2 + 2, pages.length)}
                    <span className="px-2 opacity-40">/</span>
                    {pages.length}
                  </span>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSpread((s) => Math.max(0, s - 1))}
                      disabled={spread === 0}
                      aria-label={t(ui.prevPage)}
                      className="border-line text-ink hover:border-ink grid size-10 place-items-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30"
                    >
                      <CaretLeft size={15} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpread((s) => Math.min(lastSpread, s + 1))}
                      disabled={spread === lastSpread}
                      aria-label={t(ui.nextPage)}
                      className="border-line text-ink hover:border-ink grid size-10 place-items-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30"
                    >
                      <CaretRight size={15} weight="bold" />
                    </button>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* blur: los cuatro afiches y después los montajes. */}
          <div>
            <Reveal>
              <Intro project={blur} />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
                {blur.gallery
                  ?.filter((item) => !item.wide)
                  .map((item) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setZoom({ src: item.src, alt: t(item.alt) })}
                      className="border-line group/page relative block overflow-hidden border"
                      aria-label={t(item.alt)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={t(item.alt)}
                        className="block aspect-[2782/3949] w-full object-cover"
                        loading="lazy"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 grid place-items-center bg-[#07090b]/0 transition-colors duration-300 group-hover/page:bg-[#07090b]/45"
                      >
                        <ArrowsOutSimple
                          size={24}
                          weight="bold"
                          className="scale-75 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover/page:scale-100 group-hover/page:opacity-100"
                        />
                      </span>
                    </button>
                  ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {blur.gallery
                  ?.filter((item) => item.wide)
                  .map((item) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setZoom({ src: item.src, alt: t(item.alt) })}
                      className="border-line group/page relative block overflow-hidden border"
                      aria-label={t(item.alt)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={t(item.alt)}
                        className="block aspect-[4/3] w-full object-cover"
                        loading="lazy"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 grid place-items-center bg-[#07090b]/0 transition-colors duration-300 group-hover/page:bg-[#07090b]/45"
                      >
                        <ArrowsOutSimple
                          size={24}
                          weight="bold"
                          className="scale-75 text-white opacity-0 transition-[opacity,transform] duration-300 group-hover/page:scale-100 group-hover/page:opacity-100"
                        />
                      </span>
                    </button>
                  ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/93 p-4 backdrop-blur-sm lg:p-10"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={zoom.alt}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t(ui.closeImage)}
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90dvh] max-w-full object-contain"
              initial={reduce ? false : { scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
