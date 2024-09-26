import Barcode from "react-barcode";
import { Card, Col, Row, Table } from "react-bootstrap";
import { LuPen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { BiShowAlt } from "react-icons/bi";
import { format } from "date-fns";

const Prescription = (props) => {
  const prescription = useSelector((state) => state.prescriptions.cartPrescription);
  const patientData = props.data?.patient ?? props.data;

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Gennaio è 0
  const year = today.getFullYear();
  const formattedCurrentDate = `${day}/${month}/${year}`;
  const formattedDate =
    props.data && props.data.issuingDate
      ? format(new Date(props.data.issuingDate), "dd-MM-yyyy")
      : formattedCurrentDate;
  return (
    <>
      {prescription && props.data && (
        <div className={`p-0 py-2 ${props.sizeMini && !props.showPreview && "d-none"}`}>
          <Card className={`p-3 bg-white prescription-card ${props.sizeMini && "prescription-card-mini"}`}>
            <Card.Body className='position-relative'>
              <Row className='align-items-center border border-1 border-black p-0'>
                <Col md={6} className='border-2 border-black'>
                  <h3 className='m-0'>Regione {props.data.region}</h3>
                </Col>
                <Col md={6} className='px-3'>
                  {" "}
                  {props.data.prescriptionID && <Barcode value={props.data.prescriptionID} />}
                </Col>
              </Row>
              <Row className='border-1 border-bottom border-black mb-2'>
                <Col md={6} className='px-0 pt-2'>
                  <p>COGNOME E NOME: {patientData.surname + " " + patientData.name}</p>
                </Col>
                <Col md={6} className='px-0'>
                  <Barcode value={patientData.fiscalCode} height={25} width={1} fontSize={6} />
                </Col>

                <Col md={12} className='d-flex justify-content-between px-0 py-2 flex-column flex-md-row'>
                  <p>INDIRIZZO: {patientData.address.toUpperCase()}</p>
                  <p>CAP: {patientData.municipality}</p>
                  <p>CITTA&apos;: {patientData.municipalityDenomination.toUpperCase()}</p>

                  <p>CODICE ASL: {props.data.localHealthCode}</p>
                  <p>PROVINCIA: {props.data.provinceAbbr}</p>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='d-flex gap-md-5 px-0 py-2 flex-column flex-md-row'>
                  <p>ESENZIONE: NON ESSENTE</p>
                  <p>SIGLA PROVINCIA: {props.data.provinceAbbr}</p>
                  <p>CODICE ASL: {props.data.localHealthCode}</p>
                  <p>DISPOSIZIONI REGIONALI:</p>
                </Col>
                <Col md={12} className='d-flex gap-md-4 px-0'>
                  <p>TIPOLOGIA PRESCRIZIONE(S, H): {props.data.typeRecipe}</p>
                  <p>PRIORITA&apos; PRESCRIZIONE(U, B, D, P): {props.data.priorityPrescription}</p>
                </Col>
                <Col md={12} className={`py-3 px-0 ${props.sizeMini && "table-wrapper"}`}>
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
                      {props.data && props.userRole === "DOCTOR" && props.dinamicPrescription
                        ? prescription.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className='col-10 text-start'>
                                  {item.medicine.activeIngredient + " " + item.medicine.nameAndPackaging}
                                </td>
                                <td className='col-1'>{item.quantity}</td>
                                <td className='col-1'>{item.note}</td>
                              </tr>
                            );
                          })
                        : props.data && props.userRole === "DOCTOR" && props.sizeMini
                        ? props.data.prescription.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className='col-10 text-start'>
                                  {item.medicine.activeIngredient + " " + item.medicine.nameAndPackaging}
                                </td>
                                <td className='col-1'>{item.quantity}</td>
                                <td className='col-1'>{item.note}</td>
                              </tr>
                            );
                          })
                        : props.data &&
                          props.userRole === "DOCTOR" &&
                          props.data.prescription.map((item, index) => {
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

                      {props.data &&
                        props.userRole === "PATIENT" &&
                        props.data.prescription.map((item, index) => {
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
                <Col md={12} className='px-0'>
                  <p>QUESITO DIAGNOSTICO: {props.data.diagnosticQuestion}</p>
                </Col>
                <Col className='d-flex justify-content-between flex-column flex-md-row px-0'>
                  <p>
                    N.PRESTAZIONI/CONFEZIONI:{" "}
                    {props.data.prescription ? props.data.prescription.length : prescription.length}
                  </p>
                  <p>TIPO DI RICETTA: Assist. SSN</p>
                  <p>DATA: {formattedDate}</p>
                </Col>
                <Col md={12} className='d-flex justify-content-between flex-column flex-md-row px-0'>
                  <p>CODICE FISCALE DEL MEDICO: {props.data.doctor.fiscalCode}</p>
                  <p>COGNOME E NOME DEL MEDICO: {props.data.doctor.surname + " " + props.data.doctor.name}</p>
                </Col>
              </Row>
              {props.data.status !== "APPROVED" && props.userRole !== "PATIENT" && (
                <div
                  className='position-absolute z-1 bg-body-secondary p-1 rounded-2 top-0 end-0 pencil'
                  onClick={props.handleShow}
                >
                  <LuPen />
                </div>
              )}
              {props.data.status === "APPROVED" && props.userRole !== "PATIENT" && props.sizeMini && (
                <div
                  className='position-absolute z-1 bg-body-secondary p-1 rounded-2 top-0 end-0 pencil'
                  onClick={props.handleShow}
                >
                  <BiShowAlt />
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
