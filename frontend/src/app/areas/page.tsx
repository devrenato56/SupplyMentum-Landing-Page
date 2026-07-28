import AreasSection from "@/components/areas/AreasSection";
import React from "react";
import { areasData } from "@/data/areasData";

export const metadata = {
  title: "Áreas - SupplyMentum UNI",
  description: "Conoce las diferentes áreas de desarrollo dentro de SupplyMentum UNI.",
};

export default function AreasPage() {
  return (
    <main>
      <AreasSection initialAreas={areasData} />
    </main>
  );
}
