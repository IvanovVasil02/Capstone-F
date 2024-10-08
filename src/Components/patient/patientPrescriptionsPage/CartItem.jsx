import { useDispatch } from "react-redux";
import { addMedicine, removeMedcine } from "../../../redux/actions/prescriptionsActions";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddBtn = (medicine) => {
    const medicineObject = {
      medicine,
      quantity: 1,
    };
    dispatch(addMedicine(medicineObject));
  };

  const handleRemoveBtn = (medicine) => {
    dispatch(removeMedcine(medicine));
  };
  return (
    <>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <p>{data.medicine.nameAndPackaging}</p>
          <p>
            Quantità: <span> {data.quantity}</span>
          </p>
        </div>
        <div className='d-flex'>
          <img
            width='30'
            height='30'
            src='https://img.icons8.com/ios/50/72839c/add--v1.png'
            alt='add--v1'
            onClick={() => handleAddBtn(data.medicine)}
          />
          <img
            width='30'
            height='30'
            src='https://img.icons8.com/ios/50/72839c/minus.png'
            alt='minus'
            onClick={() => handleRemoveBtn(data.medicine.medicineId)}
          />
        </div>
      </div>
      <hr />
    </>
  );
};
export default CartItem;
