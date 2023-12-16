import { Button, Col, Container, Row } from "react-bootstrap";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "./Sidebar";

const PatientAppointments = () => {
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
                    <Button className='contact-btn' type='button'>
                      Richiedi orario
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='py-3 gap-2'>
              <AppointmentCard />
              <AppointmentCard />
              <AppointmentCard />
              <AppointmentCard />
              <AppointmentCard />
              <AppointmentCard />
            </Row>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};
export default PatientAppointments;
