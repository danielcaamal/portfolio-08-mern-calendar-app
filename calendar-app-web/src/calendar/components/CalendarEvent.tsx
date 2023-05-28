
export const CalendarEvent = ({ event }: { event: any }) => {
  const { title, user } = event;
  return (
    <div>
      <strong>{title}</strong>
      <span>- {user?.name}</span>
    </div>
  );
};