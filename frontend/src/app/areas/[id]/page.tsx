import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areasData } from "@/data/areasData";
import AreaCTA from "@/components/AreaCTA";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const area = areasData.find((a) => a.id === id);
  
  if (!area) return { title: "Área no encontrada | SupplyMentum UNI" };
  
  return {
    title: `${area.name} | SupplyMentum UNI`,
    description: area.desc,
  };
}

export default async function AreaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const area = areasData.find((a) => a.id === id);
  
  if (!area) {
    notFound();
  }

  // Placeholder hero image depending on the area id
  const heroImg = `https://picsum.photos/seed/sm-hero-${area.id}/1920/1080`;

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-[#F5F4F2]">
      {/* Hero Section */}
      <section className="relative min-h-[56vh] flex items-end overflow-hidden">
        <img 
          src={heroImg} 
          alt={area.name} 
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.5] brightness-[0.6] contrast-[1.05]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(146,2,7,0.2)] to-[#0B0B0C]"></div>
        <div className="relative px-8 md:px-[72px] pb-[64px] max-w-[900px]">
          <Link 
            href="/areas" 
            className="inline-block bg-transparent border-none text-[#C9C8CE] text-[13px] font-[family-name:var(--font-open-sans)] tracking-[1px] hover:text-[#ED1C24] transition-colors mb-[24px]"
          >
            ← TODAS LAS ÁREAS
          </Link>
          <h1 className="m-0 mb-[18px] text-[40px] md:text-[60px] font-black leading-[1.05] font-[family-name:var(--font-archivo-black)]">
            {area.name}
          </h1>
          <p className="m-0 text-[17px] text-[#C9C8CE] font-light leading-[1.7] text-pretty font-[family-name:var(--font-open-sans)]">
            {area.desc}
          </p>
        </div>
      </section>

      {/* Realizamos / Buscamos */}
      <section className="px-8 md:px-[72px] py-[60px] md:py-[100px] grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        <div className="bg-[#131316] border border-[#26262A] border-t-[3px] border-t-[#ED1C24] p-[32px] md:p-[48px_42px]">
          <h2 className="m-0 mb-[28px] text-[26px] md:text-[30px] font-extrabold font-[family-name:var(--font-archivo-black)]">
            ¿Qué realizamos?
          </h2>
          <div className="flex flex-col gap-[18px]">
            {area.realizamos.map((it, idx) => (
              <div key={idx} className="flex gap-[16px] items-start">
                <div className="w-[8px] h-[8px] bg-[#ED1C24] mt-[9px] shrink-0"></div>
                <div className="text-[15px] text-[#C9C8CE] font-light leading-[1.7] font-[family-name:var(--font-open-sans)]">
                  {it}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#131316] border border-[#26262A] border-t-[3px] border-t-[#FFBD59] p-[32px] md:p-[48px_42px]">
          <h2 className="m-0 mb-[28px] text-[26px] md:text-[30px] font-extrabold font-[family-name:var(--font-archivo-black)]">
            ¿Qué buscamos?
          </h2>
          <div className="flex flex-col gap-[18px]">
            {area.buscamos.map((it, idx) => (
              <div key={idx} className="flex gap-[16px] items-start">
                <div className="w-[8px] h-[8px] bg-[#FFBD59] mt-[9px] shrink-0"></div>
                <div className="text-[15px] text-[#C9C8CE] font-light leading-[1.7] font-[family-name:var(--font-open-sans)]">
                  {it}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liderazgo */}
      <section className="px-8 md:px-[72px] pb-[60px] md:pb-[100px]">
        <div className="text-[12px] tracking-[4px] text-[#ED1C24] font-bold mb-[18px] uppercase font-[family-name:var(--font-open-sans)]">
          LIDERAZGO
        </div>
        <h2 className="m-0 mb-[36px] md:mb-[48px] text-[32px] md:text-[38px] font-extrabold font-[family-name:var(--font-archivo-black)]">
          Dirección del área
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] max-w-[820px]">
          {area.directores.map((d, idx) => (
            <div key={idx} className="bg-[#131316] border border-[#26262A]">
              <div className="relative h-[280px] overflow-hidden border-b-[3px] border-b-[#ED1C24]">
                <img 
                  src={d.img} 
                  alt={d.name} 
                  className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.35] brightness-[0.85]" 
                />
                <a 
                  href={d.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="LinkedIn" 
                  className="absolute top-[14px] right-[14px] bg-[#0B0B0C] border border-[#26262A] w-[38px] h-[38px] flex items-center justify-center font-extrabold text-[15px] text-[#ED1C24] hover:bg-[#1f1f23] transition-colors font-[family-name:var(--font-archivo-black)]"
                >
                  in
                </a>
              </div>
              <div className="p-[22px_24px]">
                <div className="text-[17px] font-bold font-[family-name:var(--font-archivo-black)]">
                  {d.name}
                </div>
                <div className="text-[12px] tracking-[1.5px] text-[#ED1C24] font-semibold my-[6px] mb-[10px] uppercase font-[family-name:var(--font-open-sans)]">
                  {d.role}
                </div>
                <div className="text-[13px] text-[#9B9AA0] font-light leading-[1.6] font-[family-name:var(--font-open-sans)]">
                  {d.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AreaCTA />
    </div>
  );
}
