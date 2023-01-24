import { useReducer } from 'react';
import { notesReducer } from './notesReducer';


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

  return (
    <>
      <h1>NotesApp con useReducer</h1>
      <hr />
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>

    </>
  );
};
