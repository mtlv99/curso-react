import { configureStore } from '@reduxjs/toolkit';
import { notesApi } from './apis/notesApi';
import { counterSlice } from './slices/counter';
import { pokemonSlice } from './slices/pokemon';

export const store = configureStore({
  // Acá es donde se colocan todos los slice.
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,

    // Los api's de RTKQuery deben ser computados a la hora de
    // incluirlos en el reducer. Sin embargo, solo basta con llamar
    // a los custom hooks para hacer el dispatch de la accion, y el resto de
    // cosas requeridas por Redux...
    [notesApi.reducerPath]: notesApi.reducer,
  },
  // Los middleware también son computados
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});
