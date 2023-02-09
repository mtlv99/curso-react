import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { DcPage } from '../heroes/pages/DcPage';
import { MarvelPage } from '../heroes/pages/MarvelPage';

export const AppRouter = () => {
  console.log('');
  return (
    <Routes>
      <Route path="marvel" element={<MarvelPage />} />
      <Route path="dc" element={<DcPage />} />
      <Route path="login" element={<LoginPage />} />

      {/* Ruta comodín, si no hay ningun match, siempre irá a esta, es como el default de un switch */}
      <Route path="/" element={<Navigate to="/marvel" />} />
    </Routes>
  );
};
