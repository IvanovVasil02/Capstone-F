import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMedicine } from "../../redux/actions/prescriptionsActions";

const PatientCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleMedicine = (medicine) => {
    const medicineObject = {
      medicine: medicine,
      quantity: 1,
    };

    dispatch(addMedicine(medicineObject));
  };
  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-3'>
          <Card.Body className='d-flex justify-content-between'>
            <div>
              <div className='d-flex justify-content-between'>
                <p>Nome e cognome:</p>
                <p>{data.name + " " + data.surname}</p>
              </div>{" "}
              <div className='d-flex justify-content-between'>
                <p>Data di nascita:</p>
                <p>{data.birthDate}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Indirizzo:</p>
                <p>{data.address}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Recapito telefonico:</p>
                <p>{data.phoneNumber}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Email:</p>
                <p>{data.email}</p>
              </div>
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <img
                width='30'
                height='30'
                src='https://img.icons8.com/ios/50/72839c/plus-2-math.png'
                alt='plus-2-math'
                onClick={() => handleMedicine(data)}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default PatientCard;
