import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDashboard from "./Components/patient/PatientDashboard";
import PatientAppointments from "./Components/patient/PatientAppointments";
import AddPrescription from "./Components/patient/AddPrescription";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<PatientDashboard />} />
          <Route path='/appointments' element={<PatientAppointments />} />
          <Route path='/addPrescription' element={<AddPrescription />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
