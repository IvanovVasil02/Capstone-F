import { Button, Col, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const TopTogglebar = (props) => {
  return (
    <Col sm={12} className='d-flex justify-content-between align-items-center pt-2 d-md-none px-2 bg-white'>
      <Navbar.Brand className='logo-container '>
        <span>Auto</span>
        <span>Ricetta</span>
        <BsClipboardHeart />
      </Navbar.Brand>
      <Button type='button' className='bg-transparent text-dark border-dark' onClick={() => props.openSidebar()}>
        <FaBars className='fs-4' />
      </Button>
    </Col>
  );
};
export default TopTogglebar;
