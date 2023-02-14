/* eslint-disable arrow-body-style, react/jsx-max-props-per-line, react/jsx-first-prop-new-line, react/jsx-closing-bracket-location */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Routes>

      {/* Rutas publicas */}
      <Route path="login" element={(
        <PublicRoute>
          {/* No envolverlo dentro de un <Route path="login" />,
          (como se hizo originalmente), ya que eso ocuparia que esté dentro de un HOC <Routes />
          y aparte se estaría duplicando el stack de navegacion, con un `/login/login` por ejemplo.
          Habria que cambiar el primer Route por <Route path="login/*" />, y el 2do Route por <Route path="/*" />
          */}
          <LoginPage />
        </PublicRoute>
      )} />

      {/* Rutas privadas */}
      <Route path="/*" element={(
        <PrivateRoute>
          {/* No envolverlo dentro de un <Route path="/*" />,
          (como se hizo originalmente), ya que eso ocuparia que esté dentro de un HOC <Routes />
          y aparte se estaría duplicando el stack de navegacion, con un `/marvel/marvel` por ejemplo.
          Habria que cambiar el primer Route por <Route path="marvel/*" />, y el 2do Route por <Route path="/*" />
          */}
          <HeroesRoutes />
        </PrivateRoute>
      )} />

      {/* Cualquier ruta que no sea el LoginPage pase por este componente/router */}

      {/* Así se hacia originalmente, luego se agregó la parte de rutas privadas y publicas */}
      {/* <Route path="login" element={<LoginPage />} /> */}
      {/* <Route path="/*" element={<HeroesRoutes />} /> */}

    </Routes>
  );
};
