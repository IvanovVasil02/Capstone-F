import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDashboard from "./Components/patient/PatientDashboard";
import PatientAppointments from "./Components/patient/PatientAppointments";
import AddPrescription from "./Components/patient/AddPrescription";
import DoctorDashboard from "./Components/doctor/DoctorDashboard";
import PatientsPage from "./Components/doctor/PatientsPage";
import EditPrescriptionPage from "./Components/doctor/EditPrescriptionPage";
import PrescriptionPage from "./Components/PrescriptionPage";
import DoctorAppointments from "./Components/doctor/DoctorAppointments";

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
          <Route path='/prescriptions' element={<PrescriptionPage />} />{" "}
          <Route path='/pendingPrescriptions' element={<PrescriptionPage type='pending' />} />
          <Route path='/editPrescription' element={<EditPrescriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
