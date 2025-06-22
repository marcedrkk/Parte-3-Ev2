// Modelo de historial clínico
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/biblioteca.sqlite");

const Historial = {
  insertarHistorial: (pacienteId, medicoId, fecha, diagnostico, tratamiento, callback) => {
    const query = `
      INSERT INTO historial_clinico (id_paciente, id_medico, fecha_atencion, diagnostico, tratamiento)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [pacienteId, medicoId, fecha, diagnostico, tratamiento], function (err) {
      callback(err, this);
    });
  },

  obtenerHistorialPorPaciente: (idPaciente, callback) => {
    const query = "SELECT * FROM historial_clinico WHERE id_paciente = ? ORDER BY fecha_atencion DESC";
    db.all(query, [idPaciente], (err, rows) => {
      callback(err, rows);
    });
  },

  obtenerHistorialPorMedico: (idMedico, callback) => {
    const query = "SELECT * FROM historial_clinico WHERE id_medico = ? ORDER BY fecha_atencion DESC";
    db.all(query, [idMedico], (err, rows) => {
      callback(err, rows);
    });
  },

  actualizarHistorial: (idHistorial, diagnostico, tratamiento, callback) => {
    const query = "UPDATE historial_clinico SET diagnostico = ?, tratamiento = ? WHERE id_historial = ?";
    db.run(query, [diagnostico, tratamiento, idHistorial], function (err) {
      callback(err, this);
    });
  },

  eliminarHistorial: (idHistorial, callback) => {
    const query = "DELETE FROM historial_clinico WHERE id_historial = ?";
    db.run(query, [idHistorial], function (err) {
      callback(err, this);
    });
  }
};

module.exports = Historial;
