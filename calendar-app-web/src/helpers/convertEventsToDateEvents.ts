import { IEvent } from "../store/calendar";

export const convertEventsToDateEvents = (events: IEvent[]) => {
  return events.map((event) => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    };
  });
};