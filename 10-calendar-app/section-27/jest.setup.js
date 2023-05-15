// En caso de necesitar la implementación del FetchAPI (también limpia algunos errores en los tests)
// import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

// Polyfill para usar cloudinary en los unit tests
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
require('dotenv').config({
  path: '.env.test',
});

// Hace un mock de getEnviroments, para poder hacer el puente
// entre las variables de Node y de Vite (ughhhhh).
jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env }),
}));

