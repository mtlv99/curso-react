import React from 'react';
import { NoteItem } from './NoteItem';

export const NoteList = ({ notes = [] }) => {
  console.log('notes', notes);
  return (
    <ul
      className="list-group"
    >
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
};
