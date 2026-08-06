# Plan de Trabajo - Eventos (Events)

## Fase 1
* **Encargado:** Joaquin Berrospi

### 1. Obtención de Lista de Eventos Ordenada (Público)
* **Requerimiento:** Retornar al frontend un listado completo de eventos con sus atributos calculados, respetando la jerarquía estricta de ordenamiento definida para la grilla de la página.
* **Descripción de la tarea:**
  - Creación del endpoint público (`GET /api/events`).
  - Obtención de eventos almacenados en la base de datos Supabase.
  - Cálculo dinámico de atributos en backend para aliviar carga de trabajo al frontend:
    - **`status`**: Determinado según la fecha y hora actual vs `startDateTime` (`"EN CURSO"`, `"PRÓXIMO"`, `"PASADO"`).
    - **`date`**: Cadena formateada amigable (ej: `"06 de Agosto"`).
    - **`time`**: Cadena formateada de hora (ej: `"18:00 hrs"`).
  - Aplicación de las reglas lógicas para condicionar atributos según el estado:
    - `registrationLink`: Solo relevante/activo para eventos `"PRÓXIMO"` o `"EN CURSO"`.
    - `summaryLink`: Solo asignable/mostrado para eventos `"PASADO"`.
  - Ordenamiento estricto del arreglo en backend antes del envío:
    1. Eventos con estado `"EN CURSO"` primero.
    2. Eventos con estado `"PRÓXIMO"`, ordenados de menor a mayor por `startDateTime` (del más cercano al más lejano).
    3. Eventos con estado `"PASADO"`, ordenados de mayor a menor por `startDateTime` (del más reciente al más antiguo).

### 2. Obtención de Evento Destacado Hero (Público)
* **Requerimiento:** Suministrar al frontend la información del evento a mostrar en la tarjeta grande principal (Hero).
* **Descripción de la tarea:**
  - Creación del endpoint público (`GET /api/events/hero`).
  - Evaluación de la prioridad de selección Hero:
    - **Prioridad 1**: Evento marcado explícitamente por el administrador como destacado (`starred: true`).
    - **Prioridad 2 (Fallback)**: En caso de no existir ningún evento con `starred: true`, seleccionar el primer evento según la jerarquía por defecto (evento `"EN CURSO"` o evento `"PRÓXIMO"` más cercano).
  - Retorno del objeto Evento con sus atributos calculados agregados (`status`, `date`, `time`).

### 3. Obtención de Detalle de Evento (Público)
* **Requerimiento:** Consultar la información detallada de un único evento mediante su identificador.
* **Descripción de la tarea:**
  - Creación del endpoint público (`GET /api/events/:id`).
  - Búsqueda por `id` en la base de datos y retorno del objeto individual procesado con sus campos calculados.

### 4. Gestión Completa de Eventos (Admin)
* **Requerimiento:** Permitir al administrador crear, modificar, eliminar y marcar/desmarcar eventos como destacados (`starred`).
* **Descripción de la tarea:**
  - Creación de endpoints protegidos mediante el guardia `JwtAuthGuard`:
    - `POST /api/events`: Registrar un nuevo evento (`title`, `location`, `imageUrl`, `description`, `startDateTime`, `registrationLink` opcional, `starred` opcional).
    - `PUT /api/events/:id`: Editar los datos de un evento existente (permite incluir `summaryLink` cuando el evento pase a estado `"PASADO"`).
    - `DELETE /api/events/:id`: Eliminar un evento.
    - `PATCH /api/events/:id/star`: Alternar el estado de destacado (`starred`) de un evento.
  - Validación automatizada de los tipos de datos recibidos mediante DTOs.
