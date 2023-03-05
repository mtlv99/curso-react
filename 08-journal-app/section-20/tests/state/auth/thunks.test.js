import { checkingCredentials } from '../../../src/store/auth/authSlice';
import { checkingAuthentication } from '../../../src/store/auth/thunks';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  // es mejor limpiar todos los mocks en cada test.
  beforeEach(() => jest.clearAllMocks());

  test('debe de invocar el checkingCredentials', async () => {
    // De esta forma se accede al callback de checkingAuthentication, y se le pasa el mock de dispatch (sin ejecutarlo)
    await checkingAuthentication()(dispatch);

    console.log(checkingCredentials());

    // Son lo mismo (esto devuelve el reducer, basicamete un action construido);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/checkingCredentials', payload: undefined });
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
