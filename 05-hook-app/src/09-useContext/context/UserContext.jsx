import { createContext } from 'react';

// Este archivo es necesario para definir la estructura de este context.

// Se crea con extension .jsx porque es un HOC (higher order component).
// Por defecto seria undefined, pero se le puede pasar un objeto o 'null'.
// Devuelve un React.Context.
export const UserContext = createContext();
