import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => (
  // La tipografia que se instaló por un link en el index.html no funcionará a menos
  // que se use dentro de un AppTheme (con un createTheme).
  <AppTheme>
    <AppRouter />
  </AppTheme>
);
