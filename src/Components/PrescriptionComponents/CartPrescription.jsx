import { Button, Card } from "react-bootstrap";
import CartItem from "../patient/patientPrescriptionsPage/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, sendPrescriptionRequest } from "../../redux/actions/prescriptionsActions";
import { useEffect, useRef, useState } from "react";
import { BsX } from "react-icons/bs";

const CartPrescription = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const cartPrescription = useSelector((state) => state.prescriptions.cartPrescription);
  const divRef = useRef(null);
  const hasError = useSelector((state) => state.error.messageError);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target) && props.handleCloseCart) {
        props.handleCloseCart();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    if (props.user == "doctor") {
      await props.handleApprovePrescription();
    } else if (props.user == "patient") {
      dispatch(sendPrescriptionRequest(token, cartPrescription));
    }
    if (hasError === null) {
      setIsSuccess(true);
      const myTimeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      return () => clearTimeout(myTimeout);
    }
  };

  return (
    <>
      <div ref={divRef} className={`p-0 py-2 z-2 sticky-bottom ${!props.show && "d-none"}`}>
        <Card className='p-2' id='cart-prescriptions'>
          <BsX className='close-btn ms-auto' onClick={props.handleCloseCart} />
          <Card.Body className='py-0'>
            <Card.Title className='d-flex justify-content-center pb-2'>Ricetta</Card.Title>
            {cartPrescription && cartPrescription.map((medicine, index) => <CartItem data={medicine} key={index} />)}
          </Card.Body>
          {isSuccess && cartPrescription.length > 0 && (
            <p className='text-success text-center '>Operazione completata con succeso</p>
          )}
          {hasError !== null && <p className='text-success text-center '>Ops c&apos;è stato qualche errore!</p>}

          <div className='d-flex justify-content-between p-3'>
            {props.user == "doctor" && (
              <Button type='button' onClick={handleClick}>
                <img
                  width='25'
                  height='25'
                  src='https://img.icons8.com/ios-glyphs/30/72839c/filled-sent.png'
                  alt='send'
                />
                Approva
              </Button>
            )}
            {props.user == "patient" && (
              <Button type='button' onClick={handleClick}>
                <img
                  width='25'
                  height='25'
                  src='https://img.icons8.com/ios-glyphs/30/72839c/filled-sent.png'
                  alt='send'
                />
                Invio
              </Button>
            )}
            <Button type='Submit' onClick={() => dispatch(clearCart())}>
              <img width='25' height='25' src='https://img.icons8.com/ios-filled/50/72839c/multiply.png' alt='remove' />
              Anulla
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
export default CartPrescription;
