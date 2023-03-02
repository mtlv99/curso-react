import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote, savingNewNote, setActiveNote, setNotes, updateNote,
} from '.';
import { loadNotes } from '../../helpers/loadNotes';

// eslint-disable-next-line arrow-body-style
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    // Setea el id generado por firebase a la nueva nota.
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  if (!uid) throw new Error('El UID del usuario no existe');
  const notes = await loadNotes(uid);

  dispatch(setNotes(notes));
};

export const startSavingNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const { activeNote } = getState().journal;

  const noteToFireStore = { ...activeNote };

  // Aca se borra el id del objeto, porque se debe mandar dentro del body,
  // solo en el path para encontrar el documento.
  // Originalmente Firebase manda la info del id, y del body por separado.
  // En el app se juntaron para hacer el desarrollo más fácil.
  delete noteToFireStore.id;

  const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
  await setDoc(docRef, noteToFireStore, { merge: true });

  dispatch(updateNote(activeNote));
};
