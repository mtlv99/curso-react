import { render, screen } from '@testing-library/react';
import { useNotes } from '../../src/hooks/useNotes';
import { NotesApp } from '../../src/08-useReducer/NotesApp';

jest.mock('../../src/hooks/useNotes');

describe('Pruebas en <NotesApp />', () => {
  useNotes.mockReturnValue({
    notes: [
      { id: 1, description: 'Nota #1', done: false },
      { id: 2, description: 'Nota #2', done: true },
    ],
    notesCount: 2,
    pendingNotesCount: 1,
    handleDeleteNote: jest.fn(),
    handleToggleNote: jest.fn(),
    handleNewNote: jest.fn(),
  });
  test('debe de mostrar el componente correctamente', () => {
    render(<NotesApp />);
    screen.debug();
    expect(screen.getByText('Nota #1')).toBeTruthy();
    expect(screen.getByText('Nota #2')).toBeTruthy();

    // Este textbox es el input del description de la nota, para agregar una nueva.
    // se puede hacer un console.log() de `screen.getByRole('textbox')).className`
    // para identificar el elemento, o un `.innerHTML`.
    expect(screen.getByRole('textbox')).toBeTruthy();
  });
});

