const fetch = require("node-fetch");

// Token y chat ID del bot de Telegram (obtenidos de BotFather y tu canal/chat)
const TELEGRAM_TOKEN = "7914735627:AAGaPzd7CpWfjzkUVDrdXTfVjXe8klTX-Wg";
const CHAT_ID = "7571656070";

// Función que construye y envía el mensaje a Telegram cuando se registra una nueva cita
const enviarNotificacionCitas = async (cita) => {
  // Formato del mensaje enviado a Telegram
  const mensaje = `🩺 Nueva cita agendada\nPaciente ID: ${cita.id_paciente}\nEspecialidad: ${cita.especialidad}\nFecha: ${cita.fecha_hora}\nEstado: ${cita.estado}`;

  try {
    // Realiza la solicitud POST a la API de Telegram
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: mensaje })
    });

    // Verifica si la respuesta fue exitosa
    const data = await res.json();
    if (!data.ok) console.error("Telegram error:", data.description);
  } catch (error) {
    console.error("Error al enviar mensaje a Telegram:", error);
  }
};

module.exports = { enviarNotificacionCitas };
