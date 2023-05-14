// Rutas de eventos

// {baseUrl}/api/events

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getEventos, crearEvento, actualizarEvento, eliminarEvento,
} = require('../controllers/events');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// Obtener eventos
router.get('/', validarJWT, getEventos);
// Crear un nuevo evento
router.post('/', validarJWT, crearEvento);
// Actualizar Evento
router.put('/:id', validarJWT, actualizarEvento);

// Borrar evento
router.delete('/:id', validarJWT, eliminarEvento);
module.exports = router;
