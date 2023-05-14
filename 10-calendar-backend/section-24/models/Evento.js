const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    // Referencia al id de Usuario
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});


// Para sobreescribir el metodo toJSON (la funcion que se llama cuando se va a retornar el objeto en el response)
// No afecta nada en DB, solo es para la data retornada.
// eslint-disable-next-line func-names
EventoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Evento', EventoSchema);
