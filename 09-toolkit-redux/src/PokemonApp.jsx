import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from './store/slices/pokemon';

export const PokemonApp = () => {
  const dispatch = useDispatch();


  const { pokemons = [], isLoading, page } = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div>
      <h1>PokemonApp</h1>
      <hr />

      <span>{isLoading ? 'Cargando...' : 'Listo!'}</span>

      <ul style={{ textAlign: 'left' }}>
        {pokemons.map((pokemon) => <li key={pokemon.name}>{pokemon.name}</li>)}
      </ul>

      <button
        type="button"
        disabled={isLoading}
        onClick={() => dispatch(getPokemons(page))}
      >
        Next
      </button>
    </div>
  );
};
