import { Button, Col, Container, Row } from "react-bootstrap";
import RegisterModal from "./RegisterModal";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container fluid className='mt-5'>
        <Row>
          <Col md={12} className='p-0'>
            <div className='header p-4'>
              <div className=' d-flex flex-column align-items-start justify-content-center min-vh-100'>
                <div>
                  <h1>Servire la tua esigienza</h1>
                  <h1>di salute è la nostra</h1>
                  <h1>priorità!</h1>
                </div>

                <p className='pt-5 pb-2 w-50 text-white'>
                  Non c&apos;è niente di più importante della nostra salute, perché è il nostro principale capitale per
                  il nostro buon futuro
                </p>
                <div className='d-flex justify-content-center w-50'>
                  <Button className='btn-login my-5' onClick={handleShow}>
                    Registrati
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <RegisterModal show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};
export default Header;
