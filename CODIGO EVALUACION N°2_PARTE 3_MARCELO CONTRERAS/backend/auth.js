const jwt = require("jsonwebtoken");
const SECRET_KEY = "vitalis_secret";

// Middleware para verificar token y extraer datos del usuario
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
}

// Middleware para verificar el rol del usuario
function autorizarRol(...rolesPermitidos) {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) return res.sendStatus(403);
    next();
  };
}

module.exports = {
  autenticarToken,
  autorizarRol,
  SECRET_KEY
};
