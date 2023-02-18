import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en <PublicRoute />', () => {
  test('Debe de mostrar el children si el usuario NO está autenticado', () => {
    const contextValue = {
      logged: false,
    };
    render(
      // No olvidar el AuthContext, ya que el PublicRoute utiliza el useContext,
      // y el Hook estaría leyendo de un objeto en undefined.
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Ruta pública')).toBeTruthy();
  });

  test('debe de navegar al root si el usuario está autenticado', () => {
    const contextValue = {
      logged: true,
      user: { id: '1234', name: 'Marco' },
    };

    render(

      <AuthContext.Provider value={contextValue}>
        {/* No hay que olvidar las initialEntries con el login (ya que es la ruta inicial)
        y una ruta adicional a la cual navegar, ya que sin eso se crearía un bucle infinito.
        En este caso el login está como initialEntry porque se quiere testear que si el usuario
        está autenticado y quiere entrar al login, se debe redireccionar al root (MarvelPage)
        */}
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={(
                <PublicRoute>
                  <h1>Ruta pública</h1>
                </PublicRoute>
              )}
            />
            {/* Recordar que MarvelPage está puesto como root */}
            <Route path="/" element={<h1>Página Marvel</h1>} />
          </Routes>

        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText('Página Marvel')).toBeTruthy();
  });
});
