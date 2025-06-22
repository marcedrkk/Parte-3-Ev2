const Citas = require("../models/citasModel"); // Importa el modelo de base de datos de citas
const { enviarNotificacionCitas } = require("../telegram/bot"); // Importa la función para enviar notificaciones por Telegram

// Controlador para registrar una nueva cita
exports.registrarCita = (req, res) => {
  // Extrae los datos enviados desde el frontend (formulario o JSON)
  const { pacienteId, especialidad, fecha } = req.body;

  // Verifica que todos los campos obligatorios estén presentes
  if (!pacienteId || !especialidad || !fecha) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Llama al modelo para insertar la cita en la base de datos
  Citas.insertarCita(pacienteId, especialidad, fecha, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al registrar cita" });
    }

    // Si se registra exitosamente, se envía una notificación automática por Telegram
    enviarNotificacionCitas({
      id_paciente: pacienteId,
      especialidad,
      fecha_hora: fecha,
      estado: "pendiente" // Por defecto el estado de la nueva cita es "pendiente"
    });

    // Responde al cliente con éxito y el ID de la nueva cita
    res.status(201).json({ message: "Cita registrada", id: result.lastID });
  });
};

// Controlador para obtener las citas de un paciente
exports.obtenerCitas = (req, res) => {
  // Obtiene el ID del paciente desde los parámetros de la URL
  const pacienteId = parseInt(req.params.id);

  // Valida que el ID sea un número válido
  if (!pacienteId) {
    return res.status(400).json({ error: "ID de paciente inválido" });
  }

  // Llama al modelo para obtener todas las citas de ese paciente
  Citas.obtenerCitasPorPaciente(pacienteId, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener citas" });
    }

    // Devuelve la lista de citas al cliente en formato JSON
    res.json(rows);
  });
};
