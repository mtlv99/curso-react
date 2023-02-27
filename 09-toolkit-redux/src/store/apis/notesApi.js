import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTKQuery genera un Api similar a los de axios.
// Permite mantener las respuestas en cache, entre otras cosas muy utiles.
export const notesApi = createApi({

  reducerPath: 'notes',
  // Acá se podrian poner custom headers, entre otras cosas.
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/todos',
    }),
    getNote: builder.query({
      query: (noteId) => `/todos/${noteId}`,
    }),
  }),

});

// Con la diferencia de que en los export se generan customHooks automaticamente
// para poder hacer dispatch de las acciones, wow!!
// el nombre viene de los endpoints que se agregan en el parametro de endpoints.
// Si tienen un nombre diferente al usado acá, saldrá un error.
export const { useGetNotesQuery, useGetNoteQuery } = notesApi;
