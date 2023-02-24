import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter';

export const store = configureStore({
  // Acá es donde se colocan todos los slice.
  reducer: { counter: counterSlice.reducer },
});
