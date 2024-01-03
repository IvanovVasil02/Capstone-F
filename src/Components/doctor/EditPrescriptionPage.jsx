import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrescriptionModal from "./PrescriptionModal";
import MedicineCard from "../patient/MedicineCard";
import { fetchSearchMedicine } from "../../redux/actions/mainActions";
import Prescription from "./Prescription";
import { ApprovePrescription, fillCartPrescription } from "../../redux/actions/prescriptionsActions";
import CartPrescription from "../CartPrescription";
import TopTogglebar from "../TopTogglebar";

const EditPrescriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const [search, setSearch] = useState();
  const searchResults = useSelector((state) => state.main.searchMedicineResults.content);
  const selectedPrescription = useSelector((state) => state.prescriptions.selectedElement);

  useEffect(() => {
    dispatch(fillCartPrescription(selectedPrescription.prescription));
  }, [selectedPrescription, dispatch]);

  const [radioValue, setRadioValue] = useState("medicineName");
  const radios = [
    { name: "Nome commerciale", value: "medicineName" },
    { name: "Principio attivo", value: "activeIngredient" },
  ];

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearchMedicine(token, search, radioValue));
  };

  useEffect(() => {
    dispatch(fetchSearchMedicine(token, search, radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const [diagnosticQuestion, setDiagnosticQuestion] = useState("");
  const [priority, setPriority] = useState("");
  const [prescriptionTypology, setPrescriptionTypology] = useState("");
  const cartPrescription = useSelector((state) => state.prescriptions.cartPrescription);

  const handleAprrovePrescription = () => {
    dispatch(
      ApprovePrescription(
        token,
        selectedPrescription.prescriptionID,
        diagnosticQuestion,
        priority,
        prescriptionTypology,
        cartPrescription
      )
    );
  };

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />

          <Col className='p-md-5 p-4'>
            <Row className='text-center'>
              <TopTogglebar openSidebar={openSidebar} />
              <h4>
                Ricetta medica di{" "}
                {selectedPrescription && selectedPrescription.patient.name + " " + selectedPrescription.patient.surname}
              </h4>
            </Row>
            <Row className='flex-column-reverse flex-md-row'>
              <Col md={8}>
                <Prescription
                  data={selectedPrescription}
                  handleShow={handleShow}
                  handleCloseCart={handleCloseCart}
                  handleShowCart={handleShowCart}
                />
              </Col>
              <Col md={4}>
                <Form onSubmit={handleSubmitSearch} className='d-flex p-3' id='search-form'>
                  <Form.Control
                    type='input'
                    placeholder='Cerca medicina'
                    className='rounded-start-4 rounded-end-0 shadow-sm'
                    aria-label='Search'
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type='submit' className='rounded-end-4 rounded-start-0 bg-white text-dark border-0 shadow-sm'>
                    <FaSearch />
                  </Button>
                </Form>

                <Row>
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
                  {searchResults &&
                    searchResults.map((medicine, index) => <MedicineCard data={medicine} key={index} />)}
                  <CartPrescription
                    show={showCart}
                    handleCloseCart={handleCloseCart}
                    user='doctor'
                    handleAprrovePrescription={handleAprrovePrescription}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <PrescriptionModal
        show={showModal}
        handleClose={handleClose}
        diagnosticQuestion={diagnosticQuestion}
        setDiagnosticQuestion={setDiagnosticQuestion}
        priority={priority}
        setPriority={setPriority}
        prescriptionTypology={prescriptionTypology}
        setPrescriptionTypology={setPrescriptionTypology}
      />
    </>
  );
};
export default EditPrescriptionPage;
