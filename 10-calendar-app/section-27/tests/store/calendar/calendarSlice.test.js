import {
  calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState, calendarWithEventsState, events, initialState,
} from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
  test('debe de estar el estado por defecto', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe de activar el evento', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe de agregar el evento', () => {
    const newEvent = {
      id: '3',
      start: new Date('2023-05-17 13:00:00'),
      end: new Date('2023-05-17:00:00'),
      title: 'Nuevo eventooo :)',
      notes: 'Soy nuevo!',
    };
    const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvent debe de editar el evento', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2023-05-17 13:00:00'),
      end: new Date('2023-05-17:00:00'),
      title: 'Cumpleaños de Test actualizado',
      notes: 'Unit test 1 - Update',
    };
    const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent debe de borrar el evento activo', () => {
    // Recordar que en el fixture el primer evento es el que está marcado como activo.
    const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoadingEvents).toBeFalsy();
    expect(state.events).toEqual(events);

    // Para cuando ya hay eventos
    calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test('on Logout Calendar debe de limpiar el estado', () => {
    // calendarWithActiveEventState
    const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
    expect(state).toEqual(initialState);
  });
});
