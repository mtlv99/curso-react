import { useReducer, useEffect } from 'react';
import { notesReducer } from './notesReducer';
import { NoteAdd } from './NoteAdd';
import { NoteList } from './NoteList';


const initialState = [
  // Referencia:
  // {
  //   id: new Date().getTime(),
  //   description: 'Aprender Next.js',
  //   done: false,
  // },
];

// Lee las notas de localStorage. Si las notas no existen, el parsing fallará y
// regresará el arreglo vacio.
const initNotes = () => JSON.parse(localStorage.getItem('notes')) || [];

// Nota: Fernando llamó originalmente `TodoApp` a este ejemplo en el curso,
// pero yo prefiero llamarlo NotesApp, por lo que también tuve que cambiar
// todo lo que fue nombrado con `todo` a `notes`.
export const NotesApp = () => {
  // Hay un tercer parametro opcional llamado init, usado para hacer calculos pesados.
  const [notes, dispatchNote] = useReducer(notesReducer, initialState, initNotes);

  // Guarda en localStorage cada vez que se guarda una nota.
  // Tener cuidado cuando no se usa el init del useReducer, las notas estarían vacias,
  // y guardaría un arreglo vacío la primera vez que se renderiza el componente.
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const onNewNote = (note) => {
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

  return (
    <>
      <h1>
        NotesApp: 10,
        {' '}
        <small>pendientes: 2</small>
        {' '}
      </h1>
      <hr />
      <div className="row">
        <div className="col-7">
          {/* NoteList */}
          <NoteList notes={notes} onDeleteNote={handleDeleteNote} onToggleNote={handleToggleNote} />
        </div>
        <div className="col-5">
          <h4>Agregar Nota</h4>
          <hr />
          {/* NoteAdd */}
          <NoteAdd onNewNote={onNewNote} />
        </div>
      </div>

    </>
  );
};
