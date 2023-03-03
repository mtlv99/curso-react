/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedNoteLabel: '',
    notes: [],
    activeNote: null,
    // activeNote: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
      state.savedNoteLabel = '';
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedNoteLabel = '';
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        // Encuentra la nota a actualizar
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.savedNoteLabel = `"${action.payload.title}" actualizado correctamente.`;
    },
    setPhotosToActiveNote: (state, action) => {
      // Mantiene las imagenes anteriores y agrega unas nuevas.
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.savedNoteLabel = '';
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});


// Action creators are generated for each case reducer function
export const {
  increment,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  savingNewNote,
  setSaving,
  setPhotosToActiveNote,
  updateNote,
  clearNotesLogout,
  deleteNoteById,
} = journalSlice.actions;
