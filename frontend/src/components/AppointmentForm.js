// frontend/src/components/AppointmentForm.js
import React, { useState } from 'react';
import { FileIcon, Plus, Clipboard, Trash2 } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-toastify';


const AppointmentForm = ({ appointments = [], patientId, setAppointments }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    purpose: ''
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedAppointment) {
        // Edit existing appointment
        response = await api.updateAppointment(selectedAppointment._id, {
          ...formData
        });
      } else {
        // Create new appointment
        response = await api.createAppointment(patientId, {
          ...formData,
          patient: patientId
        });
      }

      // Update the appointments list
      const newAppointments = selectedAppointment
        ? appointments.map((app) => 
            app._id === selectedAppointment._id 
              ? { ...app, ...response.data } 
              : app
          )
        : [...appointments, response.data];

      setAppointments(newAppointments);
      setShowAddForm(false);
      setFormData({
        date: '',
        purpose: ''
      });
      setSelectedAppointment(null);
      toast.success(selectedAppointment ? 'Appointment updated successfully' : 'Appointment added successfully');
      setTimeout(()=>window.location.reload(),1000);
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Failed to save appointment');
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

  const handleEdit = (app) => {
    setSelectedAppointment(app);
    setFormData({
      date: app.date,
      purpose: app.purpose
    });
    setShowAddForm(true);
    
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
    
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>{selectedAppointment ? 'Edit Appointment' : 'Add Appointment'}</span>
        </button>
      </div>
      
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setSelectedAppointment(null);
              }}
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {selectedAppointment ? 'Update Appointment' : 'Add Appointment'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No appointments scheduled</p>
          </div>
        ) : (
          appointments.map((app) => (
            <div key={app._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileIcon size={20} className="text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">Date :{new Date(app.date).toLocaleString()}</h3>
                    <p className="text-sm text-gray-600"><span className="font-bold">Purpose:</span>{app.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEdit(app)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    <Clipboard size={16} className="inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;