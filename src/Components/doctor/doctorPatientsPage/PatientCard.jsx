import { Card, Col } from "react-bootstrap";
import { clearCart, deselectElement, selectPatient } from "../../../redux/actions/prescriptionsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { PiFolderSimplePlusLight } from "react-icons/pi";

const PatientCard = ({ data, handleShowPatientDataModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreatePrescription = () => {
    dispatch(selectPatient(data));
    dispatch(deselectElement());
    dispatch(clearCart());
    navigate("/editPrescription/create");
  };
  const handleShowPatientData = () => {
    dispatch(selectPatient(data));
    dispatch(deselectElement());
    dispatch(clearCart());
    handleShowPatientDataModal();
  };
  return (
    <>
      <Col className='p-0 py-2'>
        <Card className='p-3'>
          <Card.Body className='d-flex'>
            <div>
              <div className='d-flex'>
                <p className='pe-2'>Nome e cognome:</p>
                <span>{data.name + " " + data.surname}</span>
              </div>{" "}
              <div className='d-flex'>
                <p className='pe-2'>data di nascita:</p>
                <span>{data.birthDate}</span>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Codice fiscale:</p>
                <span>{data.fiscalCode}</span>
              </div>{" "}
              <div className='d-flex'>
                <p className='pe-2'>Indirizzo:</p>
                <span>{data.address}</span>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Recapito telefonico:</p>
                <span>{data.phoneNumber}</span>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Email:</p>
                <span>{data.email}</span>
              </div>
            </div>
            <div className='ms-auto'>
              <CiSquarePlus className='fs-2 pointer d-block' onClick={handleCreatePrescription} />
              <PiFolderSimplePlusLight className='fs-2 pointer' onClick={handleShowPatientData} />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
export default PatientCard;
