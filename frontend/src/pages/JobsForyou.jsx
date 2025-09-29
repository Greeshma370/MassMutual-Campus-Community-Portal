import React from 'react';
import HeaderStudent from '../components/header/headerStudent';
import Footer from '../components/footer/Footer';
import JobsApply from '../components/Jobs/jobsApply';

export default function Studentprofile() {
  return (
    <div>
      <HeaderStudent/>
      <JobsApply />
      <Footer />
    </div>
  );
}