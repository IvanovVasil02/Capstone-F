import { Card } from "react-bootstrap";

const dataCard = ({ data }) => {
  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-3'>
          <Card.Body className='d-flex'>
            <div>
              <div className='d-flex'>
                <p className='pe-2'>Nome e cognome:</p>
                <p>{data.name + " " + data.surname}</p>
              </div>{" "}
              <div className='d-flex'>
                <p className='pe-2'>data di nascita:</p>
                <p>{data.birthDate}</p>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Indirizzo:</p>
                <p>{data.address}</p>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Recapito telefonico:</p>
                <p>{data.phoneNumber}</p>
              </div>
              <div className='d-flex'>
                <p className='pe-2'>Email:</p>
                <p>{data.email}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default dataCard;
