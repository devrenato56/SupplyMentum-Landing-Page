"use client";

import { useState, useMemo } from "react";
import { proyectos, areasProyecto } from "@/data/proyectos";
import { Search } from "lucide-react";
import RackCard from "./RackCard";

const POR_PAGINA = 6;

export default function ProyectosRacks() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(0);

  /* ── Filtrado ────────────────────────────────────── */
  const filtrados = useMemo(() => {
    const q = busqueda.toLowerCase();
    return proyectos.filter((p) => {
      const okArea = filtro === "Todos" || p.area === filtro;
      const texto = `${p.name} ${p.desc} ${p.area}`.toLowerCase();
      return okArea && texto.includes(q);
    });
  }, [filtro, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas - 1);
  const trozo = filtrados.slice(
    paginaActual * POR_PAGINA,
    (paginaActual + 1) * POR_PAGINA
  );

  /* ── Handlers ───────────────────────────────────── */
  const handleFiltro = (area: string) => {
    setFiltro(area);
    setPagina(0);
  };

  const handleBusqueda = (valor: string) => {
    setBusqueda(valor);
    setPagina(0);
  };

  return (
    <section className="relative z-10 w-full pt-16 sm:pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">

        {/* ── Título de sección ─────────────────────── */}
        <h2
          style={{ fontFamily: "var(--font-archivo-black)" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide mb-10"
        >
          Catálogo de proyectos
        </h2>

        {/* ── Barra de filtros ─────────────────────── */}
        <div className="flex flex-col gap-4 mb-10">

          {/* Buscador */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="search"
              id="buscar-proyecto"
              placeholder="Buscar proyecto…"
              autoComplete="off"
              value={busqueda}
              onChange={(e) => handleBusqueda(e.target.value)}
              style={{ fontFamily: "var(--font-open-sans)" }}
              className="w-full pl-11 pr-4 py-3 bg-[#121216] border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ED1C24]/60 focus:ring-1 focus:ring-[#ED1C24]/30 transition-colors duration-200"
            />
          </div>

          {/* Chips de área */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por área"
          >
            {areasProyecto.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleFiltro(area)}
                aria-pressed={filtro === area}
                style={{ fontFamily: "var(--font-archivo-n)" }}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${
                  filtro === area
                    ? "bg-[#ED1C24] border-[#ED1C24] text-white"
                    : "bg-transparent border-zinc-700 text-zinc-400 hover:border-[#ED1C24]/60 hover:text-white"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* ── Rack / Grilla de proyectos ───────────── */}
        {trozo.length > 0 ? (
          <div className="relative">
            {/* Estantería: líneas horizontales de rack */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {[...Array(Math.ceil(trozo.length / 3) + 1)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-[3px]"
                  style={{
                    top: `${i * (100 / Math.ceil(trozo.length / 3))}%`,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(237,28,36,0.15) 10%, rgba(237,28,36,0.25) 50%, rgba(237,28,36,0.15) 90%, transparent 100%)",
                  }}
                />
              ))}
            </div>

            {/* Postes verticales del rack */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {/* Poste izquierdo */}
              <div
                className="absolute top-0 bottom-0 w-[3px] left-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(237,28,36,0.2) 15%, rgba(237,28,36,0.3) 50%, rgba(237,28,36,0.2) 85%, transparent 100%)",
                }}
              />
              {/* Poste derecho */}
              <div
                className="absolute top-0 bottom-0 w-[3px] right-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(237,28,36,0.2) 15%, rgba(237,28,36,0.3) 50%, rgba(237,28,36,0.2) 85%, transparent 100%)",
                }}
              />
            </div>

            {/* Cards en grilla */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-6 px-3 lg:px-8">
              {trozo.map((proyecto) => (
                <RackCard key={proyecto.slug} proyecto={proyecto} />
              ))}
            </div>
          </div>
        ) : (
          /* ── Estado vacío ──────────────────────────── */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-zinc-800/60 flex items-center justify-center">
              <Search className="w-7 h-7 text-zinc-500" />
            </div>
            <p
              style={{ fontFamily: "var(--font-archivo-n)" }}
              className="text-lg text-zinc-400 font-semibold mb-2"
            >
              No encontramos proyectos con ese criterio.
            </p>
            <p
              style={{ fontFamily: "var(--font-open-sans)" }}
              className="text-sm text-zinc-500"
            >
              Intenta buscar con otras palabras o selecciona otra área.
            </p>
          </div>
        )}

        {/* ── Paginación ───────────────────────────── */}
        {filtrados.length > POR_PAGINA && (
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => setPagina((p) => Math.max(0, p - 1))}
              disabled={paginaActual === 0}
              style={{ fontFamily: "var(--font-archivo-n)" }}
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase border border-white/[.16] text-zinc-100 hover:-translate-y-0.5 hover:border-[#ED1C24] hover:text-[#ED1C24] disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-white/[.16] disabled:hover:text-zinc-100 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              ← Anterior
            </button>
            <span
              style={{ fontFamily: "var(--font-open-sans)" }}
              className="text-sm text-zinc-500 tabular-nums"
            >
              Página {paginaActual + 1} de {totalPaginas}
            </span>
            <button
              onClick={() =>
                setPagina((p) => Math.min(totalPaginas - 1, p + 1))
              }
              disabled={paginaActual >= totalPaginas - 1}
              style={{ fontFamily: "var(--font-archivo-n)" }}
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase border border-white/[.16] text-zinc-100 hover:-translate-y-0.5 hover:border-[#ED1C24] hover:text-[#ED1C24] disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:border-white/[.16] disabled:hover:text-zinc-100 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
