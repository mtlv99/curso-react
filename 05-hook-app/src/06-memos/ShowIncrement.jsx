import React from 'react';

// Se debe usar el useCallback junto con un memo para evitar renders innecesarios por completo.
export const ShowIncrement = React.memo(({ increment }) => {
  console.log('Me volví a generar :(');

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => { increment(5); }}
    >
      Incrementar
    </button>
  );
});
