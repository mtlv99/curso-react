// En caso de necesitar la implementación del FetchAPI (también limpia algunos errores en los tests)
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

// Polyfill para usar cloudinary en los unit tests
import 'setimmediate';


require('dotenv').config({
  path: '.env.test',
});

// Hace un mock de getEnviroments, para poder hacer el puente
// entre las variables de Node y de Vite (ughhhhh).
jest.mock('./src/helpers/getEnvironments', () => ({
  getEnvironments: () => ({ ...process.env }),
}));

