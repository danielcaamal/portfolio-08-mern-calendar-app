import { addDays } from "date-fns";

export interface ICalendarState {
  activeEvent: IEvent | null;
  events: IEvent[];
}

export interface IEvent {
  id?: string;
  title: string;
  start: string;
  end: string;
  notes: string;
}

export const calendarInitialState: ICalendarState = {
  activeEvent: null,
  events: [{
    id: '1',
    title: 'Cumpleaños del jefe',
    start: new Date().toISOString(),
    end: addDays(new Date(), 1).toISOString(),
    notes: 'Comprar el pastel',
  }]
}