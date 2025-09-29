import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Students from '../components/Info/studentList';
import Footer from '../components/footer/Footer';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderManagement />
      <Students/>
      <Footer />
    </div>
  );
}