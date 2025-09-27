import React from 'react';
import HeaderManagement from '../components/header/headerManagement';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';

export default function ManagementDashboard() {
  return (
    <div>
      <HeaderManagement />
      <News />
      <Footer />
    </div>
  );
}