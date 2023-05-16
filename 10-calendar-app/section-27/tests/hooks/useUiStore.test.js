import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { useUiStore } from '../../src/hooks';
import { uiSlice } from '../../src/store';

const getMockStore = (initialState) => configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  preloadedState: {
    ui: { ...initialState },
  },
});

describe('Pruebas en useUiStore', () => {
  test('debe de regresar los valores por defecto', () => {
    // Para modificar el valor del state a través de todas las pruebas, con un state definido.
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      // Para inyectarle un wrapper de Provider al Hook, se hace por medio del "wrapper" property.
      // eslint-disable-next-line react/jsx-filename-extension
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });


  test('openDateModal debe de colocar tru en el isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: false });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    // Cuidado de no destructurar las properties que cambian! Al destructurarlas, almacenan permanentemente su valor,
    // y no verán ningún cambio reflejado. Es mejor usar el result.current[property], como en el assertion.
    // const { isDateModalOpen, openDateModal } = result.current;
    const { openDateModal } = result.current;

    // Recordar usar el act para ejecutar funciones del propio hook
    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeDateModal debe de colocar false en isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    // Recordar usar el act para ejecutar funciones del propio hook.
    // También se puede ejecutar la funcion leyendola por medio del result.current directamente.
    act(() => {
      result.current.closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test('toggleDateModal debe de alternar el estado', () => {
    const mockStore = getMockStore({ isDateModalOpen: true });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>,
    });

    // Recordar usar el act para ejecutar funciones del propio hook.
    // También se puede ejecutar la funcion leyendola por medio del result.current directamente.
    act(() => {
      result.current.toggleDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();

    // Se puede volver a llamar con un act, para alternar el estado de nuevo.
    act(() => {
      result.current.toggleDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
