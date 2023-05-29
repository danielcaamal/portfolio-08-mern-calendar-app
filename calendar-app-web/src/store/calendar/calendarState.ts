import { addDays } from "date-fns";

export interface ICalendarState {
  activeEvent: IEvent | null;
  events: IEvent[];
}

export interface IEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  notes: string;
}

export const calendarInitialState: ICalendarState = {
  activeEvent: null,
  events: [{
    id: '1',
    title: 'Cumpleaños del jefe',
    start: new Date(),
    end: addDays(new Date(), 1),
    notes: 'Comprar el pastel',
  }]
}