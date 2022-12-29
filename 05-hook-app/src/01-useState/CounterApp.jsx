import React, { useState } from 'react';


export const CounterApp = () => {
  // La gente de React recomienda que se tenga un useState por cada propiedad que se requiera
  const [counter, setCounter] = useState({
    counter1: 10,
    counter2: 20,
    counter3: 30,
  });

  const { counter1, counter2, counter3 } = counter;

  return (
    <>
      <h1>
        Counter 1:
        {counter1}
      </h1>
      <h1>
        Counter 2:
        {counter2}
      </h1>
      <h1>
        Counter 3:
        {counter3}
      </h1>

      <hr />
      {/* Hay que tener cuidado con los valores que se le pasen al setCounter,
      ya que afectarán a TODO el state (js permite mutar entre tipos... de objeto a numero por ejemplo.) */}
      <button type="button" className="btn btn-primary" onClick={() => setCounter({ ...counter, counter1: counter1 + 1 })}>+1</button>
    </>
  );
};
