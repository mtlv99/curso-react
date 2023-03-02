import {
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    // Solo basta con este result
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    // Esto es de firebase, por si se ocupara después
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });

    const {
      displayName, email, photoURL, uid,
    } = result.user;

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
      errorCode,
    };
  }
};


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    // Al crear un usuario, Firebase automaticamente lo autentica, por lo que se puede
    // pasar directamente acá con el FirebaseAuth.currentUser.
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const signInWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

// Cierra sesión del usuario, sin importar el método de
// autenticación que usó.
// eslint-disable-next-line no-return-await
export const logoutFirebase = async () => await FirebaseAuth.signOut();
