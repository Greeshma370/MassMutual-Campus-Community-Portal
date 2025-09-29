import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import RegisterFaculty from '../components/Registrations/registerFaculty';

export default function Facultyjobs() {
  return (
    <div>
      <HeaderManagement />
      <RegisterFaculty/>
      <Footer />
    </div>
  );
}