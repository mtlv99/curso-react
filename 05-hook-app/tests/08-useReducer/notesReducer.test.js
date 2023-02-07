import { notesReducer } from '../../src/08-useReducer/notesReducer';

describe('Pruebas en notesReducer', () => {
  const initialState = [{
    id: 1,
    description: 'Demo Todo',
    done: false,
  }];


  test('debe de regresar el estado inicial', () => {
    // Se pasa un objeto vacio para que se ejecute el default del switch.
    const newState = notesReducer(initialState, {});

    // Acá está bien usar toBe para comparar objetos, porque el reducer devuelve la misma posición
    // en memoria de la variable, no la está mutando ni creando otra nueva.
    expect(newState).toBe(initialState);
  });

  test('debe de regresar una nota', () => {
    const action = {
      type: '[NOTE] Add Note',
      payload: {
        id: 2,
        description: 'Nueva Nota #2',
        done: false,
      },
    };

    const newState = notesReducer(initialState, action);
    expect(newState.length).toBe(2);

    // Compara el contenido de las variables en vez de comparar las posiciones en memoria.
    expect(newState).toContain(action.payload);
  });

  test('debe de eliminar una nota', () => {
    const action = {
      type: '[NOTE] Remove Note',
      payload: 1,
    };

    const newState = notesReducer(initialState, action);
    expect(newState.length).toBe(0);
  });


  test('debe de realizar el toggle de la nota', () => {
    const action = {
      type: '[NOTE] Toggle Note',
      payload: 1,
    };

    // false to true
    const newState = notesReducer(initialState, action);
    expect(newState[0].done).toBe(true);

    // true to false
    const newState2 = notesReducer(newState, action);
    expect(newState2[0].done).toBe(false);
  });
});
