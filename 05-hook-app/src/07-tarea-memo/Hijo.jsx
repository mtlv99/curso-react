import React from 'react';

// Se memoriza el hijo para evitar llamados innecesarios
export const Hijo = React.memo(({ numero, incrementar }) => {
  console.log('  Me volví a generar :(  ');

  return (
    <button
      className="btn btn-primary mr-3"
      onClick={() => incrementar(numero)}
      type="button"
    >
      { numero }
    </button>
  );
});
