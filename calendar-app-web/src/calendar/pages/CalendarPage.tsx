import { addDays } from "date-fns"
import { Calendar, CalendarModal, Navbar } from ".."

export const CalendarPage = () => {

  const events = [
    { 
      title: 'Cumpleaños del jefe',
      start: new Date(),
      end: addDays(new Date(), 3),
      bgcolor: '#fafafa',
      notes: 'Comprar el pastel',
    }
  ]

  return (
    <div>
      <Navbar />
      <Calendar events={events} />
      <CalendarModal />
    </div>
  )
}