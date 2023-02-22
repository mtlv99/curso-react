import React from 'react';
import { Typography } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

export const JournalPage = () => {
  console.log('');

  // Con el `component` attribute se transforma en un h1 pero conserva el tamaño de un parrafo normal.
  // Con el `variant` attribute se transforma en un h1, y aplica el tamaño de un h1 definido por defecto en Material UI.
  // <Typography component="h1">Journal Page</Typography>
  // <Typography variant="h1">Journal Page</Typography>
  return (
    <>
      {/* <Typography component="h1">Journal Page</Typography> */}
      <Typography variant="h1">Journal Page</Typography>
      <MailOutline />
    </>
  );
};
