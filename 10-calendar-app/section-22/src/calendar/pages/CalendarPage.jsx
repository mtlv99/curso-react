import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import { Navbar } from '..';
import { localizer, getMessagesES } from '../../helpers';
import 'react-big-calendar/lib/css/react-big-calendar.css';


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
  console.log('');

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
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
