import { Button, Col, Form, Modal, Navbar, Row } from "react-bootstrap";
import { BsClipboardHeart, BsX } from "react-icons/bs";

const PrescriptionModal = (props) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <>
      <Modal size='md' show={props.show} aria-labelledby='example-modal-sizes-title-sm'>
        <Modal.Header className='d-flex flex-column align-items-center justify-content-center'>
          <div className='d-flex align-items-center w-100'>
            <h3 className='fw-bold'>
              Bentornato in{" "}
              <Navbar.Brand href='#home' className='logo-container'>
                <span>Auto</span>
                <span>Ricetta</span>
                <BsClipboardHeart />
              </Navbar.Brand>
            </h3>
            <BsX className='close-btn ms-auto' onClick={props.handleClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row id='login-form' className='mb-3 flex-column justify-content-center g-4'>
              <Form.Group as={Col} md='12' className='text-center border-1'>
                <Form.Control
                  type='text'
                  placeholder='Quesito diagnostico(opzionale)'
                  value={props.diagnosticQuestion}
                  onChange={(e) => {
                    props.setDiagnosticQuestion(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} md='12' className='text-center'>
                <div key='inline-radio' className='d-flex justify-content-between align-items-center ' id='radio-cont'>
                  <Form.Label className='text-secondary m-0'>Tipo di ricetta(opzionale):</Form.Label>
                  <Form.Check
                    inline
                    label='S'
                    value={"S"}
                    name='typeRecipe'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-1`}
                    onChange={(e) => props.setPrescriptionTypology(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label='H'
                    value={"H"}
                    name='typeRecipe'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-2`}
                    onChange={(e) => props.setPrescriptionTypology(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group as={Col} md='12' className='text-center'>
                <div key='inline-radio' className='d-flex justify-content-between align-items-center ' id='radio-cont'>
                  <Form.Label className='text-secondary m-0'>Tipo di urgenza(opzionale):</Form.Label>
                  <Form.Check
                    inline
                    label='U'
                    value={"U"}
                    name='priority'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-3`}
                    onChange={(e) => props.setPriority(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label='B'
                    value={"B"}
                    name='priority'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-4`}
                    onChange={(e) => props.setPriority(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label='D'
                    value={"D"}
                    name='priority'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-5`}
                    onChange={(e) => props.setPriority(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label='P'
                    value={"P"}
                    name='priority'
                    type='radio'
                    className='text-secondary'
                    id={`inline-radio-6`}
                    onChange={(e) => props.setPriority(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Row>

            <div className='d-flex justify-content-center gap-4 mt-5 flex-column align-items-center'>
              <Button type='submit' className='btn-login w-50' onClick={props.handleClose}>
                Fatto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PrescriptionModal;
