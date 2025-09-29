import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import Footer from '../components/footer/Footer';
import RegisterManagement from '../components/Registrations/registerManagement';

export default function Facultyjobs() {
  return (
    <div>
      <HeaderManagement />
      <RegisterManagement/>
      <Footer />
    </div>
  );
}