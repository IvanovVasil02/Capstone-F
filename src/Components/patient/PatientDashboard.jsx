import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import PatientAppointments from "./PatientAppointments";

const PatientDashboard = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={10} className='p-4'>
            <PatientAppointments />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PatientDashboard;
