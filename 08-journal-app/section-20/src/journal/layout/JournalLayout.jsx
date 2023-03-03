import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => (
  // El Box es similar a un div
  <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">

    {/* Navbar */}
    <NavBar drawerWidth={drawerWidth} />


    {/* Sidebar */}
    <SideBar drawerWidth={drawerWidth} />

    {/* El `component` convierte el div en un main */}
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {/* Toolbar (esto genera un espacio para que el texto del app baje, y no sea tapado por el navbar) */}
      <Toolbar />

      { children }
    </Box>

  </Box>
);
