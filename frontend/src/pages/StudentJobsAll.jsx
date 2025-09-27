import React from 'react';
import HeaderStudent from '../components/header/headerStudent';
import News from '../components/News/news';
import Footer from '../components/footer/Footer';
import JobsList from '../components/Jobs/jobsList';

export default function StudentDashboard() {
  return (
    <div>
      <HeaderStudent />
      <JobsList/>
      <Footer />
    </div>
  );
}