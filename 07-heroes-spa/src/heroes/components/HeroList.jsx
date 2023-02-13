import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers';

// Nota: asi se evita un dependency cycle, no lo importé del archivo de barril.
// Lo hice yo, no es parte del curso (no sé si es la mejor solución??)
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
  // Los heroes no cambian ni se insertan, por lo que no es necesario guardarlos en un state o reducer.
  // Esto se podria memorizar ya que el publisher no cambia. Si fuera un objeto muy grande,
  // se vería una mejora de velocidad notable en el rendering. Se aplicó para empezar a utilizar el memo más a menudo :)
  // La funcion se volvería a llamar cuando el publisher cambie.
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {heroes.map((hero) => <HeroCard key={hero.id} {...hero} />)}
    </div>
  );
};
