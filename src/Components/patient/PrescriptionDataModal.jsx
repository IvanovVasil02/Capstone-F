import { Modal, Navbar } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";
import Prescription from "../doctor/Prescription";

const PrescriptionDataModal = (props) => {
  return (
    <>
      <Modal size='lg' show={props.showPrescriptionModal} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              <Navbar.Brand href='#home' className='logo-container'>
                <span>Auto</span>
                <span>Ricetta</span>
                <BsClipboardHeart />
              </Navbar.Brand>
            </h3>
            <BsX className='close-btn ms-auto' onClick={props.handleClosePrescriptionModal} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Prescription data={props.selectedPrescription} userRole={props.userRole} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PrescriptionDataModal;
