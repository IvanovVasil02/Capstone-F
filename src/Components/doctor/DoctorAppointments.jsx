import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, fetchUserPendingAppointments } from "../../redux/actions/appointmentActions";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";
import { useEffect, useState } from "react";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
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
        <Row>
          <Sidebar />
          <Col md={10} className='p-4'>
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
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='py-3'>
              <Col md={12}>
                <Row className='g-2'>
                  <h4>I miei Appuntamenti</h4>
                  <div className='py-2'>
                    <ButtonGroup>
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
                  </div>
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
