const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../auth");

const db = new sqlite3.Database("./db/biblioteca.sqlite");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM usuarios WHERE email = ?", [email], async (err, usuario) => {
    if (err || !usuario) return res.status(401).json({ error: "Usuario no encontrado" });
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(403).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      rol: usuario.rol
    }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
  });
});

module.exports = router;
