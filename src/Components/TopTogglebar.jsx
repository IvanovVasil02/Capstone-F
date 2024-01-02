import { Button, Col, Navbar } from "react-bootstrap";
import { BsClipboardHeart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const TopTogglebar = (props) => {
  return (
    <Col className='d-flex justify-content-between align-items-center py-2 d-md-none'>
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
