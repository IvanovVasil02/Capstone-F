import { Col } from "react-bootstrap";

const AppointmentCard = () => {
  return (
    <Col md={12} className='appointmet-card d-flex justify-content-between p-2'>
      <p>2023-01-23</p>
      <p>9:17</p>
      <p>visitta medicia</p>
    </Col>
  );
};
export default AppointmentCard;
