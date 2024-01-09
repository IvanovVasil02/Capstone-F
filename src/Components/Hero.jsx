import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Hero = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Col md={12} id='dashboard-hero'>
        <div className='dashboard-img-container'></div>
        <div className='w-100 p-4 p-md-5'>
          <div className='d-flex flex-column align-items-center offset-md-2'>
            <h3 className='fw-light mb-4 text-center z-2 text-md-start'>
              {props.title} {props.currentUser && props.currentUser.name + " " + props.currentUser.surname}
            </h3>
            {props.description && <h6 className='px-md-5 text-center z-2'>{props.description}</h6>}
            {props.btnFunction && (
              <Button
                className='contact-btn'
                type='button'
                onClick={() => {
                  dispatch(props.btnFunction);
                }}
              >
                {props.btnText}
              </Button>
            )}
            {props.form && props.form}
          </div>
        </div>
      </Col>
    </>
  );
};

export default Hero;
