import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HooksApp } from './HooksApp';
import './index.css';

// Ejecuta reducer de ejemplo
// import './08-useReducer/intro-reducer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <HooksApp />
    </React.StrictMode>
  </BrowserRouter>,
);
