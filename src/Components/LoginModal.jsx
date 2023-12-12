import { useState } from "react";
import { Button, Col, Form, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";
const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Modal size='md' show={props.show} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              Bentornato in{" "}
              <Navbar.Brand href='#home' className='logo-container'>
                <span>Auto</span>
                <span>Ricetta</span>
                <BsClipboardHeart />
              </Navbar.Brand>
            </h3>
            <BsX className='close-btn ms-auto' onClick={props.handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row id='login-form' className='mb-3 justify-content-center g-4'>
              <Form.Group as={Col} md='10' className='text-center border-1'>
                <Form.Control
                  required
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md='10' className='text-center'>
                <Form.Control
                  required
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Col md={10} className='d-flex align-items-center justify-content-between'>
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                  id={`default-checkbox`}
                  label={`Ricorda mi`}
                />
                <Nav.Link href='#home' className='text-primary'>
                  <h6>Password dimeticata</h6>
                </Nav.Link>
              </Col>
            </Row>

            <div className='d-flex justify-content-center gap-4 mt-5 flex-column align-items-center'>
              <Button type='submit' className='btn-login w-50'>
                Invio
              </Button>

              <span className='d-flex'>
                Non hai un account?{" "}
                <Nav.Link href='#home' className='text-primary'>
                  <small>Registrati</small>
                </Nav.Link>
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
