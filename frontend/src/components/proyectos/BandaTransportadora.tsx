"use client";

import { useEffect, useRef } from "react";
import ProyectoCard, { Proyecto } from "./ProyectoCard";

const proyectos: Proyecto[] = [
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

export default function BandaTransportadora() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // We duplicate the list 3 times to ensure a completely seamless loop in both directions.
  const duplicarProyectos = () => {
    if (proyectos.length === 0) return [];
    return [...proyectos, ...proyectos, ...proyectos];
  };

  const listaDuplicada = duplicarProyectos();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.7; // Pixels to scroll per frame (smooth)

    const animate = () => {
      // Auto scroll only if not hovered/paused and not actively dragging
      if (!isPaused.current && !isDragging.current) {
        container.scrollLeft += scrollSpeed;
      }

      // Seamless infinite looping math
      // Since we repeated the list 3 times, container.scrollWidth / 3 represents 1 full set.
      const oneSetWidth = container.scrollWidth / 3;
      if (oneSetWidth > 0) {
        // If we scroll into the third set (scrollLeft >= oneSetWidth * 2), wrap back to the second set
        if (container.scrollLeft >= oneSetWidth * 2) {
          container.scrollLeft -= oneSetWidth;
        }
        // If we drag/scroll left near the start (scrollLeft <= 10), wrap forward to the middle set
        else if (container.scrollLeft <= 10) {
          container.scrollLeft += oneSetWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [proyectos]);

  // Drag-to-scroll mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = true;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag sensitivity multiplier
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full flex flex-col items-center py-6 relative select-none">
      {/* Industrial Top Rail / Border */}
      <div className="w-full max-w-[95vw] h-[1px] bg-gradient-to-r from-transparent via-red-900/60 to-transparent relative mb-2">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ED1C24]/30 to-transparent animate-pulse" />
      </div>

      {/* Viewport container with horizontal fading overlays */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Glow/Fade Overlay */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent z-20 pointer-events-none" />

        {/* Right Glow/Fade Overlay */}
        <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#070709] via-[#070709]/80 to-transparent z-20 pointer-events-none" />

        {/* Scrollable conveyor belt wrapper */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto conveyor-scrollbar cursor-grab active:cursor-grabbing py-2 select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
            isDragging.current = false;
          }}
          onTouchStart={() => {
            isPaused.current = true;
          }}
          onTouchEnd={() => {
            isPaused.current = false;
          }}
        >
          {/* Moving conveyor belt content (no padding for perfect seamless loop matching scrollWidth / 3) */}
          <div className="flex w-max gap-6 px-4">
            {listaDuplicada.map((proyecto, index) => (
              <ProyectoCard
                key={`${proyecto.id}-${index}`}
                proyecto={proyecto}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Industrial Bottom Rail / Border */}
      <div className="w-full max-w-[95vw] h-[1px] bg-gradient-to-r from-transparent via-red-900/60 to-transparent relative mt-2">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ED1C24]/30 to-transparent animate-pulse" />
      </div>

      {/* Faint system active status light */}
      <div className="flex items-center gap-2 mt-4 text-[10px] tracking-widest text-zinc-500 font-mono">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ED1C24]"></span>
        </span>
        <span>BANDA TRANSPORTADORA AUTOMÁTICA (ARRASTRABLE)</span>
      </div>
    </div>
  );
}
