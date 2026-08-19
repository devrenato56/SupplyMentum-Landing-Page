"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Miembro {
  name: string;
  role: string;
  desc: string;
  img: string;
  linkedin: string;
}

const JUNTA_DIRECTIVA: Miembro[] = [
  {
    name: "Valeria Quispe",
    role: "PRESIDENTA",
    desc: "Estudiante de Ingeniería Industrial. Lidera la visión del centro, define las metas estratégicas y coordina alianzas con entidades nacionales e internacionales.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Diego Ramos",
    role: "VICEPRESIDENTE",
    desc: "Apasionado por las operaciones, la investigación aplicada y la formación integral de los nuevos talentos que ingresan a la comunidad.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Lucía Fernández",
    role: "DIR. OPERACIONES",
    desc: "Especialista en logística interna, organización de eventos institucionales y la optimización continua de procesos operativos del centro.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Jorge Castillo",
    role: "DIR. MARKETING",
    desc: "Encargado de construir la voz, presencia digital y toda la línea de diseño e identidad visual que caracteriza a SupplyMentum.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Andrea Torres",
    role: "DIR. TALENTO",
    desc: "Enfocada en velar por el clima interno, promover la cultura colaborativa y acompañar el crecimiento académico y profesional de cada miembro.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Renato Vega",
    role: "DIR. RELACIONES CORPORATIVAS",
    desc: "Nexo clave con el mundo empresarial, facilitando visitas técnicas, convenios de prácticas y la participación de ponentes líderes del sector.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Camila Ríos",
    role: "DIR. PROYECTOS",
    desc: "Lidera la formulación y ejecución de proyectos de consultoría, investigación aplicada y retos logísticos con impacto en la sociedad.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
  {
    name: "Bruno Salas",
    role: "DIR. TECNOLOGÍA",
    desc: "Impulsa el desarrollo de soluciones informáticas, el análisis de datos de la cadena de suministro y la automatización de herramientas del centro.",
    img: "/images/conocenos/quokka.png",
    linkedin: "https://www.linkedin.com/company/supplymentum-uni/",
  },
];

export default function Conocenos() {
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 36; // píxeles por segundo
    let lastProgrammaticScrollLeft = rail.scrollLeft;
    let isUserInteracting = false;
    let resumeTimeout: NodeJS.Timeout;

    // Calcula el punto de bucle exacto utilizando el desfase del primer elemento clonado
    const getLimit = () => {
      if (rail.children.length > JUNTA_DIRECTIVA.length) {
        const firstClone = rail.children[JUNTA_DIRECTIVA.length] as HTMLElement;
        const firstOrig = rail.children[0] as HTMLElement;
        if (firstClone && firstOrig) {
          return firstClone.offsetLeft - firstOrig.offsetLeft;
        }
      }
      return rail.scrollWidth / 2;
    };

    const handleScroll = () => {
      const currentScroll = rail.scrollLeft;
      const diff = Math.abs(currentScroll - lastProgrammaticScrollLeft);
      
      // Si la diferencia es mayor a 2px, el scroll fue manual (arrastre de barra, rueda, etc.)
      if (diff > 2) {
        isUserInteracting = true;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
          isUserInteracting = false;
          // Al reanudar, envolvemos de manera limpia e invisible si pasó el límite
          const limit = getLimit();
          if (rail.scrollLeft >= limit) {
            rail.scrollLeft -= limit;
          }
          lastProgrammaticScrollLeft = rail.scrollLeft;
          lastTime = performance.now();
        }, 1500);
      }
    };

    rail.addEventListener("scroll", handleScroll, { passive: true });

    const step = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isUserInteracting) {
        const limit = getLimit();
        if (limit > 0) {
          let newScroll = rail.scrollLeft + speed * dt;
          if (newScroll >= limit) {
            newScroll -= limit;
          }
          rail.scrollLeft = newScroll;
          lastProgrammaticScrollLeft = rail.scrollLeft;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeTimeout);
      rail.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-[#F5F4F2] min-h-screen font-sans bg-transparent">
      
      {/* HERO SECTION - RF-10 */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden px-4 bg-transparent border-b border-[#1A1A1F]">
        {/* Sutil brillo de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#920207]/12 to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* Contenedor de Texto */}
        <div className="relative max-w-4xl mx-auto z-20 px-4">
          <span className="text-[12px] md:text-[13px] tracking-[6px] text-[#FFBD59] font-bold block mb-4 uppercase">
            CONÓCENOS
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            Inspiramos a los futuros profesionales a{" "}
            <span className="text-[#ED1C24]">
              transformar
            </span>{" "}
            el mundo empresarial
          </h1>
        </div>
      </section>

      {/* SECCIÓN MISIÓN Y VISIÓN */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Misión Card */}
          <div className="bg-[#131316] border border-[#26262A] border-l-[6px] border-l-[#ED1C24] p-10 transition-transform hover:scale-[1.01] duration-300">
            <span className="text-[13px] tracking-[4px] text-[#ED1C24] font-extrabold block mb-4">
              MISIÓN
            </span>
            <p className="text-lg md:text-xl text-[#D8D7D4] font-light leading-relaxed">
              Brindar formación aplicada y accesible para fortalecer competencias técnicas y estratégicas, mediante programas innovadores y metodologías prácticas.
            </p>
          </div>

          {/* Visión Card */}
          <div className="bg-[#ED1C24] p-10 transition-transform hover:scale-[1.01] duration-300 shadow-xl shadow-[#ED1C24]/10">
            <span className="text-[13px] tracking-[4px] text-[#FFBD59] font-extrabold block mb-4">
              VISIÓN
            </span>
            <p className="text-lg md:text-xl text-white font-light leading-relaxed">
              Ser la comunidad universitaria líder en <strong className="font-semibold text-[#FED775]">Supply Chain</strong> en el Perú, reconocida por su excelencia, innovación y por inspirar a los futuros profesionales a transformar el mundo empresarial.
            </p>
          </div>

        </div>
      </section>

      {/* SECCIÓN JUNTA DIRECTIVA - RF-11 */}
      <section className="py-24 overflow-hidden bg-[#070709] border-t border-[#131316]">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
          <span className="text-[12px] tracking-[4px] text-[#ED1C24] font-bold block mb-2">
            JUNTA DIRECTIVA
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Conoce a nuestro equipo
          </h2>
        </div>

        {/* Carrusel Marquee */}
        <div className="relative w-full">
          {/* Sombras difuminadas en los extremos del carrusel */}
          <div className="absolute left-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-r from-[#070709] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-l from-[#070709] to-transparent z-10 pointer-events-none" />

          {/* Fila del Riel Autoscrollable */}
          <div
            ref={railRef}
            className="flex w-full overflow-x-auto gap-6 px-6 md:px-12 pb-6 pt-2 rail-scrollbar select-none"
          >
            {[...JUNTA_DIRECTIVA, ...JUNTA_DIRECTIVA].map((executive, index) => (
              <div
                key={index}
                className="w-[340px] md:w-[380px] bg-[#121216] border border-[#22222a] flex-shrink-0 transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Contenedor de la Foto */}
                <div className="relative h-[340px] md:h-[380px] w-full overflow-hidden border-b-3 border-b-[#ED1C24] group">
                  <Image
                    src={executive.img}
                    alt={executive.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale-[35%] brightness-[85%] group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  {/* Botón de LinkedIn en la esquina superior derecha */}
                  <a
                    href={executive.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="absolute top-4 right-4 bg-[#0B0B0C] border border-[#22222a] w-[38px] h-[38px] flex items-center justify-center font-bold text-[15px] text-[#ED1C24] hover:bg-[#ED1C24] hover:text-white transition-colors duration-300 rounded shadow-md"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>

                {/* Detalles del Miembro */}
                <div className="p-6">
                  <div className="text-[17px] font-bold text-white tracking-wide">
                    {executive.name}
                  </div>
                  <div className="text-[12px] tracking-[1.5px] text-[#ED1C24] font-bold mt-2 uppercase">
                    {executive.role}
                  </div>
                  <p className="text-[13px] text-[#9B9AA0] font-light leading-[1.6] mt-4 min-h-[72px]">
                    {executive.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION - ¿Quieres formar parte? */}
      <section className="relative py-24 text-center overflow-hidden bg-[#0A0A0B]/40 border-t border-[#131316]">
        {/* Resplandor radial rojo de fondo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(146,2,7,0.38),transparent_70%)] pointer-events-none z-0" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            ¿Quieres formar parte?
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-light max-w-xl mx-auto mb-10">
            Revisa las áreas abiertas y postula a la convocatoria vigente.
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href="/convocatoria"
              className="px-8 py-4 bg-[#ED1C24] hover:bg-[#C4151C] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#ED1C24]/10 hover:shadow-[#ED1C24]/20"
            >
              Postula aquí
            </Link>
            <Link
              href="/areas"
              className="px-8 py-4 border border-zinc-800 hover:border-[#ED1C24] text-zinc-400 hover:text-[#ED1C24] font-bold text-xs tracking-widest uppercase transition-all duration-300 bg-transparent"
            >
              Ver las áreas
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
