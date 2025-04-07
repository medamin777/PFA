// frontend/src/pages/DoctorDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import DoctorSidebar from '../components/DoctorSidebar';
import PatientCard from '../components/PatientCard';
import '../index.css';

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser();
    fetchPatients();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
      navigate('/login');
    }
  };

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await api.getPatientsForDoctor();
      setPatients(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch patients');
      setLoading(false);
    }
  };

 

  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await api.deletePatient(patientId);
      fetchPatients(); // Refresh the list
    } catch (error) {
      console.error('Error deleting patient:', error);
      setError('Failed to delete patient');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <DoctorSidebar user={user} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <DoctorSidebar user={user} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-500 text-center font-medium bg-red-100 p-2 rounded">{error}</div>
        </div>
      </div>
    );
  }

  return (

    <div className="flex h-screen">
      <DoctorSidebar user={user} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
          <button
            onClick={handleAddPatient}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Add New Patient
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
        
      </div>
    </div>

  );
}

export default DoctorDashboard;