
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../index.css';
import PatientInfo from '../components/PatientInfo';
import HealthParameters from '../components/HealthParameters';
import Prescription from '../components/Prescription';
import DoctorSidebar from '../components/DoctorSidebar';
const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [healthParameters, setHealthParameters] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
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
  const fetchPatientData = async () => {
    try {
      // Fetch patient details
      const patientRes = await api.getPatient(id);
      setPatient(patientRes.data);

      // Fetch health parameters
      const healthRes = await api.getHealthParametersForPatient(id);
      setHealthParameters(Array.isArray(healthRes.data) ? healthRes.data : [healthRes.data]);

      // Fetch prescriptions
      const prescriptionsRes = await api.getPrescriptionsForPatient(id);
      setPrescriptions(prescriptionsRes.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{

    fetchPatientData();
  }, [id]);
  useEffect(() => {
    if (prescriptions.length > 0) {
      fetchPatientData();
    }
  }, [prescriptions.length]);
  useEffect(()=>{
    fetchCurrentUser();
  })
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
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
        <Prescription prescriptions={prescriptions} patientId={id} setPrescriptions={setPrescriptions} />
      </div>
    </div>
    </div>
  );
};

export default PatientDetails;