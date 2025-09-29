import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import FacultyJobs from '../components/Jobs/jobsUpdate';

export default function Facultyjobs() {
  return (
    <div>
      <HeaderManagement />
      <FacultyJobs/>
      <Footer />
    </div>
  );
}