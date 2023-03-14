// Rutas de autenticación
// {baseUrl}/api/auth

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
  });
});


module.exports = router;

