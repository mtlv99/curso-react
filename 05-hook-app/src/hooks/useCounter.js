import React, { useState } from 'react';

export const useCounter = (initialValue = 10) => {
  // Lo que hace a un custom Hook, un custom Hook es:
  // Es un estandar que el nombre del archivo empiece por "use", en este caso "useCounter",
  // Es una funcion normal, pero la diferencia es que en algun lugar se utiliza un Hook propio de React
  // (en este caso es el useState).
  const [counter, setCounter] = useState(initialValue);


  // Hay que tener cuidado a la hora de enviar los eventos o parametros,
  // ya que si se pasa la funcion directamente: e.g. onClick={increment}:
  // [ Esto equivale a: onClick={(event) => increment(event)} ]
  // Si se hace de la forma anterior, se estaria pasando el evento del onClick en vez del parametro del value,
  // por lo que en el state se estaria guardando un 10[Object object], en vez del value. (Hace concatenación)
  // Forma correcta: onClick={() => increment(4)} (donde 4 es el numero que se va a incrementar)
  const increment = (value = 1) => {
    // Se paso a callback para que el testing quede mas limpio. Antes estaba como (counter + value).
    setCounter((currentCounter) => currentCounter + value);
  };
  const decrement = (value = 1) => {
    // if (counter === 0) return;
    setCounter((currentCounter) => currentCounter - value);
  };
  const reset = (value = 1) => {
    setCounter(initialValue);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
};
