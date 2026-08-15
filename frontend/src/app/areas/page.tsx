import AreasSection from "@/components/areas/AreasSection";
import React from "react";
import { areasData } from "@/data/areasData";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata = {
  title: "Áreas - SupplyMentum UNI",
  description: "Conoce las diferentes áreas de desarrollo dentro de SupplyMentum UNI.",
};

export default function AreasPage() {
  return (
    <main>
      <SmoothScroll />
      <AreasSection initialAreas={areasData} />
    </main>
  );
}
