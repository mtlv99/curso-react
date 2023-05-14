const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
  name: {
    type: String,
    // Es required, con D... :)
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model('Usuario', UsuarioSchema);
