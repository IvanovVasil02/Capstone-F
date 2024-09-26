import { Button, Col, Container, Row } from "react-bootstrap";
import RegisterModal from "../loginComponents/RegisterModal";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <section id='hero' className='d-flex align-items-center'>
        <Container fluid>
          <Row>
            <Col sm={12} md={6}>
              <h1 className='text-center'> Prescrivi con semplicità: Autoricetta, il tuo compagno di salute</h1>
              <h2 className='pt-4 text-center'>
                Esplora un nuovo modo di gestire la tua salute con Autoricetta. Sia che tu sia un paziente in cerca di
                praticità nella prescrizione, o un medico desideroso di semplificare la tua pratica, Autoricetta è qui
                per te. Scopri un compagno di salute che unisce la facilità d&apos;uso alla precisione medica.
              </h2>
              <div className='d-flex justify-content-center'>
                <Button className='btn-login my-5' onClick={handleShow}>
                  Registrati
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <RegisterModal show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};
export default Header;
