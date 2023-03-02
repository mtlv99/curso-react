/* eslint-disable arrow-body-style */
import {
  signInWithGoogle, registerUserWithEmailPassword, signInWithEmailPassword, logoutFirebase,
} from '../../firebase/providers';
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

    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    return dispatch(login(result));
  };
};

export const startEmailSignIn = ({ email, password }) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // No olvidar llamar la función en vez de solo pasarla!
    dispatch(checkingCredentials());

    const result = await signInWithEmailPassword({ email, password });
    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    return dispatch(login(result));
  };
};


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const {
      ok, uid, photoURL, errorMessage,
    } = await registerUserWithEmailPassword({ email, password, displayName });

    if (!ok) return dispatch(logout({ errorMessage }));

    return dispatch(login({
      uid, displayName, email, photoURL,
    }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
  };
};
