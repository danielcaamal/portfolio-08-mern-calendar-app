import { createSlice } from '@reduxjs/toolkit';
import { IEvent, calendarInitialState } from './calendarState';


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarInitialState,
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onLoadingEvents: (state, { payload } : { payload: IEvent[]}) => {
      state.events = payload;
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => event.id === payload.id ? payload : event);
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(event => event.id !== state.activeEvent?.id);
      state.activeEvent = null;
    },
    onError: (state, { payload } : { payload: string }) => {
      state.error = payload;
    },
  },
});

export const { onLoadingEvents, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onError } = calendarSlice.actions;