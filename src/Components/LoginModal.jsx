import { useState } from "react";
import { Button, Col, Form, Modal, Nav, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/actions/authenticationActions";
import { useNavigate } from "react-router-dom";
const LoginModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const error = useSelector((state) => state.error.messageError);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const destination = await dispatch(fetchLogin(email, password));
      if (destination) {
        setIsLogged(true);
        setTimeout(() => navigate(destination), 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = () => {
    props.handleClose();
  };
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
          <Form onSubmit={handleSubmit}>
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
                  autoComplete='username'
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
                  autoComplete='current-password'
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
              {isLogged && <span className='text-success'>Login effettuato con successo!</span>}
              {error && error}

              <p>
                Non hai un account?{" "}
                <span className='text-primary pointer' onClick={handleRegister}>
                  Registrati
                </span>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
