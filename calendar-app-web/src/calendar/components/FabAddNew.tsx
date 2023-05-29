import { useCalendarStore, useUIStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClick = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: new Date(),
    });
    openDateModal();
  }

  return (
    <button
      title='Add new event'
      type='button'
      className='btn btn-primary fab'
      onClick={handleClick}
      >
        <i className='fas fa-plus'></i>
    </button>
  )
}
