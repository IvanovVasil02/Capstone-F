import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserPrescription as fetchUserPrescriptions } from "../../redux/actions/prescriptionsActions";
import { fetchUserAppointments } from "../../redux/actions/appointmentActions";
import Hero from "../Hero";
import { Link, useNavigate } from "react-router-dom";
import TopTogglebar from "../TopTogglebar";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.savedToken);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptionList.page?.totalElements || 0);
  const pendingPrescription = useSelector((state) => state.prescriptions.pendingPrescriptions?.totalElements || 0);
  const appointments = useSelector((state) => state.appointments.appointmentsList?.totalElements || 0);
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
  useEffect(() => {
    if (token === null || currentUser.role === "DOCTOR") {
      navigate("/");
    }
  }, [token, navigate, currentUser]);

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
  }, [token, dispatch, navigate]);

  return (
    token !== null &&
    currentUser !== null &&
    currentUser !== undefined && (
      <>
        <Container fluid>
          <Row className='flex-nowrap flex-column flex-md-row'>
            <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
            <TopTogglebar openSidebar={openSidebar} />
            <Col className='p-md-5 p-4'>
              <Row>
                <Hero
                  title='Benvenuta nella tua dashboard,'
                  description=' Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui
                        per rendere il tuo percorso di cura più accessibile e informativo.'
                  currentUser={currentUser}
                />
              </Row>
              <Row className='column-gap-4 py-4'>
                <Col className='p-2'>
                  <Link to='/prescriptions'>
                    <div className='statistics-box-d'>
                      <h5>Ricette</h5>
                      <img
                        width='50'
                        height='50'
                        src='https://img.icons8.com/ios/50/72839c/treatment-plan--v1.png'
                        alt='treatment-plan--v1'
                      />
                      <h5 className='text-dark'>{prescriptions}</h5>
                    </div>
                  </Link>
                </Col>
                <Col className='p-2'>
                  <Link to='/appointments'>
                    <div className='statistics-box-d'>
                      <h5>Appuntamenti</h5>
                      <img
                        width='50'
                        height='50'
                        src='https://img.icons8.com/ios/50/72839c/tear-off-calendar--v1.png'
                        alt='tear-off-calendar--v1'
                      />
                      <h5 className='text-dark'>{appointments}</h5>
                    </div>
                  </Link>
                </Col>
                <Col className='p-2'>
                  <Link to='/pendingPrescriptions'>
                    <div className='statistics-box-d'>
                      <h5>In attesa</h5>
                      <img
                        width='50'
                        height='50'
                        src='https://img.icons8.com/ios/50/72839c/tear-off-calendar--v1.png'
                        alt='tear-off-calendar--v1'
                      />
                      <h5 className='text-dark'>{pendingPrescription}</h5>
                    </div>
                  </Link>
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
                {currentUser.doctor && (
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
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};
export default PatientDashboard;
