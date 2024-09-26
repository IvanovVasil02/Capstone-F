import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  approveMultiplePrescriptions,
  fetchPendingPrescriotions,
  fetchUserPrescription,
  setPartialSelection,
} from "../../../redux/actions/prescriptionsActions";
import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import Sidebar from "../../Sidebar";
import TopTogglebar from "../../TopTogglebar";
import Hero from "../../Hero";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiArrowCircleRightLight } from "react-icons/pi";
import PrescriptionCard from "../../PrescriptionComponents/PrescriptionCard";
import PrescriptionDataModal from "../../PrescriptionComponents/PrescriptionDataModal";

const DoctorPrescriptionPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.user.savedToken);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const handleClosePrescriptionModal = () => setShowPrescriptionModal(false);
  const handleShowPrescriptionModal = () => setShowPrescriptionModal(true);

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  const openSidebar = () => {
    setShowSidebar(true);
  };

  const userRole = useSelector((state) => state.user.currentUser?.role || 0);

  const selectedElements = useSelector((state) => state.prescriptions.selectedElement);

  const [radioValue, setRadioValue] = useState("approved");
  const radios = [
    { name: "In attesa", value: "pending" },
    { name: "Approvate", value: "approved" },
  ];

  useEffect(() => {
    props.type && setRadioValue("pending");
  }, [props.type]);

  const [showVerifiedPendingPrescription, setShowVerifiedPendingPrescription] = useState(false);
  const handleCloseVerifiedPendingPrescription = () => setShowVerifiedPendingPrescription(false);
  const handleShowVerifiedPendingPrescription = () => setShowVerifiedPendingPrescription(true);

  const [showNoVerifiedPendingPrescription, setShowNoVerifiedPendingPrescription] = useState(true);
  const handleCloseNoVerifiedPendingPrescription = () => setShowNoVerifiedPendingPrescription(false);
  const handleShowNoVerifiedPendingPrescription = () => setShowNoVerifiedPendingPrescription(true);

  const toggleShowVerifiedPrescriptions = (evt) => {
    let actionName = evt.currentTarget.getAttribute("data-state");
    switch (actionName) {
      case "showVerified":
        handleShowVerifiedPendingPrescription();
        handleCloseNoVerifiedPendingPrescription();
        break;
      case "showNoVerified":
        handleShowNoVerifiedPendingPrescription();
        handleCloseVerifiedPendingPrescription();
        break;
    }
  };

  const [selectability, setSelectability] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handlePartialClick = () => {
    selectability ? setSelectability(false) : setSelectability(true);
    dispatch(setPartialSelection());
  };
  const handleTotalClick = () => {
    selectAll ? setSelectAll(false) : (setSelectAll(true), setSelectability(true));
    dispatch(setPartialSelection());
  };

  const hadnleApproveAllSelected = async () => {
    await dispatch(approveMultiplePrescriptions(token, selectedElements));
    dispatch(fetchPendingPrescriotions(token));
  };

  const fetchPrescriptions = async () => {
    try {
      if (token) {
        if (radioValue === "pending") {
          await dispatch(fetchPendingPrescriotions(token));
        } else if (radioValue === "approved") {
          await dispatch(fetchUserPrescription(token));
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    const intervalId = setInterval(fetchPrescriptions, 120000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, token]);

  return (
    <>
      <Container fluid>
        <Row className='flex-nowrap flex-column flex-md-row'>
          <Sidebar show={showSidebar} closeSidebar={closeSidebar} />
          <TopTogglebar openSidebar={openSidebar} />
          <Col className='p-md-5 p-4'>
            <Row>
              <Hero
                title='Gestionale ricette'
                description='Esplora la tua salute con comodità: controlla le tue ricette mediche in attesa e approvate in un unico luogo. '
              />
            </Row>
            <Row>
              <ButtonGroup className='py-3 px-0'>
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
              {radioValue === "pending" && (
                <div className='d-flex justify-content-around '>
                  <p
                    className={`text-secondary pointer ${showNoVerifiedPendingPrescription && "underline"}`}
                    data-state='showNoVerified'
                    onClick={(e) => toggleShowVerifiedPrescriptions(e)}
                  >
                    Non verificate
                  </p>
                  <p
                    className={`text-secondary pointer ${showVerifiedPendingPrescription && "underline"}`}
                    data-state='showVerified'
                    onClick={(e) => toggleShowVerifiedPrescriptions(e)}
                  >
                    Verificate
                  </p>
                  <p className='text-secondary pointer' onClick={handlePartialClick}>
                    Selezione parziale
                    <span>
                      {selectability ? <MdCheckBox className='fs-5' /> : <MdCheckBoxOutlineBlank className='fs-5' />}
                    </span>
                  </p>
                  <p className='text-secondary' onClick={handleTotalClick}>
                    Selezione totale
                    <span>
                      {selectAll ? <MdCheckBox className='fs-5' /> : <MdCheckBoxOutlineBlank className='fs-5' />}
                    </span>
                  </p>{" "}
                  <p className='text-secondary pointer' onClick={hadnleApproveAllSelected}>
                    Approva tutto
                    <span>
                      <PiArrowCircleRightLight className='fs-3' style={{ color: "#72839C" }} />
                    </span>
                  </p>
                </div>
              )}
            </Row>
            <Row>
              {useSelector((state) => {
                if (radioValue === "pending") {
                  if (showNoVerifiedPendingPrescription) {
                    return state.prescriptions.pendingPrescriptions?.noVerifiedPrescriptions.content || [];
                  } else if (showVerifiedPendingPrescription) {
                    return state.prescriptions.pendingPrescriptions?.verifiedPrescriptions.content || [];
                  }
                } else if (radioValue === "approved") {
                  return state.prescriptions.prescriptionList.page?.content || [];
                }
                return [];
              }).map((prescription, index) => (
                <PrescriptionCard
                  data={prescription}
                  key={index}
                  handleShowPrescriptionModal={handleShowPrescriptionModal}
                  userRole={userRole}
                  location={location.pathname}
                  selectability={radioValue === "pending" && selectability}
                  selectAll={selectAll}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <PrescriptionDataModal
        handleClosePrescriptionModal={handleClosePrescriptionModal}
        showPrescriptionModal={showPrescriptionModal}
        userRole={userRole}
      />
    </>
  );
};
export default DoctorPrescriptionPage;
