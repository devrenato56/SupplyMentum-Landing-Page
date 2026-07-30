import React from "react";
import Conocenos from "@/components/Conocenos";
import NetworkBackground from "@/components/home/NetworkBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conócenos - SupplyMentum UNI",
  description: "Nuestra historia, misión, visión y el equipo de la Junta Directiva detrás del centro de Supply Chain.",
};

export default function ConocenosPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#09090B]">
      <SmoothScroll />
      <NetworkBackground />
      <main className="relative z-[1]">
        <Conocenos />
      </main>
    </div>
  );
}
