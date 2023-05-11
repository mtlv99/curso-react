const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// El response e importaciones de express acá, es para que
// vscode nos muestre la ayuda del IntelliSense.
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      });
    }

    usuario = new Usuario(req.body);

    // encriptar constraseña

    // se puede pasar un numero de rondas para encriptar el password, por defecto es 10.
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};

const loginUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        // Es mejor ser ambiguos con el mensaje de error,
        // para no darle pistas a un posible atacante, pero como es un proyecto de pruebas todo bien.
        msg: 'No existe usuario con ese email.',
      });
    }

    // Confirmar contraseñas
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario o contraseña incorrectos.',
      });
    }

    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
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
