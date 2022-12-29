import React, { useEffect, useState } from 'react';


export const Message = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    // console.log('Message Mounted');
    const onMouseMove = ({ x, y }) => {
    //   console.log(':)');
      setCoords({ x, y });
    };

    // Hay que tener mucho cuidado con los listeners, observables, peticiones asincronas, etc...
    // Facilmente se pueden crear memory leaks si no se remueven adecuadamente.
    // En versiones anteriores de React (17 para abajo) esto tiraba la aplicacion o tiraba un error
    // Sin embargo en React 18 esto ya no muestra errores. Sin embargo, hay que tener precaucion con ello.
    // Por ejemplo, descomentar el console.log del onMouseMove, comentar el removeEventListener,
    // y montar repetitivamente el SimpleForm (borrando y escribiendo 'marco' varias veces) para replicar un memory leak.
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      // Para quitar eventos, se pasa la referencia en memoria a la funcion
      // NO se debe pasar otra instancia o declaracion de la funcion.
      window.removeEventListener('mousemove', onMouseMove);
    //   console.log('Message unmounted');
    };
  }, []);

  return (
    <h3>{JSON.stringify(coords)}</h3>
  );
};
