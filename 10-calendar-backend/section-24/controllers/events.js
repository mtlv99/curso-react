const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
  try {
    const eventos = await Evento.find()
    // populate es para insertar la info de un model por medio de su referencia.
    // En este caso la referencia de 'user', y se especifica que cosas se quiere que se traiga.
    // Si el 2do argumento está vacio, traerá TODO el objeto, incluso la contraseña!
      .populate('user', 'name');

    return res.json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};
const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    // Leer uid del token.
    evento.user = req.uid;

    const eventoGuardado = await evento.save();
    return res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};
const actualizarEvento = async (req, res = response) => {
  try {
    const eventoId = req.params.id;
    // eslint-disable-next-line prefer-destructuring
    const uid = req.uid;

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para editar este evento',
      });
    }


    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    // El new param es necesario para que retorne el objeto actualizado en el response.
    // Por defecto, moongose mantiene el objeto viejo para hacer algun tipo de comparación.
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
    return res.json({
      ok: true,
      evento: eventoActualizado,
    });

    // El endpoint tambien fallaría si se pasa un id que no sea en el formato de id de MongoDB (12 bytes).
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  try {
    const eventoId = req.params.id;
    // eslint-disable-next-line prefer-destructuring
    const uid = req.uid;

    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id',
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para eliminar este evento',
      });
    }


    const eventoBorrado = await Evento.findByIdAndDelete(eventoId);
    return res.json({
      ok: true,
      evento: eventoBorrado,
    });

    // El endpoint tambien fallaría si se pasa un id que no sea en el formato de id de MongoDB (12 bytes).
  } catch (error) {
    console.log('Error', error);

    return res.status(500).json({
      ok: true,
      msg: 'Error interno.',
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
