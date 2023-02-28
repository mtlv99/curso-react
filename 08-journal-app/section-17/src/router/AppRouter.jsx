import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => (
  <Routes>

    {/* Login y registro */}
    {/* Cual ruta que tenga /auth en el path, se irá a AuthRoutes */}
    <Route path="/auth/*" element={<AuthRoutes />} />

    {/* JournalApp */}
    {/* De lo contrario, pasa por JournalRoutes */}
    <Route path="/*" element={<JournalRoutes />} />

  </Routes>
);
