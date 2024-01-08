import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, fetchUserPendingAppointments } from "../../redux/actions/appointmentActions";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";
import { useEffect, useState } from "react";
import Hero from "../Hero";
import { useNavigate } from "react-router-dom";
import TopTogglebar from "../TopTogglebar";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.savedToken);
  const role = useSelector((state) => state.user.currentUser.role);
  const [showSidebar, setShowSidebar] = useState(false);
  const [appointmentsChanged, setAppointmentsChanged] = useState(false);

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

  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setAppointmentsChanged(false);
  };

  const handleShow = () => setShowModal(true);

  const [radioValue, setRadioValue] = useState("pending");
  const radios = [
    { name: "In attesa", value: "pending" },
    { name: "Approvate", value: "approved" },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (token && role === "DOCTOR") {
          if (radioValue === "pending") {
            await dispatch(fetchUserPendingAppointments(token));
          } else if (radioValue === "approved") {
            await dispatch(fetchUserAppointments(token));
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
    const intervalId = setInterval(fetchAppointments, 120000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, radioValue, appointmentsChanged]);
  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Gestionale visite'
                description=' Benvenuto nella nostra sezione dedicata alle prenotazioni! Qui puoi gestire i tuoi appuntamenti e
                          richiedere nuove visite mediche in modo rapido e semplice.'
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
              {useSelector((state) => {
                if (radioValue === "pending") {
                  return state.appointments.pendingAppointmentsList?.content || [];
                } else if (radioValue === "approved") {
                  return state.appointments.appointmentsList?.content || [];
                }
                return [];
              }).map((appointment) => (
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
          setAppointmentsChanged={setAppointmentsChanged}
          appointmentsChanged={appointmentsChanged}
        />
      )}
    </>
  );
};
export default DoctorAppointments;
