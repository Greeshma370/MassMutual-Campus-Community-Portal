import React from 'react';
import HeaderFaculty from '../components/header/headerFaculty';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function FacultyDashboard() {
  return (
    <div>
      <HeaderFaculty />
      <News />
      <Footer />
    </div>
  );
}