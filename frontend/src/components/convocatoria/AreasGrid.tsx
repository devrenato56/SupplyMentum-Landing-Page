"use client";

import { useState } from "react";
import { AreaData } from "./AreaDetailModal";
import AreaDetailModal from "./AreaDetailModal";
import RevealOnScroll from "../ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";

const AREAS_DATA: AreaData[] = [
  {
    id: "operaciones",
    name: "Operaciones & Logística",
    subtitle: "El corazón técnico del centro",
    description:
      "El corazón técnico del centro: planificamos, optimizamos y ejecutamos la logística de cada iniciativa, aplicando herramientas reales de gestión de operaciones.",
    slots: 5,
    requirements: [
      "Interés o conocimientos en gestión de operaciones y cadena de suministro.",
      "Capacidad de planificación y resolución práctica de imprevistos.",
      "Manejo básico/intermedio de Excel u herramientas de optimización.",
    ],
    responsibilities: [
      "Gestionar la logística integral de eventos presenciales y virtuales.",
      "Optimizar flujos de trabajo internos e inventario de materiales.",
      "Elaborar reportes de eficiencia operativa y presupuestos de eventos.",
    ],
    directors: [],
  },
  {
    id: "marketing",
    name: "Marketing & Contenidos",
    subtitle: "La voz e imagen de SupplyMentum",
    description:
      "Damos voz e imagen a SupplyMentum: construimos la marca, creamos contenido y comunicamos todo lo que el centro hace dentro y fuera de la UNI.",
    slots: 4,
    requirements: [
      "Ganas de crear contenido para redes sociales (LinkedIn, Instagram, TikTok).",
      "Gusto por el diseño gráfico (Canva, Photoshop, Illustrator, Figma) o edición de video.",
      "Buena redacción y comunicación creativa.",
    ],
    responsibilities: [
      "Diseñar piezas gráficas, flyers e infografías para eventos.",
      "Planificar el calendario editorial de publicaciones.",
      "Producir reels, testimoniales y coberturas en vivo.",
    ],
    directors: [],
  },
  {
    id: "talento",
    name: "Gestión del Talento",
    subtitle: "Cuidamos a quienes construyen el centro",
    description:
      "Cuidamos a las personas que hacen SupplyMentum: reclutamos, integramos y desarrollamos al equipo, manteniendo viva la cultura del centro.",
    slots: 4,
    requirements: [
      "Alta empatía, habilidades interpersonales y vocación de servicio.",
      "Interés en gestión humana, clima organizacional y liderazgo.",
      "Organización y puntualidad en seguimiento de equipos.",
    ],
    responsibilities: [
      "Liderar las etapas del proceso de convocatoria e integración.",
      "Organizar dinámicas de integración, birthdays y eventos internos.",
      "Evaluar la satisfacción y crecimiento de los miembros.",
    ],
    directors: [],
  },
  {
    id: "corporativas",
    name: "Relaciones Corporativas",
    subtitle: "El nexo con el sector empresarial",
    description:
      "Conectamos al centro con el mundo empresarial: gestionamos alianzas, auspicios y vínculos con profesionales líderes del Supply Chain en el Perú.",
    slots: 3,
    requirements: [
      "Proactividad, desenvolvimiento comercial y facilidad de palabra.",
      "Capacidad para contactar ponentes, directivos y empresas vía LinkedIn/email.",
      "Redacción formal para cartas de auspicación y convenios.",
    ],
    responsibilities: [
      "Conseguir ponentes de alto nivel para conferencias y seminarios.",
      "Gestionar alianzas con empresas para patrocinio de iniciativas.",
      "Coordinar visitas técnicas a plantas logísticas y puertos.",
    ],
    directors: [],
  },
  {
    id: "proyectos",
    name: "Proyectos & Consultoría",
    subtitle: "Conocimiento llevado a la práctica",
    description:
      "Llevamos el conocimiento a la práctica: diseñamos y ejecutamos proyectos y consultorías reales que generan impacto en organizaciones.",
    slots: 5,
    requirements: [
      "Pensamiento crítico y capacidad de estructuración de problemas.",
      "Interés en consultoría de negocios, metodologías ágiles o lean.",
      "Compromiso para desarrollar entregables con estándares profesionales.",
    ],
    responsibilities: [
      "Desarrollar casos de estudio aplicados a logística real.",
      "Formar parte de células de trabajo en consultorías para PyMEs.",
      "Elaborar reportes de diagnóstico y propuestas de mejora.",
    ],
    directors: [],
  },
  {
    id: "tecnologia",
    name: "Innovación & Tecnología",
    subtitle: "La frontera tecnológica de la logística",
    description:
      "Exploramos las herramientas que están transformando la cadena de suministro: datos, automatización y tecnología aplicada a la logística.",
    slots: 4,
    requirements: [
      "Interés en programación (Python, JavaScript/TypeScript, SQL, Power BI).",
      "Ganas de automatizar procesos o desarrollar la plataforma web.",
      "Curiosidad por IA aplicada a optimización de rutas o inventarios.",
    ],
    responsibilities: [
      "Dar mantenimiento y desarrollar nuevas funciones en la web oficial.",
      "Crear tableros de control (dashboards) e analítica para la comunidad.",
      "Investigar tecnologías emergentes en Supply Chain (IoT, Blockchain, AI).",
    ],
    directors: [],
  },
];

interface AreasGridProps {
  onSelectAreaForForm: (areaName: string) => void;
  isConvocatoriaActive: boolean;
}

export default function AreasGrid({
  onSelectAreaForForm,
  isConvocatoriaActive,
}: AreasGridProps) {
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);

  return (
    <section id="areas" className="w-full py-20 bg-[#070709] border-t border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Line */}
        <RevealOnScroll direction="up">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-[#ED1C24]" />
            <span className="text-xs font-extrabold tracking-widest text-[#ED1C24] uppercase">
              ÁREAS ABIERTAS
            </span>
          </div>
        </RevealOnScroll>

        {/* Title and Subtitle */}
        <RevealOnScroll direction="up" delayMs={100}>
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
              Elige dónde quieres aportar
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-normal">
              Seis áreas, un mismo requisito: compromiso y ganas de construir algo real.
            </p>
          </div>
        </RevealOnScroll>

        {/* Grid of 6 Area Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AREAS_DATA.map((area, idx) => (
            <RevealOnScroll key={area.id} direction="up" delayMs={150 + idx * 100}>
              <div className="group relative bg-[#121216] border border-zinc-800/80 hover:border-zinc-700 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/20 h-full">
                <div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#ED1C24] transition-colors">
                    {area.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {area.description}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedArea(area)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#ED1C24] hover:text-red-400 tracking-wider uppercase group-hover:translate-x-1 transition-all"
                  >
                    Ver el área <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Modal detail */}
      <AreaDetailModal
        area={selectedArea}
        onClose={() => setSelectedArea(null)}
        onApplyForArea={onSelectAreaForForm}
        isConvocatoriaActive={isConvocatoriaActive}
      />
    </section>
  );
}
