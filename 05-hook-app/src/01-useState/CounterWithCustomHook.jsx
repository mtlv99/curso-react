import React from 'react';
import { useCounter } from '../hooks/useCounter';

export const CounterWithCustomHook = () => {
  // La destructuración depende de la forma en que se hace el return en el custom Hook.
  // Si devuelve un objeto, se hace con {}, si es un array se hace con [].
  const {
    counter, increment, decrement, reset,
  } = useCounter(15);

  return (
    <>
      <h1>
        Counter with Hook:
        {counter}
      </h1>

      <hr />

      <button type="button" onClick={() => increment(4)} className="btn btn-primary">+1</button>
      <button type="button" onClick={() => reset} className="btn btn-primary">Reset</button>
      <button type="button" onClick={() => decrement(2)} className="btn btn-primary">-1</button>
    </>
  );
};
