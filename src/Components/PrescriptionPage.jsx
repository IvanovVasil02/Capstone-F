import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import PrescriptionCard from "./doctor/PrescriptionCard";
import PrescriptionDataModal from "./patient/PrescriptionDataModal";
import { useEffect, useState } from "react";
import { fetchPendingPrescriotions, fetchUserPrescription } from "../redux/actions/prescriptionsActions";

const PrescriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
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
  }, [radioValue, token, dispatch, pendignPrescriptions, prescriptions]);

  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col sm={5} className='p-5'>
            <h2>Gestionale ricette</h2>
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
