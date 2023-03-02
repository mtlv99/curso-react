import { CircularProgress, Grid } from '@mui/material';

// Loader que se muestra mientras comprueba autenticación.
export const CheckingAuth = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
  >
    <Grid
      container
      direction="row"
      justifyContent="center"
    >
      <CircularProgress color="warning" />
    </Grid>
  </Grid>
);
