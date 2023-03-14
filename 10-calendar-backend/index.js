const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

// Crea el servidor express.
const app = express();

// Directorio Público
// `.use()` es un Middleware.
// Middleware: funciones que se ejecutan cuando pasa cualquier petición por el servidor.
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./routes/auth'));

// Levanta el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
