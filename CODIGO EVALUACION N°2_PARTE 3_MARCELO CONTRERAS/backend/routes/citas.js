const express = require("express");
const router = express.Router();
const controller = require("../controllers/citasController");
const { autenticarToken } = require("../auth");

// Rutas protegidas con middleware
router.post("/", autenticarToken, controller.registrarCita);
router.get("/:id", autenticarToken, controller.obtenerCitas);

module.exports = router;
