import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

const AppointmentCard = ({ data }) => {
  const [formattedDate, setFormattedDate] = useState();
  const [formattedTime, setFormattedTime] = useState();

  useEffect(() => {
    if (data.date != null) {
      const originalDate = data.date.split("-");
      const years = originalDate[0];
      const months = originalDate[1];
      const days = originalDate[2];
      setFormattedDate(`${days}-${months}-${years}`);
    } else {
      setFormattedDate("Data non disponibile");
    }

    if (data.time != null) {
      const originalTime = data.time.split(":");
      const hours = originalTime[0];
      const minutes = originalTime[1];
      setFormattedTime(`${hours}:${minutes}`);
    } else {
      setFormattedTime("Orario non disponibile");
    }
  }, [data]);

  return (
    <Col md={12} className='appointmet-card d-flex justify-content-between p-2'>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
      <p>visita medicia</p>
    </Col>
  );
};
export default AppointmentCard;
