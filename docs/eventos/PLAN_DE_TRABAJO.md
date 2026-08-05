# Plan de Trabajo: Sección de Eventos (Frontend)

Este documento detalla las fases y tareas exclusivas del FRONTEND para la sección de Eventos. Las responsabilidades de bases de datos y CRUD (como la gestión de las Preguntas Frecuentes) corresponden al BACKEND.

## Fase 1: Estructura Base y Datos (Setup)
- [x] Tarea 1.1: Crear la rama, configurar documentación y crear carpeta `assets`. *(Jeferson)*
- [x] Tarea 1.2: Crear interfaz `Event` (título, fecha, ubicación, imagen, desc, link de inscripción) y `mockEvents.ts`. *(Jeferson)*

## Fase 2: Componentes Visuales Básicos (UI - Estructura HTML/Tailwind)
**Objetivo:** Extraer el diseño visual del archivo `SupplyMentum Landing (standalone).html`.
- [x] Tarea 2.1: Crear `FeaturedEvent.tsx`. Es el próximo evento destacado. Debe tener: Imagen, Título, Descripción, Fecha, Ubicación y Botón "Inscríbete". *(Jeferson)*
- [x] Tarea 2.2: Crear `EventCard.tsx`. Tarjeta individual de la grilla inferior. *(Jeferson)*
- [ ] Tarea 2.3: Crear `FaqAccordion.tsx`. Diseño de las preguntas desplegables a la izquierda, y espacio para la mascota. *(Robert)*
# Plan de Trabajo: Sección de Eventos (Frontend)

Este documento detalla las fases y tareas exclusivas del FRONTEND para la sección de Eventos. Las responsabilidades de bases de datos y CRUD (como la gestión de las Preguntas Frecuentes) corresponden al BACKEND.

## Fase 1: Estructura Base y Datos (Setup)
- [x] Tarea 1.1: Crear la rama, configurar documentación y crear carpeta `assets`. *(Jeferson)*
- [x] Tarea 1.2: Crear interfaz `Event` (título, fecha, ubicación, imagen, desc, link de inscripción) y `mockEvents.ts`. *(Jeferson)*

## Fase 2: Componentes Visuales Básicos (UI - Estructura HTML/Tailwind)
**Objetivo:** Extraer el diseño visual del archivo `SupplyMentum Landing (standalone).html`.
- [x] Tarea 2.1: Crear `FeaturedEvent.tsx`. Es el próximo evento destacado. Debe tener: Imagen, Título, Descripción, Fecha, Ubicación y Botón "Inscríbete". *(Jeferson)*
- [x] Tarea 2.2: Crear `EventCard.tsx`. Tarjeta individual de la grilla inferior. *(Jeferson)*
- [ ] Tarea 2.3: Crear `FaqAccordion.tsx`. Diseño de las preguntas desplegables a la izquierda, y espacio para la mascota. *(Robert)*

## Fase 3: Lógica, Filtrado y Ensamblaje (React/JavaScript)
**Objetivo:** Darle vida a los botones y aplicar la lógica de ordenamiento sin depender del backend.
- [x] Tarea 3.1: Crear `SearchAndFilters.tsx` con la barra de búsqueda y 3 botones: Todos, Próximos, Realizados. *(Jeferson)*
- [x] Tarea 3.2: Ensamblar `page.tsx` y aplicar lógica de ordenamiento. *(Jeferson)*

## Fase 4: Refinamiento de Lógica de Negocio y UX (Nuevos requerimientos)
**Objetivo:** Sistematizar los enlaces externos, mejorar la elección del evento destacado y profesionalizar la UI.
- [ ] Tarea 4.1: Modificar `types/event.ts` y mocks para tener `registrationLink`, `summaryLink` y soportar estado `"EN CURSO"`.
- [ ] Tarea 4.2: Actualizar `EventCard.tsx` para que toda la tarjeta sea clickeable hacia el link correcto, o inhabilitarla si es evento pasado sin resumen.
- [ ] Tarea 4.3: Actualizar `page.tsx` con la cascada de prioridad para el Hero (isFeatured -> En Curso -> Próximo -> Pasado).
- [ ] Tarea 4.4: Refactorizar `FeaturedEvent.tsx` para cambiar emojis por SVGs, agregar el pulso rojo de "EN VIVO" y hacer el botón dinámico.

## Fase 5: Refinamiento Mobile y Animaciones
- [ ] Tarea 5.1: Pruebas en formato móvil y ajustes de Tailwind CSS.
- [ ] Tarea 5.2: Pulir animaciones finales.
