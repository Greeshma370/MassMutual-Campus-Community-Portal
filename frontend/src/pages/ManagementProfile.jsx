import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import ManagementProfile from '../components/Profiles/managementProfile';

export default function Facultyjobs() {
  return (
    <div>
      <HeaderManagement />
      <ManagementProfile/>
      <Footer />
    </div>
  );
}