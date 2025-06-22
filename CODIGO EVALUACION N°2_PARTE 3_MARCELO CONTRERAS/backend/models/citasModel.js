const sqlite3 = require("sqlite3").verbose(); // Importa SQLite
const db = new sqlite3.Database("./db/biblioteca.sqlite"); // Conexión con la base de datos

module.exports = {
  // Inserta una nueva cita con estado 'pendiente'
  insertarCita: (pacienteId, especialidad, fechaHora, callback) => {
    const query = `
      INSERT INTO citas (id_paciente, especialidad, fecha_hora, estado)
      VALUES (?, ?, ?, 'pendiente')
    `;
    db.run(query, [pacienteId, especialidad, fechaHora], function (err) {
      callback(err, this); // Devuelve error y metadatos de la inserción
    });
  },

  // Obtiene todas las citas de un paciente, ordenadas por fecha
  obtenerCitasPorPaciente: (idPaciente, callback) => {
    const query = `
      SELECT * FROM citas
      WHERE id_paciente = ?
      ORDER BY fecha_hora ASC
    `;
    db.all(query, [idPaciente], (err, rows) => {
      callback(err, rows); // Devuelve lista de citas
    });
  },

  // Actualiza una cita según su ID (especialidad, fecha y estado)
  actualizarCita: (idCita, especialidad, fechaHora, estado, callback) => {
    const query = `
      UPDATE citas SET especialidad = ?, fecha_hora = ?, estado = ?
      WHERE id_cita = ?
    `;
    db.run(query, [especialidad, fechaHora, estado, idCita], function (err) {
      callback(err, this); // Devuelve resultado de la operación
    });
  },

  // Elimina una cita por su ID
  eliminarCita: (idCita, callback) => {
    db.run("DELETE FROM citas WHERE id_cita = ?", [idCita], function (err) {
      callback(err, this); // Devuelve resultado de la eliminación
    });
  }
};
