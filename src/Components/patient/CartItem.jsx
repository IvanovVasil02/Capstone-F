const CartItem = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <p>ACARBOSIO*40 cpr 100 mg</p>
          <p>
            Quantità: <span> 5</span>
          </p>
        </div>
        <div className='d-flex'>
          <img width='30' height='30' src='https://img.icons8.com/ios/50/72839c/add--v1.png' alt='add--v1' />
          <img width='30' height='30' src='https://img.icons8.com/ios/50/72839c/minus.png' alt='minus' />
        </div>
      </div>
      <hr />
    </>
  );
};
export default CartItem;
