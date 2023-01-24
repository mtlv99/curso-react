// eslint-disable-next-line default-param-last
export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ABC':
      throw new Error('Not defined');

    default:
      return state;
  }
};
