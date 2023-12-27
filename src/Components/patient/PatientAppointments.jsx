import { Button, Col, Container, Row } from "react-bootstrap";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { askAppointment } from "../../redux/actions/appointmentActions";

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const appointments = useSelector((state) => state.appointments.appointmentsList.page.content);

  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={10} className='p-4'>
            <Row className='sticky-top'>
              <Col md={12} id='dashboard-header' className='p-0'>
                <div className='dashboard-img-container'></div>
                <div className='w-100 p-4'>
                  <div className='d-flex flex-column align-items-center offset-2'>
                    <h3 className='fw-light mb-2'>Calendario e Prenotazioni</h3>
                    <h6 className='w-75 text-center py-3'>
                      Benvenuto nella nostra sezione dedicata alle prenotazioni! Qui puoi gestire i tuoi appuntamenti e
                      richiedere nuove visite mediche in modo rapido e semplice.
                    </h6>
                    <Button
                      className='contact-btn'
                      type='button'
                      onClick={() => {
                        dispatch(askAppointment(token));
                      }}
                    >
                      Richiedi orario
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='py-3 gap-2'>
              {appointments &&
                appointments.map((appointment) => <AppointmentCard data={appointment} key={appointment.id} />)}
            </Row>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};
export default PatientAppointments;
