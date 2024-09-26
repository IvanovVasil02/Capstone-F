import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../../Sidebar";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import { fetchSearchPatient } from "../../../redux/actions/patientsDoctorActions";

import Hero from "../../Hero";
import { useNavigate } from "react-router-dom";
import TopTogglebar from "../../TopTogglebar";
import PatientDataModal from "./PatientDataModal";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.savedToken);
  const role = useSelector((state) => state.user.currentUser.role);
  const [showPatientDataModal, setShowPatientDataModal] = useState(false);

  const handleShowPatientDataModal = () => setShowPatientDataModal(true);
  const handleClosePatientDataModal = () => setShowPatientDataModal(false);

  const selectedPatient = useSelector((state) => state.prescriptions.selectedPatient);

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

  const closeSidebar = () => setShowSidebar(false);

  const openSidebar = () => setShowSidebar(true);

  const [search, setSearch] = useState("");
  const [radioValue, setRadioValue] = useState("name");
  const radios = [
    { name: "Nome", value: "name" },
    { name: "Codice fiscale", value: "fiscalCode" },
  ];
  const searchResults = useSelector((state) => state.doctor.searchPatientResults.content);

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    dispatch(fetchSearchPatient(token, search, radioValue));
  };

  useEffect(() => {
    if (token && role === "DOCTOR") {
      dispatch(fetchSearchPatient(token, search, radioValue));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, navigate]);

  const getForm = () => {
    return (
      <Form onSubmit={handleSubmitSearch} className='d-flex p-3 z-2' id='search-form'>
        <Form.Control
          type='input'
          placeholder='Cerca paziente'
          className='rounded-start-4 rounded-end-0'
          aria-label='Search'
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type='submit' className='rounded-end-4 rounded-start-0 bg-white text-dark border-0'>
          <FaSearch />
        </Button>
      </Form>
    );
  };
  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Gestionale pazienti'
                description='Benvenuto nella sezione di ricerca pazienti. Utilizza la barra di ricerca qui sotto per trovare
                        rapidamente le informazioni sui pazienti.'
                form={getForm()}
              />
            </Row>

            <Row className='flex-column'>
              <h4 className='pt-3'>I miei pazienti</h4>
              <ButtonGroup className='py-2 py-3 px-0'>
                {radios.map((radio) => (
                  <ToggleButton
                    key={radio.value}
                    id={`radio-${radio.value}`}
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
                searchResults.map((patient, index) => (
                  <PatientCard key={index} data={patient} handleShowPatientDataModal={handleShowPatientDataModal} />
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <PatientDataModal
        showPatientDataModal={showPatientDataModal}
        handleClosePatientDataModal={handleClosePatientDataModal}
        data={selectedPatient}
      />
    </>
  );
};
export default PatientsPage;
