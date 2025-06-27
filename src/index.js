const sequelize = require('./db/connection');
const app = require('./app/app'); // Tu aplicación Express

// Importar todos los modelos antes de sincronizar
require('./model/user.model');
require('./model/punto_ventas.model');
require('./model/productoAG.model');
require('./model/cotizacionWeb.model');
require('./model/contacto.model');
require('./model/cliente.model');
require('./model/categoria.model'); // Asegúrate de que exista
require('./model/associations');

const port = 3000;

// Test de conexión y sincronización
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida correctamente.");

    await sequelize.sync(); // Crea las tablas si no existen
    console.log("📦 Tablas sincronizadas correctamente.");

    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error al conectar o sincronizar con la base de datos:", error);
  }
})();
