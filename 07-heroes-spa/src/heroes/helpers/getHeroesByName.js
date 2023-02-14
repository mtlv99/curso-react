import { heroes } from '../data/heroes';

export const getHeroesByName = (query = '') => {
  const name = query.toLocaleLowerCase().trim();

  if (name.length === 0) return [];

  return heroes.filter((hero) => hero.superhero.toLocaleLowerCase().includes(name));
};
