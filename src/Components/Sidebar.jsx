import { Button, Col, Nav, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsJournalMedical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPeople } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { MdOutlineSensorDoor } from "react-icons/md";
import { BsXCircle } from "react-icons/bs";

// import { useDispatch } from "react-redux";
// import { LOGOUT } from "../../redux/actions/authenticationActions";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.currentUser.role);
  const handlelogout = () => {
    // dispatch(LOGOUT);
    navigate("/");
  };

  const divRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        props.closeSidebar();
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
        className={`shadow-sm d-flex flex-column col-10 col-md-2  min-vh-100 ${!props.show && "d-none"} d-md-inline`}
        id='sidebar'
      >
        <div className='d-flex align-items-center'>
          <Navbar.Brand className='logo-container'>
            <span>Auto</span>
            <span>Ricetta</span>
            <BsClipboardHeart />
          </Navbar.Brand>
          <Button className='bg-transparent text-dark border-0' onClick={() => props.closeSidebar()}>
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
            <Link to='/addPrescription' className='nav-link text-black'>
              <MdOutlineMedicalServices />
              <span> Nova ricetta</span>
            </Link>
            <hr />
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
            <Link to='/patients' className='nav-link text-dark align-items-center'>
              <MdOutlineSensorDoor /> <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
