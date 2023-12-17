import { Col } from "react-bootstrap";

const AppointmentCard = ({ data }) => {
  const originalDate = data.date.split("-");
  const years = originalDate[0];
  const months = originalDate[1];
  const days = originalDate[1];
  const formattedDate = `${days}-${months}-${years}`;

  const originalTime = data.time.split(":");
  const hours = originalTime[0];
  const minutes = originalTime[1];
  const formattedTime = `${hours}:${minutes}`;

  return (
    <Col md={12} className='appointmet-card d-flex justify-content-between p-2'>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
      <p>visitta medicia</p>
    </Col>
  );
};
export default AppointmentCard;
