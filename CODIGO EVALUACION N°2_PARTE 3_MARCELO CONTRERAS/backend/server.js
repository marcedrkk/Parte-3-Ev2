const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // ✅ Necesario para leer JSON en req.body

// Importar rutas
const loginRoutes = require("./routes/login");
const historialRoutes = require("./routes/historial");
const citasRoutes = require("./routes/citas");

// Usar rutas
app.use("/login", loginRoutes);
app.use("/historial", historialRoutes);
app.use("/citas", citasRoutes);

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});
