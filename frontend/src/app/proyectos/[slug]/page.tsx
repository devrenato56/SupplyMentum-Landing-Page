import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { proyectos, equipoProyecto } from "@/data/proyectos";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Archivo_Black, Archivo, Open_Sans } from "next/font/google";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black"
});

const archivoN = Archivo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-archivo-n"
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans"
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) return { title: "Proyecto no encontrado | SupplyMentum UNI" };

  return {
    title: `${proyecto.name} | SupplyMentum UNI`,
    description: proyecto.desc,
  };
}

export default async function ProyectoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const proyecto = proyectos.find((p) => p.slug === slug);

  if (!proyecto) {
    notFound();
  }

  // Galería derivada de la semilla del slug (3 fotos de Picsum)
  const galleryIndices = [1, 2, 3];

  return (
    <div className={`${archivoBlack.variable} ${archivoN.variable} ${openSans.variable} relative w-full flex flex-col min-h-screen bg-[#070709] text-white overflow-hidden justify-start items-center`}>
      <SmoothScroll />

      {/* Hero Section */}
      <section className="relative w-full min-h-[320px] sm:min-h-[375px] flex items-start overflow-hidden border-b border-white/[.07] shrink-0">
        {/* Imagen de fondo local */}
        <div className="absolute inset-0 bg-zinc-950">
          <Image
            src={proyecto.img}
            alt={proyecto.name}
            fill
            priority
            sizes="100vw"
            className="object-cover filter grayscale-[0.5] brightness-[0.55] contrast-[1.06]"
          />
        </div>

        {/* Capa de gradiente rojo oscuro y negro */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(146, 2, 7, 0.28) 0%, rgba(7, 7, 9, 0.92) 88%)"
          }}
        />

        <div className="wrap relative z-20 pb-12 pt-28 md:pb-14 md:pt-26 pl-5 flex flex-col items-start w-full">
          <Link
            href="/proyectos"
            className="back group"
          >
            ← Todos los proyectos
          </Link>
          <div className="flex gap-3 items-center mb-4 flex-wrap">
            <span style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[11px] font-bold tracking-widest text-white bg-[#ED1C24] px-2.5 py-1 uppercase">{proyecto.area}</span>
            <span style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[12px] font-bold tracking-widest text-zinc-400">
              {proyecto.year}
            </span>
          </div>
          <h1 className="display mb-4 text-[clamp(32px,5vw,60px)] leading-[1.05]">
            {proyecto.name}
          </h1>
          <p className="lede max-w-[62ch]">
            {proyecto.desc}
          </p>
        </div>
      </section>

      {/* Participantes */}
      <section className="section py-16 md:py-31 border-b border-white/[.07] w-full">
        <div className="wrap w-full pl-4">
          <h2 className="display mb-11 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Participantes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {equipoProyecto.map((t, idx) => (
              <article key={idx} className="person group relative bg-[#121215] border border-white/[.07] overflow-hidden">
                <div className="person-photo relative aspect-square overflow-hidden border-b-[3px] border-b-[#ED1C24] bg-zinc-950">
                  {/* Usamos img tradicional para fotos externas de Picsum */}
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.45] brightness-[0.85] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                </div>
                <div className="p-5">
                  <p style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[16px] font-bold text-white leading-snug">
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[11px] tracking-widest text-[#ED1C24] uppercase mt-2">
                    {t.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="section pt-12 md:pt-32 pb-16 md:pb-24 border-b border-white/[.07] w-full">
        <div className="wrap w-full">
          <h2 className="display mb-11 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Galería del proyecto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {galleryIndices.map((i) => (
              <figure key={i} className="group relative aspect-[4/3] border border-white/[.07] overflow-hidden bg-zinc-950">
                {/* Usamos img tradicional para fotos externas de Picsum */}
                <img
                  src={`https://picsum.photos/seed/${proyecto.slug}-g${i}/900/700`}
                  alt={`${proyecto.name} galería ${i}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.45] brightness-[0.78] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-[0.95]"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Convocatoria */}
      <section
        className="section pt-12 md:pt-31 pb-16 md:pb-30 text-center w-full relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(146, 2, 7, 0.28) 0%, rgba(7, 7, 9, 0) 70%), #070709"
        }}
      >
        <div className="wrap max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="display mb-4.5 text-[32px] md:text-[38px] font-black text-white tracking-wide">
            ¿Quieres liderar el próximo?
          </h2>
          <p className="lede mb-11 max-w-[56ch] mx-auto text-zinc-400 font-light leading-relaxed">
            Los proyectos los proponen y ejecutan nuestros propios miembros.
          </p>
          <Link href="/convocatoria" className="btn btn-primary btn-lg !text-[15px] !px-12 !py-5">
            Postula aquí
          </Link>
        </div>
      </section>
    </div>
  );
}
