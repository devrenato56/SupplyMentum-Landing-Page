import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import AreaCTA from "@/components/areas/AreaCTA";
import SmoothScroll from "@/components/ui/SmoothScroll";

import {
  getPublicArea,
} from "@/lib/api/areas";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;

  const areaId = Number(id);

  if (!Number.isInteger(areaId) || areaId <= 0) {
    return {
      title:
        "Área no encontrada | SupplyMentum UNI",
    };
  }

  try {
    const area =
      await getPublicArea(areaId);

    return {
      title:
        `${area.name} | SupplyMentum UNI`,

      description:
        area.description ??
        `Conoce más sobre ${area.name} en SupplyMentum UNI.`,
    };
  } catch {
    return {
      title:
        "Área no encontrada | SupplyMentum UNI",
    };
  }
}

export default async function AreaDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const areaId = Number(id);

  if (
    !Number.isInteger(areaId) ||
    areaId <= 0
  ) {
    notFound();
  }

  let area;

  try {
    area =
      await getPublicArea(areaId);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F5F4F2]">
      <SmoothScroll />

      {/* Hero */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden">
        {area.image_url ? (
          <img
            src={area.image_url}
            alt={area.name}
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.5] brightness-[0.6] contrast-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#131316]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(146,2,7,0.2)] to-[#0B0B0C]" />

        <div className="wrap relative flex flex-col items-center pb-[64px] pt-[120px] text-center">
          <Link
            href="/areas"
            className="mb-[24px] inline-block border-none bg-transparent text-[13px] tracking-[1px] text-[#C9C8CE] transition-colors hover:text-[#ED1C24] font-[family-name:var(--font-open-sans)]"
          >
            ← TODAS LAS ÁREAS
          </Link>

          {area.short_name && (
            <div className="mb-4 text-[12px] font-bold uppercase tracking-[4px] text-[#ED1C24] font-[family-name:var(--font-open-sans)]">
              {area.short_name}
            </div>
          )}

          <h1 className="m-0 mb-[18px] max-w-[900px] text-[40px] font-black leading-[1.05] md:text-[60px] font-[family-name:var(--font-archivo-black)]">
            {area.name}
          </h1>

          <p className="m-0 max-w-[900px] text-pretty text-[17px] font-light leading-[1.7] text-[#C9C8CE] font-[family-name:var(--font-open-sans)]">
            {area.description ??
              "Conoce más sobre esta área de SupplyMentum."}
          </p>
        </div>
      </section>

      {/* Realizamos / Buscamos */}
      <section className="section py-[60px] md:py-[100px]">
        <div className="wrap mx-auto grid max-w-[1000px] grid-cols-1 gap-[20px] lg:grid-cols-2">
          <div className="border border-[#26262A] border-t-[3px] border-t-[#ED1C24] bg-[#131316] p-[32px] md:p-[48px_42px]">
            <h2 className="m-0 mb-[28px] text-[26px] font-extrabold md:text-[30px] font-[family-name:var(--font-archivo-black)]">
              ¿Qué realizamos?
            </h2>

            <div className="flex flex-col gap-[18px]">
              {area.activities.length > 0 ? (
                area.activities.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-[16px]"
                    >
                      <div className="mt-[9px] h-[8px] w-[8px] shrink-0 bg-[#ED1C24]" />

                      <div className="text-[15px] font-light leading-[1.7] text-[#C9C8CE] font-[family-name:var(--font-open-sans)]">
                        {item}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <p className="text-[14px] text-[#9B9AA0]">
                  Aún no se han registrado actividades.
                </p>
              )}
            </div>
          </div>

          <div className="border border-[#26262A] border-t-[3px] border-t-[#FFBD59] bg-[#131316] p-[32px] md:p-[48px_42px]">
            <h2 className="m-0 mb-[28px] text-[26px] font-extrabold md:text-[30px] font-[family-name:var(--font-archivo-black)]">
              ¿Qué buscamos?
            </h2>

            <div className="flex flex-col gap-[18px]">
              {area.requirements.length > 0 ? (
                area.requirements.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-[16px]"
                    >
                      <div className="mt-[9px] h-[8px] w-[8px] shrink-0 bg-[#FFBD59]" />

                      <div className="text-[15px] font-light leading-[1.7] text-[#C9C8CE] font-[family-name:var(--font-open-sans)]">
                        {item}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <p className="text-[14px] text-[#9B9AA0]">
                  Aún no se han registrado requisitos.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <AreaCTA />
    </div>
  );
}