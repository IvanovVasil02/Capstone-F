import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import LoginModal from "./LoginModal";
import { useState } from "react";
const Topbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <div>
        <Navbar expand='lg' className='bg-transparent shadow-sm' id='topbar'>
          <Container>
            <Navbar.Brand href='#home' className='logo-container'>
              <span>Auto</span>
              <span>Ricetta</span>
              <BsClipboardHeart />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto text-center d-flex justify-content-center align-items-center'>
                <Nav.Link href='#home' className='text-dark '>
                  Home
                </Nav.Link>
                <Nav.Link href='#link' className='text-dark '>
                  Medicine
                </Nav.Link>
                <Nav.Link href='#link' className='text-dark '>
                  Ricette
                </Nav.Link>
                <Nav.Link href='#home' className='text-dark '>
                  Nuova ricetta
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
      </div>
      <LoginModal test='ciao' show={showModal} handleShow={handleShow} handleClose={handleClose} />
    </>
  );
};
export default Topbar;
