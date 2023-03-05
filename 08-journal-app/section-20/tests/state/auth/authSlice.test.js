import {
  authSlice, login, logout, checkingCredentials,
} from '../../../src/store/auth/authSlice';
import { demoUser, initialState, authenticatedState } from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    // Asi se pasa la info al state (objeto vacío para que no haga match con ningun reducer, por lo tanto
    // devuelve el state inicial).
    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
    expect(authSlice.name).toBe('auth');
  });

  test('debe de realizar la autenticación', () => {
    // Primero se pasa un state inicial, y luego se llama el reducer con el payload.
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test('debe de realizar el logout sin argumentos', () => {
    // Acá el estado inicial sería authenticated, porque para hacer logout,
    // primero hay que estar autenticado.
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test('debe de realizar el logout y mostrar un mensaje de error', () => {
    const errorMessage = 'Credenciales no son correctas.';

    // Acá el estado inicial sería authenticated, porque para hacer logout,
    // primero hay que estar autenticado.
    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    expect(state).toEqual({
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage,
    });
  });

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
  });
});
