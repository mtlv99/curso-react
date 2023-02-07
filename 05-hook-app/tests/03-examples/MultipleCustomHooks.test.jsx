import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks';

// Nota: CUIDADO con los import acá! Hacer solo mock del useFetch especificamente
// (sin usar el archivo de barril, porque si no haría un mock de todos los import!!)
import { useFetch } from '../../src/hooks/useFetch';
import { useCounter } from '../../src/hooks/useCounter';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {
  // Referencia para todos los test
  const mockIncrement = jest.fn();
  useCounter.mockReturnValue({ counter: 1, increment: mockIncrement });


  // beforeEach se ejecuta antes de CADA TEST.
  // beforeAll se ejecuta antes de correr la lista de tests.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de mostrar el componente por defecto', () => {
    // Se obvia hacer snapshot para no repetir material en el curso

    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    expect(screen.getByText('Loading...'));
    expect(screen.getByText('Breaking Bad Quotes'));

    const nextButton = screen.getByRole('button', { name: 'Next Quote' });

    // el boton debe de estar deshabilitado
    expect(nextButton.disabled).toBeTruthy();

    // screen.debug();
  });

  test('debe mostrar un Quote', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Fernando', quote: 'Hola Mundo' }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);
    expect(screen.getByText('Hola Mundo')).toBeTruthy();
    expect(screen.getByText('Fernando')).toBeTruthy();

    const nextButton = screen.getByRole('button', { name: 'Next Quote' });

    // el boton debe de estar habilitado
    expect(nextButton.disabled).toBeFalsy();
  });

  test('debe de llamar la función de incrementar', () => {
    useFetch.mockReturnValue({
      data: [{ author: 'Fernando', quote: 'Hola Mundo' }],
      isLoading: false,
      hasError: null,
    });

    render(<MultipleCustomHooks />);

    const nextButton = screen.getByRole('button', { name: 'Next Quote' });

    fireEvent.click(nextButton);

    expect(useCounter).toHaveBeenCalled();
  });
});
