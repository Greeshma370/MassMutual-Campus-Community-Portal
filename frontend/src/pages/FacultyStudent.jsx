import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import Students from '../components/Info/studentList';
import Footer from '../components/footer/Footer';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderFaculty />
      <Students/>
      <Footer />
    </div>
  );
}