# Parte-3-Ev2
Este repositorio contiene la Parte 3 de la 'Evaluación N.º 2', correspondiente a la entrega de la version final del proyecto del caso de:  'Sistema Seguro de Gestión Clínica para la Institución Médica Vitalis'.

Este Pull Request completa la implementación funcional del sistema de gestión de citas médicas. Incluye la conexión con base de datos SQLite, definición del modelo de datos, controladores HTTP y envío de notificaciones automáticas mediante Telegram Bot.

## Cambios principales:
- `models/citasModel.js`: operaciones CRUD sobre la tabla `citas` (insertar, obtener, actualizar, eliminar), utilizando consultas SQL parametrizadas.
- `controllers/citaController.js`: lógica para registrar citas, validar datos entrantes, consultar citas por paciente e integrar el bot de notificación.
- `telegram/bot.js`: envío de mensaje automático cada vez que se agenda una nueva cita, incluyendo ID del paciente, especialidad y fecha.

## Consideraciones:
- Validación de campos obligatorios en el backend.
- Manejadores de errores con códigos `400` y `500`.
- Consulta asincrónica con feedback claro para el usuario.
- Notificación formateada con icono médico  y estructura legible.
- Módulos independientes y exportados para facilitar escalabilidad.

## Checklist:
- [x] Base de datos conectada correctamente (SQLite)
- [x] Consulta segura para insertar y consultar citas
- [x] Controlador modular y reutilizable
- [x] Notificación funcional al agendar cita
- [x] Código probado con datos simulados
