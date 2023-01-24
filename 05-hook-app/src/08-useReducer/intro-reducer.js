// Demo de un reducer, sin librerias.

const initialState = [{
  id: 1,
  note: 'Terminar curso de React',
  done: false,
}];

// Un reducer no es mas que una funcion normal, pero es una funcion Pura.
// No olvidar el defaultValue para los action, ya que se leeria un objeto en undefined y tira error.
// eslint-disable-next-line default-param-last
const notesReducer = (state = initialState, action = {}) => {
  if (action.type === '[NOTE] add note') {
    return [...state, action.payload];
  }

  // Si la funcion no conoce el action que viene, simplemente lo ignora.
  return state;
};

let notes = notesReducer();

// Nuevo item a agregar
const newNote = {
  id: 2,
  note: 'Terminar curso de React Avanzado',
  done: false,
};

const addNoteAction = {
  type: '[NOTE] add note',
  payload: newNote,
};

notes = notesReducer(notes, addNoteAction);

console.log({ state: notes });
