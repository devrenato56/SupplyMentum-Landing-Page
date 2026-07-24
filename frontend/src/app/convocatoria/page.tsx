"use client";

import { useState } from "react";
import ConvocatoriaMarquee from "@/components/convocatoria/ConvocatoriaMarquee";
import CountdownTimer from "@/components/convocatoria/CountdownTimer";
import AreasGrid from "@/components/convocatoria/AreasGrid";
import BenefitsGrid from "@/components/convocatoria/BenefitsGrid";
import ConstellationBackground from "@/components/convocatoria/ConstellationBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function ConvocatoriaPage() {
  const [isConvocatoriaActive] = useState(true);

  const handleSelectAreaForForm = (areaName: string) => {
    // Area selection handler
    console.log("Selected area:", areaName);
  };

  return (
    <div className="relative w-full flex flex-col min-h-screen bg-[#070709] text-white overflow-hidden">
      <SmoothScroll />

      {/* Constellation Canvas background */}
      <ConstellationBackground />

      {/* Ticker background */}
      <div className="relative z-10">
        <ConvocatoriaMarquee />
      </div>

      {/* Hero Section with Red Radial Glow */}
      <section className="relative z-10 w-full pt-16 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Red Radial Glow Effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[720px] h-[450px] pointer-events-none opacity-55 z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(146, 2, 7, 0.42) 0%, rgba(237, 28, 36, 0.12) 40%, rgba(7, 7, 9, 0) 75%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center w-full">
          {/* Section Header Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest text-[#ED1C24] uppercase mb-5">
            <span className="w-8 h-0.5 bg-[#ED1C24]" />
            <span>CONVOCATORIA 2026-II</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-tight whitespace-nowrap">
            Únete a SupplyMentum UNI
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl mb-10">
            La convocatoria está abierta. El tiempo corre.
          </p>

          {/* Countdown & Button Component */}
          <CountdownTimer isConvocatoriaActive={isConvocatoriaActive} />
        </div>
      </section>

      {/* Áreas Abiertas Section */}
      <div className="relative z-10">
        <AreasGrid
          onSelectAreaForForm={handleSelectAreaForForm}
          isConvocatoriaActive={isConvocatoriaActive}
        />
      </div>

      {/* Benefits Section */}
      <div className="relative z-10">
        <BenefitsGrid />
      </div>
    </div>
  );
}
