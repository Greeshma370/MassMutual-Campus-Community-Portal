import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import ApplicationsUpdate from '../components/Application/applicationUpdate';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderManagement />
      <ApplicationsUpdate/>
      <Footer />
    </div>
  );
}