import { useState } from "react";
import { Button, Col, Form, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";

const RegisterModal = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);

  const hadnleCloseSecondModal = () => setShowSecondModal(false);
  const hadnleShowSecondModal = () => setShowSecondModal(true);

  return (
    <>
      <Modal size='md' show={props.show} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              Benvenuto in{" "}
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
            <div className={showSecondModal && "d-none"}>
              <Row id='login-form' className='mb-3 justify-content-center g-4'>
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Nome'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Cognome'
                    value={surname}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md='5' className='text-center border-1'>
                  <Form.Control
                    required
                    type='date'
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md='5' className='text-center'>
                  <div
                    key='inline-radio'
                    className='d-flex justify-content-between align-items-center '
                    id='radio-cont'
                  >
                    <Form.Label className='text-secondary m-0'>Sesso:</Form.Label>
                    <Form.Check
                      inline
                      label='M'
                      name='group1'
                      type='radio'
                      className='text-secondary'
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label='F'
                      name='group1'
                      type='radio'
                      className='text-secondary'
                      id={`inline-radio-2`}
                    />
                  </div>
                </Form.Group>
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Indirizzo'
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>{" "}
              <div className='d-flex justify-content-center gap-4 mt-5 flex-column align-items-center'>
                <Button type='button' className='btn-login w-50' onClick={hadnleShowSecondModal}>
                  Avanti
                </Button>

                <span className='d-flex'>
                  Sei già registrato?{" "}
                  <Nav.Link href='#home' className='text-primary'>
                    <small>Login</small>
                  </Nav.Link>
                </span>
              </div>
            </div>
            <div className={!showSecondModal && "d-none"}>
              <Row id='login-form' className='mb-3 justify-content-center g-4'>
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Comune di residenza'
                    value={municipality}
                    onChange={(e) => {
                      setMunicipality(e.target.value);
                    }}
                  />
                </Form.Group>{" "}
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Recapito telefonico'
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </Form.Group>
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
                </Form.Group>{" "}
                <Form.Group as={Col} md='10' className='text-center border-1'>
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
              </Row>
              <div className='d-flex justify-content-center gap-3 mt-5 flex-column align-items-center'>
                <Button type='button' className='btn-login w-50' onClick={hadnleCloseSecondModal}>
                  Indietro
                </Button>
                <Button type='button' className='btn-login w-50'>
                  Invio
                </Button>

                <span className='d-flex'>
                  Sei già registrato?{" "}
                  <Nav.Link href='#home' className='text-primary'>
                    <small>Login</small>
                  </Nav.Link>
                </span>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RegisterModal;
