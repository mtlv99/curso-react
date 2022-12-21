import { useState } from 'react';

// export default function AddCategory({ setCategory }) {
export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const cleanValue = inputValue.trim();

    // el input debe tener al menos 2 caracteres para poder ser agregado al state.
    if (cleanValue.length <= 1) return;

    // Limpiar state del input luego de agregar el valor
    setInputValue('');

    // Emitir valor guardado al padre
    onNewCategory(cleanValue);
  };

  /*
  // Sin invertir la responsabilidad: el setState se hace acá.
  const onSubmit = (event) => {
    event.preventDefault();

    // el input debe tener al menos 2 caracteres para poder ser agregado al state.
    if (inputValue.trim().length <= 1) return;

    // NO es necesario pasar el state de 'category' por props! Solo usar el callback de setCategory.
    setCategory((categories) => [inputValue, ...categories]);

    // Limpiar state del input luego de agregar el valor
    setInputValue('');
  };
  */

  /*
    "What's the name of both of these techniques? (React hooks)"
    1. onChange={onInputChange} ---------------------> passing the handler function as a prop
    2. onChange={(event) => onInputChange(event)} ---> using an arrow function
    Nota: Se puede mejorar usando useCallback para que este memoized
  */
  return (
    <form onSubmit={onSubmit}>
      {/* Recordar que para los input se deben vincular tanto el value, como el onChange */}
      <input
        type="text"
        placeholder="Escribe algo interesante (café, galletas, navidad)..."
        value={inputValue}
        onChange={onInputChange}
        // Lo de arriba equivale a:
        // onChange={(event) => onInputChange(event)}
      />
    </form>
  );
};
