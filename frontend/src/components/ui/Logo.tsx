import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group focus:outline-none select-none">
      {/* Brand Text (Left) */}
      <div className="flex flex-col text-left">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none font-sans">
          Supply<span className="text-[#ED1C24]">Mentum</span>
        </span>
        <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest text-zinc-300 uppercase leading-tight mt-1">
          CADENA DE SUMINISTROS
        </span>
      </div>

      {/* 3D Wireframe Cube Icon (Right of text, exactly as in screenshot) */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
        <svg
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#ED1C24] transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Diamond / Hexagon Wireframe */}
          <polygon
            points="25,4 45,15 45,35 25,46 5,35 5,15"
            stroke="#ED1C24"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Inner Isometric Cube Lines */}
          <line
            x1="25"
            y1="25"
            x2="25"
            y2="46"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <line
            x1="25"
            y1="25"
            x2="45"
            y2="15"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <line
            x1="25"
            y1="25"
            x2="5"
            y2="15"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          {/* Inner accent diamond */}
          <polygon
            points="25,12 37,19 25,25 13,19"
            stroke="#ED1C24"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </Link>
  );
}
