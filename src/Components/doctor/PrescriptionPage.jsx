import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { useSelector } from "react-redux";
import PrescriptionCard from "./PrescriptionCard";

const PrescriptionPage = () => {
  const [search, setSearch] = useState();
  const pendignPrescriptions = useSelector((state) => state.prescriptions.pendingPrescriptions.content);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };
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
                    <h3 className='fw-light mb-4'>Gestione ricette mediche</h3>
                    <h6 className='w-50 text-center'>
                      Benvenuto nella sezione dedicata alla gestione delle ricette mediche. Qui puoi esaminare tutte le
                      ricette e prendere decisioni rapide.
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
            <Row>
              <Col sm={12}>
                {pendignPrescriptions &&
                  pendignPrescriptions.map((prescription, index) => (
                    <PrescriptionCard data={prescription} key={index} />
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PrescriptionPage;
