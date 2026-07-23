"use client";

import { useEffect, useRef, useState } from "react";
import type { Specialization } from "@/lib/data/specializations";

const AUTO_ADVANCE_MS = 5000;

interface SpecializationsBlockProps {
  specializations: Specialization[];
}

/**
 * Bloque de especializaciones (RF-05). No existe en el prototipo estático:
 * se diseña desde cero siguiendo el criterio visual del resto de la Home
 * (misma paleta y tipografía de `site.css`).
 *
 * El isotipo del centro actúa como disparador: cada `AUTO_ADVANCE_MS` avanza
 * solo a la siguiente especialización, y un clic la avanza también de
 * inmediato (y reinicia el temporizador, para no encimar avances).
 *
 * La transición visual entre especializaciones y el soporte de
 * `prefers-reduced-motion` / navegación por teclado se resuelven en las
 * siguientes tareas de esta fase.
 */
export default function SpecializationsBlock({ specializations }: SpecializationsBlockProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % specializations.length);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restartTimer se reconstruye cada render a propósito, no debe re-disparar el efecto
  }, [specializations.length]);

  const advance = () => {
    setIndex((i) => (i + 1) % specializations.length);
    restartTimer();
  };

  const current = specializations[index];

  return (
    <section className="border-t border-white/[.07]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <p className="mb-5 flex items-center gap-3.5 font-[family-name:var(--font-archivo)] text-xs font-bold tracking-[.22em] text-[#ED1C24] uppercase before:h-[2px] before:w-[34px] before:flex-none before:bg-current">
          Especializaciones
        </p>
        <h2 className="mb-14 max-w-[26ch] font-[family-name:var(--font-archivo-black)] text-[clamp(30px,4.2vw,58px)] leading-[1.02] tracking-[-.03em] text-balance">
          Seis ramas, un mismo centro
        </h2>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <button
            type="button"
            onClick={advance}
            aria-label={`Especialización actual: ${current.name}. Haz clic para ver la siguiente.`}
            className="group relative mx-auto h-40 w-40 flex-none cursor-pointer lg:h-52 lg:w-52"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#ED1C24]/20 motion-safe:animate-ping"
            />
            <span
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full border border-[#ED1C24]/40 transition-colors duration-300 group-hover:border-[#ED1C24]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- isotipo local, no requiere optimización de next/image */}
            <img
              src="/cubo.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-[22%] h-[56%] w-[56%] object-contain drop-shadow-[0_16px_40px_rgba(237,28,36,.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          <div>
            <span className="mb-3 block font-[family-name:var(--font-archivo)] text-xs font-bold tracking-[.16em] text-[#FFBD59] uppercase">
              {current.short}
            </span>
            <h3 className="mb-4 font-[family-name:var(--font-archivo)] text-2xl font-bold tracking-[-.015em]">
              {current.name}
            </h3>
            <p className="max-w-[56ch] text-[clamp(16px,1.25vw,19px)] leading-[1.7] font-light text-zinc-400 text-pretty">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
