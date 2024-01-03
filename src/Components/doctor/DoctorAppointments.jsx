import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, fetchUserPendingAppointments } from "../../redux/actions/appointmentActions";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";
import { useEffect, useState } from "react";
import Hero from "../Hero";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };
  const appointments = useSelector((state) => state.appointments.appointmentsList.content);
  const penddingAppointments = useSelector((state) => state.appointments.pendingAppointmentsList.content);
  const [currentTypeAppointments, setCurrentTypeAppointments] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [radioValue, setRadioValue] = useState("pending");
  const radios = [
    { name: "In attesa", value: "pending" },
    { name: "Approvate", value: "approved" },
  ];

  useEffect(() => {
    if (radioValue === "pending") {
      dispatch(fetchUserPendingAppointments(token));
      setCurrentTypeAppointments(penddingAppointments);
    } else if (radioValue === "approved") {
      dispatch(fetchUserAppointments(token));
      setCurrentTypeAppointments(appointments);
    }

    const intervalId = setInterval(() => {
      dispatch(fetchUserAppointments(token));
      dispatch(fetchUserPendingAppointments(token));
    }, 120000);

    return () => clearInterval(intervalId);
  }, [token, dispatch, radioValue, penddingAppointments, appointments]);
  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />

          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Gestionale visite'
                description=' Benvenuto nella nostra sezione dedicata alle prenotazioni! Qui puoi gestire i tuoi appuntamenti e
                          richiedere nuove visite mediche in modo rapido e semplice.'
                openSidebar={openSidebar}
              />
            </Row>

            <Row>
              <h4 className='pt-3'>I miei appuntamenti</h4>
              <ButtonGroup className='py-3 px-0'>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type='radio'
                    name='radio'
                    variant='outline-secondary'
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>

              {currentTypeAppointments &&
                currentTypeAppointments.map((appointment) => (
                  <AppointmentCard
                    data={appointment}
                    handleShow={handleShow}
                    key={appointment.id}
                    setSelectedAppointment={setSelectedAppointment}
                  />
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
      {selectedAppointment && (
        <AppointmentModal
          show={showModal}
          handleClose={handleClose}
          handleShow={handleShow}
          appointment={selectedAppointment}
          token={token}
        />
      )}
    </>
  );
};
export default DoctorAppointments;
