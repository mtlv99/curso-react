import { pokemonApi } from '../../../api/pokemonApi';
import { setPokemons, startLoadingPokemons } from './pokemonSlice';

// Los thunks nos permiten crear peticiones asincronas, que luego hacen un dispatch
// de otra accion cuando éstas terminan.
// eslint-disable-next-line arrow-body-style
export const getPokemons = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPokemons());

    // Realizar petición http: data-pokemons
    // Multiplicado por 10 para obtener el offset, 0 * 10 = 0, 1 * 10 = 1, 2 * 20 = 20, etc...
    // fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`);

    const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=${page * 10}`);
    dispatch(setPokemons({ pokemons: data.results, page: page + 1 }));
  };
};
