import React from 'react';
import HeaderStudent from '../components/header/headerStudent';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function StudentDashboard() {
  return (
    <div>
      <HeaderStudent />
      <News />
      <Footer />
    </div>
  );
}