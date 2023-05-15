import { parseISO } from 'date-fns';


/* eslint-disable no-param-reassign */
// eslint-disable-next-line arrow-body-style
export const convertEventsToDateEvents = (events = []) => {
  return events.map((event) => {
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);
    return event;
  });
};
