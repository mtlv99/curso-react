import React from 'react';
import { useForm } from '../hooks/useForm';

export const NoteAdd = ({ onNewNote }) => {
  const { note, onReset, onInputChange } = useForm({ note: '' });

  const onHandleSubmit = (event) => {
    event.preventDefault();

    if (note.length < 2) return;

    const newNote = {
      id: new Date().getTime(),
      description: note,
      done: false,
    };

    onNewNote(newNote);
    onReset();
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <input
        type="text"
        placeholder="¿Qué hay que hacer?"
        className="form-control"
        name="note"
        value={note}
        onChange={onInputChange}
      />
      <button
        type="submit"
        className="btn btn-outline-primary mt-1"
      >
        Agregar
      </button>
    </form>
  );
};
