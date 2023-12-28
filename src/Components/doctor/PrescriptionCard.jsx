import Barcode from "react-barcode";
import { Card, Col, Row, Table } from "react-bootstrap";

const PrescriptionCard = ({ data }) => {
  return (
    <>
      <div className='p-0 py-2'>
        <Card className='p-3 bg-white'>
          <Card.Body>
            <Row className='align-items-center border border-1 border-black p-0'>
              <Col md={6} className='border-2 border-black'>
                <p className='fs-3'>Regione {data.region}</p>
              </Col>
              <Col md={6} className='px-3'>
                {" "}
                <Barcode value={data.prescriptionID} />
              </Col>
            </Row>
            <Row className='border-1 border-bottom border-black mb-2'>
              <Col md={6}>
                <p>COGNOME E NOME: {data.patient.surname + " " + data.patient.name}</p>
              </Col>
              <Col md={6} className=''>
                <Barcode value={data.patient.fiscalCode} height={40} width={1.5} />
              </Col>
              <Col md={12} className='d-flex justify-content-between p-2'>
                <p>INDIRIZZO: {data.patient.address}</p>
                <p>CAP: {data.patient.municipality}</p>
                <p>CITTA&apos;: </p>
                <p>CODICE ASL: {data.localHealthCode}</p>
                <p>DISPOSIZIONI REGIONALI: </p>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <p>ESENZIONE: NON ESSENTE</p>
                <p>TIPOLOGIA PRESCRIZIONE(S, H): {data.typeRecipe}</p>
              </Col>
              <Col md={3}>
                <p>SIGLA PROVINCIA: {data.provinceAbbr}</p>
                <p>PRIORITA&apos; PRESCRIZIONE(U, B, D, P): {data.priorityPrescription}</p>
              </Col>
              <Col md={3}>
                <p>CODICE ASL: {data.localHealthCode}</p>
                <p>DISPOSIZIONI REGIONALI:</p>
              </Col>
              <Col md={12} className='py-3 px-0'>
                <Table striped='columns' className='border border-1 border-black text-center'>
                  <thead>
                    <tr>
                      <th className='col-10 text-center'>PRESCRIZIONE</th>
                      <th className='col-1'>QTA</th>
                      <th className='col-1'>NOTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.prescription.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className='col-10 text-start'>
                            {item.medicine.activeIngredient + " " + item.medicine.nameAndPackaging}
                          </td>
                          <td className='col-1'>{item.quantity}</td>
                          <td className='col-1'>{data.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p>QUESITO DIAGNOSTICO: {data.diagnosticQuestion}</p>
              </Col>
              <Col className='d-flex justify-content-between'>
                <p>N.PRESTAZIONI/CONFEZIONI: {data.packagesNumber}</p>
                <p>TIPO DI RICETTA: {data.typeRecipe}</p>
                <p>DATA: {data.isssuingDate}</p>
              </Col>
              <Col md={12} className='d-flex justify-content-between'>
                <p>CODICE FISCALE DEL MEDICO: {data.doctor.surname + " " + data.doctor.name}</p>
                <p>COGNOME E NOME DEL MEDICO: {data.doctor.fiscalCode}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default PrescriptionCard;
