"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

export interface FieldSettings {
  /** Multiplica la cantidad de partículas calculada por área. */
  density: number;
  /** Radio del punto en píxeles CSS. */
  size: number;
  /** 0.02 estela larga, 0.5 casi sin estela. */
  trail: number;
  /** Intensidad del remolino alrededor del puntero. */
  force: number;
  /** Tono del punto, en grados. */
  hue: number;
}

export const FIELD_DEFAULTS: FieldSettings = {
  density: 1.4,
  size: 1,
  trail: 0.1,
  force: 1,
  hue: 168,
};

interface Props {
  className?: string;
  settings?: FieldSettings;
  hint?: string;
  hintTouch?: string;
}

/**
 * Port al navegador del motor visual de SWIM.
 *
 * Atracción radial hacia el puntero más una componente tangencial, que es la
 * que convierte un imán en un remolino, sobre una capa de feedback que deja la
 * estela. El estado por partícula es un Float32Array y el bucle vive fuera de
 * React: mover un control no re-renderiza nada, sólo muta un objeto.
 */
export function ParticleField({
  className = "",
  settings = FIELD_DEFAULTS,
  hint,
  hintTouch,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  const seedRef = useRef<(() => void) | null>(null);
  const [touched, setTouched] = useState(false);
  const [coarse, setCoarse] = useState(false);

  settingsRef.current = settings;

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // La densidad es lo único que obliga a reconstruir el buffer.
  useEffect(() => {
    seedRef.current?.();
  }, [settings.density]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const g = ctx;
    const el = canvas;
    const box = wrap;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let count = 0;
    let data = new Float32Array(0);
    let raf = 0;
    let frame = 0;

    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;

    function seed() {
      const s = settingsRef.current;
      count = Math.round(Math.min(9000, Math.max(300, (width * height) / 950)) * s.density);
      const next = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) {
        const o = i * 4;
        next[o] = Math.random() * width;
        next[o + 1] = Math.random() * height;
      }
      data = next;
      g.fillStyle = "#07090b";
      g.fillRect(0, 0, width, height);
    }
    seedRef.current = seed;

    /**
     * El canvas se dimensiona SOLO por atributo. Fijarlo con estilo en línea
     * hacía que empujara el ancho de su columna, el ResizeObserver volviera a
     * disparar y el campo se reiniciara en bucle sin dibujarse nunca.
     */
    function resize() {
      const rect = box.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === width && h === height) return;

      width = w;
      height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointerX = width / 2;
      pointerY = height / 2;
      seed();
    }

    function step(schedule = true) {
      const s = settingsRef.current;
      frame++;

      // Atractor fantasma mientras nadie toca nada.
      if (!pointerActive) {
        const t = frame * 0.006;
        pointerX = width * (0.5 + 0.33 * Math.sin(t));
        pointerY = height * (0.5 + 0.3 * Math.sin(t * 1.37 + 1.1));
      }

      // Feedback: se pinta el fondo translúcido en vez de limpiar.
      g.fillStyle = `rgba(7, 9, 11, ${s.trail})`;
      g.fillRect(0, 0, width, height);

      const reach = Math.min(width, height) * 0.62;
      const reach2 = reach * reach;
      const pull = 0.42 * s.force;
      const swirl = 0.55 * s.force;
      const radius = 0.95 * s.size;

      g.beginPath();
      for (let i = 0; i < count; i++) {
        const o = i * 4;
        let x = data[o];
        let y = data[o + 1];
        let vx = data[o + 2];
        let vy = data[o + 3];

        const dx = pointerX - x;
        const dy = pointerY - y;
        const d2 = dx * dx + dy * dy + 40;

        if (d2 < reach2) {
          const d = Math.sqrt(d2);
          const falloff = (1 - d / reach) / d;
          vx += dx * falloff * pull - dy * falloff * swirl;
          vy += dy * falloff * pull + dx * falloff * swirl;
        }

        // Deriva lenta para que el campo respire.
        vx += Math.sin((y + frame) * 0.004) * 0.012;
        vy += Math.cos((x - frame) * 0.004) * 0.012;

        vx *= 0.955;
        vy *= 0.955;
        x += vx;
        y += vy;

        // Bordes periódicos.
        if (x < 0) x += width;
        else if (x >= width) x -= width;
        if (y < 0) y += height;
        else if (y >= height) y -= height;

        data[o] = x;
        data[o + 1] = y;
        data[o + 2] = vx;
        data[o + 3] = vy;

        g.moveTo(x + radius, y);
        g.arc(x, y, radius, 0, 6.283185307179586);
      }
      g.fillStyle = `hsl(${s.hue} 70% 88% / 0.97)`;
      g.fill();

      if (schedule) raf = requestAnimationFrame(() => step());
    }

    function start() {
      if (raf || reduce) return;
      raf = requestAnimationFrame(() => step());
    }

    function stop() {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      pointerActive = true;
      setTouched(true);
    }

    function onPointerLeave() {
      pointerActive = false;
    }

    resize();
    if (reduce) {
      for (let i = 0; i < 200; i++) step(false);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) {
        for (let i = 0; i < 200; i++) step(false);
      }
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 },
    );
    io.observe(wrap);

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      seedRef.current = null;
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const label = coarse ? (hintTouch ?? hint) : hint;

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-[#07090b] ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full touch-none"
        aria-hidden="true"
      />
      {label && (
        <p
          className={`pointer-events-none absolute bottom-3 left-3 font-mono text-[10.5px] tracking-widest text-white/55 uppercase transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Controles. Viven fuera del canvas y sólo mutan el objeto de ajustes.
   -------------------------------------------------------------------------- */

interface ControlsProps {
  settings: FieldSettings;
  onChange: (next: FieldSettings) => void;
  labels: {
    density: string;
    size: string;
    trail: string;
    force: string;
    color: string;
    reset: string;
  };
}

export function FieldControls({ settings, onChange, labels }: ControlsProps) {
  const set = useCallback(
    (key: keyof FieldSettings, value: number) => onChange({ ...settings, [key]: value }),
    [settings, onChange],
  );

  const sliders: {
    key: keyof FieldSettings;
    label: string;
    min: number;
    max: number;
    step: number;
  }[] = [
    { key: "density", label: labels.density, min: 0.2, max: 3, step: 0.1 },
    { key: "size", label: labels.size, min: 0.4, max: 3, step: 0.1 },
    { key: "trail", label: labels.trail, min: 0.02, max: 0.5, step: 0.01 },
    { key: "force", label: labels.force, min: 0.2, max: 2.5, step: 0.1 },
    { key: "hue", label: labels.color, min: 0, max: 360, step: 1 },
  ];

  return (
    <div className="border-line border border-t-0 px-5 py-5 lg:px-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {sliders.map((s) => (
          <label key={s.key} className="block">
            <span className="text-muted mb-2 flex items-baseline justify-between gap-2 font-mono text-[10px] tracking-widest uppercase">
              {s.label}
              <span className="text-ink/60 tabular-nums">
                {s.key === "hue"
                  ? `${Math.round(settings.hue)}°`
                  : (settings[s.key] as number).toFixed(s.step < 0.1 ? 2 : 1)}
              </span>
            </span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={settings[s.key] as number}
              onChange={(e) => set(s.key, Number(e.target.value))}
              aria-label={s.label}
              className="accent-accent h-1 w-full cursor-pointer rounded-full"
              style={
                s.key === "hue"
                  ? {
                      background:
                        "linear-gradient(90deg, hsl(0 70% 62%), hsl(60 70% 62%), hsl(120 70% 62%), hsl(180 70% 62%), hsl(240 70% 62%), hsl(300 70% 62%), hsl(360 70% 62%))",
                    }
                  : undefined
              }
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange(FIELD_DEFAULTS)}
        className="text-muted hover:text-ink mt-5 inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-widest uppercase transition-colors"
      >
        <ArrowCounterClockwise size={12} weight="bold" />
        {labels.reset}
      </button>
    </div>
  );
}
