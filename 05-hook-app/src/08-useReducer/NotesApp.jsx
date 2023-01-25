import { useReducer } from 'react';
import { notesReducer } from './notesReducer';
import { NoteAdd } from './NoteAdd';
import { NoteList } from './NoteList';


const initialState = [
  {
    id: new Date().getTime(),
    description: 'Aprender Next.js',
    done: false,
  },
  {
    id: new Date().getTime() * 3,
    description: 'Aprender Three.js',
    done: false,
  },
];

// Nota: Fernando llamó originalmente `TodoApp` a este ejemplo en el curso,
// pero yo prefiero llamarlo NotesApp, por lo que también tuve que cambiar
// todo lo que fue nombrado con `todo` a `notes`.
export const NotesApp = () => {
  // Hay un tercer parametro opcional llamado init, usado para hacer calculos pesados.
  const [notes, dispatchNote] = useReducer(notesReducer, initialState);


  const onNewNote = (note) => {
    console.log('onNewNote', note);
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
          <NoteList notes={notes} />
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
