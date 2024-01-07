import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/authenticationActions";

const RegisterModal = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctors, setDoctors] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);
  const errors = useSelector((state) => state.error.messageError);

  const hadnleCloseSecondModal = () => setShowSecondModal(false);
  const hadnleShowSecondModal = () => {
    setShowSecondModal(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(registerUser(name, surname, birthDate, address, sex, postalCode, email, password, phoneNumber, doctor));
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3001/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Errore durante il recupero dei dottori", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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
          <Form onSubmit={handleSubmit}>
            <div className={showSecondModal ? "d-none" : ""}>
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
                      value={"M"}
                      name='group1'
                      type='radio'
                      className='text-secondary'
                      id={`inline-radio-1`}
                      onChange={(e) => setSex(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label='F'
                      value={"F"}
                      name='group1'
                      type='radio'
                      className='text-secondary'
                      id={`inline-radio-2`}
                      onChange={(e) => setSex(e.target.value)}
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
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Control
                    required
                    type='text'
                    placeholder='Cap comune di residenza'
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                </Form.Group>{" "}
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
                    autoComplete='username'
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
                    autoComplete='new-password'
                  />
                </Form.Group>
                <Form.Group as={Col} md='10' className='text-center border-1'>
                  <Form.Select
                    aria-label='Default select example'
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  >
                    <option>Seleziona Dottore</option>
                    {doctors &&
                      doctors.map((doctor, index) => (
                        <option value={doctor.doctorId} key={index}>
                          {doctor.name + " " + doctor.surname}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>{" "}
              </Row>
              <div className='d-flex justify-content-center gap-3 mt-5 flex-column align-items-center'>
                <Button type='button' className='btn-login w-50' onClick={hadnleCloseSecondModal}>
                  Indietro
                </Button>
                <Button type='submit' className='btn-login w-50'>
                  Invio
                </Button>

                {errors &&
                  Array.isArray(errors) &&
                  errors.map((item, index) => (
                    <p className='text-danger' key={index}>
                      {item}
                    </p>
                  ))}

                <p>
                  Sei già registrato?
                  <span className='text-primary pointer' onClick={props.handleClose}>
                    Login
                  </span>
                </p>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RegisterModal;
