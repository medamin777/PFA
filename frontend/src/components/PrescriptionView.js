// frontend/src/components/Prescription.js
import React from 'react';
import { FileText, Clock, User, FileText as NoteIcon } from 'lucide-react';
import '../index.css';

const Prescription = ({ prescription }) => {

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <FileText size={20} className="text-blue-600" />
                    <span className="text-xl font-semibold">Medication</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center space-x-2">
                    <User size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                        Prescribed by {prescription.doctor.firstName} {prescription.doctor.lastName}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                        {new Date(prescription.datePrescribed).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="border-l-4 border-blue-200 pl-4">
                    <h3 className="font-medium"> {prescription.medication}</h3>
                    <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                            Dosage: {prescription.dosage}
                        </p>
                        <p className="text-sm text-gray-600">
                            Frequency: {prescription.frequency}
                        </p>
                        <p className="text-sm text-gray-600">
                            Duration: {prescription.duration}
                        </p>
                        {prescription.instructions && (
                            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <NoteIcon size={20} className="text-gray-400" />
                                    <span className="font-medium">Doctor's Instructions</span>
                                </div>
                                <p className="text-sm text-gray-600">{prescription.instructions}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Prescription;