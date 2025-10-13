import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Footer from '../components/footer/Footer';
import Analysis from '../components/Application/Analysis';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderFaculty />
      <Analysis />
      <Footer />
    </div>
  );
}