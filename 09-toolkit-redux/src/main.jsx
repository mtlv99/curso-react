import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store';
import { PokemonApp } from './PokemonApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <PokemonApp />
    </Provider>
  </React.StrictMode>,
);
