// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// No es necesario usar todos las funcionalidades para este proyecto,
// por eso se importa la version lite de firestore.
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';

const env = getEnvironments();
console.log(env);

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCYtRrxp6PttWjqBa8t7RGNIpGlElSXwa0',
//   authDomain: 'curso-react-2e860.firebaseapp.com',
//   projectId: 'curso-react-2e860',
//   storageBucket: 'curso-react-2e860.appspot.com',
//   messagingSenderId: '600252053828',
//   appId: '1:600252053828:web:e5729d3c1de1c651907f11',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBKkIjJYwwfgSjOzfdqPLrM7XtUGOGptKQ',
  authDomain: 'curso-react-testing-c0052.firebaseapp.com',
  projectId: 'curso-react-testing-c0052',
  storageBucket: 'curso-react-testing-c0052.appspot.com',
  messagingSenderId: '582800799729',
  appId: '1:582800799729:web:a8a0e8909d327de2203650',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
