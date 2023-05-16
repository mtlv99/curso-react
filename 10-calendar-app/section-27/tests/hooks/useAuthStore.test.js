import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';


// eslint-disable-next-line no-shadow
const getMockStore = (initialState) => configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: { ...initialState },
  },
});

describe('Pruebas en useAuthStore', () => {
  test('debe de regresar los valores por defecto', () => {
    // Para modificar el valor del state a través de todas las pruebas, con un state definido.

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      // Para inyectarle un wrapper de Provider al Hook, se hace por medio del "wrapper" property.
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    expect(result.current).toEqual({
      user: {},
      status: 'checking',
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      startLogout: expect.any(Function),
      checkAuthToken: expect.any(Function),
    });
  });

  // Para estos test, el backend tiene que estar corriendo.
  test('startLogin debe de realizar el login correctamente', async () => {
    // Es buena practica limpiar el localStorate en los unit test para asegurarse de que los cambios reflejados
    // sean realmente los esperados, y evitar falsos positivos.
    localStorage.clear();

    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    // Recordar llamar la función del startLogin(), de lo contrario no se verá ningun cambio
    // reflejado en el state.
    // Como en este caso el startLogin() tiene codigo asincrono, el act tambien debe ser asincrono,
    // de lo contrario no esperará a que las tareas asincronas del startLogin() terminen.
    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    // Comprobacion de usuario actualizado.
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Unit Test Name', uid: '646308d7f07772dc2ba9f32c' },
    });

    // Comprobacion de token insertado.
    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });
});
