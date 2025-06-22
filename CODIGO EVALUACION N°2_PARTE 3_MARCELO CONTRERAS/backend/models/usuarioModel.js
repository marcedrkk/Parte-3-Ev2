const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/biblioteca.sqlite");
const bcrypt = require("bcrypt");

function crearUsuario(nombre, email, password, rol, callback) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    db.run("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, hash, rol], function(err) {
        callback(err, this);
      });
  });
}

module.exports = {
  crearUsuario
};
