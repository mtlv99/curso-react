import React, { useState, useCallback } from 'react';
import { Hijo } from './Hijo';

export const Padre = () => {
  const numeros = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  /*
  Comentario de resolución de tarea:
  El problema principal está acá, está función se recrea con cada rerender,
  por lo que necesita ser memorizada.
  Acá ya fue aplicada la solución.
  */
  // No olvidar el array de dependencias! De lo contrario no se va a memorizar.
  // Nota: en versiones anteriores de React era necesario pasar el setValor como una depencencia en el array,
  // pero ahora ya no es necesario.
  const incrementar = useCallback((numero) => setValor((currentValue) => currentValue + numero), []);

  return (
    <div>
      <h1>Padre</h1>
      <p>
        {' '}
        Total:
        {' '}
        { valor }
        {' '}
      </p>

      <hr />

      {
                numeros.map((n) => (
                  <Hijo
                    key={n}
                    numero={n}
                    incrementar={incrementar}
                  />
                ))
            }
      {/* <Hijo /> */}
    </div>
  );
};
