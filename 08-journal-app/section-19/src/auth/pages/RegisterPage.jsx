import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Button, Grid, Link, TextField, Typography,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
  displayName: 'Marco Leon',
  email: 'marco@example.com',
  password: '123456',
};

// La funcion que evalua acá, puede ser tan compleja como se desee (siempre que regrese un boolean).
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Registro">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              // Acá se usa double negative debido a que en el mismo property viene
              // el mensaje de error
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="marco@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              // Acá se usa double negative debido a que en el mismo property viene
              // el mensaje de error
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
              // Acá se usa double negative debido a que en el mismo property viene
              // el mensaje de error
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

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ¿Ya tienes cuenta?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
