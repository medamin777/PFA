import React from 'react';
import Doctors from '../assets/doctors-image.jpg';
import iconList from "../assets/icon-list.png"
function DoctorSection(){
    return (
        <div className="mt-10 flex flex-col md:flex-row ml-10items-center justify-center min-h-screen bg-gray-100 p-6 gap-8 gap-x-20">
      
      {/* Image on the Left */}
      <img 
        src={Doctors} 
        alt="Health" 
        className="self-start w-[50%] md:w-[45%] rounded-xl shadow-lg" 
      />

      {/* Text on the Right */}
      <div className="max-w-md text-left mt-10">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4 pt-2">
          Welcome to <span className="text-green-500">Medicare</span>
        </h1>
        <p className="text-lg text-gray-700 font-serif">
            A smart solution for doctors and patients to monitor health efficiently.
          Easy access to your health records, prescription history, and real-time communication with your healthcare providers.
            <ul className="list-none space-y-2">
                <li className="font-semibold">🏥 Doctors can</li>
                <li className="flex items-start gap-2">
                <img src={iconList} alt="icon" className="w-5 h-5 mt-1" />
                <span>Write and manage prescriptions for patients.</span>
                </li>
                <li className="flex items-start gap-2">
                <img src={iconList} alt="icon" className="w-5 h-5 mt-1" />
                <span>Track patient health parameters in real time.</span>
                </li>
                <li className="flex items-start gap-2">
                <img src={iconList} alt="icon" className="w-5 h-5 mt-1" />
                <span>Receive notifications when a patient’s health data needs attention.</span>
                </li>
            </ul>
        </p>
            
      </div>
     
    </div>
    )
}

export default DoctorSection;