/* ═══════════════════════════════════════════════════════════════
   SUPPLYMENTUM UNI · DATOS DE PROYECTOS
   ───────────────────────────────────────────────────────────────
   Fuente centralizada de proyectos. Tanto la BandaTransportadora
   como el catálogo ProyectosRacks leen de aquí.
   ═══════════════════════════════════════════════════════════════ */

export interface ProyectoData {
  slug: string;
  name: string;
  area: string;
  year: string;
  desc: string;
  img: string;
  destacado: boolean;
}

export const proyectos: ProyectoData[] = [
  {
    slug: "diagnostico-mypes",
    name: "Diagnóstico logístico a mypes de Lima Norte",
    area: "Consultoría",
    year: "2026",
    desc: "Consultoría gratuita de procesos logísticos para pequeñas empresas.",
    img: "/images/warehouse.png",
    destacado: true,
  },
  {
    slug: "supplydata",
    name: "SupplyData: tablero de indicadores",
    area: "Tecnología",
    year: "2026",
    desc: "Dashboard de KPIs logísticos para la gestión interna del centro.",
    img: "/images/iot.png",
    destacado: true,
  },
  {
    slug: "semana-supply-chain",
    name: "Semana del Supply Chain UNI",
    area: "Operaciones",
    year: "2025",
    desc: "Cinco días de charlas, talleres y visitas técnicas con empresas aliadas.",
    img: "/images/warehouse.png",
    destacado: true,
  },
  {
    slug: "ruta-contenedor",
    name: "Ruta del Contenedor",
    area: "Operaciones",
    year: "2025",
    desc: "Visita técnica al puerto del Callao y simulación de comercio exterior.",
    img: "/images/warehouse.png",
    destacado: true,
  },
  {
    slug: "cadena-abierta",
    name: "Podcast: Cadena Abierta",
    area: "Marketing",
    year: "2026",
    desc: "Conversaciones con profesionales líderes del Supply Chain peruano.",
    img: "/images/marketing.png",
    destacado: true,
  },
  {
    slug: "mentoring",
    name: "Mentoring SupplyMentum",
    area: "Talento",
    year: "2025",
    desc: "Programa de mentoría entre egresados, seniors y nuevos miembros.",
    img: "/images/talent.png",
    destacado: true,
  },
  {
    slug: "reto-lean",
    name: "Reto Lean UNI",
    area: "Consultoría",
    year: "2025",
    desc: "Competencia interuniversitaria de mejora de procesos con casos reales.",
    img: "/images/warehouse.png",
    destacado: false,
  },
  {
    slug: "alianza-logistiperu",
    name: "Alianza LogistiPerú",
    area: "Corporativas",
    year: "2026",
    desc: "Convenio marco con el gremio logístico para prácticas y visitas.",
    img: "/images/marketing.png",
    destacado: false,
  },
  {
    slug: "bootcamp-excel",
    name: "Bootcamp de Excel y Power BI",
    area: "Tecnología",
    year: "2025",
    desc: "Formación intensiva en herramientas de análisis para la cadena.",
    img: "/images/iot.png",
    destacado: false,
  },
  {
    slug: "feria-areas",
    name: "Feria de Áreas 2026",
    area: "Talento",
    year: "2026",
    desc: "Espacio de captación donde cada área muestra lo que hace.",
    img: "/images/talent.png",
    destacado: false,
  },
  {
    slug: "ultima-milla",
    name: "Estudio de última milla en Lima",
    area: "Consultoría",
    year: "2024",
    desc: "Investigación aplicada sobre distribución urbana y e-commerce.",
    img: "/images/warehouse.png",
    destacado: false,
  },
  {
    slug: "rebranding",
    name: "Rebranding SupplyMentum 1.0",
    area: "Marketing",
    year: "2024",
    desc: "Construcción del brandbook y nueva identidad visual del centro.",
    img: "/images/marketing.png",
    destacado: false,
  },
];

/** Áreas usadas como filtro en el catálogo de proyectos */
export const areasProyecto: string[] = [
  "Todos",
  ...Array.from(new Set(proyectos.map((p) => p.area))),
];

export interface ParticipanteProyecto {
  name: string;
  role: string;
  img: string;
}

export const equipoProyecto: ParticipanteProyecto[] = [
  { name: "Líder de proyecto", role: "Lead", img: "https://picsum.photos/seed/sm-pt-1/600/600" },
  { name: "Analista 1", role: "Operaciones", img: "https://picsum.photos/seed/sm-pt-2/600/600" },
  { name: "Analista 2", role: "Consultoría", img: "https://picsum.photos/seed/sm-pt-3/600/600" },
  { name: "Analista 3", role: "Marketing", img: "https://picsum.photos/seed/sm-pt-4/600/600" },
];

