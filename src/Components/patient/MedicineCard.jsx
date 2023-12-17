import { Card } from "react-bootstrap";

const MedicineCard = ({ data }) => {
  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-3'>
          <Card.Body className='d-flex justify-content-between'>
            <div>
              <Card.Title>{data.nameAndPackaging}</Card.Title>

              <p>
                Principio attivo:<span> {data.activeIngredient}</span>
              </p>
              <p>
                Titolare AIC:<span> {data.holderOfMarketingAuthorization}</span>
              </p>
              <p>
                Codice AIC:<span> {data.identificationCode}</span>
              </p>
            </div>
            <div className='d-flex flex-column justify-content-between'>
              <img
                width='30'
                height='30'
                src='https://img.icons8.com/ios/50/72839c/plus-2-math.png'
                alt='plus-2-math'
              />
              <span>€ {data.publicPrice}</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default MedicineCard;
