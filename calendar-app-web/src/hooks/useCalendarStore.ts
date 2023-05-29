import { useAppDispatch, useAppSelector } from "../store";
import { IEvent, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar";


export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const calendar = useAppSelector((state) => state.calendar);
  const { activeEvent, events } = calendar;

  const hasEventSelected = activeEvent !== null;

  const setActiveEvent = (event: IEvent | null) => {
    dispatch(onSetActiveEvent(event));
  };

  const startSavingEvent = async (event: IEvent) => {
    // TODO: implement
    if (event.id) {
      // update
      dispatch(onUpdateEvent({...event}));
    } else {
      // create
      const id = new Date().getTime();
      dispatch(onAddNewEvent({ ...event, id }));
    }
  };

  const startDeleteEvent = async () => {
    dispatch(onDeleteEvent());
  };

  return {
    // state
    calendar,
    activeEvent,
    events,
    hasEventSelected,
    // actions
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  }
};