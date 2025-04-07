// frontend/src/components/patient/PatientInfo.js
import React from 'react';
import { FileText } from 'lucide-react';
import getImageSrc from '../assets/ImageProfile';
const PatientInfo = ({ patient }) => {
  const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Patient Information</h2>
        <div className="flex items-center space-x-4">
          <img
            src={getImageSrc(patient?.user?.profilePicture)}
            alt="Profile-Image"
            className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shadow-sm"
          />
          <FileText size={22} className="text-yellow-500" />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500">Full Name</label>
            <p className="mt-1 text-base font-medium text-gray-800">
              {patient?.user?.firstName} {patient?.user?.lastName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Age</label>
            <p className="mt-1 text-base font-medium text-gray-800">{age}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Gender</label>
            <p className="mt-1 text-base font-medium text-gray-800">{patient.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1 text-base font-medium text-gray-800">{patient.phone_number}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Address</label>
            <p className="mt-1 text-base font-medium text-gray-800">{patient.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Chronic Disease</label>
            <p className="mt-1 text-base font-medium text-gray-800">{patient.chronic_disease || 'None'}</p>
          </div>
        </div>
  
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-base font-medium text-gray-800">{patient.user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PatientInfo;