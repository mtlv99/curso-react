import React, { useEffect, useState } from 'react';
import { useForm } from '../hooks/useForm';

export const FormWithCustomHook = () => {
  // Esta destructuracion es de los resultados del Hook.
  // No soy muy fan de esta sintaxis... confunde un poco.
  const {
    onResetForm, onInputChange, username, email, password,
  } = useForm({
    username: '',
    email: '',
    password: '',
  });

  // Esto es cuando no se usa el spread operator en el return del Hook.
  // const { username, email, password } = formState;

  return (
    <>
      <h1>Formulario con Custom Hook</h1>

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

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <button className="btn btn-primary mt-2" type="button" onClick={() => onResetForm()}>Reset</button>
    </>
  );
};
