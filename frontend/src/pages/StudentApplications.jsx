import React from 'react';
import HeaderStudent from '../components/header/headerStudent';
import Footer from '../components/footer/Footer';
import ApplicationsList from '../components/Application/applicationList';

export default function StudentApplications() {
  return (
    <div>
      <HeaderStudent />
      <ApplicationsList/>
      <Footer />
    </div>
  );
}