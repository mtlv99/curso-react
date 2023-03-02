import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('El UID del usuario no existe');

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];

  // Para obtener la data dentro del collection, hay que llamar a la funcion doc.data()
  // Luego se hace un spread para que la data quede junto al id.
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
