import { Col, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsJournalMedical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPeople } from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import { LOGOUT } from "../../redux/actions/authenticationActions";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.currentUser.role);

  const handlelogout = () => {
    // dispatch(LOGOUT);
    navigate("/");
  };

  return (
    <>
      <Col md={2} className='p-4 shadow-sm d-flex flex-column justify-content-between' id='sidebar'>
        <div>
          <Navbar.Brand className='logo-container'>
            <span>Auto</span>
            <span>Ricetta</span>
            <BsClipboardHeart />
          </Navbar.Brand>
          <hr />
          <Nav.Item className='text-dark fw-medium '>
            {role !== "DOCTOR" ? (
              <Link to='/dashboard' className='nav-link'>
                <AiOutlineHome />
                Home
              </Link>
            ) : (
              <Link to='/doc-dashboard' className='nav-link'>
                <AiOutlineHome />
                Home
              </Link>
            )}
          </Nav.Item>
          <hr />{" "}
          <Nav.Item className='text-dark fw-medium'>
            <Link to='/appointments' className='nav-link'>
              <MdOutlineEditCalendar /> Appuntamenti
            </Link>
          </Nav.Item>
          <hr />{" "}
          <Nav.Item className='text-dark fw-medium'>
            <Link className='nav-link'>
              <BsJournalMedical />
              Ricette
            </Link>
          </Nav.Item>
          <hr />
          <Nav.Item className='text-dark fw-medium'>
            <Link to='/addPrescription' className='nav-link'>
              <MdOutlineMedicalServices />
              Nova ricetta
            </Link>
          </Nav.Item>
          <hr />
          {role === "DOCTOR" && (
            <Nav.Item className='text-dark fw-medium'>
              <Link to='/patients' className='nav-link'>
                <BsPeople />
                Pazienti
              </Link>
            </Nav.Item>
          )}
          <hr />
        </div>
        <div>
          <hr />{" "}
          <Nav.Item className='text-dark' onClick={() => handlelogout}>
            Logout
          </Nav.Item>
        </div>
      </Col>
    </>
  );
};
export default Sidebar;
