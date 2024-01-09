import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fixApppointment } from "../../redux/actions/appointmentActions";

const AppointmentModal = (props) => {
  const dispatch = useDispatch();
  const hasError = useSelector((state) => state.error.messageError);

  const handleCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, "0");
    const day = `${currentDate.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCurrentTime = () => {
    const currentDate = new Date();
    const hours = `${currentDate.getHours()}`.padStart(2, "0");
    const minutes = `${currentDate.getMinutes()}`.padStart(2, "0");
    const seconds = `${currentDate.getSeconds()}`.padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const [date, setDate] = useState(props.appointment.date ? props.appointment.date : handleCurrentDate());
  const [time, setTime] = useState(props.appointment.time ? props.appointment.time : handleCurrentTime());

  useEffect(() => {
    props.setAppointmentsChanged(false);
  }, [hasError]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(fixApppointment(props.token, props.appointment.id, date, time));
    props.setAppointmentsChanged(true);
    setDate(props.appointment.date ? props.appointment.date : handleCurrentDate());
    setTime(props.appointment.time ? props.appointment.time : handleCurrentTime());
  };

  return (
    <>
      <Modal size='md' show={props.show} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              Gestione visita di {props.appointment.patient.name + " " + props.appointment.patient.surname}
            </h3>
            <BsX className='close-btn ms-auto' onClick={props.handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(evt) => handleSubmit(evt)}>
            <Row id='login-form' className='mb-3 flex-column justify-content-center g-4'>
              <Form.Group as={Col} md='12' className='text-center border-1'>
                <Form.Control
                  type='date'
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  name='date'
                  required
                />
              </Form.Group>{" "}
              <Form.Group as={Col} md='12' className='text-center border-1'>
                <Form.Control
                  type='time'
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  name='time'
                  step='60'
                  required
                />
              </Form.Group>
            </Row>

            <div className='d-flex justify-content-center gap-4 mt-5 flex-column align-items-center'>
              {props.appointmentsChanged && hasError === null && (
                <p className='text-success text-center '>
                  {props.appointment.status === "PENDING"
                    ? `Appuntamento fissato con successo per il ${date} per le ${time}`
                    : `Appuntamento modificato con successo per il ${date} per le ${time}`}
                </p>
              )}
              {hasError !== null && (
                <p className='text-danger text-center '>Non è possibile selezionare la data scelta</p>
              )}
              <Button type='submit' className='btn-login w-50'>
                Fatto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppointmentModal;
