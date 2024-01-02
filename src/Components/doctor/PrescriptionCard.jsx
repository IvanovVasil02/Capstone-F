import { Card } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectElement } from "../../redux/actions/prescriptionsActions";
import { useDispatch } from "react-redux";

const PrescriptionCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.userRole === "PATIENT") {
      props.setSelectedPrescription(props.data);
      props.handleShowPrescriptionModal();
    } else {
      dispatch(selectElement(props.data));
      navigate("/editPrescription");
    }
  };
  return (
    <>
      <Card className='p-0 mb-3'>
        <Card.Body className='d-flex align-items-center justify-content-between px-4'>
          <div>
            <p>
              Cognome e nome: <span>{props.data.patient.surname + " " + props.data.patient.name}</span>
            </p>
            <div className='d-flex justify-content-between gap-3 flex-column flex-md-row'>
              <p>
                props.Data: <span>{props.data.isssuingDate}</span>
              </p>
              <p>
                STATO: <span>{props.data.status === "PENDING" ? "IN ATTESA" : "APPROVATA"}</span>
              </p>
            </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center '>
            <img
              width='30'
              height='30'
              src='https://img.icons8.com/ios/50/circled-right.png'
              alt='circled-right'
              className='pointer'
              onClick={handleClick}
            />
            {props.userRole === "PATIENT" ? <span>Di più</span> : <span>Approva</span>}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default PrescriptionCard;
