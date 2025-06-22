-- Esquema base de base de datos SQLite para Clínica Vitalis

CREATE TABLE IF NOT EXISTS citas (
  id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
  id_paciente INTEGER,
  especialidad TEXT,
  fecha_hora TEXT,
  estado TEXT DEFAULT 'pendiente'
);

CREATE TABLE IF NOT EXISTS historial_clinico (
  id_historial INTEGER PRIMARY KEY AUTOINCREMENT,
  id_paciente INTEGER,
  id_medico INTEGER,
  fecha_atencion TEXT,
  diagnostico TEXT,
  tratamiento TEXT
);
