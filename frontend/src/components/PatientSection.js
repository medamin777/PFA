 import React from 'react';

import Patients from '../assets/patients.jpg';



function PatientSection(){

    return(
    <div className=" flex flex-col md:flex-row  gap-4 bg-white p-4  rounded-xl shadow-lg ">
        <img 
            src={Patients} 
            alt="Patients" 
            className="w-full md:w-[40%] rounded-lg"
        />
        <div className="flex flex-col items-start">
            <p  className="text-lg text-gray-700 font-serif"><span className="font-bold text-green-600 mb-1"> Patients </span>can Record daily health parameters 🩺</p>
                
            <ul className="list-none space-y-3 text-lg font-serif">
                <li className="flex items-start gap-2">
                <span>📊 Blood pressure</span>
                </li>
                <li className="flex items-start gap-2">
                <span>📊 Glucose levels</span>
                </li>
                <li className="flex items-start gap-2">
                <span>📊 Oxygen levels</span>
                </li>
                <li className="flex items-start gap-2">
                <span>📊 Heart rate</span>
                </li>
                <li className="flex items-start gap-2">
                <span>📊 Weight</span>
                </li>
                <li className="flex items-start gap-2">
                <span>📊 Temperature</span>
                </li>
            </ul>
        </div>
    </div>
)
}
export default PatientSection;

