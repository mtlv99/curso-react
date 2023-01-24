
import { useCallback, useEffect, useState } from 'react';
import { ShowIncrement } from './ShowIncrement';

export const CallbackHook = () => {
  const [counter, setCounter] = useState(10);

  // UseCallback:
  // El useCallback es usado para memorizar funciones (en realidad, la posición de memoria de esa función).
  // Recordar que Javascript guarda la posición en memoria para objetos y funciones, a diferencia de otros primitivos.
  // Por lo que usar un Memo acá no funcionará, debido a que la posición de memoria de incrementFather va a estar cambiando
  // con cada render, debido a que se vuelve a crear. Por eso es necesario mantener la posición en memoria.
  // A diferencia del useMemo, useCallback memoriza la posición en memoria, mientras que useMemo memoriza el valor de retorno.
  // [Recordar el ejemplo usado en useMemo: `heavyStuff()` . Acá se está memorizando el retorno porque es una función muy pesada
  // y no tiene sentido volver a ser calculada; esa es la principal diferencia con el useCallback.]

  // NO usar el callback así: () => { setCounter(counter + 1); }
  // Debido a que el useCallback también memoriza el argumento, por lo que será 10 + 1 para siempre. Se debe pasar el
  // valor del counter por callback.

  // Nota: en versiones anteriores de React era necesario pasar el setCounter como una depencencia en el array,
  // pero ahora ya no es necesario.

  // Ejemplo sin parametros:
  // const incrementFather = useCallback(() => { setCounter((value) => value + 1); }, []);

  // Ejemplo con parametros:
  // Este valor viene de los argumentos pasados en ShowIncrement.jsx
  const incrementFather = useCallback((incrementArgument) => { setCounter((currentValue) => currentValue + incrementArgument); }, []);

  //   const incrementFather = () => {
  //     setCounter(counter + 1);
  //   }


  // También es usado para evitar renders infinitos cuando se ocupa que se ejecute un effect después de que la misma funcion cambie.
  // TODO: No entendí muy bien este use case en particular...
  useEffect(() => {
    // incrementFather();
  }, [incrementFather]);


  return (
    <>
      <h1>
        useCallback Hook:
        {' '}
        {counter}
      </h1>
      <hr />

      <ShowIncrement increment={incrementFather} />
    </>
  );
};
