import { Button, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsJournalMedical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPeople } from "react-icons/bs";
import { useEffect, useRef } from "react";
import { MdOutlineSensorDoor } from "react-icons/md";
import { BsXCircle } from "react-icons/bs";
import { logout } from "../redux/actions/authenticationActions";

// import { useDispatch } from "react-redux";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.currentUser?.role || 0);
  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const divRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        props.closeSidebar();
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className={`shadow-sm  z-3 bg-white d-flex flex-column col-10 col-md-2  min-vh-100 ${
          !props.show ? "d-none" : "position-absolute fixed-start"
        } d-md-inline`}
        id='sidebar'
      >
        <div className='d-flex align-items-center'>
          <Navbar.Brand className='logo-container'>
            <span>Auto</span>
            <span>Ricetta</span>
            <BsClipboardHeart />
          </Navbar.Brand>
          <Button className='bg-transparent text-dark border-0 ms-auto ' onClick={() => props.closeSidebar()}>
            <BsXCircle className={`fs-2 ms-5 ${!props.show && "d-none"}`} />
          </Button>
        </div>
        <hr />
        <ul className='nav nav-pills flex-column'>
          <li className='nav-item fw-medium'>
            {role !== "DOCTOR" ? (
              <Link to='/dashboard' className='nav-link text-black'>
                <AiOutlineHome />
                <span>Home</span>
              </Link>
            ) : (
              <Link to='/doc-dashboard' className='nav-link text-black'>
                <AiOutlineHome />
                <span>Home</span>
              </Link>
            )}
            <hr />{" "}
          </li>
          <li className='nav-item fw-medium'>
            {role === "DOCTOR" ? (
              <Link to='/doc-appointments' className='nav-link text-black'>
                <MdOutlineEditCalendar /> <span>Appuntamenti</span>
              </Link>
            ) : (
              <Link to='/appointments' className='nav-link text-black'>
                <MdOutlineEditCalendar /> <span>Appuntamenti</span>
              </Link>
            )}
            <hr />{" "}
          </li>
          <li className='nav-item fw-medium'>
            <Link to='/prescriptions' className='nav-link text-black'>
              <BsJournalMedical />
              <span> Ricette</span>
            </Link>
            <hr />
          </li>
          <li className='nav-item fw-medium'>
            {role === "PATIENT" && (
              <>
                <Link to='/addPrescription' className='nav-link text-black'>
                  <MdOutlineMedicalServices />
                  <span> Nova ricetta</span>
                </Link>
                <hr />
              </>
            )}
          </li>
          <li className='nav-item fw-medium'>
            {role === "DOCTOR" && (
              <>
                <Link to='/patients' className='nav-link text-dark'>
                  <BsPeople />
                  <span>Pazienti</span>
                </Link>
                <hr />
              </>
            )}
          </li>
          <li className='nav-item fw-medium mt-auto'>
            <Nav.Link className='text-dark align-items-center'>
              <MdOutlineSensorDoor /> <span onClick={handlelogout}>Logout</span>
            </Nav.Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
