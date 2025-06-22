const Historial = require("../models/historialModel");

exports.registrarHistorial = (req, res) => {
  if (req.usuario.rol !== "medico") return res.status(403).json({ error: "Solo los médicos pueden registrar historiales" });

  const { pacienteId, medicoId, fecha, diagnostico, tratamiento } = req.body;
  if (req.usuario.id !== medicoId) return res.status(403).json({ error: "No puede registrar historial en nombre de otro médico" });

  if (!pacienteId || !fecha || !diagnostico) return res.status(400).json({ error: "Faltan campos obligatorios" });

  Historial.insertarHistorial(pacienteId, medicoId, fecha, diagnostico, tratamiento, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al registrar historial" });
    res.status(201).json({ message: "Historial registrado exitosamente", id: result.lastID });
  });
};

exports.obtenerHistorial = (req, res) => {
  const pacienteId = parseInt(req.params.id);
  if (req.usuario.rol === "paciente" && req.usuario.id !== pacienteId)
    return res.status(403).json({ error: "No autorizado para ver historiales de otros pacientes" });

  Historial.obtenerHistorialPorPaciente(pacienteId, (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener historial" });
    res.json(rows);
  });
};
exports.obtenerHistorialPorMedico = (req, res) => {
  console.log("✅ GET /historial/medico/", req.params.id);
  const idMedico = parseInt(req.params.id);
  if (req.usuario.rol !== "medico" || req.usuario.id !== idMedico) {
    return res.status(403).json({ error: "No autorizado" });
  }

  Historial.obtenerHistorialPorMedico(idMedico, (err, rows) => {
    if (err) return res.status(500).json({ error: "Error al obtener historial" });
    res.json(rows);
  });
};
exports.actualizarHistorial = (req, res) => {
  const idHistorial = parseInt(req.params.id);
  const { diagnostico, tratamiento } = req.body;

  console.log("🔧 PUT /historial/", idHistorial, diagnostico, tratamiento);
  console.log("🔐 Usuario autenticado:", req.usuario);

  if (req.usuario.rol !== "medico") {
    console.log("❌ Usuario no es médico");
    return res.status(403).json({ error: "Solo los médicos pueden actualizar historiales" });
  }

  if (!diagnostico || !tratamiento) {
    console.log("❌ Campos vacíos");
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  Historial.actualizarHistorial(idHistorial, diagnostico, tratamiento, (err, result) => {
    if (err) {
      console.error("❌ Error al actualizar en la BD:", err);
      return res.status(500).json({ error: "Error al actualizar historial" });
    }

    console.log("✅ Historial actualizado:", result);
    res.json({ message: "Historial actualizado correctamente" });
  });
};

exports.eliminarHistorial = (req, res) => {
  const idHistorial = parseInt(req.params.id);

  if (req.usuario.rol !== "medico") {
    return res.status(403).json({ error: "Solo los médicos pueden eliminar historiales" });
  }

  Historial.eliminarHistorial(idHistorial, (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar historial" });
    res.json({ message: "Historial eliminado correctamente" });
  });
};


