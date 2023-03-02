/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    savedMessage: '',
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
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      // TODO: mensaje de error
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
    },
    deleteNodeById: (state, action) => {

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
  //   setSaving,
  updateNote,
  deleteNodeById,
} = journalSlice.actions;
