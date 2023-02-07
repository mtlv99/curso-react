import { fireEvent, render, screen } from '@testing-library/react';
import { NoteItem } from '../../src/08-useReducer/NoteItem';

describe('Pruebas en <NoteItem />', () => {
  const note = {
    id: 1,
    description: 'Piedra del Alma',
    done: false,
  };
  const onDeleteNoteMock = jest.fn();
  const onToggleNoteMock = jest.fn();

  // Para que deje los mock de las funciones en su forma pristina (sin haber sido llamadas)
  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar la nota pendiente de completar', () => {
    render(
      <NoteItem
        note={note}
        onToggleNote={onToggleNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />,
    );

    const liElement = screen.getByRole('listitem');
    expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

    // Por alguna razón, los span no los encuentra por role, asi que añadió un aria-label en el jsx original.
    const spanElement = screen.getByLabelText('span');

    // Se puede usar .toBe(), pero hay que tener cuidado con el espacio del css condicional.
    expect(spanElement.className).toContain('align-self-center');

    // Acá se evalua que no contenga ese css condicional
    expect(spanElement.className).not.toContain('text-decoration-line-through');

    // screen.debug();
  });

  test('debe de mostrar la nota completada', () => {
    // Acá se está mutando el objeto, cuidado!!!
    // No me gusta este approach, puede tener algunos side effects, pero ya luego
    // se empezarán a usar fixtures.
    // Nota: esta mutación afectará al resto de tests de aquí en adelante!!
    note.done = true;

    render(
      <NoteItem
        note={note}
        onToggleNote={onToggleNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />,
    );

    const spanElement = screen.getByLabelText('span');
    expect(spanElement.className).toContain('text-decoration-line-through');
  });

  test('debe de llamar el toggleNote cuando se hace click', () => {
    render(
      <NoteItem
        note={note}
        onToggleNote={onToggleNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />,
    );

    // Por alguna razón, el getByRole no funciona con los span. Se agregó un aria-label en el jsx original.
    const spanElement = screen.getByLabelText('span');
    fireEvent.doubleClick(spanElement);

    expect(onToggleNoteMock).toHaveBeenCalledWith(note.id);
  });

  test('debe de llamar el deleteNote cuando se hace click', () => {
    render(
      <NoteItem
        note={note}
        onToggleNote={onToggleNoteMock}
        onDeleteNote={onDeleteNoteMock}
      />,
    );

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(onDeleteNoteMock).toHaveBeenCalledWith(note.id);
  });
});
