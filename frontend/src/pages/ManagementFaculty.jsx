import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Faculty from '../components/Info/facultyList';
import Footer from '../components/footer/Footer';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderManagement />
      <Faculty/>
      <Footer />
    </div>
  );
}