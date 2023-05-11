const { response } = require('express');
const Usuario = require('../models/Usuario');

// El response e importaciones de express acá, es para que
// vscode nos muestre la ayuda del IntelliSense.
const crearUsuario = async (req, res = response) => {
  // const { name, email, password } = req.body;

  try {
    const usuario = new Usuario(req.body);
    await usuario.save();

    return res.status(201).json({
      ok: true,
      msg: 'registro',
    });
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};

const loginUsuario = (req, res = response) => {
  const { email, password } = req.body;

  return res.json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
};
const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
