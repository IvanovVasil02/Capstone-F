import { Card } from "react-bootstrap";

const MedicineCard = () => {
  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-3'>
          <Card.Body className='d-flex justify-content-between'>
            <div>
              <Card.Title>ACARBOSIO*40 cpr 100 mg</Card.Title>

              <p>
                Principio attivo:<span> Acamprosato</span>
              </p>
              <p>
                Titolare AIC:<span> BRUNO FARMACEUTICI SpA</span>
              </p>
              <p>
                Codice AIC:<span> 034208013</span>
              </p>
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <img
                width='30'
                height='30'
                src='https://img.icons8.com/ios/50/72839c/plus-2-math.png'
                alt='plus-2-math'
              />
              <span>€ 5,63</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default MedicineCard;
