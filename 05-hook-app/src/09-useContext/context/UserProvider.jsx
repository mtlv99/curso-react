/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { UserContext } from './UserContext';

// const user = {
//   id: 123,
//   name: 'Marco Leon',
//   email: 'marco@example.com',
// };

// Se debe usar en el punto mas alto del arbol de componentes
// para que todos los hijos puedan leer de él.
export const UserProvider = ({ children }) => {
  // También se pueden hacer getters y setters por aparte para no darle tanto control al resto de
  // componentes, pero por ahora se pasa el setUser.
  const [user, setUser] = useState();

  // No olvidar el provider al final del Context!!!
  return (
    // En el value se pasan los valores que TODOS los componentes hijos van a recibir.
    // TODO: Parece que este value se debe memorizar. A lo mejor se menciona más adelante en el curso.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};
