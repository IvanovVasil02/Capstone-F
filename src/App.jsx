import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/homePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDashboard from "./Components/patient/PatientDashboard";
import PatientAppointments from "./Components/patient/patientAppointmentsPage/PatientAppointments";
import AddPrescription from "./Components/patient/patientPrescriptionsPage/AddPrescription";
import DoctorDashboard from "./Components/doctor/DoctorDashboard";
import PatientsPage from "./Components/doctor/doctorPatientsPage/PatientsPage";
import DoctorAppointments from "./Components/doctor/DoctorAppointmentsPage/DoctorAppointments";
import PatientPrescriptionPage from "./Components/patient/patientPrescriptionsPage/PatientPrescriptionPage";
import DoctorPrescriptionPage from "./Components/doctor/DoctorPrescriptionsPage/DoctorPrescriptionPage";
import EditPrescriptionPage from "./Components/doctor/DoctorPrescriptionsPage/EditPrescriptionPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<PatientDashboard />} />
          <Route path='/appointments' element={<PatientAppointments />} />
          <Route path='/doc-appointments' element={<DoctorAppointments />} />
          <Route path='/addPrescription' element={<AddPrescription />} />
          <Route path='/doc-dashboard' element={<DoctorDashboard />} />{" "}
          <Route path='/patients' element={<PatientsPage />} />
          <Route path='/pat/prescriptions' element={<PatientPrescriptionPage />} />{" "}
          <Route path='/doc/prescriptions' element={<DoctorPrescriptionPage />} />{" "}
          <Route path='/pat/prescriptions/pending-prescription' element={<PatientPrescriptionPage type='pending' />} />
          <Route path='/doc/prescriptions/pending-prescription' element={<DoctorPrescriptionPage type='pending' />} />
          <Route path='/editPrescription/:actionType' element={<EditPrescriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
