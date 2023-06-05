import { IUser } from "../auth/authState";

export interface ICalendarState {
  activeEvent: IEvent | null;
  events: IEvent[];
  error?: string;
}

export interface IEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  notes: string;
  user: IUser;
}

export const calendarInitialState: ICalendarState = {
  activeEvent: null,
  events: [],
  error: undefined,
}