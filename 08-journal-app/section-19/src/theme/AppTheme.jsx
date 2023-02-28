import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { purpleTheme } from '.';

export const AppTheme = ({ children }) => (
  <ThemeProvider theme={purpleTheme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    {/* Basicamente es similar a un normalize.css */}
    <CssBaseline />
    {children}
  </ThemeProvider>
);
