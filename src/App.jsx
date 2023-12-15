import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import PatientDashboard from "./Components/patient/PatientDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<PatientDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
