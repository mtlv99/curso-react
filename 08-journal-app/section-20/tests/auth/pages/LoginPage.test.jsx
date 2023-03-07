import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

// Es importante que lleve la palabra mock en el nombre, de lo contrario no va a funcionar.
const mockStartGoogleSignIn = jest.fn();
const mockStartEmailSignIn = jest.fn();

/* eslint-disable arrow-body-style */
jest.mock('../../../src/store/auth/thunks', () => ({
  // No olvidar llamarlo por medio de un callback acá, oops...
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startEmailSignIn: ({ email, password }) => {
    return () => {
      return mockStartEmailSignIn({ email, password });
    };
  },
}));

// Para hacer un mock de useDispatch pero preservando el resto de la libreria:
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

// De esta forma se puede tener un control más libre del store a la hora de testear.
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});


describe('Pruebas en <LoginPage />', () => {
  // No olvidar el clearAllMocks() cuando se usan mocks! [jest.fn()]
  beforeEach(() => jest.clearAllMocks());


  test('debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    // screen.debug();

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });


  test('boton de google debe de llamar al startGoogleSignIn', () => {
    // Haciendo un log del getState se puede ver al state cambiando después de ejecutar algunas cosas.
    console.log('not-authenticated', store.getState());

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,

    );

    const googleBtn = screen.getByLabelText('google-btn');

    // hay que asegurarse de que el status del user esté en not-authenticated,
    // ya que si está en checking, el botón estará disabled y hacer un evento de
    // click no hará nada (basicamente igual a hacerlo manualmente en el browser!).
    fireEvent.click(googleBtn);

    // screen.debug();
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('boton de login debe de llamar al startGoogleSignIn', () => {
    const email = 'marco@example.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,

    );

    // Se usan diferentes formas de acceder al DOM por fines educativos.
    // (Acá el email input lo encuentra porque el label 'Correo')
    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } }); // setea valor del input 'email'

    // El password funciona diferente, por lo que hay que pasarle un test-id al JSX.
    // (por medio de 'inputProps')
    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } }); // setea valor del input 'password'

    // Acá se agregó un aria-label al JSX.
    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    // La funcion deberia llamarse con los valores del submit.
    // Para este hay que hacer el mock del useDispatch, y pasar los argumentos de email y password por el 'jest.mock()'.
    expect(mockStartEmailSignIn).toHaveBeenCalledWith({ email, password });
  });
});
