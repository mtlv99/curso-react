/* eslint-disable react/jsx-one-expression-per-line */
import { useDispatch, useSelector } from 'react-redux';
import reactLogo from './assets/react.svg';
import './App.css';
import { increment, decrement, incrementBy } from './store/slices/counter';

const margin = { marginLeft: '5px', marginRight: '5px' };

const App = () => {
  // De esta manera se leen cosas del state.
  const { counter } = useSelector((state) => state.counter);

  // El dispatcher se obtiene de esta manera, no hay que usar combiners
  // a la hora de exportar los componentes (omg!!!).
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Count is {counter}</p>
        <button style={margin} type="button" onClick={() => dispatch(increment())}>Increment</button>
        <button style={margin} type="button" onClick={() => dispatch(decrement())}>Decrement</button>
        <button style={margin} type="button" onClick={() => dispatch(incrementBy(2))}>Increment By 2</button>
      </div>
    </div>
  );
};

export default App;
