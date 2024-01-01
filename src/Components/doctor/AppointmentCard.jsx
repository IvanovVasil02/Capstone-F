import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";

const AppointmentCard = (props) => {
  const [formattedDate, setFormattedDate] = useState();
  const [formattedTime, setFormattedTime] = useState();

  useEffect(() => {
    if (props.data.date != null) {
      const originalDate = props.data.date.split("-");
      const years = originalDate[0];
      const months = originalDate[1];
      const days = originalDate[2];
      setFormattedDate(`${days}-${months}-${years}`);
    } else {
      setFormattedDate("Da fissare");
    }

    if (props.data.time != null) {
      const originalTime = props.data.time.split(":");
      const hours = originalTime[0];
      const minutes = originalTime[1];
      setFormattedTime(`${hours}:${minutes}`);
    } else {
      setFormattedTime("Da fissare");
    }
  }, [props.data]);

  const handleClick = () => {
    props.setSelectedAppointment(props.data);
    props.handleShow();
  };

  return (
    <Col md={12} className='appointmet-card d-flex justify-content-between align-items-center px-3 py-3'>
      <p>Nome e cognome: {props.data.patient.name + " " + props.data.patient.surname}</p>
      <p>data: {formattedDate}</p>
      <p>Orario: {formattedTime}</p>
      <p>Motivazione: visita medicia</p>
      <div className='d-flex justify-content-between gap-2'>
        <Button type='button' className='bg-transparent text-secondary border-1 border-secondary' onClick={handleClick}>
          <img width='25' height='25' src='https://img.icons8.com/ios-glyphs/30/72839c/filled-sent.png' alt='send' />
          {props.data.status === "PENDING" ? "Fissa Appuntamento" : "Modifica appuntamento"}
        </Button>
      </div>
    </Col>
  );
};
export default AppointmentCard;
