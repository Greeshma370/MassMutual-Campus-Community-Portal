import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Footer from '../components/footer/Footer';
import ApplicationUpdate from '../components/Application/applicationUpdate';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderFaculty />
      <ApplicationUpdate/>
      <Footer />
    </div>
  );
}