import {
  useLayoutEffect, useRef, useState, useEffect,
} from 'react';

// Mismo Quote de 03-examples con algunas modificaciones.
export const QuoteModified = ({ author, quote }) => {
  const paragraphRef = useRef();
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });


  // Esto se entenderia mejor en un contexto donde el componente no se destruya cada vez que
  // cambia el quote. Por eso busqué otro ejemplo aparte. Ver LayoutComments.jsx
  useLayoutEffect(() => {
    const { height, width } = paragraphRef.current.getBoundingClientRect();
    setBoxSize({ height, width });
  // En teoria la dependencia acá nunca se va a ejecutar debido a que alterna
  // entre el componente de loading y este...
  }, [quote]);


  return (
    <>
      <blockquote className="blockquote text-end" style={{ display: 'flex' }}>
        <p ref={paragraphRef} className="mb-1">{quote}</p>
        <footer className="blockquote-footer">{author}</footer>
      </blockquote>
      <code>{JSON.stringify(boxSize)}</code>
    </>
  );
};
