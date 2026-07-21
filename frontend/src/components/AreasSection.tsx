"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box } from "lucide-react";
import { areasData } from "../data/areasData";

export default function AreasSection() {
  const router = useRouter();
  const [areaSel, setAreaSel] = useState(0);

  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      const ring = document.getElementById("areas-ring");
      if (!ring || !ring.contains(e.target as Node)) return;
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastWheel < 380) return;
      lastWheel = now;
      
      const d = e.deltaY > 0 ? 1 : -1;
      setAreaSel((prev) => (prev + d + areasData.length) % areasData.length);
    };
    
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, []);

  const selectedArea = areasData[areaSel];
  const N = areasData.length;

  return (
    <section 
      id="areas"
      className="min-h-[92vh] px-8 lg:px-[64px] py-[70px] grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-[56px] relative overflow-hidden bg-[#0B0B0C] text-[#F5F4F2]"
    >
      <div className="absolute -left-[200px] -bottom-[200px] w-[640px] h-[640px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(146,2,7,.22) 0%, transparent 65%)" }}></div>
      
      <div id="areas-ring" className="relative w-full max-w-[620px] lg:w-[42vw] aspect-square flex-shrink-0">
        <div className="absolute inset-[12%] rounded-full border-[clamp(14px,2.2vw,28px)] border-[rgba(237,28,36,.16)]"></div>
        <div className="absolute inset-[12%] rounded-full border border-[rgba(237,28,36,.3)]"></div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[23%] text-[#ED1C24] animate-[spin_22s_linear_infinite]">
          <Box className="w-full h-full drop-shadow-[0_0_15px_rgba(237,28,36,0.5)]" />
        </div>
        
        {areasData.map((a, i) => {
          const ang = -Math.PI / 2 + ((i - areaSel + N) % N) * (2 * Math.PI / N);
          const x = 50 + 38 * Math.cos(ang);
          const y = 50 + 38 * Math.sin(ang);
          const sel = i === areaSel;
          
          return (
            <div
              key={a.id}
              onClick={() => setAreaSel(i)}
              className={`absolute flex flex-col items-center justify-center gap-[4%] w-[19%] aspect-square rounded-full cursor-pointer z-10 transition-all duration-500 ease-out -translate-x-1/2 -translate-y-1/2
                ${sel ? "bg-white border-2 border-white shadow-[0_0_44px_rgba(237,28,36,.5)] scale-[1.12]" : "bg-gradient-to-br from-[#8A070D] to-[#3A0407] border-2 border-[rgba(237,28,36,.5)] shadow-[0_8px_24px_rgba(0,0,0,.4)] scale-100"}
              `}
              style={{
                left: `${x.toFixed(2)}%`,
                top: `${y.toFixed(2)}%`,
              }}
            >
              <svg width="34%" viewBox="0 0 24 24" fill="none" stroke={sel ? "#ED1C24" : "#fff"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="block">
                {a.iconPaths.map((d, k) => (
                  <path key={k} d={d} />
                ))}
              </svg>
              <span className={`text-[clamp(8px,.9vw,11px)] font-semibold tracking-[0.4px] text-center leading-tight ${sel ? "text-[#0B0B0C]" : "text-[#F5F4F2]"}`}>
                {a.short}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="relative w-full max-w-[560px] justify-self-start">
        <div className="text-[12px] tracking-[4px] text-[#ED1C24] font-bold mb-[18px]">
          NUESTRAS ÁREAS · SCROLLEA PARA GIRAR
        </div>
        <h1 className="m-0 mb-5 text-[52px] font-extrabold leading-[1.1]">
          {selectedArea.name}
        </h1>
        <p className="m-0 mb-8 text-[16px] text-[#9B9AA0] font-light leading-[1.8] max-w-[520px] text-pretty">
          {selectedArea.desc}
        </p>
        <button 
          className="bg-[#ED1C24] hover:bg-[#C4151C] text-white border-none font-bold text-[14px] tracking-[1.5px] px-[40px] py-[16px] cursor-pointer transition-colors duration-300"
          onClick={() => router.push(`/areas/${selectedArea.id}`)}
        >
          DESCUBRE MÁS →
        </button>
      </div>
    </section>
  );
}
