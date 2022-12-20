import React from 'react';
import ReactDOM from 'react-dom/client';
import GifExpertApp from './GifExpertApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // React renderizará 2 veces los componentes cuando se usa el Strict Mode,
  // esto para asegurarse de que no existan loops y otras malas practicas que serán
  // detectadas en el momento.
  <React.StrictMode>
    <GifExpertApp />
  </React.StrictMode>,
);
