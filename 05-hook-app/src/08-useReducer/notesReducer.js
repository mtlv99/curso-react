// eslint-disable-next-line default-param-last
export const notesReducer = (state = [], action) => {
  console.log('action', action);
  switch (action.type) {
    case '[NOTE] Add Note':
      return [...state, action.payload];

      // Nota: se debe tener un estandar sobre que valores usar en el reducer.
      // Estar pasando valores diferentes podria causar problemas o bugs en el futuro,
      // (Hay que ponerse de acuerdo si solo pasar el id, el objeto de la nota entero, etc...)
      // Acá se está pasando solo el id.
    case '[NOTE] Remove Note':
      // IMPORTANTE: se deben usar funciones que no MUTEN el state, deben retornar uno nuevo (como filter, map...).
      // Por lo contrario, un push, por ejemplo, SI muta el state.
      return state.filter((note) => note.id !== action.payload);

    case '[NOTE] Toggle Note':
      // El map no muta el state :)
      return state.map((note) => {
        if (note.id === action.payload) {
          // Si coincide con el id enviado, entonces hace un spread del note, y hace un toggle del booleano 'done'.
          return {
            ...note,
            done: !note.done,
          };
        }
        // Si no coincide en la iteración actual, simplemente devuelve el note sin tocar.
        return note;
      });

    default:
      return state;
  }
};
