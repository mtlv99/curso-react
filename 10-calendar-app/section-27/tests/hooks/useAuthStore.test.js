import { Provider } from 'react-redux';
import { act, renderHook, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';


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
  // Es buena practica limpiar el localStorate en los unit test para asegurarse de que los cambios reflejados
  // sean realmente los esperados, y evitar falsos positivos.
  beforeEach(() => localStorage.clear());

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

  test('startLogin debe de fallar el authentication', async () => {
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
      await result.current.startLogin({ email: 'no-existe@example.com', password: '1234NoExisto:(' });
    });


    const { errorMessage, status, user } = result.current;

    // el token debe limpiarse
    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: {},
    });

    // Para el setTimeout
    await waitFor(
      () => expect(result.current.errorMessage).toBe(undefined),
    );
  });

  test('startRegister debe de crear un usuario nuevo', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const newUser = { email: 'no-existe2@example.com', password: '12345NoExisto:(', name: 'No existoo' };

    const { result } = renderHook(() => useAuthStore(), {
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    // Mock parcial:
    // mockear el return del calendarApi.post()
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '123456789101',
        name: 'Test User 3',
        token: 'Token-que-no-existe',
      },
    });


    await act(async () => {
      await result.current.startRegister(newUser);
    });


    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User 3', uid: '123456789101' },
    });

    // Asegurarse de limpiar/eliminar el spy antes de continuar con otra prueba, puede causar problemas.
    spy.mockRestore();
  });

  test('startRegister debe de fallar la creación de un usuario que ya existe', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });


    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });


    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Un usuario existe con ese correo',
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken debe de fallar si no hay token', async () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });


    await act(async () => {
      await result.current.checkAuthToken();
    });


    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken debe de autenticar al usuario si hay un token', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);

    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Unit Test Name', uid: '646308d7f07772dc2ba9f32c' },
    });
  });
});
