
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import DoctorSidebar from '../components/DoctorSidebar';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState(null);

  const fetchUser=async()=>{
    try{
        const response=await api.getCurrentUser();
        setUser(response.data);
    }catch(error)
    {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user');
    }
  }
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.getAppointmentForDoctor();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirm) return;
    
    try {
      await api.deleteAppointment(id);
      setAppointments(appointments.filter((p) => p._id !== id));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchUser();
  }, []);

  return (
    <div>
      <DoctorSidebar user={user}/>
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
                        Patient: {app.patient?.user.firstName} {app.patient?.user.lastName}
                      </h3>
                      <p className="text-gray-600">
                        Date: {new Date(app.date).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        Purpose: {app.purpose}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;