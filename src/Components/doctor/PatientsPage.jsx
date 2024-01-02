import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import { fetchSearchPatient } from "../../redux/actions/patientsDoctorActions";
import Hero from "../Hero";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };
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
    dispatch(fetchSearchPatient(token, search, radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  const getForm = () => {
    return (
      <Form onSubmit={handleSubmitSearch} className='d-flex p-3' id='search-form'>
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
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <Col className='p-md-5'>
            <Hero
              title='Gestionale pazienti'
              description='Benvenuto nella sezione di ricerca pazienti. Utilizza la barra di ricerca qui sotto per trovare
                      rapidamente le informazioni sui pazienti.'
              form={getForm()}
              openSidebar={openSidebar}
            />

            <ButtonGroup className='py-2'>
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

            {searchResults && searchResults.map((patient, index) => <PatientCard key={index} data={patient} />)}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PatientsPage;
