import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home"; // Ensure this is created
import AboutPage from "./pages/About"; // Ensure this is created
import Login from './pages/Login';
import Register from './pages/Register'
import DoctorDashboard from './pages/DoctorDashboard';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import HealthParametersPage from './pages/HealthParameters'
import PrescriptionPage from './pages/PrescriptionPage';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorProfile from './pages/DoctorProfile';
import PatientAppointments from './pages/PatientAppointments';
import {ToastContainer} from 'react-toastify';
// Create this page

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-100">
     
      <Navbar />
      <div className="pt-16"> 
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/add-patient" element={<AddPatient/>}/>
          <Route path="/patient-details/:id" element={<PatientDetails/>}/>
          <Route path="/patient-dashboard" element={<HealthParametersPage/>}/>
          <Route path="/patient/prescriptions" element={<PrescriptionPage/>}/>
          <Route path="/doctor/appointments" element={<DoctorAppointments/>}/>
          <Route path="/doctor/profile" element={<DoctorProfile/>}/>
          <Route path="/patient/appointments" element={<PatientAppointments/>}/>
          
          {/* Add other routes here */} 
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
  );
}

export default App;