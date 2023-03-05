// Configuración para hacer puente entre variables de ambiente de Vite
// y de Node. Util para la parte de testing.

// Nota: las variables de Vite tienen que llevar el prefijo: VITE_
// Para poder ser retornadas al frontend (React). De lo contrario solo se quedarán
// del lado del servidor.
export const getEnvironments = () => {
  // eslint-disable-next-line no-unused-expressions
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
