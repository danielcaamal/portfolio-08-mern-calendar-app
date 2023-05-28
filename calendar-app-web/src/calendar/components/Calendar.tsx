import { Calendar as CalendarComponent, View } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getCalendarLocalizer } from "../helpers";
import { CalendarEvent } from ".";
import { useState } from "react";

export const Calendar = ({ events } : { events: any[]}) => {

  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') || "month") as View);

  const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {
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

  const onDoubleClick = (e: any) => {
    console.log(e)
  };

  const onSelectEvent = (e: any) => {
    console.log(e)
  }

  const onViewChanged = (e: View) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  return (
    <CalendarComponent
      localizer={getCalendarLocalizer}
      events={events}
      defaultView={ lastView }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      eventPropGetter={eventStyleGetter}
      components={{
        event: (e) => <CalendarEvent event={e} />,
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChanged}
    />
  );
};