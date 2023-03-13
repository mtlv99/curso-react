import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import { Navbar } from '../components/Navbar';
import { localizer, getMessagesES } from '../../helpers';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEventBox } from '../components/CalendarEventBox';
import { CalendarModal } from '../components/CalendarModal';


const events = [{
  title: 'Evento de Prueba', // required
  notes: 'Esto es una prueba, hola mundo!',
  start: new Date(), // required
  end: addHours(new Date(), 2), // required
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Marco',
  },
}];

export const CalendarPage = () => {
  const [lastSelectedView, setLastSelectedView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({
      event, start, end, isSelected,
    });

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };
  const onSelect = (event) => {
    console.log({ click: event });
  };
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastSelectedView(event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        // el culture lee de los 'locales' de helpers/calendarLocalizer.js
        // Esto pone el calendario en español (el calendario como tal, sin los botones).
        culture="es"
        // el culture lee de los 'locales' de helpers/getMessages.js
        // Esto pone el resto del calendario en español (botones de navegacion, modo de calendario, etc...)
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastSelectedView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        // Con esto se pueden crear componentes custom para las diferentes partes del calendario
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};
