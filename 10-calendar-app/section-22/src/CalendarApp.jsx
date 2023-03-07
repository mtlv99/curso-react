import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

export const CalendarApp = () => {
  console.log('');

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
