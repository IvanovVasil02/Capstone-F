import { Col, Container, Row } from "react-bootstrap";
import AppointmentCard from "./AppointmentCard";
import Sidebar from "../../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  askAppointment,
  fetchUserAppointments,
  fetchUserPendingAppointments,
} from "../../../redux/actions/appointmentActions";
import { useEffect, useState } from "react";
import Hero from "../../Hero";
import { useNavigate } from "react-router-dom";
import TopTogglebar from "../../TopTogglebar";

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.savedToken);
  const role = useSelector((state) => state.user.currentUser.role);
  const appointments = useSelector((state) => state.appointments.appointmentsList.content);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };
  useEffect(() => {}, [token, navigate]);

  useEffect(() => {
    if (token && role !== "DOCTOR") {
      dispatch(fetchUserAppointments(token));
      dispatch(fetchUserPendingAppointments(token));
    } else if (token === null || role === "DOCTOR") {
      navigate("/");
    }
    const intervalId = setInterval(() => {
      dispatch(fetchUserAppointments(token));
      dispatch(fetchUserPendingAppointments(token));
    }, 120000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                description='Benvenuto nella nostra sezione dedicata alle prenotazioni! Qui puoi gestire i tuoi appuntamenti e
                          richiedere nuove visite mediche in modo rapido e semplice.'
                title='Calendario e Prenotazioni'
                btnFunction={askAppointment(token)}
                btnText='Richiedi orario'
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
