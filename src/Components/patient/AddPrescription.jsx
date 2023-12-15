import { Button, Col, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import CartPrescription from "./CartPrescription";
const AddPrescription = () => {
  return (
    <>
      {" "}
      <Row className='sticky-top'>
        <Col md={12} id='dashboard-header' className='p-0'>
          <div className='dashboard-img-container'></div>
          <div className='w-100 p-4'>
            <div className='d-flex flex-column align-items-center offset-2'>
              <h3 className='fw-light mb-2'>Benvenuta nella tua dashboard , Pina Miteva</h3>
              <h6 className='w-75 text-center'>
                Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui per
                rendere il tuo percorso di cura più accessibile e informativo.
              </h6>
              <Form className='d-flex p-3' id='search-form'>
                <Form.Control
                  type='input'
                  placeholder='Cerca medicina'
                  className='rounded-start-4 rounded-end-0'
                  aria-label='Search'
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
        <Col md={7} className='p-0 pe-3'>
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
          <MedicineCard />
        </Col>{" "}
        <Col md={5} className='p-0 '>
          <CartPrescription />
        </Col>
      </Row>
    </>
  );
};
export default AddPrescription;
