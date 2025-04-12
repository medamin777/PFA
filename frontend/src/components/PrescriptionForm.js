
import React, { useState } from 'react';
import { FileIcon, Plus, Clipboard ,Trash2} from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-toastify';

const Prescription = ({ prescriptions, patientId, setPrescriptions }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    medication: '',
    dosage: '',
    instructions: '',
    frequency: '',
    duration: '',
 
  });

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.createPrescription(patientId, {
            ...formData,
            patient: patientId,
          });
          
          // Update the prescriptions list directly
          const newPrescriptions = [...prescriptions, response.data];
          setPrescriptions(newPrescriptions);
      setShowAddForm(false);
      setFormData({
        medication: '',
        dosage: '',
        instructions: '',
        frequency: '',
        duration: '',
      });
      toast.success('Prescription added successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to add prescription');
    }
  };
  const handleDelete=async(id)=>{
    
      const confirm=window.confirm('Are you sure want to delete this prescription')
      if(!confirm)
        return;
      try{
        await api.deletePrescription(id);
        setPrescriptions(prescriptions.filter(p=>p._id!==id));
        toast.success('Prescription deleted successfully')
    }catch(error)
    {
      console.log(error.message);
      toast.error('failed to delete prescription')
    }
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
  
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Prescriptions</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Prescription</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Medication</label>
              <input
                type="text"
                name="medication"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                placeholder="e.g., Paracetamol"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                placeholder=" 500mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="thrice-daily">Thrice Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as-needed">As Needed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                placeholder="e.g., 7 days"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              rows="3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Any special instructions for the patient..."
            ></textarea>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Add Prescription
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {prescriptions?.map((prescription) => (
          <div
            key={prescription._id}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileIcon size={20} className="text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{prescription.medication}</h3>
                  <p className="text-sm text-gray-600">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-sm text-blue-500 hover:text-blue-700">
                  <Clipboard size={16} className="inline-block mr-1" />
                  Print
                </button>
                <button 
                    onClick={(e)=>{e.stopPropagation();
                        handleDelete(prescription._id);
                    }
                    }  
                    className="text-sm text-red-500 hover:text-red-700">
                    <Trash2 size={16} className="inline-block mr-1" />
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span> {prescription.duration}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Instructions:</span> {prescription.instructions}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Prescribed on {new Date(prescription.datePrescribed).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescription;