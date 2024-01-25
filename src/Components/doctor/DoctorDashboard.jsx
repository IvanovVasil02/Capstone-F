import { Col, Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import { fetchPendingPrescriotions, fetchUserPrescription } from "../../redux/actions/prescriptionsActions";
import { fetchUserAppointments } from "../../redux/actions/appointmentActions";
import { fetchPatientList } from "../../redux/actions/patientsDoctorActions";
import Hero from "../Hero";
import { Link, useNavigate } from "react-router-dom";
import TopTogglebar from "../TopTogglebar";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.savedToken);
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

  const patients = useSelector((state) => state.doctor.patientList?.totalElements || 0);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptionList.page?.totalElements || 0);
  const pendingPrescriptions = useSelector((state) => state.prescriptions.prescriptionList?.pending || 0);
  const appointments = useSelector((state) => state.appointments.appointmentsList?.totalElements || 0);

  useEffect(() => {
    if (token && currentUser.role === "DOCTOR") {
      dispatch(fetchUserPrescription(token));
      dispatch(fetchPatientList(token));
      dispatch(fetchUserAppointments(token));
      dispatch(fetchPendingPrescriotions(token));

      const intervalId = setInterval(() => {
        dispatch(fetchUserPrescription(token));
        dispatch(fetchUserAppointments(token));
        dispatch(fetchPatientList(token));
        dispatch(fetchPendingPrescriotions(token));
      }, 120000);

      return () => clearInterval(intervalId);
    } else {
      navigate("/");
    }
  }, [token, dispatch, navigate, currentUser]);

  return (
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
                  currentUser={currentUser}
                  title='Benvenuta nella tua dashboard ,'
                  description='Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui
                        per rendere il tuo percorso di cura più accessibile e informativo.'
                />
              </Row>

              <Row className='row-cols-2 row-cols-md-4 py-3'>
                <Col className='p-3 ps-0 ps-md-3'>
                  <Link to='/patients' className='pointer'>
                    <div className='statistics-box-d'>
                      <h5>Pazienti</h5>
                      <img
                        width='50'
                        height='50'
                        src='https://img.icons8.com/ios/50/72839c/conference-background-selected.png'
                        alt='conference-background-selected'
                      />
                      <h5 className='text-dark'>{patients}</h5>
                    </div>
                  </Link>
                </Col>

                <Col className='p-3 pe-0 pe-md-3'>
                  <Link to='/doc-appointments'>
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
                <Col className='p-3 ps-0 ps-md-3'>
                  <Link to='/doc/prescriptions' className='pointer'>
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
                <Col className='p-3 pe-0 pe-md-3'>
                  <Link to='/doc/prescriptions/pending-prescription' className='pointer'>
                    <div className='statistics-box-d'>
                      <h5>In Attesa</h5>
                      <img
                        width='50'
                        height='50'
                        src='https://img.icons8.com/ios/50/72839c/treatment-list.png'
                        alt='treatment-list'
                      />
                      <h5 className='text-dark'>{pendingPrescriptions}</h5>
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
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
};
export default DoctorDashboard;
