import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserAppointments, fetchUserPrescription } from "../../redux/actions/mainActions";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.main.currentUser);
  const token = useSelector((state) => state.main.savedToken);
  const prescriptions = useSelector((state) => state.main.prescriptionList.content);
  const [approvedPrescriptions, setApprovedPrescriptions] = useState([]);
  const [pendingPrescriptions, setPendingPrescriptions] = useState([]);
  const appointments = useSelector((state) => state.main.appointmentsList);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserPrescription(token));
      dispatch(fetchUserAppointments(token));
    }
  }, [currentUser, token, dispatch]);

  useEffect(() => {
    if (prescriptions && appointments) {
      setApprovedPrescriptions(prescriptions.filter((prescription) => prescription.status === "APPROVATA"));
      setPendingPrescriptions(prescriptions.filter((prescription) => prescription.status !== "APPROVATA"));
      setAppointmentList(appointments.content);
    }
  }, [prescriptions, appointments]);

  return (
    currentUser !== null &&
    currentUser !== undefined && (
      <>
        <Container fluid>
          <Row>
            <Sidebar />
            <Col md={10} className='p-4'>
              <Row>
                <Col md={12} id='dashboard-header' className='p-0'>
                  <div className='dashboard-img-container'></div>
                  <div className='w-100 p-5'>
                    <div className='d-flex flex-column align-items-center offset-2'>
                      <h3 className='fw-light mb-4'>
                        Benvenuta nella tua dashboard , {currentUser.name + " " + currentUser.surname}
                      </h3>
                      <h6 className='w-50 text-center'>
                        Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui
                        per rendere il tuo percorso di cura più accessibile e informativo.
                      </h6>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='column-gap-4 py-4'>
                <Col className='p-0'>
                  <div className='statistics-box'>
                    <h5>Ricette</h5>
                    <img
                      width='50'
                      height='50'
                      src='https://img.icons8.com/ios/50/72839c/treatment-plan--v1.png'
                      alt='treatment-plan--v1'
                    />
                    <h5 className='text-dark'>{approvedPrescriptions && approvedPrescriptions.length}</h5>
                  </div>
                </Col>
                <Col className='p-0'>
                  <div className='statistics-box'>
                    <h5>Appuntamenti</h5>
                    <img
                      width='50'
                      height='50'
                      src='https://img.icons8.com/ios/50/72839c/tear-off-calendar--v1.png'
                      alt='tear-off-calendar--v1'
                    />
                    <h5 className='text-dark'>{appointmentList && appointmentList.length}</h5>
                  </div>
                </Col>
                <Col className='p-0'>
                  <div className='statistics-box'>
                    <h5>In Attesa</h5>
                    <img
                      width='50'
                      height='50'
                      src='https://img.icons8.com/ios/50/72839c/treatment-list.png'
                      alt='treatment-list'
                    />
                    <h5 className='text-dark'>{pendingPrescriptions && pendingPrescriptions.length}</h5>
                  </div>
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
