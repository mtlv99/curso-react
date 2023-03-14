// Rutas de autenticación
// {baseUrl}/api/auth

const express = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

// La logica de cada endpoint se pasó a un controller.
router.post(
  '/new',
  [ // Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario,
);

router.post(
  '/',
  [ // Middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  loginUsuario,
);
router.get('/renew', revalidarToken);


module.exports = router;

