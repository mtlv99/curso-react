import React from 'react';

export const NoteItem = ({ note = {}, onDeleteNote, onToggleNote }) => {
  const { id, description, done } = note;

  // console.log('note', note);

  return (

    <li className="list-group-item d-flex justify-content-between">
      <span
        className={`align-self-center ${done ? 'text-decoration-line-through' : ''}`}
        onDoubleClick={() => onToggleNote(id)}
      >
        {description}
      </span>
      {/* No olvidar el callback al principio al llamar funciones en los botones! */}
      <button type="button" className="btn btn-danger" onClick={() => onDeleteNote(id)}>Borrar</button>
    </li>
  );
};
