import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Faculty from '../components/Info/facultyList';
import Footer from '../components/footer/Footer';
import Management from '../components/Info/managementList';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderManagement />
      <Management/>
      <Footer />
    </div>
  );
}