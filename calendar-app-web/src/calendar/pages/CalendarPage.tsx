import { useEffect } from "react"
import Swal from "sweetalert2"

import { Calendar, CalendarModal, FabAddNew, FabDelete, Navbar } from ".."
import { useCalendarStore } from "../../hooks"

export const CalendarPage = () => {
  const { startLoadingEvents, error } = useCalendarStore()

  useEffect(() => {
    if (error) {
      Swal.fire('Error', error, 'error')
    }
  }, [error])

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <div>
      <Navbar />
      <Calendar />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </div>
  )
}