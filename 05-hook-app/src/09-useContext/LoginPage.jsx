import { useContext } from 'react';
import { UserContext } from './context/UserContext';

export const LoginPage = () => {
  // De esta forma se pueden leer los elementos del context.
  // Se requiere pasar como atributo la declaracion del UserContext.
  // Si hubieran 2 instancias del UserContext, React buscará hacia arriba
  // por la instancia más cercana. Funciona igual que el specificity de CSS.
  // Aplicaria el que está más adentro en el arbol de componentes.
  const userContext = useContext(UserContext);

  console.log(userContext);

  return (
    <>
      <h1>LoginPage</h1>
      <hr />

      <pre aria-label="pre">
        {JSON.stringify(userContext?.user, null, 3)}
      </pre>

      <button type="button" className="btn btn-primary" onClick={() => userContext.setUser({ id: 123, name: 'Marco Leon', email: 'marco@example.com' })}>
        Establecer Usuario
      </button>
    </>
  );
};

