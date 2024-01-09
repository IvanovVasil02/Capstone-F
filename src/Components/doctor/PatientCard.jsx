import { Card, Col } from "react-bootstrap";
import { deselectElement, selectPatient } from "../../redux/actions/prescriptionsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { PiFolderSimplePlusLight } from "react-icons/pi";

const PatientCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(selectPatient(data));
    dispatch(deselectElement());
    navigate("/editPrescription/create");
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
              <CiSquarePlus className='fs-2 pointer d-block' onClick={handleClick} />
              <PiFolderSimplePlusLight className='fs-2 pointer' />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
export default PatientCard;
