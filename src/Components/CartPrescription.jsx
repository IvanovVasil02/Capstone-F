import { Button, Card } from "react-bootstrap";
import CartItem from "./patient/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, sendPrescriptionRequest } from "../redux/actions/prescriptionsActions";
import { useEffect, useRef } from "react";

const CartPrescription = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const cartPrescription = useSelector((state) => state.prescriptions.cartPrescription);
  const divRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        props.handleCloseCart();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={divRef} className={`p-0 py-2 sticky-bottom ${!props.show && "d-none"}`}>
        <Card className='p-2' id='cart-prescriptions'>
          <Card.Body>
            <Card.Title className='d-flex justify-content-center py-2'>Ricetta</Card.Title>
            {cartPrescription && cartPrescription.map((medicine, index) => <CartItem data={medicine} key={index} />)}
          </Card.Body>

          <div className='d-flex justify-content-between p-3'>
            {props.user == "doctor" && (
              <Button type='button' onClick={props.handleAprrovePrescription}>
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
              <Button type='button' onClick={() => dispatch(sendPrescriptionRequest(token, cartPrescription))}>
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
