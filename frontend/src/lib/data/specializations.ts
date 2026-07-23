export interface Specialization {
  slug: string;
  short: string;
  name: string;
  desc: string;
}

/**
 * Mock de las especializaciones/ramas del centro. Misma idea que
 * `lib/data/metrics.ts`: cuando exista una fuente real, solo se reemplaza
 * el cuerpo de `getSpecializations`.
 *
 * Contenido alineado a las seis áreas de `SM.areas` en el prototipo
 * (`assets/js/data.js`), resumido para esta sección de la Home (RF-05),
 * que no existe todavía en el prototipo estático.
 */
const MOCK_SPECIALIZATIONS: Specialization[] = [
  {
    slug: "operaciones",
    short: "Operaciones",
    name: "Operaciones & Logística",
    desc: "El corazón técnico del centro: planificamos, optimizamos y ejecutamos la logística de cada iniciativa, aplicando herramientas reales de gestión de operaciones.",
  },
  {
    slug: "marketing",
    short: "Marketing",
    name: "Marketing & Contenidos",
    desc: "Damos voz e imagen a SupplyMentum: construimos la marca, creamos contenido y comunicamos todo lo que el centro hace dentro y fuera de la UNI.",
  },
  {
    slug: "talento",
    short: "Talento",
    name: "Gestión del Talento",
    desc: "Cuidamos a las personas que hacen SupplyMentum: reclutamos, integramos y desarrollamos al equipo, manteniendo viva la cultura del centro.",
  },
  {
    slug: "corporativas",
    short: "Corporativas",
    name: "Relaciones Corporativas",
    desc: "Conectamos al centro con el mundo empresarial: gestionamos alianzas, auspicios y vínculos con profesionales líderes del Supply Chain en el Perú.",
  },
  {
    slug: "proyectos",
    short: "Proyectos",
    name: "Proyectos & Consultoría",
    desc: "Llevamos el conocimiento a la práctica: diseñamos y ejecutamos proyectos y consultorías reales que generan impacto en organizaciones.",
  },
  {
    slug: "tecnologia",
    short: "Tecnología",
    name: "Innovación & Tecnología",
    desc: "Exploramos las herramientas que están transformando la cadena de suministro: datos, automatización y tecnología aplicada a la logística.",
  },
];

export async function getSpecializations(): Promise<Specialization[]> {
  return MOCK_SPECIALIZATIONS;
}
