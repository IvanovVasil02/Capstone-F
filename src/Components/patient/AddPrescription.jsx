import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import MedicineCard from "./MedicineCard";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMedicine } from "../../redux/actions/mainActions";
import CartPrescription from "../CartPrescription";
import Hero from "../Hero";

const AddPrescription = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.savedToken);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [search, setSearch] = useState("");
  const [radioValue, setRadioValue] = useState("medicineName");
  const radios = [
    { name: "Nome commerciale", value: "medicineName" },
    { name: "Principio attivo", value: "activeIngredient" },
  ];
  const searchResults = useSelector((state) => state.main.searchMedicineResults.content);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    dispatch(fetchSearchMedicine(token, search, radioValue));
  };

  useEffect(() => {
    dispatch(fetchSearchMedicine(token, search, radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  const getForm = () => {
    return (
      <Form onSubmit={handleSubmitSearch} className='d-flex p-3 z-3' id='search-form'>
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
    );
  };

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Crea la tua ricetta'
                currentUser={currentUser}
                description='Personalizza la tua cura: esplora e seleziona con facilità le medicine desiderate per la tua ricetta. '
                form={getForm()}
                openSidebar={openSidebar}
              />
            </Row>
            <Row className='py-3 px-0 flex-column-reverse flex-md-row'>
              <Col md={7}>
                <Row>
                  <ButtonGroup className='py-2 px-0'>
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
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>

                  {searchResults &&
                    searchResults.map((medicine, index) => <MedicineCard data={medicine} key={index} />)}
                </Row>
              </Col>
              <Col className='px-0 ps-md-3'>
                <CartPrescription user='patient' show={true} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddPrescription;
