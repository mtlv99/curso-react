/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// Slices: nos permiten crear partials/secciones pequeñas de un reducer,
// y el Toolkit las unifica por nosotros.
export const counterSlice = createSlice({
  // Este es el nombre del reducer. También aparecerá en las Redux Devtools.
  name: 'counter',
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    // los argumentos vienen igual que siempre, por el action, y se obtiene de esta manera.
    incrementBy: (state, action) => {
      state.counter += action.payload;
    },
  },
});

// También los pasa por un Action Creator
// Action creators are generated for each case reducer function
export const { increment, decrement, incrementBy } = counterSlice.actions;
