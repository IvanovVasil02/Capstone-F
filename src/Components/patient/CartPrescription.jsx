import { Button, Card } from "react-bootstrap";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CartPrescription = () => {
  const cartPrescription = useSelector((state) => state.patient.cartPrescription);

  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-2' id='cart-prescriptions'>
          <Card.Body>
            <Card.Title className='d-flex justify-content-center py-2'>Ricetta</Card.Title>
            {cartPrescription && cartPrescription.map((medicine, index) => <CartItem data={medicine} key={index} />)}
          </Card.Body>

          <div className='d-flex justify-content-between p-3'>
            <Button type='Submit'>
              <img
                width='25'
                height='25'
                src='https://img.icons8.com/ios-glyphs/30/72839c/filled-sent.png'
                alt='send'
              />
              Invio
            </Button>{" "}
            <Button type='Submit'>
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
