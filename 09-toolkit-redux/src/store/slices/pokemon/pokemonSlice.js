/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    page: 0,
    pokemons: [],
    isLoading: false,
  },
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true;
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload.pokemons;
      state.page = action.payload.page;
      state.isLoading = false;
    },
  },
});


// Action creators are generated for each case reducer function
export const { increment, startLoadingPokemons, setPokemons } = pokemonSlice.actions;
