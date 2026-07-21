import Image from "next/image";

export interface Proyecto {
  id: string;
  title: string;
  category: "MARKETING" | "TALENTO" | "TECNOLOGÍA" | "CONSULTORÍA";
  description: string;
  year: string;
  imageUrl: string;
}

interface ProyectoCardProps {
  proyecto: Proyecto;
}

export default function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <div className="w-[300px] sm:w-[340px] shrink-0 bg-[#121216] border border-zinc-800 rounded-xl overflow-hidden hover:border-[#ED1C24] hover:shadow-[0_0_20px_rgba(237,28,36,0.15)] transition-all duration-300 group flex flex-col justify-between h-[410px] select-none">
      {/* Image container with fixed height */}
      <div className="relative h-[200px] w-full overflow-hidden bg-zinc-950">
        <Image
          src={proyecto.imageUrl}
          alt={proyecto.title}
          fill
          sizes="(max-width: 640px) 300px, 340px"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          priority={false}
        />
      </div>

      {/* Internal Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Badge */}
          <span className="text-[10px] sm:text-xs text-[#ED1C24] font-extrabold tracking-widest bg-[#ED1C24]/10 border border-[#ED1C24]/20 px-2.5 py-1 rounded w-fit uppercase inline-block">
            {proyecto.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-white text-base sm:text-lg leading-snug line-clamp-2 mt-3 group-hover:text-red-500/90 transition-colors duration-300">
            {proyecto.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mt-2 font-normal">
            {proyecto.description}
          </p>
        </div>

        {/* Year */}
        <span className="text-zinc-500 text-xs font-semibold self-end mt-4">
          {proyecto.year}
        </span>
      </div>
    </div>
  );
}
