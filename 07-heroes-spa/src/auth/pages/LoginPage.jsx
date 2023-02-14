import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  // Ver comentario del Navbar.jsx
  const navigate = useNavigate();

  const onLogin = () => {
    login('Marco Leon');

    // Ver comentario del Navbar.jsx
    // Acá se usa `/` para ir al root del app.
    // Con replace para que el usuario no pueda volver al login.
    navigate('/', { replace: true });
  };

  return (
    <div className="container mt-5">

      <h1>Login</h1>
      <hr />

      <button type="button" onClick={onLogin} className="btn btn-primary">Login</button>

    </div>
  );
};
