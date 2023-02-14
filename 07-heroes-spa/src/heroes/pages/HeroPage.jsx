import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';

/* eslint-disable react/jsx-one-expression-per-line */
export const HeroPage = () => {
  // Al igual que el navigate, los parametros ahora se obtienen por medio de un custom hook
  // en versiones nuevas de React y React Router DOM.
  // Con esto se consiguen los segmentos de la URL (los query parameters se consiguen de otra manera).
  // IMPORTANTE: en los parameters podemos poner cualquier cosa en el <Route /> definido.
  // Este id no es ningun nombre especial de la libreria, solo se le puso así en el curso.
  const { id } = useParams();
  const navigate = useNavigate();

  // Esto se podria memorizar ya que el id no cambia.
  // La funcion se volvería a llamar cuando el id cambie.
  const hero = useMemo(() => getHeroById(id), [id]);

  const onNavigateBack = () => {
    // Esto retrocede un valor en el stack de navigacion, pero podria sacar al usuario de la pagina.
    // Works for now.
    navigate(-1);
  };

  // Si no existe el id del hero, se devuelve al root del app.
  // (en este punto se podría poner un error 404 o similares).
  if (!hero) return <Navigate to="/" />;


  return (
    <div className="row mt-5">

      <div className="col-4 animate__animated animate__slideInLeft animate__fast">
        <img src={`/assets/heroes/${id}.jpg`} alt={hero.superhero} className="img-thumbnail" />
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego} </li>
          <li className="list-group-item"><b>Publisher:</b> {hero.publisher} </li>
          <li className="list-group-item"><b>First appearance:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button type="button" className="btn btn-primary" onClick={onNavigateBack}>Regresar</button>
      </div>


    </div>
  );
};
