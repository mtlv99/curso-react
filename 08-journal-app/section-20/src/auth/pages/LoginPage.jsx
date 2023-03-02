import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert, Button, Grid, Link, TextField, Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { startEmailSignIn, startGoogleSignIn } from '../../store/auth';


const formData = {
  email: 'marco@example.com',
  password: '123456',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
};


export const LoginPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  // Cuidado con el valor por defecto de useForm! Luego de agregar el useEffect al useForm
  // que detecta cambios en el state inicial, si se pasa un objeto directamente
  // como atributo, cada vez que se rerenderiza el componente, estaría creando un
  // nuevo objeto con una nueva posición en memoria, por lo que estaría creando
  // ciclo/cycle infinito de rerenders!
  const {
    email, password, onInputChange, emailValid, passwordValid, isFormValid,
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false);


  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    // No olvidar llamar la función en vez de solo pasarla!
    const result = dispatch(startEmailSignIn({ email, password }));
  };

  const onGoogleSignIn = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="marco@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              // Leer comentario de RegisterPage.jsx
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              // Leer comentario de RegisterPage.jsx
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            {/* eslint-disable-next-line no-extra-boolean-cast */}
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
