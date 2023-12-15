import { Col, Row } from "react-bootstrap";

const PatientsHome = () => {
  return (
    <>
      <Row>
        <Col md={12} id='dashboard-header' className='p-0'>
          <div className='dashboard-img-container'></div>
          <div className='w-100 p-5'>
            <div className='d-flex flex-column align-items-center offset-2'>
              <h3 className='fw-light mb-4'>Benvenuta nella tua dashboard , Pina Miteva</h3>
              <h6 className='w-50 text-center'>
                Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui per
                rendere il tuo percorso di cura più accessibile e informativo.
              </h6>
            </div>
          </div>
        </Col>
      </Row>
      <Row className='column-gap-4 py-4'>
        <Col className='p-0'>
          <div className='statistics-box'>
            <h5>Ricette</h5>
            <img
              width='50'
              height='50'
              src='https://img.icons8.com/ios/50/72839c/treatment-plan--v1.png'
              alt='treatment-plan--v1'
            />
            <h5 className='text-dark'>56</h5>
          </div>
        </Col>
        <Col className='p-0'>
          <div className='statistics-box'>
            <h5>Appuntamenti</h5>
            <img
              width='50'
              height='50'
              src='https://img.icons8.com/ios/50/72839c/tear-off-calendar--v1.png'
              alt='tear-off-calendar--v1'
            />
            <h5 className='text-dark'>56</h5>
          </div>
        </Col>
        <Col className='p-0'>
          <div className='statistics-box'>
            <h5>In Attesa</h5>
            <img
              width='50'
              height='50'
              src='https://img.icons8.com/ios/50/72839c/treatment-list.png'
              alt='treatment-list'
            />
            <h5 className='text-dark'>56</h5>
          </div>
        </Col>
      </Row>
      <Row className='data-container p-4 gap-5'>
        <Col className='profile-data p-2'>
          <div className='d-flex justify-content-center p-4'>
            <h5>Il mio profilo</h5>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Nome e cognome:</p>
            <p>Miteva pina</p>
          </div>{" "}
          <div className='d-flex justify-content-between'>
            <p>Data di nascita:</p>
            <p>08/02/1980</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Indirizzo:</p>
            <p>Via Atonio Maria Curcio, 28</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Recapito telefonico:</p>
            <p>+39 327 566 4554</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Email:</p>
            <p>mitevapina20@gmail.com</p>
          </div>
        </Col>
        <Col className='profile-data p-2'>
          <div className='d-flex justify-content-center p-4'>
            <h5>Il mio dottore</h5>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Nome e cognome:</p>
            <p>Miteva pina</p>
          </div>{" "}
          <div className='d-flex justify-content-between'>
            <p>Data di nascita:</p>
            <p>08/02/1980</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Indirizzo:</p>
            <p>Via Atonio Maria Curcio, 28</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Recapito telefonico:</p>
            <p>+39 327 566 4554</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Email:</p>
            <p>mitevapina20@gmail.com</p>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default PatientsHome;
