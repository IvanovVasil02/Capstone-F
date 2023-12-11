import { Button, Col, Container, Row } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} className='p-0'>
            <div className='header'>
              <div className=' d-flex  flex-column align-items-start justify-content-center'>
                <div>
                  <h1>Servire la tua esigienza</h1>
                  <h1>di salute è la nostra</h1>
                  <h1>priorità!</h1>
                </div>

                <p className='pt-5 pb-2 w-50'>
                  Non c&apos;è niente di più importante della nostra salute, perché è il nostro principale capitale per
                  il nostro buon futuro
                </p>
                <div className='d-flex justify-content-center w-50'>
                  <Button className='btn-login my-5'>Registrati</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Header;
