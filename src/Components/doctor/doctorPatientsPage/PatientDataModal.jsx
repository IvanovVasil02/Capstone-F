import { Col, Container, Modal, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";

const PatientDataModal = (props) => {
  return (
    <>
      <Modal fullscreen={true} show={props.showPatientDataModal} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              <Navbar.Brand href='#home' className='logo-container'>
                <span>Auto</span>
                <span>Ricetta</span>
                <BsClipboardHeart />
              </Navbar.Brand>
            </h3>
            <BsX className='close-btn ms-auto' onClick={props.handleClosePatientDataModal} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col sm={2} className='border-end border-black p-0'>
                {props.data && (
                  <>
                    <p>
                      Nome e Cognome:{" "}
                      <span>
                        {props.data.name} {props.data.surname}
                      </span>
                    </p>{" "}
                    <p>
                      Data di nascita: <span>{props.data.birthDate}</span>
                    </p>{" "}
                    <p>
                      Codice fiscale: <span>{props.data.fiscalCode}</span>
                    </p>{" "}
                    <p>
                      Indirizzo: <span>{props.data.address}</span>
                    </p>
                    <p>
                      Località:{" "}
                      <span>
                        {props.data.municipalityDenomination} - {props.data.municipality}, {props.data.region}
                      </span>
                    </p>
                    <p>
                      Recapito telefonico: <span>{props.data.phoneNumber}</span>
                    </p>
                    <p>
                      Posta elettronica: <span>{props.data.email}</span>
                    </p>
                  </>
                )}
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PatientDataModal;
