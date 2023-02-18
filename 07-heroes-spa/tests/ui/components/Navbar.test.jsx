import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

// Mock Parcial: permite mockear solo una parte de la libreria, y dejar el
// resto intacto, usando la libreria real.
jest.mock('react-router-dom', () => ({
  // este jest.requireActual() copia toda la libreria, luego se reemplaza la
  // parte que se ocupa mockear.
  // Si NO usamos esto, tendriamos que hacer un mock de TODA la libreria, o de lo contrario
  // tendremos errores por todo lado.
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: { id: '1234', name: 'Marco' },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        {/* No olvidar el MemoryRouter!! Provee un mock para el useNavigate(), oops. */}
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    // screen.debug();
    expect(screen.getAllByText(contextValue.user.name)).toBeTruthy();
  });

  test('debe de llamar el logout() y navigate() cuando se hace el click en el botón', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        {/* No olvidar el MemoryRouter!! Provee un mock para el useNavigate(), oops. */}
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
