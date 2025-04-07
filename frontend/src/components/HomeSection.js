// src/pages/Home.js
import React from 'react';
import {Link} from 'react-router-dom';
import '../index.css';
import BannerImage from '../assets/prescription.jpg';
function HomeSection() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
        <div className="min-h-[50vh] bg-gray-100">
        <div className="relative bg-blue-900 text-white py-12 flex flex-col md:flex-row items-center justify-between px-6">
          {/* Text Content */}
            <div className="max-w-lg">
                <h1 className="text-lg md:text-4xl font-bold mb-4">Your Health Our Priority</h1>
            <p className="text-lg md:text-xl">Manage your health with our advanced tracking system.</p>
        </div>
    
    {/* Image */}
    <img 
        src={BannerImage} 
        alt="Health Banner" 
      className="w-48 md:w-64 rounded-lg shadow-lg mt-6 md:mt-0"
    />
  </div>
</div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Medication Reminder Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <i className="fas fa-bell text-yellow-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Medication Reminder</h3>
            <p className="text-gray-600">
              Never miss a dose again with our intelligent medication reminder system. 
              Get timely alerts to ensure you take your medications on schedule.
            </p>
          </div>

          {/* Prescription Updates Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <i className="fas fa-prescription-bottle text-yellow-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Prescription Updates</h3>
            <p className="text-gray-600">
              Stay up-to-date with your prescriptions and medical updates from your doctor. 
              Access all your medical records and treatment plans in one secure place.
            </p>
          </div>

          {/* Additional Feature */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <i className="fas fa-chart-line text-yellow-500 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
            <p className="text-gray-600">
              Monitor your health metrics and track your progress over time. 
              Get insights and recommendations based on your health data.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users who trust us with their health data</p>
          <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;