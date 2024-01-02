import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { Card, Col, Row, Table } from "react-bootstrap";
import { LuPen } from "react-icons/lu";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
const Prescription = (props) => {
  const prescription = useSelector((state) => state.prescriptions.cartPrescription);
  const [prescriptionLength, setPrescriptionLength] = useState(0);

  useEffect(() => {
    let prescriptionLength = 0;
    for (let i = 0; i < prescription.length; i++) {
      for (let j = 0; j < prescription[i].quantity; j++) {
        prescriptionLength++;
      }
    }
    setPrescriptionLength(prescriptionLength);
  }, [prescription]);

  return (
    <>
      {prescription && (
        <div className='p-0 py-2'>
          <Card className='p-3 bg-white prescription-card'>
            <Card.Body className='position-relative'>
              <Row className='align-items-center border border-1 border-black p-0'>
                <Col md={6} className='border-2 border-black'>
                  <p className='fs-3'>Regione {props.data.region}</p>
                </Col>
                <Col md={6} className='px-3'>
                  {" "}
                  <Barcode value={props.data.prescriptionID} />
                </Col>
              </Row>
              <Row className='border-1 border-bottom border-black mb-2'>
                <Col md={6}>
                  <p>COGNOME E NOME: {props.data.patient.surname + " " + props.data.patient.name}</p>
                </Col>
                <Col md={6} className=''>
                  <Barcode value={props.data.patient.fiscalCode} height={25} width={1} fontSize={6} />
                </Col>
                <Col md={12} className='d-flex justify-content-between p-2 flex-column flex-md-row'>
                  <p>INDIRIZZO: {props.data.patient.address.toUpperCase()}</p>
                  <p>CAP: {props.data.patient.municipality}</p>
                  <p>CITTA&apos;: {props.data.patient.municipalityDenomination.toUpperCase()}</p>
                  <p>CODICE ASL: {props.data.localHealthCode}</p>
                  <p>PROVINCIA: {props.data.provinceAbbr}</p>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='d-flex gap-md-5 py-2 flex-column flex-md-row'>
                  <p>ESENZIONE: NON ESSENTE</p>
                  <p>SIGLA PROVINCIA: {props.data.provinceAbbr}</p>
                  <p>CODICE ASL: {props.data.localHealthCode}</p>
                  <p>DISPOSIZIONI REGIONALI:</p>
                </Col>
                <Col md={12} className='d-flex gap-md-4'>
                  <p>TIPOLOGIA PRESCRIZIONE(S, H): {props.data.typeRecipe}</p>
                  <p>PRIORITA&apos; PRESCRIZIONE(U, B, D, P): {props.data.priorityPrescription}</p>
                </Col>
                <Col md={12} className='py-3 px-0'>
                  <Table
                    striped='columns'
                    className='border border-1 border-black text-center'
                    onClick={props.handleShowCart}
                  >
                    <thead>
                      <tr>
                        <th className='col-10 text-center'>PRESCRIZIONE</th>
                        <th className='col-1'>QTA</th>
                        <th className='col-1'>NOTA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription &&
                        prescription.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='col-10 text-start'>
                                {item.medicine.activeIngredient + " " + item.medicine.nameAndPackaging}
                              </td>
                              <td className='col-1'>{item.quantity}</td>
                              <td className='col-1'>{item.note}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p>QUESITO DIAGNOSTICO: {props.data.diagnosticQuestion}</p>
                </Col>
                <Col className='d-flex justify-content-between flex-column flex-md-row'>
                  <p>N.PRESTAZIONI/CONFEZIONI: {prescriptionLength}</p>
                  <p>TIPO DI RICETTA: Assist. SSN</p>
                  <p>DATA: {props.data.isssuingDate}</p>
                </Col>
                <Col md={12} className='d-flex justify-content-between flex-column flex-md-row'>
                  <p>CODICE FISCALE DEL MEDICO: {props.data.doctor.surname + " " + props.data.doctor.name}</p>
                  <p>COGNOME E NOME DEL MEDICO: {props.data.doctor.fiscalCode}</p>
                </Col>
              </Row>
              {props.userRole !== "PATIENT" && (
                <div
                  className='position-absolute z-1 bg-body-secondary p-1 rounded-2 top-0 end-0 pencil'
                  onClick={props.handleShow}
                >
                  <LuPen />
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
export default Prescription;
