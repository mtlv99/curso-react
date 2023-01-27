import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { Navbar } from './Navbar';

export const MainApp = () => {
  console.log('');
  return (
    <>
      <Navbar />

      {/* <h1>MainApp</h1> */}
      <hr />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* 2 formas de establar una ruta con wildcard, aunque la primera no redirecciona
            y deja la ruta toda sucia en caso de que se ingrese un valor erroneo
            */}
        {/* <Route path="/*" element={ <LoginPage /> } /> */}
        <Route path="/*" element={<Navigate to="/about" />} />
      </Routes>
    </>
  );
};
