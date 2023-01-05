import React, { useMemo, useState } from 'react';
import { useCounter } from '../hooks';


const heavyStuff = (iterationNumber = 100) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < iterationNumber; i++) {
    console.log('Ahí vamos...');
  }

  return `${iterationNumber} iteraciones realizadas`;
};


export const MemoHook = () => {
  const { counter, increment } = useCounter(5000);
  const [show, setShow] = useState(true);

  // Mismo caso que en React.memo(), pero en este caso en vez de memorizar un componente,
  // memoriza el retorno de una función.
  // Es similar al useEffect, tiene un arreglo de dependencias.
  // La funcion heavyStuff solo se vuelve a ejecutar cuando las dependencias cambian.
  const memorizedValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <>
      <h1>
        Counter:
        {' '}
        <small>{counter}</small>
      </h1>

      <hr />

      {/* Para probar sin memoization, llamar a la funcion directamente en vez del memorizedValue */}
      {/* <h4>{heavyStuff(5000)}</h4> */}
      <h4>{memorizedValue}</h4>

      <button type="button" className="btn btn-primary" onClick={() => increment()}>+1</button>

      <button type="button" className="btn btn-outline-primary" onClick={() => setShow(!show)}>
        Show/Hide:
        {' '}
        {JSON.stringify(show)}
      </button>


    </>
  );
};

