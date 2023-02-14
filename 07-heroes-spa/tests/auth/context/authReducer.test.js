import { authReducer, types } from '../../../src/auth';


describe('Pruebas en authReducer', () => {
  const initialState = {
    logged: false,
  };

  const loggedUser = {
    logged: true,
    user: {
      id: 'ABC',
      name: 'Marco Leon',
    },
  };


  test('debe de regresar el estado inicial', () => {
    // Se pasa un objeto vacio para que se ejecute el default del switch.
    const newState = authReducer(initialState, {});

    // toEqual para comparar objetos por valor y no por su posición en memoria.
    expect(newState).toEqual(initialState);
  });

  test('debe de hacer login del usuario', () => {
    const action = {
      type: types.login,
      payload: loggedUser.user,
    };

    const newState = authReducer(initialState, action);

    expect(newState.logged).toBe(true);
    expect(newState.user).toEqual(action.payload);
  });

  test('debe de hacer logout del usuario', () => {
    const action = { type: types.logout };

    const newState = authReducer(loggedUser, action);

    expect(newState.logged).toBe(false);
    expect(newState).toEqual(initialState);
  });
});
