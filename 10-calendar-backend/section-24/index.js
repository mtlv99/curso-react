const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./database/config');

dotenv.config();

// Crea el servidor express.
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
// `.use()` es un Middleware.
// Middleware: funciones que se ejecutan cuando pasa cualquier petición por el servidor.
app.use(express.static('public'));

// Lectura y parseo de body en formato JSON (necesario para leer JSON's enviados dentro de una petición)
// Nota: esto debe ir ANTES de todas las rutas.
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Esto es para cargar el build de produccion y que sea servido por el mismo proyecto del backend.
// Es una alternativa a usar HashRouter (funciona, pero no es recomendado).
app.get('*', (req, res) => {
  // eslint-disable-next-line no-path-concat, prefer-template
  res.sendFile(__dirname + '/public/index.html');
})

// Levanta el servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
