import { EventProps } from "react-big-calendar";
import { IEvent } from "../../store/calendar";

export const CalendarEvent = ({ event }: { event: EventProps<IEvent> }) => {
  const { title, event: { user, start, end } } = event;

  const parseHourMinute = (hourMinute: number) => {
    return hourMinute.toString().padStart(2, '0');
  }

  const getHoursMinutes = (dateString: Date) => {
    const date = new Date(dateString);
    return `${parseHourMinute(date.getHours())}:${parseHourMinute(date.getMinutes())}`;
  };

  return (
    <div>
      <span>{getHoursMinutes(start)} - {getHoursMinutes(end)}</span>
      <br />
      <strong>{title}</strong>
      <br />
      <span>{user?.fullName}</span>
    </div>
  );
};