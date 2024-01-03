import { Col, Container, Row } from "react-bootstrap";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  askAppointment,
  fetchUserAppointments,
  fetchUserPendingAppointments,
} from "../../redux/actions/appointmentActions";
import { useEffect, useState } from "react";
import Hero from "../Hero";

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const appointments = useSelector((state) => state.appointments.appointmentsList.content);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };
  useEffect(() => {
    if (token) {
      dispatch(fetchUserAppointments(token));
      dispatch(fetchUserPendingAppointments(token));
    }
    const intervalId = setInterval(() => {
      dispatch(fetchUserAppointments(token));
      dispatch(fetchUserPendingAppointments(token));
    }, 120000);

    return () => clearInterval(intervalId);
  }, [token, dispatch]);
  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />

          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                description='Benvenuto nella nostra sezione dedicata alle prenotazioni! Qui puoi gestire i tuoi appuntamenti e
                          richiedere nuove visite mediche in modo rapido e semplice.'
                title='Calendario e Prenotazioni'
                btnFunction={askAppointment(token)}
                btnText='Richiedi orario'
                openSidebar={openSidebar}
              />

              <Col md={12}>
                <Row className='py-3 gap-2 justify-content-center'>
                  {appointments &&
                    appointments.map((appointment) => <AppointmentCard data={appointment} key={appointment.id} />)}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};
export default PatientAppointments;
