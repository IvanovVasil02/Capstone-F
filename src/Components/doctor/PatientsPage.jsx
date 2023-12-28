import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import { fetchSearchPatient } from "../../redux/actions/patientsDoctorActions";

const PatientsPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
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
  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={10}>
            <Row>
              <Col md={12} id='dashboard-header' className='p-0'>
                <div className='dashboard-img-container'></div>
                <div className='w-100 p-5'>
                  <div className='d-flex flex-column align-items-center offset-2'>
                    <h3 className='fw-light mb-4'>Gestione Pazienti</h3>
                    <h6 className='w-50 text-center'>
                      Benvenuto nella sezione di ricerca pazienti. Utilizza la barra di ricerca qui sotto per trovare
                      rapidamente le informazioni sui pazienti.
                    </h6>
                    <Form onSubmit={handleSubmitSearch} className='d-flex p-3' id='search-form'>
                      <Form.Control
                        type='input'
                        placeholder='Cerca medicina'
                        className='rounded-start-4 rounded-end-0'
                        aria-label='Search'
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button type='submit' className='rounded-end-4 rounded-start-0 bg-white text-dark border-0'>
                        <FaSearch />
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col md={6} className='p-0 pe-3'>
                <div>
                  <ButtonGroup>
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
                </div>
                {searchResults && searchResults.map((patient, index) => <PatientCard key={index} data={patient} />)}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PatientsPage;
