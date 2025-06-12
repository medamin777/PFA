
import React, { useState, useEffect } from 'react';
import PatientSidebar from '../components/PatientSidebar';
import AddHealthParameterForm from '../components/HealthParameterForm';
import api from '../services/api';
import { toast } from 'react-toastify';
import '../index.css';
const HealthParametersPage = () => {
  const[patient,setPatient]=useState(null);
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [parameterAdded,setParameterAdded]=useState(false);
 
  useEffect(() => {
    fetchCurrentPatient();
  
  }, []);
  useEffect(()=>{
    fetchHealthParameters();
  },[patient])
  useEffect(() => {
    if (parameterAdded && patient) {
      fetchHealthParameters();
      setParameterAdded(false); // reset the flag
    }
  }, [parameterAdded, patient]);

  const fetchCurrentPatient=async()=>{
    try{
        setLoading(true);
        const response=await api.getCurrentPatient();
        setPatient(response.data);
    }catch(error){
        console.error('Error fetching current patient:',error);
        toast.error('Error fetching current patient');
    }finally{
        setLoading(false);
    }
  }
  const fetchHealthParameters = async () => {
    try {
      setLoading(true);
      if(!patient)
        return;
      const response = await api.getHealthParametersForPatient(patient._id);
      const data = Array.isArray(response.data) ? response.data : [];
      setParameters(data);
    } catch (error) {
      console.error('Error fetching health parameters:', error);
      toast.error('Error fetching health parameters');
    } finally {
      setLoading(false);
    }
  };

  const deleteParameter = async (id) => {
    if (!window.confirm('Are you sure you want to delete this parameter?')) {
      return;
    }
    try {
      await api.deleteHealthParameter(id);
      toast.success('Health parameter deleted successfully');
      fetchHealthParameters();
    } catch (error) {
      toast.error('Error deleting health parameter');
    }
  };

  const hideForm = () => {
    setShowForm(false);
    // Reset any form state if needed
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <PatientSidebar  patient={patient}/>
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Health Parameters</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add New Parameter
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add Health Parameters</h2>
                <button
                  onClick={hideForm}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
              <AddHealthParameterForm onAdded={() => setParameterAdded(true)} onClose={hideForm}
             />
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Pressure
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Heart Rate
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Glucose Level
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oxygen Level
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temperature
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parameters.map((param) => (
                    <tr key={param._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(param.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.blood_pressure} mmHG
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.heart_rate} bpm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.glucose_level} mg/dL
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.oxygen_level} %
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.temperature} °C
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {param.notes || 'no notes'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteParameter(param._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthParametersPage;