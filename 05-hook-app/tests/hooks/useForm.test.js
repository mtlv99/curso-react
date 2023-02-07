import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../src/hooks';

describe('Pruebas en el useForm', () => {
  const initialForm = {
    name: 'Marco',
    email: 'marco@example.com',
  };

  test('debe de regresar los valores por defecto', () => {
    const { result } = renderHook(() => useForm(initialForm));
    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onReset: expect.any(Function),
    });
  });

  test('debe de cambiar el nombre del formulario', () => {
    const newValue = 'León';
    const eventMock = {
      target: {
        name: 'name',
        value: newValue,
      },
    };

    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    act(() => {
      onInputChange(eventMock);
    });

    expect(result.current.name).toBe(newValue);
    expect(result.current.formState.name).toBe(newValue);
  });

  test('debe de resetear el form', () => {
    const newValue = 'León';
    const eventMock = {
      target: {
        name: 'name',
        value: newValue,
      },
    };

    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onReset } = result.current;

    act(() => {
      onInputChange(eventMock);
      onReset();
    });

    expect(result.current.name).toBe(initialForm.name);
    expect(result.current.formState.name).toBe(initialForm.name);
  });
});
