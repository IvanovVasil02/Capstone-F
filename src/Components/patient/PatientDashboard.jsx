import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserPrescription as fetchUserPrescriptions } from "../../redux/actions/prescriptionsActions";
import { fetchUserAppointments } from "../../redux/actions/appointmentActions";
import Hero from "../Hero";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.savedToken);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptionList.page.totalElements);
  const appointments = useSelector((state) => state.appointments.appointmentsList.totalElements);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserPrescriptions(token));
      dispatch(fetchUserAppointments(token));
    }
    const intervalId = setInterval(() => {
      dispatch(fetchUserPrescriptions(token));
      dispatch(fetchUserAppointments(token));
    }, 120000);

    return () => clearInterval(intervalId);
  }, [token, dispatch]);

  return (
    currentUser !== null &&
    currentUser !== undefined && (
      <>
        <Container fluid>
          <Row className='flex-nowrap'>
            <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
            <Col className='p-md-5'>
              <Row>
                <Hero
                  title='Benvenuta nella tua dashboard,'
                  description=' Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui
                        per rendere il tuo percorso di cura più accessibile e informativo.'
                  currentUser={currentUser}
                  openSidebar={openSidebar}
                />
              </Row>
              <Row className='column-gap-4 py-4'>
                <Col className='p-0 statistics-box'>
                  <h5>Ricette</h5>
                  <img
                    width='50'
                    height='50'
                    src='https://img.icons8.com/ios/50/72839c/treatment-plan--v1.png'
                    alt='treatment-plan--v1'
                  />
                  <h5 className='text-dark'>{prescriptions}</h5>
                </Col>
                <Col className='p-0 statistics-box'>
                  <h5>Appuntamenti</h5>
                  <img
                    width='50'
                    height='50'
                    src='https://img.icons8.com/ios/50/72839c/tear-off-calendar--v1.png'
                    alt='tear-off-calendar--v1'
                  />
                  <h5 className='text-dark'>{appointments}</h5>
                </Col>
              </Row>
              <Row className='data-container p-4 gap-5'>
                <Col className='profile-data p-2'>
                  <div className='d-flex justify-content-center p-4'>
                    <h5>Il mio profilo</h5>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Nome e cognome:</p>
                    <p>{currentUser.name + " " + currentUser.surname}</p>
                  </div>{" "}
                  <div className='d-flex justify-content-between'>
                    <p>Data di nascita:</p>
                    <p>{currentUser.birthDate}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Indirizzo:</p>
                    <p>{currentUser.address}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Recapito telefonico:</p>
                    <p>{currentUser.phoneNumber}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Email:</p>
                    <p>{currentUser.email}</p>
                  </div>
                </Col>
                <Col className='profile-data p-2'>
                  <div className='d-flex justify-content-center p-4'>
                    <h5>Il mio dottore</h5>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Nome e cognome:</p>
                    <p>{currentUser.doctor.name + " " + currentUser.doctor.surname}</p>
                  </div>{" "}
                  <div className='d-flex justify-content-between'>
                    <p>Data di nascita:</p>
                    <p>{currentUser.doctor.birthDate}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Indirizzo:</p>
                    <p>{currentUser.doctor.address}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Recapito telefonico:</p>
                    <p>{currentUser.doctor.phoneNumber}</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <p>Email:</p>
                    <p>{currentUser.doctor.email}</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};
export default PatientDashboard;
