// Rutas de eventos

// {baseUrl}/api/events

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getEventos, crearEvento, actualizarEvento, eliminarEvento,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Todas tienes que pasar por la validación del JWT
// Con esta linea, hace que todas estas rutas pasen por el middleware,
// en vez de tener que pasar el middleware a cada ruta por separado.
// Si se quisiera que una ruta sea pública, se podría poner encima de este use().
// El resto de rutas hacía abajo, serán con auth.
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);
// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    // recordar pasar funcion al final para que la lista de errores sea leida
    validarCampos,
  ],
  crearEvento,
);
// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);
module.exports = router;
