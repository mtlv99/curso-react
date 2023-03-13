import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: conectar al backend

    // Recordar que la manera de saber si debe crear un evento nuevo, o actualizar
    // uno existente, es por medio de la existentia de un `_id`.
    // eslint-disable-next-line no-underscore-dangle
    if (calendarEvent._id) {
      // Actualizando
      // se usa spread para romper la referencia al objeto (crea uno nuevo).
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // TODO: remover _id nuevo acá, el backend debe encargarse de generarlo!
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
    // TODO: poner activeEvent en null?????
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
