import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { fixApppointment } from "../../redux/actions/appointmentActions";

const AppointmentModal = (props) => {
  const dispactch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispactch(fixApppointment(props.token, props.appointment.id, date, time));
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
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Form.Group>{" "}
              <Form.Group as={Col} md='12' className='text-center border-1'>
                <Form.Control
                  type='time'
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <div className='d-flex justify-content-center gap-4 mt-5 flex-column align-items-center'>
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
