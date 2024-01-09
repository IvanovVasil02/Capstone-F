import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import LoginModal from "../LoginModal";
import { useState } from "react";
const Topbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <Navbar expand='md' className='bg-white shadow-sm fixed-top' id='topbar'>
        <Container fluid className='px-0 px-md-3'>
          <Navbar.Brand href='#home' className='logo-container px-2'>
            <span>Auto</span>
            <span>Ricetta</span>
            <BsClipboardHeart />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='me-2' />
          <Navbar.Collapse id='basic-navbar-nav' className='bg-white '>
            <Nav className='ms-auto text-center d-flex justify-content-center align-items-center'>
              <Nav.Link href='#home' className='text-dark '>
                Home
              </Nav.Link>
              <Nav.Link href='#link' className='text-dark '>
                Chi siamo
              </Nav.Link>
              <Nav.Link href='#home' className='text-dark '>
                Servizi
              </Nav.Link>
              <Nav.Link href='#link' className='text-dark '>
                Contatti
              </Nav.Link>
              <Nav.Link href='#home' className='text-white text-decoration-none'>
                <Button
                  className='btn-login border-0'
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Login
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showModal} handleShow={handleShow} handleClose={handleClose} />
    </>
  );
};
export default Topbar;
