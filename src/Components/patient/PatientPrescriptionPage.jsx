import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPendingPrescriotions, fetchUserPrescription } from "../../redux/actions/prescriptionsActions";
import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import TopTogglebar from "../TopTogglebar";
import Hero from "../Hero";
import PrescriptionCard from "../doctor/PrescriptionCard";
import PrescriptionDataModal from "./PrescriptionDataModal";

const PatientPrescriptionPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.savedToken);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const userRole = useSelector((state) => state.user.currentUser?.role || 0);
  const [radioValue, setRadioValue] = useState("approved");
  const radios = [
    { name: "In attesa", value: "pending" },
    { name: "Approvate", value: "approved" },
  ];
  const location = useLocation();

  const handleClosePrescriptionModal = () => setShowPrescriptionModal(false);
  const handleShowPrescriptionModal = () => setShowPrescriptionModal(true);

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
    const fetchPrescriptions = async () => {
      try {
        if (token) {
          if (radioValue === "pending") {
            await dispatch(fetchPendingPrescriotions(token));
          } else if (radioValue === "approved") {
            await dispatch(fetchUserPrescription(token));
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrescriptions();

    const intervalId = setInterval(fetchPrescriptions, 120000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, token]);

  useEffect(() => {
    props.type && setRadioValue("pending");
  }, [props.type]);

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Gestionale ricette'
                description='Esplora la tua salute con comodità: controlla le tue ricette mediche in attesa e approvate in un unico luogo. '
              />
            </Row>
            <Row>
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
            </Row>
            <Row>
              {useSelector((state) => {
                if (radioValue === "pending") {
                  return state.prescriptions.pendingPrescriptions?.content || [];
                } else if (radioValue === "approved") {
                  return state.prescriptions.prescriptionList.page?.content || [];
                }
                return [];
              }).map((prescription, index) => (
                <PrescriptionCard
                  data={prescription}
                  key={index}
                  handleShowPrescriptionModal={handleShowPrescriptionModal}
                  userRole={userRole}
                  location={location.pathname}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <PrescriptionDataModal
        handleClosePrescriptionModal={handleClosePrescriptionModal}
        showPrescriptionModal={showPrescriptionModal}
        userRole={userRole}
      />
    </>
  );
};
export default PatientPrescriptionPage;
