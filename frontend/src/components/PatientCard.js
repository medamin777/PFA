import React from 'react';
import { Link } from 'react-router-dom';
import { User, FileText, Calendar, Trash2, PhoneCall } from 'lucide-react';
import getImageSrc from '../assets/ImageProfile';


const PatientCard = ({ patient, onDelete }) => {
  const age = new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear();
 
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={getImageSrc(patient?.user?.profilePicture)}
            alt={patient.user.profilePicture}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">
            {patient.user.firstName} {patient.user.lastName}
          </h3>
          <p className="text-sm text-gray-600">{patient.user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-gray-600">Age: {age} years</span>
        </div>
        <div className="flex items-center space-x-2">
          <User size={16} className="text-gray-400" />
          <span className="text-gray-600">Gender: {patient.gender}</span>
        </div>
        <div className="flex items-center space-x-2">
          <PhoneCall size={16} className="text-gray-400" />
          <span className="text-gray-600">Phone: {patient.phone_number}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/patient-details/${patient._id}`}
          className="text-yellow-600 hover:text-yellow-500 flex items-center space-x-2"
        >
          <FileText size={16} />
          <span>View Details</span>
        </Link>
      
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this patient?')) {
              onDelete(patient._id);
            }
          }}
          className="text-red-500 hover:text-red-700 flex items-center space-x-2"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
