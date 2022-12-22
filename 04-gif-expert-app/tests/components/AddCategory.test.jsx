import { fireEvent, render, screen } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

const inputValue = 'Cat';

describe('Pruebas en <AddCategory />', () => {
  test('Debe de cambiar el valor del textbox', () => {
    render(<AddCategory onNewCategory={() => {}} />);

    const input = screen.getByRole('textbox');

    // El primer param es la referencia del DOM,
    // el segundo param es un mock de un evento
    fireEvent.input(input, { target: { value: inputValue } });

    expect(input.value).toBe(inputValue);
  });

  test('Debe de llamar onNewCategory si el input tiene un valor', () => {
    const onNewCategory = jest.fn();

    render(<AddCategory onNewCategory={onNewCategory} />);

    const input = screen.getByRole('textbox');
    // Hay que agregar un aria-label al form para que sea encontrable
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: inputValue } });
    fireEvent.submit(form);
    // screen.debug();
    // El value debe limpiarse despues de haber hecho el submit
    expect(input.value).toBe('');

    expect(onNewCategory).toHaveBeenCalled();
    expect(onNewCategory).toHaveBeenCalledTimes(1);
    expect(onNewCategory).toHaveBeenCalledWith(inputValue);
  });

  test('NO debe de llamar onNewCategory si el input está vacío', () => {
    const onNewCategory = jest.fn();
    render(<AddCategory onNewCategory={onNewCategory} />);

    // Hay que agregar un aria-label al form para que sea encontrable
    const form = screen.getByRole('form');

    fireEvent.submit(form);

    // Misma forma de hacer lo mismo
    expect(onNewCategory).toHaveBeenCalledTimes(0);
    expect(onNewCategory).not.toHaveBeenCalled();
  });
});
