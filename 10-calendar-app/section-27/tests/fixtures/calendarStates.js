export const events = [
  {
    id: '1',
    start: new Date('2023-05-15 13:00:00'),
    end: new Date('2023-05-15 15:00:00'),
    title: 'Cumpleaños de Test',
    notes: 'Unit test 1',
  },
  {
    id: '2',
    start: new Date('2023-05-16 13:00:00'),
    end: new Date('2023-05-16 15:00:00'),
    title: 'Evento ficticio',
    notes: 'Unit test 2',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  // recordar usar spread para romper las referencias, en el caso de que se esté haciendo
  // manipulación de datos.
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  // recordar usar spread para romper las referencias, en el caso de que se esté haciendo
  // manipulación de datos.
  events: [...events],
  activeEvent: { ...events[0] },
};
