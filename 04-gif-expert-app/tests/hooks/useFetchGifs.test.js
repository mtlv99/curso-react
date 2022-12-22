import { renderHook, waitFor } from '@testing-library/react';
import useFetchGifs from '../../src/hooks/useFetchGifs';

const category = 'Cat';

// Se pueden evaluar custom Hooks comprobando el valor que retornan en un momento determinado.

// A partir de React 18, la libreria para probar hooks ahora es parte de testing-library.
// Antes se usaba 'react-hooks-testing-library'.
describe('Pruebas en el hook useFetchGifs', () => {
  test('Debe de retornar el estado inicial', () => {
    // RenderHook mockea el ciclo de vida de un componente funcional,
    // y permite usar Hooks fuera de un component (debido a que los Hooks no funcionan fuera de uno).
    const { result } = renderHook(() => useFetchGifs(category));

    // Retorna los valores actuales del Hook
    const { images, isLoading } = result.current;

    expect(images.length).toBe(0);
    expect(isLoading).toBeTruthy();
  });

  test('Debe de retornar un arreglo de imagenes y isLoading en false', async () => {
    const { result } = renderHook(() => useFetchGifs(category));

    // Le da chance al Hook de ejecutarse y lo espera por unos segundos
    await waitFor(
      () => expect(result.current.images.length).toBeGreaterThan(0),
      // Por defecto son 1000ms. Valor de prueba nada mas, normalmente tarde menos de 1s.
      { timeout: 2000 },
    );

    // Retorna los valores actuales del Hook
    const { images, isLoading } = result.current;

    expect(images.length).toBeGreaterThan(0);
    expect(isLoading).toBeFalsy();
  });
});
