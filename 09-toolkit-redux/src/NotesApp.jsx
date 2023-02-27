import { useState } from 'react';
import { useGetNoteQuery, useGetNotesQuery } from './store/apis/notesApi';

export const NotesApp = () => {
  // Recordar agregar el reducer y el middleware de RTKQuery al Store,
  // de lo contrario el Hook mostrará un error (algo de que state.notes no se encuentra en el store).
  // const { data: notes = [], isLoading } = useGetNotesQuery();

  const [noteId, setNoteId] = useState(1);

  // Dentro del state, en notes -> queries, estarán todas las peticiones almacenadas en cache.
  // Se leerá de acá en vez de hacer la petición de nuevo (comprobar con las network devtools de Chrome).
  // Por defecto el tiempo de cache es 1 min, pero se puede cambiar (de hecho, después del minuto,
  // automaticamente se hace un dispatch que elimina el caché de esas peticiones: `notes/queries/removeQueryResult`).
  const { data: note, isLoading } = useGetNoteQuery(noteId);

  const nextNote = () => {
    setNoteId((id) => id + 1);
  };

  const prevNote = () => {
    if (noteId === 1) return;
    setNoteId((id) => id - 1);
  };

  return (
    <div>
      <h1>NotesApp - RTK Query</h1>
      <hr />
      <h4>
        isLoading:
        {' '}
        { isLoading ? 'True' : 'False' }
        {' '}
      </h4>
      <pre>{JSON.stringify(note)}</pre>
      {/* <ul>
        { notes.map((note) => (
          <li key={note.id}>
            <strong>
              { note.completed ? 'DONE: ' : 'Pending: ' }
            </strong>
            { note.title}
          </li>
        )) }
      </ul> */}

      <button type="button" onClick={prevNote}>
        Prev Todo
      </button>
      <button type="button" onClick={nextNote}>
        Next Todo
      </button>
    </div>
  );
};

