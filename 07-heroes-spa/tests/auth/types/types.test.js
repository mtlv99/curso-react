import { types } from '../../../src/auth';

describe('Pruebas en Types.js', () => {
  // Prueba muy facil pero asegura tener un "candado" con los types posibles.
  // Si alguien comete un typo o similares, este test fallará.
  test('debe de regresar los types correctos', () => {
    expect(types).toEqual({
      login: '[AUTH] Login',
      logout: '[AUTH] Logout',
    });
  });
});
