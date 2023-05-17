import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { CalendarPage } from '../../src/calendar';

jest.mock('../../src/hooks/useAuthStore');

// Se pueden hacer mocks de componentes también, wow!!
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>Calendar Page - Mock</h1>,
}));

describe('Pruebas en <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());


  test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText('Cargando...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('debe de mostrar el login en caso de no estar autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      // Acá esto prueba también que se haga redirección al login, por la forma en como está configurado el wildcard del Router.
      <MemoryRouter initialEntries={['/auth2/algo/noexisto']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText('Ingreso')).toBeTruthy();
  });

  test('debe de mostrar el calendario si se está autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      // Acá esto prueba también que se haga redirección al login, por la forma en como está configurado el wildcard del Router.
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();

    // Se está haciendo un mock del calendario. Esto para evitar hacer el mocking
    // de todo lo interno del componente, custom hooks, providers, reducers... etc
    expect(screen.getByText('Calendar Page - Mock')).toBeTruthy();
  });
});
