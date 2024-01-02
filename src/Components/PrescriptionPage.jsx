import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import PrescriptionCard from "./doctor/PrescriptionCard";
import PrescriptionDataModal from "./patient/PrescriptionDataModal";
import { useEffect, useState } from "react";
import { fetchPendingPrescriotions, fetchUserPrescription } from "../redux/actions/prescriptionsActions";
import Hero from "./Hero";

const PrescriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };
  const pendignPrescriptions = useSelector((state) => state.prescriptions.pendingPrescriptions.content);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptionList.page.content);
  const [currentTypePrescriptions, setCurrentTypePrescriptions] = useState("");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const handleClosePrescriptionModal = () => setShowPrescriptionModal(false);
  const handleShowPrescriptionModal = () => setShowPrescriptionModal(true);
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const userRole = useSelector((state) => state.user.currentUser.role);
  const [radioValue, setRadioValue] = useState("pending");
  const radios = [
    { name: "In attesa", value: "pending" },
    { name: "Approvate", value: "approved" },
  ];

  useEffect(() => {
    if (radioValue === "pending") {
      dispatch(fetchPendingPrescriotions(token, "patients"));
      setCurrentTypePrescriptions(pendignPrescriptions);
    } else if (radioValue === "approved") {
      dispatch(fetchUserPrescription(token));
      setCurrentTypePrescriptions(prescriptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, token]);

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <Col className='p-md-5'>
            <Hero
              title='Gestionale ricette'
              description='Esplora la tua salute con comodità: controlla le tue ricette mediche in attesa e approvate in un unico luogo. '
              openSidebar={openSidebar}
            />
            <ButtonGroup className='py-2'>
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
            {currentTypePrescriptions &&
              currentTypePrescriptions.map((prescription, index) => (
                <PrescriptionCard
                  data={prescription}
                  key={index}
                  handleShowPrescriptionModal={handleShowPrescriptionModal}
                  setSelectedPrescription={setSelectedPrescription}
                  userRole={userRole}
                />
              ))}
          </Col>
        </Row>
      </Container>
      <PrescriptionDataModal
        selectedPrescription={selectedPrescription}
        handleClosePrescriptionModal={handleClosePrescriptionModal}
        showPrescriptionModal={showPrescriptionModal}
        userRole={userRole}
      />
    </>
  );
};
export default PrescriptionPage;
