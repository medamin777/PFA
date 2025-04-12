// frontend/src/components/PatientForm.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '../services/api';
import '../index.css';
import { useNavigate } from 'react-router-dom';
const PatientForm = ({ patient = null, onSubmit }) => {
    const navigate=useNavigate();
    
    const [formData, setFormData] = useState({
      firstName: patient?.user?.firstName || '',
      lastName: patient?.user?.lastName || '',
      email: patient?.user?.email || '',
      address: patient?.user?.address || '',
      date_of_birth: patient?.date_of_birth ? new Date(patient.date_of_birth).toISOString().split('T')[0] : '',
      gender: patient?.gender || '',
      phone_number: patient?.phone_number || '',
      chronic_disease: patient?.chronic_disease || '',
      profilePicture: patient?.user?.profilePicture || ''
    });
  
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
        setFormData(prev => ({
          ...prev,
          profilePicture: URL.createObjectURL(file)
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      // Validate required fields
      if (!formData.email || !formData.firstName || !formData.lastName || !formData.date_of_birth || !formData.gender || !formData.phone_number) {
        toast.error('All fields are required');
        setLoading(false);
        return;
      }
  
      // Format date properly
      const dateValue = formData.date_of_birth;
      const formattedDate = dateValue ? new Date(dateValue).toISOString().split('T')[0] : '';
  
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('date_of_birth', formattedDate);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('chronic_disease', formData.chronic_disease);
  
      
      if (file) {
        formDataToSend.append('profilePicture', file);
      }
  
      try {
        if (patient) {
          await api.updatePatient(patient._id, formDataToSend);
          toast.success('Patient updated successfully');
        } else {
          await api.addPatient(formDataToSend);
          toast.success('Patient added successfully');
        }
        onSubmit();
        setTimeout(()=>{navigate("/doctor-dashboard")},3400);
      } catch (error) {
        toast.error(error.message || 'Failed to save patient');
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {patient ? 'Update Patient' : 'Add New Patient'}
            </h2>
            <p className="text-gray-500 text-sm">
              {patient ? 'Update patient information' : 'Fill in the patient details'}
            </p>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </div>
              <label
                htmlFor="profilePicture"
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg cursor-pointer"
              >
                {formData.profilePicture ? 'Change Image' : 'Upload Image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profilePicture"
              />
            </div>
  
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
  
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500">
                </input>
            </div>
  
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                pattern="[0-9]{8}"
                title="Please enter an 8-digit phone number"
              />
            </div>
  
            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
  
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="chronic_disease" className="block text-sm font-medium text-gray-700">Chronic Disease</label>
                <input
                  type="text"
                  id="chronic_disease"
                  name="chronic_disease"
                  value={formData.chronic_disease}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <span>{patient ? 'Update Patient' : 'Add Patient'}</span>
                )}
              </button>
            </div>
        </form>

    </div>
   </div>
 </div>
    )
}

export default PatientForm;