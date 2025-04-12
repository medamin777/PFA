// frontend/src/pages/PatientDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../index.css';
import PatientInfo from '../components/PatientInfo';
import HealthParameters from '../components/HealthParameters';
import Prescription from '../components/PrescriptionForm';
import AppointmentForm from '../components/AppointmentForm';
import DoctorSidebar from '../components/DoctorSidebar';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [healthParameters, setHealthParameters] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchAppointment = async () => {
    try {
      const response = await api.getAppointmentForPatient(id);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      // Fetch patient details
      const patientRes = await api.getPatient(id);
      setPatient(patientRes.data);

      // Fetch health parameters
      const healthRes = await api.getHealthParametersForPatient(id);
      setHealthParameters(Array.isArray(healthRes.data) ? healthRes.data : [healthRes.data]);

      // Fetch prescriptions
      const prescriptionsRes = await api.getPrescriptionsForPatient(id);
      setPrescriptions(prescriptionsRes.data);

      // Fetch appointments
      const appointmentsRes = await api.getAppointmentForPatient(id);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient data when component mounts
  useEffect(() => {
    fetchPatientData();
    fetchAppointment();
  }, [id]);

  // Fetch data when prescriptions change
  useEffect(() => {
    if (prescriptions.length > 0) {
      fetchPatientData();
    }
  }, [prescriptions.length]);

  // Fetch current user when component mounts
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Handle appointment updates
  const handleAppointmentUpdate = async () => {
    try {
      const response = await api.getAppointmentForPatient(id);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error refreshing appointments:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center font-medium bg-red-100 p-2 rounded">
          Patient not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <DoctorSidebar user={user} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Patient Details</h1>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Back
          </button>
        </div>

        <div className="space-y-8">
          <PatientInfo patient={patient} />
          <HealthParameters parameters={healthParameters} />
          <Prescription 
            prescriptions={prescriptions} 
            patientId={id} 
            setPrescriptions={setPrescriptions} 
          />
          <AppointmentForm 
            appointments={appointments} 
            patientId={id} 
            setAppointments={setAppointments} 
            onAppointmentUpdate={handleAppointmentUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;