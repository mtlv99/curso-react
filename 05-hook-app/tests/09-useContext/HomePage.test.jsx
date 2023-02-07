import { render, screen } from '@testing-library/react';
import { UserContext } from '../../src/09-useContext/context/UserContext';
import { HomePage } from '../../src/09-useContext/HomePage';

describe('Pruebas en <HomePage />', () => {
  const user = {
    id: 1,
    name: 'Marco',
  };

  test('debe de mostrar el componente sin el usuario', () => {
    // Las pruebas de Context se deben hacer pasando el provider siempre.
    // No probar sin el HOC (solo con el HomePage, por ejemplo).
    // Ademas es más facil probar varios escenarios con solo modificar el value del Provider.
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>,
    );

    // Acá también se agregó un label en el jsx original.
    const preTag = screen.getByLabelText('pre');

    // Es la forma en que se renderiza en el HTML (con las comillas dobles). Esto lo añadí yo,
    // no es parte del curso. Habrá una mejor forma de hacerlo??
    expect(preTag.innerHTML).toBe('"Sin usuario."');
  });

  test('debe de mostrar el componente con el usuario', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>,
    );

    const preTag = screen.getByLabelText('pre');

    expect(preTag.innerHTML).toContain(user.name);

    // Acá se debe convertir a string para que haga match, debido al stringify en el `pre`.
    expect(preTag.innerHTML).toContain(`${user.id}`);
  });
});
