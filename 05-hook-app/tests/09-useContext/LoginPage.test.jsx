import { fireEvent, render, screen } from '@testing-library/react';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { LoginPage } from '../../src/09-useContext/LoginPage';


jest.mock('../../src/09-useContext/context/UserContext');

describe('Pruebas en <LoginPage />', () => {
  const user = {
    id: 123,
    name: 'Marco Leon',
    email: 'marco@example.com',
  };

  test('debe de mostrar el componente sin el usuario', () => {
    // Las pruebas de Context se deben hacer pasando el provider siempre.
    // No probar sin el HOC (solo con el LoginPage, por ejemplo).
    // Ademas es más facil probar varios escenarios con solo modificar el value del Provider.
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>,
    );

    // Acá también se agregó un label en el jsx original.
    const preTag = screen.getByLabelText('pre');

    expect(preTag.innerHTML).toBe('null');
  });

  test('debe de mostrar el componente con el usuario', () => {
    const setUserMock = jest.fn();

    render(
      <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>,
    );

    const setUserButton = screen.getByRole('button');

    fireEvent.click(setUserButton);

    expect(setUserMock).toHaveBeenCalledWith(user);
  });
});
