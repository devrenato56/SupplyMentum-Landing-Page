"use client";

import ConstellationBackground from "@/components/convocatoria/ConstellationBackground";
import BandaTransportadora from "@/components/proyectos/BandaTransportadora";
import { Proyecto } from "@/components/proyectos/ProyectoCard";

const proyectosDestacados: Proyecto[] = [
  {
    id: "proj-1",
    title: "Plataforma de Trazabilidad IoT para Vacunas",
    category: "TECNOLOGÍA",
    description: "Implementación de sensores IoT para el monitoreo de temperatura y humedad en tiempo real durante la distribución de vacunas termo-sensibles.",
    year: "2025",
    imageUrl: "/images/iot.png",
  },
  {
    id: "proj-2",
    title: "Campaña de Posicionamiento Digital & Branding",
    category: "MARKETING",
    description: "Rediseño completo de la identidad visual de la comunidad y estrategias de marketing de contenido para potenciar el alcance en plataformas profesionales.",
    year: "2025",
    imageUrl: "/images/marketing.png",
  },
  {
    id: "proj-3",
    title: "Bootcamp de Inducción & Onboarding de Talento",
    category: "TALENTO",
    description: "Diseño y ejecución del programa de entrenamiento intensivo para nuevos miembros de la comunidad, logrando una retención del 95% en los primeros meses.",
    year: "2024",
    imageUrl: "/images/talent.png",
  },
  {
    id: "proj-4",
    title: "Optimización de Inventario & Almacén para Pymes",
    category: "CONSULTORÍA",
    description: "Asesoría estratégica de distribución y organización de almacenes con metodología de clasificación ABC, reduciendo tiempos de despacho en un 30%.",
    year: "2024",
    imageUrl: "/images/warehouse.png",
  },
  {
    id: "proj-5",
    title: "Dashboard Integral de KPIs Logísticos",
    category: "TECNOLOGÍA",
    description: "Creación de un panel analítico interactivo con métricas clave de rendimiento (KPIs) de cadena de suministro para la toma de decisiones basada en datos.",
    year: "2025",
    imageUrl: "/images/iot.png",
  },
];

export default function ProyectosPage() {
  return (
    <div className="relative w-full flex flex-col min-h-[80vh] bg-[#070709] text-white overflow-hidden justify-start items-center pt-5 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Constellation Canvas background */}
      <ConstellationBackground />

      {/* Red Radial Glow Effect */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[720px] h-[450px] pointer-events-none opacity-55 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(146, 2, 7, 0.42) 0%, rgba(237, 28, 36, 0.1) 40%, rgba(7, 7, 9, 0) 75%)",
        }}
      />

      {/* Hero Header */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mt-8 sm:mt-12">
        {/* Medium-large title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-white mb-6 uppercase">
          PROYECTOS
        </h1>

        {/* Small subtitle below */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-normal max-w-2xl leading-relaxed">
          Iniciativas reales que llevan el Supply Chain de la teoría a la práctica.
        </p>
      </div>

      {/* Sección Proyectos Destacados */}
      <section className="relative z-10 w-full pt-16 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="relative z-10 w-full mt-16 sm:mt-24 max-w-7xl mx-auto flex flex-col items-start">

          {/* Subtitle with line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#ED1C24]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#ED1C24] uppercase">
              DESTACADOS
            </span>
          </div>

          {/* Conveyor Belt / Banda Transportadora */}
          <div className="w-full">
            <BandaTransportadora proyectos={proyectosDestacados} />
          </div>
        </div>
      </section>
    </div>
  );
}
