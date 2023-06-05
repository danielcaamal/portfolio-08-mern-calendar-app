import { calendarApi, getErrorMessageFromResponse } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { useAppDispatch, useAppSelector } from "../store";
import { IEvent, onAddNewEvent, onDeleteEvent, onError, onLoadingEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar";


export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const calendar = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);
  const { activeEvent, events, error } = calendar;

  const hasEventSelected = activeEvent !== null;

  const setActiveEvent = (event: IEvent | null) => {
    dispatch(onSetActiveEvent(event));
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get<IEvent[]>('/event');
      dispatch(onLoadingEvents(convertEventsToDateEvents(data)));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('Error loading events'));
    }
  };

  const startCreatingEvent = async (event: IEvent, userId?: string) => {
    try { 
      const { data } = await calendarApi.post('/event', { ...event, user: userId });
      dispatch(onAddNewEvent({ ...event, id: data.id, user }));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('Error creating event'));
    }
  };

  const startUpdatingEvent = async (event: IEvent) => {
    try { 
      const { data } = await calendarApi.put(`/event/${event.id}`, { ...event });
      dispatch(onUpdateEvent({ ...event, id: data.id }));
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('Error updating event'));
    }
  };

  const startSavingEvent = async (event: IEvent) => {
    if (event.id) {
      await startUpdatingEvent(event);
    } else {
      await startCreatingEvent(event, user?.id);
    }
  };

  const startDeletingEvent = async () => {
    try { 
      if (!activeEvent) return;
      await calendarApi.delete(`/event/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error: any) {
      const errorMessage = getErrorMessageFromResponse(error);
      if (errorMessage) {
        dispatch(onError(errorMessage));
        return errorMessage;
      }
      dispatch(onError('Error deleting event'));
    }
  };

  return {
    // state
    calendar,
    activeEvent,
    events,
    hasEventSelected,
    error,
    // actions
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent,
  }
};