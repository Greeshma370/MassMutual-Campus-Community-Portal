import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import Analysis from '../components/Application/Analysis';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderManagement />
      <Analysis/>
      <Footer />
    </div>
  );
}