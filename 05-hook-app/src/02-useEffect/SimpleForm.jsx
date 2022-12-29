import React, { useEffect, useState } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    username: 'marco',
    email: 'email@example.com',
  });

  const { username, email } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      // Propiedad computada
      [name]: value,
    });
  };

  // NO se recomienda que se usen useEffect sin dependencias.
  // Es recomendable dividir las responsabilidades en varios useEffect
  useEffect(() => () => {
    // console.log('useEffect called once.');
  }, []);

  useEffect(() => () => {
    // console.log('formState changed!');
  }, [formState]);

  // Tambien se puede usar en propiedades destructuradas, por ejemplo
  // para que este efecto vaya y compruebe en una peticion asincrona si el email es valido
  // (Solo se estaria ejecutando cuando el email cambia)
  useEffect(() => () => {
    // console.log('email changed!');
  }, [email]);


  return (
    <>
      <h1>Formulario Simple</h1>

      <hr />

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="text"
        className="form-control"
        placeholder="example@example.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      {/* Solo para demostrar rapidamente el unmount con el useEffect */}
      {username === 'marco' && <Message />}
    </>
  );
};
