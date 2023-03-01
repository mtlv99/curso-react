import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
