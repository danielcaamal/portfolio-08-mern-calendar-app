import { createSlice } from '@reduxjs/toolkit';
import { calendarInitialState } from './calendarState';


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
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => event.id === payload.id ? payload : event);
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(event => event.id !== state.activeEvent?.id);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;