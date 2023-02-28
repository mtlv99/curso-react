/* eslint-disable arrow-body-style */
import { checkingCredentials } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(checkingCredentials());
  };
};
