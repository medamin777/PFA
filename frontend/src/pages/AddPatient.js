import React, {useEffect, useState} from 'react';
import PatientForm from '../components/PatientForm';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import DoctorSidebar from '../components/DoctorSidebar';
function AddPatient()
{
    
    const [loading,setLoading]=useState(false);
    const [user,setUser]=useState(null);
    const navigate=useNavigate;
    const fetchCurrentUser = async () => {
        try {
          const response = await api.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching current user:', error);
          navigate('/login');
        }
      };

      useEffect(() => {
        fetchCurrentUser(); // ✅ call it on mount
      });
    const handleSubmit=()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
          }, 1000);
        };

    return (
        <div>
            <DoctorSidebar user={user} />
            <PatientForm onSubmit={handleSubmit} />
            {loading && <p>Saving patient...</p>}
        </div>
      );
}

export default AddPatient;