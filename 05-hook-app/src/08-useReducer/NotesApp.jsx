/* eslint-disable react/jsx-one-expression-per-line */
import { useNotes } from '../hooks';
import { NoteAdd } from './NoteAdd';
import { NoteList } from './NoteList';

// Nota: Fernando llamó originalmente `TodoApp` a este ejemplo en el curso,
// pero yo prefiero llamarlo NotesApp, por lo que también tuve que cambiar
// todo lo que fue nombrado con `todo` a `notes`.
export const NotesApp = () => {
  // Inicialmente toda esa logica estaba acá, pero fue movida a un custom Hook nuevo llamado useNotes.
  // Se ve muy limpio el componente así!
  const {
    notes, handleDeleteNote, handleToggleNote, handleNewNote, totalNotes, pendingNotes,
  } = useNotes([]);

  return (
    <>
      <h1>
        NotesApp: {totalNotes}, <small>pendientes: {pendingNotes}</small>
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
          <NoteAdd onNewNote={handleNewNote} />
        </div>
      </div>

    </>
  );
};
