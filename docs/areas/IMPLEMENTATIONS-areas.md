# Implementaciones - Sección Áreas

Este documento servirá como bitácora de las implementaciones técnicas, decisiones de arquitectura y registro de componentes creados para la sección Áreas, según lo estructurado en el PLAN-DE-TRABAJO.md.

## Registro de Tareas

*(Este archivo se irá actualizando a medida que se completen las fases)*

### Fase 1: Preparación y Estructura de Datos
- **Extracción de datos:** Se extrajo el contenido de prueba (mock) del HTML proporcionado y se estructuró en el archivo `frontend/src/data/areasData.ts`.
- **Estructura TypeScript:** Se crearon las interfaces `Area` y `Director` para tener un tipado fuerte que defina la estructura de la información, incluyendo los *paths* SVG de los iconos para evitar dependencias externas pesadas si se requiere.


### Fase 2: Desarrollo de la Vista Principal (Corona Circular)
- **Creación del componente:** Se implementó `AreasSection.tsx` y su ruta de acceso en `frontend/src/app/areas/page.tsx`.
- **Lógica Geométrica con Tailwind CSS:** 
  - La distribución en corona circular se logró utilizando lógica matemática trigonométrica (`Math.sin` y `Math.cos`) en un bloque `useEffect` para calcular las posiciones (`x` e `y`) de cada uno de los 6 elementos del anillo, basándose en la fórmula de la circunferencia.
  - Para mapear estas coordenadas a Tailwind y estilos en línea, se pasaron los valores calculados de `left` y `top` en porcentajes al atributo `style` de React, mientras que todo el *styling* base (colores, bordes, layouts absolutos, transformaciones) se manejó limpiamente con utilidades de Tailwind CSS (ej. `absolute -translate-x-1/2 -translate-y-1/2`).
- **Animaciones Optimizadas:**
  - El giro interactivo se controla manejando el evento de scroll (`wheel`). Para evitar el re-renderizado excesivo y la sobrecarga del navegador (jank) que puede degradar dispositivos de gama media, se implementó un mecanismo de *throttle* ("debounce" por tiempo, con 380ms) dentro del event listener de scroll.
  - Las transiciones fluidas de los elementos al girar (cambios de posición y escalado del nodo activo) están delegadas completamente al motor CSS del navegador usando la clase `transition-all duration-500 ease-out`, garantizando animaciones calculadas por GPU.

### Fase 3: Desarrollo de la Vista Dinámica Individual (`/areas/[id]`)
- **Ruta Dinámica y SSR:** Se creó el archivo `frontend/src/app/areas/[id]/page.tsx`. Al ejecutarse del lado del servidor (SSR), obtiene el parámetro `id` dinámicamente, busca la coincidencia exacta en `areasData.ts` y si no existe retorna un error `404` controlado mediante `notFound()` de Next.js.
- **Tipografías y Variables CSS:** Se integraron las fuentes oficiales (`Archivo_Black` y `Open_Sans`) a través de `next/font/google` inyectándolas en el `layout.tsx` raíz como variables de entorno CSS (`--font-archivo-black`, etc.). Esto permite consumirlas directamente como clases arbitrarias en Tailwind (`font-[family-name:var(--font-archivo-black)]`) respetando el rendimiento.
- **Maquetación y Fidelidad HTML:**
  - **Hero Section:** Imagen con filtros (`grayscale`, `brightness`, `contrast`) superpuesta con un gradiente negro-rojo y tipografía dinámica.
  - **Requisitos / Qué Buscamos:** Implementación con sistema de grillas (`grid-cols-1 lg:grid-cols-2`), resaltando el borde superior con los colores `#ED1C24` y `#FFBD59` tal cual el diseño, e iterando las viñetas.
  - **Liderazgo (Directores):** Recreación de las *cards* para directores con la imagen recortada, filtros y enlace condicionado hacia su perfil en LinkedIn, manteniendo los grosores y tamaños de letra originales.
  - **CTA Final:** Estructura inferior para incitar a la postulación que redirige estáticamente a `/convocatoria`.
