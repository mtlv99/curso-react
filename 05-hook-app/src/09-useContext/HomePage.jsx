/* eslint-disable react/jsx-one-expression-per-line */
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

export const HomePage = () => {
  // Leer comentario sobre useContext en LoginPage.jsx
  // (La unica diferencia es que aqui se destructura)
  const { user } = useContext(UserContext);

  return (
    <>
      <h1>HomePage <small>{user?.name}</small> </h1>
      <hr />

      <pre>
        {JSON.stringify(user ?? 'Sin usuario.', null, 3)}
      </pre>
    </>
  );
};

