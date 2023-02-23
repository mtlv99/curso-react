import React from 'react';
import { Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';

export const JournalPage = () => {
  console.log('');

  // Con el `component` attribute se transforma en un h1 pero conserva el tamaño de un parrafo normal.
  // Con el `variant` attribute se transforma en un h1, y aplica el tamaño de un h1 definido por defecto en Material UI.
  // <Typography component="h1">Journal Page</Typography>
  // <Typography variant="h1">Journal Page</Typography>
  return (
    <JournalLayout>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, dolore doloremque. Rem aperiam, ipsum eius soluta, harum provident quia vero commodi hic veniam doloribus veritatis suscipit unde tempore, dolorum dolor.</Typography>

      {/* NothingSelected */}
      {/* NoteView */}
    </JournalLayout>
  );
};
