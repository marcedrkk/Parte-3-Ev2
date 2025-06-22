
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      const text = await res.text();
      console.error("Respuesta inesperada del servidor:", text);
      alert("❌ Respuesta inesperada del servidor.");
      return;
    }

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("✅ Sesión iniciada correctamente");
      cerrarModal();
    } else {
      alert("❌ Error: " + (data.error || "No se pudo iniciar sesión"));
    }
  } catch (err) {
    alert("❌ Error al conectar con el servidor");
    console.error(err);
  }
});

document.getElementById("formCita")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const data = {
    pacienteId: parseInt(document.getElementById("pacienteId").value),
    especialidad: document.getElementById("especialidad").value,
    fecha: document.getElementById("fecha").value + ' ' + document.getElementById("hora").value
  };

  const res = await fetch("http://localhost:3000/citas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const resultado = await res.json();
  if (res.ok) {
    alert("✅ Cita agendada con éxito.");
  } else {
    alert("❌ " + (resultado.error || "Error al registrar cita"));
  }
});

document.getElementById("formHistorial")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("pacienteIdHistorial").value;
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:3000/historial/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  let historial;
  try {
    historial = await res.json();
  } catch (e) {
    const raw = await res.text();
    console.error("Respuesta no JSON:", raw);
    alert("❌ Error inesperado al recuperar historial.");
    return;
  }

  const contenedor = document.getElementById("resultadoHistorial");
  contenedor.innerHTML = "";

  if (!Array.isArray(historial) || historial.length === 0 || historial.error) {
    contenedor.innerHTML = "<p>No se encontraron registros para este paciente o acceso denegado.</p>";
    return;
  }

  historial.forEach(entry => {
    const card = document.createElement("div");
    card.className = "historial-card";
    card.innerHTML = `
      <h3>🩺 Atención Médica</h3>
      <p><strong>Fecha:</strong> ${entry.fecha_atencion}</p>
      <p><strong>Médico ID:</strong> ${entry.id_medico}</p>
      <p><strong>Diagnóstico:</strong> ${entry.diagnostico}</p>
      <p><strong>Tratamiento:</strong> ${entry.tratamiento}</p>
    `;
    contenedor.appendChild(card);
  });
});

