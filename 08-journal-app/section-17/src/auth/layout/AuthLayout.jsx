import { Grid, Typography } from '@mui/material';
import React from 'react';

export const AuthLayout = ({ children, title = '' }) =>
// SX de Material UI:
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    // El `sx` de Material UI nos permite accesar al theme para leer sus propiedades.
    // Significa extra style (?).
    // NO confundir con `xs`, que es para tamaños de layout.
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
      // Nota: Material UI trabaja con mobile first, por lo que aplicará por defecto los estilos
      // más pequeños si no se definen breakpoints más grandes.
        xs={3}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >

        <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>

        {children}

      </Grid>
    </Grid>
  );

