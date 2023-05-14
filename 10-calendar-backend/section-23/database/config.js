const { default: mongoose } = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.connect(
      // Nota: Los usuarios y contraseñas de DB NUNCA se deben subir al repositorio!!!!!
      // Tampoco la cadena de conexión. Esto lo dejo acá porque son bases de datos
      // de prueba, y las borraré eventualmente.
      process.env.DB_CNN,
      {
        // Estos valores ya no son necesarios en las nuevas versiones de Mongoose.
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
      },
    );

    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    throw new Error('Connection to DB failed.');
  }
};

module.exports = {
  dbConnection,
};
