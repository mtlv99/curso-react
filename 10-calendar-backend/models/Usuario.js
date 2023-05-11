const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = model('Usuario', UsuarioSchema);
