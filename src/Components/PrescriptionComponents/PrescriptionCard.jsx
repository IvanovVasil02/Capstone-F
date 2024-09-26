import { Card } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSelectedElement,
  fillCartPrescription,
  removeSelectedElement,
  selectElement,
} from "../../redux/actions/prescriptionsActions";
import { useDispatch } from "react-redux";
import { PiArrowCircleRightLight } from "react-icons/pi";
import { PiCheckCircleLight } from "react-icons/pi";
import { PiCheckCircleFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const PrescriptionCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formattedDate = format(new Date(props.data.issuingDate), "dd-MM-yyyy HH:mm");

  const [checked, setChecked] = useState(false);
  const handleCheckPrescription = () => (checked ? setChecked(false) : setChecked(true));

  const handleClick = () => {
    if (props.data.status === "APPROVED" || props.userRole === "PATIENT") {
      dispatch(selectElement(props.data));
      props.handleShowPrescriptionModal();
    } else if (
      props.location === "/doc/prescriptions" ||
      props.location === "/doc/prescriptions/pending-prescription"
    ) {
      dispatch(selectElement(props.data));
      dispatch(fillCartPrescription(props.data.prescription));
      navigate("/editPrescription/approve");
    }
  };

  const handleClickSelect = () => {
    dispatch(addSelectedElement(props.data.prescriptionID));
  };
  const handleClickDeselect = () => {
    dispatch(removeSelectedElement(props.data.prescriptionID));
  };

  useEffect(() => {
    props.selectAll && (setChecked(true), handleClickSelect());
    !props.selectAll && (setChecked(false), handleClickDeselect());
    !props.selectability && handleClickDeselect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectAll, props.selectability]);

  return (
    <>
      <Card className='p-0 mb-3'>
        <Card.Body className='d-flex align-items-center justify-content-between px-4'>
          <div className='d-flex flex-column flex-lg-row justify-content-between w-75'>
            <div>
              <p>
                Cognome e nome: <span>{props.data.patient.surname + " " + props.data.patient.name}</span>
              </p>
              <div className='d-flex justify-content-between gap-3 flex-column flex-md-row'>
                <p>
                  Data: <span>{formattedDate}</span>
                </p>
                <p>
                  STATO: <span>{props.data.status === "PENDING" ? "IN ATTESA" : "APPROVATA"}</span>
                </p>
              </div>
            </div>
            <div className='ps-lg-2 pt-2'>
              <p>PRESCRIZIONE:</p>
              {props.data.prescription.map((item, index) => (
                <p key={index}>
                  - {item.medicine.nameAndPackaging}({item.medicine.activeIngredient}) - {item.quantity} conf.
                </p>
              ))}
            </div>
          </div>
          <div className='d-flex gap-2'>
            {props.selectability && (
              <div
                className='d-flex flex-column justify-content-center align-items-center'
                onClick={handleCheckPrescription}
              >
                {checked ? (
                  <PiCheckCircleFill
                    className='pointer fs-2'
                    style={{ color: "#72839C" }}
                    onClick={() => handleClickDeselect()}
                  />
                ) : (
                  <PiCheckCircleLight
                    className='pointer fs-2'
                    style={{ color: "#72839C" }}
                    onClick={() => handleClickSelect()}
                  />
                )}
                {props.data.status === "PENDING" && props.userRole !== "PATIENT" && <span>Seleziona</span>}
              </div>
            )}

            <div className='d-flex flex-column justify-content-center align-items-center '>
              <PiArrowCircleRightLight className='pointer fs-2' onClick={handleClick} style={{ color: "#72839C" }} />
              {props.data.status === "APPROVED" || props.userRole === "PATIENT" ? (
                <span>Di più</span>
              ) : (
                <span>Approva</span>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default PrescriptionCard;
