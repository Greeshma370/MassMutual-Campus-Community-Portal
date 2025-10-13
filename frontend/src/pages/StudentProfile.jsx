import React from 'react';
import HeaderStudent from '../components/header/headerStudent';
import Footer from '../components/footer/Footer';
import StudentProfile from '../components/Profiles/studentProfile';
export default function Studentprofile() {
  return (
    <div>
      <HeaderStudent />
      <StudentProfile />
      <Footer />
    </div>
  );
}