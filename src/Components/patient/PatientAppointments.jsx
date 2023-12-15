import { Button, Col, Row } from "react-bootstrap";

const PatientAppointments = () => {
  return (
    <>
      {" "}
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
      <Row className='py-3'>
        <Col id='appointments-container' className='p-3'>
          ciao
        </Col>
      </Row>
    </>
  );
};
export default PatientAppointments;
