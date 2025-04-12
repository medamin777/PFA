import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import PatientSidebar from '../components/PatientSidebar';
const PatientAppointments=()=>{
    const [appointments,setAppointments]=useState([]);
    const [loading,setLoading]=useState(true)
    const [patient,setPatient]=useState(null);

    const fetchPatient=async()=>{
        try{
            const response=await api.getCurrentPatient();
            setPatient(response.data);
            setLoading(false);
        }catch(error)
        {
            toast.error("failed to fetch patient");
        }
    }
    
    const fetchAppointments=async()=>{
        try{
            setLoading(true);
            const response=await api.getAppointmentForPatient(patient._id);
            setAppointments(response.data);
            setLoading(false);
        }catch(error)
        {
            toast.error("failed to fetch appointments");
        }
    }
    
   
    useEffect(()=>{
        fetchPatient();
    },[])
     useEffect(()=>{
        if(patient)
            fetchAppointments();
    },[patient])
return (
    <div>
      <PatientSidebar patient={patient}/>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Back
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No appointments scheduled</p>
              </div>
            ) : (
              appointments.map((app) => (
                <div key={app._id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                         Date: {new Date(app.date).toLocaleString()}
                      </h3>
                      <p className="text-gray-600">
                         Purpose: {app.purpose} 
                      </p>
                      <p className="text-gray-600">
                         Doctor: {app.doctor?.firstName} {app.doctor?.lastName}
                      </p>
                    </div>
                    
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>

    )
}
export default PatientAppointments;