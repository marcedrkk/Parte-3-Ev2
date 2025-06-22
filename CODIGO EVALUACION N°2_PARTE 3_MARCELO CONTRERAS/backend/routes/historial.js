const express = require("express");
const router = express.Router();
const historialController = require("../controllers/historialController");
const { autenticarToken } = require("../auth");

// Rutas protegidas con middleware
router.post("/", autenticarToken, historialController.registrarHistorial);
router.get("/:id", autenticarToken, historialController.obtenerHistorial);
router.get("/medico/:id", autenticarToken, historialController.obtenerHistorialPorMedico); // <- ESTA RUTA
router.put("/:id", autenticarToken, historialController.actualizarHistorial);
router.delete("/:id", autenticarToken, historialController.eliminarHistorial);
module.exports = router;
