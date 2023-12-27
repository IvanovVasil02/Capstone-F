import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDashboard from "./Components/patient/PatientDashboard";
import PatientAppointments from "./Components/patient/PatientAppointments";
import AddPrescription from "./Components/patient/AddPrescription";
import DoctorDashboard from "./Components/doctor/DoctorDashboard";
import PatientsPage from "./Components/doctor/PatientsPage";
import PrescriptionPage from "./Components/doctor/PrescriptionPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<PatientDashboard />} />
          <Route path='/appointments' element={<PatientAppointments />} />
          <Route path='/addPrescription' element={<AddPrescription />} />
          <Route path='/doc-dashboard' element={<DoctorDashboard />} />{" "}
          <Route path='/patients' element={<PatientsPage />} />
          <Route path='/prescriptions' element={<PrescriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
