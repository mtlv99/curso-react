const { response } = require('express');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line default-param-last, consistent-return
const validarJWT = (req, res = response, next) => {
  // Empezar los headers custom con 'x-nombre' es un estandar.
  // x-token headers
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    // Si logra validar el token, regresará el id y nombre, y los agregará al request.
    const { uid, name } = jwt.verify(
      token,
      // Si se quisiera desloguear a todos los usuarios de un servicio, se podria hacer al cambiar esta seed.
      process.env.SECRET_JWT_SEED,
    );

    req.uid = uid;
    req.name = name;
    // Si no es valido, fallará y retornará respuesta invalida.
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
