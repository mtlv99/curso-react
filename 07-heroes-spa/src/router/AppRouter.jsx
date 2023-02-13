import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from '../ui';
import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes';

export const AppRouter = () => {
  console.log('');
  return (
    <Routes>

      <Route path="login" element={<LoginPage />} />

      {/* Cualquier ruta que no sea el LoginPage pase por este componente/router */}
      <Route path="/*" element={<HeroesRoutes />} />
    </Routes>
  );
};
