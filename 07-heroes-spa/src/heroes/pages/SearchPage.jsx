/* eslint-disable react/jsx-one-expression-per-line, react/jsx-props-no-spreading */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { HeroCard } from '../components';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();

  // El useLocation nos permite extraer datos que pertenecen a la ruta actual.
  // (Incluidos los query params).
  const location = useLocation();

  // También existe un API nativa llamada `URLSearchParams` para este mismo trabajo.
  // Pero para propositos del curso se utilizó este package.
  const { q = '' } = queryString.parse(location.search);
  const heroesFound = getHeroesByName(q);

  // Si no hay terminos a buscar
  const showSearch = (q.length === 0);
  // Si no se encontraron resultados
  const showError = (q.length > 0) && heroesFound.length === 0;

  // Se pasa el queryParam `q` al useForm para que se guarde en el form; incluso después de recargar la página.
  const { searchText, onInputChange } = useForm({ searchText: q });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // Se quitó esta condicion para poder reestablecer el valor inicial al darle enter con un input vacio
    // if (searchText.trim().length <= 1) return;

    // Acá no hay que pasar un slash en el valor para poder mantenerse en el mismo lugar del stack de rutas.
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Looking for a hero?</h4>

          <hr />

          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero..."
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero...
          </div>

          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No results found for <b>{q}</b>.
          </div>

          {heroesFound.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}

        </div>
      </div>
    </>
  );
};
