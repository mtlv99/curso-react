import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable camelcase */
// eslint-disable-next-line arrow-body-style
const CharactersByHero = ({ characters, alter_ego }) => {
  // Si el personaje no tiene más alter egos, entonces no debe renderizar nada adicional.
  // No se si existe alguna forma mejor de renderizar algo vacío, o más bien no renderizar nada.
  // Talvez un `null`, pero idk.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (characters === alter_ego) ? <></> : <p>{characters}</p>;
};

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  return (
    <div className="col">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} alt={superhero} className="card-img" />
          </div>

          <div className="col-8">
            <div className="card-body">

              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {/* {
              (alter_ego !== characters) && (<p>{characters}</p>)
              } */}
              {/* Se creó un componente pequeño dentro del mismo archivo para hacer más legible la logica de arriba */}
              <CharactersByHero characters={characters} alter_ego={alter_ego} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>Leer más...</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
