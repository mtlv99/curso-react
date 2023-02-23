import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from '../components/NavBar';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  console.log('');

  return (
    // El Box es similar a un div
    <Box sx={{ display: 'flex' }}>

      {/* Navbar */}
      <NavBar drawerWidth={drawerWidth} />


      {/* Sidebar */}
      {/* El `component` convierte el div en un main */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        { children }
      </Box>

    </Box>
  );
};
