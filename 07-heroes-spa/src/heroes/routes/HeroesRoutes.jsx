import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../ui';
import {
  DcPage, HeroPage, MarvelPage, SearchPage,
} from '../pages';

export const HeroesRoutes = () => {
  console.log('');

  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>

          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />

          <Route path="search" element={<SearchPage />} />
          <Route path="hero" element={<HeroPage />} />

          {/* Ruta comodín, si no hay ningun match, siempre irá a esta, es como el default de un switch */}
          <Route path="/" element={<Navigate to="/marvel" />} />
        </Routes>
      </div>
    </>
  );
};
