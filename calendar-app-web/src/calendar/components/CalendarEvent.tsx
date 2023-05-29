import { EventProps } from "react-big-calendar";
import { IEvent } from "../../store/calendar";

export const CalendarEvent = ({ event }: { event: EventProps<IEvent> }) => {
  const { title } = event;
  return (
    <div>
      <strong>{title}</strong>
      {/* <span>- {user?.name}</span> */}
    </div>
  );
};