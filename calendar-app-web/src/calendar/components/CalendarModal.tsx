import { ChangeEvent, FormEvent, useMemo, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

import "./CalendarModal.css"
import "react-datepicker/dist/react-datepicker.css";
import 'sweetalert2/dist/sweetalert2.css'
import { useCalendarStore, useUIStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModelOpen, closeDateModal } = useUIStore();
  const { activeEvent, setActiveEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
    user: {
      id: '',
      fullName: '',
      email: '',
    },
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.trim().length < 2 ? 'is-invalid' : '';
  }, [formValues, formSubmitted]);

  useEffect(() => {
    if (activeEvent) {
      setFormValues({
        ...activeEvent,
      })
    }
  }, [activeEvent])
  

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  function closeModal() {
    closeDateModal();
    setActiveEvent(null);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    const diff = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(diff)) {
      Swal.fire('Error', 'Start date and end date are required', 'error');
      return;
    }
    if (diff < 0) {
      Swal.fire('Error', 'End date must be greater than start date', 'error');
      return;
    }
    if (formValues.title.trim().length < 2) {
      Swal.fire('Error', 'Title is required', 'error');
      return;
    }

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  }

  return (
    <Modal
        isOpen={isDateModelOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> New Event </h1>
        <hr />
        <form 
          className="container"
          onSubmit={onSubmit}
          >

            <div className="form-group mb-2">
                <label>Start datetime</label>
                
                <DatePicker 
                  className={`form-control`}
                  selected={formValues.start}
                  dateFormat='Pp'
                  onChange={(date: Date) => setFormValues({
                    ...formValues,
                    start: date
                  })}
                  showTimeSelect
                />
            </div>

            <div className="form-group mb-2">
                <label>End datetime</label>
                <DatePicker 
                  className={`form-control`}
                  selected={formValues.end}
                  dateFormat='Pp'
                  onChange={(date: Date) => setFormValues({
                    ...formValues,
                    end: date
                  })}
                  showTimeSelect
                  minDate={formValues.start}
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and Notes</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Event title"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">A short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    className={`form-control`}
                    placeholder="Notes"
                    rows={5}
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>
        </form>
      </Modal>
  )
};