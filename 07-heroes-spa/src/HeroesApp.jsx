import React from 'react';
import { AuthProvider } from './auth';
import { AppRouter } from './router/AppRouter';

export const HeroesApp = () => {
  console.log('');

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
