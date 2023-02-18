import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

// Tuve que agregar este mock de la libreria query-string para que funciona el test.
// No es parte del curso, así que no sé si sea la mejor solución, pero funciona.
jest.mock('query-string', () => ({ parse: jest.fn() }));

describe('Pruebas en <AppRouter />', () => {
  test('debe de mostrar el login si NO está autenticado', () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    // screen.debug();
    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('debe de mostrar el componente de MarvelPage si está autenticado', () => {
    const contextValue = {
      logged: true,
      user: { id: '1234', name: 'Marco' },
    };

    render(
      // También se podría evaluar con el valor de `/login` en initialEntries,
      // ésto para probar la redireccion en caso de que el usuario si esté autenticado.
      // <MemoryRouter initialEntries={['/login']}>
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    // screen.debug();
    // expect(screen.getAllByText('Marvel Comics')).toBeTruthy();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
  });
});
