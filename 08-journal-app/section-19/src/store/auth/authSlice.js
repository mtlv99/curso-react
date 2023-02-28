import { createSlice } from '@reduxjs/toolkit';

// Deshabilitar esta regla de eslint para slices y reducers.
/* eslint-disable no-param-reassign */

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uuid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },

  reducers: {
    login: (state, action) => {

    },
    logout: (state, payload) => {

    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },

  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
