import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  const { status } = useCheckAuth();

  // Colocar al final para evitar bugs de ciclos de routing.
  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>

      {/* Las rutas no existen "fisicamente", hasta que se cumpla la condición */}
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      {/* Si no se cumple la condición se envia al login */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />

      {/* PRIMERA FORMA EN QUE SE TRABAJABA, REEMPLAZADO POR LOGIN CON FIREBASE */}
      {/* Login y registro */}
      {/* Cual ruta que tenga /auth en el path, se irá a AuthRoutes */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* De lo contrario, pasa por JournalRoutes */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}

    </Routes>
  );
};
