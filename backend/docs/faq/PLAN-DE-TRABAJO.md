# Plan de Trabajo - Preguntas Frecuentes (FAQ)

## Fase 1
* **Encargado:** Joaquin Berrospi

### 1. Consultar Lista de FAQs (Público)
* **Requerimiento:** Permitir que los usuarios visitantes de la landing page obtengan la lista completa de preguntas y respuestas en el orden configurado por el administrador.
* **Descripción de la tarea:**
  - Creación del endpoint público (`GET /api/faq`).
  - Consulta en la base de datos de la lista de registros de FAQ ordenados de forma ascendente por la columna `order` (`orden`).
  - Retorno del arreglo de preguntas con soporte para respuestas en formato de texto extendido que puedan contener enlaces URL.

### 2. Creación de Nueva FAQ (Admin)
* **Requerimiento:** Permitir al administrador registrar una nueva pregunta frecuente indicando la pregunta, respuesta y su posición inicial de orden.
* **Descripción de la tarea:**
  - Creación del endpoint protegido (`POST /api/faq`).
  - Aplicación de guardia de seguridad JWT (`JwtAuthGuard`).
  - Validación del cuerpo de la petición mediante DTO (`question`, `answer`, `order` opcional o autogenerado).
  - Almacenamiento e inserción del nuevo registro en la base de datos Supabase.

### 3. Edición y Eliminación de FAQ (Admin)
* **Requerimiento:** Permitir al administrador modificar el contenido de una pregunta/respuesta existente o eliminarla del sistema.
* **Descripción de la tarea:**
  - Creación de los endpoints protegidos (`PUT /api/faq/:id` y `DELETE /api/faq/:id`).
  - Aplicación de guardia de seguridad JWT (`JwtAuthGuard`).
  - Actualización parcial o total de la información de la FAQ correspondiente según su `id`.
  - Eliminación física del registro en la base de datos al invocar el endpoint de borrado.

### 4. Reordenamiento de FAQs (Admin)
* **Requerimiento:** Permitir que el administrador reordene visualmente las preguntas (drag and drop) y guarde la nueva secuencia enviando el nuevo orden de IDs.
* **Descripción de la tarea:**
  - Creación del endpoint protegido (`PATCH /api/faq/reorder`).
  - Aplicación de guardia de seguridad JWT (`JwtAuthGuard`).
  - Recepción de un arreglo ordenado de IDs `[id1, id2, id3, ...]`.
  - Actualización masiva/transaccional del campo `order` (`orden`) en la base de datos para cada registro de acuerdo a su nueva posición en el arreglo recibido.
