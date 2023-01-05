import React, { useRef } from 'react';

export const FocusScreen = () => {
  const inputRef = useRef();

  const onClick = () => {
    // Funcionan parecido, pero es mejor usarlo por ref.
    // document.querySelector('input').select();
    // console.log(inputRef);
    // .focus() -> enfoca el input sin seleccionar el texto.
    // .select() -> enfoca el input y selecciona el texto.
    inputRef.current.select();
  };

  return (
    <>

      <h1>Focus Screen</h1>

      <hr />

      <input ref={inputRef} type="text" placeholder="Ingrese su nombre" className="form-control" />

      <button type="button" className="btn btn-primary mt-2" onClick={onClick}>Set Focus</button>

    </>
  );
};
