import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store';
import { PokemonApp } from './PokemonApp';
import { NotesApp } from './NotesApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="exampleApps">
        <App />
        <PokemonApp />
        <NotesApp />
      </div>
    </Provider>
  </React.StrictMode>,
);
