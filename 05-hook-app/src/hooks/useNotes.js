import { useEffect, useReducer } from 'react';
import { notesReducer } from '../08-useReducer/notesReducer';

// const initialState = [
// Referencia:
// {
//   id: new Date().getTime(),
//   description: 'Aprender Next.js',
//   done: false,
// },
// ];

// Lee las notas de localStorage. Si las notas no existen, el parsing fallará y
// regresará el arreglo vacio.
const initNotes = () => JSON.parse(localStorage.getItem('notes')) || [];

export const useNotes = (initialState = []) => {
  // Hay un tercer parametro opcional llamado init, usado para hacer calculos pesados.
  const [notes, dispatchNote] = useReducer(notesReducer, initialState, initNotes);

  // Guarda en localStorage cada vez que se guarda una nota.
  // Tener cuidado cuando no se usa el init del useReducer, las notas estarían vacias,
  // y guardaría un arreglo vacío la primera vez que se renderiza el componente.
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleNewNote = (note) => {
    const action = {
      type: '[NOTE] Add Note',
      payload: note,
    };

    dispatchNote(action);
  };

  const handleDeleteNote = (id) => {
    const action = {
      type: '[NOTE] Remove Note',
      payload: id,
    };

    dispatchNote(action);
  };

  const handleToggleNote = (id) => {
    const action = {
      type: '[NOTE] Toggle Note',
      payload: id,
    };

    dispatchNote(action);
  };


  return {
    notes,
    totalNotes: notes.length,
    pendingNotes: notes.filter((note) => !note.done).length,
    handleDeleteNote,
    handleToggleNote,
    handleNewNote,
  };
};
