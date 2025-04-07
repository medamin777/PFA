import React from 'react';
import { FileText } from 'lucide-react';

const HealthParameters = ({ parameters }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Health Parameters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parameters.map((param) => (
          <div
            key={param._id}
            className="bg-gray-50 p-6 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <FileText size={20} className="text-gray-400" />
                <span className="text-sm text-gray-500">
                  Recorded on {new Date(param.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Heart Rate</label>
                <p className="mt-1 text-gray-900">{param.heart_rate} bpm</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
                <p className="mt-1 text-gray-900">{param.blood_pressure} mmHg</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature</label>
                <p className="mt-1 text-gray-900">{param.temperature} °C</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Oxygen Level</label>
                <p className="mt-1 text-gray-900">{param.oxygen_level} %</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Glucose Level</label>
                <p className="mt-1 text-gray-900">{param.glucose_level} mg/dL</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <p className="mt-1 text-gray-600">{param.notes || 'No notes'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthParameters;
