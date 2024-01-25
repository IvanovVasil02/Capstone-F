import { Button, ButtonGroup, Col, Container, Form, Nav, Row, ToggleButton } from "react-bootstrap";
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
import { BsArrowLeftCircle, BsX } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { VscPreview } from "react-icons/vsc";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import PrescriptionDataModal from "../patient/PrescriptionDataModal";

const EditPrescriptionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionType } = useParams();

  const token = useSelector((state) => state.user.savedToken);
  const role = useSelector((state) => state.user.currentUser.role);
  const [search, setSearch] = useState();
  const selectedPrescription = useSelector((state) => state.prescriptions?.selectedElement || 0);
  const selectedPatient = useSelector((state) => state.prescriptions?.selectedPatient || 0);
  const [diagnosticQuestion, setDiagnosticQuestion] = useState("");
  const [priority, setPriority] = useState("");
  const [prescriptionTypology, setPrescriptionTypology] = useState("");
  const searchResults = useSelector((state) => state.main.searchMedicineResults?.content || 0);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearchMedicine(token, search, radioValue));
  };

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

  const [radioValue, setRadioValue] = useState("medicineName");
  const radios = [
    { name: "Nome commerciale", value: "medicineName" },
    { name: "Principio attivo", value: "activeIngredient" },
  ];
  useEffect(() => {
    if (token && role === "DOCTOR") {
      dispatch(fetchSearchMedicine(token, search, radioValue));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, token, navigate, role]);

  useEffect(() => {
    if (role === "DOCTOR" && selectedPrescription && selectedPrescription.prescription) {
      dispatch(fillCartPrescription(selectedPrescription.prescription));
    }

    if (token === null || role !== "DOCTOR") {
      navigate("/");
    }
  }, [token, selectedPrescription, dispatch, navigate, role]);

  const cartPrescription = useSelector((state) => state.prescriptions.cartPrescription);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const [showSearch, setShowSearch] = useState(true);
  const handleCloseSearch = () => setShowSearch(false);
  const handleShowSearch = () => setShowSearch(true);

  const lastApprovedPrescription = useSelector((state) =>
    actionType === "approve"
      ? state.prescriptions.prescriptionList.page.content.find(
          (prescription) => prescription.patient.patientId === selectedPrescription.patient.patientId
        )
      : state.prescriptions.prescriptionList.page.content.find(
          (prescription) => prescription.patient.patientId === selectedPatient.patientId
        )
  );
  const [showLastPrescription, setShowLastPrescription] = useState(false);
  const handleCloseLastPrescription = () => setShowLastPrescription(false);
  const handleShowLastPrescription = () => setShowLastPrescription(true);

  const handleClickNavItem = (evt) => {
    console.log(evt.currentTarget.getAttribute("data-state"));
    let actionName = evt.currentTarget.getAttribute("data-state");
    switch (actionName) {
      case "showSearch":
        handleShowSearch();
        handleCloseCart();
        handleCloseLastPrescription();
        break;
      case "showLastPrescription":
        handleShowLastPrescription();
        handleCloseSearch();
        handleCloseCart();
        break;
      case "showCart":
        handleShowCart();
        handleCloseSearch();
        handleCloseLastPrescription();
        break;
    }
  };

  const [showPrescriptionDataModal, setPrescriptionDataModal] = useState(false);
  const handleClosePrescriptionDataModal = () => setPrescriptionDataModal(false);
  const handleShowPrescriptionDataModal = () => setPrescriptionDataModal(true);

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
              <Link to='/doc/prescriptions/pending-prescription' className='text-dark'>
                <BsArrowLeftCircle className='fs-4 me-2' />
              </Link>
              <h4 className='mb-0'>
                Ricetta medica di
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
                    dinamicPrescription={true}
                  />
                ) : (
                  <Prescription
                    data={selectedPatient}
                    handleShow={handleShow}
                    handleCloseCart={handleCloseCart}
                    handleShowCart={handleShowCart}
                    userRole={role}
                    dinamicPrescription={true}
                  />
                )}
              </Col>
              <Col md={4}>
                <Nav variant='underline' defaultActiveKey='/home' className='pb-3 justify-content-center text-center'>
                  <Nav.Item className='w-25'>
                    <Nav.Link
                      className={`text-dark ${showSearch && "active"}`}
                      onClick={(e) => handleClickNavItem(e)}
                      data-state='showSearch'
                    >
                      <IoIosSearch />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='w-25'>
                    <Nav.Link
                      className={`text-dark ${showLastPrescription && "active"}`}
                      onClick={(e) => handleClickNavItem(e)}
                      data-state='showLastPrescription'
                    >
                      <VscPreview />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='w-25' onClick={handleShowCart}>
                    <Nav.Link
                      className={`text-dark ${showCart && `active`}`}
                      onClick={(e) => handleClickNavItem(e)}
                      data-state='showCart'
                    >
                      <LiaNotesMedicalSolid />
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div className={`search-container ${showSearch ? `` : `d-none`}`}>
                  <div className='d-flex justify-content-between align-items-center'>
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
                    <BsX className='close-btn fs-3' />
                  </div>
                  <Form onSubmit={handleSubmitSearch} className='d-flex py-3' id='search-form'>
                    <Form.Control
                      type='input'
                      placeholder='Cerca medicina'
                      className='rounded-start-4 rounded-end-0 shadow-sm'
                      aria-label='Search'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      type='submit'
                      className='rounded-end-4 rounded-start-0 bg-white text-dark border-0 shadow-sm'
                    >
                      <FaSearch />
                    </Button>
                  </Form>

                  <div className='medicine-wrapper'>
                    {searchResults &&
                      searchResults.map((medicine, index) => <MedicineCard data={medicine} key={index} />)}
                  </div>
                </div>
                <CartPrescription
                  show={showCart}
                  handleCloseCart={handleCloseCart}
                  user='doctor'
                  handleApprovePrescription={handleApprovePrescription}
                />
                <Prescription
                  data={lastApprovedPrescription}
                  handleShow={handleShowPrescriptionDataModal}
                  userRole={role}
                  sizeMini={true}
                  showPreview={showLastPrescription}
                />
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
      <PrescriptionDataModal
        handleClosePrescriptionModal={handleClosePrescriptionDataModal}
        showPrescriptionModal={showPrescriptionDataModal}
        userRole={role}
        data={lastApprovedPrescription}
      />
    </>
  );
};
export default EditPrescriptionPage;
