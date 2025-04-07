import React from 'react';
import DoctorSection from '../components/DoctorSection';
import PatientSection from '../components/PatientSection';
import HomeSection from '../components/HomeSection';
function HomePage() {
  return (
    <div >
      <DoctorSection />
      <PatientSection/>
      <HomeSection />

    </div>
  );
}

export default HomePage;
