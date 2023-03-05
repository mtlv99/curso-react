import { signInWithGoogle, signInWithEmailPassword, logoutFirebase } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication, startGoogleSignIn, startEmailSignIn, startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en Auth thunks', () => {
  const dispatch = jest.fn();

  // es mejor limpiar todos los mocks en cada test.
  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar el checkingCredentials', async () => {
    // De esta forma se accede al callback de checkingAuthentication, y se le pasa el mock de dispatch (sin ejecutarlo)
    await checkingAuthentication()(dispatch);

    // Son lo mismo (esto devuelve el reducer, basicamete un action construido);
    // expect(dispatch).toHaveBeenCalledWith({ type: 'auth/checkingCredentials', payload: undefined });
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSign In debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };

    // hace un mock del return de sign in de popup (hay que usar un mock porque por consola no se puede invocar el popup)
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSign In debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error de Google' };

    // hace un mock del return de sign in de popup (hay que usar un mock porque por consola no se puede invocar el popup)
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith({ ...logout(loginData.errorMessage) });
  });

  test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    // hace un mock del return de email sign in
    await signInWithEmailPassword.mockResolvedValue(loginData);
    await startEmailSignIn(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
