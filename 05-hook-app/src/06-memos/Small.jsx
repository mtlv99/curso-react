import React from 'react';

// Mismo componente, solo que uno tiene memo y otro no.
// Hacer click en el Show/Hide para forzar un rerender de Memorize.jsx
// La diferencia es que cuando el componente está memorizado,
// no se volverá a renderizar debido a que sus props no cambiaron.
// export const Small = ({ value }) => {
//   console.log('Me volví a dibujar :(');
//   return (
//     <small>{value}</small>
//   );
// };

// Otra nota, en proyectos de Vite es necesario importar React.
// En proyectos generados con CRA, la referencia a React se guarda de forma global.
// Aunque la forma mas comun de verlo en proyectos es así, con el React.memo()
export const Small = React.memo(({ value }) => {
  console.log('Me volví a dibujar :(');
  return (
    <small>{value}</small>
  );
});
