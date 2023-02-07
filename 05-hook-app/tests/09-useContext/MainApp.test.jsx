import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { MainApp } from '../../src/09-useContext/MainApp';


describe('Pruebas en <MainApp />', () => {
  test('debe de mostrar el <HomePage />', () => {
    // El BrowserRouter provee algunos hooks internos que son necesarios para la navegación.
    // Pero este HOC solo funciona para browsers, y en testing solo tenemos acceso a la consola,
    // por lo que hay que usar un HOC diferente. Acá es donde viene en juego el MemoryRouter.
    render(
      <MemoryRouter>
        <MainApp />
      </MemoryRouter>,
    );

    expect(screen.getByText('HomePage')).toBeTruthy();
  });

  test('debe de mostrar el <LoginPage />', () => {
    // El initialEntries contiene un arreglo de todas las secciones de la URL, en este caso queremos mandar
    // el router hacia `/login`.
    render(
      <MemoryRouter initialEntries={['/login']}>
        <MainApp />
      </MemoryRouter>,
    );

    expect(screen.getByText('LoginPage')).toBeTruthy();
  });
});
