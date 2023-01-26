import React from 'react';
import { NoteItem } from './NoteItem';

// Acá el onDeleteNote y onToggleNote solo se usa para pasarselo al NoteItem
// eslint-disable-next-line arrow-body-style
export const NoteList = ({ notes = [], onDeleteNote, onToggleNote }) => {
  // console.log('notes', notes);
  return (
    <ul
      className="list-group"
    >
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDeleteNote={onDeleteNote} onToggleNote={onToggleNote} />
      ))}
    </ul>
  );
};
