import Image from "next/image";
import Link from "next/link";
import { ProyectoData } from "@/data/proyectos";

interface ProyectoCardProps {
  proyecto: ProyectoData;
}

export default function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <div className="w-[300px] sm:w-[268px] shrink-0 bg-[#121216] border border-zinc-800 overflow-hidden shadow-none hover:shadow-[0_8px_30px_rgba(237,28,36,0.1)] hover:border-[#ED1C24]/50 hover:-translate-y-1.5 transition-all duration-300 group select-none h-[418px]">
      <Link
        href={`/proyectos/${proyecto.slug}`}
        className="flex flex-col justify-between h-full w-full cursor-pointer"
      >
        {/* Image container with fixed height */}
        <div className="relative h-[160px] w-full shrink-0 overflow-hidden bg-zinc-950">
          <Image
            src={proyecto.img}
            alt={proyecto.name}
            fill
            sizes="(max-width: 640px) 300px, 340px"
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            priority={false}
          />
        </div>

        {/* Internal Content */}
        <div className="p-5 flex-1 flex flex-col justify-between items-start text-left">
          <div>
            {/* Badge */}
            <span style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[10px] text-white font-bold tracking-widest bg-[#ED1C24] border border-[#ED1C24]/20 px-2.5 py-1 w-fit uppercase inline-block">
              {proyecto.area}
            </span>

            {/* Title */}
            <h3 style={{ fontFamily: "var(--font-archivo-n)" }} className="text-[20px] font-bold text-white text-base leading-snug line-clamp-2 mt-3 transition-colors duration-300">
              {proyecto.name}
            </h3>

            {/* Description */}
            <p style={{ fontFamily: "var(--font-open-sans)" }} className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mt-3 font-normal">
              {proyecto.desc}
            </p>
          </div>

          {/* Year */}
          <span style={{ fontFamily: "var(--font-archivo-n)" }} className="text-zinc-500 text-xs font-bold mt-4">
            {proyecto.year}
          </span>
        </div>
      </Link>
    </div>
  );
}

