/* eslint-disable arrow-body-style */
import { signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(checkingCredentials());

    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    return dispatch(login(result));
  };
};
