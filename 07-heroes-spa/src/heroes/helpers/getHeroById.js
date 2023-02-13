import { heroes } from '../data/heroes';

// Si no encuentra un hero, devuelve undefined.
export const getHeroById = (id) => heroes.find((hero) => hero.id === id);
