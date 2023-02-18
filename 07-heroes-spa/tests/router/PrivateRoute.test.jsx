import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute/>', () => {
  // Se obviaron las pruebas de redireccion por autenticación debido a que
  // ya son parte del test suite de <PublicRoute />, y no se quiere repetir contenido.
  // Acá se evalua principalmente la interacción con el localStorage.

  test('Debe de mostrar el children si el usuario está autenticado', () => {
    // Recordar que Storage no existe en Node por lo tanto esto es solo un mock.
    // Para sobreescribir la implementación del prototype localStorage.setItem();
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: { id: '1234', name: 'Marco' },
    };
    render(
      // No olvidar el AuthContext, ya que el PublicRoute utiliza el useContext,
      // y el Hook estaría leyendo de un objeto en undefined.
      <AuthContext.Provider value={contextValue}>
        {/* No olvidar que initialEntries es un array */}
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Ruta privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
  });
});
