interface Metric {
  value: number;
  prefix: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: 120, prefix: "+", label: "Miembros activos" },
  { value: 40, prefix: "+", label: "Eventos realizados" },
  { value: 15, prefix: "+", label: "Proyectos ejecutados" },
  { value: 20, prefix: "+", label: "Empresas aliadas" },
];

/**
 * Sección de métricas (RF-03). Portada de `section.metrics` del prototipo.
 * Los valores son estáticos por ahora; el conteo animado (`initCounters`) y
 * la fuente de datos externa se resuelven en las siguientes tareas de esta fase.
 */
export default function MetricsSection() {
  return (
    <section aria-label="Cifras del centro" className="border-y border-[#ED1C24] bg-[#ED1C24]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-8 px-4 py-11 sm:px-6 lg:grid-cols-4 lg:gap-y-0 lg:px-8 lg:py-16">
        {METRICS.map((metric, i) => {
          const dividerMobile = i % 2 === 1; // 2ª columna en la grilla de 2 (mobile)
          const dividerDesktop = i > 0; // toda columna salvo la primera, en la grilla de 4
          const borderClass = dividerMobile
            ? dividerDesktop
              ? "border-l border-white/30"
              : "border-l border-white/30 lg:border-l-0"
            : dividerDesktop
              ? "lg:border-l lg:border-white/30"
              : "";
          return (
            <div key={metric.label} className={`relative px-3 lg:px-8 ${borderClass}`}>
              <div className="font-[family-name:var(--font-archivo-black)] text-[clamp(38px,4.6vw,62px)] leading-none tracking-[-.04em] text-white tabular-nums">
                {metric.prefix}
                {metric.value}
              </div>
              <div className="mt-3 font-[family-name:var(--font-archivo)] text-[11.5px] font-bold tracking-[.16em] text-white/90 uppercase">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
