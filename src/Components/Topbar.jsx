import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
const Topbar = () => {
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
                <Nav.Link href='#home' className='text-dark fw-bold'>
                  Home
                </Nav.Link>
                <Nav.Link href='#link' className='text-dark fw-bold'>
                  Medicine
                </Nav.Link>
                <Nav.Link href='#link' className='text-dark fw-bold'>
                  Ricette
                </Nav.Link>
                <Nav.Link href='#home' className='text-dark fw-bold'>
                  Nuova ricetta
                </Nav.Link>
                <Nav.Link href='#home' className='text-white fw-bold text-decoration-none'>
                  <Button className='btn-login border-0'>Login</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default Topbar;
