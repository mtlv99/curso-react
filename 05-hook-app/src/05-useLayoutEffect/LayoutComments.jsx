import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

/*
  Ejemplo sacado de los comentarios:
  https://www.udemy.com/course/react-cero-experto/learn/lecture/19829382#questions/11393872
  El useEffect se ejecuta de manera asincrona; no bloquea el flujo de JS.
  El useLayoutEffect se ejecuta de manera sincrona; BLOQUEA el flujo de JS hasta terminar el renderizado
  (por lo que se recomienda no usarlo en calculos muy pesados).

  Podría usarse cuando se nota que la actualización parpadea visualmente,
  o cuando se quiere agrupar varias actualizaciones en una (aunque me parece que React 18 ya ayuda con esto...).
*/

const defaultValue = '__________________Solo me logras leer si usas useEffect!!';

export const LayoutComments = () => {
  const [value, setValue] = useState(defaultValue);

  // Para ver la diferencia, alternar entre useEffect y useLayoutEffect
  // tldr: el useEffect NO espera a que terminen todos los setState, por lo que se puede ver
  // el valor inicial de 'defaultValue', al hacerle click encima.
  useLayoutEffect(() => {
    if (value === defaultValue) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  console.log('render', value);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div onClick={() => setValue(defaultValue)}>
      value:
      {' '}
      {value}
    </div>
  );
};

