const { response } = require('express');

// El response e importaciones de express acá, es para que
// vscode nos muestre la ayuda del IntelliSense.
const crearUsuario = (req, res = response) => {
  const { name, email, password } = req.body;

  return res.json({
    ok: true,
    msg: 'registro',
    name,
    email,
    password,
  });
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
