import React from 'react';

export const NoteItem = ({ note = {} }) => {
  const { id, description, done } = note;

  console.log('note', note);

  return (

    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">{description}</span>
      <button type="button" className="btn btn-danger">Borrar</button>
    </li>
  );
};
