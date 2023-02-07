import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../src/hooks';

const customCounterValue = 100;

describe('Pruebas en el useCounter', () => {
  test('debe de retornar los valores por defecto', () => {
    const { result } = renderHook(() => useCounter());
    const {
      counter, decrement, increment, reset,
    } = result.current;

    expect(counter).toBe(10);

    expect(decrement).toEqual(expect.any(Function));
    expect(increment).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });


  test('debe de generar el counter con el valor de 100', () => {
    const { result } = renderHook(() => useCounter(customCounterValue));
    const { counter } = result.current;

    expect(counter).toBe(customCounterValue);
  });

  test('debe de incrementar el contador', () => {
    const { result } = renderHook(() => useCounter(customCounterValue));

    // Se hizo un cambio pequeño en la forma en que esto se setea en el setState para que
    // funcione bien el test, revisar archivo del Hook.
    const { counter, increment } = result.current;

    // Cuidado con la destructuracion del result.current! Recordar que ese valor es un snapshot,
    // y si el valor del result cambia más adelante, no se verá reflejado en la variabla destructurada.
    // Para cambios en el state de un hook, se deben aplicar por medio de un callback de la funcion `act`
    // de React Testing library.
    act(() => {
      increment();
      increment(2);
    });
    expect(result.current.counter).toBe(103);
  });

  test('debe de decrementar el contador', () => {
    const { result } = renderHook(() => useCounter(customCounterValue));
    const { counter, decrement } = result.current;

    // Para cambios en el state de un hook, se deben aplicar por medio de un callback de la funcion `act`
    // de React Testing library.
    act(() => {
      decrement();
      decrement(2);
    });
    expect(result.current.counter).toBe(97);
  });

  test('debe de resetear el contador', () => {
    const { result } = renderHook(() => useCounter(customCounterValue));
    const { counter, increment, reset } = result.current;

    act(() => {
      increment();
      reset();
    });
    expect(result.current.counter).toBe(customCounterValue);
  });
});
