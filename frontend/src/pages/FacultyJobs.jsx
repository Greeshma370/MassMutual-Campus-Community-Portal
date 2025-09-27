import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Footer from '../components/footer/Footer';
import FacultyJobs from '../components/Jobs/jobsUpdate';

export default function Facultyjobs() {
  return (
    <div>
      <HeaderFaculty />
      <FacultyJobs/>
      <Footer />
    </div>
  );
}