"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  isConvocatoriaActive: boolean;
}

export default function CountdownTimer({
  isConvocatoriaActive,
}: CountdownTimerProps) {
  // Target date: August 15, 2026, 23:59:59
  const targetDate = new Date("2026-08-15T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 1,
    minutes: 53,
    seconds: 59,
  });

  useEffect(() => {
    if (!isConvocatoriaActive) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConvocatoriaActive, targetDate]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Main Countdown Grid - Slightly Larger Balanced Boxes */}
      <div
        className={`flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 transition-all duration-300 ${
          isConvocatoriaActive ? "" : "grayscale opacity-50"
        }`}
      >
        {/* Days Box */}
        <div className="w-24 sm:w-28 lg:w-32 h-26 sm:h-30 lg:h-34 bg-[#141418] border-t-3 border-t-[#ED1C24] border-x border-b border-zinc-800 flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            {pad(timeLeft.days)}
          </span>
          <span className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.2em] text-zinc-400 uppercase mt-2.5">
            DÍAS
          </span>
        </div>

        {/* Hours Box */}
        <div className="w-24 sm:w-28 lg:w-32 h-26 sm:h-30 lg:h-34 bg-[#141418] border-t-3 border-t-[#ED1C24] border-x border-b border-zinc-800 flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.2em] text-zinc-400 uppercase mt-2.5">
            HORAS
          </span>
        </div>

        {/* Minutes Box */}
        <div className="w-24 sm:w-28 lg:w-32 h-26 sm:h-30 lg:h-34 bg-[#141418] border-t-3 border-t-[#ED1C24] border-x border-b border-zinc-800 flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.2em] text-zinc-400 uppercase mt-2.5">
            MINUTOS
          </span>
        </div>

        {/* Seconds Box */}
        <div className="w-24 sm:w-28 lg:w-32 h-26 sm:h-30 lg:h-34 bg-[#141418] border-t-3 border-t-[#ED1C24] border-x border-b border-zinc-800 flex flex-col items-center justify-center shadow-xl">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-sans">
            {pad(timeLeft.seconds)}
          </span>
          <span className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.2em] text-zinc-400 uppercase mt-2.5">
            SEGUNDOS
          </span>
        </div>
      </div>

      {/* Date detail text */}
      <p className="mt-7 text-xs sm:text-sm text-zinc-400 font-normal">
        Cierre de postulaciones: 15 de agosto de 2026 · 11:59 p. m.
      </p>

      {/* Red POSTULA AHORA Button */}
      <div className="mt-7">
        <a
          href="#postula"
          className={`px-12 sm:px-16 py-4 text-xs sm:text-sm font-extrabold tracking-widest text-white uppercase rounded-none transition-all shadow-xl ${
            isConvocatoriaActive
              ? "bg-[#ED1C24] hover:bg-red-600 hover:scale-[1.02] active:scale-95 shadow-red-600/30"
              : "bg-zinc-800 text-zinc-500 pointer-events-none"
          }`}
        >
          POSTULA AHORA
        </a>
      </div>
    </div>
  );
}
