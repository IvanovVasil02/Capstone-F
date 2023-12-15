import { Col, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsJournalMedical } from "react-icons/bs";

const Sidebar = () => {
  // const currentUser = useSelector((state) => state.main.currentUser);
  return (
    <>
      <Col md={2} className='p-4 shadow-sm d-flex flex-column justify-content-between' id='sidebar'>
        <div>
          <Navbar.Brand href='#home' className='logo-container'>
            <span>Auto</span>
            <span>Ricetta</span>
            <BsClipboardHeart />
          </Navbar.Brand>
          <hr />
          <Nav.Link href='#home' className='text-dark fw-medium '>
            <AiOutlineHome />
            Home
          </Nav.Link>
          <hr />{" "}
          <Nav.Link href='#home' className='text-dark fw-medium'>
            <MdOutlineEditCalendar /> Appuntamenti
          </Nav.Link>
          <hr />{" "}
          <Nav.Link href='#home' className='text-dark fw-medium'>
            <BsJournalMedical />
            Ricette
          </Nav.Link>
          <hr />
          <Nav.Link href='#home' className='text-dark fw-medium'>
            <MdOutlineMedicalServices />
            Nova ricetta
          </Nav.Link>
          <hr />
        </div>
        <div>
          <hr />{" "}
          <Nav.Link href='#home' className='text-dark'>
            Logout
          </Nav.Link>
        </div>
      </Col>
    </>
  );
};
export default Sidebar;
