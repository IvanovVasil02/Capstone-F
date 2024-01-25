import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrescriptionModal from "./PrescriptionModal";
import MedicineCard from "../patient/MedicineCard";
import { fetchSearchMedicine } from "../../redux/actions/mainActions";
import Prescription from "./Prescription";
import {
  ApprovePrescription,
  createPrescription,
  fillCartPrescription,
} from "../../redux/actions/prescriptionsActions";
import CartPrescription from "../CartPrescription";
import TopTogglebar from "../TopTogglebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const EditPrescriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.savedToken);
  const role = useSelector((state) => state.user.currentUser.role);
  const [showSidebar, setShowSidebar] = useState(false);
  const { actionType } = useParams();

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
  const [search, setSearch] = useState();
  const searchResults = useSelector((state) => state.main.searchMedicineResults?.content || 0);
  const selectedPrescription = useSelector((state) => state.prescriptions?.selectedElement || 0);
  const selectedPatient = useSelector((state) => state.prescriptions?.selectedPatient || 0);

  useEffect(() => {
    if (role === "DOCTOR" && selectedPrescription && selectedPrescription.prescription) {
      dispatch(fillCartPrescription(selectedPrescription.prescription));
    }

    if (token === null || role !== "DOCTOR") {
      navigate("/");
    }
  }, [token, selectedPrescription, dispatch, navigate, role]);

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
    if (token && role === "DOCTOR") {
      dispatch(fetchSearchMedicine(token, search, radioValue));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, token, navigate, role]);
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

  const handleApprovePrescription = () => {
    if (selectedPatient && actionType === "create") {
      dispatch(
        createPrescription(
          token,
          selectedPatient.patientId,
          diagnosticQuestion,
          priority,
          prescriptionTypology,
          cartPrescription
        )
      );
    } else if (selectedPrescription && actionType === "approve") {
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
    }
  };

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <div className='text-center d-flex align-items-center p-1'>
              <Link to='/pendingPrescriptions' className='text-dark'>
                <BsArrowLeftCircle className='fs-4 me-2' />
              </Link>
              <h4 className='mb-0'>
                Ricetta medica di{" "}
                {selectedPrescription
                  ? selectedPrescription.patient
                    ? selectedPrescription.patient.name + " " + selectedPrescription.patient.surname
                    : selectedPatient.name + " " + selectedPatient.surname
                  : "Nome Paziente non disponibile"}
              </h4>
            </div>
            <Row className='flex-column-reverse flex-md-row'>
              <Col md={8}>
                {selectedPrescription ? (
                  <Prescription
                    data={selectedPrescription}
                    handleShow={handleShow}
                    handleCloseCart={handleCloseCart}
                    handleShowCart={handleShowCart}
                    userRole='DOCTOR'
                  />
                ) : (
                  <Prescription
                    data={selectedPatient}
                    handleShow={handleShow}
                    handleCloseCart={handleCloseCart}
                    handleShowCart={handleShowCart}
                    userRole='DOCTOR'
                  />
                )}
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
                    handleApprovePrescription={handleApprovePrescription}
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
