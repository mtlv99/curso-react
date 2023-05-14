const { response } = require('express');
const { validationResult } = require('express-validator');

// eslint-disable-next-line default-param-last, consistent-return
const validarCampos = (req, res = response, next) => {
  // Manejo de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validarCampos,
};
