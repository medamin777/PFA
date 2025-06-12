
import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const HealthParameterForm = ({onAdded,onClose}) => {
  const [formData, setFormData] = useState({
    blood_pressure: '',
    heart_rate: '',
    glucose_level: '',
    oxygen_level: '',
    temperature: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createHealthParameters(formData);
      toast.success('Health parameters added successfully');
      onAdded();
      onClose();
      //fetch health parameters for the patient
    
    } catch (error) {
      toast.error('Error adding health parameters');
    }
  };

  return (
    <div>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
        <input
          type="text"
          name="bloodPressure"
          value={formData.blood_pressure}
          onChange={(e) => setFormData({ ...formData, blood_pressure: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder=" 120/80 mmHg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Heart Rate</label>
        <input
          type="number"
          name="heartRate"
          value={formData.heart_rate}
          onChange={(e) => setFormData({ ...formData, heart_rate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="e.g., 72 bpm"
    
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Glucose Level</label>
        <input
          type="number"
          step="0.1"
          name="glucoseLevel"
          value={formData.glucose_level}
          onChange={(e) => setFormData({ ...formData, glucose_level: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="e.g., 95.5 mg/dL"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Temperature</label>
        <input
          type="number"
          step="0.1"
          name="temperature"
          value={formData.temperature}
          onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="e.g., 37°C"
        
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Oxygen Level</label>
        <input
          type="number"
          step="0.1"
          name="oxygenLevel"
          value={formData.oxygen_level}
          onChange={(e) => setFormData({ ...formData, oxygen_level: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="e.g., 97%"
        
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          rows="3"
          placeholder="Any additional notes about your health..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Health Parameters
      </button>
    </form>
   
    </div>
  );
};

export default HealthParameterForm;