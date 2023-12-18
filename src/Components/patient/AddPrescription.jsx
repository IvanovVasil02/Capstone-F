import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import CartPrescription from "./CartPrescription";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../../redux/actions/mainActions";

const AddPrescription = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
  const [search, setSearch] = useState("");
  const [radioValue, setRadioValue] = useState("medicineName");
  const radios = [
    { name: "Nome commerciale", value: "medicineName" },
    { name: "Principio attivo", value: "activeIngredient" },
  ];
  const searchResults = useSelector((state) => state.main.searchResults.content);

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    dispatch(fetchSearch(token, search, radioValue));
  };

  useEffect(() => {
    dispatch(fetchSearch(token, search, radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={10} className='p-4'>
            <Row className='sticky-top'>
              <Col md={12} id='dashboard-header' className='p-0'>
                <div className='dashboard-img-container'></div>
                <div className='w-100 p-4'>
                  <div className='d-flex flex-column align-items-center offset-2'>
                    <h3 className='fw-light mb-2'>Benvenuta nella tua dashboard , Pina Miteva</h3>
                    <h6 className='w-75 text-center'>
                      Qui troverai tutte le informazioni relative alla tua salute e ai tuoi appuntamenti. Siamo qui per
                      rendere il tuo percorso di cura più accessibile e informativo.
                    </h6>
                    <Form onSubmit={handleSubmitSearch} className='d-flex p-3' id='search-form'>
                      <Form.Control
                        type='input'
                        placeholder='Cerca medicina'
                        className='rounded-start-4 rounded-end-0'
                        aria-label='Search'
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Button type='submit' className='rounded-end-4 rounded-start-0 bg-white text-dark border-0'>
                        <FaSearch />
                      </Button>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className='py-2'>
              <Col md={7} className='p-0 pe-3'>
                <div>
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type='radio'
                        name='radio'
                        variant='outline-secondary'
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        style={{ background: idx % 2 ? "outline-success" : "outline-danger" }}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                {searchResults && searchResults.map((medicine, index) => <MedicineCard data={medicine} key={index} />)}
              </Col>{" "}
              <Col md={5} className='p-0 '>
                <CartPrescription />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddPrescription;
